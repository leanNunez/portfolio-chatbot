import pytest
from google.genai import errors

from scripts import ingest


def api_error(code: int) -> errors.APIError:
    return errors.APIError(code, {"error": {"code": code, "message": "fake", "status": "FAKE"}})


@pytest.fixture
def sleeps(monkeypatch):
    calls = []
    monkeypatch.setattr(ingest.time, "sleep", lambda seconds: calls.append(seconds))
    return calls


def test_retries_on_429_then_succeeds(monkeypatch, sleeps):
    outcomes = [api_error(429), api_error(429), [0.1, 0.2, 0.3]]

    def fake_embed(text):
        outcome = outcomes.pop(0)
        if isinstance(outcome, Exception):
            raise outcome
        return outcome

    monkeypatch.setattr(ingest, "_embed", fake_embed)

    assert ingest.get_embedding("chunk") == [0.1, 0.2, 0.3]
    assert sleeps == [ingest.RETRY_DELAY_SECONDS, ingest.RETRY_DELAY_SECONDS]


def test_gives_up_after_max_retries_on_429(monkeypatch, sleeps):
    calls = []

    def fake_embed(text):
        calls.append(text)
        raise api_error(429)

    monkeypatch.setattr(ingest, "_embed", fake_embed)

    with pytest.raises(errors.APIError) as exc_info:
        ingest.get_embedding("chunk")
    assert exc_info.value.code == 429
    assert len(calls) == ingest.MAX_RETRIES
    assert len(sleeps) == ingest.MAX_RETRIES - 1


def test_raises_immediately_on_non_429_api_error(monkeypatch, sleeps):
    calls = []

    def fake_embed(text):
        calls.append(text)
        raise api_error(400)

    monkeypatch.setattr(ingest, "_embed", fake_embed)

    with pytest.raises(errors.APIError) as exc_info:
        ingest.get_embedding("chunk")
    assert exc_info.value.code == 400
    assert len(calls) == 1
    assert sleeps == []


def test_does_not_retry_on_daily_quota(monkeypatch, sleeps):
    calls = []
    daily = errors.APIError(429, {"error": {"code": 429, "status": "RESOURCE_EXHAUSTED",
        "message": "Quota exceeded: EmbedContentRequestsPerDayPerProjectPerModel-FreeTier"}})

    def fake_embed(text):
        calls.append(text)
        raise daily

    monkeypatch.setattr(ingest, "_embed", fake_embed)

    with pytest.raises(errors.APIError):
        ingest.get_embedding("chunk")
    assert len(calls) == 1
    assert sleeps == []
