import torch

from api.core.custom_activation_functions.elish import ELiSH


def should_handle_strictly_negative_values():
    tensor = torch.linspace(-5, -1e-6, 100)
    expected = (torch.exp(tensor) - 1) * torch.sigmoid(tensor)
    received = ELiSH().forward(tensor)
    assert torch.equal(expected, received)


def should_handle_positive_values():
    tensor = torch.linspace(0, 5, 100)
    expected = torch.nn.SiLU().forward(tensor)
    received = ELiSH().forward(tensor)
    assert torch.equal(expected, received)
