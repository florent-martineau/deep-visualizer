from fastapi import FastAPI
from routers import inference
from database.setup import create_db_and_tables
from contextlib import asynccontextmanager


@asynccontextmanager
async def lifespan(app: FastAPI):
    create_db_and_tables()
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(inference.router)
