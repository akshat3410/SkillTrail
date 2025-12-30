from fastapi import APIRouter, Depends, HTTPException, status
from app.core.auth import get_current_user, AuthenticatedUser
from app.core.supabase import init_supabase
from app.models.schemas import JourneyResponse

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/journey", response_model=JourneyResponse)
async def get_user_journey(user: AuthenticatedUser = Depends(get_current_user)):
    """
    Get user's learning journey data including:
    - Started roadmaps with progress
    - Recently visited topics
    - Notes timeline
    
    Returns:
        JourneyResponse with roadmaps, topics, and notes
    """
    try:
        supabase = init_supabase()
        
        # Get all progress for user
        progress_response = (
            supabase.table("user_progress")
            .select("*, nodes(id, title, roadmap_id, roadmaps(id, title, description))")
            .eq("user_id", user.id)
            .order("updated_at", desc=True)
            .execute()
        )
        
        progress_data = progress_response.data or []
        
        # Process roadmaps with progress
        roadmap_stats = {}
        recent_topics = []
        
        for item in progress_data:
            node = item.get("nodes", {})
            if not node:
                continue
                
            roadmap = node.get("roadmaps", {})
            if not roadmap:
                continue
            
            roadmap_id = roadmap.get("id")
            
            # Track roadmap stats
            if roadmap_id not in roadmap_stats:
                roadmap_stats[roadmap_id] = {
                    "id": roadmap_id,
                    "title": roadmap.get("title"),
                    "description": roadmap.get("description"),
                    "total_count": 0,
                    "completed_count": 0
                }
            
            if item.get("status") == "completed":
                roadmap_stats[roadmap_id]["completed_count"] += 1
            
            # Add to recent topics
            recent_topics.append({
                "id": node.get("id"),
                "title": node.get("title"),
                "roadmap_title": roadmap.get("title"),
                "status": item.get("status"),
                "updated_at": item.get("updated_at")
            })
        
        # Get total node counts for each roadmap
        for roadmap_id in roadmap_stats:
            try:
                count_response = (
                    supabase.table("nodes")
                    .select("id", count="exact")
                    .eq("roadmap_id", roadmap_id)
                    .execute()
                )
                roadmap_stats[roadmap_id]["total_count"] = count_response.count or 0
            except:
                pass
        
        # Get recent notes
        notes_response = (
            supabase.table("notes")
            .select("*, nodes(title)")
            .eq("user_id", user.id)
            .order("updated_at", desc=True)
            .limit(10)
            .execute()
        )
        
        notes = []
        for note in notes_response.data or []:
            node_data = note.pop("nodes", {})
            notes.append({
                "id": note.get("id"),
                "node_id": note.get("node_id"),
                "node_title": node_data.get("title") if node_data else None,
                "content": note.get("content", "")[:200],  # Truncate for preview
                "updated_at": note.get("updated_at")
            })
        
        return JourneyResponse(
            roadmaps=list(roadmap_stats.values()),
            recent_topics=recent_topics[:10],
            notes=notes
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch journey data: {str(e)}"
        )
