from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1 import roadmaps, nodes, progress, notes, user

# Create FastAPI application
app = FastAPI(
    title="SkillTrail API",
    description="Visual Learning Roadmap Platform API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        settings.frontend_url,
        "http://localhost:5173",
        "http://localhost:3000"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
        reload=settings.debug
    )
