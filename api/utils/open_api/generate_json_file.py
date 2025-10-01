import json

from fastapi import FastAPI

from api.constants import API_BASE_PATH, OPENAPI_JSON_FILE_NAME
from api.utils.logs import logger


def generate_openapi_json_file(app: FastAPI, file_name: str = OPENAPI_JSON_FILE_NAME):
    file_path = API_BASE_PATH / file_name
    logger.debug("Generating OpenAPI json spec", {"file_path": file_path})

    with open(file_path, "w") as f:
        json.dump(app.openapi(), f, indent=2)
