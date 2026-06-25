import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { getAssistantResponse } from './chatClient'
import './resume.css'
import './AppChatStyles.css'
import './AboutPageStyles.css'
import './HeaderStyles.css'
import './HeaderNavStyles.css'

function App() {
  const [showAbout, setShowAbout] = useState(false)

  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Let's start chatting! 👇" },
  ])
  const [prompt, setPrompt] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)

  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, isStreaming])

  const canSend = useMemo(() => {
    return !isStreaming && prompt.trim().length > 0
  }, [isStreaming, prompt])

  async function handleSend() {
    if (!canSend) return

    const userText = prompt.trim()
    setPrompt('')

    const nextMessages = [...messages, { role: 'user', content: userText }]
    setMessages(nextMessages)

    setIsStreaming(true)

    try {
      const controller = new AbortController()
      const assistantText = await getAssistantResponse({
        messages: nextMessages,
        signal: controller.signal,
      })

      // Stream word-by-word like the Streamlit demo
      // BUT: don’t destroy formatting. Keep existing newlines from the model.
      const parts = assistantText.split(/(\n+)/) // keep newline tokens

      let full = ''

      // Add placeholder assistant message we will update
      setMessages((prev) => [...prev, { role: 'assistant', content: '' }])

      for (const part of parts) {
        if (part === '\n' || part === '\n\n' || /^\n+$/.test(part)) {
          // preserve line breaks
          full += part
        } else {
          // split the non-newline segments into words to keep the typing effect
          const words = part.split(/\s+/).filter(Boolean)
          for (const w of words) {
            full += (full && !full.endsWith('\n') ? ' ' : '') + w
            await new Promise((r) => setTimeout(r, 40))
          }
        }

        setMessages((prev) => {
          const copy = [...prev]
          const last = copy[copy.length - 1]
          if (last?.role === 'assistant') last.content = full + ' ▌'
          return copy
        })
      }

      setMessages((prev) => {
        const copy = [...prev]
        const last = copy[copy.length - 1]
        if (last?.role === 'assistant') last.content = full
        return copy
      })
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry—something went wrong while generating the response.' },
      ])
    } finally {

      setIsStreaming(false)
      inputRef.current?.focus()
    }

  }

  return (
    <>
      <header id="site-header">
        <div id="site-header-inner">
          <div id="site-brand">codenoids</div>

          <div id="site-header-actions">
            <div className="dropdown" role="group" aria-label="Contact me">
              <button type="button" className="dropbtn" aria-haspopup="true">
                Contact me
              </button>
              <div className="dropdown-content" role="menu">
                <a
                  role="menuitem"
                  href="mailto:gouranshsalonia@gmail.com?subject=Hello%20CODENOIDS"
                >
                  Email
                </a>

                <a
                  role="menuitem"
                  href="https://linkedin.com/in/gouransh-salonia-706279295"
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>

                <a
                  role="menuitem"
                  href="https://github.com/Gouransh-1928"
                  target="_blank"
                  rel="noreferrer"
                >
                  GitHub
                </a>

                <a
                  role="menuitem"
                  href="#about"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  About
                </a>
              </div>
            </div>

            <div className="dropdown" role="group" aria-label="Settings">
              <button type="button" className="dropbtn" aria-haspopup="true">
                Settings
              </button>
              <div className="dropdown-content" role="menu">
                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item"
                  onClick={() => setShowAbout(true)}
                >
                  View About Me
                </button>

                <button
                  type="button"
                  role="menuitem"
                  className="dropdown-item"
                  onClick={() => {
                    setMessages([{ role: 'assistant', content: "Let's start chatting! 👇" }])
                    setPrompt('')
                    inputRef.current?.focus()
                  }}
                >
                  Reset chat
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <section id="chat-hero">
        <h1>Welcome to CODENOIDS</h1>
        <p>
         :your solution our problem:
        </p>

        <div id="chat-panel" aria-live="polite">
          <div id="chat-messages">
            {messages.map((m, idx) => (
              <div
                key={`${m.role}-${idx}`}
                className={`msg msg-${m.role}`}
                role="group"
                aria-label={`${m.role} message`}
              >
                <div className="msg-bubble">
                  {m.content.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          <div id="chat-input-row">
            <input
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="enter your query"
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend()
              }}
              disabled={isStreaming}
              aria-label="Chat input"
            />
            <button type="button" className="send" disabled={!canSend} onClick={handleSend}>
              {isStreaming ? 'Thinking…' : 'Send'}
            </button>
          </div>
        </div>
      </section>

      <div className="ticks" />

      <section id="about">
        <div className="card">
          <h2>About me</h2>
          <button
            type="button"
            className="aboutBtn"
            onClick={() => setShowAbout(true)}
          >
            View About Me
          </button>
        </div>

        <div className="card">
          <h2>Resume</h2>
          <p>
            Download my resume:{' '}
            <a
              className="download"
              href="https://drive.google.com/file/d/1ctQ0D1zpuoBwnyXcHkld9pwssIvNYdFW/view?usp=sharing"
              target="_blank"
              rel="noreferrer"
            >
              GOURANSH_Resume
            </a>
          </p>
        </div>

      </section>

      {showAbout && (
        <section id="about-page">
          <div className="card">
            <div id="about-page-top">
              <h2>About me</h2>
              <button
                type="button"
                className="aboutClose"
                onClick={() => setShowAbout(false)}
              >
                Close
              </button>
            </div>

            <p>
              I'm <strong>Gouransh</strong>, a B.Tech Information Technology student passionate about
              Artificial Intelligence, Generative AI, and software development. I enjoy building intelligent
              applications that solve real-world problems and continuously expanding my knowledge in emerging
              technologies. My experience includes working with Python, C, Large Language Models (LLMs),
              Retrieval-Augmented Generation (RAG), LangChain, Prompt Engineering, and cloud platforms such as
              Microsoft Azure AI/ML and Google Cloud. Through my IBM GenAI Internship and hands-on projects,
              I have gained practical experience in developing AI-powered solutions, including a Python-based
              AI Voice Assistant, a Personal AI Assistant Platform, an Agentic AI project called Rail Sathi, and
              a RAG system powered by FAISS and embeddings. As a dedicated learner and problem solver, I am
              always eager to explore new technologies, contribute to innovative projects, and grow as an AI and
              software engineering professional.</p>
              <p><b><i>Skills</i></b></p>
              <p>
                1.Platforms: Microsoft Azure
                  AI/ML, Google Cloud, Python
                  environments</p>
              <p>2.Prompt engineering</p>
              <p>3.Python</p>
              <p>4.Gen ai</p> 
              <p>5.LLM</p>
              <p>6.(RAG)Retrieval-Augmented Generation</p>
              <p><b><i>Projects</i></b></p>
              <p>1. LLM Python-based AI voice assistant</p>
              <p>2. personal Al Assistant Platform</p>
              <p>3. RAG system</p>

              <p><b><i>Education</i></b></p>
              <p>Seth Jai Parkash Mukand Lal Institute Of Engineering and Technology</p>
              <p><b>(BACHELOR OF TECHNOLOGY IN INFORMATION TECHNOLOGY)</b></p>
              <p>S.D. Public School, Jagadhri</p>
              <p>SENIOR SECONDARY (SCIENCE)</p>
          </div>
        </section>
      )}


      <section id="spacer" />
    </>
  )
}

export default App

