from typing import List, Set

from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel

from core.activation_function import SUPPORTED_ACTIVATION_FUNCTIONS
from utils.logs import logger

router = APIRouter()

# Maximum number of activations to be computed by the activation function route
ACTIVATION_FUNCTION_ROUTE__MAX_ACTIVATIONS_TO_COMPUTE = 10_000


class Activation(BaseModel):
    input: float
    activation: float


class ActivationFunctionResponse(BaseModel):
    activations: List[Activation]


@router.get(
    "/activation-function/{activation_function}",
    description="This function takes as input a range (min, max) and a step. "
    "For each value in this interval, it will apply the activation function, "
    "and return all the associated activations. "
    "This allows you to plot the activation function.",
    status_code=200,
    response_model=ActivationFunctionResponse,
)
async def get_activation_function(
    activation_function: str,
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
        extra={"activation_function": activation_function},
    )

    if activation_function not in SUPPORTED_ACTIVATION_FUNCTIONS:
        raise HTTPException(
            status_code=404,
            detail=f"Activation function '{activation_function}' not found. "
            f"Valid functions are: {', '.join(SUPPORTED_ACTIVATION_FUNCTIONS)}",
        )

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
        activations=[Activation(input=input, activation=0.0) for input in inputs]
    )
