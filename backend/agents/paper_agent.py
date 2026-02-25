"""Paper Tracking Agent - Monitors academic papers from major journals and arXiv."""

from __future__ import annotations

import json
import logging
from datetime import datetime
from typing import Any

import httpx

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import PaperRecord, async_session

logger = logging.getLogger("greenpulse.agents.paper")

PAPER_QUERIES = [
    "solid state battery", "all-solid-state battery",
    "lithium metal battery", "sodium ion battery",
    "perovskite solar cell", "hydrogen fuel cell",
    "battery electrolyte", "silicon anode",
    "lithium sulfur battery", "energy storage",
]

HIGH_IMPACT_JOURNALS = [
    "nature", "science", "nature energy", "nature materials",
    "joule", "advanced materials", "nature catalysis",
    "energy & environmental science", "acs energy letters",
    "advanced energy materials",
]

AI_PAPER_PROMPT = """你是一位新能源领域的顶级研究员。请对以下学术论文进行深度研读解析，包括：
1. 核心发现与创新点（3-5个要点）
2. 研究方法论评估
3. 与该领域现有工作的对比
4. 对产业化的潜在影响
5. 研究局限性与未来展望
请用中文回答，学术性与可读性兼顾。"""


class PaperAgent(BaseAgent):
    """Monitors Semantic Scholar and arXiv for new energy-related papers."""

    def __init__(self):
        super().__init__(
            name="论文追踪智能体",
            interval_minutes=settings.PAPER_SCAN_INTERVAL_MINUTES,
        )

    async def scan(self) -> list[dict[str, Any]]:
        results = []
        results.extend(await self._scan_semantic_scholar())
        results.extend(await self._scan_arxiv())
        logger.info(f"[Paper] Scanned {len(results)} papers")
        return results

    async def _scan_semantic_scholar(self) -> list[dict[str, Any]]:
        """Search Semantic Scholar API for relevant papers."""
        items = []
        headers = {}
        if settings.SEMANTIC_SCHOLAR_KEY:
            headers["x-api-key"] = settings.SEMANTIC_SCHOLAR_KEY

        try:
            async with httpx.AsyncClient(timeout=30) as client:
                for query in PAPER_QUERIES[:5]:
                    url = "https://api.semanticscholar.org/graph/v1/paper/search"
                    params = {
                        "query": query,
                        "limit": 5,
                        "fields": "title,abstract,authors,journal,year,citationCount,publicationDate",
                        "year": "2025-2026",
                    }
                    resp = await client.get(url, params=params, headers=headers)
                    if resp.status_code == 200:
                        data = resp.json()
                        for paper in data.get("data", []):
                            items.append({
                                "title": paper.get("title", ""),
                                "abstract": paper.get("abstract", ""),
                                "authors": ", ".join(
                                    a.get("name", "") for a in (paper.get("authors") or [])[:5]
                                ),
                                "journal": (paper.get("journal") or {}).get("name", ""),
                                "date": paper.get("publicationDate", ""),
                                "citations": paper.get("citationCount", 0),
                                "source": "Semantic Scholar",
                            })
                    elif resp.status_code == 429:
                        logger.warning("[Paper] Rate limited by Semantic Scholar, backing off")
                        break
        except Exception as e:
            logger.warning(f"[Paper] Semantic Scholar scan error: {e}")
        return items

    async def _scan_arxiv(self) -> list[dict[str, Any]]:
        """Query arXiv API for recent new energy preprints."""
        items = []
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                for query in PAPER_QUERIES[:3]:
                    url = "http://export.arxiv.org/api/query"
                    params = {
                        "search_query": f'all:"{query}"',
                        "sortBy": "submittedDate",
                        "sortOrder": "descending",
                        "max_results": 5,
                    }
                    resp = await client.get(url, params=params)
                    if resp.status_code == 200:
                        import xml.etree.ElementTree as ET
                        root = ET.fromstring(resp.text)
                        ns = {"atom": "http://www.w3.org/2005/Atom"}
                        for entry in root.findall("atom:entry", ns):
                            title = entry.find("atom:title", ns)
                            summary = entry.find("atom:summary", ns)
                            published = entry.find("atom:published", ns)
                            authors = entry.findall("atom:author/atom:name", ns)
                            items.append({
                                "title": title.text.strip() if title is not None else "",
                                "abstract": summary.text.strip() if summary is not None else "",
                                "authors": ", ".join(a.text for a in authors[:5]),
                                "journal": "arXiv",
                                "date": published.text[:10] if published is not None else "",
                                "citations": 0,
                                "source": "arXiv",
                            })
        except Exception as e:
            logger.warning(f"[Paper] arXiv scan error: {e}")
        return items

    async def process(self, items: list[dict[str, Any]]) -> int:
        count = 0
        async with async_session() as session:
            for item in items:
                title = item.get("title", "").strip()
                if not title:
                    continue

                from sqlalchemy import select
                exists = (await session.execute(
                    select(PaperRecord).where(PaperRecord.title == title)
                )).scalar()
                if exists:
                    continue

                is_high_impact = any(
                    j in (item.get("journal", "") or "").lower() for j in HIGH_IMPACT_JOURNALS
                )

                ai_summary = ""
                if settings.OPENAI_API_KEY and is_high_impact and item.get("abstract"):
                    ai_summary = await self.analyze_with_ai(
                        f"标题: {title}\n期刊: {item.get('journal','')}\n摘要: {item.get('abstract','')}",
                        AI_PAPER_PROMPT,
                    )

                text = title + " " + (item.get("abstract", "") or "")
                record = PaperRecord(
                    title=title,
                    journal=item.get("journal", ""),
                    published_date=item.get("date", ""),
                    abstract=item.get("abstract", ""),
                    tags=json.dumps(self._extract_tags(text)),
                    authors=item.get("authors", ""),
                    citations=item.get("citations", 0),
                    downloads=0,
                    category=self._classify(text),
                    ai_summary=ai_summary,
                )
                session.add(record)
                count += 1

            await session.commit()
        return count

    @staticmethod
    def _extract_tags(text: str) -> list[str]:
        tag_map = {
            "solid state": "固态电池", "solid-state": "固态电池",
            "lithium": "锂电池", "sodium": "钠离子", "perovskite": "钙钛矿",
            "hydrogen": "氢能", "fuel cell": "燃料电池", "solar": "光伏",
            "silicon anode": "硅负极", "electrolyte": "电解质",
            "lithium sulfur": "锂硫电池", "energy storage": "储能",
        }
        tags = []
        tl = text.lower()
        for key, tag in tag_map.items():
            if key in tl and tag not in tags:
                tags.append(tag)
        return tags[:5]

    @staticmethod
    def _classify(text: str) -> str:
        tl = text.lower()
        if any(k in tl for k in ["battery", "electrolyte", "cathode", "anode", "lithium", "sodium"]):
            return "battery"
        if any(k in tl for k in ["solar", "perovskite", "photovoltaic"]):
            return "solar"
        if any(k in tl for k in ["hydrogen", "fuel cell"]):
            return "hydrogen"
        if any(k in tl for k in ["energy storage", "grid storage"]):
            return "storage"
        return "battery"
