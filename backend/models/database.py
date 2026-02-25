"""SQLAlchemy database models and session management."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import (
    Column, DateTime, Enum, Float, Integer, String, Text, create_engine
)
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from backend.config.settings import settings


class Base(DeclarativeBase):
    pass


class PatentRecord(Base):
    __tablename__ = "patents"

    id = Column(Integer, primary_key=True, autoincrement=True)
    patent_number = Column(String(64), unique=True, index=True)
    title = Column(String(512))
    abstract = Column(Text)
    assignee = Column(String(256))
    assignee_short = Column(String(32), default="")
    status = Column(String(16), default="published")
    country = Column(String(64), default="")
    filing_date = Column(String(16), default="")
    tags = Column(Text, default="[]")
    category = Column(String(32), default="battery")
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class PaperRecord(Base):
    __tablename__ = "papers"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(512))
    journal = Column(String(128), default="")
    published_date = Column(String(16), default="")
    abstract = Column(Text, default="")
    tags = Column(Text, default="[]")
    authors = Column(Text, default="")
    citations = Column(Integer, default=0)
    downloads = Column(Integer, default=0)
    category = Column(String(32), default="battery")
    ai_summary = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class NewsRecord(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(512))
    description = Column(Text, default="")
    source = Column(String(128), default="")
    country = Column(String(64), default="")
    impact = Column(String(16), default="medium")
    category = Column(String(32), default="")
    url = Column(String(1024), default="")
    created_at = Column(DateTime, default=datetime.utcnow)


class ReportRecord(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(512))
    summary = Column(Text, default="")
    report_type = Column(String(32), default="")
    pages = Column(Integer, default=0)
    content_markdown = Column(Text, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)


class AgentLog(Base):
    __tablename__ = "agent_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    agent_name = Column(String(64))
    action = Column(String(256))
    items_processed = Column(Integer, default=0)
    status = Column(String(16), default="success")
    created_at = Column(DateTime, default=datetime.utcnow)


engine = create_async_engine(settings.DATABASE_URL, echo=settings.DEBUG)
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)


async def get_session() -> AsyncSession:
    async with async_session() as session:
        yield session
