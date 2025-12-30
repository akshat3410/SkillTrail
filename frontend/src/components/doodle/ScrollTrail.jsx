import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Hand-drawn thick pencil/marker trail that animates on scroll
 * Bold, dark navy strokes like hand-drawn infographic style
 * Only visible as user scrolls - reveals progressively
 */
export function ScrollTrail({ className = '' }) {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  
  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return
    
    const path = pathRef.current
    const length = path.getTotalLength()
    
    // Set initial state - path completely hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })
    
    // Animate on scroll - reveals as you scroll
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])
  
  // Hand-drawn wobbly curvy path - like marker strokes
  // Organic curves with natural imperfections
  const trailPath = `
    M 50 0
    Q 75 50 70 100
    T 55 200
    Q 25 250 30 320
    T 60 420
    Q 85 480 75 550
    T 40 670
    Q 20 740 35 820
    T 70 940
    Q 90 1010 75 1100
    T 45 1220
    Q 20 1300 40 1400
    T 75 1520
    Q 95 1600 70 1700
    T 35 1840
    Q 15 1930 45 2040
    T 80 2180
    Q 95 2270 65 2380
    T 30 2520
    Q 10 2620 50 2740
    T 85 2880
    Q 95 2980 60 3100
    T 25 3250
    Q 10 3360 55 3480
    T 80 3620
    Q 90 3740 50 3880
    T 30 4040
    Q 20 4160 60 4300
    T 75 4460
    Q 85 4580 50 4720
    T 40 4900
    L 50 5100
  `
  
  return (
    <div
      ref={containerRef}
      className={`scroll-trail-container pointer-events-none ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '120px',
        height: '100%',
        zIndex: 0,
        overflow: 'visible'
      }}
    >
      <svg
        className="scroll-trail-svg"
        viewBox="0 0 100 5100"
        preserveAspectRatio="xMidYMin slice"
        style={{
          width: '100%',
          height: '100%',
          minHeight: '5100px'
        }}
      >
        {/* Bold hand-drawn stroke - dark navy like marker */}
        <path
          ref={pathRef}
          d={trailPath}
          fill="none"
          stroke="#1a2536"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            filter: 'url(#roughen)'
          }}
        />
        
        {/* SVG filter for hand-drawn roughness effect */}
        <defs>
          <filter id="roughen" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence 
              type="turbulence" 
              baseFrequency="0.02" 
              numOctaves="3" 
              result="noise"
            />
            <feDisplacementMap 
              in="SourceGraphic" 
              in2="noise" 
              scale="2" 
              xChannelSelector="R" 
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
    </div>
  )
}

ScrollTrail.propTypes = {
  className: PropTypes.string
}



/**
 * Decorative doodle shapes for background
 * Hand-drawn, sketchy, visible decoration
 */
export function BackgroundDoodles() {
  return (
    <div 
      className="background-doodles pointer-events-none"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        overflow: 'hidden'
      }}
    >
      {/* Top right - curvy squiggle */}
      <svg
        viewBox="0 0 100 100"
        style={{
          position: 'absolute',
          top: '12%',
          right: '4%',
          width: '110px',
          height: '110px',
          opacity: 0.22
        }}
      >
        <path
          d="M10 50 C 30 20, 50 80, 70 40 S 90 60, 90 50"
          fill="none"
          stroke="var(--doodle-purple)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Left side - abstract code brackets */}
      <svg
        viewBox="0 0 60 80"
        style={{
          position: 'absolute',
          top: '35%',
          left: '2%',
          width: '55px',
          height: '75px',
          opacity: 0.2
        }}
      >
        <path
          d="M28 10 L10 40 L28 70"
          fill="none"
          stroke="var(--doodle-blue)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M32 10 L50 40 L32 70"
          fill="none"
          stroke="var(--doodle-blue)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      
      {/* Right side - loose spiral */}
      <svg
        viewBox="0 0 80 80"
        style={{
          position: 'absolute',
          top: '55%',
          right: '3%',
          width: '90px',
          height: '90px',
          opacity: 0.18
        }}
      >
        <path
          d="M40 15 C 65 15, 65 65, 40 65 C 20 65, 20 30, 40 30 C 52 30, 52 52, 40 52"
          fill="none"
          stroke="var(--doodle-yellow)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Bottom left - scattered dots */}
      <svg
        viewBox="0 0 120 80"
        style={{
          position: 'absolute',
          bottom: '8%',
          left: '4%',
          width: '100px',
          height: '60px',
          opacity: 0.28
        }}
      >
        <circle cx="15" cy="25" r="6" fill="var(--doodle-pink)" />
        <circle cx="50" cy="45" r="5" fill="var(--doodle-mint)" />
        <circle cx="85" cy="20" r="7" fill="var(--doodle-purple)" />
        <circle cx="70" cy="55" r="5" fill="var(--doodle-yellow)" />
        <circle cx="30" cy="60" r="4" fill="var(--doodle-blue)" />
      </svg>
      
      {/* Top left - wavy line */}
      <svg
        viewBox="0 0 150 50"
        style={{
          position: 'absolute',
          top: '22%',
          left: '6%',
          width: '140px',
          height: '45px',
          opacity: 0.18
        }}
      >
        <path
          d="M10 25 Q 35 10, 60 25 T 110 25 T 140 25"
          fill="none"
          stroke="var(--doodle-stroke)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Right middle - asterisk/star */}
      <svg
        viewBox="0 0 50 50"
        style={{
          position: 'absolute',
          top: '72%',
          right: '8%',
          width: '50px',
          height: '50px',
          opacity: 0.22
        }}
      >
        <path
          d="M25 5 L25 45 M5 25 L45 25 M10 10 L40 40 M40 10 L10 40"
          fill="none"
          stroke="var(--doodle-mint)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      
      {/* Bottom right - curvy arrow */}
      <svg
        viewBox="0 0 70 70"
        style={{
          position: 'absolute',
          bottom: '18%',
          right: '5%',
          width: '60px',
          height: '60px',
          opacity: 0.18
        }}
      >
        <path
          d="M15 55 C 20 30, 40 20, 60 15"
          fill="none"
          stroke="var(--doodle-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M50 10 L60 15 L55 25"
          fill="none"
          stroke="var(--doodle-blue)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Top center - zigzag */}
      <svg
        viewBox="0 0 120 40"
        style={{
          position: 'absolute',
          top: '8%',
          left: '40%',
          width: '120px',
          height: '40px',
          opacity: 0.15
        }}
      >
        <path
          d="M10 30 L30 10 L50 30 L70 10 L90 30 L110 10"
          fill="none"
          stroke="var(--doodle-pink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Left - infinity loop */}
      <svg
        viewBox="0 0 80 40"
        style={{
          position: 'absolute',
          top: '65%',
          left: '3%',
          width: '70px',
          height: '35px',
          opacity: 0.18
        }}
      >
        <path
          d="M20 20 C 10 10, 10 30, 20 20 C 30 10, 50 10, 60 20 C 70 30, 70 10, 60 20 C 50 30, 30 30, 20 20"
          fill="none"
          stroke="var(--doodle-purple)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* NEW: Right top - lightning bolt */}
      <svg
        viewBox="0 0 40 60"
        style={{
          position: 'absolute',
          top: '30%',
          right: '6%',
          width: '35px',
          height: '55px',
          opacity: 0.2
        }}
      >
        <path
          d="M25 5 L10 28 L22 28 L15 55 L30 25 L18 25 L25 5"
          fill="none"
          stroke="var(--doodle-yellow)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Center left - small cloud */}
      <svg
        viewBox="0 0 80 50"
        style={{
          position: 'absolute',
          top: '50%',
          left: '5%',
          width: '70px',
          height: '45px',
          opacity: 0.15
        }}
      >
        <path
          d="M20 35 C 5 35, 5 20, 18 18 C 15 8, 30 5, 40 12 C 50 5, 70 10, 65 22 C 75 22, 75 35, 60 35 Z"
          fill="none"
          stroke="var(--doodle-blue)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* NEW: Bottom center - hexagon */}
      <svg
        viewBox="0 0 50 50"
        style={{
          position: 'absolute',
          bottom: '5%',
          left: '45%',
          width: '45px',
          height: '45px',
          opacity: 0.18
        }}
      >
        <path
          d="M25 5 L45 15 L45 35 L25 45 L5 35 L5 15 Z"
          fill="none"
          stroke="var(--doodle-mint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Top left - small heart */}
      <svg
        viewBox="0 0 40 40"
        style={{
          position: 'absolute',
          top: '5%',
          left: '15%',
          width: '35px',
          height: '35px',
          opacity: 0.2
        }}
      >
        <path
          d="M20 35 C 5 20, 5 10, 15 10 C 20 10, 20 15, 20 15 C 20 15, 20 10, 25 10 C 35 10, 35 20, 20 35"
          fill="none"
          stroke="var(--doodle-pink)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* NEW: Right - checkmark */}
      <svg
        viewBox="0 0 40 40"
        style={{
          position: 'absolute',
          top: '42%',
          right: '12%',
          width: '35px',
          height: '35px',
          opacity: 0.2
        }}
      >
        <path
          d="M8 22 L16 30 L32 10"
          fill="none"
          stroke="var(--doodle-mint)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Bottom left - plus signs */}
      <svg
        viewBox="0 0 60 60"
        style={{
          position: 'absolute',
          bottom: '30%',
          left: '8%',
          width: '50px',
          height: '50px',
          opacity: 0.15
        }}
      >
        <path d="M15 10 L15 25 M8 17.5 L22 17.5" stroke="var(--doodle-yellow)" strokeWidth="2" strokeLinecap="round" />
        <path d="M40 35 L40 55 M30 45 L50 45" stroke="var(--doodle-purple)" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* NEW: Center - small circles cluster */}
      <svg
        viewBox="0 0 80 80"
        style={{
          position: 'absolute',
          top: '82%',
          left: '25%',
          width: '60px',
          height: '60px',
          opacity: 0.18
        }}
      >
        <circle cx="20" cy="20" r="12" fill="none" stroke="var(--doodle-blue)" strokeWidth="2" />
        <circle cx="50" cy="35" r="8" fill="none" stroke="var(--doodle-pink)" strokeWidth="2" />
        <circle cx="30" cy="55" r="10" fill="none" stroke="var(--doodle-yellow)" strokeWidth="2" />
      </svg>

      {/* NEW: Right bottom - curved arrow down */}
      <svg
        viewBox="0 0 40 60"
        style={{
          position: 'absolute',
          bottom: '40%',
          right: '4%',
          width: '35px',
          height: '55px',
          opacity: 0.15
        }}
      >
        <path
          d="M20 5 C 35 15, 35 35, 20 50"
          fill="none"
          stroke="var(--doodle-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M12 42 L20 50 L28 42"
          fill="none"
          stroke="var(--doodle-stroke)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* NEW: Left bottom - triangle */}
      <svg
        viewBox="0 0 50 50"
        style={{
          position: 'absolute',
          bottom: '50%',
          left: '4%',
          width: '40px',
          height: '40px',
          opacity: 0.15
        }}
      >
        <path
          d="M25 8 L45 42 L5 42 Z"
          fill="none"
          stroke="var(--doodle-mint)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

/**
 * Section divider with hand-drawn wavy line
 */
export function DoodleDivider({ variant = 'default', className = '' }) {
  const colors = {
    default: 'var(--doodle-stroke)',
    yellow: 'var(--doodle-yellow)',
    mint: 'var(--doodle-mint)',
    blue: 'var(--doodle-blue)'
  }
  
  return (
    <div className={`doodle-divider py-4 ${className}`}>
      <svg
        viewBox="0 0 400 20"
        className="w-full max-w-md mx-auto"
        style={{ height: '20px', opacity: 0.3 }}
      >
        <path
          d="M0 10 Q 50 5, 100 10 T 200 10 T 300 10 T 400 10"
          fill="none"
          stroke={colors[variant]}
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="8 6"
        />
      </svg>
    </div>
  )
}

DoodleDivider.propTypes = {
  variant: PropTypes.oneOf(['default', 'yellow', 'mint', 'blue']),
  className: PropTypes.string
}

export default ScrollTrail
