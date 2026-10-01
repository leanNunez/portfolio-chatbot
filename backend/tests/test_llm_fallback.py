from types import SimpleNamespace

import pytest

from services import rag_service


class FakeModels:
    def __init__(self, text=None, error=None):
        self._text = text
        self._error = error
        self.calls = []

    def generate_content(self, model, contents, config):
        self.calls.append({"model": model, "contents": contents, "config": config})
        if self._error is not None:
            raise self._error
        return SimpleNamespace(text=self._text)


def use_fake_client(monkeypatch, models: FakeModels):
    monkeypatch.setattr(rag_service, "_get_client", lambda: SimpleNamespace(models=models))


@pytest.fixture
def groq_calls(monkeypatch):
    calls = []

    def fake_groq(user_message):
        calls.append(user_message)
        return "respuesta de groq"

    monkeypatch.setattr(rag_service, "_call_groq", fake_groq)
    return calls


def test_returns_gemini_text_when_present(monkeypatch, groq_calls):
    models = FakeModels(text="respuesta de gemini")
    use_fake_client(monkeypatch, models)

    assert rag_service._call_llm("hola") == "respuesta de gemini"
    assert groq_calls == []
    call = models.calls[0]
    assert call["model"] == rag_service.LLM_MODEL
    assert call["contents"] == "hola"
    assert call["config"].system_instruction == rag_service.SYSTEM_PROMPT


def test_falls_back_to_groq_on_exception(monkeypatch, groq_calls):
    use_fake_client(monkeypatch, FakeModels(error=RuntimeError("boom")))

    assert rag_service._call_llm("hola") == "respuesta de groq"
    assert groq_calls == ["hola"]


@pytest.mark.parametrize("empty", ["", None])
def test_falls_back_to_groq_on_empty_text(monkeypatch, groq_calls, empty):
    use_fake_client(monkeypatch, FakeModels(text=empty))

    assert rag_service._call_llm("hola") == "respuesta de groq"
    assert groq_calls == ["hola"]
