from typing import Callable, Dict, List, Literal, TypeGuard, get_args

import torch
from pydantic import BaseModel
from torch import Tensor
from transformers.activations import get_activation  # type: ignore

ActivationFunctionName = Literal["gelu", "gelu_new", "silu"]


class Activation(BaseModel):
    input: float
    activation: float


class ActivationFunction(BaseModel):
    name: ActivationFunctionName
    activation_fn: Callable[[Tensor], Tensor]

    def get_activations(self, inputs: List[float]) -> List[Activation]:
        inputs_tensor = torch.tensor(inputs)
        activations_tensor = self.activation_fn(inputs_tensor)

        activations = [
            Activation(input=input_val.item(), activation=activation_val.item())
            for input_val, activation_val in zip(inputs_tensor, activations_tensor)
        ]
        activations.sort(key=lambda activation: activation.input)

        return activations


ACTIVATION_FUNCTIONS: Dict[ActivationFunctionName, ActivationFunction] = {
    "gelu": ActivationFunction.model_validate(
        {"name": "gelu", "activation_fn": get_activation("gelu")}
    ),
    "gelu_new": ActivationFunction.model_validate(
        {"name": "gelu_new", "activation_fn": get_activation("gelu_new")}
    ),
    "silu": ActivationFunction.model_validate(
        {"name": "silu", "activation_fn": get_activation("silu")}
    ),
}


SUPPORTED_ACTIVATION_FUNCTION_NAMES: tuple[ActivationFunctionName] = get_args(
    ActivationFunctionName
)


def is_supported_activation(name: str) -> TypeGuard[ActivationFunctionName]:
    return name in SUPPORTED_ACTIVATION_FUNCTION_NAMES
