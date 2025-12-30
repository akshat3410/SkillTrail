import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * Page transition wrapper with fade/slide animation
 */
export function PageTransition({ children, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    // Animate in
    gsap.fromTo(
      container,
      { 
        opacity: 0, 
        y: 20 
      },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.4, 
        ease: 'power2.out' 
      }
    )

    return () => {
      // Cleanup any running animations
      gsap.killTweensOf(container)
    }
  }, [])

  return (
    <div ref={containerRef} className={`min-h-screen pt-16 ${className}`}>
      {children}
    </div>
  )
}

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string
}

export default PageTransition
