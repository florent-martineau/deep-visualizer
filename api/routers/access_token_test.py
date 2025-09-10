from http.cookies import SimpleCookie

from fastapi.testclient import TestClient

from constants import ACCESS_TOKEN_COOKIE_HEADER, ACCESS_TOKEN_COOKIE_NAME
from main import app

client = TestClient(app)


def make_put_request(token: str | None):
    headers = {ACCESS_TOKEN_COOKIE_HEADER: token} if token else {}
    response = client.put("/access-token", headers=headers)
    cookie = SimpleCookie()
    cookie.load(response.headers["Set-Cookie"])
    access_token_cookie = cookie.get(ACCESS_TOKEN_COOKIE_NAME)
    return response, access_token_cookie


class PutAccessToken:
    class ValidToken:
        valid_token = "hf_123456789abcdefghijklmnopqrstuvwxy"

        def should_set_a_secure_httponly_cookie(self):
            response, access_token_cookie = make_put_request(self.valid_token)
            assert response.status_code == 200
            assert access_token_cookie is not None
            assert access_token_cookie["httponly"]
            assert access_token_cookie["secure"]
            assert access_token_cookie["samesite"] == "strict"
            assert access_token_cookie.value == self.valid_token
