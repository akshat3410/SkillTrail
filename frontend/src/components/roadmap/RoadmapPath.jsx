import { useEffect, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Generates a curved SVG path through the given points
 * Uses quadratic Bezier curves for smooth transitions
 */
function generateCurvedPath(nodes) {
  if (!nodes || nodes.length === 0) return ''
  if (nodes.length === 1) return `M ${nodes[0].svg_x} ${nodes[0].svg_y}`

  let path = `M ${nodes[0].svg_x} ${nodes[0].svg_y}`

  for (let i = 0; i < nodes.length - 1; i++) {
    const current = nodes[i]
    const next = nodes[i + 1]
    
    // Calculate control point for smooth curve
    const midX = (current.svg_x + next.svg_x) / 2
    const midY = (current.svg_y + next.svg_y) / 2
    
    // Create S-curve effect by alternating control point offset
    const offset = (i % 2 === 0 ? 1 : -1) * 60
    const controlX = midX + offset
    
    path += ` Q ${controlX} ${midY} ${next.svg_x} ${next.svg_y}`
  }

  return path
}

/**
 * SVG path component with scroll-triggered drawing animation
 * Uses GSAP ScrollTrigger to animate stroke-dashoffset as user scrolls
 */
export function RoadmapPath({ nodes, containerRef }) {
  const pathRef = useRef(null)
  const backgroundPathRef = useRef(null)
  const svgRef = useRef(null)

  // Generate path data from node positions
  const pathData = useMemo(() => generateCurvedPath(nodes), [nodes])

  // Calculate SVG viewBox based on node positions
  const viewBox = useMemo(() => {
    if (!nodes || nodes.length === 0) return '0 0 600 1200'
    
    const padding = 100
    const minX = Math.min(...nodes.map(n => n.svg_x)) - padding
    const maxX = Math.max(...nodes.map(n => n.svg_x)) + padding
    const minY = Math.min(...nodes.map(n => n.svg_y)) - padding
    const maxY = Math.max(...nodes.map(n => n.svg_y)) + padding
    
    return `${minX} ${minY} ${maxX - minX} ${maxY - minY}`
  }, [nodes])

  useEffect(() => {
    const path = pathRef.current
    const container = containerRef?.current
    
    if (!path || !container || !nodes || nodes.length === 0) return

    // Get total path length for stroke animation
    const length = path.getTotalLength()

    // Set initial state: path is completely hidden
    gsap.set(path, {
      strokeDasharray: length,
      strokeDashoffset: length
    })

    // Create scroll-triggered animation
    // Path draws progressively as user scrolls down
    const animation = gsap.to(path, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top center',     // Start when container top hits viewport center
        end: 'bottom center',    // End when container bottom hits viewport center
        scrub: 0.5,              // Smooth scrubbing with 0.5s lag
        // markers: true,        // Uncomment for debugging
      }
    })

    return () => {
      animation.scrollTrigger?.kill()
      animation.kill()
    }
  }, [nodes, containerRef])

  if (!nodes || nodes.length === 0) return null

  return (
    <svg
      ref={svgRef}
      className="roadmap-svg"
      viewBox={viewBox}
      preserveAspectRatio="xMidYMin meet"
    >
      {/* Gradient definition for active path */}
      <defs>
        <linearGradient id="pathGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="var(--color-path-active-start)" />
          <stop offset="100%" stopColor="var(--color-path-active-end)" />
        </linearGradient>
        
        {/* Glow filter for completed nodes */}
        <filter id="glowFilter" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Inactive background path (always visible) */}
      <path
        ref={backgroundPathRef}
        d={pathData}
        className="roadmap-path roadmap-path-inactive"
      />

      {/* Active animated path (draws on scroll) */}
      <path
        ref={pathRef}
        d={pathData}
        className="roadmap-path roadmap-path-active"
      />
    </svg>
  )
}

RoadmapPath.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      svg_x: PropTypes.number.isRequired,
      svg_y: PropTypes.number.isRequired
    })
  ).isRequired,
  containerRef: PropTypes.object.isRequired
}

export default RoadmapPath
