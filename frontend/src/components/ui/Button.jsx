import PropTypes from 'prop-types'

/**
 * Button component with variants
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  ...props 
}) {
  const baseClass = 'btn'
  const variantClass = `btn-${variant}`
  const sizeClasses = {
    sm: 'text-sm py-2 px-3',
    md: '',
    lg: 'text-base py-3 px-6'
  }

  return (
    <button
      className={`${baseClass} ${variantClass} ${sizeClasses[size]} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <span className="spinner" style={{ width: 16, height: 16 }} />}
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string
}

export default Button
