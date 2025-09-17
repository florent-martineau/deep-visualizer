from fastapi import APIRouter

from core.activation_function import ActivationFunction
from utils.logs.logger import logger

router = APIRouter()


@router.get(
    "/activation-function/{name}",
    description="This function takes as input a range (min, max) and a step. "
    "For each value in this interval, it will apply the activation function, "
    "and return all the associated results. "
    "This allows you to plot the activation function.",
)
async def get_activation_function(name: ActivationFunction):
    logger.info("Retrieving activation function", extra={"name": name})
