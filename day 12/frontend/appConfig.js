export const config = {
  // SECURITY NOTE:
  // Real LLM calls must not be done directly from the browser in production.
  // This app is front-end only. Replace this with a backend endpoint later.
  llm: {
    // FastAPI backend endpoint that forwards to Ollama
    endpoint: 'http://localhost:8000/api/chat',
    model: 'gpt-4o-mini',
  },
};

