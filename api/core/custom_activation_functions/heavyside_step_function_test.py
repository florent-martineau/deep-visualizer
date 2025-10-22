import torch

from api.core.custom_activation_functions.heavyside_step_function import (
    HeavysideStepFunction,
)


def should_properly_compute_activation():
    tensor = torch.linspace(-5, 5, 100)
    expected = torch.heaviside(tensor, torch.tensor(0.0))
    received = HeavysideStepFunction().forward(tensor)
    assert torch.equal(expected, received)
