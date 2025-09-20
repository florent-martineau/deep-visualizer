import json
import logging
from datetime import datetime, timezone
from io import StringIO
from logging import Logger
from typing import Literal
from unittest.mock import patch

import pytest

from utils.logs.json_formatter import JsonFormatter


@pytest.fixture
def formatter():
    """Fixture to create a JsonFormatter instance."""
    return JsonFormatter()


@pytest.fixture
def logger_with_formatter(formatter: JsonFormatter):
    """Fixture to create a logger with JsonFormatter and string stream."""
    logger = logging.getLogger("test_logger")
    logger.setLevel(logging.DEBUG)

    # Clear any existing handlers
    logger.handlers.clear()

    # Create a string stream to capture log output
    log_stream = StringIO()
    handler = logging.StreamHandler(log_stream)
    handler.setFormatter(formatter)
    logger.addHandler(handler)

    # Return both logger and stream for easy access
    yield logger, log_stream

    # Cleanup
    logger.handlers.clear()
    log_stream.close()


class JsonFormatterTest:
    """Test class for JsonFormatter."""

    def should_succesfully_log_basic_record(
        self, logger_with_formatter: tuple[Logger, StringIO]
    ):
        """Test basic log message formatting."""
        logger, log_stream = logger_with_formatter

        logger.info("Test message")

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert log_data["level"] == "INFO"
        assert log_data["message"] == "Test message"
        assert log_data["logger"] == "test_logger"
        assert "timestamp" in log_data
        assert "line" in log_data

    @pytest.mark.parametrize(
        "level_name",
        logging.getLevelNamesMapping().keys(),
    )
    def should_log_successfully_for_level(
        self,
        logger_with_formatter: tuple[Logger, StringIO],
        level_name: str,
    ):
        """Test formatting with different log levels."""
        logger, log_stream = logger_with_formatter

        # Get the logging function for this level
        log_func = getattr(logger, level_name.lower())
        message = f"Level: {level_name}"
        log_func(message)

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert log_data["level"] == level_name
        assert log_data["message"] == message

    def should_format_current_time_in_isoformat(self, formatter: JsonFormatter):
        with patch("__main__.datetime") as mock_datetime:
            fixed_time = datetime(year=1995, month=1, day=9, tzinfo=timezone.utc)
            mock_datetime.now.return_value = fixed_time

            record = logging.LogRecord(
                name="test",
                level=logging.INFO,
                pathname="test.py",
                lineno=42,
                msg="Test message",
                args=(),
                exc_info=None,
            )

            formatted = formatter.format(record)
            log_data = json.loads(formatted)

            expected_timestamp = fixed_time.isoformat()
            assert log_data["timestamp"] == expected_timestamp

    def test_exception_logging(self, logger_with_formatter: tuple[Logger, StringIO]):
        """Test logging with exception information."""
        logger, log_stream = logger_with_formatter

        try:
            raise ValueError("Test exception")
        except ValueError:
            logger.exception("An error occurred")

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert log_data["level"] == "ERROR"
        assert log_data["message"] == "An error occurred"
        assert "exception" in log_data
        assert "ValueError: Test exception" in log_data["exception"]
        assert "Traceback" in log_data["exception"]

    def test_extra_fields(self, logger_with_formatter: tuple[Logger, StringIO]):
        """Test logging with extra fields."""
        logger, log_stream = logger_with_formatter

        logger.info("Test message", extra={"user_id": 123, "request_id": "abc-def"})

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert log_data["message"] == "Test message"
        assert log_data["user_id"] == 123
        assert log_data["request_id"] == "abc-def"

    def test_json_serialization(self, logger_with_formatter: tuple[Logger, StringIO]):
        """Test that the output is valid JSON."""
        logger, log_stream = logger_with_formatter

        logger.info("Test message")

        log_output = log_stream.getvalue().strip()

        # This should not raise an exception
        log_data = json.loads(log_output)

        # Verify it's a dictionary
        assert isinstance(log_data, dict)

    def test_special_characters_in_message(
        self, logger_with_formatter: tuple[Logger, StringIO]
    ):
        """Test handling of special characters in log messages."""
        logger, log_stream = logger_with_formatter

        special_message = 'Message with "quotes", newlines\n, and unicode: éñ'
        logger.info(special_message)

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert log_data["message"] == special_message

    def test_none_values_handling(self, formatter: JsonFormatter):
        """Test handling of None values in log record."""
        # Create a log record with some None values
        record = logging.LogRecord(
            name="test",
            level=logging.INFO,
            pathname="test.py",
            lineno=42,
            msg="Test message",
            args=(),
            exc_info=None,
        )

        # Add a None value to the record
        record.custom_field = None

        formatted = formatter.format(record)
        log_data = json.loads(formatted)

        assert log_data["custom_field"] is None
        assert log_data["message"] == "Test message"

    @pytest.mark.parametrize(
        "field", ["timestamp", "level", "logger", "line", "message"]
    )
    def test_required_fields_present(
        self,
        logger_with_formatter: tuple[Logger, StringIO],
        field: Literal["timestamp"]
        | Literal["level"]
        | Literal["logger"]
        | Literal["line"]
        | Literal["message"],
    ):
        """Test that all required fields are present in the output."""
        logger, log_stream = logger_with_formatter

        logger.info("Test message")

        log_output = log_stream.getvalue().strip()
        log_data = json.loads(log_output)

        assert field in log_data
