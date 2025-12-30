import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs'
import { gsap } from 'gsap'

/**
 * Doodle-style card with hand-drawn border
 */
export function DoodleCard({ 
  children, 
  variant = 'default',
  className = '',
  hover = true,
  onClick,
  ...props 
}) {
  const cardRef = useRef(null)
  const svgRef = useRef(null)
  
  const colorMap = {
    default: 'white',
    yellow: 'var(--doodle-yellow-light)',
    blue: 'var(--doodle-blue-light)',
    pink: 'var(--doodle-pink-light)',
    purple: 'var(--doodle-purple-light)',
    mint: 'var(--doodle-mint-light)'
  }
  
  // Draw sketchy border on mount and resize
  useEffect(() => {
    if (!cardRef.current || !svgRef.current) return
    
    const drawBorder = () => {
      const card = cardRef.current
      const svg = svgRef.current
      const { width, height } = card.getBoundingClientRect()
      
      svg.innerHTML = ''
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      
      const rc = rough.svg(svg)
      const node = rc.rectangle(2, 2, width - 4, height - 4, {
        roughness: 1.2,
        bowing: 1,
        stroke: 'var(--doodle-stroke)',
        strokeWidth: 2.5,
        fill: colorMap[variant],
        fillStyle: 'solid'
      })
      
      svg.appendChild(node)
    }
    
    drawBorder()
    
    const observer = new ResizeObserver(drawBorder)
    observer.observe(cardRef.current)
    
    return () => observer.disconnect()
  }, [variant])
  
  // GSAP hover animation
  const handleMouseEnter = () => {
    if (!hover) return
    gsap.to(cardRef.current, {
      rotation: 0.5,
      y: -3,
      duration: 0.25,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotation: 0,
      y: 0,
      duration: 0.25,
      ease: 'power2.out'
    })
  }
  
  const Component = onClick ? 'button' : 'div'
  
  return (
    <Component
      ref={cardRef}
      className={`relative p-6 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        background: 'transparent', 
        border: 'none',
        textAlign: 'left',
        width: '100%'
      }}
      {...props}
    >
      <svg 
        ref={svgRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative" style={{ zIndex: 1 }}>
        {children}
      </div>
    </Component>
  )
}

DoodleCard.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'yellow', 'blue', 'pink', 'purple', 'mint']),
  className: PropTypes.string,
  hover: PropTypes.bool,
  onClick: PropTypes.func
}

/**
 * Card header
 */
export function DoodleCardHeader({ children, className = '' }) {
  return <div className={`mb-4 ${className}`}>{children}</div>
}

/**
 * Card title
 */
export function DoodleCardTitle({ children, className = '' }) {
  return (
    <h3 className={`font-['Caveat'] text-2xl font-semibold ${className}`}>
      {children}
    </h3>
  )
}

/**
 * Card description
 */
export function DoodleCardDescription({ children, className = '' }) {
  return (
    <p className={`font-['Patrick_Hand'] text-lg mt-1 ${className}`} style={{ color: 'var(--doodle-text-muted)' }}>
      {children}
    </p>
  )
}

export default DoodleCard
