from fastapi import FastAPI

from routers import access_token

app = FastAPI()

app.include_router(access_token.router)
