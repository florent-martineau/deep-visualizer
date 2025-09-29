import sentry_sdk
from fastapi import FastAPI

from api.utils.env import settings
from routers import access_token
from routers.core import activation_function

sentry_sdk.init(
    dsn=settings().sentry_dsn,
    send_default_pii=False,
    traces_sample_rate=1.0,
    profile_session_sample_rate=1.0,
    profile_lifecycle="trace",
    enable_logs=True,
)

app = FastAPI()

app.include_router(access_token.router)
app.include_router(activation_function.router)
