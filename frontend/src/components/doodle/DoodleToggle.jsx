import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { useRef } from 'react'

const STATUS_OPTIONS = [
  { value: 'not_started', label: 'Not Started', color: 'var(--doodle-bg-alt)' },
  { value: 'in_progress', label: 'In Progress', color: 'var(--doodle-orange)' },
  { value: 'completed', label: 'Completed', color: 'var(--doodle-mint)' }
]

/**
 * Doodle-style three-state toggle for progress
 */
export function DoodleToggle({ 
  value = 'not_started', 
  onChange, 
  disabled = false,
  className = '' 
}) {
  const buttonRefs = useRef([])
  
  const handleClick = (option, index) => {
    if (disabled) return
    
    // Animate click
    gsap.to(buttonRefs.current[index], {
      scale: 0.95,
      rotation: -2,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    onChange(option.value)
  }
  
  return (
    <div 
      className={`inline-flex gap-1 p-1 bg-white rounded-2xl ${className}`}
      style={{ 
        border: '2.5px solid var(--doodle-stroke)',
        borderRadius: '20px'
      }}
    >
      {STATUS_OPTIONS.map((option, index) => (
        <button
          key={option.value}
          ref={el => buttonRefs.current[index] = el}
          type="button"
          className={`
            px-4 py-2 
            font-['Patrick_Hand'] text-base
            rounded-xl
            transition-all duration-200
            ${value === option.value ? 'text-[var(--doodle-text)]' : 'text-[var(--doodle-text-muted)]'}
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          style={{
            background: value === option.value ? option.color : 'transparent',
            border: 'none',
            transform: value === option.value ? 'rotate(-1deg)' : 'none'
          }}
          onClick={() => handleClick(option, index)}
          disabled={disabled}
        >
          {option.label}
        </button>
      ))}
    </div>
  )
}

DoodleToggle.propTypes = {
  value: PropTypes.oneOf(['not_started', 'in_progress', 'completed']),
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

export default DoodleToggle
