import { useRef, useEffect, useState } from 'react'
import rough from 'roughjs'

/**
 * Hook to generate a rough/sketchy rectangle path
 * Returns an SVG path string for hand-drawn effect
 */
export function useSketchyRect(width, height, options = {}) {
  const [pathData, setPathData] = useState('')
  
  useEffect(() => {
    if (!width || !height) return
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const rc = rough.svg(svg)
    
    const node = rc.rectangle(2, 2, width - 4, height - 4, {
      roughness: 1.2,
      bowing: 1.5,
      stroke: 'none',
      fill: 'currentColor',
      fillStyle: 'solid',
      ...options
    })
    
    const pathElements = node.querySelectorAll('path')
    let combinedPath = ''
    pathElements.forEach(p => {
      combinedPath += p.getAttribute('d') + ' '
    })
    
    setPathData(combinedPath.trim())
  }, [width, height, options.roughness, options.bowing])
  
  return pathData
}

/**
 * Hook to generate a rough circle path
 */
export function useSketchyCircle(diameter, options = {}) {
  const [pathData, setPathData] = useState('')
  
  useEffect(() => {
    if (!diameter) return
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const rc = rough.svg(svg)
    
    const radius = diameter / 2
    const node = rc.circle(radius, radius, diameter - 4, {
      roughness: 1,
      bowing: 1,
      stroke: 'none',
      fill: 'currentColor',
      fillStyle: 'solid',
      ...options
    })
    
    const pathElements = node.querySelectorAll('path')
    let combinedPath = ''
    pathElements.forEach(p => {
      combinedPath += p.getAttribute('d') + ' '
    })
    
    setPathData(combinedPath.trim())
  }, [diameter])
  
  return pathData
}

/**
 * Component that renders a sketchy SVG shape
 */
export function SketchyShape({ 
  type = 'rect', 
  width, 
  height, 
  className = '',
  fillColor = 'var(--doodle-yellow)',
  strokeColor = 'var(--doodle-stroke)',
  strokeWidth = 2.5,
  roughness = 1.2,
  bowing = 1.5
}) {
  const svgRef = useRef(null)
  
  useEffect(() => {
    if (!svgRef.current || !width || !height) return
    
    const svg = svgRef.current
    svg.innerHTML = '' // Clear previous content
    
    const rc = rough.svg(svg)
    let node
    
    if (type === 'rect') {
      node = rc.rectangle(2, 2, width - 4, height - 4, {
        roughness,
        bowing,
        stroke: strokeColor,
        strokeWidth,
        fill: fillColor,
        fillStyle: 'solid'
      })
    } else if (type === 'circle') {
      node = rc.circle(width / 2, height / 2, Math.min(width, height) - 4, {
        roughness,
        bowing,
        stroke: strokeColor,
        strokeWidth,
        fill: fillColor,
        fillStyle: 'solid'
      })
    } else if (type === 'ellipse') {
      node = rc.ellipse(width / 2, height / 2, width - 4, height - 4, {
        roughness,
        bowing,
        stroke: strokeColor,
        strokeWidth,
        fill: fillColor,
        fillStyle: 'solid'
      })
    }
    
    if (node) {
      svg.appendChild(node)
    }
  }, [type, width, height, fillColor, strokeColor, strokeWidth, roughness, bowing])
  
  return (
    <svg 
      ref={svgRef} 
      width={width} 
      height={height}
      className={className}
      style={{ display: 'block' }}
    />
  )
}

/**
 * Auto-sizing sketchy background
 */
export function SketchyBackground({ 
  children, 
  className = '',
  fillColor = 'var(--doodle-yellow)',
  strokeColor = 'var(--doodle-stroke)',
  as: Component = 'div',
  ...props 
}) {
  const containerRef = useRef(null)
  const svgRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setDimensions({
          width: entry.contentRect.width,
          height: entry.contentRect.height
        })
      }
    })
    
    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [])
  
  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !dimensions.height) return
    
    const svg = svgRef.current
    svg.innerHTML = ''
    
    const rc = rough.svg(svg)
    const node = rc.rectangle(2, 2, dimensions.width - 4, dimensions.height - 4, {
      roughness: 1.2,
      bowing: 1.5,
      stroke: strokeColor,
      strokeWidth: 2.5,
      fill: fillColor,
      fillStyle: 'solid'
    })
    
    svg.appendChild(node)
  }, [dimensions, fillColor, strokeColor])
  
  return (
    <Component 
      ref={containerRef} 
      className={`relative ${className}`}
      {...props}
    >
      <svg 
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
        width={dimensions.width}
        height={dimensions.height}
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </Component>
  )
}

export default SketchyShape
