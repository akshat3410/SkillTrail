import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'

/**
 * TrailStep - Box node on the trail path
 * Animates in when revealed by scroll
 */
export function TrailStep({ 
  node, 
  index, 
  state, // 'distant' | 'revealed' | 'current' | 'walked'
  userProgress
}) {
  const navigate = useNavigate()
  const boxRef = useRef(null)
  
  // Position alternates left/right
  const position = index % 2 === 0 ? 'left' : 'right'
  
  // Animate box based on state
  useEffect(() => {
    const box = boxRef.current
    if (!box) return
    
    if (state === 'current') {
      // Current - full visibility with emphasis
      gsap.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out'
      })
    } else if (state === 'revealed') {
      // Revealed - visible but not emphasized
      gsap.to(box, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
        delay: 0.1
      })
    } else if (state === 'walked') {
      // Walked - faded, in the past
      gsap.to(box, {
        opacity: 0.5,
        y: 0,
        scale: 0.98,
        duration: 0.4,
        ease: 'power2.out'
      })
    } else {
      // Distant - hidden
      gsap.to(box, {
        opacity: 0,
        y: 30,
        scale: 0.9,
        duration: 0.3,
        ease: 'power2.in'
      })
    }
  }, [state])
  
  const handleClick = () => {
    navigate(`/topic/${node.id}`)
  }
  
  const classNames = ['trail-step', position, state].filter(Boolean).join(' ')
  
  return (
    <div 
      ref={boxRef}
      className={`trail-step ${position} ${state}`}
      onClick={() => navigate(`/topic/${node.id}`)}
      style={{
        zIndex: state === 'current' ? 20 : 10,
        // Dynamic positioning - matches CSS formulas but supports unlimited nodes
        // First node at 100px, then +260px for each subsequent node
        top: `${100 + (index * 260)}px`
      }}
    >
      <div className="trail-box">
        {/* Connection dot */}
        <div className="trail-connector" />
        
        {/* Node number */}
        <div className="trail-number">
          {index + 1}
        </div>
        
        {/* Title */}
        <h3 className="trail-box-title">
          {node.title}
        </h3>
        
        {/* You are here indicator */}
        {state === 'current' && (
          <span className="trail-here">
            you are here
          </span>
        )}
      </div>
    </div>
  )
}

TrailStep.propTypes = {
  node: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired
  }).isRequired,
  index: PropTypes.number.isRequired,
  state: PropTypes.oneOf(['distant', 'revealed', 'current', 'walked']).isRequired,
  userProgress: PropTypes.object
}

export default TrailStep
