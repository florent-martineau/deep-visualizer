from pathlib import Path
from typing import Final

ACCESS_TOKEN_COOKIE_NAME: Final[str] = "access_token"
ACCESS_TOKEN_COOKIE_HEADER: Final[str] = "X-Access-Token"
API_BASE_PATH: Path = Path(__file__).parent
