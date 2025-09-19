#!/usr/bin/env python3
"""Validate that .env.example and .env.test.example files contain
valid configuration."""

import sys
from pathlib import Path

# Add root to path in order to import other modules
sys.path.insert(0, str(Path(__file__).parent.parent))

from utils.env import settings, test_settings
from utils.logs import logger


def main():
    try:
        assert settings(".env.example").environment is not None
        assert (
            test_settings(".env.test.example").hf_access_token_fine_grained is not None
        )

        logger.info("✅ All example environment files are valid")
        return 0
    except Exception as e:
        logger.error(f"❌ Environment file validation failed: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
