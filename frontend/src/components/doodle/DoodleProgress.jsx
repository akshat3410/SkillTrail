import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * Doodle-style progress bar with striped fill
 */
export function DoodleProgress({ 
  value = 0, 
  max = 100,
  variant = 'mint',
  showLabel = false,
  className = ''
}) {
  const fillRef = useRef(null)
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  const colorMap = {
    yellow: 'var(--doodle-yellow)',
    blue: 'var(--doodle-blue)',
    mint: 'var(--doodle-mint)',
    pink: 'var(--doodle-pink)',
    purple: 'var(--doodle-purple)'
  }
  
  const lightColorMap = {
    yellow: 'var(--doodle-yellow-light)',
    blue: 'var(--doodle-blue-light)',
    mint: 'var(--doodle-mint-light)',
    pink: 'var(--doodle-pink-light)',
    purple: 'var(--doodle-purple-light)'
  }
  
  // Animate width on change
  useEffect(() => {
    if (fillRef.current) {
      gsap.to(fillRef.current, {
        width: `${percentage}%`,
        duration: 0.6,
        ease: 'power2.out'
      })
    }
  }, [percentage])
  
  return (
    <div className={`relative ${className}`}>
      <div 
        className="w-full h-6 bg-white rounded-xl overflow-hidden"
        style={{ 
          border: '2.5px solid var(--doodle-stroke)',
          borderRadius: '12px'
        }}
      >
        <div
          ref={fillRef}
          className="h-full rounded-lg"
          style={{
            width: '0%',
            background: `repeating-linear-gradient(
              -45deg,
              ${colorMap[variant]},
              ${colorMap[variant]} 8px,
              ${lightColorMap[variant]} 8px,
              ${lightColorMap[variant]} 16px
            )`
          }}
        />
      </div>
      {showLabel && (
        <span 
          className="absolute right-2 top-1/2 -translate-y-1/2 font-['Patrick_Hand'] text-sm"
          style={{ color: 'var(--doodle-text)' }}
        >
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

DoodleProgress.propTypes = {
  value: PropTypes.number,
  max: PropTypes.number,
  variant: PropTypes.oneOf(['yellow', 'blue', 'mint', 'pink', 'purple']),
  showLabel: PropTypes.bool,
  className: PropTypes.string
}

export default DoodleProgress
