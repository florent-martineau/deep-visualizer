from typing import Final, List

from pydantic import BaseModel, Field

from core.activation_function import ActivationFunction


class SupportedModel(BaseModel):
    id: Final[str] = Field(description="Model id on the HuggingFace Hub")
    activation_function: ActivationFunction = Field(
        description="Name of the model's activation function"
    )


SUPPORTED_MODELS: Final[List[SupportedModel]] = [
    SupportedModel(id="openai-community/openai-gpt", activation_function="gelu"),
    SupportedModel(id="openai-community/gpt2", activation_function="gelu_new"),
    SupportedModel(id="openai/gpt-oss-20b", activation_function="silu"),
    SupportedModel(id="mistralai/Mistral-7B-Instruct-v0.3", activation_function="silu"),
]
