import json

from api.constants import API_BASE_PATH, OPENAPI_JSON_FILE_NAME
from api.main import app


def generate_openapi_json_file(file_name: str = OPENAPI_JSON_FILE_NAME):
    with open(API_BASE_PATH / file_name, "w") as f:
        json.dump(app.openapi(), f, indent=2)
