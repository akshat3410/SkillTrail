import logging
from datetime import datetime
from typing import List

from fastapi import APIRouter, Depends, HTTPException, status

from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import get_supabase
from app.models.schemas import NoteResponse, NoteUpdate

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("", response_model=List[NoteResponse])
async def get_all_notes(user: AuthenticatedUser = Depends(get_current_user)):
    """
    Get all notes for the current user.

    Returns:
        List of notes
    """
    try:
        supabase = get_supabase()

        response = (
            supabase.table("notes")
            .select("*, nodes(title)")
            .eq("user_id", user.id)
            .order("updated_at", desc=True)
            .execute()
        )

        notes = []
        for note in response.data:
            node_data = note.pop("nodes", {})
            note["node_title"] = node_data.get("title") if node_data else None
            notes.append(note)

        return notes
    except Exception as e:
        logger.exception("Failed to fetch notes for user %s", user.id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to fetch notes",
        )


@router.get("/{node_id}", response_model=NoteResponse)
async def get_note(
    node_id: str,
    user: AuthenticatedUser = Depends(get_current_user),
):
    """
    Get note for a specific node.

    Args:
        node_id: UUID of the node

    Returns:
        Note content
    """
    try:
        supabase = get_supabase()
        response = (
            supabase.table("notes")
            .select("*")
            .eq("user_id", user.id)
            .eq("node_id", node_id)
            .single()
            .execute()
        )

        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Note not found",
            )

        return response.data
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to fetch note for node %s", node_id)
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found",
        )


@router.put("/{node_id}", response_model=NoteResponse)
async def update_note(
    node_id: str,
    note: NoteUpdate,
    user: AuthenticatedUser = Depends(get_current_user),
):
    """
    Create or update a note for a node (upsert).
    Content length is validated at the schema level (max 50,000 chars).

    Args:
        node_id: UUID of the node
        note: Note content

    Returns:
        Updated note
    """
    try:
        supabase = get_supabase()

        response = (
            supabase.table("notes")
            .upsert(
                {
                    "user_id": user.id,
                    "node_id": node_id,
                    "content": note.content,
                    "updated_at": datetime.utcnow().isoformat(),
                },
                on_conflict="user_id,node_id",
            )
            .execute()
        )

        if response.data:
            return response.data[0]

        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save note",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("Failed to update note for node %s", node_id)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to update note",
        )
