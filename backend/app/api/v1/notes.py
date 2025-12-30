from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import init_supabase
from app.models.schemas import NoteResponse, NoteUpdate

router = APIRouter(prefix="/notes", tags=["Notes"])


@router.get("", response_model=List[NoteResponse])
async def get_all_notes(user: AuthenticatedUser = Depends(get_current_user)):
    """
    Get all notes for the current user.
    
    Returns:
        List of notes
    """
    try:
        supabase = init_supabase()
        
        # Get notes with node titles by joining
        response = (
            supabase.table("notes")
            .select("*, nodes(title)")
            .eq("user_id", user.id)
            .order("updated_at", desc=True)
            .execute()
        )
        
        # Transform to include node_title
        notes = []
        for note in response.data:
            node_data = note.pop("nodes", {})
            note["node_title"] = node_data.get("title") if node_data else None
            notes.append(note)
        
        return notes
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch notes: {str(e)}"
        )


@router.get("/{node_id}", response_model=NoteResponse)
async def get_note(
    node_id: str,
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Get note for a specific node.
    
    Args:
        node_id: UUID of the node
        
    Returns:
        Note content
    """
    try:
        supabase = init_supabase()
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
                detail="Note not found"
            )
        
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        # Return empty note if not found
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Note not found"
        )


@router.put("/{node_id}", response_model=NoteResponse)
async def update_note(
    node_id: str,
    note: NoteUpdate,
    user: AuthenticatedUser = Depends(get_current_user)
):
    """
    Create or update a note for a node (upsert).
    
    Args:
        node_id: UUID of the node
        note: Note content
        
    Returns:
        Updated note
    """
    try:
        supabase = init_supabase()
        
        # Upsert the note
        response = (
            supabase.table("notes")
            .upsert({
                "user_id": user.id,
                "node_id": node_id,
                "content": note.content,
                "updated_at": "now()"
            }, on_conflict="user_id,node_id")
            .execute()
        )
        
        if response.data:
            return response.data[0]
        
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save note"
        )
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to update note: {str(e)}"
        )
