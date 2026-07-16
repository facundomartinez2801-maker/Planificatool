from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from app.config import settings
from app.db import db
from app.api.routes import auth, planificaciones, chat

# Lifecycle events
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    db.connect_db()
    print("✓ Application startup complete")
    yield
    # Shutdown
    db.close_db()
    print("✓ Application shutdown complete")

# Create FastAPI app
app = FastAPI(
    title="PlanificaTool API",
    description="API para herramienta de planificación educativa con IA",
    version="1.0.0",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(planificaciones.router)
app.include_router(chat.router)

# Health check
@app.get("/health")
async def health_check():
    return {"status": "ok"}

@app.get("/")
async def root():
    return {
        "message": "PlanificaTool API",
        "version": "1.0.0",
        "docs": "/docs"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.debug
    )
