import { useState } from 'react'
import { useNuiContext } from '../providers/NuiProvider'
import { Toggle } from './ui/Toggle'
import { Slider } from './ui/Slider'

export function DynamicSettings() {
  const { settings, updateSetting, dynamicEnabled, setDynamicEnabled, config } =
    useNuiContext()
  const [open, setOpen] = useState(false)

  if (!config.dynamicAllowed) return null

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-xs text-slate-400 transition-colors hover:text-slate-200"
      >
        <span>Dynamic Crosshair</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {open && (
        <div className="mt-2 flex flex-col gap-3">
          <Toggle
            label="Enable Dynamic"
            checked={dynamicEnabled}
            onChange={setDynamicEnabled}
          />

          {dynamicEnabled && (
            <>
              <Slider
                label="Movement Expand"
                value={settings.dynamicMovement}
                min={1.0}
                max={3.0}
                step={0.1}
                suffix="x"
                onChange={(v) => updateSetting('dynamicMovement', v)}
              />
              <Slider
                label="Sprint Expand"
                value={settings.dynamicSprint}
                min={1.0}
                max={4.0}
                step={0.1}
                suffix="x"
                onChange={(v) => updateSetting('dynamicSprint', v)}
              />
              <Slider
                label="Aim Shrink"
                value={settings.dynamicAim}
                min={0.3}
                max={1.0}
                step={0.05}
                suffix="x"
                onChange={(v) => updateSetting('dynamicAim', v)}
              />
              <Slider
                label="Transition Speed"
                value={settings.dynamicSpeed}
                min={2.0}
                max={20.0}
                step={0.5}
                onChange={(v) => updateSetting('dynamicSpeed', v)}
              />
            </>
          )}
        </div>
      )}
    </div>
  )
}
