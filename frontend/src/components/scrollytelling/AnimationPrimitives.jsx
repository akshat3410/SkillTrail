import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * DrawPath - SVG path that draws itself on scroll
 * Creates hand-drawn effect as user scrolls
 */
export function DrawPath({
  d,
  stroke = 'var(--editorial-ink)',
  strokeWidth = 2.5,
  duration = 1,
  delay = 0,
  scrub = true,
  triggerStart = 'top 80%',
  triggerEnd = 'bottom 20%',
  className = '',
  style = {}
}) {
  const pathRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!pathRef.current) return

    const path = pathRef.current
    const length = path.getTotalLength()

    // Set initial state - path hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    let animation

    if (scrub) {
      // Scroll-linked animation
      animation = gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          end: triggerEnd,
          scrub: 0.5
        }
      })
    } else {
      // One-time animation on scroll
      animation = gsap.to(path, {
        strokeDashoffset: 0,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: 'play none none reverse'
        }
      })
    }

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [d, duration, delay, scrub, triggerStart, triggerEnd])

  return (
    <svg
      ref={containerRef}
      className={`draw-path ${className}`}
      style={{
        overflow: 'visible',
        ...style
      }}
    >
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

DrawPath.propTypes = {
  d: PropTypes.string.isRequired,
  stroke: PropTypes.string,
  strokeWidth: PropTypes.number,
  duration: PropTypes.number,
  delay: PropTypes.number,
  scrub: PropTypes.bool,
  triggerStart: PropTypes.string,
  triggerEnd: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * TextReveal - Text that reveals on scroll
 * Word-by-word or character reveal effect
 */
export function TextReveal({
  children,
  as: Tag = 'p',
  mode = 'word', // 'word' | 'line' | 'fade'
  stagger = 0.05,
  duration = 0.4,
  triggerStart = 'top 85%',
  className = '',
  style = {}
}) {
  const containerRef = useRef(null)
  const textRef = useRef(null)

  useEffect(() => {
    if (!textRef.current) return

    const text = textRef.current
    let elements = []
    let animations = []

    if (mode === 'word') {
      // Split into words
      const words = text.textContent.split(' ')
      text.innerHTML = words
        .map(word => `<span class="reveal-word" style="display: inline-block; opacity: 0;">${word}</span>`)
        .join(' ')
      elements = text.querySelectorAll('.reveal-word')
    } else if (mode === 'line') {
      // Treat whole element as one
      gsap.set(text, { opacity: 0, y: 20 })
      elements = [text]
    } else {
      // Simple fade
      gsap.set(text, { opacity: 0 })
      elements = [text]
    }

    elements.forEach((el, i) => {
      const anim = gsap.to(el, {
        opacity: 1,
        y: 0,
        duration,
        delay: i * stagger,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: 'play none none reverse'
        }
      })
      animations.push(anim)
    })

    return () => {
      animations.forEach(anim => {
        anim.scrollTrigger?.kill()
        anim.kill()
      })
    }
  }, [children, mode, stagger, duration, triggerStart])

  return (
    <div ref={containerRef} className={className} style={style}>
      <Tag ref={textRef}>{children}</Tag>
    </div>
  )
}

TextReveal.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.string,
  mode: PropTypes.oneOf(['word', 'line', 'fade']),
  stagger: PropTypes.number,
  duration: PropTypes.number,
  triggerStart: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * ParallaxLayer - Background element with parallax movement
 */
export function ParallaxLayer({
  children,
  speed = 0.5, // 0 = fixed, 1 = normal scroll, >1 = faster
  direction = 'up', // 'up' | 'down'
  className = '',
  style = {}
}) {
  const layerRef = useRef(null)

  useEffect(() => {
    if (!layerRef.current) return

    const yMovement = direction === 'up' ? -100 * speed : 100 * speed

    const anim = gsap.to(layerRef.current, {
      y: yMovement,
      ease: 'none',
      scrollTrigger: {
        trigger: layerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [speed, direction])

  return (
    <div
      ref={layerRef}
      className={`parallax-layer ${className}`}
      style={{
        willChange: 'transform',
        ...style
      }}
    >
      {children}
    </div>
  )
}

ParallaxLayer.propTypes = {
  children: PropTypes.node,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down']),
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * ScrollSection - Pinned section that plays animation while scrolling
 */
export function ScrollSection({
  children,
  height = '200vh', // How long to pin
  onProgress,
  className = '',
  style = {}
}) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${height}`,
      pin: contentRef.current,
      scrub: true,
      onUpdate: (self) => {
        if (onProgress) onProgress(self.progress)
      }
    })

    return () => trigger.kill()
  }, [height, onProgress])

  return (
    <div
      ref={sectionRef}
      className={`scroll-section ${className}`}
      style={{
        minHeight: height,
        ...style
      }}
    >
      <div ref={contentRef}>
        {children}
      </div>
    </div>
  )
}

ScrollSection.propTypes = {
  children: PropTypes.node.isRequired,
  height: PropTypes.string,
  onProgress: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * FadeSection - Simple fade-in section on scroll
 */
export function FadeSection({
  children,
  delay = 0,
  duration = 0.6,
  y = 30,
  triggerStart = 'top 85%',
  className = '',
  style = {}
}) {
  const sectionRef = useRef(null)

  useEffect(() => {
    if (!sectionRef.current) return

    gsap.set(sectionRef.current, { opacity: 0, y })

    const anim = gsap.to(sectionRef.current, {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: triggerStart,
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay, duration, y, triggerStart])

  return (
    <div ref={sectionRef} className={className} style={style}>
      {children}
    </div>
  )
}

FadeSection.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  y: PropTypes.number,
  triggerStart: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object
}

export default DrawPath
