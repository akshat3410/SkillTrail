import logging
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import get_supabase
from app.models.schemas import ProgressResponse, ProgressUpdate

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.get("", response_model=List[ProgressResponse])
async def get_all_progress(user: AuthenticatedUser = Depends(get_current_user)):
    """
    Get progress for all nodes for the current user.

    Returns:
        List of progress records
    """
    try:
        supabase = get_supabase()
        response = (
            supabase.table("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .execute()
        )
        return response.data
    except Exception as e:
        logger.exception("Failed to fetch progress for user %s", user.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch progress",
        )


@router.get("/{node_id}", response_model=ProgressResponse)
async def get_node_progress(
    node_id: str,
    user: AuthenticatedUser = Depends(get_current_user),
):
    """
    Get progress for a specific node.

    Args:
        node_id: UUID of the node

    Returns:
        Progress record for the node
    """
    try:
        supabase = get_supabase()
        response = (
            supabase.table("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("node_id", node_id)
            .single()
            .execute()
        )

        if not response.data:
            return {
                "user_id": user.id,
                "node_id": node_id,
                "status": "not_started",
                "updated_at": None,
            }

        return response.data
    except Exception:
        # Node progress not found — return default
        return {
            "user_id": user.id,
            "node_id": node_id,
            "status": "not_started",
            "updated_at": None,
        }


@router.put("/{node_id}", response_model=ProgressResponse)
async def update_progress(
    node_id: str,
    progress: ProgressUpdate,
    user: AuthenticatedUser = Depends(get_current_user),
):
    """
    Update progress status for a node (upsert).
    Status validation is enforced at the schema level via Literal type.

    Args:
        node_id: UUID of the node
        progress: New progress status

    Returns:
        Updated progress record
    """
    try:
        supabase = get_supabase()

        response = (
            supabase.table("user_progress")
            .upsert(
                {
                    "user_id": user.id,
                    "node_id": node_id,
                    "status": progress.status,
                    "updated_at": datetime.utcnow().isoformat(),
                },
                on_conflict="user_id,node_id",
            )
            .execute()
        )

        if response.data:
            return response.data[0]

        return {
            "user_id": user.id,
            "node_id": node_id,
            "status": progress.status,
            "updated_at": None,
        }
    except Exception as e:
        logger.exception("Failed to update progress for node %s", node_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update progress",
        )
