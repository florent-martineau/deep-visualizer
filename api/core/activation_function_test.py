import pytest

from core.activation_function import (
    _ACTIVATION_FUNCTIONS_TUPLE,  # type: ignore[reportPrivateUsage]
    ACTIVATION_FUNCTIONS,
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


class ActivationFunctionsDictTest:
    def should_contain_exactly_activations_defined_in_config(self):
        assert len(_ACTIVATION_FUNCTIONS_TUPLE) == len(ACTIVATION_FUNCTIONS)

        expected_keys = set(
            map(
                lambda activation_tuple: activation_tuple[0],
                _ACTIVATION_FUNCTIONS_TUPLE,
            )
        )
        actual_keys = set(ACTIVATION_FUNCTIONS.keys())
        assert actual_keys == expected_keys

    def should_have_the_object_name_match_the_key(self):
        for key, activation_function in ACTIVATION_FUNCTIONS.items():
            assert key == activation_function.name
