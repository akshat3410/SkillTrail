import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

// Node icons based on common topics
const NodeIcon = ({ type }) => {
  const icons = {
    default: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    git: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M18 9v1a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V9" />
        <path d="M12 12v3" />
      </svg>
    ),
    code: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    folder: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    save: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
      </svg>
    ),
    branch: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="3" x2="6" y2="15" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="6" cy="18" r="3" />
        <path d="M18 9a9 9 0 0 1-9 9" />
      </svg>
    ),
    merge: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="18" cy="18" r="3" />
        <circle cx="6" cy="6" r="3" />
        <path d="M6 21V9a9 9 0 0 0 9 9" />
      </svg>
    ),
    cloud: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />
      </svg>
    ),
    users: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    check: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    )
  }

  return icons[type] || icons.default
}

/**
 * Individual node component positioned along the roadmap path
 * Animates in on scroll and shows completion status
 */
export function RoadmapNode({ 
  node, 
  status = 'not_started', 
  index = 0,
  containerRef 
}) {
  const nodeRef = useRef(null)
  const navigate = useNavigate()

  // Map node titles to icon types
  const getIconType = (title) => {
    const titleLower = title.toLowerCase()
    if (titleLower.includes('git')) return 'git'
    if (titleLower.includes('install')) return 'code'
    if (titleLower.includes('repository') || titleLower.includes('repo')) return 'folder'
    if (titleLower.includes('commit') || titleLower.includes('staging')) return 'save'
    if (titleLower.includes('branch')) return 'branch'
    if (titleLower.includes('merge')) return 'merge'
    if (titleLower.includes('remote') || titleLower.includes('push') || titleLower.includes('pull')) return 'cloud'
    if (titleLower.includes('collaborat') || titleLower.includes('team') || titleLower.includes('pr')) return 'users'
    if (status === 'completed') return 'check'
    return 'default'
  }

  useEffect(() => {
    const nodeElement = nodeRef.current
    const container = containerRef?.current
    
    if (!nodeElement || !container) return

    // Set initial state: hidden and offset
    gsap.set(nodeElement, {
      opacity: 0,
      y: 30,
      scale: 0.8
    })

    // Create scroll-triggered animation for node appearance
    const animation = gsap.to(nodeElement, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: nodeElement,
        start: 'top 80%',          // Start when node top is 80% down viewport
        end: 'top 50%',
        toggleActions: 'play none none reverse',  // Play on enter, reverse on leave
        // markers: true,           // Uncomment for debugging
      }
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [containerRef, index])

  const handleClick = () => {
    navigate(`/topic/${node.id}`)
  }

  // Calculate position from SVG coordinates
  // These are relative to the container width
  const style = {
    left: `calc(50% + ${node.svg_x - 300}px)`,  // Center offset
    top: `${node.svg_y}px`
  }

  return (
    <div
      ref={nodeRef}
      className={`roadmap-node ${status.replace('_', '-')}`}
      style={style}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
      aria-label={`${node.title} - ${status.replace('_', ' ')}`}
    >
      <div className="roadmap-node-icon">
        <NodeIcon type={getIconType(node.title)} />
      </div>
      <span className="roadmap-node-label">{node.title}</span>
    </div>
  )
}

RoadmapNode.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    svg_x: PropTypes.number.isRequired,
    svg_y: PropTypes.number.isRequired
  }).isRequired,
  status: PropTypes.oneOf(['not_started', 'in_progress', 'completed']),
  index: PropTypes.number,
  containerRef: PropTypes.object.isRequired
}

export default RoadmapNode
