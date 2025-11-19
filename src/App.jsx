import { useEffect, useMemo, useState } from 'react'
import FloatingNav from './components/FloatingNav'
import Hero from './components/Hero'
import PreviewPanel from './components/PreviewPanel'
import Chat from './components/Chat'

function App() {
  const [mode, setMode] = useState('resume')
  const [sessionId, setSessionId] = useState(null)
  const [preview, setPreview] = useState(null)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  useEffect(() => {
    // create a session when mode changes
    const createSession = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/sessions`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mode })
        })
        const data = await res.json()
        setSessionId(data.session_id)
        setPreview(null)
      } catch (e) {
        // ignore
      }
    }
    createSession()
  }, [mode])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      <FloatingNav mode={mode} onChange={setMode} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="flex flex-col gap-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#133EE3] text-white grid place-items-center shadow-lg">🤖</div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">CoPilot – AI Career Assistant</h1>
              <p className="text-gray-600 text-sm">Build resumes, prep interviews, and find roles with a friendly AI guide.</p>
            </div>
          </div>
          <Hero />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-11 gap-6">
          {/* Preview panel */}
          <div className="lg:col-span-5">
            <PreviewPanel mode={mode} preview={preview} />
          </div>

          {/* Chat panel */}
          <div className="lg:col-span-6 rounded-2xl bg-white/60 p-4 shadow-xl min-h-[520px]">
            <Chat sessionId={sessionId} mode={mode} onPreview={setPreview} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
