#!/bin/bash
# ==============================================
# GreenPulse - One-Click AWS Deployment Script
# ==============================================
set -e

STACK_NAME="${STACK_NAME:-greenpulse}"
REGION="${AWS_REGION:-us-east-1}"
INSTANCE_TYPE="${INSTANCE_TYPE:-t3.medium}"
KEY_PAIR="${KEY_PAIR_NAME:-}"
OPENAI_KEY="${OPENAI_API_KEY:-}"
SERPAPI_KEY="${SERPAPI_KEY:-}"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}"
echo "  ╔══════════════════════════════════════╗"
echo "  ║  ⚡ GreenPulse AWS Deployment        ║"
echo "  ║  New Energy Intelligence Platform    ║"
echo "  ╚══════════════════════════════════════╝"
echo -e "${NC}"

# Check prerequisites
command -v aws >/dev/null 2>&1 || { echo -e "${RED}Error: AWS CLI not installed${NC}"; exit 1; }

if [ -z "$KEY_PAIR" ]; then
    echo -e "${YELLOW}Available key pairs in ${REGION}:${NC}"
    aws ec2 describe-key-pairs --region "$REGION" --query 'KeyPairs[*].KeyName' --output table
    echo ""
    read -p "Enter key pair name: " KEY_PAIR
fi

if [ -z "$KEY_PAIR" ]; then
    echo -e "${RED}Error: Key pair name is required${NC}"
    exit 1
fi

echo ""
echo -e "${GREEN}Deployment Configuration:${NC}"
echo "  Stack Name:    $STACK_NAME"
echo "  Region:        $REGION"
echo "  Instance Type: $INSTANCE_TYPE"
echo "  Key Pair:      $KEY_PAIR"
echo "  OpenAI API:    $([ -n "$OPENAI_KEY" ] && echo 'Configured' || echo 'Not set (AI agents disabled)')"
echo "  SerpAPI:       $([ -n "$SERPAPI_KEY" ] && echo 'Configured' || echo 'Not set (search agents disabled)')"
echo ""

read -p "Proceed with deployment? [y/N]: " confirm
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Deployment cancelled."
    exit 0
fi

echo ""
echo -e "${GREEN}[1/3] Creating CloudFormation stack...${NC}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
TEMPLATE_FILE="${SCRIPT_DIR}/../deployment/aws/cloudformation.yaml"

aws cloudformation create-stack \
    --stack-name "$STACK_NAME" \
    --template-body "file://${TEMPLATE_FILE}" \
    --region "$REGION" \
    --parameters \
        ParameterKey=InstanceType,ParameterValue="$INSTANCE_TYPE" \
        ParameterKey=KeyPairName,ParameterValue="$KEY_PAIR" \
        ParameterKey=OpenAIApiKey,ParameterValue="$OPENAI_KEY" \
        ParameterKey=SerpApiKey,ParameterValue="$SERPAPI_KEY" \
    --capabilities CAPABILITY_IAM

echo -e "${GREEN}[2/3] Waiting for stack creation (this takes 3-5 minutes)...${NC}"

aws cloudformation wait stack-create-complete \
    --stack-name "$STACK_NAME" \
    --region "$REGION"

echo -e "${GREEN}[3/3] Retrieving deployment information...${NC}"

OUTPUTS=$(aws cloudformation describe-stacks \
    --stack-name "$STACK_NAME" \
    --region "$REGION" \
    --query 'Stacks[0].Outputs' \
    --output json)

WEBSITE_URL=$(echo "$OUTPUTS" | python3 -c "import sys,json; data=json.load(sys.stdin); print(next(o['OutputValue'] for o in data if o['OutputKey']=='WebsiteURL'))")
API_URL=$(echo "$OUTPUTS" | python3 -c "import sys,json; data=json.load(sys.stdin); print(next(o['OutputValue'] for o in data if o['OutputKey']=='APIURL'))")
SSH_CMD=$(echo "$OUTPUTS" | python3 -c "import sys,json; data=json.load(sys.stdin); print(next(o['OutputValue'] for o in data if o['OutputKey']=='SSHCommand'))")

echo ""
echo -e "${GREEN}╔══════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║  Deployment Complete!                    ║${NC}"
echo -e "${GREEN}╚══════════════════════════════════════════╝${NC}"
echo ""
echo -e "  Website:  ${GREEN}${WEBSITE_URL}${NC}"
echo -e "  API:      ${GREEN}${API_URL}${NC}"
echo -e "  SSH:      ${YELLOW}${SSH_CMD}${NC}"
echo ""
echo -e "${YELLOW}Note: The application may take 2-3 more minutes to fully start.${NC}"
echo -e "${YELLOW}The AI agents will begin monitoring automatically once started.${NC}"
