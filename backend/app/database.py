from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

# SQLAlchemy engine creation.
engine = create_engine(DATABASE_URL)

# SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for the models to inherit from
Base = declarative_base()

# A dependency to get the daatabase session
def get_db():
    db = SessionLocal()
    try:  
        yield db
    finally:
        db.close()