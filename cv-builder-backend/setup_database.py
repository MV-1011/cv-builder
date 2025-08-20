import asyncio
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime
import os
from dotenv import load_dotenv

load_dotenv()

async def setup_database():
    """Initialize MongoDB collections and add sample data"""
    
    # Connect to MongoDB
    mongo_uri = os.getenv("MONGO_URI") or os.getenv("MONGODB_URL")
    client = AsyncIOMotorClient(mongo_uri)
    db = client[os.getenv("DATABASE_NAME")]
    
    print(f"Connected to database: {os.getenv('DATABASE_NAME')}")
    
    # Create collections
    collections = ['templates', 'resumes', 'users']
    
    for collection_name in collections:
        # Create collection if it doesn't exist
        if collection_name not in await db.list_collection_names():
            await db.create_collection(collection_name)
            print(f"Created collection: {collection_name}")
        else:
            print(f"Collection already exists: {collection_name}")
    
    # Add sample templates
    templates_collection = db['templates']
    
    sample_templates = [
        {
            "name": "Professional",
            "description": "Clean and professional template perfect for corporate positions",
            "category": "Business",
            "is_premium": False,
            "sections": ["personal", "summary", "experience", "education", "skills"],
            "color_scheme": {
                "primary": "#2c3e50",
                "secondary": "#3498db",
                "accent": "#ecf0f1"
            },
            "font_family": "Arial",
            "layout": "single-column"
        },
        {
            "name": "Creative",
            "description": "Modern and creative design for designers and artists",
            "category": "Creative",
            "is_premium": False,
            "sections": ["personal", "portfolio", "skills", "experience", "education"],
            "color_scheme": {
                "primary": "#e74c3c",
                "secondary": "#f39c12",
                "accent": "#fff"
            },
            "font_family": "Helvetica",
            "layout": "two-column"
        },
        {
            "name": "Minimalist",
            "description": "Simple and elegant design that focuses on content",
            "category": "Minimal",
            "is_premium": False,
            "sections": ["personal", "experience", "education", "skills", "projects"],
            "color_scheme": {
                "primary": "#34495e",
                "secondary": "#95a5a6",
                "accent": "#ecf0f1"
            },
            "font_family": "Georgia",
            "layout": "single-column"
        },
        {
            "name": "Executive",
            "description": "Sophisticated template for senior executives and managers",
            "category": "Executive",
            "is_premium": False,
            "sections": ["personal", "executive_summary", "experience", "achievements", "education", "skills"],
            "color_scheme": {
                "primary": "#1a1a1a",
                "secondary": "#4a90e2",
                "accent": "#f5f5f5"
            },
            "font_family": "Times New Roman",
            "layout": "single-column"
        },
        {
            "name": "Tech Pro",
            "description": "Perfect for software developers and IT professionals",
            "category": "Technology",
            "is_premium": False,
            "sections": ["personal", "skills", "experience", "projects", "education", "certifications"],
            "color_scheme": {
                "primary": "#2d3436",
                "secondary": "#00b894",
                "accent": "#dfe6e9"
            },
            "font_family": "Consolas",
            "layout": "two-column"
        },
        {
            "name": "Academic",
            "description": "Ideal for researchers, professors, and academic professionals",
            "category": "Academic",
            "is_premium": False,
            "sections": ["personal", "research_interests", "education", "publications", "experience", "awards"],
            "color_scheme": {
                "primary": "#2c3e50",
                "secondary": "#8e44ad",
                "accent": "#ecf0f1"
            },
            "font_family": "Times New Roman",
            "layout": "single-column"
        }
    ]
    
    # Check if templates already exist
    existing_templates = await templates_collection.count_documents({})
    
    if existing_templates == 0:
        # Insert sample templates
        result = await templates_collection.insert_many(sample_templates)
        print(f"Inserted {len(result.inserted_ids)} sample templates")
    else:
        print(f"Templates already exist: {existing_templates} templates found")
    
    # Create indexes for better performance
    await templates_collection.create_index("name")
    await templates_collection.create_index("category")
    
    await db['resumes'].create_index("user_id")
    await db['resumes'].create_index("template_id")
    await db['resumes'].create_index("created_at")
    
    await db['users'].create_index("email", unique=True)
    await db['users'].create_index("username", unique=True)
    
    print("\nDatabase setup completed successfully!")
    print("\nCollections created:")
    for collection in await db.list_collection_names():
        count = await db[collection].count_documents({})
        print(f"  - {collection}: {count} documents")
    
    # Close connection
    client.close()

async def verify_connection():
    """Verify MongoDB connection"""
    try:
        mongo_uri = os.getenv("MONGO_URI") or os.getenv("MONGODB_URL")
        client = AsyncIOMotorClient(mongo_uri, serverSelectionTimeoutMS=5000)
        # Try to get server info
        await client.server_info()
        print("✅ MongoDB connection successful!")
        client.close()
        return True
    except Exception as e:
        print(f"❌ MongoDB connection failed: {e}")
        print("\nPlease update the .env file with your MongoDB credentials:")
        print("1. Go to MongoDB Atlas (https://cloud.mongodb.com)")
        print("2. Get your connection string")
        print("3. Update MONGO_URI in .env file")
        return False

if __name__ == "__main__":
    print("MongoDB CV Builder Setup")
    print("=" * 50)
    
    # First verify connection
    if asyncio.run(verify_connection()):
        # If connection successful, setup database
        asyncio.run(setup_database())
    else:
        print("\nSetup aborted. Please fix the connection issue first.")