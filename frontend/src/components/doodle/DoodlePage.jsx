import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * Page wrapper with doodle-style fade-in animation
 */
export function DoodlePage({ children, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    gsap.fromTo(
      containerRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
    )

    return () => {
      gsap.killTweensOf(containerRef.current)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`min-h-screen pt-20 ${className}`}
      style={{ 
        background: 'var(--doodle-bg)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {children}
    </div>
  )
}

DoodlePage.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default DoodlePage
