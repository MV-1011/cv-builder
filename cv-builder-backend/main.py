from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from routers import templates, resumes, users, linkedin
from database import db, get_mongo_uri

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    mongo_uri = get_mongo_uri()
    db.client = AsyncIOMotorClient(mongo_uri)
    db.database = db.client[os.getenv("DATABASE_NAME")]
    yield
    db.client.close()

app = FastAPI(title="CV Builder API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(templates.router, prefix="/api/templates", tags=["templates"])
app.include_router(resumes.router, prefix="/api/resumes", tags=["resumes"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(linkedin.router, prefix="/api/linkedin", tags=["linkedin"])

@app.get("/")
async def root():
    return {"message": "CV Builder API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}