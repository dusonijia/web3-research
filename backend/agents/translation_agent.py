"""Translation & Summarization Agent - Handles multilingual content processing."""

from __future__ import annotations

import logging
from typing import Any

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import PaperRecord, PatentRecord, async_session

logger = logging.getLogger("greenpulse.agents.translation")

TRANSLATE_PROMPT = """你是一位精通中文、英文、日文、韩文和德文的专业翻译。
请将以下内容翻译为中文，保持专业术语的准确性。
如果原文已经是中文，请直接返回原文。
只返回翻译结果，不要添加任何解释。"""

SUMMARIZE_PROMPT = """你是一位新能源领域的信息分析专家。
请用中文为以下内容生成一段200字以内的精炼摘要，突出核心技术要点和产业价值。"""


class TranslationAgent(BaseAgent):
    """Translates and summarizes multilingual patent/paper content."""

    def __init__(self):
        super().__init__(
            name="翻译与摘要智能体",
            interval_minutes=30,
        )

    async def scan(self) -> list[dict[str, Any]]:
        """Find items that may need translation (non-Chinese titles)."""
        items = []
        async with async_session() as session:
            from sqlalchemy import select

            patents = (await session.execute(
                select(PatentRecord)
                .order_by(PatentRecord.created_at.desc())
                .limit(50)
            )).scalars().all()

            for p in patents:
                if p.title and not self._is_chinese(p.title):
                    items.append({
                        "type": "patent",
                        "id": p.id,
                        "title": p.title,
                        "abstract": p.abstract or "",
                    })

            papers = (await session.execute(
                select(PaperRecord)
                .order_by(PaperRecord.created_at.desc())
                .limit(50)
            )).scalars().all()

            for p in papers:
                if p.title and not self._is_chinese(p.title):
                    items.append({
                        "type": "paper",
                        "id": p.id,
                        "title": p.title,
                        "abstract": p.abstract or "",
                    })

        return items[:20]

    async def process(self, items: list[dict[str, Any]]) -> int:
        if not settings.AZURE_API_KEY:
            return 0

        count = 0
        for item in items:
            text = f"标题: {item['title']}\n摘要: {item['abstract']}"
            translated = await self.analyze_with_ai(text, TRANSLATE_PROMPT)
            if translated:
                count += 1

        return count

    @staticmethod
    def _is_chinese(text: str) -> bool:
        chinese_chars = sum(1 for c in text if '\u4e00' <= c <= '\u9fff')
        return chinese_chars / max(len(text), 1) > 0.3
