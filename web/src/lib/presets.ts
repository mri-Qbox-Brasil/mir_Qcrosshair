import type { CrosshairPreset, CrosshairSettings } from '../types/crosshair'

export const DEFAULT_SETTINGS: CrosshairSettings = {
  shape: 'cross',
  color: '#00ff15',
  outlineColor: '#000000',
  thickness: 2,
  length: 20,
  gap: 5,
  opacity: 0.8,
  outlineThickness: 1,
  showDot: false,
  dotSize: 3,
  circleSize: 20,
  dynamicEnabled: false,
  dynamicMovement: 1.5,
  dynamicSprint: 2.5,
  dynamicAim: 0.7,
  dynamicSpeed: 8.0,
}

export const BUILT_IN_PRESETS: CrosshairPreset[] = [
  {
    name: 'Classic',
    builtIn: true,
    settings: { ...DEFAULT_SETTINGS },
  },
  {
    name: 'Dot',
    builtIn: true,
    settings: {
      ...DEFAULT_SETTINGS,
      shape: 'dot',
      color: '#ff0000',
      showDot: true,
      dotSize: 4,
    },
  },
  {
    name: 'Sniper',
    builtIn: true,
    settings: {
      ...DEFAULT_SETTINGS,
      shape: 'circlecross',
      color: '#ffffff',
      thickness: 1,
      length: 30,
      gap: 8,
      circleSize: 24,
      outlineThickness: 0,
    },
  },
  {
    name: 'Minimal',
    builtIn: true,
    settings: {
      ...DEFAULT_SETTINGS,
      shape: 'crossdot',
      color: '#22d3ee',
      thickness: 1,
      length: 8,
      gap: 3,
      dotSize: 2,
      showDot: true,
    },
  },
  {
    name: 'T-Style',
    builtIn: true,
    settings: {
      ...DEFAULT_SETTINGS,
      shape: 'tshape',
      color: '#22c55e',
      thickness: 2,
      length: 16,
      gap: 4,
    },
  },
  {
    name: 'X-Mark',
    builtIn: true,
    settings: {
      ...DEFAULT_SETTINGS,
      shape: 'xshape',
      color: '#f97316',
      thickness: 2,
      length: 14,
      gap: 4,
    },
  },
]
