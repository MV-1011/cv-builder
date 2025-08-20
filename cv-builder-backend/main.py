from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
from pathlib import Path
from dotenv import load_dotenv

try:
    from routers import templates, resumes, users, linkedin
    ROUTERS_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import routers: {e}")
    ROUTERS_AVAILABLE = False

try:
    from database import db, get_mongo_uri
    DATABASE_AVAILABLE = True
except ImportError as e:
    print(f"Warning: Could not import database: {e}")
    DATABASE_AVAILABLE = False

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    if DATABASE_AVAILABLE:
        try:
            mongo_uri = get_mongo_uri()
            db.client = AsyncIOMotorClient(mongo_uri)
            db.database = db.client[os.getenv("DATABASE_NAME")]
            print("Database connection initialized")
        except Exception as e:
            print(f"Database connection failed: {e}")
    yield
    if DATABASE_AVAILABLE and hasattr(db, 'client'):
        db.client.close()

app = FastAPI(title="CV Builder API", version="1.0.0", lifespan=lifespan)

origins = [
    "http://localhost:3000",
    "https://localhost:3000", 
    "https://*.railway.app",
    "https://*.vercel.app",
    "https://*.netlify.app",
    os.getenv("FRONTEND_URL", "http://localhost:3000")
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if ROUTERS_AVAILABLE:
    app.include_router(templates.router, prefix="/api/templates", tags=["templates"])
    app.include_router(resumes.router, prefix="/api/resumes", tags=["resumes"])
    app.include_router(users.router, prefix="/api/users", tags=["users"])
    app.include_router(linkedin.router, prefix="/api/linkedin", tags=["linkedin"])
    print("All routers loaded successfully")
else:
    print("Running in minimal mode - some routes may not be available")

@app.get("/")
async def root():
    return {
        "message": "CV Builder API is running", 
        "status": "healthy", 
        "docs": "/docs",
        "routers_loaded": ROUTERS_AVAILABLE,
        "database_available": DATABASE_AVAILABLE
    }

@app.get("/api")
async def api_root():
    return {"message": "CV Builder API is running", "endpoints": ["/health", "/docs", "/api/templates", "/api/resumes", "/api/users", "/api/linkedin"]}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

@app.get("/debug")
async def debug_info():
    return {
        "routers_available": ROUTERS_AVAILABLE,
        "database_available": DATABASE_AVAILABLE,
        "environment_vars": {
            "DATABASE_NAME": os.getenv("DATABASE_NAME", "not_set"),
            "MONGO_URI": "***set***" if os.getenv("MONGO_URI") else "not_set",
            "PORT": os.getenv("PORT", "not_set")
        }
    }

# Check if React build exists and serve it
frontend_build_path = Path(__file__).parent.parent / "cv-builder-frontend" / "build"
print(f"Checking for frontend build at: {frontend_build_path}")
print(f"Frontend build exists: {frontend_build_path.exists()}")

if frontend_build_path.exists():
    print("Mounting static files...")
    try:
        # Mount static assets
        static_path = frontend_build_path / "static"
        if static_path.exists():
            app.mount("/static", StaticFiles(directory=str(static_path)), name="static")
            print("Static files mounted successfully")
        
        # Mount frontend (this should be last)
        # app.mount("/app", StaticFiles(directory=str(frontend_build_path), html=True), name="frontend")
    except Exception as e:
        print(f"Error mounting static files: {e}")
else:
    print("No frontend build found, running API-only mode")