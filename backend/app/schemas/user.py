from pydantic import BaseModel, EmailStr
from typing import Optional
import uuid
from app.models.user import UserRole

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    role: UserRole
    name: Optional[str] = None

class UserResponse(BaseModel):
    id: uuid.UUID
    email: EmailStr
    role: UserRole
    name: Optional[str] = None

    class config:
        from_attributes = True