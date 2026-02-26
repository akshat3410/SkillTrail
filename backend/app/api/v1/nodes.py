import logging
from typing import List

from fastapi import APIRouter, HTTPException, status

from app.core.supabase import get_supabase
from app.models.schemas import NodeResponse

logger = logging.getLogger(__name__)

router = APIRouter(tags=["Nodes"])


@router.get("/roadmaps/{roadmap_id}/nodes", response_model=List[NodeResponse])
async def get_nodes_by_roadmap(roadmap_id: str):
    """
    Get all nodes for a specific roadmap.

    Args:
        roadmap_id: UUID of the roadmap

    Returns:
        List of nodes ordered by order_index
    """
    try:
        supabase = get_supabase()
        response = (
            supabase.table("nodes")
            .select("*")
            .eq("roadmap_id", roadmap_id)
            .order("order_index")
            .execute()
        )
        return response.data
    except Exception as e:
        logger.exception("Failed to fetch nodes for roadmap %s", roadmap_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch nodes",
        )


@router.get("/nodes/{node_id}", response_model=NodeResponse)
async def get_node(node_id: str):
    """
    Get a specific node by ID.

    Args:
        node_id: UUID of the node

    Returns:
        Node details
    """
    try:
        supabase = get_supabase()
        response = supabase.table("nodes").select("*").eq("id", node_id).single().execute()

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Node not found",
            )

        return response.data
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to fetch node %s", node_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch node",
        )
