import pytest
from huggingface_hub import HfApi

from core.supported_models import SUPPORTED_MODELS, SupportedModel


@pytest.mark.parametrize(
    "model", SUPPORTED_MODELS, ids=map(lambda model: model.id, SUPPORTED_MODELS)
)
def should_be_a_valid_huggingface_model(model: SupportedModel):
    hf_api = HfApi()
    assert hf_api.repo_exists(model.id)
