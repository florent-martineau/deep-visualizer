from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env.test")

    betterstack_token: str
    betterstack_ingesting_host: str


settings = Settings.model_validate({})


class TestSettings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env.test")

    hf_access_token_fine_grained: str
    hf_access_token_fine_grained_without_access_to_gated_repos: str
    hf_access_token_read: str
    hf_access_token_write: str


def test_settings():
    return TestSettings.model_validate({})
