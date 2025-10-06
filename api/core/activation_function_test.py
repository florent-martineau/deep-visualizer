import pytest

from api.core.activation_function import (
    _ACTIVATION_FUNCTIONS,  # type: ignore[reportPrivateUsage]
    ACTIVATION_FUNCTIONS,
    SUPPORTED_ACTIVATION_FUNCTION_IDS,
    is_supported_activation,
)


class IsSupportedActivationTypeGuardTest:
    @pytest.mark.parametrize(
        "activation_function_id",
        ["gelu_does_not_exist", "prefixed_gelu", "azertyuiop"],
    )
    def should_return_false_for_unsupported_activation_function(
        self, activation_function_id: str
    ):
        assert not is_supported_activation(activation_function_id)

    @pytest.mark.parametrize(
        "activation_function_id",
        SUPPORTED_ACTIVATION_FUNCTION_IDS,
    )
    def should_return_true_for_unsupported_activation_function(
        self, activation_function_id: str
    ):
        assert is_supported_activation(activation_function_id)


class ActivationFunctionsDictTest:
    def should_contain_exactly_activations_defined_in_config(self):
        assert len(_ACTIVATION_FUNCTIONS) == len(ACTIVATION_FUNCTIONS)

        expected_keys = set(
            map(
                lambda activation_function: activation_function.id,
                _ACTIVATION_FUNCTIONS,
            )
        )
        actual_keys = set(ACTIVATION_FUNCTIONS.keys())
        assert actual_keys == expected_keys

    def should_have_the_object_id_match_the_key(self):
        for key, activation_function in ACTIVATION_FUNCTIONS.items():
            assert key == activation_function.id
