from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    betterstack_token: str
    betterstack_ingesting_host: str

    model_config = SettingsConfigDict(env_file=".env")


settings = Settings()
