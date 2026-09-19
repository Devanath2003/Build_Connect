""" 
Need of Alembic !

so whenever we decides to make changes in a table or something in our current database,
inorder to reflect that in the database , we need to do migration - so alembic 
help to change the schema or reflect it

so by doing that, the sql for the corresponding change (eg- ALTER TABLE users...), will be generated
and applies changes to postgreSQL database

we can do upgrade and degrade, like savestates (but it can only restore the structure not data)
"""





import uuid
from datetime import datetime, timezone
from sqlalchemy import Column, String, Boolean, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
import enum
from app.database import Base

from sqlalchemy.orm import relationship

# Roles as Enum (enumeration)
class UserRole(str, enum.Enum):
    CLIENT = "CLIENT"
    PROFESSIONAL = "PROFESSIONAL"

# Users table creation
class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    role = Column(Enum(UserRole), nullable=False)
    name = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    avatar_url = Column(String, nullable=True)
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

    professional_profile = relationship("ProfessionalProfile", back_populates="user", uselist=False)