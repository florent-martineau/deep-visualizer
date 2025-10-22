from typing import Annotated, Dict, Final, List

import torch
from pydantic import BaseModel, ConfigDict, Field
from transformers.activations import GELUActivation, NewGELUActivation

from api.core.custom_activation_functions.elish import ELiSH
from api.core.custom_activation_functions.heavyside_step_function import (
    HeavysideStepFunction,
)
from api.core.custom_activation_functions.sinusoid import Sinusoid


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
        str,
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


_ACTIVATION_FUNCTIONS: Final[List[ActivationFunction]] = [
    ActivationFunction(
        id="identity", module=torch.nn.Identity(), display_name="Identity"
    ),
    ActivationFunction(
        id="elu",
        module=torch.nn.ELU(),
        display_name="ELU: Exponential Linear Unit",
    ),
    ActivationFunction(
        id="gelu",
        module=GELUActivation(),
        display_name="GELU: Gaussian Error Linear Unit",
    ),
    ActivationFunction(
        id="relu",
        module=torch.nn.ReLU(),
        display_name="ReLU: Rectified Linear Unit",
    ),
    ActivationFunction(
        id="approximate-gelu",
        module=NewGELUActivation(),
        display_name="Approximate GELU: Approximate Gaussian Error Linear Unit",
    ),
    ActivationFunction(
        id="silu", module=torch.nn.SiLU(), display_name="SiLU: Sigmoid Linear Unit"
    ),
    ActivationFunction(
        id="selu",
        module=torch.nn.SELU(),
        display_name="SELU: Scaled Exponential Linear Unit",
    ),
    ActivationFunction(id="sinusoid", module=Sinusoid(), display_name="Sinusoid"),
    ActivationFunction(
        id="elish",
        module=ELiSH(),
        display_name="ELiSH: Exponential Linear Sigmoid SquasHing",
    ),
    ActivationFunction(
        id="heavyside-step-function",
        module=HeavysideStepFunction(),
        display_name="Heavyside step function (aka Binary Step)",
    ),
    ActivationFunction(
        id="prelu",
        module=torch.nn.PReLU(),
        display_name="PReLU: Parametric Rectified Linear Unit",
    ),
    ActivationFunction(
        id="sigmoid",
        module=torch.nn.Sigmoid(),
        display_name="Sigmoid (aka Logistic, Soft Step)",
    ),
    ActivationFunction(
        id="softplus",
        module=torch.nn.Softplus(),
        display_name="Softplus",
    ),
    ActivationFunction(
        id="softsign",
        module=torch.nn.Softsign(),
        display_name="Softsign",
    ),
    ActivationFunction(
        id="tanh",
        module=torch.nn.Tanh(),
        display_name="Tanh: Hyperbolic tangent",
    ),
    ActivationFunction(
        id="leaky-relu",
        module=torch.nn.LeakyReLU(),
        display_name="Leaky ReLU: Leaky Rectified Linear Unit",
    ),
]

ACTIVATION_FUNCTIONS: Dict[str, ActivationFunction] = {
    activation_function.id: activation_function
    for activation_function in _ACTIVATION_FUNCTIONS
}


SUPPORTED_ACTIVATION_FUNCTION_IDS: tuple[str, ...] = tuple(
    map(lambda activation_function: activation_function.id, _ACTIVATION_FUNCTIONS)
)


def is_supported_activation(id: str) -> bool:
    return id in SUPPORTED_ACTIVATION_FUNCTION_IDS
