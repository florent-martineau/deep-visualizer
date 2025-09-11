from typing import Literal

from fastapi import APIRouter, Header, HTTPException, Response
from huggingface_hub import HfApi
from pydantic import BaseModel, Field
from requests import HTTPError

from constants import ACCESS_TOKEN_COOKIE_NAME
from utils.logs.logger import logger

router = APIRouter()


class WhoAmIResponse(BaseModel):
    class Auth(BaseModel):
        type: Literal["access_token"]

        class FineGrainedAccessToken(BaseModel):
            class FineGrained(BaseModel):
                can_read_gated_repos: bool = Field(alias="canReadGatedRepos")

            role: Literal["fineGrained"]
            fine_grained: FineGrained = Field(alias="fineGrained")

        class NotFineGrainedAccessToken(BaseModel):
            role: Literal["read", "write"]

        access_token: FineGrainedAccessToken | NotFineGrainedAccessToken = Field(
            alias="accessToken"
        )

    type: Literal["user"]
    auth: Auth


@router.post(
    "/access-token",
    description="Stores HF Hub User Access Token as an httpOnly secure cookie.",
)
async def post_access_token(response: Response, x_access_token: str = Header()):
    logger.info("Received User Access Token")

    hf_api = HfApi()
    logger.info("Instantiated HfApi client")

    try:
        logger.info("Calling the whoami endpoint")
        who_am_i_raw_response = hf_api.whoami(x_access_token)  # type: ignore
        logger.info("Successfull request to the whoami endpoint")
    except HTTPError:
        logger.info(
            "User Access Token is invalid, regardless of the scopes associated with it"
        )
        raise HTTPException(
            status_code=422,
            detail=("User Access Token is invalid"),
        )
    except Exception as e:
        logger.error(
            "An unexpected error occured while calling the whoami endpoint",
            extra={"error": e},
        )
        raise HTTPException(status_code=500)

    who_am_i_response = WhoAmIResponse.model_validate(who_am_i_raw_response)
    logger.info("The whoami response satisfied the expected schema")

    hf_access_token = who_am_i_response.auth.access_token
    if (
        hf_access_token.role == "fineGrained"
        and not hf_access_token.fine_grained.can_read_gated_repos
    ):
        can_read_gated_repos = hf_access_token.fine_grained.can_read_gated_repos
        logger.info(
            "The fine grained token provided cannot read gated repos. It's invalid.",
            extra={
                "hf_access_token": hf_access_token.role,
                "can_read_gated_repos": can_read_gated_repos,
            },
        )
        raise HTTPException(
            status_code=422,
            detail=("Fine grained tokens need to be able to read gated repositories."),
        )

    logger.info(
        "Read, write, and 'fineGrained that can read gated repos' "
        "are all valid access tokens",
        extra={"role": hf_access_token.role},
    )

    response.set_cookie(
        key=ACCESS_TOKEN_COOKIE_NAME,
        value=x_access_token,
        httponly=True,
        max_age=60 * 24 * 60 * 60,  # 60 days
        secure=True,
        samesite="strict",
    )
