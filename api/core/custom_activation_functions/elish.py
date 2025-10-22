import torch
import torch.nn as nn


class ELiSH(nn.Module):
    def __init__(self):
        super(ELiSH, self).__init__()

    def forward(self, x: torch.Tensor):
        return torch.where(
            x >= 0, torch.nn.SiLU().forward(x), (torch.exp(x) - 1) * torch.sigmoid(x)
        )
