import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * Doodle-style input with sketchy border
 */
export function DoodleInput({ 
  value, 
  onChange, 
  placeholder = '',
  type = 'text',
  disabled = false,
  className = '',
  ...props 
}) {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = () => {
    setIsFocused(true)
    gsap.to(inputRef.current, {
      rotation: -0.5,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    gsap.to(inputRef.current, {
      rotation: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  return (
    <input
      ref={inputRef}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`
        w-full px-4 py-3
        font-['Patrick_Hand'] text-lg
        bg-white
        border-[2.5px] border-[var(--doodle-stroke)]
        rounded-xl
        outline-none
        transition-colors duration-200
        ${isFocused ? 'bg-[var(--doodle-yellow-light)]' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{ 
        color: 'var(--doodle-text)',
        borderRadius: '12px'
      }}
      {...props}
    />
  )
}

DoodleInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string
}

/**
 * Doodle-style textarea with sketchy border
 */
export function DoodleTextarea({ 
  value, 
  onChange, 
  placeholder = 'Write something...',
  disabled = false,
  minHeight = 120,
  className = '',
  ...props 
}) {
  const textareaRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)
  
  const handleFocus = () => {
    setIsFocused(true)
    gsap.to(textareaRef.current, {
      rotation: -0.3,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleBlur = () => {
    setIsFocused(false)
    gsap.to(textareaRef.current, {
      rotation: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  // Auto-resize
  const handleInput = (e) => {
    const target = e.target
    target.style.height = 'auto'
    target.style.height = `${Math.max(target.scrollHeight, minHeight)}px`
  }
  
  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onInput={handleInput}
      className={`
        w-full px-4 py-3
        font-['Patrick_Hand'] text-lg
        bg-white
        border-[2.5px] border-[var(--doodle-stroke)]
        rounded-xl
        outline-none
        resize-none
        transition-colors duration-200
        ${isFocused ? 'bg-[var(--doodle-yellow-light)]' : ''}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      style={{ 
        color: 'var(--doodle-text)',
        minHeight: `${minHeight}px`,
        borderRadius: '16px'
      }}
      {...props}
    />
  )
}

DoodleTextarea.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  minHeight: PropTypes.number,
  className: PropTypes.string
}

export default DoodleInput
