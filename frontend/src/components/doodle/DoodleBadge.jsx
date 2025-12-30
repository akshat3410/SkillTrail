import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs'

/**
 * Doodle-style badge/tag with sketchy background
 */
export function DoodleBadge({ 
  children, 
  variant = 'yellow',
  className = ''
}) {
  const badgeRef = useRef(null)
  const svgRef = useRef(null)
  
  const colorMap = {
    yellow: 'var(--doodle-yellow)',
    blue: 'var(--doodle-blue)',
    pink: 'var(--doodle-pink)',
    mint: 'var(--doodle-mint)',
    purple: 'var(--doodle-purple)',
    orange: 'var(--doodle-orange)'
  }
  
  useEffect(() => {
    if (!badgeRef.current || !svgRef.current) return
    
    const drawBadge = () => {
      const badge = badgeRef.current
      const svg = svgRef.current
      const { width, height } = badge.getBoundingClientRect()
      
      svg.innerHTML = ''
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      
      const rc = rough.svg(svg)
      const node = rc.rectangle(2, 2, width - 4, height - 4, {
        roughness: 1.5,
        bowing: 2,
        stroke: 'var(--doodle-stroke)',
        strokeWidth: 2,
        fill: colorMap[variant],
        fillStyle: 'solid'
      })
      
      svg.appendChild(node)
    }
    
    drawBadge()
    
    const observer = new ResizeObserver(drawBadge)
    observer.observe(badgeRef.current)
    
    return () => observer.disconnect()
  }, [variant])
  
  return (
    <span
      ref={badgeRef}
      className={`relative inline-flex items-center px-3 py-1 font-['Patrick_Hand'] text-base ${className}`}
      style={{ color: 'var(--doodle-text)' }}
    >
      <svg 
        ref={svgRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <span className="relative z-10">{children}</span>
    </span>
  )
}

DoodleBadge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'mint', 'purple', 'orange']),
  className: PropTypes.string
}

export default DoodleBadge
