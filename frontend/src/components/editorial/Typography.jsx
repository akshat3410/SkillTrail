import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Brush Heading Component
 * Hand-painted/brush typography for hero titles and section headers
 * Rough, expressive, like charcoal or brush strokes
 */
export function BrushHeading({ 
  children, 
  as: Tag = 'h1',
  size = 'xl',
  animate = true,
  className = '',
  style = {}
}) {
  const headingRef = useRef(null)
  
  const sizeStyles = {
    sm: { fontSize: 'clamp(1.5rem, 4vw, 2rem)' },
    md: { fontSize: 'clamp(2rem, 5vw, 3rem)' },
    lg: { fontSize: 'clamp(2.5rem, 6vw, 4rem)' },
    xl: { fontSize: 'clamp(3rem, 8vw, 5.5rem)' },
    '2xl': { fontSize: 'clamp(4rem, 10vw, 7rem)' }
  }
  
  useEffect(() => {
    if (!headingRef.current || !animate) return
    
    gsap.set(headingRef.current, { opacity: 0, y: 30 })
    
    const anim = gsap.to(headingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: headingRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [animate])
  
  return (
    <Tag
      ref={headingRef}
      className={`brush-heading ${className}`}
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 400,
        lineHeight: 1.1,
        letterSpacing: '-0.02em',
        color: 'var(--editorial-ink)',
        margin: 0,
        ...sizeStyles[size],
        ...style
      }}
    >
      {children}
    </Tag>
  )
}

BrushHeading.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'span', 'div']),
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl', '2xl']),
  animate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Editorial Text Component
 * Elegant serif typography for body text
 * Magazine-like rhythm and spacing
 */
export function EditorialText({ 
  children, 
  as: Tag = 'p',
  variant = 'body',
  animate = false,
  className = '',
  style = {}
}) {
  const textRef = useRef(null)
  
  const variantStyles = {
    body: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1.1rem, 2vw, 1.25rem)',
      fontWeight: 400,
      lineHeight: 1.8,
      color: 'var(--editorial-ink-light)'
    },
    lead: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1.25rem, 2.5vw, 1.5rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.7,
      color: 'var(--editorial-ink-light)'
    },
    caption: {
      fontFamily: 'var(--font-sans)',
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.02em',
      color: 'var(--editorial-ink-muted)',
      textTransform: 'uppercase'
    },
    label: {
      fontFamily: 'var(--font-sans)',
      fontSize: '0.75rem',
      fontWeight: 500,
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      color: 'var(--editorial-ink-muted)',
      textTransform: 'uppercase'
    },
    quote: {
      fontFamily: 'var(--font-serif)',
      fontSize: 'clamp(1.5rem, 3vw, 2rem)',
      fontWeight: 300,
      fontStyle: 'italic',
      lineHeight: 1.6,
      color: 'var(--editorial-ink)',
      borderLeft: '2px solid var(--editorial-ink-faint)',
      paddingLeft: '1.5rem'
    }
  }
  
  useEffect(() => {
    if (!textRef.current || !animate) return
    
    gsap.set(textRef.current, { opacity: 0, y: 20 })
    
    const anim = gsap.to(textRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [animate])
  
  return (
    <Tag
      ref={textRef}
      className={`editorial-text ${className}`}
      style={{
        margin: 0,
        ...variantStyles[variant],
        ...style
      }}
    >
      {children}
    </Tag>
  )
}

EditorialText.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['p', 'span', 'div', 'blockquote', 'figcaption', 'label']),
  variant: PropTypes.oneOf(['body', 'lead', 'caption', 'label', 'quote']),
  animate: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Divider Line Component
 * Thin editorial divider like print layouts
 */
export function EditorialDivider({ 
  variant = 'full',
  className = '',
  style = {}
}) {
  const variants = {
    full: { width: '100%' },
    center: { width: '60%', margin: '0 auto' },
    short: { width: '100px' },
    left: { width: '40%' }
  }
  
  return (
    <hr
      className={`editorial-divider ${className}`}
      style={{
        border: 'none',
        height: '1px',
        backgroundColor: 'var(--editorial-grid)',
        ...variants[variant],
        ...style
      }}
    />
  )
}

EditorialDivider.propTypes = {
  variant: PropTypes.oneOf(['full', 'center', 'short', 'left']),
  className: PropTypes.string,
  style: PropTypes.object
}

export default BrushHeading
