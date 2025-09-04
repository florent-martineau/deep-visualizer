from sqlmodel import SQLModel
from .connection import engine

def create_db_and_tables():
    print("Creating database and tables")
    SQLModel.metadata.create_all(engine)
