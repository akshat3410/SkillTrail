import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Narrative micro-text that appears in empty spaces
 * Small, faded, guidance text that hints at the journey
 */
export function NarrativeText({
  children,
  align = 'center',
  delay = 0,
  className = '',
  style = {}
}) {
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    gsap.set(textRef.current, { opacity: 0, y: 10 })

    const anim = gsap.to(textRef.current, {
      opacity: 0.5,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay])

  return (
    <p
      ref={textRef}
      className={className}
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '0.9rem',
        fontStyle: 'italic',
        color: 'var(--editorial-ink-muted)',
        textAlign: align,
        lineHeight: 1.6,
        maxWidth: '400px',
        margin: align === 'center' ? '0 auto' : 0,
        ...style
      }}
    >
      {children}
    </p>
  )
}

NarrativeText.propTypes = {
  children: PropTypes.node.isRequired,
  align: PropTypes.oneOf(['left', 'center', 'right']),
  delay: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Transition space between chapters
 * Creates breathing room with subtle narrative hints
 */
export function TransitionSpace({
  narrative,
  height = '30vh',
  showPath = true,
  pathDirection = 'down',
  className = '',
  style = {}
}) {
  const spaceRef = useRef(null)
  const pathRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return

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
        trigger: spaceRef.current,
        start: 'top 80%',
        end: 'bottom 20%',
        scrub: 0.5
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  // Generate organic path based on direction
  const getPath = () => {
    if (pathDirection === 'down') {
      return 'M 50 0 Q 55 30 50 60 Q 45 90 50 120 Q 55 150 50 180'
    }
    return 'M 50 180 Q 45 150 50 120 Q 55 90 50 60 Q 45 30 50 0'
  }

  return (
    <div
      ref={spaceRef}
      className={`transition-space ${className}`}
      style={{
        height,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        ...style
      }}
    >
      {/* Continuous path */}
      {showPath && (
        <svg
          viewBox="0 0 100 180"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '60px',
            height: '100%',
            opacity: 0.3
          }}
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            ref={pathRef}
            d={getPath()}
            fill="none"
            stroke="var(--editorial-ink-muted)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="4 4"
          />
        </svg>
      )}

      {/* Narrative text */}
      {narrative && (
        <NarrativeText>{narrative}</NarrativeText>
      )}
    </div>
  )
}

TransitionSpace.propTypes = {
  narrative: PropTypes.string,
  height: PropTypes.string,
  showPath: PropTypes.bool,
  pathDirection: PropTypes.oneOf(['down', 'up']),
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Margin annotation - like handwritten notes in the margin
 */
export function MarginNote({
  children,
  side = 'left',
  top = '50%',
  className = '',
  style = {}
}) {
  const noteRef = useRef(null)

  useEffect(() => {
    if (!noteRef.current) return

    const startX = side === 'left' ? -30 : 30

    gsap.set(noteRef.current, { opacity: 0, x: startX })

    const anim = gsap.to(noteRef.current, {
      opacity: 0.4,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: noteRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [side])

  return (
    <div
      ref={noteRef}
      className={className}
      style={{
        position: 'absolute',
        top,
        [side]: '20px',
        transform: 'translateY(-50%)',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        color: 'var(--editorial-ink-muted)',
        maxWidth: '120px',
        textAlign: side === 'left' ? 'right' : 'left',
        pointerEvents: 'none',
        ...style
      }}
    >
      {children}
    </div>
  )
}

MarginNote.propTypes = {
  children: PropTypes.node.isRequired,
  side: PropTypes.oneOf(['left', 'right']),
  top: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Sketch annotation arrow with optional label
 */
export function SketchArrow({
  direction = 'down',
  label,
  size = 40,
  className = '',
  style = {}
}) {
  const arrowRef = useRef(null)

  useEffect(() => {
    if (!arrowRef.current) return

    gsap.set(arrowRef.current, { opacity: 0, scale: 0.8 })

    const anim = gsap.to(arrowRef.current, {
      opacity: 0.4,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: arrowRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const rotations = { down: 90, up: -90, left: 180, right: 0 }

  return (
    <div
      ref={arrowRef}
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        ...style
      }}
    >
      <svg
        viewBox="0 0 50 30"
        width={size}
        height={size * 0.6}
        style={{ transform: `rotate(${rotations[direction]}deg)` }}
      >
        <path
          d="M 5 15 Q 20 12 35 15 Q 30 10 45 15 Q 30 20 35 15"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.75rem',
            color: 'var(--editorial-ink-muted)'
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

SketchArrow.propTypes = {
  direction: PropTypes.oneOf(['down', 'up', 'left', 'right']),
  label: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Background story layer - ghosted icons/diagrams
 */
export function GhostedIcon({
  type = 'circle',
  size = 100,
  top,
  left,
  right,
  bottom,
  className = '',
  style = {}
}) {
  const iconRef = useRef(null)

  useEffect(() => {
    if (!iconRef.current) return

    const anim = gsap.fromTo(
      iconRef.current,
      { opacity: 0 },
      {
        opacity: 0.08,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: iconRef.current,
          start: 'top 90%',
          toggleActions: 'play none none reverse'
        }
      }
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const icons = {
    circle: <circle cx="50" cy="50" r="45" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />,
    square: <rect x="5" y="5" width="90" height="90" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />,
    book: (
      <>
        <path d="M 10 20 L 10 80 L 50 70 L 90 80 L 90 20 L 50 30 L 10 20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
        <path d="M 50 30 L 50 70" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
      </>
    ),
    lightbulb: (
      <>
        <circle cx="50" cy="35" r="25" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
        <path d="M 40 60 L 40 75 L 60 75 L 60 60" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
        <path d="M 35 80 L 65 80" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
      </>
    ),
    path: (
      <path d="M 10 80 Q 30 20 50 50 Q 70 80 90 20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" />
    )
  }

  return (
    <svg
      ref={iconRef}
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      style={{
        position: 'absolute',
        top,
        left,
        right,
        bottom,
        pointerEvents: 'none',
        ...style
      }}
    >
      {icons[type]}
    </svg>
  )
}

GhostedIcon.propTypes = {
  type: PropTypes.oneOf(['circle', 'square', 'book', 'lightbulb', 'path']),
  size: PropTypes.number,
  top: PropTypes.string,
  left: PropTypes.string,
  right: PropTypes.string,
  bottom: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Emotional quote block for major transitions
 */
export function EmotionalQuote({
  children,
  className = '',
  style = {}
}) {
  const quoteRef = useRef(null)

  useEffect(() => {
    if (!quoteRef.current) return

    gsap.set(quoteRef.current, { opacity: 0, y: 20 })

    const anim = gsap.to(quoteRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: quoteRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return (
    <blockquote
      ref={quoteRef}
      className={className}
      style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
        fontStyle: 'italic',
        color: 'var(--editorial-ink-light)',
        textAlign: 'center',
        lineHeight: 1.6,
        maxWidth: '600px',
        margin: '0 auto',
        padding: '2rem 0',
        borderLeft: 'none',
        ...style
      }}
    >
      {children}
    </blockquote>
  )
}

EmotionalQuote.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * Continuous journey line that spans the entire page
 */
export function JourneyLine({
  progress = 0,
  className = '',
  style = {}
}) {
  const pathRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return

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
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '100px',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        ...style
      }}
    >
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="xMidYMin slice"
        style={{ width: '100%', height: '300vh' }}
      >
        {/* Dashed guide line */}
        <path
          d="M 50 0 Q 60 100 50 200 Q 40 300 50 400 Q 60 500 50 600 Q 40 700 50 800 Q 60 900 50 1000"
          fill="none"
          stroke="var(--editorial-grid)"
          strokeWidth="1"
          strokeDasharray="4 4"
          opacity="0.3"
        />
        {/* Solid progress line */}
        <path
          ref={pathRef}
          d="M 50 0 Q 60 100 50 200 Q 40 300 50 400 Q 60 500 50 600 Q 40 700 50 800 Q 60 900 50 1000"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.4"
        />
      </svg>
    </div>
  )
}

JourneyLine.propTypes = {
  progress: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

export default NarrativeText
