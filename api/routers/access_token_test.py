from http.cookies import SimpleCookie

from fastapi.testclient import TestClient

from constants import ACCESS_TOKEN_COOKIE_HEADER, ACCESS_TOKEN_COOKIE_NAME
from main import app

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


VALID_TOKEN = "hf_123456789abcdefghijklmnopqrstuvwxy"


class PostAccessToken:
    def should_set_a_secure_httponly_cookie(self):
        response, access_token_cookie = make_post_request(VALID_TOKEN)
        assert response.status_code == 200
        assert access_token_cookie is not None
        assert access_token_cookie["httponly"]
        assert access_token_cookie["secure"]
        assert access_token_cookie["samesite"] == "strict"
        assert access_token_cookie.value == VALID_TOKEN

    def should_return_400_if_no_header_is_sent(self):
        response, access_token_cookie = make_post_request(None)
        assert response.status_code == 422
        assert access_token_cookie is None
