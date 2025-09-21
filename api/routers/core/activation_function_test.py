from typing import Dict, List, get_args

import pytest
from fastapi.testclient import TestClient

from core.activation_function import SUPPORTED_ACTIVATION_FUNCTIONS, ActivationFunction
from main import app
from routers.core.activation_function import (
    ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE,
    ActivationFunctionResponse,
)


def _make_request(
    name: str = SUPPORTED_ACTIVATION_FUNCTIONS[0],
    min: float | None = -1,
    max: float | None = 1,
    step: float | None = 0.1,
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


@pytest.mark.parametrize(
    "min, max, step",
    [
        (-1, 1, 0.1),
        (-1, 1, 1 / 3.0),
        (-1, 1, 0.15),
    ],
    ids=[
        "Step divides ranges perfectly",
        "Step almost divides range properly",
        "Step doesn't divide range properly",
    ],
)
def should_include_the_extremums_in_activation_inputs(
    min: float, max: float, step: float
):
    activation_function = SUPPORTED_ACTIVATION_FUNCTIONS[0]
    response = _make_request(
        name=activation_function,
        min=min,
        max=max,
        step=step,
    )

    parsed_response = ActivationFunctionResponse.model_validate(response.json())
    inputs = list(map(lambda activation: activation.input, parsed_response.activations))

    assert min in inputs
    assert max in inputs


@pytest.mark.parametrize(
    "min, max, step, expected_inputs",
    [
        (-1, 1, 1, [-1, 0, 1]),
        (-1, 1, 0.42, [-1, -0.58, -0.16, 0.26, 0.68, 1]),
    ],
    ids=[
        "Step divides ranges perfectly",
        "Step doesn't divide range properly",
    ],
)
def should_have_correct_inputs(
    min: float, max: float, step: float, expected_inputs: List[float]
):
    response = _make_request(
        min=min,
        max=max,
        step=step,
    )

    parsed_response = ActivationFunctionResponse.model_validate(response.json())
    inputs = list(map(lambda activation: activation.input, parsed_response.activations))

    assert set(inputs) == set(expected_inputs)


def should_return_422_if_min_is_greater_than_or_equal_to_max():
    response = _make_request(min=1, max=0)
    assert response.status_code == 422


def should_return_422_if_number_of_activations_to_compute_is_too_large():
    response_below_threshold = _make_request(
        min=1, max=ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE, step=1
    )
    assert response_below_threshold.status_code == 200

    response_below_threshold = _make_request(
        min=1, max=ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE + 1, step=1
    )
    assert response_below_threshold.status_code == 422
