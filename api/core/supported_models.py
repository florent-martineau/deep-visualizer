from typing import Final, List

from pydantic import BaseModel, Field

from api.core.activation_function import ACTIVATION_FUNCTIONS, ActivationFunction


class SupportedModel(BaseModel):
    id: Final[str] = Field(description="Model id on the HuggingFace Hub")
    activation_function: ActivationFunction = Field(
        description="Activation function associated to this model"
    )


SUPPORTED_MODELS: Final[List[SupportedModel]] = [
    SupportedModel(
        id="openai-community/openai-gpt",
        activation_function=ACTIVATION_FUNCTIONS["gelu"],
    ),
    SupportedModel(
        id="openai-community/gpt2",
        activation_function=ACTIVATION_FUNCTIONS["approximate-gelu"],
    ),
    SupportedModel(
        id="openai/gpt-oss-20b", activation_function=ACTIVATION_FUNCTIONS["silu"]
    ),
    SupportedModel(
        id="mistralai/Mistral-7B-Instruct-v0.3",
        activation_function=ACTIVATION_FUNCTIONS["silu"],
    ),
]
