import logging
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status
from datetime import datetime

from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import get_supabase
from app.models.schemas import RoadmapResponse, RoadmapRequestCreate, RoadmapRequestResponse

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


@router.get("", response_model=List[RoadmapResponse])
async def get_roadmaps():
    """
    Get all available roadmaps.

    Returns:
        List of roadmaps
    """
    try:
        supabase = get_supabase()
        response = supabase.table("roadmaps").select("*").execute()
        return response.data
    except Exception as e:
        logger.exception("Failed to fetch roadmaps")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch roadmaps",
        )


@router.get("/{roadmap_id}", response_model=RoadmapResponse)
async def get_roadmap(roadmap_id: str):
    """
    Get a specific roadmap by ID.

    Args:
        roadmap_id: UUID of the roadmap

    Returns:
        Roadmap details
    """
    try:
        supabase = get_supabase()
        response = supabase.table("roadmaps").select("*").eq("id", roadmap_id).single().execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Roadmap not found",
            )

        return response.data
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to fetch roadmap %s", roadmap_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch roadmap",
        )


@router.post("/requests", response_model=RoadmapRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_roadmap_request(request: RoadmapRequestCreate):
    """
    Submit a request for a new roadmap.
    Input validation (length, email format) is enforced by the schema.

    Args:
        request: Roadmap request details (name, optional reason, optional email)

    Returns:
        Created roadmap request
    """
    try:
        supabase = get_supabase()

        request_data = {
            "name": request.name.strip(),
            "reason": request.reason.strip() if request.reason else None,
            "email": request.email if request.email else None,
            "status": "pending",
            "created_at": datetime.utcnow().isoformat(),
        }

        response = supabase.table("roadmap_requests").insert(request_data).execute()

        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create roadmap request",
            )

    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Roadmap request error")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to submit roadmap request",
        )


@router.get("/requests/all", response_model=List[RoadmapRequestResponse])
async def get_roadmap_requests(
    user: AuthenticatedUser = Depends(get_current_user),
):
    """
    Get all roadmap requests.
    Requires authentication — prevents anonymous enumeration of user emails.

    Returns:
        List of roadmap requests
    """
    try:
        supabase = get_supabase()
        response = supabase.table("roadmap_requests").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        logger.exception("Failed to fetch roadmap requests")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch roadmap requests",
        )
