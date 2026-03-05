"""Report Generation Agent - Auto-generates industry analysis reports."""

from __future__ import annotations

import logging
from datetime import datetime, timedelta
from typing import Any

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import (
    NewsRecord, PaperRecord, PatentRecord, ReportRecord, async_session,
)

logger = logging.getLogger("greenpulse.agents.report")

WEEKLY_REPORT_PROMPT = """你是一位资深的新能源产业分析师。请根据以下本周收集的数据，撰写一份专业的周度产业分析报告。

报告结构：
# {title}

## 一、本周概览
- 总结本周新能源领域的核心动态

## 二、重大技术突破
- 列出并分析本周最重要的技术突破（专利和论文）

## 三、产业动态
- 重要企业新闻和政策变化

## 四、电池技术专题
- 本周电池相关的重要进展深度解析

## 五、投资与战略建议
- 基于本周数据的产业趋势判断和建议

## 六、下周关注
- 值得关注的即将到来的事件

请使用Markdown格式，确保内容专业、数据驱动、有深度。"""

TOPIC_REPORT_PROMPT = """你是一位新能源领域的深度研究专家。请根据提供的数据，撰写一份关于"{topic}"的深度分析报告。

报告要求：
1. 3000-5000字
2. 包含技术分析、竞争格局、产业链分析、投资建议
3. 使用Markdown格式
4. 数据驱动，引用具体的专利和论文
5. 中文撰写"""


class ReportAgent(BaseAgent):
    """Generates periodic analysis reports from collected intelligence data."""

    def __init__(self):
        super().__init__(
            name="报告生成智能体",
            interval_minutes=60 * 24,  # once per day
        )

    async def scan(self) -> list[dict[str, Any]]:
        """Check if new reports need to be generated."""
        tasks = []
        async with async_session() as session:
            from sqlalchemy import select, func

            last_report = (await session.execute(
                select(ReportRecord).order_by(ReportRecord.created_at.desc()).limit(1)
            )).scalar()

            should_generate = (
                last_report is None
                or (datetime.utcnow() - last_report.created_at) > timedelta(days=7)
            )

            if should_generate:
                week_ago = datetime.utcnow() - timedelta(days=7)

                patents = (await session.execute(
                    select(PatentRecord)
                    .where(PatentRecord.created_at >= week_ago)
                    .order_by(PatentRecord.created_at.desc())
                    .limit(20)
                )).scalars().all()

                papers = (await session.execute(
                    select(PaperRecord)
                    .where(PaperRecord.created_at >= week_ago)
                    .order_by(PaperRecord.created_at.desc())
                    .limit(20)
                )).scalars().all()

                news = (await session.execute(
                    select(NewsRecord)
                    .where(NewsRecord.created_at >= week_ago)
                    .order_by(NewsRecord.created_at.desc())
                    .limit(20)
                )).scalars().all()

                tasks.append({
                    "type": "weekly",
                    "patents": [{"title": p.title, "assignee": p.assignee, "country": p.country} for p in patents],
                    "papers": [{"title": p.title, "journal": p.journal} for p in papers],
                    "news": [{"title": n.title, "source": n.source} for n in news],
                })

        return tasks

    async def process(self, items: list[dict[str, Any]]) -> int:
        if not settings.AZURE_API_KEY:
            logger.info("[Report] No API key, skipping report generation")
            return 0

        count = 0
        for task in items:
            if task["type"] == "weekly":
                report = await self._generate_weekly_report(task)
                if report:
                    async with async_session() as session:
                        session.add(report)
                        await session.commit()
                    count += 1

        return count

    async def _generate_weekly_report(self, data: dict) -> ReportRecord | None:
        today = datetime.utcnow().strftime("%Y-%m-%d")
        title = f"新能源产业周度情报报告 ({today})"

        context = f"本周数据摘要:\n"
        context += f"- 新增专利 {len(data['patents'])} 项\n"
        context += f"- 新增论文 {len(data['papers'])} 篇\n"
        context += f"- 新增新闻 {len(data['news'])} 条\n\n"

        context += "主要专利:\n"
        for p in data["patents"][:10]:
            context += f"  - {p['title']} ({p.get('assignee','')}, {p.get('country','')})\n"

        context += "\n主要论文:\n"
        for p in data["papers"][:10]:
            context += f"  - {p['title']} ({p.get('journal','')})\n"

        context += "\n主要新闻:\n"
        for n in data["news"][:10]:
            context += f"  - {n['title']} ({n.get('source','')})\n"

        prompt = WEEKLY_REPORT_PROMPT.replace("{title}", title)
        content = await self.analyze_with_ai(context, prompt)

        if not content:
            return None

        return ReportRecord(
            title=title,
            summary=f"涵盖{len(data['patents'])}项专利、{len(data['papers'])}篇论文和{len(data['news'])}条新闻的周度综合分析。",
            report_type="周度报告",
            pages=max(10, len(content) // 500),
            content_markdown=content,
        )
