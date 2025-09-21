from typing import Callable, Dict, Literal, get_args

from pydantic import BaseModel
from torch import Tensor
from transformers.activations import get_activation  # type: ignore

ActivationFunctionName = Literal["gelu", "gelu_new", "silu"]


class ActivationFunction(BaseModel):
    name: ActivationFunctionName
    activation: Callable[[Tensor], Tensor]


ACTIVATION_FUNCTIONS: Dict[ActivationFunctionName, ActivationFunction] = {
    "gelu": ActivationFunction.model_validate(
        {"name": "gelu", "activation": get_activation("gelu")}
    ),
    "gelu_new": ActivationFunction.model_validate(
        {"name": "gelu", "activation": get_activation("gelu_new")}
    ),
    "silu": ActivationFunction.model_validate(
        {"name": "gelu", "activation": get_activation("silu")}
    ),
}


SUPPORTED_ACTIVATION_FUNCTION_NAMES: tuple[ActivationFunctionName] = get_args(
    ActivationFunctionName
)
