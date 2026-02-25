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
        """Call LLM for analysis / summarization."""
        if not settings.OPENAI_API_KEY:
            return ""
        try:
            import openai
            client = openai.AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
            response = await client.chat.completions.create(
                model=settings.OPENAI_MODEL,
                messages=[
                    {"role": "system", "content": prompt_template},
                    {"role": "user", "content": text},
                ],
                max_tokens=1024,
                temperature=0.3,
            )
            return response.choices[0].message.content or ""
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
