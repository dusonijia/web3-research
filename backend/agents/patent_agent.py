"""Patent Monitoring Agent - Scans global patent offices for new energy patents."""

from __future__ import annotations

import json
import logging
from datetime import datetime
from typing import Any

import httpx

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import async_session
from backend.models.database import PatentRecord

logger = logging.getLogger("greenpulse.agents.patent")

PATENT_KEYWORDS = [
    "solid state battery", "lithium ion battery", "sodium ion battery",
    "solid electrolyte", "battery cathode", "battery anode",
    "perovskite solar", "hydrogen fuel cell", "energy storage",
    "electric vehicle battery", "battery recycling",
    "固态电池", "锂离子电池", "钠离子电池", "燃料电池", "储能",
]

AI_PATENT_PROMPT = """你是一位新能源领域的专利分析专家。请对以下专利进行深度解读，包括：
1. 技术创新点（3-5个要点）
2. 技术路线分类（固态电池/锂离子/钠离子/光伏/氢能/储能）
3. 产业影响评估（高/中/低）
4. 与现有技术的对比优势
5. 潜在应用场景
请用中文回答，简洁专业。"""


class PatentAgent(BaseAgent):
    """Monitors USPTO, EPO, CNIPA, JPO, KIPO for new energy patents."""

    def __init__(self):
        super().__init__(
            name="专利监控智能体",
            interval_minutes=settings.PATENT_SCAN_INTERVAL_MINUTES,
        )

    async def scan(self) -> list[dict[str, Any]]:
        """Scan patent sources for new filings."""
        results = []

        results.extend(await self._scan_epo())
        results.extend(await self._scan_google_patents())

        logger.info(f"[Patent] Scanned {len(results)} patent results")
        return results

    async def _scan_epo(self) -> list[dict[str, Any]]:
        """Query EPO Open Patent Services (OPS) REST API."""
        items = []
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                for keyword in PATENT_KEYWORDS[:5]:
                    url = "https://ops.epo.org/3.2/rest-services/published-data/search"
                    params = {"q": f'ta="{keyword}"', "Range": "1-10"}
                    resp = await client.get(url, params=params, headers={"Accept": "application/json"})
                    if resp.status_code == 200:
                        data = resp.json()
                        results = (
                            data.get("ops:world-patent-data", {})
                            .get("ops:biblio-search", {})
                            .get("ops:search-result", {})
                            .get("ops:publication-reference", [])
                        )
                        if isinstance(results, dict):
                            results = [results]
                        for r in results[:5]:
                            doc_id = r.get("document-id", {})
                            if isinstance(doc_id, list):
                                doc_id = doc_id[0]
                            items.append({
                                "patent_number": f"{doc_id.get('country', {}).get('$', 'XX')}{doc_id.get('doc-number', {}).get('$', '')}",
                                "title": keyword,
                                "source": "EPO",
                            })
        except Exception as e:
            logger.warning(f"[Patent] EPO scan error: {e}")
        return items

    async def _scan_google_patents(self) -> list[dict[str, Any]]:
        """Use SerpAPI to search Google Patents."""
        items = []
        if not settings.SERPAPI_KEY:
            return items
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                for keyword in PATENT_KEYWORDS[:3]:
                    url = "https://serpapi.com/search"
                    params = {
                        "engine": "google_patents",
                        "q": keyword,
                        "api_key": settings.SERPAPI_KEY,
                    }
                    resp = await client.get(url, params=params)
                    if resp.status_code == 200:
                        data = resp.json()
                        for result in data.get("organic_results", [])[:5]:
                            items.append({
                                "patent_number": result.get("patent_id", ""),
                                "title": result.get("title", ""),
                                "abstract": result.get("snippet", ""),
                                "assignee": result.get("assignee", ""),
                                "filing_date": result.get("filing_date", ""),
                                "source": "Google Patents",
                            })
        except Exception as e:
            logger.warning(f"[Patent] Google Patents scan error: {e}")
        return items

    async def process(self, items: list[dict[str, Any]]) -> int:
        """Store new patents in database and optionally generate AI summaries."""
        count = 0
        async with async_session() as session:
            for item in items:
                pat_num = item.get("patent_number", "")
                if not pat_num:
                    continue

                from sqlalchemy import select
                exists = (await session.execute(
                    select(PatentRecord).where(PatentRecord.patent_number == pat_num)
                )).scalar()
                if exists:
                    continue

                ai_summary = ""
                if settings.OPENAI_API_KEY and item.get("abstract"):
                    ai_summary = await self.analyze_with_ai(
                        f"专利号: {pat_num}\n标题: {item.get('title','')}\n摘要: {item.get('abstract','')}",
                        AI_PATENT_PROMPT,
                    )

                record = PatentRecord(
                    patent_number=pat_num,
                    title=item.get("title", ""),
                    abstract=item.get("abstract", ""),
                    assignee=item.get("assignee", ""),
                    assignee_short=item.get("assignee", "")[:8] if item.get("assignee") else "",
                    status="published",
                    country=self._guess_country(pat_num),
                    filing_date=item.get("filing_date", ""),
                    tags=json.dumps(self._extract_tags(item.get("title", "") + " " + item.get("abstract", ""))),
                    category=self._classify_category(item.get("title", "") + " " + item.get("abstract", "")),
                    ai_summary=ai_summary,
                )
                session.add(record)
                count += 1

            await session.commit()
        return count

    @staticmethod
    def _guess_country(patent_number: str) -> str:
        prefixes = {
            "US": "🇺🇸 美国", "EP": "🇪🇺 欧洲", "CN": "🇨🇳 中国",
            "JP": "🇯🇵 日本", "KR": "🇰🇷 韩国", "WO": "🌍 国际",
            "DE": "🇩🇪 德国", "GB": "🇬🇧 英国", "FR": "🇫🇷 法国",
        }
        for prefix, country in prefixes.items():
            if patent_number.upper().startswith(prefix):
                return country
        return "🌍 其他"

    @staticmethod
    def _extract_tags(text: str) -> list[str]:
        tag_keywords = {
            "solid state": "固态电池", "solid-state": "固态电池",
            "lithium": "锂电池", "sodium": "钠离子", "perovskite": "钙钛矿",
            "hydrogen": "氢能", "fuel cell": "燃料电池", "solar": "光伏",
            "cathode": "正极", "anode": "负极", "electrolyte": "电解质",
            "recycling": "回收", "electric vehicle": "电动汽车",
            "固态": "固态电池", "锂": "锂电池", "钠": "钠离子",
        }
        tags = []
        text_lower = text.lower()
        for key, tag in tag_keywords.items():
            if key in text_lower and tag not in tags:
                tags.append(tag)
        return tags[:5]

    @staticmethod
    def _classify_category(text: str) -> str:
        text_lower = text.lower()
        categories = [
            ("battery", ["battery", "electrolyte", "cathode", "anode", "电池", "电解质", "正极", "负极"]),
            ("solar", ["solar", "perovskite", "photovoltaic", "光伏", "钙钛矿", "太阳能"]),
            ("hydrogen", ["hydrogen", "fuel cell", "氢", "燃料电池"]),
            ("storage", ["energy storage", "储能", "grid"]),
            ("ev", ["electric vehicle", "EV", "电动汽车", "充电"]),
        ]
        for cat, keywords in categories:
            if any(k in text_lower for k in keywords):
                return cat
        return "battery"
