import { useRef, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * StoryNode - Interactive roadmap node with organic animation
 * Draws in when scrolled to, expands on hover/click
 */
export function StoryNode({
  title,
  description,
  number,
  isActive = false,
  delay = 0,
  onClick,
  className = '',
  style = {}
}) {
  const nodeRef = useRef(null)
  const borderRef = useRef(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!nodeRef.current) return

    gsap.set(nodeRef.current, { opacity: 0, scale: 0.8, y: 20 })

    const anim = gsap.to(nodeRef.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.5,
      delay,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse',
        onEnter: () => setIsVisible(true),
        onLeaveBack: () => setIsVisible(false)
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [delay])

  // Organic wobble animation when visible
  useEffect(() => {
    if (!nodeRef.current || !isVisible) return

    const wobble = gsap.to(nodeRef.current, {
      rotation: gsap.utils.random(-1, 1),
      duration: 2,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    })

    return () => wobble.kill()
  }, [isVisible])

  const handleMouseEnter = () => {
    gsap.to(nodeRef.current, {
      scale: 1.05,
      y: -5,
      duration: 0.2,
      ease: 'power2.out'
    })
  }

  const handleMouseLeave = () => {
    gsap.to(nodeRef.current, {
      scale: 1,
      y: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
    if (!isActive) setIsExpanded(false)
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded)
    if (onClick) onClick()
  }

  return (
    <div
      ref={nodeRef}
      className={`story-node ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      style={{
        position: 'relative',
        cursor: 'pointer',
        ...style
      }}
    >
      {/* Node container */}
      <div
        style={{
          padding: isExpanded ? '1.5rem 2rem' : '1rem 1.5rem',
          background: isActive ? 'var(--editorial-bg-alt)' : 'var(--editorial-bg)',
          border: `1.5px solid ${isActive ? 'var(--editorial-ink)' : 'var(--editorial-grid)'}`,
          transition: 'all 0.3s ease',
          minWidth: isExpanded ? '280px' : '180px'
        }}
      >
        {/* Number badge */}
        <div
          style={{
            position: 'absolute',
            top: '-12px',
            left: '20px',
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            color: 'var(--editorial-ink-muted)',
            background: 'var(--editorial-bg)',
            padding: '0 0.5rem'
          }}
        >
          {String(number).padStart(2, '0')}
        </div>

        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontWeight: 500,
            color: 'var(--editorial-ink)',
            margin: 0,
            marginTop: '0.5rem'
          }}
        >
          {title}
        </h3>

        {/* Expanded content */}
        {(isExpanded || isActive) && description && (
          <p
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.9rem',
              color: 'var(--editorial-ink-light)',
              margin: 0,
              marginTop: '0.75rem',
              lineHeight: 1.6,
              opacity: isExpanded ? 1 : 0,
              transform: isExpanded ? 'translateY(0)' : 'translateY(-10px)',
              transition: 'all 0.3s ease'
            }}
          >
            {description}
          </p>
        )}

        {/* Expand indicator */}
        {!isExpanded && description && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              color: 'var(--editorial-ink-muted)',
              marginTop: '0.5rem',
              display: 'block'
            }}
          >
            Click to expand
          </span>
        )}
      </div>
    </div>
  )
}

StoryNode.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  number: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  delay: PropTypes.number,
  onClick: PropTypes.func,
  className: PropTypes.string,
  style: PropTypes.object
}

/**
 * StoryPath - SVG path connecting story nodes
 * Draws on scroll with hand-drawn aesthetic
 */
export function StoryPath({
  nodes = [], // Array of {x, y} positions
  progress = 0, // 0 to 1
  className = '',
  style = {}
}) {
  const pathRef = useRef(null)
  const [pathData, setPathData] = useState('')
  const [pathLength, setPathLength] = useState(0)

  // Generate curved path through nodes
  useEffect(() => {
    if (nodes.length < 2) return

    let d = `M ${nodes[0].x} ${nodes[0].y}`

    for (let i = 0; i < nodes.length - 1; i++) {
      const curr = nodes[i]
      const next = nodes[i + 1]
      const midX = (curr.x + next.x) / 2
      const midY = (curr.y + next.y) / 2
      const offset = (i % 2 === 0 ? 1 : -1) * 30

      d += ` Q ${midX + offset} ${midY} ${next.x} ${next.y}`
    }

    setPathData(d)
  }, [nodes])

  useEffect(() => {
    if (!pathRef.current || !pathData) return
    const length = pathRef.current.getTotalLength()
    setPathLength(length)
  }, [pathData])

  const dashOffset = pathLength * (1 - progress)

  return (
    <svg
      className={`story-path ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'visible',
        ...style
      }}
    >
      {/* Background dashed guide */}
      <path
        d={pathData}
        fill="none"
        stroke="var(--editorial-grid)"
        strokeWidth="1.5"
        strokeDasharray="6 6"
        opacity="0.5"
      />

      {/* Animated solid path */}
      <path
        ref={pathRef}
        d={pathData}
        fill="none"
        stroke="var(--editorial-ink-muted)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray={pathLength}
        strokeDashoffset={dashOffset}
        style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
      />
    </svg>
  )
}

StoryPath.propTypes = {
  nodes: PropTypes.arrayOf(PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number
  })),
  progress: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
}

export default StoryNode
