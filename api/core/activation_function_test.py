import pytest

from core.activation_function import (
    SUPPORTED_ACTIVATION_FUNCTION_NAMES,
    is_supported_activation,
)


class IsSupportedActivationTypeGuardTest:
    @pytest.mark.parametrize(
        "activation_function_name",
        ["gelu_does_not_exist", "prefixed_gelu", "azertyuiop"],
    )
    def should_return_false_for_unsupported_activation_function(
        self, activation_function_name: str
    ):
        assert not is_supported_activation(activation_function_name)

    @pytest.mark.parametrize(
        "activation_function_name",
        SUPPORTED_ACTIVATION_FUNCTION_NAMES,
    )
    def should_return_true_for_unsupported_activation_function(
        self, activation_function_name: str
    ):
        assert is_supported_activation(activation_function_name)
