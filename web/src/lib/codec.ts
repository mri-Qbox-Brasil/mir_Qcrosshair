import type { CrosshairSettings } from '../types/crosshair'

const PREFIX = 'LVL5-'

export function encodeSettings(settings: CrosshairSettings): string {
  const json = JSON.stringify(settings)
  return PREFIX + btoa(json)
}

export function decodeSettings(code: string): CrosshairSettings | null {
  if (!code.startsWith(PREFIX)) return null
  try {
    const json = atob(code.slice(PREFIX.length))
    return JSON.parse(json) as CrosshairSettings
  } catch {
    return null
  }
}
