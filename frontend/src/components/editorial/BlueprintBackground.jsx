import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Blueprint Background Component
 * Creates the architectural grid + paper texture backdrop
 * Used as a page-level background element
 */
export function BlueprintBackground({ 
  showGrid = true, 
  showPath = true,
  className = '' 
}) {
  const pathRef = useRef(null)
  
  useEffect(() => {
    if (!pathRef.current || !showPath) return
    
    const path = pathRef.current
    const length = path.getTotalLength()
    
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })
    
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [showPath])
  
  // Hand-drawn architectural path
  const architecturalPath = `
    M 50 0
    Q 70 80 55 160
    T 45 320
    Q 30 400 50 480
    T 60 640
    Q 75 720 50 800
    T 40 960
    Q 25 1040 50 1120
    T 55 1280
    Q 70 1360 50 1440
    T 45 1600
    Q 30 1680 50 1760
    T 55 1920
    Q 70 2000 50 2080
    T 45 2240
    Q 30 2320 50 2400
    T 55 2560
    Q 70 2640 50 2720
    T 45 2880
    Q 30 2960 50 3040
    T 55 3200
    Q 70 3280 50 3360
    T 45 3520
    Q 30 3600 50 3680
    T 55 3840
    Q 70 3920 50 4000
    T 45 4160
    Q 30 4240 50 4320
    T 55 4480
    L 50 5000
  `
  
  return (
    <div 
      className={`blueprint-background ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Blueprint Grid Pattern */}
      {showGrid && (
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <defs>
            {/* Small grid pattern */}
            <pattern 
              id="small-grid" 
              width="20" 
              height="20" 
              patternUnits="userSpaceOnUse"
            >
              <path 
                d="M 20 0 L 0 0 0 20" 
                fill="none" 
                stroke="var(--editorial-grid-light)" 
                strokeWidth="0.5"
                opacity="0.5"
              />
            </pattern>
            
            {/* Large grid pattern */}
            <pattern 
              id="large-grid" 
              width="100" 
              height="100" 
              patternUnits="userSpaceOnUse"
            >
              <rect width="100" height="100" fill="url(#small-grid)" />
              <path 
                d="M 100 0 L 0 0 0 100" 
                fill="none" 
                stroke="var(--editorial-grid)" 
                strokeWidth="1"
                opacity="0.4"
              />
            </pattern>
          </defs>
          
          <rect width="100%" height="100%" fill="url(#large-grid)" />
        </svg>
      )}
      
      {/* Architectural hand-drawn path */}
      {showPath && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100px',
            height: '5000px'
          }}
        >
          <svg
            viewBox="0 0 100 5000"
            preserveAspectRatio="xMidYMin slice"
            style={{
              width: '100%',
              height: '100%'
            }}
          >
            {/* Architectural line - charcoal/graphite style */}
            <path
              ref={pathRef}
              d={architecturalPath}
              fill="none"
              stroke="var(--editorial-ink-muted)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
          </svg>
        </div>
      )}
    </div>
  )
}

BlueprintBackground.propTypes = {
  showGrid: PropTypes.bool,
  showPath: PropTypes.bool,
  className: PropTypes.string
}

export default BlueprintBackground
