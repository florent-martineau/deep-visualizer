from typing import Dict, List, Literal, TypeGuard, get_args

import torch
from pydantic import BaseModel, ConfigDict
from transformers.activations import GELUActivation, NewGELUActivation

ActivationFunctionName = Literal["gelu", "gelu_new", "silu"]


class Activation(BaseModel):
    input: float
    activation: float


class ActivationFunction(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    name: ActivationFunctionName
    module: torch.nn.Module

    def get_activations(self, inputs: List[float]) -> List[Activation]:
        inputs_tensor = torch.tensor(inputs)
        activations_tensor = self.module.forward(inputs_tensor)

        activations = [
            Activation(input=input_val.item(), activation=activation_val.item())
            for input_val, activation_val in zip(inputs_tensor, activations_tensor)
        ]
        activations.sort(key=lambda activation: activation.input)

        return activations


_ACTIVATION_FUNCTIONS_TUPLE: List[tuple[ActivationFunctionName, torch.nn.Module]] = [
    ("gelu", GELUActivation()),
    ("gelu_new", NewGELUActivation()),
    ("silu", torch.nn.SiLU()),
]

ACTIVATION_FUNCTIONS: Dict[ActivationFunctionName, ActivationFunction] = {
    name: ActivationFunction(name=name, module=module)
    for name, module in _ACTIVATION_FUNCTIONS_TUPLE
}


SUPPORTED_ACTIVATION_FUNCTION_NAMES: tuple[ActivationFunctionName] = get_args(
    ActivationFunctionName
)


def is_supported_activation(name: str) -> TypeGuard[ActivationFunctionName]:
    return name in SUPPORTED_ACTIVATION_FUNCTION_NAMES
