import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * ZigZagSection - Section with configurable alignment and enhanced animations
 */
export function ZigZagSection({
  children,
  align = 'center',
  annotation,
  oppositeContent,
  className = '',
  style = {}
}) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const annotationRef = useRef(null)
  const oppositeRef = useRef(null)

  useEffect(() => {
    if (!contentRef.current) return

    const slideFrom = align === 'left' ? -60 : align === 'right' ? 60 : 0

    gsap.set(contentRef.current, { 
      opacity: 0, 
      x: slideFrom, 
      y: 30,
      filter: 'blur(4px)'
    })

    const anim = gsap.to(contentRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      filter: 'blur(0px)',
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [align])

  useEffect(() => {
    if (!annotationRef.current) return

    const slideFrom = align === 'left' ? 20 : -20

    gsap.set(annotationRef.current, { opacity: 0, x: slideFrom, scale: 0.9 })

    const anim = gsap.to(annotationRef.current, {
      opacity: 0.5,
      x: 0,
      scale: 1,
      duration: 0.7,
      delay: 0.4,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [align])

  useEffect(() => {
    if (!oppositeRef.current) return

    const slideFrom = align === 'left' ? 40 : -40

    gsap.set(oppositeRef.current, { 
      opacity: 0, 
      x: slideFrom,
      scale: 0.95,
      rotateY: align === 'left' ? 5 : -5
    })

    const anim = gsap.to(oppositeRef.current, {
      opacity: 0.7,
      x: 0,
      scale: 1,
      rotateY: 0,
      duration: 0.9,
      delay: 0.3,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [align])

  const getContainerStyles = () => {
    const base = {
      display: 'grid',
      alignItems: 'center',
      gap: '4rem',
      width: '100%',
      maxWidth: '1100px',
      margin: '0 auto',
      padding: '0 2rem'
    }

    switch (align) {
      case 'left':
        return { ...base, gridTemplateColumns: '1.2fr 0.8fr' }
      case 'right':
        return { ...base, gridTemplateColumns: '0.8fr 1.2fr' }
      default:
        return { ...base, gridTemplateColumns: '1fr', justifyItems: 'center' }
    }
  }

  return (
    <section
      ref={sectionRef}
      className={`zigzag-section zigzag-${align} ${className}`}
      style={{
        position: 'relative',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5rem 1.5rem',
        ...style
      }}
    >
      <div style={getContainerStyles()}>
        {align === 'right' && oppositeContent && (
          <div ref={oppositeRef} className="hidden md:flex" style={{ justifyContent: 'center' }}>
            {oppositeContent}
          </div>
        )}

        <div
          ref={contentRef}
          style={{
            maxWidth: align === 'center' ? '650px' : '480px',
            textAlign: align === 'center' ? 'center' : 'left'
          }}
        >
          {children}
        </div>

        {align === 'left' && oppositeContent && (
          <div ref={oppositeRef} className="hidden md:flex" style={{ justifyContent: 'center' }}>
            {oppositeContent}
          </div>
        )}
      </div>

      {annotation && (
        <div
          ref={annotationRef}
          style={{
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            [align === 'left' ? 'right' : 'left']: '2%',
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            color: 'var(--editorial-ink-muted)',
            lineHeight: 1.5,
            textAlign: align === 'left' ? 'left' : 'right',
            maxWidth: '100px'
          }}
          className="hidden xl:block"
        >
          {annotation}
        </div>
      )}
    </section>
  )
}

ZigZagSection.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['center', 'left', 'right']),
  annotation: PropTypes.node,
  oppositeContent: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * ZigZagPath - Enhanced continuous path with better visibility
 */
export function ZigZagPath() {
  const containerRef = useRef(null)
  const mainPathRef = useRef(null)
  const glowPathRef = useRef(null)
  const dotRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    if (!mainPathRef.current) return

    const mainPath = mainPathRef.current
    const length = mainPath.getTotalLength()

    gsap.set(mainPath, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    if (glowPathRef.current) {
      gsap.set(glowPathRef.current, {
        strokeDasharray: length,
        strokeDashoffset: length
      })
    }

    const anim = gsap.to([mainPath, glowPathRef.current], {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5,
        onUpdate: (self) => {
          setScrollProgress(self.progress)
        }
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  // Animate the dot along the path
  useEffect(() => {
    if (!mainPathRef.current || !dotRef.current) return

    const path = mainPathRef.current
    const length = path.getTotalLength()
    const point = path.getPointAtLength(scrollProgress * length)

    gsap.to(dotRef.current, {
      attr: { cx: point.x, cy: point.y },
      duration: 0.1,
      ease: 'none'
    })
  }, [scrollProgress])

  const pathD = `
    M 50 0
    C 50 3, 48 6, 40 10
    C 25 16, 18 22, 18 30
    Q 18 38, 30 42
    C 50 48, 70 52, 82 58
    Q 88 62, 88 70
    C 88 78, 70 82, 50 85
    Q 40 87, 35 92
    C 25 98, 20 105, 20 112
    Q 20 120, 35 125
    C 55 132, 75 138, 82 145
    Q 88 150, 85 158
    C 80 168, 60 175, 50 180
    L 50 200
  `

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 2
      }}
    >
      <svg
        viewBox="0 0 100 200"
        preserveAspectRatio="none"
        style={{
          width: '100%',
          height: '100%'
        }}
      >
        {/* Background dashed path */}
        <path
          d={pathD}
          fill="none"
          stroke="var(--editorial-grid)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
          opacity="0.4"
        />

        {/* Glow effect */}
        <path
          ref={glowPathRef}
          d={pathD}
          fill="none"
          stroke="var(--editorial-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.08"
          style={{ filter: 'blur(3px)' }}
        />

        {/* Main animated path */}
        <path
          ref={mainPathRef}
          d={pathD}
          fill="none"
          stroke="var(--editorial-ink)"
          strokeWidth="0.5"
          strokeLinecap="round"
          opacity="0.35"
        />

        {/* Moving dot indicator */}
        <circle
          ref={dotRef}
          cx="50"
          cy="0"
          r="1.5"
          fill="var(--editorial-ink)"
          opacity="0.6"
        />

        {/* Waypoint markers */}
        {[30, 70, 112, 158].map((y, i) => (
          <circle
            key={i}
            cx={i % 2 === 0 ? 18 + (i * 5) : 82 - (i * 5)}
            cy={y}
            r="1"
            fill="none"
            stroke="var(--editorial-ink)"
            strokeWidth="0.3"
            opacity="0.25"
          />
        ))}
      </svg>
    </div>
  )
}

/**
 * ZigZagTransition - Enhanced transitions with more animations
 */
export function ZigZagTransition({
  narrative,
  toAlign = 'left',
  height = '18vh',
  decoration
}) {
  const ref = useRef(null)
  const textRef = useRef(null)
  const decoRef = useRef(null)
  const arrowRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.set(textRef.current, { opacity: 0, y: 15, scale: 0.95 })

    const anim = gsap.to(textRef.current, {
      opacity: 0.6,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  useEffect(() => {
    if (!decoRef.current) return

    gsap.set(decoRef.current, { opacity: 0, scale: 0.8, rotate: -5 })

    const anim = gsap.to(decoRef.current, {
      opacity: 0.3,
      scale: 1,
      rotate: 0,
      duration: 0.7,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  // Arrow draw animation
  useEffect(() => {
    if (!arrowRef.current) return

    const path = arrowRef.current
    const length = path.getTotalLength()

    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })

    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const arrowPath = toAlign === 'left' 
    ? 'M 65 10 Q 40 30 25 50 L 30 45 M 25 50 L 30 55' 
    : toAlign === 'right'
    ? 'M 35 10 Q 60 30 75 50 L 70 45 M 75 50 L 70 55'
    : 'M 50 5 L 50 55 L 45 50 M 50 55 L 55 50'

  return (
    <div
      ref={ref}
      style={{
        height,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: '2rem'
      }}
    >
      {/* Animated direction arrow */}
      <svg
        viewBox="0 0 100 65"
        style={{
          position: 'absolute',
          width: '70px',
          height: '45px'
        }}
      >
        <path
          ref={arrowRef}
          d={arrowPath}
          fill="none"
          stroke="var(--editorial-ink)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.25"
        />
      </svg>

      {narrative && (
        <p
          ref={textRef}
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-muted)',
            textAlign: 'center',
            maxWidth: '300px',
            position: 'relative',
            zIndex: 1
          }}
        >
          {narrative}
        </p>
      )}

      {decoration && (
        <div
          ref={decoRef}
          style={{
            position: 'absolute',
            [toAlign === 'left' ? 'right' : 'left']: '18%'
          }}
        >
          {decoration}
        </div>
      )}
    </div>
  )
}

ZigZagTransition.propTypes = {
  narrative: PropTypes.string,
  toAlign: PropTypes.string,
  height: PropTypes.string,
  decoration: PropTypes.node
}

/**
 * FillerElement - Animated decorative elements
 */
export function FillerElement({ type = 'dots', style = {}, animate = true }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!animate || !ref.current) return

    gsap.set(ref.current, { opacity: 0, scale: 0.8 })

    const anim = gsap.to(ref.current, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [animate])

  const elements = {
    dots: (
      <svg width="60" height="20" viewBox="0 0 60 20">
        <circle cx="10" cy="10" r="2.5" fill="var(--editorial-ink-muted)" opacity="0.4" />
        <circle cx="30" cy="10" r="2.5" fill="var(--editorial-ink-muted)" opacity="0.3" />
        <circle cx="50" cy="10" r="2.5" fill="var(--editorial-ink-muted)" opacity="0.2" />
      </svg>
    ),
    arrow: (
      <svg width="30" height="50" viewBox="0 0 30 50">
        <path
          d="M 15 5 L 15 40 M 8 33 L 15 45 L 22 33"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </svg>
    ),
    wave: (
      <svg width="80" height="25" viewBox="0 0 80 25">
        <path
          d="M 5 12 Q 15 5 25 12 T 45 12 T 65 12 T 75 12"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.25"
        />
      </svg>
    ),
    circle: (
      <svg width="45" height="45" viewBox="0 0 45 45">
        <circle
          cx="22.5"
          cy="22.5"
          r="18"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.2"
          strokeDasharray="4 3"
          opacity="0.25"
        />
        <circle
          cx="22.5"
          cy="22.5"
          r="4"
          fill="var(--editorial-ink-muted)"
          opacity="0.15"
        />
      </svg>
    ),
    star: (
      <svg width="35" height="35" viewBox="0 0 35 35">
        <path
          d="M 17.5 5 L 17.5 30 M 5 17.5 L 30 17.5 M 9 9 L 26 26 M 26 9 L 9 26"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.2"
        />
      </svg>
    ),
    sparkle: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <path
          d="M 20 5 L 20 35 M 5 20 L 35 20"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
        <circle cx="20" cy="20" r="3" fill="var(--editorial-ink-muted)" opacity="0.2" />
      </svg>
    )
  }

  return <div ref={ref} style={style}>{elements[type]}</div>
}

FillerElement.propTypes = {
  type: PropTypes.oneOf(['dots', 'arrow', 'wave', 'circle', 'star', 'sparkle']),
  style: PropTypes.object,
  animate: PropTypes.bool
}

/**
 * OppositeDecoration - Animated decoration for opposite side
 */
export function OppositeDecoration({ type = 'sketch', children }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return

    // Subtle floating animation
    gsap.to(ref.current, {
      y: -8,
      duration: 3,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })
  }, [])

  if (type === 'custom' && children) {
    return <div ref={ref} style={{ opacity: 0.6 }}>{children}</div>
  }

  const decorations = {
    sketch: (
      <div ref={ref}>
        <svg width="140" height="140" viewBox="0 0 140 140">
          <circle cx="70" cy="70" r="55" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="1" strokeDasharray="6 4" opacity="0.25" />
          <circle cx="70" cy="70" r="35" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="0.8" opacity="0.18" />
          <circle cx="70" cy="70" r="15" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="0.5" opacity="0.12" />
          <path d="M 70 15 L 70 125 M 15 70 L 125 70" stroke="var(--editorial-ink-muted)" strokeWidth="0.4" opacity="0.1" />
        </svg>
      </div>
    ),
    lines: (
      <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '10px', opacity: 0.2 }}>
        {[95, 70, 110, 55, 85, 60].map((w, i) => (
          <div
            key={i}
            style={{
              width: `${w}px`,
              height: '2px',
              background: 'var(--editorial-ink-muted)',
              borderRadius: '1px'
            }}
          />
        ))}
      </div>
    ),
    dots: (
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', opacity: 0.2 }}>
        {Array(16).fill(0).map((_, i) => (
          <div
            key={i}
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: 'var(--editorial-ink-muted)',
              opacity: 0.3 + (Math.random() * 0.4)
            }}
          />
        ))}
      </div>
    ),
    target: (
      <div ref={ref}>
        <svg width="100" height="100" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="40" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="1" strokeDasharray="6 3" opacity="0.2" />
          <circle cx="50" cy="50" r="25" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="0.8" opacity="0.15" />
          <circle cx="50" cy="50" r="10" fill="none" stroke="var(--editorial-ink-muted)" strokeWidth="0.6" opacity="0.12" />
          <circle cx="50" cy="50" r="3" fill="var(--editorial-ink-muted)" opacity="0.3" />
        </svg>
      </div>
    )
  }

  return decorations[type] || decorations.sketch
}

OppositeDecoration.propTypes = {
  type: PropTypes.oneOf(['sketch', 'lines', 'dots', 'target', 'custom']),
  children: PropTypes.node
}

/**
 * AnimatedText - Text with staggered letter animation
 */
export function AnimatedText({ children, className = '', style = {} }) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const chars = textRef.current.querySelectorAll('.char')
    
    gsap.set(chars, { opacity: 0, y: 20 })

    const anim = gsap.to(chars, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const text = typeof children === 'string' ? children : ''
  
  return (
    <span ref={textRef} className={className} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <span key={i} className="char" style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </span>
  )
}

AnimatedText.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

export default ZigZagSection
