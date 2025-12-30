from typing import List, Optional
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel, EmailStr
from app.core.supabase import init_supabase
from app.models.schemas import RoadmapResponse
from datetime import datetime

router = APIRouter(prefix="/roadmaps", tags=["Roadmaps"])


class RoadmapRequestCreate(BaseModel):
    """Schema for creating a roadmap request."""
    name: str
    reason: Optional[str] = None
    email: Optional[EmailStr] = None


class RoadmapRequestResponse(BaseModel):
    """Schema for roadmap request response."""
    id: str
    name: str
    reason: Optional[str] = None
    email: Optional[str] = None
    created_at: str
    status: str = "pending"


@router.get("", response_model=List[RoadmapResponse])
async def get_roadmaps():
    """
    Get all available roadmaps.
    
    Returns:
        List of roadmaps
    """
    try:
        supabase = init_supabase()
        response = supabase.table("roadmaps").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch roadmaps: {str(e)}"
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
        supabase = init_supabase()
        response = supabase.table("roadmaps").select("*").eq("id", roadmap_id).single().execute()
        
        if not response.data:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Roadmap not found"
            )
        
        return response.data
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch roadmap: {str(e)}"
        )


@router.post("/requests", response_model=RoadmapRequestResponse, status_code=status.HTTP_201_CREATED)
async def create_roadmap_request(request: RoadmapRequestCreate):
    """
    Submit a request for a new roadmap.
    
    Args:
        request: Roadmap request details (name, optional reason, optional email)
        
    Returns:
        Created roadmap request
    """
    try:
        supabase = init_supabase()
        
        # Prepare data for insertion
        request_data = {
            "name": request.name.strip(),
            "reason": request.reason.strip() if request.reason else None,
            "email": request.email if request.email else None,
            "status": "pending",
            "created_at": datetime.utcnow().isoformat()
        }
        
        # Insert into roadmap_requests table
        response = supabase.table("roadmap_requests").insert(request_data).execute()
        
        if response.data and len(response.data) > 0:
            return response.data[0]
        else:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to create roadmap request"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        # Log the error but return a user-friendly message
        print(f"Roadmap request error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to submit roadmap request: {str(e)}"
        )


@router.get("/requests/all", response_model=List[RoadmapRequestResponse])
async def get_roadmap_requests():
    """
    Get all roadmap requests (admin endpoint).
    
    Returns:
        List of roadmap requests
    """
    try:
        supabase = init_supabase()
        response = supabase.table("roadmap_requests").select("*").order("created_at", desc=True).execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to fetch roadmap requests: {str(e)}"
        )

