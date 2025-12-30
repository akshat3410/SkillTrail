from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import init_supabase
from app.models.schemas import ProgressResponse, ProgressUpdate

router = APIRouter(prefix="/progress", tags=["Progress"])


@router.get("", response_model=List[ProgressResponse])
async def get_all_progress(user: AuthenticatedUser = Depends(get_current_user)):
    """
    Get progress for all nodes for the current user.
    
    Returns:
        List of progress records
    """
    try:
        supabase = init_supabase()
        response = (
            supabase.table("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .execute()
        )
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch progress: {str(e)}"
        )


@router.get("/{node_id}", response_model=ProgressResponse)
async def get_node_progress(
    node_id: str,
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Get progress for a specific node.
    
    Args:
        node_id: UUID of the node
        
    Returns:
        Progress record for the node
    """
    try:
        supabase = init_supabase()
        response = (
            supabase.table("user_progress")
            .select("*")
            .eq("user_id", user.id)
            .eq("node_id", node_id)
            .single()
            .execute()
        )
        
        if not response.data:
            # Return default progress if not found
            return {
                "user_id": user.id,
                "node_id": node_id,
                "status": "not_started",
                "updated_at": None
            }
        
        return response.data
    except Exception as e:
        # If not found, return default
        return {
            "user_id": user.id,
            "node_id": node_id,
            "status": "not_started",
            "updated_at": None
        }


@router.put("/{node_id}", response_model=ProgressResponse)
async def update_progress(
    node_id: str,
    progress: ProgressUpdate,
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Update progress status for a node (upsert).
    
    Args:
        node_id: UUID of the node
        progress: New progress status
        
    Returns:
        Updated progress record
    """
    # Validate status
    valid_statuses = ["not_started", "in_progress", "completed"]
    if progress.status not in valid_statuses:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid status. Must be one of: {valid_statuses}"
        )
    
    try:
        supabase = init_supabase()
        
        # Upsert the progress record
        response = (
            supabase.table("user_progress")
            .upsert({
                "user_id": user.id,
                "node_id": node_id,
                "status": progress.status,
                "updated_at": "now()"
            }, on_conflict="user_id,node_id")
            .execute()
        )
        
        if response.data:
            return response.data[0]
        
        return {
            "user_id": user.id,
            "node_id": node_id,
            "status": progress.status,
            "updated_at": None
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update progress: {str(e)}"
        )
