from pathlib import Path

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=Path(__file__).parent / ".env")

    betterstack_token: str
    betterstack_ingesting_host: str


settings = Settings.model_validate({})
