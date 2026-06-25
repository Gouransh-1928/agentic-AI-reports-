# CODENOIDS Backend (FastAPI + Ollama)

This backend exposes `POST /api/chat` and forwards the request to **Ollama** using the model **llama3.1**.

## Requirements
- Ollama running locally (default: `http://localhost:11434`)
- Model pulled in Ollama: `llama3.1`

## Install
```bash
cd codenoids/backend
pip install -r requirements.txt
```

## Run
```bash
cd codenoids/backend
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## API
### Request
`POST /api/chat`
```json
{
  "messages": [
    {"role": "user", "content": "Hello"}
  ]
}
```

### Response
```json
{ "content": "...assistant reply..." }
```

## Environment variables (optional)
- `OLLAMA_URL` (default: `http://localhost:11434`)
- `OLLAMA_MODEL` (default: `llama3.1`)

