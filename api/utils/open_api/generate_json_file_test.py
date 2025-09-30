from pathlib import Path

from openapi_core import OpenAPI  # type: ignore
from pytest import MonkeyPatch

from api.utils.open_api.generate_json_file import generate_openapi_json_file


class GenerateOpenApiJsonFileTest:
    def should_generate_a_valid_openapi_json_file(
        self,
        # Fixture from pytest that creates a temporary directory unique for the test
        # invocation. See docs: https://docs.pytest.org/en/6.2.x/tmpdir.html
        tmp_path: Path,
        monkeypatch: MonkeyPatch,
    ):
        # Replace API_BASE_PATH by pytest's fixture
        monkeypatch.setattr(
            "api.utils.open_api.generate_json_file.API_BASE_PATH", tmp_path
        )

        file_name = "test_openapi.json"
        path = tmp_path / file_name
        assert not path.exists(), "Test file should not exist already"

        generate_openapi_json_file(file_name)
        assert path.exists(), "OpenAPI JSON file should exist"

        spec = OpenAPI.from_path(path)
        assert spec.check_spec() is None, "Spec should be valid"
