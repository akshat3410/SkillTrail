import { useRef, useEffect, useMemo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Generates organic bezier path that matches CSS node positions
 * CSS positions: 100, 360, 620, 880... (first at 100, then +260 each)
 */
function generateTrailPath(stepCount, containerWidth, stepHeight, zigzag) {
  if (stepCount === 0) return ''
  
  const centerX = containerWidth / 2
  const firstNodeY = 100 // Match CSS .trail-step:nth-child(1) { top: 100px }
  const nodeSpacing = 260 // Match CSS spacing (360-100, 620-360, etc.)
  
  const points = []
  for (let i = 0; i < stepCount; i++) {
    const x = centerX + (i % 2 === 0 ? -zigzag : zigzag)
    const y = firstNodeY + (i * nodeSpacing) + 20 // +20 to hit center of box
    points.push({ x, y })
  }
  
  if (points.length === 1) {
    return `M ${points[0].x} ${points[0].y}`
  }
  
  let path = `M ${points[0].x} ${points[0].y}`
  
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i]
    const next = points[i + 1]
    
    const cp1x = current.x
    const cp1y = current.y + (next.y - current.y) * 0.45
    const cp2x = next.x
    const cp2y = current.y + (next.y - current.y) * 0.55
    
    path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${next.x} ${next.y}`
  }
  
  return path
}

/**
 * TrailPath - Scroll-drawn organic path
 */
export function TrailPath({ 
  stepCount, 
  containerRef,
  onProgressChange 
}) {
  const walkedPathRef = useRef(null)
  const animationRef = useRef(null)
  
  const containerWidth = 900
  const stepHeight = 260
  const zigzag = 120 // Reduced to bring path closer to nodes
  
  const pathData = useMemo(() => 
    generateTrailPath(stepCount, containerWidth, stepHeight, zigzag),
    [stepCount]
  )
  
  const svgHeight = useMemo(() => {
    // Path ends at last node - match CSS positioning
    const firstNodeY = 100
    const nodeSpacing = 260
    const lastNodeY = firstNodeY + ((stepCount - 1) * nodeSpacing) + 20
    return lastNodeY + 50 // Small margin for the path stroke
  }, [stepCount])
  
  const handleProgress = useCallback((progress) => {
    if (onProgressChange) {
      onProgressChange(progress)
    }
  }, [onProgressChange])
  
  useEffect(() => {
    const walkedPath = walkedPathRef.current
    const container = containerRef?.current
    
    if (!walkedPath || !container || stepCount === 0) return
    
    const length = walkedPath.getTotalLength()
    
    gsap.set(walkedPath, {
      strokeDasharray: length,
      strokeDashoffset: length
    })
    
    animationRef.current = gsap.to(walkedPath, {
      strokeDashoffset: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        end: 'bottom 70%', // End earlier so path completes at last node
        scrub: 0.2,
        onUpdate: (self) => {
          handleProgress(self.progress)
        }
      }
    })
    
    return () => {
      if (animationRef.current) {
        animationRef.current.scrollTrigger?.kill()
        animationRef.current.kill()
      }
    }
  }, [stepCount, containerRef, handleProgress])
  
  if (stepCount === 0) return null
  
  return (
    <svg
      className="trail-svg"
      viewBox={`0 0 ${containerWidth} ${svgHeight}`}
      preserveAspectRatio="xMidYMin meet"
      style={{
        width: '100%',
        maxWidth: `${containerWidth}px`,
        height: `${svgHeight}px`
      }}
    >
      {/* Ahead path */}
      <path d={pathData} className="trail-path-ahead" />
      
      {/* Walked path */}
      <path ref={walkedPathRef} d={pathData} className="trail-path-walked" />
    </svg>
  )
}

TrailPath.propTypes = {
  stepCount: PropTypes.number.isRequired,
  containerRef: PropTypes.object.isRequired,
  onProgressChange: PropTypes.func
}

export default TrailPath
