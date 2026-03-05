"""Agent Scheduler - Manages lifecycle and scheduling of all monitoring agents."""

from __future__ import annotations

import asyncio
import logging
from typing import Optional

from backend.agents.battery_agent import BatterySpecialistAgent
from backend.agents.news_agent import NewsAgent
from backend.agents.paper_agent import PaperAgent
from backend.agents.patent_agent import PatentAgent
from backend.agents.report_agent import ReportAgent
from backend.agents.translation_agent import TranslationAgent

logger = logging.getLogger("greenpulse.scheduler")

_scheduler: Optional[AgentScheduler] = None


class AgentScheduler:
    """Orchestrates all monitoring agents on their respective schedules."""

    def __init__(self):
        self.agents = [
            PatentAgent(),
            PaperAgent(),
            NewsAgent(),
            BatterySpecialistAgent(),
            ReportAgent(),
            TranslationAgent(),
        ]
        self._tasks: list[asyncio.Task] = []

    async def start_all(self):
        logger.info(f"Starting {len(self.agents)} agents...")
        loop = asyncio.get_event_loop()
        for agent in self.agents:
            task = loop.create_task(agent.start())
            agent._task = task
            self._tasks.append(task)
            logger.info(f"  -> {agent.name} started (interval: {agent.interval_minutes}min)")

    def stop_all(self):
        logger.info("Stopping all agents...")
        for agent in self.agents:
            agent.stop()
        for task in self._tasks:
            task.cancel()
        self._tasks.clear()

    def get_status(self) -> list[dict]:
        return [agent.to_dict() for agent in self.agents]


def start_scheduler():
    global _scheduler
    _scheduler = AgentScheduler()
    loop = asyncio.get_event_loop()
    loop.create_task(_scheduler.start_all())
    logger.info("Agent scheduler initialized")


def get_scheduler() -> Optional[AgentScheduler]:
    return _scheduler
