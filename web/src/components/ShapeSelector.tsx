import { useNuiContext } from '../providers/NuiProvider'
import { SHAPES } from '../lib/shapes'

export function ShapeSelector() {
  const { settings, updateSetting } = useNuiContext()

  return (
    <div className="flex flex-wrap gap-1.5">
      {SHAPES.map((shape) => (
        <button
          key={shape.id}
          onClick={() => updateSetting('shape', shape.id)}
          title={shape.description}
          className={`flex h-9 w-9 items-center justify-center rounded-lg text-base transition-all ${
            settings.shape === shape.id
              ? 'bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-500/40'
              : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
          }`}
        >
          {shape.label}
        </button>
      ))}
    </div>
  )
}
