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
    
    # Ensure _id is properly converted to string for each resume
    for resume in resumes:
        if "_id" in resume:
            resume["_id"] = str(resume["_id"])
    
    return resumes

@router.get("/{resume_id}", response_model=Resume)
async def get_resume(resume_id: str, db = Depends(get_database)):
    if not ObjectId.is_valid(resume_id):
        raise HTTPException(status_code=400, detail="Invalid resume ID")
    
    resume = await db["resumes"].find_one({"_id": ObjectId(resume_id)})
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
    
    # Ensure _id is properly converted to string
    if "_id" in resume:
        resume["_id"] = str(resume["_id"])
    
    return resume

@router.post("/", response_model=Resume)
async def create_resume(resume: Resume, db = Depends(get_database)):
    resume_dict = resume.dict(by_alias=True)
    resume_dict["created_at"] = datetime.utcnow()
    resume_dict["updated_at"] = datetime.utcnow()
    
    # Remove the _id field if it exists (let MongoDB generate it)
    if "_id" in resume_dict:
        del resume_dict["_id"]
    
    result = await db["resumes"].insert_one(resume_dict)
    created_resume = await db["resumes"].find_one({"_id": result.inserted_id})
    
    # Ensure _id is properly converted to string
    if created_resume and "_id" in created_resume:
        created_resume["_id"] = str(created_resume["_id"])
    
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
    
    # Ensure _id is properly converted to string
    if updated_resume and "_id" in updated_resume:
        updated_resume["_id"] = str(updated_resume["_id"])
    
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
    try:
        if not ObjectId.is_valid(resume_id):
            raise HTTPException(status_code=400, detail="Invalid resume ID")
        
        resume = await db["resumes"].find_one({"_id": ObjectId(resume_id)})
        if not resume:
            raise HTTPException(status_code=404, detail="Resume not found")
        
        # Try to find template - handle both ObjectId and string template_id
        template = None
        template_id = resume.get("template_id")
        
        if template_id:
            # First try as ObjectId if it's valid
            if ObjectId.is_valid(template_id):
                template = await db["templates"].find_one({"_id": ObjectId(template_id)})
            
            # If not found or not valid ObjectId, try as string ID or name
            if not template:
                template = await db["templates"].find_one({
                    "$or": [
                        {"_id": template_id},
                        {"name": template_id},
                        {"template_number": template_id}
                    ]
                })
        
        # If still no template found, use a default template or skip template-specific formatting
        if not template:
            print(f"Warning: Template not found for ID {template_id}, using default")
            template = {"name": "default", "settings": {}}
        
        if format.lower() == "pdf":
            try:
                pdf_path = generate_pdf(resume, template)
                if not os.path.exists(pdf_path):
                    raise HTTPException(status_code=500, detail="PDF generation failed - file not created")
                return FileResponse(
                    pdf_path,
                    media_type="application/pdf",
                    filename=f"resume_{resume_id}.pdf",
                    headers={"Content-Disposition": f"attachment; filename=resume_{resume_id}.pdf"}
                )
            except Exception as pdf_error:
                raise HTTPException(status_code=500, detail=f"PDF generation failed: {str(pdf_error)}")
        else:
            raise HTTPException(status_code=400, detail="Unsupported format")
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Download failed: {str(e)}")