from contextlib import asynccontextmanager

import sentry_sdk
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.routers import access_token
from api.routers.core import activation_function
from api.utils.env import settings
from api.utils.logs import logger
from api.utils.open_api.generate_json_file import generate_openapi_json_file

sentry_sdk.init(
    dsn=settings().sentry_dsn,
    send_default_pii=False,
    traces_sample_rate=1.0,
    profile_session_sample_rate=1.0,
    profile_lifecycle="trace",
    enable_logs=True,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("Generate OpenAPI json spec")
    generate_openapi_json_file(app)
    yield


app = FastAPI(lifespan=lifespan)

app.include_router(access_token.router)
app.include_router(activation_function.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[settings().front_base_url],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
