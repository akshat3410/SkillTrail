import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Fixed sidebar with story progress and annotations
 * Fills the left side space with meaningful content
 */
export function LeftSidebar({ chapters = [] }) {
  const sidebarRef = useRef(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      setScrollProgress(progress)
      
      // Calculate active chapter based on scroll
      const chapterIndex = Math.floor(progress * chapters.length)
      setActiveChapter(Math.min(chapterIndex, chapters.length - 1))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [chapters.length])

  const defaultChapters = [
    { num: '01', title: 'Beginning' },
    { num: '02', title: 'Struggle' },
    { num: '03', title: 'Path' },
    { num: '04', title: 'Growth' },
    { num: '05', title: 'Mastery' }
  ]

  const displayChapters = chapters.length > 0 ? chapters : defaultChapters

  return (
    <aside
      ref={sidebarRef}
      style={{
        position: 'fixed',
        left: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        pointerEvents: 'none'
      }}
      className="hidden lg:flex"
    >
      {/* Progress line */}
      <div
        style={{
          position: 'absolute',
          left: '6px',
          top: '0',
          width: '2px',
          height: '100%',
          background: 'var(--editorial-grid)',
          opacity: 0.3
        }}
      >
        <div
          style={{
            width: '100%',
            height: `${scrollProgress * 100}%`,
            background: 'var(--editorial-ink-muted)',
            transition: 'height 0.1s ease-out'
          }}
        />
      </div>

      {/* Chapter indicators */}
      {displayChapters.map((chapter, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            opacity: i === activeChapter ? 0.8 : 0.3,
            transition: 'opacity 0.3s ease'
          }}
        >
          {/* Dot */}
          <div
            style={{
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              background: i <= activeChapter ? 'var(--editorial-ink-muted)' : 'transparent',
              border: '1.5px solid var(--editorial-ink-muted)'
            }}
          />
          
          {/* Chapter info */}
          <div>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                color: 'var(--editorial-ink-muted)',
                display: 'block'
              }}
            >
              {chapter.num}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                color: 'var(--editorial-ink-muted)'
              }}
            >
              {chapter.title}
            </span>
          </div>
        </div>
      ))}
    </aside>
  )
}

LeftSidebar.propTypes = {
  chapters: PropTypes.array
}

/**
 * Fixed right sidebar with contextual hints and sketches
 */
export function RightSidebar() {
  const sidebarRef = useRef(null)
  const [visibleHint, setVisibleHint] = useState(0)

  const hints = [
    { text: 'keep scrolling', icon: '↓' },
    { text: 'you\'re learning', icon: '✦' },
    { text: 'progress visible', icon: '→' },
    { text: 'almost there', icon: '◎' },
    { text: 'take action', icon: '!' }
  ]

  useEffect(() => {
    const updateHint = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollTop / docHeight
      const hintIndex = Math.floor(progress * hints.length)
      setVisibleHint(Math.min(hintIndex, hints.length - 1))
    }

    window.addEventListener('scroll', updateHint)
    return () => window.removeEventListener('scroll', updateHint)
  }, [hints.length])

  return (
    <aside
      ref={sidebarRef}
      style={{
        position: 'fixed',
        right: '20px',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        textAlign: 'right',
        pointerEvents: 'none'
      }}
      className="hidden lg:block"
    >
      {/* Current hint */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          gap: '0.5rem'
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--editorial-ink-muted)',
            opacity: 0.4
          }}
        >
          {hints[visibleHint].icon}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.8rem',
            color: 'var(--editorial-ink-muted)',
            opacity: 0.5,
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '0.1em'
          }}
        >
          {hints[visibleHint].text}
        </span>
      </div>

      {/* Decorative sketchy elements */}
      <div style={{ marginTop: '3rem', opacity: 0.2 }}>
        <svg width="30" height="100" viewBox="0 0 30 100">
          <path
            d="M 15 0 Q 20 25 15 50 Q 10 75 15 100"
            fill="none"
            stroke="var(--editorial-ink-muted)"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
        </svg>
      </div>
    </aside>
  )
}

/**
 * Floating side annotations that appear at specific scroll positions
 */
export function FloatingSideNote({
  children,
  side = 'left',
  triggerStart = 'top 50%',
  offset = '100px',
  className = ''
}) {
  const noteRef = useRef(null)

  useEffect(() => {
    if (!noteRef.current) return

    const startX = side === 'left' ? -50 : 50

    gsap.set(noteRef.current, { opacity: 0, x: startX })

    const anim = gsap.to(noteRef.current, {
      opacity: 0.5,
      x: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: noteRef.current,
        start: triggerStart,
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [side, triggerStart])

  return (
    <div
      ref={noteRef}
      className={`hidden md:block ${className}`}
      style={{
        position: 'absolute',
        [side]: offset,
        top: '50%',
        transform: 'translateY(-50%)',
        maxWidth: '150px',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        color: 'var(--editorial-ink-muted)',
        textAlign: side === 'left' ? 'right' : 'left',
        lineHeight: 1.4
      }}
    >
      {children}
    </div>
  )
}

FloatingSideNote.propTypes = {
  children: PropTypes.node.isRequired,
  side: PropTypes.oneOf(['left', 'right']),
  triggerStart: PropTypes.string,
  offset: PropTypes.string,
  className: PropTypes.string
}

/**
 * Decorative side bracket with optional label
 */
export function SideBracket({
  side = 'left',
  height = '200px',
  label,
  className = ''
}) {
  const bracketRef = useRef(null)

  useEffect(() => {
    if (!bracketRef.current) return

    gsap.set(bracketRef.current, { opacity: 0, scaleY: 0.5 })

    const anim = gsap.to(bracketRef.current, {
      opacity: 0.25,
      scaleY: 1,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: bracketRef.current,
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
    <div
      ref={bracketRef}
      className={`hidden md:flex ${className}`}
      style={{
        position: 'absolute',
        [side]: '40px',
        top: '50%',
        transform: 'translateY(-50%)',
        flexDirection: 'column',
        alignItems: side === 'left' ? 'flex-end' : 'flex-start',
        gap: '0.5rem'
      }}
    >
      <svg
        width="20"
        height={height}
        viewBox={`0 0 20 ${parseInt(height)}`}
        style={{
          transform: side === 'right' ? 'scaleX(-1)' : 'none'
        }}
      >
        <path
          d={`M 18 5 Q 5 5 5 ${parseInt(height) / 2} Q 5 ${parseInt(height) - 5} 18 ${parseInt(height) - 5}`}
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      {label && (
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            color: 'var(--editorial-ink-muted)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            letterSpacing: '0.05em'
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

SideBracket.propTypes = {
  side: PropTypes.oneOf(['left', 'right']),
  height: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string
}

/**
 * Floating sketch elements for side decoration
 */
export function SideSketch({
  type = 'arrow',
  side = 'left',
  top = '30%',
  className = ''
}) {
  const sketchRef = useRef(null)

  useEffect(() => {
    if (!sketchRef.current) return

    gsap.set(sketchRef.current, { opacity: 0, scale: 0.8 })

    const anim = gsap.to(sketchRef.current, {
      opacity: 0.2,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: sketchRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const sketches = {
    arrow: (
      <svg width="40" height="60" viewBox="0 0 40 60">
        <path
          d="M 20 5 L 20 50 M 10 40 L 20 50 L 30 40"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    circle: (
      <svg width="50" height="50" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeDasharray="4 3"
        />
      </svg>
    ),
    star: (
      <svg width="40" height="40" viewBox="0 0 40 40">
        <path
          d="M 20 5 L 20 35 M 5 20 L 35 20 M 8 8 L 32 32 M 32 8 L 8 32"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    wave: (
      <svg width="60" height="30" viewBox="0 0 60 30">
        <path
          d="M 5 15 Q 15 5 25 15 T 45 15 T 55 15"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    )
  }

  return (
    <div
      ref={sketchRef}
      className={`hidden md:block ${className}`}
      style={{
        position: 'absolute',
        [side]: '50px',
        top
      }}
    >
      {sketches[type]}
    </div>
  )
}

SideSketch.propTypes = {
  type: PropTypes.oneOf(['arrow', 'circle', 'star', 'wave']),
  side: PropTypes.oneOf(['left', 'right']),
  top: PropTypes.string,
  className: PropTypes.string
}

/**
 * Progress percentage indicator
 */
export function ProgressIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setProgress(Math.round((scrollTop / docHeight) * 100))
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '30px',
        left: '30px',
        zIndex: 100,
        opacity: 0.4
      }}
      className="hidden lg:block"
    >
      <span
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.5rem',
          color: 'var(--editorial-ink-muted)'
        }}
      >
        {progress}%
      </span>
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.6rem',
          color: 'var(--editorial-ink-muted)',
          display: 'block',
          letterSpacing: '0.1em',
          textTransform: 'uppercase'
        }}
      >
        journey
      </span>
    </div>
  )
}

export default LeftSidebar
