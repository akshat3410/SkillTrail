import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { BlueprintBackground } from './BlueprintBackground'

/**
 * Editorial Page Wrapper
 * Provides the architectural/magazine layout structure
 * with paper texture, blueprint grid, and editorial spacing
 */
export function EditorialPage({ 
  children, 
  showGrid = true,
  showPath = true,
  className = '' 
}) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Subtle fade-in animation
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: 'power2.out' }
    )

    return () => {
      gsap.killTweensOf(containerRef.current)
    }
  }, [])

  return (
    <div 
      ref={containerRef} 
      className={`editorial-page ${className}`}
      style={{
        minHeight: '100vh',
        paddingTop: '5rem',
        position: 'relative',
        backgroundColor: 'var(--editorial-bg)'
      }}
    >
      {/* Blueprint background with grid */}
      <BlueprintBackground showGrid={showGrid} showPath={showPath} />
      
      {/* Page content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  )
}

EditorialPage.propTypes = {
  children: PropTypes.node.isRequired,
  showGrid: PropTypes.bool,
  showPath: PropTypes.bool,
  className: PropTypes.string
}

export default EditorialPage
