from fastapi import APIRouter, HTTPException, Query

from core.activation_function import SUPPORTED_ACTIVATION_FUNCTIONS
from utils.logs import logger

router = APIRouter()


@router.get(
    "/activation-function/{activation_function}",
    description="This function takes as input a range (min, max) and a step. "
    "For each value in this interval, it will apply the activation function, "
    "and return all the associated activations. "
    "This allows you to plot the activation function.",
    status_code=200,
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
