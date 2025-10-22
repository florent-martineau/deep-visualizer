import torch


class Sinusoid(torch.nn.Module):
    def __init__(self):
        pass

    def forward(self, x: torch.Tensor):
        return torch.sin(x)
