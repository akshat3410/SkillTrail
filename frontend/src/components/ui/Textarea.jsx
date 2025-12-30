import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 * Auto-expanding textarea component for notes
 */
export function Textarea({ 
  value, 
  onChange, 
  placeholder = 'Write your notes here...',
  disabled = false,
  className = '',
  minHeight = 120,
  ...props 
}) {
  const textareaRef = useRef(null)

  // Auto-resize on content change
  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.max(textarea.scrollHeight, minHeight)}px`
    }
  }, [value, minHeight])

  return (
    <textarea
      ref={textareaRef}
      className={`textarea ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      style={{ minHeight: `${minHeight}px` }}
      {...props}
    />
  )
}

Textarea.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  minHeight: PropTypes.number
}

export default Textarea
