import { useState } from 'react'
import { useNuiContext } from '../providers/NuiProvider'
import type { CrosshairPreset } from '../types/crosshair'

export function PresetSelector() {
  const { settings, presets, setSettings, setPresets, config } = useNuiContext()
  const [newName, setNewName] = useState('')
  const [showSave, setShowSave] = useState(false)

  const applyPreset = (preset: CrosshairPreset) => {
    setSettings(preset.settings)
  }

  const deletePreset = (idx: number) => {
    setPresets(presets.filter((_, i) => i !== idx))
  }

  const saveCustom = () => {
    if (!newName.trim()) return
    const customCount = presets.filter((p) => !p.builtIn).length
    if (customCount >= config.maxPresets) return

    const newPreset: CrosshairPreset = {
      name: newName.trim(),
      settings: { ...settings },
    }
    setPresets([...presets, newPreset])
    setNewName('')
    setShowSave(false)
  }

  const isActive = (preset: CrosshairPreset) =>
    JSON.stringify(preset.settings) === JSON.stringify(settings)

  const customCount = presets.filter((p) => !p.builtIn).length

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-1.5">
        {presets.map((preset, idx) => (
          <button
            key={`${preset.name}-${idx}`}
            onClick={() => applyPreset(preset)}
            onContextMenu={(e) => {
              e.preventDefault()
              if (!preset.builtIn) deletePreset(idx)
            }}
            className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all ${
              isActive(preset)
                ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
                : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
            }`}
            title={preset.builtIn ? preset.name : `${preset.name} (right-click to delete)`}
          >
            {preset.name}
          </button>
        ))}
        {customCount < config.maxPresets && (
          <button
            onClick={() => setShowSave(!showSave)}
            className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] text-slate-500 transition-colors hover:bg-white/10 hover:text-slate-300"
          >
            + Save
          </button>
        )}
      </div>

      {showSave && (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && saveCustom()}
            placeholder="Preset name..."
            maxLength={20}
            className="flex-1 rounded-md bg-white/5 px-2 py-1 text-xs text-slate-300 outline-none ring-1 ring-white/10 placeholder:text-slate-600 focus:ring-indigo-500/50"
            autoFocus
          />
          <button
            onClick={saveCustom}
            className="rounded-md bg-indigo-500/20 px-2 py-1 text-[11px] text-indigo-300 transition-colors hover:bg-indigo-500/30"
          >
            Save
          </button>
        </div>
      )}
    </div>
  )
}
