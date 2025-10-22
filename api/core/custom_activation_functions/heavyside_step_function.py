import torch


class HeavysideStepFunction(torch.nn.Module):
    def __init__(self):
        super().__init__()

    def forward(self, x: torch.Tensor):
        return torch.heaviside(x, torch.tensor(0.0))
