from typing import get_args

import pytest
from fastapi.testclient import TestClient

from core.activation_function import SUPPORTED_ACTIVATION_FUNCTIONS, ActivationFunction
from main import app


def _make_request(name: str):
    client = TestClient(app)

    response = client.get(f"/activation-function/{name}")
    return response


def should_return_404_if_activation_function_is_not_supported():
    name = "does-not-exist"
    response = _make_request(name)

    assert name not in SUPPORTED_ACTIVATION_FUNCTIONS
    assert response.status_code == 404


@pytest.mark.parametrize("name", SUPPORTED_ACTIVATION_FUNCTIONS)
def should_not_return_404_if_activation_function_is_supported(name: str):
    response = _make_request(name)

    assert name in get_args(ActivationFunction)
    assert response.status_code != 404
