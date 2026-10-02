interface ColorPickerProps {
  label: string
  value: string
  onChange: (value: string) => void
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-xs text-slate-400">{label}</span>
      <div className="flex items-center gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-16 rounded bg-white/5 px-1.5 py-0.5 text-center text-[10px] font-mono text-slate-300 outline-none ring-1 ring-white/10 focus:ring-indigo-500/50"
        />
        <label className="relative cursor-pointer">
          <div
            className="h-6 w-6 rounded border border-white/10"
            style={{ backgroundColor: value }}
          />
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  )
}
