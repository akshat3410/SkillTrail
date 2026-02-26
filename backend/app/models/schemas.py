from typing import List, Literal, Optional
from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


# ==================
# Status enum (single source of truth)
# ==================

ProgressStatus = Literal["not_started", "in_progress", "completed"]


# ==================
# Roadmap schemas
# ==================

class RoadmapBase(BaseModel):
    """Base schema for roadmap."""
    title: str
    description: Optional[str] = None


class RoadmapResponse(RoadmapBase):
    """Response schema for roadmap."""
    id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ==================
# Node schemas
# ==================

class NodeBase(BaseModel):
    """Base schema for node."""
    title: str
    short_summary: Optional[str] = None
    order_index: int
    svg_x: float
    svg_y: float
    video_url: Optional[str] = None
    blog_links: List[str] = []
    estimated_time: Optional[str] = None
    content: Optional[str] = None
    tldr: Optional[str] = None
    why_matters: Optional[str] = None
    common_mistakes: Optional[str] = None


class NodeResponse(NodeBase):
    """Response schema for node."""
    id: str
    roadmap_id: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ==================
# Progress schemas
# ==================

class ProgressBase(BaseModel):
    """Base schema for progress."""
    status: ProgressStatus = "not_started"


class ProgressUpdate(BaseModel):
    """Schema for updating progress. Status is constrained at the schema level."""
    status: ProgressStatus


class ProgressResponse(ProgressBase):
    """Response schema for progress."""
    user_id: str
    node_id: str
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


# ==================
# Note schemas
# ==================

class NoteBase(BaseModel):
    """Base schema for note."""
    content: str = ""


class NoteUpdate(BaseModel):
    """Schema for updating a note. Content is bounded to prevent abuse."""
    content: str = Field(..., max_length=50_000)


class NoteResponse(NoteBase):
    """Response schema for note."""
    id: str
    user_id: str
    node_id: str
    updated_at: Optional[datetime] = None
    node_title: Optional[str] = None

    class Config:
        from_attributes = True


# ==================
# Journey schemas
# ==================

class JourneyRoadmap(BaseModel):
    """Roadmap progress in user journey."""
    id: str
    title: str
    description: Optional[str] = None
    total_count: int
    completed_count: int


class JourneyTopic(BaseModel):
    """Recently visited topic in user journey."""
    id: str
    title: str
    roadmap_title: str
    status: str
    updated_at: Optional[datetime] = None


class JourneyNote(BaseModel):
    """Note in user journey timeline."""
    id: str
    node_id: str
    node_title: str
    content: str
    updated_at: Optional[datetime] = None


class JourneyResponse(BaseModel):
    """Response schema for user journey."""
    roadmaps: List[JourneyRoadmap] = []
    recent_topics: List[JourneyTopic] = []
    notes: List[JourneyNote] = []


# ==================
# Roadmap request schemas
# ==================

class RoadmapRequestCreate(BaseModel):
    """Schema for creating a roadmap request. All fields are bounded."""
    name: str = Field(..., min_length=1, max_length=200)
    reason: Optional[str] = Field(None, max_length=2000)
    email: Optional[EmailStr] = None


class RoadmapRequestResponse(BaseModel):
    """Schema for roadmap request response."""
    id: str
    name: str
    reason: Optional[str] = None
    email: Optional[str] = None
    created_at: str
    status: str = "pending"
