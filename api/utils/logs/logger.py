import logging
from logging.config import dictConfig

from utils.env import settings

from .json_formatter import JsonFormatter

dictConfig(
    {
        "version": 1,
        "disable_existing_loggers": False,
        "formatters": {
            "default": {
                "format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s",
                "datefmt": "%Y-%m-%d %H:%M:%S",
            },
            "json": {"()": JsonFormatter},
        },
        "handlers": {
            "console": {
                "class": "logging.StreamHandler",
                "level": "DEBUG",
                "formatter": "default",
                "stream": "ext://sys.stdout",
            },
            "file": {
                "class": "logging.handlers.RotatingFileHandler",
                "level": "INFO",
                "formatter": "json",
                "filename": "fastapi.log",
                "mode": "a",
                "maxBytes": 10485760,  # 10 MB
                "backupCount": 5,
            },
            "logtail": {
                "class": "logtail.LogtailHandler",
                "level": "INFO",
                "source_token": settings.betterstack_token,
                "host": settings.betterstack_ingesting_host,
            },
        },
        "root": {"handlers": ["console", "file", "logtail"], "level": "DEBUG"},
    }
)

logger = logging.getLogger("api")
