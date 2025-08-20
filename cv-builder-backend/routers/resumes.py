from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import FileResponse
from typing import List
from database import get_database
from models import Resume
from bson import ObjectId
from datetime import datetime
import os
from pdf_generator import generate_pdf

router = APIRouter()

@router.get("/", response_model=List[Resume])
async def get_resumes(user_id: str = None, db = Depends(get_database)):
    query = {}
    if user_id:
        query["user_id"] = user_id
    resumes = await db["resumes"].find(query).to_list(100)
    return resumes

@router.get("/{resume_id}", response_model=Resume)
async def get_resume(resume_id: str, db = Depends(get_database)):
    if not ObjectId.is_valid(resume_id):
        raise HTTPException(status_code=400, detail="Invalid resume ID")
    
    resume = await db["resumes"].find_one({"_id": ObjectId(resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    return resume

@router.post("/", response_model=Resume)
async def create_resume(resume: Resume, db = Depends(get_database)):
    resume_dict = resume.dict(by_alias=True)
    resume_dict["created_at"] = datetime.utcnow()
    resume_dict["updated_at"] = datetime.utcnow()
    
    result = await db["resumes"].insert_one(resume_dict)
    created_resume = await db["resumes"].find_one({"_id": result.inserted_id})
    return created_resume

@router.put("/{resume_id}", response_model=Resume)
async def update_resume(resume_id: str, resume: Resume, db = Depends(get_database)):
    if not ObjectId.is_valid(resume_id):
        raise HTTPException(status_code=400, detail="Invalid resume ID")
    
    resume_dict = resume.dict(by_alias=True, exclude={"id", "created_at"})
    resume_dict["updated_at"] = datetime.utcnow()
    
    result = await db["resumes"].update_one(
        {"_id": ObjectId(resume_id)},
        {"$set": resume_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    updated_resume = await db["resumes"].find_one({"_id": ObjectId(resume_id)})
    return updated_resume

@router.delete("/{resume_id}")
async def delete_resume(resume_id: str, db = Depends(get_database)):
    if not ObjectId.is_valid(resume_id):
        raise HTTPException(status_code=400, detail="Invalid resume ID")
    
    result = await db["resumes"].delete_one({"_id": ObjectId(resume_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    return {"message": "Resume deleted successfully"}

@router.get("/{resume_id}/download")
async def download_resume(resume_id: str, format: str = "pdf", db = Depends(get_database)):
    if not ObjectId.is_valid(resume_id):
        raise HTTPException(status_code=400, detail="Invalid resume ID")
    
    resume = await db["resumes"].find_one({"_id": ObjectId(resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    template = await db["templates"].find_one({"_id": ObjectId(resume["template_id"])})
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    if format.lower() == "pdf":
        pdf_path = generate_pdf(resume, template)
        return FileResponse(
            pdf_path,
            media_type="application/pdf",
            filename=f"resume_{resume_id}.pdf"
        )
    else:
        raise HTTPException(status_code=400, detail="Unsupported format")