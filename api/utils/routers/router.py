from fastapi import APIRouter

from api.constants import API_PATH_PREFIX


def getApiRouter(prefix: str | None) -> APIRouter:
    final_prefix = API_PATH_PREFIX if prefix is None else f"{API_PATH_PREFIX}{prefix}"
    return APIRouter(prefix=final_prefix)
