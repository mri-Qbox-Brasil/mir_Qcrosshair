import type { CrosshairShape } from '../types/crosshair'

export interface ShapeInfo {
  id: CrosshairShape
  label: string
  description: string
}

export const SHAPES: ShapeInfo[] = [
  { id: 'cross', label: '+', description: 'Cross' },
  { id: 'dot', label: '\u2022', description: 'Dot' },
  { id: 'circle', label: '\u25CB', description: 'Circle' },
  { id: 'tshape', label: '\u22A4', description: 'T-Shape' },
  { id: 'xshape', label: '\u2715', description: 'X-Shape' },
  { id: 'crossdot', label: '\u2A01', description: 'Cross + Dot' },
  { id: 'circledot', label: '\u2299', description: 'Circle + Dot' },
  { id: 'circlecross', label: '\u2295', description: 'Circle + Cross' },
]
