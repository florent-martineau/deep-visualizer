import json
import logging
from datetime import datetime, timezone
from typing import Any, Dict


class JsonFormatter(logging.Formatter):
    def format(self, record: logging.LogRecord):
        log_record: Dict[str, Any] = {}

        for key, value in record.__dict__.items():
            log_record[key] = value

        log_record["timestamp"] = datetime.now(timezone.utc).isoformat()
        log_record["level"] = record.levelname
        log_record["logger"] = record.name
        log_record["line"] = record.lineno
        log_record["message"] = record.getMessage()

        if record.exc_info:
            log_record["exception"] = self.formatException(record.exc_info)

        return json.dumps(log_record)
