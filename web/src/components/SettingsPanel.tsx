import { useNuiContext } from '../providers/NuiProvider'
import { Slider } from './ui/Slider'
import { ColorPicker } from './ui/ColorPicker'
import { Toggle } from './ui/Toggle'

export function SettingsPanel() {
  const { settings, updateSetting } = useNuiContext()

  const showCircleSize = ['circle', 'circledot', 'circlecross'].includes(
    settings.shape,
  )

  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3">
        <ColorPicker
          label="Color"
          value={settings.color}
          onChange={(v) => updateSetting('color', v)}
        />
        <ColorPicker
          label="Outline"
          value={settings.outlineColor}
          onChange={(v) => updateSetting('outlineColor', v)}
        />
      </div>

      <Slider
        label="Thickness"
        value={settings.thickness}
        min={1}
        max={10}
        suffix="px"
        onChange={(v) => updateSetting('thickness', v)}
      />

      <Slider
        label="Length"
        value={settings.length}
        min={4}
        max={60}
        suffix="px"
        onChange={(v) => updateSetting('length', v)}
      />

      <Slider
        label="Gap"
        value={settings.gap}
        min={0}
        max={30}
        suffix="px"
        onChange={(v) => updateSetting('gap', v)}
      />

      <Slider
        label="Opacity"
        value={settings.opacity}
        min={0.1}
        max={1}
        step={0.05}
        onChange={(v) => updateSetting('opacity', v)}
      />

      <Slider
        label="Outline Width"
        value={settings.outlineThickness}
        min={0}
        max={3}
        step={0.5}
        suffix="px"
        onChange={(v) => updateSetting('outlineThickness', v)}
      />

      {showCircleSize && (
        <Slider
          label="Circle Size"
          value={settings.circleSize}
          min={8}
          max={50}
          suffix="px"
          onChange={(v) => updateSetting('circleSize', v)}
        />
      )}

      <Toggle
        label="Show Dot"
        checked={settings.showDot}
        onChange={(v) => updateSetting('showDot', v)}
      />

      {settings.showDot && (
        <Slider
          label="Dot Size"
          value={settings.dotSize}
          min={1}
          max={8}
          suffix="px"
          onChange={(v) => updateSetting('dotSize', v)}
        />
      )}
    </div>
  )
}
