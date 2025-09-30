from typing import Any, Hashable, Mapping

import pytest
from openapi_core import OpenAPI  # type: ignore
from pydantic import BaseModel

from api.constants import API_BASE_PATH, OPENAPI_JSON_FILE_NAME


class OpenApiSpecTest:
    @pytest.fixture(scope="session")
    def openapi_file_spec(self) -> OpenAPI:
        file_path = API_BASE_PATH / OPENAPI_JSON_FILE_NAME
        return OpenAPI.from_path(file_path)

    def should_be_up_to_date(self, openapi_file_spec: OpenAPI):
        from api.main import app

        class Schema(BaseModel):
            value: Mapping[Hashable, Any]

        parsed_spec_from_code = Schema.model_validate({"value": app.openapi()})
        spec_from_code = OpenAPI.from_dict(parsed_spec_from_code.value)

        assert openapi_file_spec.__dict__ == spec_from_code.__dict__
