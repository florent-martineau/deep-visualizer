from fastapi import APIRouter
from transformers import pipeline

router = APIRouter()

@router.post("/infer")
async def infer():
    model_pipeline = pipeline("text-generation", model="openai-community/gpt2", trust_remote_code=True)
    return model_pipeline("Tell me something unusual", max_length=50)
