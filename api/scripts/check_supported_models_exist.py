import sys
from pathlib import Path
from typing import List

from huggingface_hub import HfApi

from utils.logs import logger

# Add root to path in order to import other modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from core.supported_models import SUPPORTED_MODELS


def main():
    hf_api = HfApi()
    logger.info("Instantiated HF Api client")

    models_not_found: List[str] = []
    for model in SUPPORTED_MODELS:
        if not hf_api.repo_exists(model.id):
            models_not_found.append(model.id)
            logger.error("❌ Unable to find supported model", extra={"model": model})

    if len(models_not_found) > 0:
        return 1

    logger.info("✅ All supported models exist", extra={"count": len(SUPPORTED_MODELS)})
    return 0


if __name__ == "__main__":
    sys.exit(main())
