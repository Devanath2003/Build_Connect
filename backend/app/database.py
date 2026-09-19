# The whole process is for a level of abstraction.

"""
Alembic mainly work with the schema of the database, like creating the tables and manipulating the columns in it,
while SQLAlchemy works with database connection and ORM - which is setting up queries
for insertion or query operations - means operations we do on data of the database
"""

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.config import DATABASE_URL

# SQLAlchemy engine creation.
engine = create_engine(DATABASE_URL)

"""
Engine - creates a connection pool with the postgres driver, tht means multiple connection links will be there, so if many requests come,
and the engine will provide connections to each of them, and one request is completed , the connection is reused for another request
"""

# SessionLocal class for database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

"""
SessionLocal - It is a Sessionmaking factory , where a session is a unit of work, which provided to an endpoint to access the
database for a certain process - maybe for a query something, then after the work it is closed, so this Sessionmaker manages this session

Generate and provide those who want a session with database or uses a connection from the engine when needed
"""

# Base class for the models to inherit from
Base = declarative_base()

# A dependency to get the daatabase session
def get_db():
    db = SessionLocal()
    try:  
        yield db
    finally:
        db.close()