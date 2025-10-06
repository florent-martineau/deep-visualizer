from typing import Annotated, Dict, List, Literal, TypeGuard, get_args

import torch
from pydantic import BaseModel, ConfigDict, Field
from transformers.activations import GELUActivation, NewGELUActivation

ActivationFunctionId = Literal["gelu", "approximate-gelu", "silu"]


class ActivationInputOutputPair(BaseModel):
    """
    Represents the output of an activation function given a particular input.

    More details: [here](https://stats.stackexchange.com/a/391685)
    """

    pre_activation: float = Field(
        description="Input to an activation function",
    )
    activation: float = Field(description="Output of an activation function")


class ActivationFunction(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)

    id: Annotated[
        ActivationFunctionId,
        Field(description="Unique identifier for this activation function"),
    ]
    module: Annotated[
        torch.nn.Module,
        Field(
            description="Pytorch module to compute the activation function from tensors"
        ),
    ]
    display_name: Annotated[
        str, Field(description="User-friendly name to be displayed in a UI")
    ]

    def get_activations(self, inputs: List[float]) -> List[ActivationInputOutputPair]:
        inputs_tensor = torch.tensor(inputs)
        activations_tensor = self.module.forward(inputs_tensor)

        activations = [
            ActivationInputOutputPair(
                pre_activation=input_val.item(), activation=activation_val.item()
            )
            for input_val, activation_val in zip(inputs_tensor, activations_tensor)
        ]
        activations.sort(key=lambda activation: activation.pre_activation)

        return activations


_ACTIVATION_FUNCTIONS: List[ActivationFunction] = [
    ActivationFunction(id="gelu", module=GELUActivation(), display_name="GELU"),
    ActivationFunction(
        id="approximate-gelu",
        module=NewGELUActivation(),
        display_name="Approximate GELU",
    ),
    ActivationFunction(id="silu", module=torch.nn.SiLU(), display_name="SiLU"),
]

ACTIVATION_FUNCTIONS: Dict[ActivationFunctionId, ActivationFunction] = {
    activation_function.id: activation_function
    for activation_function in _ACTIVATION_FUNCTIONS
}


SUPPORTED_ACTIVATION_FUNCTION_IDS: tuple[ActivationFunctionId] = get_args(
    ActivationFunctionId
)


def is_supported_activation(id: str) -> TypeGuard[ActivationFunctionId]:
    return id in SUPPORTED_ACTIVATION_FUNCTION_IDS
