from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase
import os

class Database:
    client: AsyncIOMotorClient = None
    database: AsyncIOMotorDatabase = None

db = Database()

async def get_database() -> AsyncIOMotorDatabase:
    return db.database

def get_mongo_uri():
    # Check for both MONGO_URI and MONGODB_URL for flexibility
    return os.getenv("MONGO_URI") or os.getenv("MONGODB_URL")