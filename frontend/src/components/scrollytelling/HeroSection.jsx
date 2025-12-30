import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import PropTypes from 'prop-types'

gsap.registerPlugin(ScrollTrigger)

/**
 * Enhanced Hero Section - Story Opening
 * Acts as Chapter 1 of the learning journey story
 * Calm, intentional opening that promises direction
 */
export function HeroSection({ className = '' }) {
  const heroRef = useRef(null)
  const chapterRef = useRef(null)
  const headlineRef = useRef(null)
  const sublineRef = useRef(null)
  const groundingRef = useRef(null)
  const contextRef = useRef(null)
  const dividerRef = useRef(null)
  const promiseRef = useRef(null)
  const scrollCueRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

      // Chapter label fades in first
      tl.fromTo(chapterRef.current, 
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        0.3
      )

      // Headline appears
      tl.fromTo(headlineRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.5
      )

      // Subline follows
      tl.fromTo(sublineRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        0.9
      )

      // Grounding line
      tl.fromTo(groundingRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5 },
        1.2
      )

      // Context text reveals
      tl.fromTo(contextRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        1.5
      )

      // Divider draws
      if (dividerRef.current) {
        const path = dividerRef.current
        const length = path.getTotalLength()
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
        tl.to(path, { strokeDashoffset: 0, duration: 0.8 }, 1.8)
      }

      // Promise fades in
      tl.fromTo(promiseRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6 },
        2.1
      )

      // Scroll cue appears
      tl.fromTo(scrollCueRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        2.5
      )

      // Infinite subtle bounce for scroll cue
      gsap.to(scrollCueRef.current, {
        y: 8,
        duration: 1.5,
        ease: 'sine.inOut',
        repeat: -1,
        yoyo: true,
        delay: 3
      })

    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className={className}
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative',
        textAlign: 'center'
      }}
    >
      {/* Chapter Label */}
      <span
        ref={chapterRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.65rem',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'var(--editorial-ink-muted)',
          marginBottom: '2.5rem',
          opacity: 0
        }}
      >
        chapter one — the beginning
      </span>

      {/* Main Headline */}
      <h1
        ref={headlineRef}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.8rem, 10vw, 5.5rem)',
          color: 'var(--editorial-ink)',
          lineHeight: 1,
          margin: 0,
          marginBottom: '0.75rem',
          opacity: 0
        }}
      >
        Finally, Clarity.
      </h1>

      {/* Subline */}
      <p
        ref={sublineRef}
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(1.2rem, 3vw, 1.6rem)',
          color: 'var(--editorial-ink)',
          fontWeight: 400,
          lineHeight: 1.4,
          margin: 0,
          marginBottom: '1rem',
          opacity: 0
        }}
      >
        A learning path you can actually follow.
      </p>

      {/* Grounding Line - Explains what the product is */}
      <p
        ref={groundingRef}
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.8rem',
          color: 'var(--editorial-ink-muted)',
          letterSpacing: '0.02em',
          margin: 0,
          marginBottom: '3rem',
          opacity: 0
        }}
      >
        Guided roadmaps for learning technical skills, step by step.
      </p>

      {/* Context - Progression, not just pain */}
      <div
        ref={contextRef}
        style={{
          maxWidth: '460px',
          marginBottom: '2.5rem',
          opacity: 0
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
            color: 'var(--editorial-ink-light)',
            lineHeight: 1.75,
            fontStyle: 'italic',
            margin: 0
          }}
        >
          You don't need more resources.
          <br />
          <span style={{ opacity: 0.85 }}>
            You need the right order.
          </span>
        </p>
      </div>

      {/* Hand-drawn Divider */}
      <svg
        viewBox="0 0 200 20"
        style={{
          width: '80px',
          height: '14px',
          marginBottom: '2.5rem'
        }}
      >
        <path
          ref={dividerRef}
          d="M 10 10 Q 50 5 100 10 T 190 10"
          fill="none"
          stroke="var(--editorial-ink-muted)"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>

      {/* Promise Statement */}
      <div
        ref={promiseRef}
        style={{
          maxWidth: '440px',
          marginBottom: '4rem',
          opacity: 0
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            color: 'var(--editorial-ink)',
            lineHeight: 1.75,
            margin: 0
          }}
        >
          <strong style={{ fontWeight: 500 }}>SkillTrail</strong> shows you what to learn,
          <br />
          in what order, and why it matters.
        </p>
      </div>

      {/* Scroll Cue - Journey metaphor */}
      <div
        ref={scrollCueRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          opacity: 0
        }}
      >
        <svg
          viewBox="0 0 24 24"
          style={{ width: '16px', height: '16px' }}
        >
          <path
            d="M 12 4 L 12 18 M 6 14 L 12 20 L 18 14"
            fill="none"
            stroke="var(--editorial-ink-muted)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.45"
          />
        </svg>

        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.7rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-muted)',
            opacity: 0.5
          }}
        >
          follow the path
        </span>
      </div>

      {/* Side Annotation - left */}
      <div
        style={{
          position: 'absolute',
          left: '30px',
          top: '50%',
          transform: 'translateY(-50%) rotate(-90deg)',
          transformOrigin: 'center center',
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          color: 'var(--editorial-ink-muted)',
          opacity: 0.2,
          letterSpacing: '0.1em'
        }}
        className="hidden xl:block"
      >
        your journey begins
      </div>

      {/* Side Annotation - right */}
      <div
        style={{
          position: 'absolute',
          right: '30px',
          top: '50%',
          transform: 'translateY(-50%) rotate(90deg)',
          transformOrigin: 'center center',
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          color: 'var(--editorial-ink-muted)',
          opacity: 0.2,
          letterSpacing: '0.1em'
        }}
        className="hidden xl:block"
      >
        one step at a time
      </div>
    </section>
  )
}

HeroSection.propTypes = {
  className: PropTypes.string
}

export default HeroSection
