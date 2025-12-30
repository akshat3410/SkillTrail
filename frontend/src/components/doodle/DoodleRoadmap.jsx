import { useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import rough from 'roughjs'

gsap.registerPlugin(ScrollTrigger)

// Hand-drawn doodle-style icons
// Minimal, sketch-like, monoline with slightly rough strokes
const NodeIcons = {
  // Git version control - branching lines
  git: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3c0.5 0.2 0.8 0.8 0.5 1.5L6 18" />
      <circle cx="6" cy="20" r="2" />
      <path d="M6 8c2 0 4 1 6 4c2 3 5 4 8 4" />
      <circle cx="20" cy="16" r="2" />
    </svg>
  ),
  
  // Code/Terminal - angle brackets
  code: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 6L3 12l5 6" />
      <path d="M16 6l5 6l-5 6" />
      <path d="M14 4l-4 16" />
    </svg>
  ),
  
  // Folder/Repository - simple folder shape
  folder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6c0-1 0.5-2 2-2h4l2 2h8c1.5 0 2 1 2 2v10c0 1-0.5 2-2 2H5c-1.5 0-2-1-2-2V6z" />
    </svg>
  ),
  
  // Save/Commit - floppy disk outline
  save: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3h11l5 5v11c0 1-1 2-2 2H5c-1 0-2-1-2-2V5c0-1 1-2 2-2z" />
      <path d="M7 3v5h8V3" />
      <path d="M7 14h10v7H7v-7z" />
    </svg>
  ),
  
  // Branch - forking path
  branch: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3v14" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M18 7c0 4-3 6-6 8c-3 2-6 2-6 2" />
    </svg>
  ),
  
  // Merge - converging lines
  merge: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="4" r="2" />
      <circle cx="18" cy="20" r="2" />
      <path d="M6 6v6c0 4 4 6 12 12" />
      <path d="M18 4v4c0 3-2 5-6 8" />
      <circle cx="18" cy="4" r="2" />
    </svg>
  ),
  
  // Cloud/Remote - simple cloud shape
  cloud: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6.5 19c-2.5 0-4-2-4-4c0-2 1.5-3.5 3.5-4c0.5-3 3-5 6-5c3.5 0 6 2.5 6 6c2 0.5 3 2 3 4c0 2-1.5 3-3.5 3h-11z" />
      <path d="M12 13v4" />
      <path d="M10 15l2-2l2 2" />
    </svg>
  ),
  
  // Users/Collaboration - two simple figures
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="8" cy="6" r="3" />
      <path d="M3 20c0-3 2-5 5-5s5 2 5 5" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M14 20c0-2.5 1.5-4 3.5-4s3.5 1.5 3.5 4" />
    </svg>
  ),
  
  // Checkmark - hand-drawn check
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12.5l5 5c0.5 0.5 1 0.2 1.5-0.3L20 6" />
    </svg>
  ),
  
  // Download/Install - arrow pointing down into tray
  download: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v12" />
      <path d="M8 11l4 4l4-4" />
      <path d="M4 17v2c0 1 1 2 2 2h12c1 0 2-1 2-2v-2" />
    </svg>
  ),
  
  // Book/Learning - open book
  book: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4c2-1 4-1 8 1v16c-4-2-6-2-8-1V4z" />
      <path d="M20 4c-2-1-4-1-8 1v16c4-2 6-2 8-1V4z" />
    </svg>
  ),
  
  // Settings/Config - gear outline
  settings: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
      <path d="M4.9 4.9l2 2M17.1 17.1l2 2M4.9 19.1l2-2M17.1 6.9l2-2" />
    </svg>
  ),
  
  // Lightbulb/Idea - simple bulb
  idea: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21h6M12 3c-4 0-6 3-6 6c0 2 1 3 2 4.5c0.5 1 1 2 1 3.5h6c0-1.5 0.5-2.5 1-3.5c1-1.5 2-2.5 2-4.5c0-3-2-6-6-6z" />
    </svg>
  ),
  
  // Arrow/Flow - directional arrow
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16" />
      <path d="M14 6l6 6l-6 6" />
    </svg>
  ),
  
  // Default - simple circle with dot
  default: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

const getIconType = (title) => {
  const t = title.toLowerCase()
  if (t.includes('git') && !t.includes('getting')) return 'git'
  if (t.includes('install') || t.includes('setup') || t.includes('download')) return 'download'
  if (t.includes('repo') || t.includes('folder') || t.includes('project')) return 'folder'
  if (t.includes('commit') || t.includes('save') || t.includes('staging')) return 'save'
  if (t.includes('branch')) return 'branch'
  if (t.includes('merge') || t.includes('rebase')) return 'merge'
  if (t.includes('remote') || t.includes('push') || t.includes('pull') || t.includes('clone')) return 'cloud'
  if (t.includes('collaborat') || t.includes('pr') || t.includes('team') || t.includes('review')) return 'users'
  if (t.includes('code') || t.includes('terminal') || t.includes('command')) return 'code'
  if (t.includes('learn') || t.includes('understand') || t.includes('concept')) return 'book'
  if (t.includes('config') || t.includes('setting')) return 'settings'
  if (t.includes('idea') || t.includes('tip') || t.includes('best')) return 'idea'
  if (t.includes('next') || t.includes('flow') || t.includes('workflow')) return 'arrow'
  return 'default'
}

// Status-based styling
const statusStyles = {
  not_started: {
    bg: 'white',
    border: 'var(--doodle-stroke)',
    shadow: 'none'
  },
  in_progress: {
    bg: 'var(--doodle-yellow-light)',
    border: 'var(--doodle-yellow)',
    shadow: '0 0 0 4px var(--doodle-yellow-light)'
  },
  completed: {
    bg: 'var(--doodle-mint-light)',
    border: 'var(--doodle-mint)',
    shadow: 'none'
  }
}

/**
 * Single roadmap node - Rectangular card style
 */
function DoodleNode({ node, status = 'not_started', containerRef, isCurrentNode = false }) {
  const nodeRef = useRef(null)
  const cardRef = useRef(null)
  const navigate = useNavigate()
  
  const style = statusStyles[status]
  
  // Draw sketchy rectangle
  useEffect(() => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const svg = card.querySelector('svg.node-border')
    if (!svg) return
    
    svg.innerHTML = ''
    
    const rc = rough.svg(svg)
    const rect = rc.rectangle(2, 2, 136, 76, {
      roughness: 1.2,
      bowing: 1,
      stroke: style.border,
      strokeWidth: 2.5,
      fill: style.bg,
      fillStyle: 'solid'
    })
    
    svg.appendChild(rect)
  }, [status, style])
  
  // Scroll animation
  useEffect(() => {
    if (!nodeRef.current || !containerRef?.current) return
    
    gsap.set(nodeRef.current, { opacity: 0, y: 20 })
    
    const anim = gsap.to(nodeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.4,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [containerRef])
  
  const handleClick = () => navigate(`/topic/${node.id}`)
  
  const handleMouseEnter = () => {
    gsap.to(nodeRef.current, {
      scale: 1.05,
      y: -4,
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
  }
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
  
  return (
    <div
      ref={nodeRef}
      className="absolute"
      style={{
        left: `calc(50% + ${node.svg_x - 300}px)`,
        top: `${node.svg_y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <button
        ref={cardRef}
        className="relative cursor-pointer block focus:outline-none"
        style={{
          width: '140px',
          height: '80px',
          background: 'transparent',
          border: 'none',
          padding: 0
        }}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        aria-label={`${node.title} - ${status.replace('_', ' ')}`}
      >
        {/* Sketchy border SVG */}
        <svg 
          className="node-border absolute inset-0 pointer-events-none" 
          width="140" 
          height="80"
        />
        
        {/* Current node indicator */}
        {isCurrentNode && (
          <div 
            className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center rounded-full text-xs"
            style={{ 
              background: 'var(--doodle-blue)',
              border: '2px solid var(--doodle-stroke)',
              color: 'white'
            }}
          >
            ★
          </div>
        )}
        
        {/* Card content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-3 py-2">
          {/* Icon */}
          <div 
            className="w-7 h-7 mb-1 flex-shrink-0"
            style={{ color: 'var(--doodle-stroke)' }}
          >
            {status === 'completed' ? NodeIcons.check : NodeIcons[getIconType(node.title)]}
          </div>
          
          {/* Title */}
          <span 
            className="font-['Patrick_Hand'] text-sm text-center leading-tight line-clamp-2"
            style={{ 
              color: 'var(--doodle-text)',
              maxWidth: '120px'
            }}
          >
            {node.title}
          </span>
        </div>
        
        {/* Hover shadow overlay */}
        <div 
          className="absolute inset-0 rounded-xl pointer-events-none transition-shadow duration-200"
          style={{ 
            boxShadow: status === 'in_progress' ? style.shadow : 'none'
          }}
        />
      </button>
    </div>
  )
}

/**
 * Doodle-style roadmap with hand-drawn path
 */
export function DoodleRoadmap({ 
  nodes = [], 
  progress = {}, 
  title = '', 
  description = '' 
}) {
  const containerRef = useRef(null)
  const pathSvgRef = useRef(null)
  const pathRef = useRef(null)
  
  const sortedNodes = useMemo(() => 
    [...nodes].sort((a, b) => a.order_index - b.order_index), 
    [nodes]
  )
  
  // Find current node (first in_progress or first not_started)
  const currentNodeId = useMemo(() => {
    const inProgress = sortedNodes.find(n => progress[n.id] === 'in_progress')
    if (inProgress) return inProgress.id
    
    const notStarted = sortedNodes.find(n => !progress[n.id] || progress[n.id] === 'not_started')
    return notStarted?.id || null
  }, [sortedNodes, progress])
  
  const containerHeight = useMemo(() => {
    if (sortedNodes.length === 0) return 800
    return Math.max(...sortedNodes.map(n => n.svg_y)) + 200
  }, [sortedNodes])
  
  // Generate hand-drawn path
  const pathData = useMemo(() => {
    if (sortedNodes.length < 2) return ''
    
    let d = `M ${sortedNodes[0].svg_x} ${sortedNodes[0].svg_y}`
    
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const curr = sortedNodes[i]
      const next = sortedNodes[i + 1]
      const midX = (curr.svg_x + next.svg_x) / 2
      const midY = (curr.svg_y + next.svg_y) / 2
      const offset = (i % 2 === 0 ? 1 : -1) * 50
      
      d += ` Q ${midX + offset} ${midY} ${next.svg_x} ${next.svg_y}`
    }
    
    return d
  }, [sortedNodes])
  
  // Path drawing animation
  useEffect(() => {
    if (!pathRef.current || !containerRef.current) return
    
    const path = pathRef.current
    const length = path.getTotalLength()
    
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    
    const anim = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [pathData])
  
  useEffect(() => {
    ScrollTrigger.refresh()
  }, [nodes])
  
  if (sortedNodes.length === 0) {
    return (
      <div className="container py-12 text-center">
        <div className="doodle-spinner mx-auto mb-4" />
        <p className="font-['Patrick_Hand'] text-xl" style={{ color: 'var(--doodle-text-muted)' }}>
          Loading roadmap...
        </p>
      </div>
    )
  }
  
  // Count completed nodes
  const completedCount = sortedNodes.filter(n => progress[n.id] === 'completed').length
  
  return (
    <div className="py-12">
      {/* Header */}
      {(title || description) && (
        <div className="container text-center mb-12">
          {title && (
            <h1 className="font-['Caveat'] text-5xl md:text-6xl font-bold mb-4" style={{ color: 'var(--doodle-text)' }}>
              {title}
            </h1>
          )}
          {description && (
            <p className="font-['Patrick_Hand'] text-xl" style={{ color: 'var(--doodle-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
              {description}
            </p>
          )}
          
          {/* Progress indicator */}
          <div className="mt-6 flex items-center justify-center gap-4">
            <div 
              className="px-4 py-2 rounded-full font-['Patrick_Hand'] text-base"
              style={{ 
                background: 'var(--doodle-mint-light)',
                border: '2px solid var(--doodle-stroke)'
              }}
            >
              ✅ {completedCount} / {sortedNodes.length} completed
            </div>
          </div>
        </div>
      )}
      
      {/* Roadmap */}
      <div 
        ref={containerRef}
        className="relative w-full"
        style={{ height: `${containerHeight}px` }}
      >
        {/* SVG Path */}
        <svg
          ref={pathSvgRef}
          className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: '600px', height: '100%' }}
          viewBox={`0 0 600 ${containerHeight}`}
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Dashed background path */}
          <path
            d={pathData}
            fill="none"
            stroke="var(--doodle-stroke)"
            strokeWidth="3"
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity="0.25"
          />
          {/* Animated fill path */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="var(--doodle-mint)"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Nodes */}
        {sortedNodes.map(node => (
          <DoodleNode
            key={node.id}
            node={node}
            status={progress[node.id] || 'not_started'}
            containerRef={containerRef}
            isCurrentNode={node.id === currentNodeId}
          />
        ))}
      </div>
      
      {/* End marker */}
      <div className="container text-center mt-12">
        <div 
          className="inline-flex items-center gap-2 px-5 py-2 font-['Patrick_Hand'] text-lg"
          style={{ 
            background: 'var(--doodle-mint-light)',
            border: '2.5px solid var(--doodle-stroke)',
            borderRadius: '20px'
          }}
        >
          <span>🎯</span>
          <span>{sortedNodes.length} topics to master</span>
        </div>
      </div>
    </div>
  )
}

DoodleRoadmap.propTypes = {
  nodes: PropTypes.array.isRequired,
  progress: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string
}

export default DoodleRoadmap
