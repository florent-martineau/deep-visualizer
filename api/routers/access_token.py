from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Header, Response
from pydantic import BaseModel, Field, PastDate

from constants import ACCESS_TOKEN_COOKIE_NAME

# from utils.logs.logger import logger

router = APIRouter()


class AccessTokenMetadata(BaseModel):
    is_valid: Annotated[
        bool | None,
        Field(
            default=None,
            description=(
                "Whether the Access Token was valid the last time it was checked."
                "If it was never checked, the value is None."
            ),
            examples=[True, False, None],
        ),
    ] = None

    validated_at: Annotated[
        PastDate | None,
        Field(
            default=None,
            description=(
                "Last time this access token was checked."
                "If it was never checked, the value is None."
            ),
            examples=[datetime(1995, 1, 9, 14, 7, 38)],
        ),
    ] = None


@router.put("/access-token")
async def put_access_token(
    response: Response, x_access_token: str = Header(None, pattern="^hf_.{34, 37}")
) -> AccessTokenMetadata:
    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=x_access_token,
        httponly=True,
        max_age=365 * 24 * 60 * 60,  # 1 year
        secure=True,
        samesite="strict",
    )

    return AccessTokenMetadata(is_valid=None, validated_at=None)
