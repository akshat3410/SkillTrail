import { useRef, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Global scroll-triggered pencil path that guides users through the learning journey
 * Appears on all pages, animates as user scrolls
 */
export function GlobalScrollPath({ variant = 'left' }) {
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  
  useEffect(() => {
    if (!pathRef.current) return
    
    const path = pathRef.current
    const length = path.getTotalLength()
    
    // Set initial state - path hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })
    
    // Animate on scroll - sync with full page scroll
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
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
  
  // Long curvy hand-drawn path spanning full page height
  const leftPath = `
    M 40 0
    C 55 60, 25 120, 45 200
    S 60 280, 35 380
    C 20 450, 55 540, 40 640
    S 25 750, 50 860
    C 65 950, 30 1060, 45 1180
    S 55 1300, 35 1430
    C 20 1540, 50 1660, 40 1800
    S 30 1920, 55 2060
    C 65 2180, 35 2300, 45 2450
    S 50 2600, 35 2780
    C 25 2900, 55 3040, 40 3200
    S 30 3380, 50 3560
    C 60 3720, 35 3880, 45 4080
    S 55 4280, 40 4500
  `
  
  const rightPath = `
    M 40 0
    C 25 60, 55 120, 35 200
    S 20 280, 45 380
    C 60 450, 25 540, 40 640
    S 55 750, 30 860
    C 15 950, 50 1060, 35 1180
    S 25 1300, 45 1430
    C 60 1540, 30 1660, 40 1800
    S 50 1920, 25 2060
    C 15 2180, 45 2300, 35 2450
    S 30 2600, 45 2780
    C 55 2900, 25 3040, 40 3200
    S 50 3380, 30 3560
    C 20 3720, 45 3880, 35 4080
    S 25 4280, 40 4500
  `
  
  const pathData = variant === 'left' ? leftPath : rightPath
  const position = variant === 'left' ? { left: '30px' } : { right: '30px' }
  
  return (
    <svg
      ref={svgRef}
      className="global-scroll-path pointer-events-none"
      viewBox="0 0 80 4500"
      preserveAspectRatio="xMidYMin slice"
      style={{
        position: 'fixed',
        top: 0,
        width: '60px',
        height: '100vh',
        zIndex: 1,
        ...position
      }}
    >
      {/* Background guide path - dashed */}
      <path
        d={pathData}
        fill="none"
        stroke="var(--doodle-stroke)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="8 12"
        opacity="0.15"
      />
      {/* Animated drawing path - solid pencil line */}
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="var(--doodle-stroke)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  )
}

GlobalScrollPath.propTypes = {
  variant: PropTypes.oneOf(['left', 'right'])
}

/**
 * ScrollReveal - Reveals content with fade + upward motion as user scrolls
 * Text reveal synchronized with scroll position
 */
export function ScrollReveal({ 
  children, 
  delay = 0,
  duration = 0.6,
  y = 30,
  className = '' 
}) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    gsap.set(ref.current, { 
      opacity: 0, 
      y: y 
    })
    
    const anim = gsap.to(ref.current, {
      opacity: 1,
      y: 0,
      duration: duration,
      delay: delay,
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
  }, [delay, duration, y])
  
  return (
    <div ref={ref} className={`scroll-reveal ${className}`}>
      {children}
    </div>
  )
}

ScrollReveal.propTypes = {
  children: PropTypes.node.isRequired,
  delay: PropTypes.number,
  duration: PropTypes.number,
  y: PropTypes.number,
  className: PropTypes.string
}

/**
 * StaggerReveal - Reveals children one by one with staggered timing
 */
export function StaggerReveal({ 
  children, 
  stagger = 0.1,
  className = '' 
}) {
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const items = containerRef.current.children
    
    gsap.set(items, { 
      opacity: 0, 
      y: 25 
    })
    
    const anim = gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [stagger])
  
  return (
    <div ref={containerRef} className={`stagger-reveal ${className}`}>
      {children}
    </div>
  )
}

StaggerReveal.propTypes = {
  children: PropTypes.node.isRequired,
  stagger: PropTypes.number,
  className: PropTypes.string
}

/**
 * ParallaxElement - Subtle parallax movement on scroll
 * Movement is slow and calm, enhancing depth without distraction
 */
export function ParallaxElement({ 
  children, 
  speed = 0.2,
  direction = 'up',
  className = '' 
}) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    const yMultiplier = direction === 'up' ? -1 : 1
    
    const anim = gsap.to(ref.current, {
      y: () => window.innerHeight * speed * yMultiplier,
      ease: 'none',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 0.5
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [speed, direction])
  
  return (
    <div ref={ref} className={`parallax-element ${className}`}>
      {children}
    </div>
  )
}

ParallaxElement.propTypes = {
  children: PropTypes.node.isRequired,
  speed: PropTypes.number,
  direction: PropTypes.oneOf(['up', 'down']),
  className: PropTypes.string
}

/**
 * TextReveal - Character-by-character or word-by-word reveal
 */
export function TextReveal({ 
  text, 
  as: Component = 'span',
  type = 'words',
  className = '',
  style = {}
}) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    const element = ref.current
    const originalText = text
    
    // Split text into spans
    if (type === 'chars') {
      element.innerHTML = originalText
        .split('')
        .map(char => char === ' ' ? ' ' : `<span class="char">${char}</span>`)
        .join('')
    } else {
      element.innerHTML = originalText
        .split(' ')
        .map(word => `<span class="word">${word}</span>`)
        .join(' ')
    }
    
    const targets = element.querySelectorAll(type === 'chars' ? '.char' : '.word')
    
    gsap.set(targets, { 
      opacity: 0, 
      y: 10 
    })
    
    const anim = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: type === 'chars' ? 0.02 : 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [text, type])
  
  return (
    <Component 
      ref={ref} 
      className={`text-reveal ${className}`}
      style={{ display: 'inline-block', ...style }}
    >
      {text}
    </Component>
  )
}

TextReveal.propTypes = {
  text: PropTypes.string.isRequired,
  as: PropTypes.elementType,
  type: PropTypes.oneOf(['words', 'chars']),
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * useScrollProgress - Hook to track scroll progress (0 to 1)
 */
export function useScrollProgress() {
  const progress = useRef(0)
  
  useEffect(() => {
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight
      progress.current = window.scrollY / scrollHeight
    }
    
    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()
    
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])
  
  return progress
}

/**
 * AnimatedSection - Section wrapper with entrance animation
 */
export function AnimatedSection({ 
  children, 
  className = '',
  id,
  style = {}
}) {
  const ref = useRef(null)
  
  useEffect(() => {
    if (!ref.current) return
    
    gsap.set(ref.current, { 
      opacity: 0.3
    })
    
    const anim = gsap.to(ref.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power1.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 75%',
        end: 'top 25%',
        scrub: 0.3
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])
  
  return (
    <section ref={ref} id={id} className={className} style={style}>
      {children}
    </section>
  )
}

AnimatedSection.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object
}

export default GlobalScrollPath
