# codenoids

## About me

Hi! I’m **GOURANSH**. I build web applications and interactive experiences.

Update your real bio inside `src/App.jsx`.

## Resume

Download my resume:

- [GOURANSH_Resume.pdf](public/GOURANSH_Resume.pdf)

## Chat bot

This app includes a chat UI that streams responses word-by-word.

- `src/chatClient.js` contains the chat “LLM” integration point.
- Right now it works without a backend (fallback responses) because you don’t have an API endpoint set up yet.

When you later add a backend, implement your API call in `getAssistantResponse()` (or set `config.llm.endpoint`).

