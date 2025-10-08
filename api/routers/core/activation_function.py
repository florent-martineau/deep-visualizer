from typing import List, Set

from api.core.activation_function import (
    ACTIVATION_FUNCTIONS,
    SUPPORTED_ACTIVATION_FUNCTION_IDS,
    ActivationInputOutputPair,
    is_supported_activation,
)
from api.utils.logs import logger
from api.utils.routers.router import getApiRouter
from fastapi import HTTPException, Path, Query
from pydantic import BaseModel

router = getApiRouter("/activation-functions")

# Maximum number of activations to be computed by the activation function route
ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE = 10_000


class ActivationFunctionResponse(BaseModel):
    activations: List[ActivationInputOutputPair]


@router.get(
    "/{activation_function_id}",
    description="This function takes as input a range (min, max) and a step. "
    "For each value in this interval, it will apply the activation function, "
    "and return all the associated activations. "
    "This allows you to plot the activation function.",
    status_code=200,
    response_model=ActivationFunctionResponse,
)
async def get_activation_function(
    activation_function_id: str = Path(
        description="Id of the activation function",
        examples=list(SUPPORTED_ACTIVATION_FUNCTION_IDS),
    ),
    min: float = Query(description="Minimum value to generate activations from."),
    max: float = Query(description="Maximum value to generate activations from."),
    step: float = Query(
        description="Step between each input value. "
        "For instance, a step of 0.1 would generate activations for "
        "inputs -1.0, -0.9, ..."
    ),
):
    logger.info(
        "Retrieving activation function",
        extra={
            "activation_function": activation_function_id,
            "min": min,
            "max": max,
            "step": step,
        },
    )

    if not is_supported_activation(activation_function_id):
        raise HTTPException(
            status_code=404,
            detail=f"Activation function '{activation_function_id}' not found. "
            f"Valid functions are: {', '.join(SUPPORTED_ACTIVATION_FUNCTION_IDS)}",
        )

    activation_function = ACTIVATION_FUNCTIONS[activation_function_id]

    if min >= max:
        raise HTTPException(
            status_code=422, detail=f"min ({min}) should be less than max ({max})"
        )

    inputs: Set[float] = set([min, max])
    curr = min + step
    while curr <= max:
        inputs.add(round(curr, 6))

        if len(inputs) > ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE:
            raise HTTPException(
                status_code=422,
                detail="The total number of activations to compute must not be greater "
                "than " + str(ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE),
            )

        curr += step

    return ActivationFunctionResponse(
        activations=activation_function.get_activations(list(inputs))
    )
