import { useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import RoadmapPath from './RoadmapPath'
import RoadmapNode from './RoadmapNode'

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger)

/**
 * Main roadmap container component
 * Orchestrates the path animation and node rendering
 */
export function Roadmap({ 
  nodes = [], 
  progress = {}, 
  title = '', 
  description = '' 
}) {
  const containerRef = useRef(null)

  // Sort nodes by order_index
  const sortedNodes = useMemo(() => {
    return [...nodes].sort((a, b) => a.order_index - b.order_index)
  }, [nodes])

  // Calculate container height based on node positions
  const containerHeight = useMemo(() => {
    if (sortedNodes.length === 0) return 800
    const maxY = Math.max(...sortedNodes.map(n => n.svg_y))
    return maxY + 200  // Add padding at bottom
  }, [sortedNodes])

  // Refresh ScrollTrigger when nodes change
  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh()
    }, 100)

    return () => clearTimeout(timeout)
  }, [nodes])

  if (sortedNodes.length === 0) {
    return (
      <div className="container py-12 text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-[var(--color-text-muted)]">Loading roadmap...</p>
      </div>
    )
  }

  return (
    <div className="py-12">
      {/* Roadmap Header */}
      {(title || description) && (
        <div className="container text-center mb-12">
          {title && (
            <h1 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {/* Roadmap Container */}
      <div 
        ref={containerRef}
        className="roadmap-container"
        style={{ height: `${containerHeight}px` }}
      >
        {/* SVG Path */}
        <RoadmapPath 
          nodes={sortedNodes} 
          containerRef={containerRef} 
        />

        {/* Nodes */}
        {sortedNodes.map((node, index) => (
          <RoadmapNode
            key={node.id}
            node={node}
            status={progress[node.id] || 'not_started'}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>

      {/* End marker */}
      <div className="container text-center mt-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent-green)]" />
          <span className="text-sm text-[var(--color-text-secondary)]">
            {sortedNodes.length} topics to master
          </span>
        </div>
      </div>
    </div>
  )
}

Roadmap.propTypes = {
  nodes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      order_index: PropTypes.number.isRequired,
      svg_x: PropTypes.number.isRequired,
      svg_y: PropTypes.number.isRequired
    })
  ).isRequired,
  progress: PropTypes.object,
  title: PropTypes.string,
  description: PropTypes.string
}

export default Roadmap
