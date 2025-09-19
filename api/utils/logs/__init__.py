import logging

from utils.logs.setup_logger import setup_logger

logger: logging.Logger = setup_logger()

__all__ = ["logger"]
