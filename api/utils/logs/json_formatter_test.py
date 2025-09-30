import json
import logging
import sys
from datetime import datetime, timezone
from unittest.mock import MagicMock, patch

import pytest

from api.utils.logs import logger
from api.utils.logs.json_formatter import JsonFormatter

LEVELS = logging.getLevelNamesMapping().values()


@patch("api.utils.logs.json_formatter.datetime")
@pytest.mark.parametrize(
    "level", LEVELS, ids=map(lambda level: logging.getLevelName(level), LEVELS)
)
def should_include_default_fields(mock_datetime: MagicMock, level: int):
    message = "This is the message"
    linenumber = 42
    logger_name = "api"

    fixed_time = datetime(1995, 1, 9, tzinfo=timezone.utc)
    mock_datetime.now.return_value = fixed_time
    mock_datetime.timezone = timezone

    exc_info = None
    if level == logging.ERROR:
        try:
            raise ValueError("Test exception")
        except ValueError:
            exc_info = sys.exc_info()

    record = logger.makeRecord(
        name=logger_name,
        level=level,
        fn="/path/to/func.py",
        lno=linenumber,
        msg=message,
        args=(),
        exc_info=exc_info,
        func="test_function",
        extra={"custom_field": "custom_value"},
    )

    formatter = JsonFormatter()
    json_formatted = formatter.format(record=record)
    parsed = json.loads(json_formatted)

    assert parsed["timestamp"] == "1995-01-09T00:00:00+00:00"
    assert parsed["level"] == logging.getLevelName(level)
    assert parsed["logger"] == logger_name
    assert parsed["module"] == record.module
    assert parsed["line"] == linenumber
    assert parsed["message"] == message

    if exc_info:
        assert isinstance(parsed["exception"], str)
    else:
        assert "exception" not in parsed
