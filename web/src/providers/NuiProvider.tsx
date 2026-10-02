import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'
import type {
  CrosshairSettings,
  CrosshairPreset,
  NuiOpenData,
  ServerConfig,
} from '../types/crosshair'
import { DEFAULT_SETTINGS, BUILT_IN_PRESETS } from '../lib/presets'
import { fetchNui, isEnvBrowser } from '../lib/nui'

interface NuiState {
  visible: boolean
  settings: CrosshairSettings
  presets: CrosshairPreset[]
  enabled: boolean
  dynamicEnabled: boolean
  expansion: number
  config: ServerConfig
  setSettings: (s: CrosshairSettings) => void
  updateSetting: <K extends keyof CrosshairSettings>(
    key: K,
    value: CrosshairSettings[K],
  ) => void
  setEnabled: (v: boolean) => void
  setDynamicEnabled: (v: boolean) => void
  setPresets: (p: CrosshairPreset[]) => void
  saveAndClose: () => void
  close: () => void
  resetSettings: () => void
}

const defaultConfig: ServerConfig = {
  maxPresets: 10,
  dynamicAllowed: true,
  defaultDynamic: {
    movementExpansion: 1.5,
    sprintExpansion: 2.5,
    aimShrink: 0.7,
    transitionSpeed: 8.0,
  },
}

const NuiContext = createContext<NuiState>({} as NuiState)

export function useNuiContext() {
  return useContext(NuiContext)
}

export function NuiProvider({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(isEnvBrowser())
  const [settings, setSettings] = useState<CrosshairSettings>(DEFAULT_SETTINGS)
  const [presets, setPresets] = useState<CrosshairPreset[]>([])
  const [enabled, setEnabledState] = useState(false)
  const [dynamicEnabled, setDynamicEnabledState] = useState(false)
  const [expansion, setExpansion] = useState(1.0)
  const [config, setConfig] = useState<ServerConfig>(defaultConfig)

  const updateSetting = useCallback(
    <K extends keyof CrosshairSettings>(
      key: K,
      value: CrosshairSettings[K],
    ) => {
      setSettings((prev) => ({ ...prev, [key]: value }))
    },
    [],
  )

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v)
    fetchNui('toggleCrosshair', { enabled: v })
  }, [])

  const setDynamicEnabled = useCallback((v: boolean) => {
    setDynamicEnabledState(v)
    fetchNui('setDynamic', { enabled: v })
  }, [])

  const saveAndClose = useCallback(() => {
    fetchNui('saveSettings', {
      settings,
      enabled,
      dynamicEnabled,
    })
    fetchNui('savePresets', {
      presets: presets.filter((p) => !p.builtIn),
    })
    fetchNui('close')
    setVisible(false)
  }, [settings, enabled, dynamicEnabled, presets])

  const close = useCallback(() => {
    fetchNui('close')
    setVisible(false)
  }, [])

  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS)
  }, [])

  // Listen for NUI messages
  useEffect(() => {
    const handler = (event: MessageEvent) => {
      const { action, data } = event.data

      switch (action) {
        case 'openUI': {
          const d = data as NuiOpenData
          if (d.settings) setSettings(d.settings)
          setEnabledState(d.enabled)
          setDynamicEnabledState(d.dynamicEnabled)
          setConfig(d.config)
          // Merge built-in presets with custom
          const custom = d.presets || []
          setPresets([...BUILT_IN_PRESETS, ...custom])
          setVisible(true)
          break
        }
        case 'closeUI':
          setVisible(false)
          break
        case 'restoreState': {
          const d = data as NuiOpenData
          if (d.settings) setSettings(d.settings)
          setEnabledState(d.enabled)
          setDynamicEnabledState(d.dynamicEnabled)
          const custom = d.presets || []
          setPresets([...BUILT_IN_PRESETS, ...custom])
          break
        }
        case 'toggleCrosshair':
          setEnabledState(data.enabled)
          break
        case 'dynamicUpdate':
          setExpansion(data.expansion)
          break
        case 'cyclePreset': {
          setPresets((current) => {
            if (current.length === 0) return current
            // Find current index by matching settings
            const currentJson = JSON.stringify(settings)
            let idx = current.findIndex(
              (p) => JSON.stringify(p.settings) === currentJson,
            )
            idx = (idx + 1) % current.length
            setSettings(current[idx].settings)
            return current
          })
          break
        }
      }
    }

    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [settings])

  // ESC key handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && visible) {
        close()
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [visible, close])

  return (
    <NuiContext.Provider
      value={{
        visible,
        settings,
        presets,
        enabled,
        dynamicEnabled,
        expansion,
        config,
        setSettings,
        updateSetting,
        setEnabled,
        setDynamicEnabled,
        setPresets,
        saveAndClose,
        close,
        resetSettings,
      }}
    >
      {children}
    </NuiContext.Provider>
  )
}
