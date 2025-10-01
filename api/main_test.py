from unittest.mock import MagicMock, patch

from fastapi import FastAPI
from fastapi.testclient import TestClient

from api.main import app


class LifespanTest:
    @patch("api.main.generate_openapi_json_file")
    def should_generate_openapi_json_file_on_startup(
        self, mock_generate_json: MagicMock
    ):
        with TestClient(app) as _:
            mock_generate_json.assert_called_once()

            args, _ = mock_generate_json.call_args
            assert isinstance(args[0], FastAPI)
            assert args[0] == app
