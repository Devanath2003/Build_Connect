from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User, UserRole
from app.models.professional import ProfessionalProfile
from app.schemas.professional import ProfessionalProfileCreate, ProfessionalProfileResponse

router = APIRouter(prefix="/professionals",tags=["Professionals"])