import { useRef, useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import TrailPath from './JourneyPath'
import TrailStep from './JourneyNode'
import '../../styles/journey.css'

// Meaningful annotations for the journey sides
const sideAnnotations = {
  // Left side - reflections, encouragement, progress markers
  left: [
    { y: '8%', text: '— the beginning —' },
    { y: '20%', text: 'every expert starts here' },
    { y: '35%', text: 'foundation built' },
    { y: '50%', text: 'momentum grows' },
    { y: '65%', text: 'the hard part is behind you' },
    { y: '80%', text: 'look how far you have come' },
    { y: '92%', text: '— almost there —' }
  ],
  // Right side - hints about what's ahead, encouragement
  right: [
    { y: '12%', text: 'one step at a time' },
    { y: '25%', text: 'clarity awaits' },
    { y: '40%', text: 'this connects to the next' },
    { y: '55%', text: 'you are building something real' },
    { y: '70%', text: 'confidence grows here' },
    { y: '85%', text: 'the destination' }
  ]
}

// Phase markers for the journey - larger, more visible
const phaseMarkers = [
  { side: 'left', y: '5%', text: 'FOUNDATIONS' },
  { side: 'right', y: '30%', text: 'CORE CONCEPTS' },
  { side: 'left', y: '55%', text: 'PRACTICE' },
  { side: 'right', y: '80%', text: 'MASTERY' }
]

/**
 * TrailContainer - Trail with meaningful side annotations
 */
export function TrailContainer({ 
  nodes = [], 
  progress = {},
  currentIndex = 0
}) {
  const containerRef = useRef(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  
  const getStepState = useCallback((stepIndex) => {
    const stepsRevealed = Math.floor(scrollProgress * (nodes.length + 0.5))
    
    const userStatus = progress[nodes[stepIndex]?.id]
    if (userStatus === 'completed') {
      return 'walked'
    }
    
    if (stepIndex === currentIndex) {
      return 'current'
    }
    
    if (stepIndex <= stepsRevealed) {
      return stepIndex < currentIndex ? 'walked' : 'revealed'
    }
    
    return 'distant'
  }, [scrollProgress, nodes, progress, currentIndex])
  
  // Determine which annotations are visible based on scroll
  const visibleAnnotations = useMemo(() => {
    const threshold = scrollProgress * 100
    return {
      left: sideAnnotations.left.map(a => ({
        ...a,
        visible: parseFloat(a.y) < threshold + 20
      })),
      right: sideAnnotations.right.map(a => ({
        ...a,
        visible: parseFloat(a.y) < threshold + 30
      }))
    }
  }, [scrollProgress])
  
  const handleProgressChange = useCallback((prog) => {
    setScrollProgress(prog)
  }, [])
  
  const stepHeight = 260
  const containerHeight = nodes.length * stepHeight + 150
  
  return (
    <div 
      ref={containerRef}
      className="trail-container"
      style={{ minHeight: `${containerHeight}px` }}
    >
      {/* Meaningful annotations layer */}
      <div className="trail-annotations" aria-hidden="true">
        {/* Left side - past reflections */}
        {visibleAnnotations.left.map((ann, i) => (
          <span 
            key={`left-${i}`}
            className={`trail-annotation left ${ann.visible ? 'visible' : ''}`}
            style={{ top: ann.y }}
          >
            {ann.text}
          </span>
        ))}
        
        {/* Right side - future hints */}
        {visibleAnnotations.right.map((ann, i) => (
          <span 
            key={`right-${i}`}
            className={`trail-annotation right ${ann.visible ? 'visible' : ''}`}
            style={{ top: ann.y }}
          >
            {ann.text}
          </span>
        ))}
        
        {/* Phase markers */}
        {phaseMarkers.map((phase, i) => (
          <span
            key={`phase-${i}`}
            className={`trail-phase ${phase.side}`}
            style={{ top: phase.y }}
          >
            {phase.text}
          </span>
        ))}
        
        {/* Dotted guide lines */}
        <div className="trail-guide left" />
        <div className="trail-guide right" />
      </div>
      
      {/* SVG Path */}
      <TrailPath
        stepCount={nodes.length}
        containerRef={containerRef}
        onProgressChange={handleProgressChange}
      />
      
      {/* Box nodes */}
      <div className="trail-steps">
        {nodes.map((node, index) => (
          <TrailStep
            key={node.id}
            node={node}
            index={index}
            state={getStepState(index)}
            userProgress={progress}
          />
        ))}
      </div>
    </div>
  )
}

TrailContainer.propTypes = {
  nodes: PropTypes.array.isRequired,
  progress: PropTypes.object,
  currentIndex: PropTypes.number
}

export default TrailContainer
