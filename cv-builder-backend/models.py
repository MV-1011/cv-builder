from pydantic import BaseModel, EmailStr, Field, validator
from typing import Optional, List, Union
from datetime import datetime
from bson import ObjectId

class PyObjectId(ObjectId):
    @classmethod
    def __get_pydantic_core_schema__(cls, source_type, handler):
        from pydantic_core import core_schema
        return core_schema.with_info_plain_validator_function(
            cls.validate,
            serialization=core_schema.to_string_ser_schema(),
        )

    @classmethod
    def validate(cls, v, info=None):
        if isinstance(v, ObjectId):
            return v
        if isinstance(v, str):
            if ObjectId.is_valid(v):
                return ObjectId(v)
        raise ValueError("Invalid ObjectId")

class PersonalInfo(BaseModel):
    full_name: str
    email: Optional[EmailStr] = None
    phone: str
    address: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    postal_code: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
    summary: Optional[str] = None

class Education(BaseModel):
    institution: str
    degree: str
    field_of_study: str
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    gpa: Optional[str] = None
    description: Optional[str] = None

class Experience(BaseModel):
    company: str
    position: str
    location: Optional[str] = None
    start_date: str
    end_date: Optional[str] = None
    current: bool = False
    description: str
    achievements: Optional[List[str]] = []

class Skill(BaseModel):
    name: str
    level: Optional[str] = None

class Language(BaseModel):
    name: str
    proficiency: str

class Project(BaseModel):
    name: str
    description: str
    technologies: Optional[List[str]] = []
    link: Optional[str] = None
    start_date: Optional[str] = None
    end_date: Optional[str] = None

class Certification(BaseModel):
    name: str
    issuer: str
    date: str
    credential_id: Optional[str] = None
    url: Optional[str] = None

class Reference(BaseModel):
    name: str
    position: str
    company: str
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    relationship: Optional[str] = None

class Resume(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    user_id: Optional[str] = None
    template_id: str
    personal_info: PersonalInfo
    education: List[Education] = []
    experience: List[Experience] = []
    skills: List[Skill] = []
    languages: List[Language] = []
    projects: List[Project] = []
    certifications: List[Certification] = []
    references: List[Reference] = []
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class Template(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    name: str
    description: str
    preview_image: Optional[str] = None
    category: str
    is_premium: bool = False
    sections: List[str] = []
    color_scheme: dict = {}
    font_family: str = "Arial"
    layout: str = "single-column"

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}

class User(BaseModel):
    id: Optional[PyObjectId] = Field(default_factory=PyObjectId, alias="_id")
    email: EmailStr
    username: str
    hashed_password: str
    full_name: Optional[str] = None
    is_active: bool = True
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}