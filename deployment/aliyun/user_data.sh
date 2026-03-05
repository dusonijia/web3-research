#!/bin/bash
# GreenPulse ECS User Data - Auto-install on first boot
set -e
exec > /var/log/greenpulse-init.log 2>&1
echo "=== GreenPulse Init Start: $(date) ==="

# System update and install dependencies
apt-get update -y
apt-get install -y docker.io docker-compose-v2 git curl nginx

# Start Docker
systemctl enable docker
systemctl start docker

# Clone repository
cd /opt
git clone ${repo_url} -b ${repo_branch} greenpulse || mkdir -p greenpulse
cd greenpulse

# Write environment config
cat > .env << 'ENVEOF'
AZURE_API_KEY=${azure_api_key}
AZURE_ENDPOINT=https://admin-mm4mum0p-eastus2.cognitiveservices.azure.com/openai/responses
AZURE_API_VERSION=2025-04-01-preview
AZURE_MODEL=gpt-5.2-chat
SERPAPI_KEY=${serpapi_key}
ENVEOF

# Build and start with Docker Compose
cd deployment/docker
docker compose up -d --build || docker-compose up -d --build

# Configure Nginx reverse proxy
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

echo "=== GreenPulse Init Complete: $(date) ==="
