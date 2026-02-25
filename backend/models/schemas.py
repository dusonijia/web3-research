"""Pydantic schemas for API request/response models."""

from __future__ import annotations

from datetime import datetime
from enum import Enum
from typing import Optional

from pydantic import BaseModel, Field


class ItemType(str, Enum):
    PATENT = "patent"
    PAPER = "paper"
    NEWS = "news"
    REPORT = "report"


class ImpactLevel(str, Enum):
    HIGH = "high"
    MEDIUM = "medium"
    LOW = "low"


class AgentStatus(str, Enum):
    RUNNING = "running"
    IDLE = "idle"
    ERROR = "error"


class PatentStatus(str, Enum):
    GRANTED = "granted"
    PENDING = "pending"
    PUBLISHED = "published"


# ---- Feed ----

class FeedItem(BaseModel):
    id: Optional[str] = None
    type: ItemType
    title: str
    description: str
    time_ago: str = ""
    country: str = ""
    source: str = ""
    impact: ImpactLevel = ImpactLevel.MEDIUM
    impact_text: str = ""
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---- Patent ----

class Patent(BaseModel):
    id: str
    patent_number: str
    title: str
    abstract: str
    assignee: str
    assignee_short: str = ""
    status: PatentStatus = PatentStatus.PUBLISHED
    country: str = ""
    filing_date: str = ""
    tags: list[str] = []
    category: str = "battery"
    ai_summary: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---- Paper ----

class Paper(BaseModel):
    id: Optional[str] = None
    title: str
    journal: str = ""
    date: str = ""
    abstract: str = ""
    tags: list[str] = []
    authors: str = ""
    citations: int = 0
    downloads: int = 0
    category: str = "battery"
    ai_summary: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---- Report ----

class Report(BaseModel):
    id: Optional[str] = None
    title: str
    summary: str = ""
    date: str = ""
    pages: int = 0
    report_type: str = ""
    content_markdown: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)


# ---- Rankings ----

class RankingItem(BaseModel):
    name: str
    detail: str = ""
    score: float = 0
    change: str = "0"
    trend: str = "up"


class RankingCategory(BaseModel):
    technology: list[RankingItem] = []
    companies: list[RankingItem] = []


class RankingsResponse(BaseModel):
    battery: RankingCategory = RankingCategory()
    solar: RankingCategory = RankingCategory()
    hydrogen: RankingCategory = RankingCategory()
    wind: RankingCategory = RankingCategory()
    storage: RankingCategory = RankingCategory()
    ev: RankingCategory = RankingCategory()


# ---- Map Event ----

class MapEvent(BaseModel):
    lat: float
    lng: float
    type: ItemType
    label: str
    intensity: int = 50


# ---- Agent ----

class AgentInfo(BaseModel):
    name: str
    icon: str = ""
    status: AgentStatus = AgentStatus.RUNNING
    today_count: int = 0
    total_count: str = "0"
    sources: str = ""
    accuracy: str = ""
    last_action: str = ""


# ---- Dashboard ----

class DashboardStats(BaseModel):
    total_patents: int = 0
    total_papers: int = 0
    total_news: int = 0
    countries: int = 0
    active_agents: int = 0


class DashboardResponse(BaseModel):
    stats: DashboardStats
    feed: list[FeedItem] = []
    map_events: list[MapEvent] = []
    agents: list[AgentInfo] = []
