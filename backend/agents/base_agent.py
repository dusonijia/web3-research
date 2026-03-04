"""Base class for all GreenPulse monitoring agents."""

from __future__ import annotations

import asyncio
import logging
from abc import ABC, abstractmethod
from datetime import datetime
from typing import Any, Optional

from backend.config.settings import settings

logger = logging.getLogger("greenpulse.agents")


class BaseAgent(ABC):
    """Abstract base for monitoring agents that run on a schedule."""

    def __init__(self, name: str, interval_minutes: int = 60):
        self.name = name
        self.interval_minutes = interval_minutes
        self.is_running = False
        self.last_run: Optional[datetime] = None
        self.total_processed = 0
        self.today_processed = 0
        self.error_count = 0
        self._task: Optional[asyncio.Task] = None

    @abstractmethod
    async def scan(self) -> list[dict[str, Any]]:
        """Perform one scan cycle. Returns list of discovered items."""
        ...

    @abstractmethod
    async def process(self, items: list[dict[str, Any]]) -> int:
        """Process and store discovered items. Returns count of new items saved."""
        ...

    async def analyze_with_ai(self, text: str, prompt_template: str) -> str:
        """Call Azure OpenAI Responses API for analysis / summarization."""
        if not settings.AZURE_API_KEY:
            return ""
        try:
            import httpx

            url = f"{settings.AZURE_ENDPOINT}?api-version={settings.AZURE_API_VERSION}"
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {settings.AZURE_API_KEY}",
            }
            payload = {
                "model": settings.AZURE_MODEL,
                "input": [
                    {"role": "system", "content": prompt_template},
                    {"role": "user", "content": text},
                ],
                "max_output_tokens": 4096,
            }

            async with httpx.AsyncClient(timeout=120) as client:
                resp = await client.post(url, json=payload, headers=headers)
                resp.raise_for_status()
                data = resp.json()

            for item in data.get("output", []):
                if item.get("type") == "message":
                    for block in item.get("content", []):
                        if block.get("type") == "output_text" and block.get("text"):
                            return block["text"]
            return ""
        except Exception as e:
            logger.error(f"[{self.name}] AI analysis error: {e}")
            return ""

    async def run_cycle(self):
        """Execute one full scan-process cycle."""
        logger.info(f"[{self.name}] Starting scan cycle...")
        try:
            items = await self.scan()
            if items:
                count = await self.process(items)
                self.total_processed += count
                self.today_processed += count
                logger.info(f"[{self.name}] Processed {count} new items (total: {self.total_processed})")
            else:
                logger.info(f"[{self.name}] No new items found")
            self.last_run = datetime.utcnow()
        except Exception as e:
            self.error_count += 1
            logger.error(f"[{self.name}] Scan cycle error: {e}")

    async def start(self):
        """Begin the continuous monitoring loop."""
        self.is_running = True
        logger.info(f"[{self.name}] Agent started (interval: {self.interval_minutes}min)")
        while self.is_running:
            await self.run_cycle()
            await asyncio.sleep(self.interval_minutes * 60)

    def stop(self):
        self.is_running = False
        if self._task:
            self._task.cancel()
        logger.info(f"[{self.name}] Agent stopped")

    @property
    def status(self) -> str:
        if self.error_count > 5:
            return "error"
        return "running" if self.is_running else "idle"

    def to_dict(self) -> dict:
        return {
            "name": self.name,
            "status": self.status,
            "is_running": self.is_running,
            "last_run": self.last_run.isoformat() if self.last_run else None,
            "total_processed": self.total_processed,
            "today_processed": self.today_processed,
            "error_count": self.error_count,
        }
