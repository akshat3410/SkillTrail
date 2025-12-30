import { useRef, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * Editorial Button Component
 * Minimal, outlined, thin stroke
 * No rounded pills, subtle hover state
 */
export const EditorialButton = forwardRef(function EditorialButton({ 
  children,
  variant = 'outlined',
  size = 'md',
  as: Tag = 'button',
  href,
  onClick,
  disabled = false,
  className = '',
  style = {},
  ...props
}, ref) {
  const buttonRef = useRef(null)
  const combinedRef = ref || buttonRef
  
  const sizeStyles = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.8rem'
    },
    md: {
      padding: '0.75rem 1.5rem',
      fontSize: '0.875rem'
    },
    lg: {
      padding: '1rem 2rem',
      fontSize: '1rem'
    }
  }
  
  const variantStyles = {
    outlined: {
      background: 'transparent',
      border: '1px solid var(--editorial-ink)',
      color: 'var(--editorial-ink)'
    },
    solid: {
      background: 'var(--editorial-ink)',
      border: '1px solid var(--editorial-ink)',
      color: 'var(--editorial-bg)'
    },
    ghost: {
      background: 'transparent',
      border: '1px solid transparent',
      color: 'var(--editorial-ink)'
    }
  }
  
  const handleMouseEnter = () => {
    if (disabled) return
    gsap.to(combinedRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(combinedRef.current, {
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const Component = href ? 'a' : Tag
  
  return (
    <Component
      ref={combinedRef}
      href={href}
      onClick={onClick}
      disabled={disabled}
      className={`editorial-button ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '0.5rem',
        fontFamily: 'var(--font-sans)',
        fontWeight: 500,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'background-color 0.2s, border-color 0.2s, color 0.2s',
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style
      }}
      {...props}
    >
      {children}
    </Component>
  )
})

EditorialButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['outlined', 'solid', 'ghost']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  as: PropTypes.oneOf(['button', 'a', 'div']),
  href: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Editorial Card Component
 * Flat, understated, thin border lines
 * Editorial spacing, no shadows
 */
export function EditorialCard({ 
  children,
  variant = 'bordered',
  padding = 'md',
  className = '',
  style = {},
  onClick
}) {
  const cardRef = useRef(null)
  
  const paddingStyles = {
    none: '0',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem'
  }
  
  const variantStyles = {
    bordered: {
      border: '1px solid var(--editorial-grid)',
      background: 'transparent'
    },
    filled: {
      border: 'none',
      background: 'var(--editorial-bg-alt)'
    },
    ghost: {
      border: 'none',
      background: 'transparent'
    }
  }
  
  const handleMouseEnter = () => {
    if (!onClick) return
    gsap.to(cardRef.current, {
      y: -2,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    if (!onClick) return
    gsap.to(cardRef.current, {
      y: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  return (
    <div
      ref={cardRef}
      className={`editorial-card ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        padding: paddingStyles[padding],
        cursor: onClick ? 'pointer' : 'default',
        transition: 'border-color 0.2s',
        ...variantStyles[variant],
        ...style
      }}
    >
      {children}
    </div>
  )
}

EditorialCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['bordered', 'filled', 'ghost']),
  padding: PropTypes.oneOf(['none', 'sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func
}

/**
 * Editorial Section Component
 * Magazine-style section with editorial spacing
 */
export function EditorialSection({ 
  children,
  spacing = 'lg',
  className = '',
  style = {}
}) {
  const spacingStyles = {
    sm: { padding: '2rem 0' },
    md: { padding: '4rem 0' },
    lg: { padding: '6rem 0' },
    xl: { padding: '8rem 0' }
  }
  
  return (
    <section
      className={`editorial-section ${className}`}
      style={{
        ...spacingStyles[spacing],
        ...style
      }}
    >
      {children}
    </section>
  )
}

EditorialSection.propTypes = {
  children: PropTypes.node.isRequired,
  spacing: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Editorial Container Component
 * Max-width container with editorial margins
 */
export function EditorialContainer({ 
  children,
  size = 'md',
  className = '',
  style = {}
}) {
  const sizeStyles = {
    sm: { maxWidth: '640px' },
    md: { maxWidth: '800px' },
    lg: { maxWidth: '1024px' },
    xl: { maxWidth: '1200px' },
    full: { maxWidth: '100%' }
  }
  
  return (
    <div
      className={`editorial-container ${className}`}
      style={{
        width: '100%',
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: '1.5rem',
        paddingRight: '1.5rem',
        ...sizeStyles[size],
        ...style
      }}
    >
      {children}
    </div>
  )
}

EditorialContainer.propTypes = {
  children: PropTypes.node.isRequired,
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', 'full']),
  className: PropTypes.string,
  style: PropTypes.object
}

export default EditorialButton
