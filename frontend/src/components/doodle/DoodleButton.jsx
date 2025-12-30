import { useRef, useEffect, useMemo } from 'react'
import PropTypes from 'prop-types'
import rough from 'roughjs'
import { gsap } from 'gsap'

/**
 * Enhanced Doodle Button with multiple shapes:
 * - default: rounded rectangle
 * - arrow: arrow/banner shape (like reference image)
 * - pill: rounded pill shape
 * - circle: circular badge
 * - ribbon: ribbon/banner style
 */
export function DoodleButton({ 
  children, 
  variant = 'primary', 
  shape = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  className = '',
  onClick,
  ...props 
}) {
  const buttonRef = useRef(null)
  const svgRef = useRef(null)
  
  // Color palette - Updated
  const colorMap = {
    primary: '#F6C453',      // Yellow
    secondary: '#6EC1E4',    // Blue  
    pink: '#E56B8C',         // Pink
    purple: '#8B6CCF',       // Purple
    mint: '#6BCF9D',         // Mint
    orange: '#F6A453',       // Orange
    magenta: '#E56B8C'       // Same as pink
  }
  
  const sizeConfig = {
    sm: { padding: '8px 16px', fontSize: '14px', height: 36 },
    md: { padding: '12px 24px', fontSize: '16px', height: 44 },
    lg: { padding: '16px 32px', fontSize: '18px', height: 52 }
  }
  
  const strokeColor = '#2F2F2F' // Charcoal/Ink
  
  // Generate SVG path based on shape
  const generatePath = (width, height, shapeType) => {
    const rc = rough.generator()
    const padding = 3
    const w = width - padding * 2
    const h = height - padding * 2
    
    switch (shapeType) {
      case 'arrow': {
        // Arrow/banner shape pointing right (like reference)
        const arrowPoint = w * 0.15
        const points = [
          [padding, padding],
          [padding + w - arrowPoint, padding],
          [padding + w, padding + h / 2],
          [padding + w - arrowPoint, padding + h],
          [padding, padding + h]
        ]
        return rc.polygon(points, {
          roughness: 1.8,
          bowing: 2,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: colorMap[variant],
          fillStyle: 'solid'
        })
      }
      
      case 'arrowLeft': {
        // Arrow pointing left with number circle
        const arrowPoint = w * 0.15
        const points = [
          [padding + arrowPoint, padding],
          [padding + w, padding],
          [padding + w, padding + h],
          [padding + arrowPoint, padding + h],
          [padding, padding + h / 2]
        ]
        return rc.polygon(points, {
          roughness: 1.8,
          bowing: 2,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: colorMap[variant],
          fillStyle: 'solid'
        })
      }
      
      case 'pill': {
        // Pill/capsule shape
        const radius = h / 2
        return rc.path(
          `M ${padding + radius} ${padding}
           L ${padding + w - radius} ${padding}
           Q ${padding + w} ${padding} ${padding + w} ${padding + radius}
           L ${padding + w} ${padding + h - radius}
           Q ${padding + w} ${padding + h} ${padding + w - radius} ${padding + h}
           L ${padding + radius} ${padding + h}
           Q ${padding} ${padding + h} ${padding} ${padding + h - radius}
           L ${padding} ${padding + radius}
           Q ${padding} ${padding} ${padding + radius} ${padding}
           Z`,
          {
            roughness: 1.5,
            bowing: 1.5,
            stroke: strokeColor,
            strokeWidth: 2.5,
            fill: colorMap[variant],
            fillStyle: 'solid'
          }
        )
      }
      
      case 'circle': {
        // Circle badge
        const diameter = Math.min(w, h)
        return rc.circle(padding + w / 2, padding + h / 2, diameter, {
          roughness: 1.5,
          bowing: 2,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: colorMap[variant],
          fillStyle: 'solid'
        })
      }
      
      case 'ribbon': {
        // Ribbon/banner with notched ends
        const notch = 8
        const points = [
          [padding, padding],
          [padding + w, padding],
          [padding + w - notch, padding + h / 2],
          [padding + w, padding + h],
          [padding, padding + h],
          [padding + notch, padding + h / 2]
        ]
        return rc.polygon(points, {
          roughness: 1.8,
          bowing: 2,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: colorMap[variant],
          fillStyle: 'solid'
        })
      }
      
      case 'outlined': {
        // Outlined rectangle (no fill)
        return rc.rectangle(padding, padding, w, h, {
          roughness: 1.5,
          bowing: 1.5,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: 'transparent'
        })
      }
      
      case 'speech': {
        // Speech bubble shape
        const tailSize = 12
        return rc.path(
          `M ${padding + 10} ${padding}
           L ${padding + w - 10} ${padding}
           Q ${padding + w} ${padding} ${padding + w} ${padding + 10}
           L ${padding + w} ${padding + h - 10}
           Q ${padding + w} ${padding + h} ${padding + w - 10} ${padding + h}
           L ${padding + 30 + tailSize} ${padding + h}
           L ${padding + 20} ${padding + h + tailSize}
           L ${padding + 30} ${padding + h}
           L ${padding + 10} ${padding + h}
           Q ${padding} ${padding + h} ${padding} ${padding + h - 10}
           L ${padding} ${padding + 10}
           Q ${padding} ${padding} ${padding + 10} ${padding}
           Z`,
          {
            roughness: 1.5,
            bowing: 1.5,
            stroke: strokeColor,
            strokeWidth: 2.5,
            fill: '#ffffff',
            fillStyle: 'solid'
          }
        )
      }
      
      default: {
        // Default rounded rectangle
        return rc.rectangle(padding, padding, w, h, {
          roughness: 1.5,
          bowing: 2,
          stroke: strokeColor,
          strokeWidth: 2.5,
          fill: colorMap[variant],
          fillStyle: 'solid'
        })
      }
    }
  }
  
  // Draw button background
  useEffect(() => {
    if (!buttonRef.current || !svgRef.current) return
    
    const drawBackground = () => {
      const button = buttonRef.current
      const svg = svgRef.current
      const { width, height } = button.getBoundingClientRect()
      
      if (width === 0 || height === 0) return
      
      svg.innerHTML = ''
      svg.setAttribute('width', width)
      svg.setAttribute('height', height)
      
      const roughSvg = rough.svg(svg)
      const shapeNode = generatePath(width, height, shape)
      
      // For RoughJS generator, we need to draw differently
      if (shapeNode.sets) {
        // It's a drawable from generator
        const node = roughSvg.draw(shapeNode)
        svg.appendChild(node)
      } else {
        svg.appendChild(shapeNode)
      }
    }
    
    // Small delay to ensure button has rendered
    const timeoutId = setTimeout(drawBackground, 10)
    
    const observer = new ResizeObserver(drawBackground)
    observer.observe(buttonRef.current)
    
    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [variant, shape])
  
  // GSAP hover animation (+/-2° rotation)
  const handleMouseEnter = () => {
    if (disabled) return
    gsap.to(buttonRef.current, {
      rotation: Math.random() > 0.5 ? 2 : -2,
      scale: 1.02,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  // Click animation (scale to 96%)
  const handleClick = (e) => {
    if (disabled || loading) return
    
    gsap.to(buttonRef.current, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: 'power2.inOut'
    })
    
    onClick?.(e)
  }
  
  // Calculate extra padding for arrow shapes
  const extraPadding = useMemo(() => {
    if (shape === 'arrow') return { paddingLeft: '2rem' }
    if (shape === 'arrowLeft') return { paddingRight: '2rem' }
    if (shape === 'circle') return { padding: '0.75rem', minWidth: '44px', minHeight: '44px' }
    return {}
  }, [shape])
  
  return (
    <button
      ref={buttonRef}
      className={`
        relative inline-flex items-center justify-center gap-2
        cursor-pointer transition-colors duration-150
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || loading}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ 
        background: 'transparent', 
        border: 'none', 
        color: shape === 'outlined' ? '#1a1a2e' : '#1a1a2e',
        fontFamily: "'Virgil', 'Caveat', 'Patrick Hand', cursive",
        fontSize: sizeConfig[size].fontSize,
        padding: sizeConfig[size].padding,
        letterSpacing: '0.4px',
        minHeight: sizeConfig[size].height,
        ...extraPadding
      }}
      {...props}
    >
      <svg 
        ref={svgRef} 
        className="absolute inset-0 pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <span className="relative z-10 flex items-center gap-2">
        {loading && <span className="doodle-spinner" style={{ width: 16, height: 16 }} />}
        {children}
      </span>
    </button>
  )
}

DoodleButton.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'pink', 'mint', 'purple', 'orange', 'magenta']),
  shape: PropTypes.oneOf(['default', 'arrow', 'arrowLeft', 'pill', 'circle', 'ribbon', 'outlined', 'speech']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  disabled: PropTypes.bool,
  loading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func
}

/**
 * Arrow banner button (like reference image numbers 01, 02, 03)
 */
export function ArrowButton({ 
  number, 
  label, 
  variant = 'pink',
  onClick,
  className = '' 
}) {
  const containerRef = useRef(null)
  const arrowSvgRef = useRef(null)
  const circleSvgRef = useRef(null)
  
  const colorMap = {
    pink: '#E56B8C',
    orange: '#F6A453',
    blue: '#6EC1E4',
    yellow: '#F6C453',
    purple: '#8B6CCF',
    mint: '#6BCF9D',
    magenta: '#E56B8C'
  }
  
  useEffect(() => {
    if (!containerRef.current || !arrowSvgRef.current) return
    
    const draw = () => {
      const container = containerRef.current
      const arrowSvg = arrowSvgRef.current
      const circleSvg = circleSvgRef.current
      
      const { width, height } = container.getBoundingClientRect()
      if (width === 0) return
      
      // Draw arrow shape
      arrowSvg.innerHTML = ''
      arrowSvg.setAttribute('width', width)
      arrowSvg.setAttribute('height', height)
      
      const rc = rough.svg(arrowSvg)
      const arrowPoint = width * 0.12
      const padding = 3
      
      const arrow = rc.polygon([
        [padding, padding],
        [width - arrowPoint - padding, padding],
        [width - padding, height / 2],
        [width - arrowPoint - padding, height - padding],
        [padding, height - padding]
      ], {
        roughness: 1.8,
        bowing: 2.5,
        stroke: '#2F2F2F',
        strokeWidth: 2.5,
        fill: colorMap[variant],
        fillStyle: 'solid'
      })
      
      arrowSvg.appendChild(arrow)
      
      // Draw number circle
      if (circleSvg && number) {
        circleSvg.innerHTML = ''
        circleSvg.setAttribute('width', 40)
        circleSvg.setAttribute('height', 40)
        
        const circle = rc.circle(20, 20, 34, {
          roughness: 1.5,
          bowing: 2,
          stroke: '#2F2F2F',
          strokeWidth: 2.5,
          fill: variant === 'pink' ? '#F6C453' : '#6EC1E4',
          fillStyle: 'solid'
        })
        
        circleSvg.appendChild(circle)
      }
    }
    
    const timeoutId = setTimeout(draw, 10)
    const observer = new ResizeObserver(draw)
    observer.observe(containerRef.current)
    
    return () => {
      clearTimeout(timeoutId)
      observer.disconnect()
    }
  }, [variant, number])
  
  const handleMouseEnter = () => {
    gsap.to(containerRef.current, {
      rotation: -2,
      scale: 1.03,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(containerRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleClick = (e) => {
    gsap.to(containerRef.current, {
      scale: 0.96,
      duration: 0.1,
      yoyo: true,
      repeat: 1
    })
    onClick?.(e)
  }
  
  return (
    <button
      ref={containerRef}
      className={`relative inline-flex items-center cursor-pointer ${className}`}
      style={{ 
        background: 'transparent', 
        border: 'none',
        minWidth: '200px',
        height: '48px'
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg 
        ref={arrowSvgRef}
        className="absolute inset-0 pointer-events-none"
      />
      
      {/* Number circle */}
      {number && (
        <div className="relative flex items-center justify-center ml-2" style={{ width: 40, height: 40 }}>
          <svg 
            ref={circleSvgRef}
            className="absolute inset-0 pointer-events-none"
          />
          <span 
            className="relative z-10"
            style={{ 
              fontFamily: "'Virgil', 'Caveat', cursive",
              fontSize: '18px',
              fontWeight: 500,
              color: '#1a1a2e'
            }}
          >
            {number}
          </span>
        </div>
      )}
      
      {/* Label text */}
      <span 
        className="relative z-10 ml-3 mr-8 uppercase"
        style={{ 
          fontFamily: "'Virgil', 'Caveat', cursive",
          fontSize: '14px',
          letterSpacing: '1px',
          color: 'white',
          textShadow: '0 1px 0 rgba(0,0,0,0.2)'
        }}
      >
        {label}
      </span>
    </button>
  )
}

ArrowButton.propTypes = {
  number: PropTypes.string,
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['pink', 'orange', 'blue', 'yellow', 'purple', 'mint', 'magenta']),
  onClick: PropTypes.func,
  className: PropTypes.string
}

/**
 * Circular badge button (like percentage badges in reference)
 */
export function CircleBadge({ 
  children, 
  variant = 'yellow',
  size = 'md',
  onClick,
  className = '' 
}) {
  const badgeRef = useRef(null)
  const svgRef = useRef(null)
  
  const colorMap = {
    yellow: '#F6C453',
    blue: '#6EC1E4',
    pink: '#E56B8C',
    mint: '#6BCF9D',
    purple: '#8B6CCF'
  }
  
  const sizeMap = {
    sm: 32,
    md: 44,
    lg: 56
  }
  
  useEffect(() => {
    if (!badgeRef.current || !svgRef.current) return
    
    const draw = () => {
      const svg = svgRef.current
      const diameter = sizeMap[size]
      
      svg.innerHTML = ''
      svg.setAttribute('width', diameter)
      svg.setAttribute('height', diameter)
      
      const rc = rough.svg(svg)
      const circle = rc.circle(diameter / 2, diameter / 2, diameter - 6, {
        roughness: 1.5,
        bowing: 2,
        stroke: '#2F2F2F',
        strokeWidth: 2.5,
        fill: colorMap[variant],
        fillStyle: 'solid'
      })
      
      svg.appendChild(circle)
    }
    
    draw()
  }, [variant, size])
  
  const handleMouseEnter = () => {
    gsap.to(badgeRef.current, {
      rotation: 5,
      scale: 1.1,
      duration: 0.2,
      ease: 'back.out(1.7)'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(badgeRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  return (
    <button
      ref={badgeRef}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ 
        background: 'transparent', 
        border: 'none',
        width: sizeMap[size],
        height: sizeMap[size]
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <svg 
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
      />
      <span 
        className="relative z-10"
        style={{ 
          fontFamily: "'Virgil', 'Caveat', cursive",
          fontSize: size === 'sm' ? '12px' : size === 'md' ? '14px' : '16px',
          fontWeight: 500,
          color: '#1a1a2e'
        }}
      >
        {children}
      </span>
    </button>
  )
}

CircleBadge.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['yellow', 'blue', 'pink', 'mint', 'purple']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  onClick: PropTypes.func,
  className: PropTypes.string
}

/**
 * Icon button with hand-drawn circle
 */
export function IconButton({ 
  icon, 
  variant = 'secondary',
  size = 'md',
  label,
  onClick,
  className = '' 
}) {
  const btnRef = useRef(null)
  const svgRef = useRef(null)
  
  const colorMap = {
    primary: '#F6C453',
    secondary: '#6EC1E4',
    pink: '#E56B8C',
    mint: '#6BCF9D'
  }
  
  const sizeMap = {
    sm: 36,
    md: 44,
    lg: 52
  }
  
  useEffect(() => {
    if (!svgRef.current) return
    
    const svg = svgRef.current
    const diameter = sizeMap[size]
    
    svg.innerHTML = ''
    svg.setAttribute('width', diameter)
    svg.setAttribute('height', diameter)
    
    const rc = rough.svg(svg)
    const circle = rc.circle(diameter / 2, diameter / 2, diameter - 6, {
      roughness: 1.5,
      bowing: 2,
      stroke: '#2F2F2F',
      strokeWidth: 2.5,
      fill: colorMap[variant],
      fillStyle: 'solid'
    })
    
    svg.appendChild(circle)
  }, [variant, size])
  
  const handleMouseEnter = () => {
    gsap.to(btnRef.current, {
      rotation: -5,
      scale: 1.1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  const handleMouseLeave = () => {
    gsap.to(btnRef.current, {
      rotation: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power2.out'
    })
  }
  
  return (
    <button
      ref={btnRef}
      className={`relative inline-flex items-center justify-center cursor-pointer ${className}`}
      style={{ 
        background: 'transparent', 
        border: 'none',
        width: sizeMap[size],
        height: sizeMap[size]
      }}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={label}
    >
      <svg 
        ref={svgRef}
        className="absolute inset-0 pointer-events-none"
      />
      <span className="relative z-10" style={{ color: '#1a1a2e', width: 20, height: 20 }}>
        {icon}
      </span>
    </button>
  )
}

IconButton.propTypes = {
  icon: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'pink', 'mint']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string
}

export default DoodleButton
