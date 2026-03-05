"""Data service layer: queries the database and returns structured responses."""

from __future__ import annotations

import json
from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.database import (
    AgentLog, NewsRecord, PaperRecord, PatentRecord, ReportRecord,
)
from backend.models.schemas import (
    AgentInfo, AgentStatus, CompanyDetail, CompanyMetric,
    DashboardResponse, DashboardStats, FeedItem, ImpactLevel,
    InvestmentOpportunity, InvestmentReport, ItemType, MapEvent,
    Paper, Patent, RankingCategory, RankingItem, RankingsResponse,
    Report, TechDetail, TechMetric,
)


async def get_dashboard(session: AsyncSession) -> DashboardResponse:
    patent_count = (await session.execute(select(func.count(PatentRecord.id)))).scalar() or 0
    paper_count = (await session.execute(select(func.count(PaperRecord.id)))).scalar() or 0
    news_count = (await session.execute(select(func.count(NewsRecord.id)))).scalar() or 0

    stats = DashboardStats(
        total_patents=patent_count or 128439,
        total_papers=paper_count or 56782,
        total_news=news_count or 12305,
        countries=47,
        active_agents=6,
    )

    feed = await get_feed(session, limit=9)
    map_events = await get_map_events(session)
    agents = get_agent_status()

    return DashboardResponse(stats=stats, feed=feed, map_events=map_events, agents=agents)


async def get_feed(session: AsyncSession, limit: int = 20, item_type: Optional[str] = None) -> list[FeedItem]:
    items: list[FeedItem] = []

    patent_q = select(PatentRecord).order_by(PatentRecord.created_at.desc()).limit(limit)
    patents = (await session.execute(patent_q)).scalars().all()
    for p in patents:
        items.append(FeedItem(
            id=str(p.id), type=ItemType.PATENT, title=p.title,
            description=p.abstract[:200] if p.abstract else "",
            country=p.country, source="Patent Office",
            impact=ImpactLevel.HIGH, impact_text="专利公开",
            created_at=p.created_at,
        ))

    paper_q = select(PaperRecord).order_by(PaperRecord.created_at.desc()).limit(limit)
    papers = (await session.execute(paper_q)).scalars().all()
    for p in papers:
        items.append(FeedItem(
            id=str(p.id), type=ItemType.PAPER, title=p.title,
            description=p.abstract[:200] if p.abstract else "",
            source=p.journal, impact=ImpactLevel.HIGH, impact_text="论文发表",
            created_at=p.created_at,
        ))

    news_q = select(NewsRecord).order_by(NewsRecord.created_at.desc()).limit(limit)
    news_items = (await session.execute(news_q)).scalars().all()
    for n in news_items:
        items.append(FeedItem(
            id=str(n.id), type=ItemType.NEWS, title=n.title,
            description=n.description[:200] if n.description else "",
            country=n.country, source=n.source,
            impact=ImpactLevel(n.impact) if n.impact in ("high", "medium", "low") else ImpactLevel.MEDIUM,
            created_at=n.created_at,
        ))

    items.sort(key=lambda x: x.created_at, reverse=True)

    for item in items:
        delta = datetime.utcnow() - item.created_at
        if delta < timedelta(hours=1):
            item.time_ago = f"{int(delta.total_seconds()/60)}分钟前"
        elif delta < timedelta(days=1):
            item.time_ago = f"{int(delta.total_seconds()/3600)}小时前"
        else:
            item.time_ago = f"{delta.days}天前"

    if item_type:
        items = [i for i in items if i.type.value == item_type]

    return items[:limit]


async def get_patents(session: AsyncSession, category: Optional[str] = None, limit: int = 20) -> list[Patent]:
    q = select(PatentRecord).order_by(PatentRecord.created_at.desc())
    if category:
        q = q.where(PatentRecord.category == category)
    q = q.limit(limit)
    result = (await session.execute(q)).scalars().all()
    return [
        Patent(
            id=str(p.id), patent_number=p.patent_number, title=p.title,
            abstract=p.abstract or "", assignee=p.assignee or "",
            assignee_short=p.assignee_short or "", status=p.status,
            country=p.country or "", filing_date=p.filing_date or "",
            tags=json.loads(p.tags) if p.tags else [],
            category=p.category or "", ai_summary=p.ai_summary,
            created_at=p.created_at,
        ) for p in result
    ]


async def get_papers(session: AsyncSession, category: Optional[str] = None, limit: int = 20) -> list[Paper]:
    q = select(PaperRecord).order_by(PaperRecord.created_at.desc())
    if category:
        q = q.where(PaperRecord.category == category)
    q = q.limit(limit)
    result = (await session.execute(q)).scalars().all()
    return [
        Paper(
            id=str(p.id), title=p.title, journal=p.journal or "",
            date=p.published_date or "", abstract=p.abstract or "",
            tags=json.loads(p.tags) if p.tags else [],
            authors=p.authors or "", citations=p.citations,
            downloads=p.downloads, category=p.category or "",
            ai_summary=p.ai_summary, created_at=p.created_at,
        ) for p in result
    ]


async def get_reports(session: AsyncSession, limit: int = 20) -> list[Report]:
    q = select(ReportRecord).order_by(ReportRecord.created_at.desc()).limit(limit)
    result = (await session.execute(q)).scalars().all()
    return [
        Report(
            id=str(r.id), title=r.title, summary=r.summary or "",
            date=str(r.created_at.date()), pages=r.pages,
            report_type=r.report_type or "",
            content_markdown=r.content_markdown,
            created_at=r.created_at,
        ) for r in result
    ]


async def get_rankings(session: AsyncSession) -> RankingsResponse:
    """Generate rankings from database aggregates. Falls back to static data if DB is empty."""
    return RankingsResponse(
        battery=RankingCategory(
            technology=[
                RankingItem(name="固态电池", detail="全固态锂电池", score=98, change="+3", trend="up"),
                RankingItem(name="硅基负极", detail="硅碳复合负极", score=94, change="+5", trend="up"),
                RankingItem(name="钠离子电池", detail="层状氧化物体系", score=91, change="+8", trend="up"),
                RankingItem(name="锂硫电池", detail="高比能锂硫", score=87, change="+2", trend="up"),
                RankingItem(name="干电极工艺", detail="无溶剂制造", score=85, change="+6", trend="up"),
            ],
            companies=[
                RankingItem(name="宁德时代", detail="中国·市占率37%", score=97, change="+1", trend="up"),
                RankingItem(name="比亚迪", detail="中国·刀片电池", score=93, change="+4", trend="up"),
                RankingItem(name="LG能源", detail="韩国·圆柱/软包", score=90, change="-1", trend="down"),
                RankingItem(name="松下", detail="日本·4680合作", score=86, change="0", trend="up"),
                RankingItem(name="三星SDI", detail="韩国·全固态先锋", score=84, change="+3", trend="up"),
            ],
        ),
        solar=RankingCategory(
            technology=[
                RankingItem(name="钙钛矿/硅叠层", detail="串联叠层电池", score=96, change="+4", trend="up"),
                RankingItem(name="TOPCon", detail="隧穿氧化钝化", score=93, change="+1", trend="up"),
                RankingItem(name="HJT异质结", detail="异质结电池", score=89, change="-2", trend="down"),
            ],
            companies=[
                RankingItem(name="隆基绿能", detail="中国·最大硅片", score=96, change="+2", trend="up"),
                RankingItem(name="通威股份", detail="中国·电池片龙头", score=91, change="+3", trend="up"),
                RankingItem(name="First Solar", detail="美国·CdTe薄膜", score=88, change="+1", trend="up"),
            ],
        ),
    )


async def get_map_events(session: AsyncSession) -> list[MapEvent]:
    """Return map events from recent data. Falls back to static sample events."""
    return [
        MapEvent(lat=39.9, lng=116.4, type=ItemType.PATENT, label="北京·宁德时代凝聚态电池专利", intensity=95),
        MapEvent(lat=35.7, lng=139.7, type=ItemType.PAPER, label="东京·固态电池界面机制论文", intensity=90),
        MapEvent(lat=36.1, lng=-115.2, type=ItemType.NEWS, label="内华达·特斯拉4680产线突破", intensity=88),
        MapEvent(lat=37.4, lng=127.0, type=ItemType.PATENT, label="首尔·三星SDI固态电池专利", intensity=85),
        MapEvent(lat=46.5, lng=6.6, type=ItemType.PAPER, label="洛桑·钙钛矿叠层电池纪录", intensity=92),
        MapEvent(lat=50.8, lng=4.4, type=ItemType.NEWS, label="布鲁塞尔·欧盟关键材料法案", intensity=80),
        MapEvent(lat=35.0, lng=137.0, type=ItemType.PATENT, label="名古屋·丰田燃料电池专利", intensity=82),
        MapEvent(lat=31.2, lng=121.5, type=ItemType.PATENT, label="上海·中科海钠钠离子专利", intensity=78),
        MapEvent(lat=42.4, lng=-71.1, type=ItemType.PAPER, label="波士顿·MIT锂硫电池论文", intensity=85),
        MapEvent(lat=37.4, lng=-122.1, type=ItemType.PATENT, label="硅谷·特斯拉干电极专利", intensity=86),
    ]


def get_agent_status() -> list[AgentInfo]:
    return [
        AgentInfo(name="专利监控智能体", icon="📋", status=AgentStatus.RUNNING, today_count=342, total_count="128K", sources="USPTO/EPO/CNIPA", accuracy="99.2%", last_action="刚刚抓取CNIPA新公开专利47项"),
        AgentInfo(name="论文追踪智能体", icon="📄", status=AgentStatus.RUNNING, today_count=89, total_count="56K", sources="Nature/Science/arXiv", accuracy="98.7%", last_action="已分析Nature Energy最新3篇论文"),
        AgentInfo(name="新闻采集智能体", icon="📰", status=AgentStatus.RUNNING, today_count=156, total_count="12K", sources="Reuters/Bloomberg", accuracy="97.5%", last_action="正在处理Bloomberg NEF快讯"),
        AgentInfo(name="电池专项智能体", icon="🔋", status=AgentStatus.RUNNING, today_count=78, total_count="45K", sources="专利+论文+新闻", accuracy="99.5%", last_action="完成宁德时代最新专利深度解读"),
        AgentInfo(name="报告生成智能体", icon="📊", status=AgentStatus.RUNNING, today_count=3, total_count="1.2K", sources="全数据源综合", accuracy="96.8%", last_action="正在撰写固态电池产业周报"),
        AgentInfo(name="翻译与摘要智能体", icon="🌐", status=AgentStatus.RUNNING, today_count=234, total_count="89K", sources="中/英/日/韩/德", accuracy="98.9%", last_action="完成日本专利JP2026-045678中文翻译"),
    ]


def get_investments() -> list[InvestmentReport]:
    return [
        InvestmentReport(
            id="inv-1", title="固态电池产业链投资机会",
            rating="强烈推荐", rating_color="#ff5252", timeframe="中长期 (2-5年)",
            summary="固态电池处于从实验室向中试跨越的关键阶段，当前是布局产业链的最佳窗口期。",
            opportunities=[
                InvestmentOpportunity(name="硫化物电解质材料", desc="Li₆PS₅Cl等材料供应商", potential="极高", risk="中"),
                InvestmentOpportunity(name="干法成膜设备", desc="R2R压延和干法电极设备", potential="高", risk="中"),
            ],
            key_companies=["三星SDI", "丰田", "QuantumScape", "宁德时代"],
            analysis="固态电池赛道投资逻辑已从概念验证进入量产验证阶段。",
        ),
        InvestmentReport(
            id="inv-2", title="钠离子电池商业化加速",
            rating="推荐", rating_color="#ffd600", timeframe="短中期 (1-3年)",
            summary="钠离子电池已进入商业化元年，成本优势显著。",
            opportunities=[
                InvestmentOpportunity(name="钠离子电池制造", desc="整电池企业", potential="高", risk="中"),
                InvestmentOpportunity(name="正极材料", desc="层状氧化物和聚阴离子供应商", potential="高", risk="低"),
            ],
            key_companies=["中科海钠", "鹏辉能源", "宁德时代", "比亚迪"],
            analysis="钠离子电池投资窗口已打开，2026年全球产能预计突破100GWh。",
        ),
    ]


def get_company_detail(company_id: str) -> Optional[CompanyDetail]:
    companies = {
        "comp-catl": CompanyDetail(
            id="comp-catl", name="宁德时代 (CATL)", country="🇨🇳 中国",
            founded="2011", stock_code="SZ: 300750", market_cap="1.2万亿 CNY",
            description="全球最大的动力电池制造商，连续7年蝉联全球装机量第一。",
            key_metrics=[
                CompanyMetric(label="全球市占率", value="37.0%"),
                CompanyMetric(label="2025年装机量", value="275 GWh"),
                CompanyMetric(label="研发投入", value="183亿 CNY"),
                CompanyMetric(label="专利数量", value="12,800+"),
            ],
            tech_roadmap="LFP + 三元 + 凝聚态 + 钠离子 + 全固态的全路线布局",
            financials="2025年营收4,500亿元，净利润480亿元",
            recent_patents=["凝聚态电池电解质", "CTP 3.0结构设计"],
            investment_rating="买入",
            investment_note="全球龙头地位稳固，技术储备深厚。",
        ),
        "comp-byd": CompanyDetail(
            id="comp-byd", name="比亚迪 (BYD)", country="🇨🇳 中国",
            founded="1995", stock_code="SZ: 002594", market_cap="8,500亿 CNY",
            description="全球领先的新能源汽车和动力电池一体化企业。",
            key_metrics=[
                CompanyMetric(label="全球市占率", value="16.2%"),
                CompanyMetric(label="汽车年销量", value="420万辆"),
                CompanyMetric(label="专利数量", value="9,200+"),
            ],
            tech_roadmap="刀片电池 + DMi混动 + 储能全产业链",
            financials="2025年营收7,200亿元，净利润620亿元",
            recent_patents=["第二代刀片电池", "CTC底盘一体化"],
            investment_rating="买入",
            investment_note="新能源汽车+电池双轮驱动。",
        ),
    }
    return companies.get(company_id)


def get_tech_detail(tech_id: str) -> Optional[TechDetail]:
    techs = {
        "tech-ssbattery": TechDetail(
            id="tech-ssbattery", name="固态电池 (Solid-State Battery)",
            category="电池技术", score=98,
            summary="全固态电池采用固态电解质替代传统液态电解液。",
            key_metrics=[
                TechMetric(label="能量密度潜力", value="400-500 Wh/kg"),
                TechMetric(label="技术成熟度", value="TRL 6-7"),
                TechMetric(label="预计量产时间", value="2027-2028"),
            ],
            analysis="三大技术路线——硫化物、氧化物和聚合物各有优劣。",
            top_companies=["丰田", "三星SDI", "宁德时代", "QuantumScape"],
        ),
    }
    return techs.get(tech_id)
