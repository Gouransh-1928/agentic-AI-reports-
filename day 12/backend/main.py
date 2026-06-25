from __future__ import annotations

import os
from typing import Any, Dict, List, Optional

import requests
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


# Simple preflight handler: FastAPI CORS sometimes still needs explicit OPTIONS.



OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11434")

OLLAMA_MODEL = os.getenv("OLLAMA_MODEL", "llama3.1")
# Keep API simple for the current frontend. If you later want streaming,
# you'll need SSE/WebSocket support on both backend + frontend.

app = FastAPI(title="CODENOIDS Ollama Chat API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5183", "http://localhost:5184", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]
    # optional knobs
    temperature: Optional[float] = None
    max_tokens: Optional[int] = None


class ChatResponse(BaseModel):
    content: str


def build_prompt(messages: List[ChatMessage]) -> str:
    """Convert chat messages to a plain prompt.

    Ollama's /api/generate expects a prompt string.
    For Llama 3.x, a chat-style prompt can improve responses.

    Note: This is intentionally simple to match your existing frontend payload.
    """

    # A minimal chat template.
    # You can refine this if you prefer exact Llama 3 chat formatting.
    parts: List[str] = []
    for m in messages:
        role = m.role.strip().lower()
        if role == "system":
            parts.append(f"[SYSTEM]\n{m.content.strip()}\n")
        elif role == "assistant":
            parts.append(f"[ASSISTANT]\n{m.content.strip()}\n")
        else:
            parts.append(f"[USER]\n{m.content.strip()}\n")

    parts.append("[ASSISTANT]\n")
    return "\n".join(parts).strip()


@app.options("/api/chat")
def options_chat():
    # For simple CORS preflight compatibility
    return


@app.post("/api/chat", response_model=ChatResponse)

def chat(req: ChatRequest) -> ChatResponse:
    prompt = build_prompt(req.messages)

    payload: Dict[str, Any] = {
        "model": OLLAMA_MODEL,
        "prompt": prompt,
        # keep defaults reasonable; allow override from frontend later
        "stream": False,
    }

    if req.temperature is not None:
        payload["options"] = payload.get("options", {})
        payload["options"]["temperature"] = req.temperature

    if req.max_tokens is not None:
        payload["options"] = payload.get("options", {})
        payload["options"]["num_predict"] = req.max_tokens

    try:
        r = requests.post(f"{OLLAMA_URL}/api/generate", json=payload, timeout=120)
    except requests.RequestException as e:
        raise HTTPException(status_code=503, detail=f"Failed to reach Ollama: {e}")

    if r.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Ollama error: {r.status_code} - {r.text}")

    data = r.json()
    content = data.get("response")
    if not isinstance(content, str):
        raise HTTPException(status_code=502, detail=f"Unexpected Ollama response: {data}")

    return ChatResponse(content=content)

