import PropTypes from 'prop-types'

/**
 * Hand-drawn SVG logos for roadmaps
 * Style: Sketch, imperfect lines, minimal, story-map symbols
 */

// Web Development - Globe with code brackets
export function WebDevLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Globe circle - slightly wobbly */}
      <ellipse 
        cx="30" cy="30" rx="22" ry="21" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      {/* Horizontal line */}
      <path 
        d="M 9 30 Q 20 28 30 30 T 51 30" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Vertical curve */}
      <path 
        d="M 30 9 Q 28 20 30 30 T 30 51" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Code bracket left */}
      <path 
        d="M 15 22 L 10 30 L 15 38" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Code bracket right */}
      <path 
        d="M 45 22 L 50 30 L 45 38" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

WebDevLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// AI / Machine Learning - Abstract brain nodes
export function AILogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Central node */}
      <circle cx="30" cy="30" r="6" fill="var(--editorial-ink)" opacity="0.3" />
      <circle cx="30" cy="30" r="6" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      
      {/* Surrounding nodes */}
      <circle cx="15" cy="18" r="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <circle cx="45" cy="18" r="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <circle cx="12" cy="40" r="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <circle cx="48" cy="40" r="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <circle cx="30" cy="52" r="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      
      {/* Connecting lines - slightly wobbly */}
      <path d="M 24 26 Q 20 22 18 20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 36 26 Q 40 22 42 20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 25 33 Q 18 36 15 38" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 35 33 Q 42 36 45 38" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M 30 36 Q 30 44 30 48" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" strokeLinecap="round" />
      
      {/* Spark */}
      <path d="M 30 8 L 30 14" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 27 11 L 33 11" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

AILogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// Data Structures & Algorithms - Stacked blocks with arrows
export function DSALogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Stack blocks */}
      <rect x="18" y="38" width="24" height="12" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      <rect x="18" y="24" width="24" height="12" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      <rect x="18" y="10" width="24" height="12" rx="2" fill="var(--editorial-ink)" opacity="0.15" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      
      {/* Arrow flowing down */}
      <path 
        d="M 50 15 Q 52 30 50 44" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeDasharray="3 2"
      />
      <path 
        d="M 47 40 L 50 46 L 53 40" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      
      {/* Small decorative dots */}
      <circle cx="10" cy="30" r="2" fill="var(--editorial-ink)" opacity="0.3" />
      <circle cx="10" cy="38" r="1.5" fill="var(--editorial-ink)" opacity="0.2" />
    </svg>
  )
}

DSALogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// Backend Development - Pipes and connectors
export function BackendLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Server box */}
      <rect x="20" y="10" width="20" height="14" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      <line x1="24" y1="14" x2="36" y2="14" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
      <line x1="24" y1="17" x2="32" y2="17" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
      <circle cx="35" cy="20" r="1.5" fill="var(--editorial-ink)" opacity="0.4" />
      
      {/* Pipes down */}
      <path d="M 25 24 L 25 32 Q 25 36 30 36 L 35 36 Q 40 36 40 40 L 40 48" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 35 24 L 35 28 Q 35 32 30 32 L 20 32 Q 15 32 15 36 L 15 48" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      
      {/* Database cylinders */}
      <ellipse cx="15" cy="48" rx="6" ry="3" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <path d="M 9 48 L 9 54 Q 9 57 15 57 Q 21 57 21 54 L 21 48" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      
      <ellipse cx="40" cy="48" rx="6" ry="3" fill="var(--editorial-ink)" opacity="0.15" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <path d="M 34 48 L 34 54 Q 34 57 40 57 Q 46 57 46 54 L 46 48" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
    </svg>
  )
}

BackendLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// DevOps - Loop arrows and tools
export function DevOpsLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Infinity loop */}
      <path 
        d="M 15 30 Q 15 20 25 20 Q 35 20 35 30 Q 35 40 45 40 Q 55 40 55 30 Q 55 20 45 20 Q 35 20 35 30 Q 35 40 25 40 Q 15 40 15 30" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      
      {/* Arrow heads on loop */}
      <path d="M 22 22 L 25 20 L 22 18" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 48 38 L 45 40 L 48 42" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      
      {/* Gear in center */}
      <circle cx="35" cy="30" r="5" fill="var(--editorial-ink)" opacity="0.15" stroke="var(--editorial-ink)" strokeWidth="1.2" />
      <path d="M 35 24 L 35 26" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 35 34 L 35 36" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 29 30 L 31 30" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 39 30 L 41 30" stroke="var(--editorial-ink)" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

DevOpsLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// Mobile Development - Phone with path
export function MobileLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Phone outline */}
      <rect x="18" y="8" width="24" height="44" rx="4" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.8" />
      
      {/* Screen */}
      <rect x="22" y="14" width="16" height="28" rx="1" fill="var(--editorial-ink)" opacity="0.08" stroke="var(--editorial-ink)" strokeWidth="0.8" />
      
      {/* Home button circle */}
      <circle cx="30" cy="48" r="2.5" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.2" />
      
      {/* App blocks on screen */}
      <rect x="24" y="17" width="5" height="5" rx="1" fill="none" stroke="var(--editorial-ink)" strokeWidth="0.8" opacity="0.6" />
      <rect x="31" y="17" width="5" height="5" rx="1" fill="none" stroke="var(--editorial-ink)" strokeWidth="0.8" opacity="0.6" />
      <rect x="24" y="24" width="5" height="5" rx="1" fill="var(--editorial-ink)" opacity="0.2" stroke="var(--editorial-ink)" strokeWidth="0.8" />
      <rect x="31" y="24" width="5" height="5" rx="1" fill="none" stroke="var(--editorial-ink)" strokeWidth="0.8" opacity="0.6" />
    </svg>
  )
}

MobileLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// System Design - Architecture diagram
export function SystemDesignLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Top box */}
      <rect x="22" y="8" width="16" height="10" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
      
      {/* Lines down */}
      <path d="M 30 18 L 30 24" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <path d="M 30 24 L 15 30" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      <path d="M 30 24 L 45 30" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      
      {/* Left box */}
      <rect x="8" y="30" width="14" height="10" rx="2" fill="var(--editorial-ink)" opacity="0.12" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      
      {/* Right box */}
      <rect x="38" y="30" width="14" height="10" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
      
      {/* Bottom connections */}
      <path d="M 15 40 L 15 46 Q 15 50 22 50 L 38 50 Q 45 50 45 46 L 45 40" stroke="var(--editorial-ink)" strokeWidth="1.3" strokeDasharray="3 2" />
      
      {/* Bottom box */}
      <rect x="24" y="46" width="12" height="8" rx="2" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.3" />
    </svg>
  )
}

SystemDesignLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// Generic/Default - Path with star
export function GenericLogo({ size = 60, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 60 60" 
      className={className}
      style={{ overflow: 'visible' }}
    >
      {/* Winding path */}
      <path 
        d="M 10 50 Q 20 45 25 35 Q 30 25 35 25 Q 45 25 50 15" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
      />
      
      {/* Star at end */}
      <path 
        d="M 50 10 L 51 14 L 55 14 L 52 17 L 53 21 L 50 18 L 47 21 L 48 17 L 45 14 L 49 14 Z" 
        fill="var(--editorial-ink)" 
        opacity="0.3"
        stroke="var(--editorial-ink)" 
        strokeWidth="1"
      />
      
      {/* Start dot */}
      <circle cx="10" cy="50" r="4" fill="var(--editorial-ink)" opacity="0.4" stroke="var(--editorial-ink)" strokeWidth="1.2" />
    </svg>
  )
}

GenericLogo.propTypes = {
  size: PropTypes.number,
  className: PropTypes.string
}

// Logo selector by roadmap type
export function RoadmapLogo({ type, size = 60, className = '' }) {
  const logos = {
    'web-dev': WebDevLogo,
    'webdev': WebDevLogo,
    'frontend': WebDevLogo,
    'ai': AILogo,
    'ml': AILogo,
    'machine-learning': AILogo,
    'dsa': DSALogo,
    'algorithms': DSALogo,
    'data-structures': DSALogo,
    'backend': BackendLogo,
    'api': BackendLogo,
    'devops': DevOpsLogo,
    'cloud': DevOpsLogo,
    'mobile': MobileLogo,
    'ios': MobileLogo,
    'android': MobileLogo,
    'system-design': SystemDesignLogo,
    'architecture': SystemDesignLogo
  }
  
  const LogoComponent = logos[type?.toLowerCase()] || GenericLogo
  
  return <LogoComponent size={size} className={className} />
}

RoadmapLogo.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
}

export default RoadmapLogo
