"""Battery Specialist Agent - Deep analysis agent focused on battery technology."""

from __future__ import annotations

import json
import logging
from typing import Any

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import PaperRecord, PatentRecord, async_session

logger = logging.getLogger("greenpulse.agents.battery")

AI_BATTERY_ANALYSIS_PROMPT = """你是一位全球顶尖的电池技术专家。请对以下电池技术相关内容进行深度专业分析：

1. 技术路线定位：
   - 所属技术路线（固态电池/锂金属/硅负极/钠离子/锂硫/其他）
   - 在该技术路线发展阶段中的位置（基础研究/应用研究/中试/量产）

2. 关键性能参数评估：
   - 能量密度（体积/重量）
   - 循环寿命
   - 倍率性能
   - 安全性
   - 成本潜力

3. 产业化可行性：
   - 量产难度（1-10评分）
   - 预计商业化时间
   - 产业链成熟度

4. 竞争格局影响：
   - 对现有技术的替代威胁
   - 主要受益/受损企业

请用中文回答，专业深度与可读性兼顾。"""


class BatterySpecialistAgent(BaseAgent):
    """Specialist agent that performs deep analysis on battery-related patents and papers."""

    def __init__(self):
        super().__init__(
            name="电池专项智能体",
            interval_minutes=settings.PATENT_SCAN_INTERVAL_MINUTES,
        )

    async def scan(self) -> list[dict[str, Any]]:
        """Find battery items without AI analysis."""
        items = []
        async with async_session() as session:
            from sqlalchemy import select

            patents = (await session.execute(
                select(PatentRecord)
                .where(PatentRecord.category == "battery")
                .where(PatentRecord.ai_summary.is_(None) | (PatentRecord.ai_summary == ""))
                .order_by(PatentRecord.created_at.desc())
                .limit(10)
            )).scalars().all()

            for p in patents:
                items.append({
                    "type": "patent",
                    "id": p.id,
                    "title": p.title,
                    "abstract": p.abstract,
                    "assignee": p.assignee,
                })

            papers = (await session.execute(
                select(PaperRecord)
                .where(PaperRecord.category == "battery")
                .where(PaperRecord.ai_summary.is_(None) | (PaperRecord.ai_summary == ""))
                .order_by(PaperRecord.created_at.desc())
                .limit(10)
            )).scalars().all()

            for p in papers:
                items.append({
                    "type": "paper",
                    "id": p.id,
                    "title": p.title,
                    "abstract": p.abstract,
                    "journal": p.journal,
                })

        logger.info(f"[Battery] Found {len(items)} items needing analysis")
        return items

    async def process(self, items: list[dict[str, Any]]) -> int:
        """Generate deep AI analysis for battery items."""
        if not settings.OPENAI_API_KEY:
            logger.info("[Battery] No API key, skipping AI analysis")
            return 0

        count = 0
        async with async_session() as session:
            for item in items:
                content = f"标题: {item.get('title','')}\n"
                if item.get("assignee"):
                    content += f"专利权人: {item['assignee']}\n"
                if item.get("journal"):
                    content += f"期刊: {item['journal']}\n"
                content += f"摘要: {item.get('abstract','')}"

                summary = await self.analyze_with_ai(content, AI_BATTERY_ANALYSIS_PROMPT)
                if not summary:
                    continue

                from sqlalchemy import update
                if item["type"] == "patent":
                    await session.execute(
                        update(PatentRecord)
                        .where(PatentRecord.id == item["id"])
                        .values(ai_summary=summary)
                    )
                else:
                    await session.execute(
                        update(PaperRecord)
                        .where(PaperRecord.id == item["id"])
                        .values(ai_summary=summary)
                    )
                count += 1

            await session.commit()
        return count
