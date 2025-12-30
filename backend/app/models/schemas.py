from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime


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
    content: Optional[str] = None  # Main learning content (markdown-like)
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


class ProgressBase(BaseModel):
    """Base schema for progress."""
    status: str = "not_started"


class ProgressUpdate(BaseModel):
    """Schema for updating progress."""
    status: str


class ProgressResponse(ProgressBase):
    """Response schema for progress."""
    user_id: str
    node_id: str
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class NoteBase(BaseModel):
    """Base schema for note."""
    content: str = ""


class NoteUpdate(BaseModel):
    """Schema for updating a note."""
    content: str


class NoteResponse(NoteBase):
    """Response schema for note."""
    id: str
    user_id: str
    node_id: str
    updated_at: Optional[datetime] = None
    node_title: Optional[str] = None

    class Config:
        from_attributes = True


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
