import pytest

from api.constants import API_PATH_PREFIX
from api.utils.routers.router import getApiRouter


@pytest.mark.parametrize("prefix", ["/foo", None])
def should_be_correctly_prefixed(prefix: str | None):
    router = getApiRouter(prefix=prefix)

    if prefix is None:
        assert router.prefix == API_PATH_PREFIX
        return

    assert router.prefix.startswith(API_PATH_PREFIX)
    assert router.prefix.endswith(prefix)
    assert len(router.prefix) == len(API_PATH_PREFIX) + len(prefix)
    assert router.prefix == f"{API_PATH_PREFIX}{prefix}"
