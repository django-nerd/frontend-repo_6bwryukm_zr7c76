import { useEffect, useRef, useState } from 'react'
import { Paperclip, Send } from 'lucide-react'

export default function Chat({ sessionId, mode, onPreview }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const listRef = useRef(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    if (sessionId) {
      fetch(`${baseUrl}/api/sessions/${sessionId}/messages`)
        .then(r => r.json())
        .then(data => setMessages(data.items || []))
        .catch(() => {})
    }
  }, [sessionId])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    if (!input.trim() || !sessionId) return
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/sessions/${sessionId}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: input })
      })
      const data = await res.json()
      setMessages(data.messages || [])
      onPreview?.(data.preview)
      setInput('')
    } catch (e) {
      // handle
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div ref={listRef} className="flex-1 overflow-y-auto space-y-3 p-4 rounded-2xl bg-white/70 backdrop-blur-xl">
        {messages.map((m, idx) => (
          <div key={idx} className={`max-w-[85%] rounded-2xl px-4 py-3 shadow ${m.role === 'user' ? 'ml-auto bg-[#133EE3] text-white' : 'bg-white'}`}>
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
          </div>
        ))}
        {!messages.length && (
          <div className="text-center text-gray-500 text-sm py-6">Say hi to get started</div>
        )}
      </div>
      <div className="mt-3 flex items-center gap-2">
        <button className="w-10 h-10 rounded-xl bg-white shadow flex items-center justify-center">
          <Paperclip className="w-4 h-4 text-gray-500" />
        </button>
        <input
          className="flex-1 h-10 rounded-xl bg-white shadow px-3 text-sm outline-none focus:ring-2 ring-[#133EE3]/30"
          placeholder={`Ask about ${mode}...`}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
        />
        <button
          onClick={send}
          disabled={loading}
          className="w-10 h-10 rounded-xl bg-[#133EE3] text-white shadow flex items-center justify-center disabled:opacity-60"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
