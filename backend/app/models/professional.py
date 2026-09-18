import uuid

from sqlalchemy import Column, String, Integer, Float, ForeignKey, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base

class ProfessionalProfile(Base):
    __tablename__ = "professional_profiles"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), unique=True, nullable=False)
    specialization = Column(String, nullable=False)
    bio = Column(String, nullable=True)
    years_experience = Column(Integer, nullable=True)
    certifications = Column(JSON, default=list)
    service_area = Column(String, nullable=True)
    project_rate = Column(Float, nullable=True)
    avg_rating = Column(Float, default=0.0)
    total_reviews = Column(Integer, default=0)

    user = relationship("User", back_populates="professional_profile")