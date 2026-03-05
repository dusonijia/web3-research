# ==============================================
# GreenPulse - 阿里云 ECS Terraform 部署
# ==============================================
#
# 用法:
#   cd deployment/aliyun
#   terraform init
#   terraform plan
#   terraform apply
#
# 销毁:
#   terraform destroy

terraform {
  required_providers {
    alicloud = {
      source  = "aliyun/alicloud"
      version = "~> 1.220"
    }
  }
  required_version = ">= 1.0"
}

provider "alicloud" {
  region = var.region
}

# ---- Variables ----

variable "region" {
  description = "阿里云区域"
  type        = string
  default     = "cn-shanghai"
}

variable "zone" {
  description = "可用区"
  type        = string
  default     = "cn-shanghai-b"
}

variable "instance_type" {
  description = "ECS 实例规格"
  type        = string
  default     = "ecs.t6-c1m2.large"
}

variable "instance_password" {
  description = "ECS root 密码 (8-30位, 大小写+数字)"
  type        = string
  sensitive   = true
}

variable "azure_api_key" {
  description = "Azure OpenAI API Key (可选, 用于AI分析)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "serpapi_key" {
  description = "SerpAPI Key (可选, 用于专利/新闻搜索)"
  type        = string
  default     = ""
  sensitive   = true
}

variable "repo_url" {
  description = "Git 仓库地址"
  type        = string
  default     = "https://github.com/dusonijia/web3-research.git"
}

variable "repo_branch" {
  description = "Git 分支"
  type        = string
  default     = "main"
}

# ---- Data Sources ----

data "alicloud_images" "ubuntu" {
  name_regex  = "^ubuntu_22_04"
  most_recent = true
  owners      = "system"
}

# ---- VPC ----

resource "alicloud_vpc" "greenpulse" {
  vpc_name   = "greenpulse-vpc"
  cidr_block = "172.16.0.0/16"
}

resource "alicloud_vswitch" "greenpulse" {
  vpc_id     = alicloud_vpc.greenpulse.id
  cidr_block = "172.16.1.0/24"
  zone_id    = var.zone
}

# ---- Security Group ----

resource "alicloud_security_group" "greenpulse" {
  name   = "greenpulse-sg"
  vpc_id = alicloud_vpc.greenpulse.id
}

resource "alicloud_security_group_rule" "ssh" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "22/22"
  security_group_id = alicloud_security_group.greenpulse.id
  cidr_ip           = "0.0.0.0/0"
}

resource "alicloud_security_group_rule" "http" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "80/80"
  security_group_id = alicloud_security_group.greenpulse.id
  cidr_ip           = "0.0.0.0/0"
}

resource "alicloud_security_group_rule" "https" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "443/443"
  security_group_id = alicloud_security_group.greenpulse.id
  cidr_ip           = "0.0.0.0/0"
}

resource "alicloud_security_group_rule" "app" {
  type              = "ingress"
  ip_protocol       = "tcp"
  port_range        = "8000/8000"
  security_group_id = alicloud_security_group.greenpulse.id
  cidr_ip           = "0.0.0.0/0"
}

# ---- ECS Instance ----

resource "alicloud_instance" "greenpulse" {
  instance_name        = "greenpulse-server"
  instance_type        = var.instance_type
  image_id             = data.alicloud_images.ubuntu.images[0].id
  vswitch_id           = alicloud_vswitch.greenpulse.id
  security_groups      = [alicloud_security_group.greenpulse.id]
  password             = var.instance_password
  system_disk_category = "cloud_essd"
  system_disk_size     = 40

  internet_max_bandwidth_out = 10
  internet_charge_type       = "PayByTraffic"
  instance_charge_type       = "PostPaid"
  spot_strategy              = "NoSpot"

  user_data = base64encode(templatefile("${path.module}/user_data.sh", {
    repo_url      = var.repo_url
    repo_branch   = var.repo_branch
    azure_api_key = var.azure_api_key
    serpapi_key    = var.serpapi_key
  }))

  tags = {
    Name    = "GreenPulse"
    Project = "new-energy-intelligence"
  }
}

# ---- Outputs ----

output "instance_id" {
  description = "ECS 实例 ID"
  value       = alicloud_instance.greenpulse.id
}

output "public_ip" {
  description = "公网 IP"
  value       = alicloud_instance.greenpulse.public_ip
}

output "website_url" {
  description = "网站地址"
  value       = "http://${alicloud_instance.greenpulse.public_ip}"
}

output "api_url" {
  description = "API 地址"
  value       = "http://${alicloud_instance.greenpulse.public_ip}/api/v1"
}

output "ssh_command" {
  description = "SSH 登录命令"
  value       = "ssh root@${alicloud_instance.greenpulse.public_ip}"
}
