"""News Monitoring Agent - Tracks global new energy industry news."""

from __future__ import annotations

import logging
from datetime import datetime
from typing import Any

import httpx

from backend.agents.base_agent import BaseAgent
from backend.config.settings import settings
from backend.models.database import NewsRecord, async_session

logger = logging.getLogger("greenpulse.agents.news")

NEWS_QUERIES = [
    "new energy battery technology",
    "solid state battery breakthrough",
    "electric vehicle battery",
    "solar energy technology",
    "hydrogen fuel cell",
    "energy storage grid",
    "CATL battery", "BYD battery",
    "Tesla battery", "Samsung SDI",
    "lithium mining", "sodium ion battery",
]

AI_NEWS_PROMPT = """你是一位新能源产业分析师。请对以下行业新闻进行快速分析：
1. 事件核心要点（1-2句）
2. 产业影响（高/中/低）及原因
3. 受影响的企业/技术领域
请用中文回答，简洁有力。"""


class NewsAgent(BaseAgent):
    """Monitors news sources for new energy industry developments."""

    def __init__(self):
        super().__init__(
            name="新闻采集智能体",
            interval_minutes=settings.NEWS_SCAN_INTERVAL_MINUTES,
        )

    async def scan(self) -> list[dict[str, Any]]:
        results = []
        results.extend(await self._scan_serpapi_news())
        logger.info(f"[News] Scanned {len(results)} news items")
        return results

    async def _scan_serpapi_news(self) -> list[dict[str, Any]]:
        """Use SerpAPI Google News engine to find relevant news."""
        items = []
        if not settings.SERPAPI_KEY:
            return items
        try:
            async with httpx.AsyncClient(timeout=30) as client:
                for query in NEWS_QUERIES[:5]:
                    url = "https://serpapi.com/search"
                    params = {
                        "engine": "google_news",
                        "q": query,
                        "api_key": settings.SERPAPI_KEY,
                        "gl": "us",
                        "hl": "en",
                    }
                    resp = await client.get(url, params=params)
                    if resp.status_code == 200:
                        data = resp.json()
                        for article in data.get("news_results", [])[:3]:
                            items.append({
                                "title": article.get("title", ""),
                                "description": article.get("snippet", ""),
                                "source": article.get("source", {}).get("name", ""),
                                "url": article.get("link", ""),
                                "date": article.get("date", ""),
                            })
        except Exception as e:
            logger.warning(f"[News] SerpAPI scan error: {e}")
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
                    select(NewsRecord).where(NewsRecord.title == title)
                )).scalar()
                if exists:
                    continue

                impact = self._assess_impact(title + " " + (item.get("description", "") or ""))

                record = NewsRecord(
                    title=title,
                    description=item.get("description", ""),
                    source=item.get("source", ""),
                    country=self._guess_country(item.get("source", "")),
                    impact=impact,
                    category=self._classify(title),
                    url=item.get("url", ""),
                )
                session.add(record)
                count += 1

            await session.commit()
        return count

    @staticmethod
    def _assess_impact(text: str) -> str:
        high_signals = [
            "breakthrough", "record", "突破", "创纪录",
            "billion", "gigafactory", "policy", "ban",
            "IPO", "acquisition", "merger", "收购",
        ]
        tl = text.lower()
        if any(s in tl for s in high_signals):
            return "high"
        medium_signals = ["launch", "expand", "partnership", "invest", "扩产", "合作"]
        if any(s in tl for s in medium_signals):
            return "medium"
        return "low"

    @staticmethod
    def _guess_country(source: str) -> str:
        mapping = {
            "reuters": "🌍 全球", "bloomberg": "🌍 全球",
            "xinhua": "🇨🇳 中国", "新华": "🇨🇳 中国",
            "nikkei": "🇯🇵 日本", "yonhap": "🇰🇷 韩国",
        }
        sl = source.lower()
        for key, country in mapping.items():
            if key in sl:
                return country
        return "🌍 全球"

    @staticmethod
    def _classify(text: str) -> str:
        tl = text.lower()
        if any(k in tl for k in ["battery", "电池", "CATL", "BYD"]):
            return "battery"
        if any(k in tl for k in ["solar", "光伏", "perovskite"]):
            return "solar"
        if any(k in tl for k in ["hydrogen", "氢能", "fuel cell"]):
            return "hydrogen"
        return "general"
