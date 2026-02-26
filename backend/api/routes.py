"""FastAPI route definitions for the GreenPulse API."""

from __future__ import annotations

from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from backend.models.database import get_session
from backend.models.schemas import (
    CompanyDetail, DashboardResponse, FeedItem, InvestmentReport,
    Paper, Patent, RankingsResponse, Report, TechDetail,
)
from backend.services.data_service import (
    get_company_detail, get_dashboard, get_feed, get_investments,
    get_map_events, get_papers, get_patents, get_rankings, get_reports,
    get_tech_detail,
)

router = APIRouter(prefix="/api/v1", tags=["GreenPulse API"])


@router.get("/dashboard", response_model=DashboardResponse)
async def dashboard(session: AsyncSession = Depends(get_session)):
    """Main dashboard aggregation endpoint."""
    return await get_dashboard(session)


@router.get("/feed", response_model=list[FeedItem])
async def feed(
    type: Optional[str] = Query(None, description="patent|paper|news"),
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    return await get_feed(session, limit=limit, item_type=type)


@router.get("/patents", response_model=list[Patent])
async def patents(
    category: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    return await get_patents(session, category=category, limit=limit)


@router.get("/patents/{patent_id}", response_model=Patent)
async def patent_detail(patent_id: str, session: AsyncSession = Depends(get_session)):
    results = await get_patents(session, limit=100)
    for p in results:
        if p.id == patent_id:
            return p
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Patent not found")


@router.get("/papers", response_model=list[Paper])
async def papers(
    category: Optional[str] = Query(None),
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    return await get_papers(session, category=category, limit=limit)


@router.get("/papers/{paper_id}", response_model=Paper)
async def paper_detail(paper_id: str, session: AsyncSession = Depends(get_session)):
    results = await get_papers(session, limit=100)
    for p in results:
        if p.id == paper_id:
            return p
    from fastapi import HTTPException
    raise HTTPException(status_code=404, detail="Paper not found")


@router.get("/reports", response_model=list[Report])
async def reports(
    limit: int = Query(20, ge=1, le=100),
    session: AsyncSession = Depends(get_session),
):
    return await get_reports(session, limit=limit)


@router.get("/rankings", response_model=RankingsResponse)
async def rankings(session: AsyncSession = Depends(get_session)):
    return await get_rankings(session)


@router.get("/map/events")
async def map_events(session: AsyncSession = Depends(get_session)):
    return await get_map_events(session)


@router.get("/investments", response_model=list[InvestmentReport])
async def investments():
    return get_investments()


@router.get("/companies/{company_id}", response_model=CompanyDetail)
async def company_detail(company_id: str):
    result = get_company_detail(company_id)
    if not result:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Company not found")
    return result


@router.get("/technologies/{tech_id}", response_model=TechDetail)
async def tech_detail(tech_id: str):
    result = get_tech_detail(tech_id)
    if not result:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Technology not found")
    return result


@router.get("/health")
async def health():
    return {"status": "ok", "service": "GreenPulse API", "version": "1.0.0"}
