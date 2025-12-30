import { useRef, useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Editorial Roadmap Node Component
 * Minimal, architectural style node cards
 */
function EditorialNode({ node, status = 'not_started', isCurrentNode = false, index }) {
  const nodeRef = useRef(null)
  const navigate = useNavigate()
  
  const statusStyles = {
    not_started: {
      borderColor: 'var(--editorial-grid)',
      bg: 'transparent'
    },
    in_progress: {
      borderColor: 'var(--editorial-ink)',
      bg: 'var(--editorial-bg-alt)'
    },
    completed: {
      borderColor: 'var(--editorial-ink-muted)',
      bg: 'var(--editorial-bg-alt)'
    }
  }
  
  const style = statusStyles[status]
  
  // Scroll animation
  useEffect(() => {
    if (!nodeRef.current) return
    
    gsap.set(nodeRef.current, { opacity: 0, y: 20 })
    
    const anim = gsap.to(nodeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      delay: index * 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: nodeRef.current,
        start: 'top 90%',
        toggleActions: 'play none none reverse'
      }
    })
    
    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [index])
  
  const handleClick = () => navigate(`/topic/${node.id}`)
  
  const handleMouseEnter = () => {
    gsap.to(nodeRef.current, {
      y: -3,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(nodeRef.current, {
      y: 0,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  return (
    <div
      ref={nodeRef}
      style={{
        position: 'absolute',
        left: `${node.svg_x}px`,
        top: `${node.svg_y}px`,
        transform: 'translate(-50%, -50%)'
      }}
    >
      <button
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.75rem',
          padding: '1.25rem 1.5rem',
          width: '160px',
          background: style.bg,
          border: `1px solid ${style.borderColor}`,
          cursor: 'pointer',
          transition: 'border-color 0.2s, background-color 0.2s'
        }}
      >
        {/* Status indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          width: '100%'
        }}>
          <span
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: status === 'completed' 
                ? 'var(--editorial-ink)' 
                : status === 'in_progress'
                  ? 'var(--editorial-ink-light)'
                  : 'var(--editorial-grid)'
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)'
            }}
          >
            {status === 'completed' ? 'Done' : status === 'in_progress' ? 'Current' : `Step ${index + 1}`}
          </span>
        </div>
        
        {/* Title */}
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.3,
            color: 'var(--editorial-ink)',
            textAlign: 'center'
          }}
        >
          {node.title}
        </span>
        
        {/* Current node indicator */}
        {isCurrentNode && (
          <span
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.6rem',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink)',
              padding: '0.25rem 0.5rem',
              border: '1px solid var(--editorial-ink)',
              marginTop: '0.25rem'
            }}
          >
            Start Here
          </span>
        )}
      </button>
    </div>
  )
}

EditorialNode.propTypes = {
  node: PropTypes.object.isRequired,
  status: PropTypes.string,
  isCurrentNode: PropTypes.bool,
  index: PropTypes.number.isRequired
}

/**
 * Editorial Roadmap Component
 * Architectural/blueprint style roadmap visualization
 */
export function EditorialRoadmap({ 
  nodes = [], 
  progress = {}, 
  title = '', 
  description = '' 
}) {
  const containerRef = useRef(null)
  const pathRef = useRef(null)
  
  const sortedNodes = useMemo(() => 
    [...nodes].sort((a, b) => a.order_index - b.order_index), 
    [nodes]
  )
  
  // Find current node
  const currentNodeId = useMemo(() => {
    const inProgress = sortedNodes.find(n => progress[n.id] === 'in_progress')
    if (inProgress) return inProgress.id
    const notStarted = sortedNodes.find(n => !progress[n.id] || progress[n.id] === 'not_started')
    return notStarted?.id || null
  }, [sortedNodes, progress])
  
  const containerHeight = useMemo(() => {
    if (sortedNodes.length === 0) return 600
    return Math.max(...sortedNodes.map(n => n.svg_y)) + 200
  }, [sortedNodes])
  
  // Generate path
  const pathData = useMemo(() => {
    if (sortedNodes.length < 2) return ''
    
    let d = `M ${sortedNodes[0].svg_x} ${sortedNodes[0].svg_y}`
    
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const curr = sortedNodes[i]
      const next = sortedNodes[i + 1]
      const midX = (curr.svg_x + next.svg_x) / 2
      const midY = (curr.svg_y + next.svg_y) / 2
      const offset = (i % 2 === 0 ? 1 : -1) * 30
      
      d += ` Q ${midX + offset} ${midY} ${next.svg_x} ${next.svg_y}`
    }
    
    return d
  }, [sortedNodes])
  
  // Path animation
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
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.25rem',
          color: 'var(--editorial-ink-light)'
        }}>
          Loading roadmap...
        </p>
      </div>
    )
  }
  
  // Count completed
  const completedCount = sortedNodes.filter(n => progress[n.id] === 'completed').length
  
  return (
    <div style={{ padding: '2rem 0' }}>
      {/* Header */}
      {(title || description) && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '3rem',
          maxWidth: '600px',
          margin: '0 auto 3rem'
        }}>
          {title && (
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 6vw, 4rem)',
              color: 'var(--editorial-ink)',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}>
              {title}
            </h1>
          )}
          {description && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '1.25rem',
              fontStyle: 'italic',
              color: 'var(--editorial-ink-light)',
              lineHeight: 1.6
            }}>
              {description}
            </p>
          )}
          
          {/* Progress indicator */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '2rem'
          }}>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              padding: '0.5rem 1rem',
              border: '1px solid var(--editorial-grid)'
            }}>
              {completedCount} / {sortedNodes.length} Completed
            </span>
          </div>
        </div>
      )}
      
      {/* Roadmap visualization */}
      <div 
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: `${containerHeight}px`
        }}
      >
        {/* SVG Path */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            width: '600px',
            height: '100%',
            pointerEvents: 'none'
          }}
          viewBox={`0 0 600 ${containerHeight}`}
          preserveAspectRatio="xMidYMin meet"
        >
          {/* Dashed guide path */}
          <path
            d={pathData}
            fill="none"
            stroke="var(--editorial-grid)"
            strokeWidth="1.5"
            strokeDasharray="6 6"
            strokeLinecap="round"
            opacity="0.6"
          />
          {/* Animated solid path */}
          <path
            ref={pathRef}
            d={pathData}
            fill="none"
            stroke="var(--editorial-ink-muted)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        
        {/* Nodes */}
        {sortedNodes.map((node, index) => (
          <EditorialNode
            key={node.id}
            node={node}
            status={progress[node.id] || 'not_started'}
            isCurrentNode={node.id === currentNodeId}
            index={index}
          />
        ))}
      </div>
      
      {/* End marker */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '3rem' 
      }}>
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: '0.75rem',
          fontWeight: 500,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--editorial-ink-muted)',
          padding: '0.75rem 1.5rem',
          border: '1px solid var(--editorial-grid)'
        }}>
          {sortedNodes.length} Topics to Master
        </span>
      </div>
    </div>
  )
}

EditorialRoadmap.propTypes = {
  nodes: PropTypes.array.isRequired,
  progress: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string
}

export default EditorialRoadmap
