#!/bin/bash
# ==============================================
# GreenPulse - Local Development Runner
# ==============================================
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"

cd "$PROJECT_DIR"

echo "⚡ GreenPulse - New Energy Intelligence Platform"
echo "================================================"

# Check Python
if ! command -v python3 &>/dev/null; then
    echo "Error: Python 3 is required"
    exit 1
fi

# Create virtual environment if needed
if [ ! -d "venv" ]; then
    echo "[1/3] Creating virtual environment..."
    python3 -m venv venv
fi

echo "[2/3] Installing dependencies..."
source venv/bin/activate
pip install -q -r requirements.txt

# Load .env if exists
if [ -f ".env" ]; then
    echo "Loading .env configuration..."
    export $(grep -v '^#' .env | xargs)
fi

echo "[3/3] Starting server..."
echo ""
echo "  Frontend: http://localhost:${PORT:-8000}"
echo "  API:      http://localhost:${PORT:-8000}/api/v1"
echo "  Health:   http://localhost:${PORT:-8000}/api/v1/health"
echo ""

export PYTHONPATH="$PROJECT_DIR"
python3 -m uvicorn backend.main:app --host "${HOST:-0.0.0.0}" --port "${PORT:-8000}" --reload
