import json
from pathlib import Path
from typing import Any, Hashable, Mapping

import pytest
from openapi_core import OpenAPI
from pydantic import BaseModel


class OpenApiSpecTest:
    @pytest.fixture(scope="session")
    def openapi_file_spec(self) -> OpenAPI:
        file_path = Path(__file__).parent / "openapi.json"
        return OpenAPI.from_path(file_path)

    def should_be_up_to_date(self, openapi_file_spec: OpenAPI):
        from main import app

        class Schema(BaseModel):
            value: Mapping[Hashable, Any]

        with open(Path(__file__).parent / "openapi.json", "w") as file:
            json.dump(app.openapi(), file, indent=4)

        parsed_spec_from_code = Schema.model_validate(app.openapi())
        spec_from_code = OpenAPI.from_dict(parsed_spec_from_code.value)

        assert openapi_file_spec == spec_from_code
