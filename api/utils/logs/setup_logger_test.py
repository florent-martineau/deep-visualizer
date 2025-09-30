from typing import get_args

import logtail  # type:ignore
import pytest

from api.utils.env import Environment, settings
from api.utils.logs.setup_logger import setup_logger


def should_have_logtail_handler_in_production(monkeypatch: pytest.MonkeyPatch):
    monkeypatch.setenv("ENVIRONMENT", "production")
    assert settings().environment == "production"
    assert any(
        isinstance(handler, logtail.LogtailHandler)
        for handler in setup_logger().handlers
    )


@pytest.mark.parametrize("environment", get_args(Environment))
def should_not_have_logtail_handler_outside_of_production(
    monkeypatch: pytest.MonkeyPatch, environment: Environment
):
    if environment == "production":
        pytest.skip("This test does not apply for the production environment")

    monkeypatch.setenv("ENVIRONMENT", environment)
    assert settings().environment != "production"

    assert len(setup_logger().handlers) > 0
    assert all(
        not isinstance(handler, logtail.LogtailHandler)
        for handler in setup_logger().handlers
    )


# TODO: add more comprehensive testing
