from fastapi import FastAPI

from routers import access_token
from routers.core import activation_function

app = FastAPI()

app.include_router(access_token.router)
app.include_router(activation_function.router)
