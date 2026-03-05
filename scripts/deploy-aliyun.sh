#!/bin/bash
# ==============================================
# GreenPulse - 一键部署到阿里云 ECS
# ==============================================
#
# 前置条件:
#   1. 安装阿里云 CLI: https://help.aliyun.com/document_detail/139508.html
#      pip install aliyun-cli  或  brew install aliyun-cli
#   2. 配置凭证: aliyun configure
#      填入 AccessKey ID / Secret / Region
#   3. 账户中有足够余额或已开通按量付费
#
# 用法:
#   export AZURE_API_KEY=your-key        # 可选
#   ./scripts/deploy-aliyun.sh
#
# ==============================================
set -e

# ---- Configuration (override via environment variables) ----
REGION="${ALIYUN_REGION:-cn-shanghai}"
ZONE="${ALIYUN_ZONE:-cn-shanghai-b}"
INSTANCE_TYPE="${ALIYUN_INSTANCE_TYPE:-ecs.t6-c1m2.large}"
IMAGE_ID="${ALIYUN_IMAGE_ID:-ubuntu_22_04_x64_20G_alibase_20240730.vhd}"
DISK_SIZE="${ALIYUN_DISK_SIZE:-40}"
INSTANCE_NAME="${ALIYUN_INSTANCE_NAME:-greenpulse-server}"
PASSWORD="${ALIYUN_ECS_PASSWORD:-}"
KEY_PAIR="${ALIYUN_KEY_PAIR:-}"
AZURE_KEY="${AZURE_API_KEY:-}"
SERPAPI_KEY="${SERPAPI_KEY:-}"
REPO_URL="${GREENPULSE_REPO:-https://github.com/dusonijia/web3-research.git}"
BRANCH="${GREENPULSE_BRANCH:-main}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${GREEN}"
echo "  ╔══════════════════════════════════════════╗"
echo "  ║  ⚡ GreenPulse 阿里云 ECS 一键部署       ║"
echo "  ║  全球新能源情报平台                       ║"
echo "  ╚══════════════════════════════════════════╝"
echo -e "${NC}"

# ---- Check prerequisites ----
if ! command -v aliyun &>/dev/null; then
    echo -e "${RED}错误: 未安装阿里云 CLI (aliyun)${NC}"
    echo "  安装方法: pip install aliyun-cli"
    echo "  文档: https://help.aliyun.com/document_detail/139508.html"
    exit 1
fi

# Verify credentials
if ! aliyun ecs DescribeRegions --output cols=RegionId rows=Regions.Region[] 2>/dev/null | head -3 >/dev/null; then
    echo -e "${RED}错误: 阿里云 CLI 未配置或凭证无效${NC}"
    echo "  请运行: aliyun configure"
    exit 1
fi
echo -e "${GREEN}✓ 阿里云 CLI 已配置${NC}"

# ---- Get authentication method ----
if [ -z "$PASSWORD" ] && [ -z "$KEY_PAIR" ]; then
    echo ""
    echo -e "${YELLOW}请选择 ECS 登录方式:${NC}"
    echo "  1) 密码登录 (推荐，简单快速)"
    echo "  2) SSH 密钥对登录"
    read -p "选择 [1/2]: " auth_choice

    if [ "$auth_choice" = "2" ]; then
        echo ""
        echo -e "${YELLOW}当前区域可用密钥对:${NC}"
        aliyun ecs DescribeKeyPairs --RegionId "$REGION" --output cols=KeyPairName rows=KeyPairs.KeyPair[] 2>/dev/null || echo "  (无已有密钥对)"
        echo ""
        read -p "输入密钥对名称 (留空自动创建): " KEY_PAIR
        if [ -z "$KEY_PAIR" ]; then
            KEY_PAIR="greenpulse-key"
            echo -e "${CYAN}创建密钥对 ${KEY_PAIR}...${NC}"
            RESULT=$(aliyun ecs CreateKeyPair --RegionId "$REGION" --KeyPairName "$KEY_PAIR" 2>/dev/null)
            PRIVATE_KEY=$(echo "$RESULT" | python3 -c "import sys,json; print(json.load(sys.stdin).get('PrivateKeyBody',''))" 2>/dev/null)
            if [ -n "$PRIVATE_KEY" ]; then
                echo "$PRIVATE_KEY" > "${KEY_PAIR}.pem"
                chmod 600 "${KEY_PAIR}.pem"
                echo -e "${GREEN}✓ 密钥已保存到 ${KEY_PAIR}.pem${NC}"
            fi
        fi
    else
        while [ -z "$PASSWORD" ]; do
            read -s -p "设置 ECS root 密码 (8-30位，需含大小写字母和数字): " PASSWORD
            echo ""
            if [ ${#PASSWORD} -lt 8 ]; then
                echo -e "${RED}密码至少8位${NC}"
                PASSWORD=""
            fi
        done
    fi
fi

# ---- Show deployment configuration ----
echo ""
echo -e "${GREEN}部署配置:${NC}"
echo "  区域:        $REGION ($ZONE)"
echo "  实例规格:    $INSTANCE_TYPE"
echo "  系统镜像:    Ubuntu 22.04"
echo "  磁盘大小:    ${DISK_SIZE}GB"
echo "  实例名称:    $INSTANCE_NAME"
echo "  登录方式:    $([ -n "$KEY_PAIR" ] && echo "密钥对: $KEY_PAIR" || echo "密码登录")"
echo "  Azure API:   $([ -n "$AZURE_KEY" ] && echo '已配置' || echo '未设置 (AI智能体不启动)')"
echo "  SerpAPI:     $([ -n "$SERPAPI_KEY" ] && echo '已配置' || echo '未设置')"
echo "  仓库:        $REPO_URL"
echo ""

read -p "确认部署? [y/N]: " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "部署已取消。"
    exit 0
fi

# ---- Step 1: Create VPC and VSwitch ----
echo ""
echo -e "${GREEN}[1/6] 创建 VPC 和交换机...${NC}"

VPC_ID=$(aliyun ecs CreateVpc \
    --RegionId "$REGION" \
    --CidrBlock "172.16.0.0/16" \
    --VpcName "greenpulse-vpc" \
    --Description "GreenPulse VPC" \
    2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('VpcId',''))")

if [ -z "$VPC_ID" ]; then
    echo -e "${RED}VPC 创建失败${NC}"
    exit 1
fi
echo "  VPC: $VPC_ID"

sleep 5

VSWITCH_ID=$(aliyun ecs CreateVSwitch \
    --RegionId "$REGION" \
    --ZoneId "$ZONE" \
    --VpcId "$VPC_ID" \
    --CidrBlock "172.16.1.0/24" \
    --VSwitchName "greenpulse-vsw" \
    2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('VSwitchId',''))")

echo "  VSwitch: $VSWITCH_ID"

# ---- Step 2: Create Security Group ----
echo -e "${GREEN}[2/6] 创建安全组...${NC}"

SG_ID=$(aliyun ecs CreateSecurityGroup \
    --RegionId "$REGION" \
    --VpcId "$VPC_ID" \
    --SecurityGroupName "greenpulse-sg" \
    --Description "GreenPulse Security Group" \
    2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('SecurityGroupId',''))")

echo "  安全组: $SG_ID"

for PORT in 22 80 443 8000; do
    aliyun ecs AuthorizeSecurityGroup \
        --RegionId "$REGION" \
        --SecurityGroupId "$SG_ID" \
        --IpProtocol tcp \
        --PortRange "${PORT}/${PORT}" \
        --SourceCidrIp "0.0.0.0/0" \
        --Policy accept \
        2>/dev/null >/dev/null
done
echo "  已开放端口: 22, 80, 443, 8000"

# ---- Step 3: Build UserData script ----
echo -e "${GREEN}[3/6] 构建初始化脚本...${NC}"

USER_DATA=$(cat << 'USERDATA_EOF'
#!/bin/bash
set -e
exec > /var/log/greenpulse-init.log 2>&1

apt-get update -y
apt-get install -y docker.io docker-compose-v2 git curl nginx

systemctl enable docker
systemctl start docker

cd /opt
git clone REPO_PLACEHOLDER -b BRANCH_PLACEHOLDER greenpulse || mkdir -p greenpulse
cd greenpulse

cat > .env << 'ENVBLOCK'
AZURE_API_KEY=AZURE_KEY_PLACEHOLDER
AZURE_ENDPOINT=https://admin-mm4mum0p-eastus2.cognitiveservices.azure.com/openai/responses
AZURE_API_VERSION=2025-04-01-preview
AZURE_MODEL=gpt-5.2-chat
SERPAPI_KEY=SERPAPI_PLACEHOLDER
ENVBLOCK

cd deployment/docker
docker compose up -d --build || docker-compose up -d --build

cat > /etc/nginx/sites-available/greenpulse << 'NGINXEOF'
server {
    listen 80;
    server_name _;
    location / {
        proxy_pass http://127.0.0.1:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_read_timeout 300s;
    }
}
NGINXEOF

ln -sf /etc/nginx/sites-available/greenpulse /etc/nginx/sites-enabled/
rm -f /etc/nginx/sites-enabled/default
systemctl restart nginx

echo "GreenPulse deployment completed at $(date)" >> /var/log/greenpulse-init.log
USERDATA_EOF
)

USER_DATA=$(echo "$USER_DATA" | sed "s|REPO_PLACEHOLDER|$REPO_URL|g")
USER_DATA=$(echo "$USER_DATA" | sed "s|BRANCH_PLACEHOLDER|$BRANCH|g")
USER_DATA=$(echo "$USER_DATA" | sed "s|AZURE_KEY_PLACEHOLDER|$AZURE_KEY|g")
USER_DATA=$(echo "$USER_DATA" | sed "s|SERPAPI_PLACEHOLDER|$SERPAPI_KEY|g")

USER_DATA_B64=$(echo "$USER_DATA" | base64 -w 0)

# ---- Step 4: Create ECS Instance ----
echo -e "${GREEN}[4/6] 创建 ECS 实例...${NC}"

CREATE_ARGS="--RegionId $REGION \
    --ZoneId $ZONE \
    --ImageId $IMAGE_ID \
    --InstanceType $INSTANCE_TYPE \
    --VSwitchId $VSWITCH_ID \
    --SecurityGroupId $SG_ID \
    --InstanceName $INSTANCE_NAME \
    --InternetMaxBandwidthOut 10 \
    --InternetChargeType PayByTraffic \
    --SystemDisk.Category cloud_essd \
    --SystemDisk.Size $DISK_SIZE \
    --UserData $USER_DATA_B64 \
    --InstanceChargeType PostPaid \
    --SpotStrategy NoSpot \
    --Description GreenPulse-NewEnergy-Intelligence-Platform"

if [ -n "$KEY_PAIR" ]; then
    CREATE_ARGS="$CREATE_ARGS --KeyPairName $KEY_PAIR"
elif [ -n "$PASSWORD" ]; then
    CREATE_ARGS="$CREATE_ARGS --Password $PASSWORD"
fi

INSTANCE_ID=$(aliyun ecs CreateInstance $CREATE_ARGS \
    2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('InstanceId',''))")

if [ -z "$INSTANCE_ID" ]; then
    echo -e "${RED}ECS 实例创建失败${NC}"
    echo "  可能原因: 实例规格不可用、余额不足、或镜像ID无效"
    echo "  尝试: export ALIYUN_INSTANCE_TYPE=ecs.t5-lc1m2.small"
    exit 1
fi
echo "  实例 ID: $INSTANCE_ID"

# ---- Step 5: Allocate Public IP and Start ----
echo -e "${GREEN}[5/6] 分配公网IP并启动实例...${NC}"

aliyun ecs AllocatePublicIpAddress --RegionId "$REGION" --InstanceId "$INSTANCE_ID" 2>/dev/null >/dev/null

aliyun ecs StartInstance --InstanceId "$INSTANCE_ID" 2>/dev/null >/dev/null

echo "  等待实例启动..."
for i in $(seq 1 30); do
    STATUS=$(aliyun ecs DescribeInstanceAttribute --InstanceId "$INSTANCE_ID" \
        2>/dev/null | python3 -c "import sys,json; print(json.load(sys.stdin).get('Status',''))")
    if [ "$STATUS" = "Running" ]; then
        break
    fi
    sleep 5
done

# ---- Step 6: Get Public IP ----
echo -e "${GREEN}[6/6] 获取部署信息...${NC}"

INSTANCE_INFO=$(aliyun ecs DescribeInstanceAttribute --InstanceId "$INSTANCE_ID" 2>/dev/null)
PUBLIC_IP=$(echo "$INSTANCE_INFO" | python3 -c "
import sys,json
d = json.load(sys.stdin)
ips = d.get('PublicIpAddress',{}).get('IpAddress',[])
print(ips[0] if ips else '')
")
PRIVATE_IP=$(echo "$INSTANCE_INFO" | python3 -c "
import sys,json
d = json.load(sys.stdin)
ips = d.get('VpcAttributes',{}).get('PrivateIpAddress',{}).get('IpAddress',[])
print(ips[0] if ips else '')
")

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║        部署完成!  Deployment Complete!           ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "  实例ID:    ${CYAN}${INSTANCE_ID}${NC}"
echo -e "  公网IP:    ${GREEN}${PUBLIC_IP}${NC}"
echo -e "  内网IP:    ${CYAN}${PRIVATE_IP}${NC}"
echo -e "  网站地址:  ${GREEN}http://${PUBLIC_IP}${NC}"
echo -e "  API地址:   ${GREEN}http://${PUBLIC_IP}/api/v1${NC}"
if [ -n "$KEY_PAIR" ]; then
    echo -e "  SSH登录:   ${YELLOW}ssh -i ${KEY_PAIR}.pem root@${PUBLIC_IP}${NC}"
else
    echo -e "  SSH登录:   ${YELLOW}ssh root@${PUBLIC_IP}${NC}"
fi
echo ""
echo -e "${YELLOW}提示:${NC}"
echo "  1. 应用初始化需要 3-5 分钟 (安装 Docker + 拉取镜像 + 构建)"
echo "  2. 查看初始化日志: ssh root@${PUBLIC_IP} 'tail -f /var/log/greenpulse-init.log'"
echo "  3. AI智能体会在服务启动后自动开始运行"
echo ""
echo -e "  资源清理命令:"
echo "    aliyun ecs DeleteInstance --InstanceId $INSTANCE_ID --Force true"
echo "    aliyun ecs DeleteSecurityGroup --RegionId $REGION --SecurityGroupId $SG_ID"
echo "    aliyun ecs DeleteVSwitch --VSwitchId $VSWITCH_ID"
echo "    aliyun ecs DeleteVpc --VpcId $VPC_ID"
