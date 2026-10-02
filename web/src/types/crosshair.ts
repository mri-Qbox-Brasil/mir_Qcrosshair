export type CrosshairShape =
  | 'cross'
  | 'dot'
  | 'circle'
  | 'tshape'
  | 'xshape'
  | 'crossdot'
  | 'circledot'
  | 'circlecross'

export interface CrosshairSettings {
  shape: CrosshairShape
  color: string
  outlineColor: string
  thickness: number
  length: number
  gap: number
  opacity: number
  outlineThickness: number
  showDot: boolean
  dotSize: number
  circleSize: number
  dynamicEnabled: boolean
  dynamicMovement: number
  dynamicSprint: number
  dynamicAim: number
  dynamicSpeed: number
}

export interface CrosshairPreset {
  name: string
  builtIn?: boolean
  settings: CrosshairSettings
}

export interface ServerConfig {
  maxPresets: number
  dynamicAllowed: boolean
  defaultDynamic: {
    movementExpansion: number
    sprintExpansion: number
    aimShrink: number
    transitionSpeed: number
  }
}

export interface NuiOpenData {
  settings: CrosshairSettings | null
  presets: CrosshairPreset[]
  enabled: boolean
  dynamicEnabled: boolean
  config: ServerConfig
}
