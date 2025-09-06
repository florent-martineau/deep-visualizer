from fastapi import APIRouter

# from transformers import pipeline
from ..utils.logging.logger import logger

router = APIRouter()


@router.get("/hello/{name}")
async def hello(name: str):
    logger.info("Saying hello")
    return f"Hello, {name}!"


# @router.post("/infer")
# async def infer():
#     model_pipeline = pipeline("text-generation", model="openai-community/gpt2", trust_remote_code=True)
#     return model_pipeline("Tell me something unusual", max_length=50)
