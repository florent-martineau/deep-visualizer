from http.cookies import SimpleCookie

import pytest
from fastapi.testclient import TestClient

from constants import ACCESS_TOKEN_COOKIE_HEADER, ACCESS_TOKEN_COOKIE_NAME
from main import app
from utils.env import test_settings

client = TestClient(app)


def make_post_request(token: str | None):
    headers = {ACCESS_TOKEN_COOKIE_HEADER: token} if token else {}
    response = client.post("/access-token", headers=headers)

    if "Set-Cookie" in response.headers:
        cookie = SimpleCookie()
        cookie.load(response.headers["Set-Cookie"])
        access_token_cookie = cookie.get(ACCESS_TOKEN_COOKIE_NAME)
        return response, access_token_cookie

    return response, None


class PostAccessToken:
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
        response, access_token_cookie = make_post_request(token)
        assert response.status_code == 200
        assert access_token_cookie is not None
        assert access_token_cookie["httponly"]
        assert access_token_cookie["secure"]
        assert access_token_cookie["samesite"] == "strict"
        assert access_token_cookie.value == token

    def should_return_400_if_no_header_is_sent(self):
        response, access_token_cookie = make_post_request(None)
        assert response.status_code == 422
        assert access_token_cookie is None

    def should_return_422_if_token_is_invalid(self):
        response, access_token_cookie = make_post_request("hf_doesnotexist")
        assert response.status_code == 422
        # TODO: assert response.json().reason == "access-token-invalid"
        assert access_token_cookie is None

    def should_return_422_if_fine_grained_token_cannot_access_gated_repositories(
        self,
    ):
        response, access_token_cookie = make_post_request(
            test_settings().hf_access_token_fine_grained_without_access_to_gated_repos
        )
        assert response.status_code == 422
        # TODO: assert response.json().reason == "requires-access-to-gated-repositories"
        assert access_token_cookie is None
