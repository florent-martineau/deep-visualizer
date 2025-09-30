import os
from pathlib import Path

import pytest

from api.utils.env import Settings, TestSettings, settings, test_settings

apiPath = Path(__file__).parent.parent


class SettingsTest:
    def should_have_a_valid_example_env_file(self, monkeypatch: pytest.MonkeyPatch):
        # We remove all environment variables to make sure settings
        # reads from the example file
        for key in os.environ:
            monkeypatch.delenv(key)
            assert key not in os.environ

        # Pydantic validation should throw if a wrong env file is provided,
        # since it cannot fallback on environment variables
        with pytest.raises(ValueError):
            settings(str(apiPath / ".env.doesnotexist"))

        assert isinstance(settings(str(apiPath / ".env.example")), Settings)


class TestSettingsTest:
    def should_have_a_valid_example_env_file(self, monkeypatch: pytest.MonkeyPatch):
        # We remove all environment variables to make sure settings
        # reads from the example file
        for key in os.environ:
            monkeypatch.delenv(key)
            assert key not in os.environ

        # Pydantic validation should throw if a wrong env file is provided,
        # since it cannot fallback on environment variables
        with pytest.raises(ValueError):
            test_settings(str(apiPath / ".env.test.doesnotexist"))

        assert isinstance(
            test_settings(str(apiPath / ".env.test.example")),
            TestSettings,
        )
