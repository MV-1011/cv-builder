from fastapi import APIRouter, HTTPException, Depends
from typing import List
from database import get_database
from models import Template
from bson import ObjectId

router = APIRouter()

@router.get("/", response_model=List[Template])
async def get_templates(db = Depends(get_database)):
    templates = await db["templates"].find().to_list(100)
    return templates

@router.get("/{template_id}", response_model=Template)
async def get_template(template_id: str, db = Depends(get_database)):
    if not ObjectId.is_valid(template_id):
        raise HTTPException(status_code=400, detail="Invalid template ID")
    
    template = await db["templates"].find_one({"_id": ObjectId(template_id)})
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template

@router.post("/", response_model=Template)
async def create_template(template: Template, db = Depends(get_database)):
    template_dict = template.dict(by_alias=True)
    result = await db["templates"].insert_one(template_dict)
    created_template = await db["templates"].find_one({"_id": result.inserted_id})
    return created_template

@router.put("/{template_id}", response_model=Template)
async def update_template(template_id: str, template: Template, db = Depends(get_database)):
    if not ObjectId.is_valid(template_id):
        raise HTTPException(status_code=400, detail="Invalid template ID")
    
    template_dict = template.dict(by_alias=True, exclude={"id"})
    result = await db["templates"].update_one(
        {"_id": ObjectId(template_id)},
        {"$set": template_dict}
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    
    updated_template = await db["templates"].find_one({"_id": ObjectId(template_id)})
    return updated_template

@router.delete("/{template_id}")
async def delete_template(template_id: str, db = Depends(get_database)):
    if not ObjectId.is_valid(template_id):
        raise HTTPException(status_code=400, detail="Invalid template ID")
    
    result = await db["templates"].delete_one({"_id": ObjectId(template_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return {"message": "Template deleted successfully"}