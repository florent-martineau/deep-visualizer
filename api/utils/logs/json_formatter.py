import json
import logging
from datetime import datetime, timezone
from typing import Dict


class JsonFormatter(logging.Formatter):
    STANDARD_ATTRS = {
        "name",
        "msg",
        "args",
        "levelname",
        "levelno",
        "pathname",
        "filename",
        "module",
        "exc_info",
        "exc_text",
        "stack_info",
        "lineno",
        "funcName",
        "created",
        "msecs",
        "relativeCreated",
        "thread",
        "threadName",
        "processName",
        "process",
        "getMessage",
        "message",
    }

    def format(self, record: logging.LogRecord):
        log_record: Dict[str, str | int] = {
            "timestamp": datetime.now(timezone.utc).isoformat(),
            "level": record.levelname,
            "logger": record.name,
            "module": record.module,
            "line": record.lineno,
            "message": record.getMessage(),
        }

        for key, value in record.__dict__.items():
            if key not in self.STANDARD_ATTRS:
                log_record[key] = str(value)

        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_record)
