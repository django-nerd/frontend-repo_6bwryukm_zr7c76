export default function PreviewPanel({ mode, preview }) {
  return (
    <div className="w-full h-full p-4">
      {(!preview || !preview.type) && (
        <div className="h-full rounded-2xl bg-white/70 backdrop-blur-xl shadow-inner flex items-center justify-center text-gray-500">
          <p className="text-sm">Generated content will appear here</p>
        </div>
      )}

      {preview?.type === 'resume' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Professional Summary</h3>
            <p className="text-gray-700">{preview.summary}</p>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h4 className="text-md font-semibold mb-2">Highlights</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {preview.sections?.[0]?.items?.map((i, idx) => (
                <li key={idx}>{i}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {preview?.type === 'interview' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Practice Questions</h3>
            <ol className="list-decimal pl-5 space-y-2 text-gray-700">
              {preview.questions?.map((q, idx) => (
                <li key={idx}>{q}</li>
              ))}
            </ol>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow-lg">
            <h4 className="text-md font-semibold mb-2">Tips</h4>
            <ul className="list-disc pl-5 space-y-1 text-gray-700">
              {preview.tips?.map((t, idx) => (
                <li key={idx}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {preview?.type === 'jobs' && (
        <div className="space-y-4">
          <div className="rounded-2xl bg-white p-4 shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Matched Roles</h3>
            <div className="grid md:grid-cols-2 gap-3">
              {preview.results?.map((job, idx) => (
                <div key={idx} className="rounded-xl border border-gray-200 p-4 bg-white">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{job.title}</h4>
                    <span className="text-xs text-[#133EE3] font-medium">{job.match}% match</span>
                  </div>
                  <p className="text-sm text-gray-600">{job.company} • {job.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
