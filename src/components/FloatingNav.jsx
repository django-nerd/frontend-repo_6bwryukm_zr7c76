import { useEffect } from 'react'
import { Bot, FileText, Mic, Briefcase } from 'lucide-react'

const modes = [
  { key: 'resume', label: 'Resume', icon: FileText },
  { key: 'interview', label: 'Interview', icon: Mic },
  { key: 'jobs', label: 'Jobs', icon: Briefcase },
]

export default function FloatingNav({ mode, onChange }) {
  useEffect(() => {
    if (!mode && onChange) onChange('resume')
  }, [])

  return (
    <div className="fixed left-4 top-1/2 -translate-y-1/2 z-30">
      <div className="flex flex-col items-center gap-3 bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl p-3">
        <div className="flex items-center gap-2 mb-2 text-[#133EE3]">
          <Bot className="w-5 h-5" />
          <span className="text-sm font-semibold">CoPilot</span>
        </div>
        {modes.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            aria-label={label}
            className={`relative group w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
              mode === key ? 'bg-[#133EE3] text-white shadow-md scale-105' : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => onChange && onChange(key)}
          >
            <Icon className="w-5 h-5" />
            <span className="absolute left-12 whitespace-nowrap rounded-lg bg-gray-900/90 text-white text-xs py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
