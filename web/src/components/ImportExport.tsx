import { useState } from 'react'
import { useNuiContext } from '../providers/NuiProvider'
import { encodeSettings, decodeSettings } from '../lib/codec'
import { Button } from './ui/Button'

export function ImportExport() {
  const { settings, setSettings } = useNuiContext()
  const [code, setCode] = useState('')
  const [mode, setMode] = useState<'idle' | 'import' | 'export'>('idle')
  const [status, setStatus] = useState('')

  const handleExport = () => {
    const encoded = encodeSettings(settings)
    setCode(encoded)
    setMode('export')
    setStatus('')
    navigator.clipboard?.writeText(encoded)
    setStatus('Copied!')
    setTimeout(() => setStatus(''), 2000)
  }

  const handleImport = () => {
    if (mode !== 'import') {
      setMode('import')
      setCode('')
      setStatus('')
      return
    }

    const decoded = decodeSettings(code.trim())
    if (!decoded) {
      setStatus('Invalid code')
      setTimeout(() => setStatus(''), 2000)
      return
    }

    setSettings(decoded)
    setMode('idle')
    setCode('')
    setStatus('')
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-1.5">
        <Button variant="secondary" onClick={handleImport} className="flex-1">
          Import
        </Button>
        <Button variant="secondary" onClick={handleExport} className="flex-1">
          Export
        </Button>
      </div>

      {mode !== 'idle' && (
        <div className="flex flex-col gap-1.5">
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder={mode === 'import' ? 'Paste LVL5-... code' : ''}
            readOnly={mode === 'export'}
            className="w-full rounded-md bg-white/5 px-2 py-1.5 font-mono text-[10px] text-slate-300 outline-none ring-1 ring-white/10 placeholder:text-slate-600 focus:ring-indigo-500/50"
            autoFocus={mode === 'import'}
            onFocus={(e) => mode === 'export' && e.target.select()}
          />
          {status && (
            <span
              className={`text-[10px] ${status === 'Copied!' ? 'text-emerald-400' : 'text-red-400'}`}
            >
              {status}
            </span>
          )}
          {mode === 'import' && code && (
            <Button variant="primary" onClick={handleImport}>
              Apply
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
