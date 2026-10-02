import { useNuiContext } from './providers/NuiProvider'
import { CrosshairPreview, CrosshairOverlay } from './components/CrosshairPreview'
import { ShapeSelector } from './components/ShapeSelector'
import { PresetSelector } from './components/PresetSelector'
import { SettingsPanel } from './components/SettingsPanel'
import { DynamicSettings } from './components/DynamicSettings'
import { ImportExport } from './components/ImportExport'
import { Button } from './components/ui/Button'
import { Toggle } from './components/ui/Toggle'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </span>
        <div className="h-px flex-1 bg-white/5" />
      </div>
      {children}
    </div>
  )
}

export default function App() {
  const { visible, enabled, setEnabled, saveAndClose, close, resetSettings } =
    useNuiContext()

  return (
    <>
      {/* In-game overlay (always present) */}
      <CrosshairOverlay />

      {/* Settings panel */}
      {visible && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center">
          <div className="relative flex max-h-[85vh] w-[85vw] max-w-[480px] flex-col overflow-hidden rounded-xl border border-white/[0.06] bg-[#0a0e17]/95 shadow-2xl backdrop-blur-xl">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-100">
                  Crosshair Customizer
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium text-slate-500">
                  Level5
                </span>
                <button
                  onClick={close}
                  className="flex h-6 w-6 items-center justify-center rounded-md text-slate-500 transition-colors hover:bg-white/10 hover:text-slate-200"
                >
                  <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-x-hidden overflow-y-auto p-5">
              <div className="flex flex-col gap-4">
                {/* Preview */}
                <CrosshairPreview />

                {/* Enable toggle */}
                <Toggle
                  label="Crosshair Enabled"
                  checked={enabled}
                  onChange={setEnabled}
                />

                {/* Shape selector */}
                <Section title="Shape">
                  <ShapeSelector />
                </Section>

                {/* Presets */}
                <Section title="Presets">
                  <PresetSelector />
                </Section>

                {/* Style settings */}
                <Section title="Style">
                  <SettingsPanel />
                </Section>

                {/* Dynamic */}
                <Section title="">
                  <DynamicSettings />
                </Section>

                {/* Import/Export */}
                <Section title="Share">
                  <ImportExport />
                </Section>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-4">
              <Button variant="danger" onClick={resetSettings}>
                Reset
              </Button>
              <Button variant="success" onClick={saveAndClose}>
                Save & Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
