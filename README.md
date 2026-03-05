# ⚡ GreenPulse - 全球新能源情报平台

> AI智能体 7×24 小时自动监控全球新能源领域专利、论文和产业动态

## 功能概览

| 板块 | 说明 |
|------|------|
| 🌍 **全球动态地图** | 每日新能源事件地理可视化，实时更新 |
| 📊 **前沿技术排名** | 多维度AI评分的技术与企业排名 |
| 📄 **核心论文研读** | 高影响因子期刊论文AI深度解读 |
| 📋 **核心专利研读** | 全球专利追踪与AI技术分析 |
| 📈 **产业布局报告** | AI自动生成的深度行业分析报告 |
| 🤖 **智能体监控** | 6个AI智能体实时运行状态面板 |

## AI 智能体

| 智能体 | 功能 | 数据来源 |
|--------|------|----------|
| 专利监控智能体 | 抓取全球新能源专利 | USPTO / EPO / CNIPA / JPO / KIPO |
| 论文追踪智能体 | 追踪高影响因子论文 | Nature / Science / Joule / arXiv |
| 新闻采集智能体 | 采集产业新闻 | Reuters / Bloomberg / 新华社 |
| 电池专项智能体 | 电池技术深度分析 | 综合专利+论文数据 |
| 报告生成智能体 | 自动生成行业报告 | 全数据源综合 |
| 翻译与摘要智能体 | 多语言翻译和摘要 | 中/英/日/韩/德 |

## 技术栈

- **前端**: HTML5 / CSS3 / Vanilla JS (可直接用浏览器打开)
- **后端**: Python / FastAPI / SQLAlchemy / SQLite
- **AI**: OpenAI GPT-4o / 自定义Agent框架
- **数据源**: EPO OPS / Semantic Scholar / arXiv / SerpAPI
- **部署**: Docker / AWS CloudFormation / 阿里云 ECS

## 快速开始

### 1. 直接查看前端

```bash
# 用浏览器直接打开
open frontend/index.html
```

### 2. 本地运行完整平台

```bash
# 复制并配置环境变量
cp .env.example .env
# 编辑 .env 填入你的 API Keys

# 启动
./scripts/run-local.sh
```

访问 http://localhost:8000

### 3. Docker 部署

```bash
cd deployment/docker

# 设置环境变量
export AZURE_API_KEY=your-azure-key
export SERPAPI_KEY=your-serpapi-key

docker-compose up -d --build
```

### 4. 一键部署到 AWS

```bash
# 设置 AWS 凭证
export AWS_ACCESS_KEY_ID=your-key
export AWS_SECRET_ACCESS_KEY=your-secret
export AWS_REGION=us-east-1

# 设置 API Keys
export AZURE_API_KEY=your-azure-key
export KEY_PAIR_NAME=your-ec2-keypair

# 一键部署
./scripts/deploy-aws.sh
```

### 5. 一键部署到阿里云 ECS

```bash
# 前置: 安装并配置阿里云 CLI
pip install aliyun-cli
aliyun configure  # 填入 AccessKey ID/Secret

# 设置 API Keys (可选)
export AZURE_API_KEY=your-azure-key

# 一键部署 (交互式, 可选密码或密钥对登录)
./scripts/deploy-aliyun.sh
```

**或者使用 Terraform:**

```bash
cd deployment/aliyun
cp terraform.tfvars.example terraform.tfvars
# 编辑 terraform.tfvars 填入配置

terraform init
terraform apply
```

## 项目结构

```
greenpulse/
├── frontend/                # 前端 (纯HTML，可直接打开)
│   ├── index.html          # 主页面
│   └── assets/
│       ├── css/style.css   # 样式
│       └── js/
│           ├── data.js     # 演示数据
│           ├── map.js      # 地图可视化
│           └── app.js      # 应用逻辑
├── backend/                 # 后端 API 与智能体
│   ├── main.py             # FastAPI 入口
│   ├── api/routes.py       # API 路由
│   ├── models/
│   │   ├── database.py     # 数据库模型
│   │   └── schemas.py      # Pydantic 模式
│   ├── services/
│   │   └── data_service.py # 数据服务层
│   ├── agents/
│   │   ├── base_agent.py   # 智能体基类
│   │   ├── patent_agent.py # 专利监控
│   │   ├── paper_agent.py  # 论文追踪
│   │   ├── news_agent.py   # 新闻采集
│   │   ├── battery_agent.py# 电池专项
│   │   ├── report_agent.py # 报告生成
│   │   ├── translation_agent.py # 翻译摘要
│   │   └── scheduler.py    # 调度器
│   └── config/settings.py  # 配置
├── deployment/
│   ├── docker/
│   │   ├── Dockerfile
│   │   └── docker-compose.yml
│   ├── aws/
│   │   └── cloudformation.yaml
│   └── aliyun/             # 阿里云 ECS 部署
│       ├── main.tf         # Terraform 主配置
│       ├── user_data.sh    # ECS 初始化脚本
│       └── terraform.tfvars.example
├── scripts/
│   ├── run-local.sh        # 本地启动
│   ├── deploy-aws.sh       # AWS一键部署
│   └── deploy-aliyun.sh    # 阿里云一键部署
├── requirements.txt
├── .env.example
└── README.md
```

## API 接口

| 接口 | 方法 | 说明 |
|------|------|------|
| `/api/v1/dashboard` | GET | 仪表盘聚合数据 |
| `/api/v1/feed` | GET | 动态信息流 |
| `/api/v1/patents` | GET | 专利列表 |
| `/api/v1/patents/{id}` | GET | 专利详情 |
| `/api/v1/papers` | GET | 论文列表 |
| `/api/v1/papers/{id}` | GET | 论文详情 |
| `/api/v1/reports` | GET | 报告列表 |
| `/api/v1/rankings` | GET | 技术排名 |
| `/api/v1/map/events` | GET | 地图事件 |
| `/api/v1/health` | GET | 健康检查 |

## 环境变量

| 变量 | 必填 | 说明 |
|------|------|------|
| `AZURE_API_KEY` | 推荐 | Azure OpenAI API密钥，用于AI分析 |
| `AZURE_ENDPOINT` | 可选 | Azure端点URL (已有默认值) |
| `AZURE_MODEL` | 可选 | 模型名称 (默认 gpt-5.2-chat) |
| `SERPAPI_KEY` | 可选 | SerpAPI密钥，用于专利/新闻搜索 |
| `SEMANTIC_SCHOLAR_KEY` | 可选 | Semantic Scholar API密钥 |
| `DATABASE_URL` | 可选 | 数据库连接串（默认SQLite） |

## License

MIT
