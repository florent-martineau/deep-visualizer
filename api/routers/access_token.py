from fastapi import APIRouter, Header, Response

from constants import ACCESS_TOKEN_COOKIE_NAME

# from utils.logs.logger import logger

router = APIRouter()


@router.post(
    "/access-token",
    description="Store HF Hub User Access Token as an httpOnly secure cookie.",
)
async def post_access_token(response: Response, x_access_token: str = Header()):
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=x_access_token,
        httponly=True,
        max_age=365 * 24 * 60 * 60,  # 1 year
        secure=True,
        samesite="strict",
    )
