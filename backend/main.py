import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.v1 import roadmaps, nodes, progress, notes, user

logger = logging.getLogger(__name__)

# Create FastAPI application
# Docs are only exposed in debug mode to avoid information leakage in production.
app = FastAPI(
    title="SkillTrail API",
    description="Visual Learning Roadmap Platform API",
    version="1.0.0",
    docs_url="/api/docs" if settings.debug else None,
    redoc_url="/api/redoc" if settings.debug else None,
)

# Configure CORS — explicit methods and headers (no wildcards)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization", "X-User-Id"],
)


# Health check endpoint
@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy", "version": "1.0.0"}


# Mount API v1 routers
app.include_router(roadmaps.router, prefix="/api/v1")
app.include_router(nodes.router, prefix="/api/v1")
app.include_router(progress.router, prefix="/api/v1")
app.include_router(notes.router, prefix="/api/v1")
app.include_router(user.router, prefix="/api/v1")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug,
    )
