import json

from api.constants import API_BASE_PATH
from api.main import app


def generate_openapi_json(file_name: str = "openapi.json"):
    with open(API_BASE_PATH / file_name, "w") as f:
        json.dump(app.openapi(), f, indent=2)
