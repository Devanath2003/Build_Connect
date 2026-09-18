from pydantic import BaseModel, Field
from typing import Optional, List
import uuid

class ProfessionalProfileCreate(BaseModel):
    specialization: str
    bio: Optional[str] = None
    years_experience: Optional[int] = None
    certifications: List[str] = Field(default_factory=list) # just a safer pydantic pattern, so recommandated way is this
    service_area: Optional[str] = None
    project_rate: Optional[float] = None

class ProfessionalProfileResponse(BaseModel):
    id: uuid.UUID
    user_id: uuid.UUID

    specialization: str
    bio: Optional[str] = None
    years_experience: Optional[int] = None
    certifications: Optional[str] = Field(default_factory=list)
    service_area: Optional[str] = None
    project_rate: Optional[float] = None

    avg_rating: float
    total_reviews: int

    class config:
        from_attributes = True
