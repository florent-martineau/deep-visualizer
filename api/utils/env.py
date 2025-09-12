from typing import Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv(".env")
load_dotenv(".env.test")


class Settings(BaseSettings):
    environment: Literal["production", "development"]
    betterstack_token: str
    betterstack_ingesting_host: str


settings = Settings.model_validate({})


class TestSettings(BaseSettings):
    hf_access_token_fine_grained: str
    hf_access_token_fine_grained_without_access_to_gated_repos: str
    hf_access_token_read: str
    hf_access_token_write: str


def test_settings():
    return TestSettings.model_validate({})
