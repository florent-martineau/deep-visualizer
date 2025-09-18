from typing import Dict, get_args

import pytest
from fastapi.testclient import TestClient

from core.activation_function import SUPPORTED_ACTIVATION_FUNCTIONS, ActivationFunction
from main import app


def _make_request(
    name: str, min: float | None = -1, max: float | None = 1, step: float | None = 0.1
):
    client = TestClient(app)

    params: Dict[str, float] = {}
    if min is not None:
        params["min"] = min

    if max is not None:
        params["max"] = max

    if step is not None:
        params["step"] = step

    response = client.get(f"/activation-function/{name}", params=params)
    return response


def should_return_404_if_activation_function_is_not_supported():
    name = "does-not-exist"
    response = _make_request(name=name)

    assert name not in SUPPORTED_ACTIVATION_FUNCTIONS
    assert response.status_code == 404


@pytest.mark.parametrize("name", SUPPORTED_ACTIVATION_FUNCTIONS)
def should_not_return_404_if_activation_function_is_supported(name: str):
    response = _make_request(name=name)

    assert name in get_args(ActivationFunction)
    assert response.status_code != 404


@pytest.mark.parametrize(
    "has_min, has_max, has_step",
    [
        (has_min, has_max, has_step)
        for has_min in [True, False]
        for has_max in [True, False]
        for has_step in [True, False]
    ],
)
def should_not_return_422_if_mandatory_parameter_is_missing(
    has_min: bool, has_max: bool, has_step: bool
):
    if has_min and has_max and has_step:
        pytest.skip("All mandatory parameters are provided")

    activation_function = SUPPORTED_ACTIVATION_FUNCTIONS[0]
    response = _make_request(
        name=activation_function,
        min=-1 if has_min else None,
        max=1 if has_max else None,
        step=0.1 if has_step else None,
    )

    assert response.status_code == 422
