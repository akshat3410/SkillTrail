import PropTypes from 'prop-types'

/**
 * Hand-drawn SVG doodle assets for scrollytelling
 * Sketchy arrows, annotations, shapes for visual storytelling
 */

// Sketchy Arrow
export function DoodleArrow({ 
  direction = 'right', 
  size = 40,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2,
  className = '',
  style = {}
}) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: -90
  }

  return (
    <svg
      viewBox="0 0 50 30"
      width={size}
      height={size * 0.6}
      className={className}
      style={{
        transform: `rotate(${rotations[direction]}deg)`,
        ...style
      }}
    >
      <path
        d="M 5 15 Q 20 12 35 15 Q 30 10 45 15 Q 30 20 35 15"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

DoodleArrow.propTypes = {
  direction: PropTypes.oneOf(['right', 'down', 'left', 'up']),
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Sketchy Circle
export function DoodleCircle({
  size = 60,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2,
  filled = false,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      <path
        d="M 30 5 Q 55 5 55 30 Q 55 55 30 55 Q 5 55 5 30 Q 5 5 30 5"
        fill={filled ? color : 'none'}
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        opacity={filled ? 0.1 : 1}
      />
    </svg>
  )
}

DoodleCircle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  filled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

// Question Mark
export function DoodleQuestion({
  size = 40,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2.5,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 30 45"
      width={size * 0.67}
      height={size}
      className={className}
      style={style}
    >
      <path
        d="M 8 12 Q 8 5 15 5 Q 25 5 25 15 Q 25 22 15 25 L 15 32"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="15" cy="40" r="2.5" fill={color} />
    </svg>
  )
}

DoodleQuestion.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Exclamation Mark
export function DoodleExclamation({
  size = 40,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2.5,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 20 45"
      width={size * 0.44}
      height={size}
      className={className}
      style={style}
    >
      <path
        d="M 10 5 L 10 30"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <circle cx="10" cy="40" r="2.5" fill={color} />
    </svg>
  )
}

DoodleExclamation.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Star / Sparkle
export function DoodleStar({
  size = 30,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 30 30"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      <path
        d="M 15 3 L 15 27 M 3 15 L 27 15 M 6 6 L 24 24 M 24 6 L 6 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

DoodleStar.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Curvy underline
export function DoodleUnderline({
  width = 100,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 100 15"
      width={width}
      height={width * 0.15}
      className={className}
      style={style}
      preserveAspectRatio="none"
    >
      <path
        d="M 0 10 Q 25 5 50 10 T 100 10"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

DoodleUnderline.propTypes = {
  width: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Annotation bracket
export function DoodleBracket({
  side = 'left',
  height = 100,
  color = 'var(--editorial-ink-muted)',
  strokeWidth = 2,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 20 100"
      width={20}
      height={height}
      className={className}
      style={{
        transform: side === 'right' ? 'scaleX(-1)' : 'none',
        ...style
      }}
    >
      <path
        d="M 18 5 Q 5 5 5 50 Q 5 95 18 95"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </svg>
  )
}

DoodleBracket.propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  height: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

// Scattered notes/chaos element
export function DoodleChaos({
  size = 200,
  color = 'var(--editorial-ink-faint)',
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      {/* Scattered lines representing chaos/confusion */}
      <path d="M 20 30 L 60 25" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 40 60 L 90 70" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M 100 20 L 130 40" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 150 50 L 180 30" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M 30 100 L 70 110" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M 120 90 L 160 100" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 50 140 L 80 130" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M 100 150 L 140 160" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 160 140 L 190 150" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <path d="M 20 170 L 50 180" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Small circles/dots */}
      <circle cx="80" cy="40" r="3" fill={color} opacity="0.5" />
      <circle cx="140" cy="80" r="2" fill={color} opacity="0.5" />
      <circle cx="100" cy="120" r="4" fill={color} opacity="0.3" />
      <circle cx="170" cy="170" r="2.5" fill={color} opacity="0.5" />
    </svg>
  )
}

DoodleChaos.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

// Checkmark
export function DoodleCheck({
  size = 30,
  color = 'var(--editorial-ink)',
  strokeWidth = 2.5,
  className = '',
  style = {}
}) {
  return (
    <svg
      viewBox="0 0 30 30"
      width={size}
      height={size}
      className={className}
      style={style}
    >
      <path
        d="M 5 15 L 12 22 L 25 8"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

DoodleCheck.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

export default DoodleArrow
