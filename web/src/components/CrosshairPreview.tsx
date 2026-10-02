import { useNuiContext } from '../providers/NuiProvider'
import type { CrosshairSettings, CrosshairShape } from '../types/crosshair'

function renderShape(s: CrosshairSettings, expansion: number) {
  const scale = expansion
  const lineLen = s.length * scale
  const gap = s.gap * scale
  const halfLine = (lineLen - gap) / 2
  const circleR = s.circleSize * scale

  const lineStyle = (dir: 'h' | 'v') => ({
    position: 'absolute' as const,
    background: s.color,
    opacity: s.opacity,
    boxShadow: s.outlineThickness
      ? `0 0 0 ${s.outlineThickness}px ${s.outlineColor}`
      : undefined,
    ...(dir === 'h'
      ? { height: s.thickness, width: halfLine }
      : { width: s.thickness, height: halfLine }),
  })

  const dot = s.showDot || hasShapeDot(s.shape) ? (
    <div
      style={{
        position: 'absolute',
        width: s.dotSize * 2,
        height: s.dotSize * 2,
        borderRadius: '50%',
        background: s.color,
        opacity: s.opacity,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: s.outlineThickness
          ? `0 0 0 ${s.outlineThickness}px ${s.outlineColor}`
          : undefined,
      }}
    />
  ) : null

  const circle = hasShapeCircle(s.shape) ? (
    <div
      style={{
        position: 'absolute',
        width: circleR * 2,
        height: circleR * 2,
        borderRadius: '50%',
        border: `${s.thickness}px solid ${s.color}`,
        opacity: s.opacity,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: s.outlineThickness
          ? `0 0 0 ${s.outlineThickness}px ${s.outlineColor}, inset 0 0 0 ${s.outlineThickness}px ${s.outlineColor}`
          : undefined,
      }}
    />
  ) : null

  // Cross lines (4 directions)
  const lines = hasShapeCross(s.shape) ? (
    <>
      {/* Left */}
      <div
        style={{
          ...lineStyle('h'),
          top: '50%',
          right: `calc(50% + ${gap / 2}px)`,
          transform: 'translateY(-50%)',
        }}
      />
      {/* Right */}
      <div
        style={{
          ...lineStyle('h'),
          top: '50%',
          left: `calc(50% + ${gap / 2}px)`,
          transform: 'translateY(-50%)',
        }}
      />
      {/* Top */}
      {!isTShape(s.shape) && (
        <div
          style={{
            ...lineStyle('v'),
            left: '50%',
            bottom: `calc(50% + ${gap / 2}px)`,
            transform: 'translateX(-50%)',
          }}
        />
      )}
      {/* Bottom */}
      <div
        style={{
          ...lineStyle('v'),
          left: '50%',
          top: `calc(50% + ${gap / 2}px)`,
          transform: 'translateX(-50%)',
        }}
      />
    </>
  ) : null

  // X shape (diagonal lines)
  const xLines = s.shape === 'xshape' ? (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%) rotate(45deg)',
        width: 0,
        height: 0,
      }}
    >
      <div
        style={{
          ...lineStyle('h'),
          top: '50%',
          right: `calc(50% + ${gap / 2}px)`,
          transform: 'translateY(-50%)',
        }}
      />
      <div
        style={{
          ...lineStyle('h'),
          top: '50%',
          left: `calc(50% + ${gap / 2}px)`,
          transform: 'translateY(-50%)',
        }}
      />
      <div
        style={{
          ...lineStyle('v'),
          left: '50%',
          bottom: `calc(50% + ${gap / 2}px)`,
          transform: 'translateX(-50%)',
        }}
      />
      <div
        style={{
          ...lineStyle('v'),
          left: '50%',
          top: `calc(50% + ${gap / 2}px)`,
          transform: 'translateX(-50%)',
        }}
      />
    </div>
  ) : null

  // Dot-only shape
  if (s.shape === 'dot') {
    return <>{dot}</>
  }

  return (
    <>
      {circle}
      {lines}
      {xLines}
      {dot}
    </>
  )
}

function hasShapeCross(shape: CrosshairShape) {
  return ['cross', 'crossdot', 'circlecross', 'tshape'].includes(shape)
}

function hasShapeCircle(shape: CrosshairShape) {
  return ['circle', 'circledot', 'circlecross'].includes(shape)
}

function hasShapeDot(shape: CrosshairShape) {
  return ['dot', 'crossdot', 'circledot'].includes(shape)
}

function isTShape(shape: CrosshairShape) {
  return shape === 'tshape'
}

export function CrosshairPreview() {
  const { settings, expansion } = useNuiContext()

  return (
    <div className="relative mx-auto h-40 w-full overflow-hidden rounded-lg bg-[#0d1117] ring-1 ring-white/5">
      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      {/* Crosshair */}
      <div className="absolute inset-0">
        {renderShape(settings, expansion)}
      </div>
    </div>
  )
}

// In-game overlay version (always mounted, no UI container)
export function CrosshairOverlay() {
  const { settings, enabled, expansion } = useNuiContext()

  if (!enabled) return null

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ transition: 'opacity 0.15s' }}
    >
      {renderShape(settings, expansion)}
    </div>
  )
}
