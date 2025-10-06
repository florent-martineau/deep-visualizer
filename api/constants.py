from pathlib import Path
from typing import Annotated, Final

from pydantic import Field

ACCESS_TOKEN_COOKIE_NAME: Final[str] = "access_token"
ACCESS_TOKEN_COOKIE_HEADER: Final[str] = "X-Access-Token"
API_BASE_PATH: Path = Path(__file__).parent
OPENAPI_JSON_FILE_NAME: Final[str] = "openapi.json"
API_PATH_PREFIX: Final[
    Annotated[str, Field(description="Base path prefix for all API endpoints")]
] = ""
