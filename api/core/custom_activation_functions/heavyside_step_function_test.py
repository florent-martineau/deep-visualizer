import torch

from api.core.custom_activation_functions.sinusoid import Sinusoid


def should_properly_compute_activation():
    tensor = torch.linspace(-5, 5, 100)
    expected = torch.heaviside(tensor, torch.tensor(0.0))
    received = Sinusoid().forward(tensor)
    assert torch.equal(expected, received)
