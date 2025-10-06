from http.cookies import SimpleCookie
from unittest.mock import MagicMock, patch

import pytest
from fastapi.testclient import TestClient

from api.constants import (
    ACCESS_TOKEN_COOKIE_HEADER,
    ACCESS_TOKEN_COOKIE_NAME,
    API_PATH_PREFIX,
)
from api.main import app
from api.utils.env import test_settings


class PostAccessTokenTest:
    def _make_post_request(self, token: str | None):
        headers = {ACCESS_TOKEN_COOKIE_HEADER: token} if token else {}
        response = TestClient(app).post(
            f"{API_PATH_PREFIX}/access-token", headers=headers
        )

        if "Set-Cookie" in response.headers:
            cookie = SimpleCookie()
            cookie.load(response.headers["Set-Cookie"])
            access_token_cookie = cookie.get(ACCESS_TOKEN_COOKIE_NAME)
            return response, access_token_cookie

        return response, None

    @pytest.mark.parametrize(
        "token",
        [
            test_settings().hf_access_token_fine_grained,
            test_settings().hf_access_token_read,
            test_settings().hf_access_token_write,
        ],
        ids=["fine_grained", "read", "write"],
    )
    def should_set_a_secure_httponly_cookie(self, token: str):
        response, access_token_cookie = self._make_post_request(token)
        assert response.status_code == 200
        assert access_token_cookie is not None
        assert access_token_cookie["httponly"]
        assert access_token_cookie["secure"]
        assert access_token_cookie["samesite"] == "strict"
        assert access_token_cookie.value == token

    def should_return_400_if_no_header_is_sent(self):
        response, access_token_cookie = self._make_post_request(None)
        assert response.status_code == 422
        assert access_token_cookie is None

    def should_return_422_if_token_is_invalid(self):
        response, access_token_cookie = self._make_post_request("hf_doesnotexist")
        assert response.status_code == 422
        # TODO: assert response.json().reason == "access-token-invalid"
        assert access_token_cookie is None

    def should_return_422_if_fine_grained_token_cannot_access_gated_repositories(
        self,
    ):
        response, access_token_cookie = self._make_post_request(
            test_settings().hf_access_token_fine_grained_without_access_to_gated_repos
        )
        assert response.status_code == 422
        # TODO: assert response.json().reason == "requires-access-to-gated-repositories"
        assert access_token_cookie is None

    @patch("api.routers.access_token.HfApi")
    def should_return_500_if_an_unexpected_hugginface_whoami_error_occurs(
        self, mock_hf_api: MagicMock
    ):
        mock_hf_api_instance = MagicMock()
        mock_hf_api_instance.whoami.side_effect = Exception(
            "An unexpected error occurred!"
        )
        mock_hf_api.return_value = mock_hf_api_instance

        response, _ = self._make_post_request(test_settings().hf_access_token_read)
        assert mock_hf_api.called
        assert response.status_code == 500


class DeleteAccessTokenTest:
    def _make_request(self, has_cookie: bool):
        client = TestClient(app)

        if has_cookie:
            client.cookies.set(
                ACCESS_TOKEN_COOKIE_NAME, test_settings().hf_access_token_fine_grained
            )

        response = client.delete(f"{API_PATH_PREFIX}/access-token")
        return response

    @pytest.mark.parametrize(
        "has_cookie",
        [True, False],
        ids=["has cookie", "doesn't have cookie"],
    )
    def should_return_204(self, has_cookie: bool):
        response = self._make_request(has_cookie)
        assert response.status_code == 204

    @pytest.mark.parametrize(
        "has_cookie",
        [True, False],
        ids=["has cookie", "doesn't have cookie"],
    )
    def should_delete_access_token_cookie(self, has_cookie: bool):
        response = self._make_request(has_cookie)
        response_access_token_cookie = response.cookies.get(ACCESS_TOKEN_COOKIE_NAME)
        assert response_access_token_cookie is None


class GetAccessTokenTest:
    def _make_request(self, has_cookie: bool):
        client = TestClient(app)

        if has_cookie:
            client.cookies.set(
                ACCESS_TOKEN_COOKIE_NAME, test_settings().hf_access_token_fine_grained
            )

        response = client.get(f"{API_PATH_PREFIX}/access-token")
        return response

    def should_return_204_if_cookie_is_present(self):
        response = self._make_request(True)
        assert response.status_code == 204

    def should_return_404_if_cookie_is_missing(self):
        response = self._make_request(False)
        assert response.status_code == 404
