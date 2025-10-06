from unittest.mock import MagicMock, patch

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.testclient import TestClient
from pydantic import TypeAdapter

from api.main import app
from api.utils.env import settings


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


class CorsTest:
    def should_have_appropriate_origins(self):
        for middleware in app.user_middleware:
            if middleware.cls == CORSMiddleware:
                origins_adapter = TypeAdapter(list[str])
                allowed_origins = origins_adapter.validate_python(
                    middleware.kwargs.get("allow_origins")
                )
                assert allowed_origins is not None
                assert len(allowed_origins) == 1
                assert allowed_origins[0] == settings().front_base_url
                break
