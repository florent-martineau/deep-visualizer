from typing import Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    environment: Literal["production", "development"]
    betterstack_token: str
    betterstack_ingesting_host: str


def settings(env_file: str = ".env"):
    load_dotenv(env_file)
    return Settings.model_validate({})


class TestSettings(BaseSettings):
    hf_access_token_fine_grained: str
    hf_access_token_fine_grained_without_access_to_gated_repos: str
    hf_access_token_read: str
    hf_access_token_write: str


def test_settings(env_file: str = ".env.test"):
    load_dotenv(env_file)
    return TestSettings.model_validate({})
