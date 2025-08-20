#!/usr/bin/env python3
"""
Simple script to test MongoDB connection
Run this script to verify your MongoDB Atlas connection is working
"""

import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

async def test_connection():
    """Test MongoDB connection and basic operations"""
    
    print("🔍 Testing MongoDB Connection...")
    print("=" * 50)
    
    # Get connection details from environment
    mongodb_url = os.getenv("MONGO_URI") or os.getenv("MONGODB_URL")
    database_name = os.getenv("DATABASE_NAME")
    
    if not mongodb_url:
        print("❌ MONGO_URI or MONGODB_URL not found in .env file")
        print("Please update your .env file with your MongoDB Atlas connection string")
        return False
    
    print(f"📡 Connecting to: {mongodb_url.split('@')[1] if '@' in mongodb_url else 'MongoDB'}")
    print(f"🗄️  Database: {database_name}")
    
    try:
        # Create client with timeout
        client = AsyncIOMotorClient(mongodb_url, serverSelectionTimeoutMS=10000)
        
        # Test connection by getting server info
        print("⏳ Testing connection...")
        server_info = await client.server_info()
        print(f"✅ Connected successfully!")
        print(f"   MongoDB Version: {server_info.get('version', 'Unknown')}")
        
        # Test database access
        db = client[database_name]
        
        # List collections
        collections = await db.list_collection_names()
        print(f"📋 Collections in '{database_name}': {collections if collections else 'None (database is empty)'}")
        
        # Test a simple operation
        test_collection = db['connection_test']
        test_doc = {"test": True, "message": "Connection successful!"}
        
        # Insert test document
        result = await test_collection.insert_one(test_doc)
        print(f"✅ Write test successful. Document ID: {result.inserted_id}")
        
        # Read test document
        found_doc = await test_collection.find_one({"_id": result.inserted_id})
        if found_doc:
            print(f"✅ Read test successful. Message: {found_doc.get('message')}")
        
        # Clean up test document
        await test_collection.delete_one({"_id": result.inserted_id})
        print("🧹 Test document cleaned up")
        
        # Count existing documents in each collection
        for collection_name in collections:
            count = await db[collection_name].count_documents({})
            print(f"   {collection_name}: {count} documents")
        
        print("\n🎉 All tests passed! Your MongoDB connection is working perfectly.")
        
        client.close()
        return True
        
    except Exception as e:
        print(f"❌ Connection failed: {str(e)}")
        print("\n🛠️  Troubleshooting tips:")
        print("1. Check your MongoDB Atlas connection string in .env")
        print("2. Verify your username and password are correct")
        print("3. Make sure your IP address is whitelisted in MongoDB Atlas")
        print("4. Ensure your cluster is running (not paused)")
        print("5. Check if special characters in password are URL-encoded")
        
        return False

def check_env_file():
    """Check if .env file exists and has required variables"""
    env_file = ".env"
    
    if not os.path.exists(env_file):
        print(f"❌ .env file not found!")
        print("Please create a .env file with your MongoDB connection details")
        return False
    
    required_vars = ["DATABASE_NAME"]
    missing_vars = []
    
    # Check for either MONGO_URI or MONGODB_URL
    if not (os.getenv("MONGO_URI") or os.getenv("MONGODB_URL")):
        missing_vars.append("MONGO_URI or MONGODB_URL")
    
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)
    
    if missing_vars:
        print(f"❌ Missing environment variables: {', '.join(missing_vars)}")
        return False
    
    print("✅ Environment file looks good!")
    return True

if __name__ == "__main__":
    print("MongoDB Connection Tester for CV Builder")
    print("=" * 50)
    
    # Check environment file first
    if check_env_file():
        # Run connection test
        result = asyncio.run(test_connection())
        
        if result:
            print("\n🚀 Ready to run the CV Builder application!")
            print("Next steps:")
            print("1. Run: python setup_database.py (to initialize collections)")
            print("2. Run: uvicorn main:app --reload (to start the backend)")
        else:
            print("\n❌ Please fix the connection issues before proceeding.")
    else:
        print("\nPlease create/update your .env file and try again.")