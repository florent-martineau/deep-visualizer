from typing import Literal, get_args

ActivationFunction = Literal["gelu", "gelu_new", "silu"]
SUPPORTED_ACTIVATION_FUNCTIONS: tuple[ActivationFunction] = get_args(ActivationFunction)
