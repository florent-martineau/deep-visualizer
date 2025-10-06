from typing import Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

from api.constants import API_BASE_PATH

Environment = Literal["production", "development"]


class Settings(BaseSettings):
    api_betterstack_token: str
    api_betterstack_ingesting_host: str
    environment: Environment
    front_base_url: str
    sentry_dsn: str


def settings(env_file: str = ".env"):
    load_dotenv(API_BASE_PATH / env_file)
    return Settings.model_validate({})


class TestSettings(BaseSettings):
    hf_access_token_fine_grained: str
    hf_access_token_fine_grained_without_access_to_gated_repos: str
    hf_access_token_read: str
    hf_access_token_write: str


def test_settings(env_file: str = ".env.test"):
    load_dotenv(API_BASE_PATH / env_file)
    return TestSettings.model_validate({})
