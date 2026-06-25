import { config } from './appConfig.js'

/**
 * Front-end chat client.
 *
 * Since you don't have a backend yet, this currently returns a deterministic fallback.
 * When you later add an API endpoint, implement a call here.
 */
export async function getAssistantResponse({ messages, signal } = {}) {
  // If/when you add a backend endpoint later, use config.llm.endpoint.
  if (config?.llm?.endpoint) {
    const res = await fetch(config.llm.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
      signal,
    })

    if (!res.ok) {
      throw new Error(`LLM endpoint error: ${res.status}`)
    }

    const data = await res.json()
    // Expect: { content: string }
    return data?.content ?? ''
  }

  // Fallback mock response that tries to feel assistant-like.
  const lastUser = [...(messages ?? [])].reverse().find((m) => m.role === 'user')
  const userText = lastUser?.content ?? ''

  // Simple heuristic to vary responses.
  const responses = [
    'Thanks for your message. What would you like to do next?',
    "I can help with that—share a bit more detail so I answer accurately.",
    'Got it. If you want, I can also summarize the key points.',
    `You said: "${userText}". Tell me your goal and I’ll guide you.`,
  ]

  // Stable selection based on userText length (no randomness to reduce flicker).
  const idx = userText.length % responses.length
  return responses[idx]
}

