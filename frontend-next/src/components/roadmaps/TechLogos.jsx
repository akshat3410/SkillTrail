import PropTypes from 'prop-types'

/**
 * Official Tech Logos - Adapted to site style
 * Style: Flat pastel + hand-drawn outline, official shapes preserved
 */

// Python Logo - Official snake shape with pastel blue/yellow
export function PythonLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Blue snake half */}
      <path 
        d="M 20 4 C 12 4 12 8 12 8 L 12 12 L 20 12 L 20 13 L 9 13 C 9 13 4 13 4 20 C 4 27 9 27 9 27 L 12 27 L 12 22 C 12 22 12 18 16 18 L 24 18 C 24 18 28 18 28 14 L 28 8 C 28 8 28 4 20 4 Z"
        fill="#6B9BD1"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Yellow snake half */}
      <path 
        d="M 20 36 C 28 36 28 32 28 32 L 28 28 L 20 28 L 20 27 L 31 27 C 31 27 36 27 36 20 C 36 13 31 13 31 13 L 28 13 L 28 18 C 28 18 28 22 24 22 L 16 22 C 16 22 12 22 12 26 L 12 32 C 12 32 12 36 20 36 Z"
        fill="#E8C468"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Eye dots */}
      <circle cx="16" cy="9" r="1.5" fill="var(--editorial-ink)" opacity="0.6" />
      <circle cx="24" cy="31" r="1.5" fill="var(--editorial-ink)" opacity="0.6" />
    </svg>
  )
}

PythonLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// JavaScript Logo - Official JS square
export function JavaScriptLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <rect 
        x="4" y="4" width="32" height="32" rx="2"
        fill="#F0DB4F"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      <text 
        x="10" y="30" 
        fontFamily="var(--font-sans)" 
        fontSize="16" 
        fontWeight="600"
        fill="var(--editorial-ink)"
        opacity="0.8"
      >
        JS
      </text>
    </svg>
  )
}

JavaScriptLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// React Logo - Official atom shape
export function ReactLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Orbits */}
      <ellipse 
        cx="20" cy="20" rx="16" ry="6" 
        fill="none" 
        stroke="#61DAFB" 
        strokeWidth="1.5"
        opacity="0.8"
      />
      <ellipse 
        cx="20" cy="20" rx="16" ry="6" 
        fill="none" 
        stroke="#61DAFB" 
        strokeWidth="1.5"
        opacity="0.8"
        transform="rotate(60 20 20)"
      />
      <ellipse 
        cx="20" cy="20" rx="16" ry="6" 
        fill="none" 
        stroke="#61DAFB" 
        strokeWidth="1.5"
        opacity="0.8"
        transform="rotate(120 20 20)"
      />
      {/* Center nucleus */}
      <circle cx="20" cy="20" r="3" fill="#61DAFB" opacity="0.9" />
      {/* Hand-drawn outline */}
      <circle 
        cx="20" cy="20" r="18" 
        fill="none" 
        stroke="var(--editorial-ink)" 
        strokeWidth="0.8"
        strokeDasharray="3 2"
        opacity="0.3"
      />
    </svg>
  )
}

ReactLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Node.js Logo - Hexagon shape
export function NodeLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <path 
        d="M 20 4 L 34 12 L 34 28 L 20 36 L 6 28 L 6 12 Z"
        fill="#68A063"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      <text 
        x="12" y="24" 
        fontFamily="var(--font-sans)" 
        fontSize="10" 
        fontWeight="600"
        fill="white"
        opacity="0.9"
      >
        N
      </text>
    </svg>
  )
}

NodeLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Git Logo - Branch icon
export function GitLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <rect 
        x="4" y="4" width="32" height="32" rx="4"
        fill="#F05032"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Branch lines */}
      <circle cx="14" cy="14" r="3" fill="white" opacity="0.9" />
      <circle cx="26" cy="14" r="3" fill="white" opacity="0.9" />
      <circle cx="20" cy="28" r="3" fill="white" opacity="0.9" />
      <path 
        d="M 14 17 L 14 22 Q 14 25 17 25 L 20 25 M 26 17 L 26 22 Q 26 25 23 25 L 20 25" 
        fill="none" 
        stroke="white" 
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}

GitLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Database/SQL Logo
export function DatabaseLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Cylinder top */}
      <ellipse 
        cx="20" cy="10" rx="14" ry="5" 
        fill="#4479A1"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Cylinder body */}
      <path 
        d="M 6 10 L 6 30 Q 6 35 20 35 Q 34 35 34 30 L 34 10"
        fill="#4479A1"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Middle line */}
      <ellipse 
        cx="20" cy="20" rx="14" ry="5" 
        fill="none"
        stroke="var(--editorial-ink)"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  )
}

DatabaseLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Docker Logo - Whale with containers
export function DockerLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Whale body */}
      <path 
        d="M 4 22 Q 4 28 10 28 L 32 28 Q 36 28 36 24 Q 36 20 32 20 L 8 20 Q 4 20 4 22 Z"
        fill="#2496ED"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Containers on whale */}
      <rect x="10" y="14" width="5" height="5" fill="#2496ED" stroke="var(--editorial-ink)" strokeWidth="0.5" opacity="0.9" />
      <rect x="16" y="14" width="5" height="5" fill="#2496ED" stroke="var(--editorial-ink)" strokeWidth="0.5" opacity="0.9" />
      <rect x="22" y="14" width="5" height="5" fill="#2496ED" stroke="var(--editorial-ink)" strokeWidth="0.5" opacity="0.9" />
      <rect x="16" y="8" width="5" height="5" fill="#2496ED" stroke="var(--editorial-ink)" strokeWidth="0.5" opacity="0.9" />
      {/* Whale tail */}
      <path 
        d="M 4 20 Q 2 16 6 14"
        fill="none"
        stroke="#2496ED"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  )
}

DockerLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// AWS/Cloud Logo
export function CloudLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <path 
        d="M 10 28 Q 4 28 4 22 Q 4 16 10 16 Q 10 10 18 10 Q 26 10 28 16 Q 34 16 34 22 Q 34 28 28 28 Z"
        fill="#FF9900"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
    </svg>
  )
}

CloudLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// TypeScript Logo
export function TypeScriptLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <rect 
        x="4" y="4" width="32" height="32" rx="2"
        fill="#3178C6"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      <text 
        x="9" y="30" 
        fontFamily="var(--font-sans)" 
        fontSize="16" 
        fontWeight="600"
        fill="white"
        opacity="0.9"
      >
        TS
      </text>
    </svg>
  )
}

TypeScriptLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Go/Golang Logo
export function GoLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <rect 
        x="4" y="8" width="32" height="24" rx="3"
        fill="#00ADD8"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      <text 
        x="9" y="26" 
        fontFamily="var(--font-sans)" 
        fontSize="14" 
        fontWeight="600"
        fill="white"
        opacity="0.9"
      >
        Go
      </text>
    </svg>
  )
}

GoLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Rust Logo - Gear shape
export function RustLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Gear outer */}
      <circle 
        cx="20" cy="20" r="15" 
        fill="#DEA584"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Gear teeth */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <rect 
          key={i}
          x="18" y="3" width="4" height="6" rx="1"
          fill="#DEA584"
          stroke="var(--editorial-ink)"
          strokeWidth="0.5"
          transform={`rotate(${angle} 20 20)`}
        />
      ))}
      {/* Inner circle */}
      <circle 
        cx="20" cy="20" r="8" 
        fill="var(--editorial-bg)"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.9"
      />
      <text 
        x="14" y="24" 
        fontFamily="var(--font-sans)" 
        fontSize="10" 
        fontWeight="600"
        fill="var(--editorial-ink)"
        opacity="0.7"
      >
        R
      </text>
    </svg>
  )
}

RustLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Generic/Algorithm Logo - Binary tree
export function AlgorithmLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Tree nodes */}
      <circle cx="20" cy="8" r="4" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="10" cy="22" r="4" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="30" cy="22" r="4" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="5" cy="34" r="3" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="15" cy="34" r="3" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="25" cy="34" r="3" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <circle cx="35" cy="34" r="3" fill="#9B59B6" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      {/* Connecting lines */}
      <path d="M 20 12 L 10 18 M 20 12 L 30 18" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
      <path d="M 10 26 L 5 31 M 10 26 L 15 31" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
      <path d="M 30 26 L 25 31 M 30 26 L 35 31" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

AlgorithmLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// System Design Logo - Architecture
export function SystemLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Boxes */}
      <rect x="4" y="4" width="12" height="10" rx="1" fill="#34495E" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <rect x="24" y="4" width="12" height="10" rx="1" fill="#34495E" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      <rect x="14" y="26" width="12" height="10" rx="1" fill="#34495E" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.85" />
      {/* Connections */}
      <path d="M 10 14 L 10 20 L 20 20 L 20 26" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
      <path d="M 30 14 L 30 20 L 20 20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

SystemLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// AI/GenAI Logo - Brain/neural network
export function AILogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      {/* Brain circle background */}
      <circle 
        cx="20" cy="20" r="16" 
        fill="#8B5CF6"
        stroke="var(--editorial-ink)"
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Neural connections */}
      <circle cx="12" cy="14" r="3" fill="white" opacity="0.9" />
      <circle cx="28" cy="14" r="3" fill="white" opacity="0.9" />
      <circle cx="20" cy="12" r="2.5" fill="white" opacity="0.9" />
      <circle cx="14" cy="24" r="2.5" fill="white" opacity="0.9" />
      <circle cx="26" cy="24" r="2.5" fill="white" opacity="0.9" />
      <circle cx="20" cy="28" r="3" fill="white" opacity="0.9" />
      {/* Connection lines */}
      <path 
        d="M 12 14 L 20 12 L 28 14 M 12 14 L 14 24 M 28 14 L 26 24 M 14 24 L 20 28 L 26 24 M 20 12 L 20 28" 
        fill="none" 
        stroke="white" 
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  )
}

AILogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Generic path logo for unknown types
export function GenericPathLogo({ size = 40, className = '' }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 40 40" 
      className={className}
    >
      <path 
        d="M 8 32 Q 12 24 20 20 Q 28 16 32 8"
        fill="none"
        stroke="var(--editorial-ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="4 3"
        opacity="0.5"
      />
      <circle cx="8" cy="32" r="4" fill="var(--editorial-ink)" opacity="0.3" stroke="var(--editorial-ink)" strokeWidth="1" />
      <circle cx="32" cy="8" r="4" fill="var(--editorial-ink)" opacity="0.6" stroke="var(--editorial-ink)" strokeWidth="1" />
    </svg>
  )
}

GenericPathLogo.propTypes = { size: PropTypes.number, className: PropTypes.string }

// Logo selector by technology type
export function TechLogo({ type, size = 40, className = '' }) {
  const logos = {
    'python': PythonLogo,
    'javascript': JavaScriptLogo,
    'js': JavaScriptLogo,
    'react': ReactLogo,
    'node': NodeLogo,
    'nodejs': NodeLogo,
    'git': GitLogo,
    'database': DatabaseLogo,
    'sql': DatabaseLogo,
    'docker': DockerLogo,
    'cloud': CloudLogo,
    'aws': CloudLogo,
    'typescript': TypeScriptLogo,
    'ts': TypeScriptLogo,
    'go': GoLogo,
    'golang': GoLogo,
    'rust': RustLogo,
    'algorithm': AlgorithmLogo,
    'dsa': AlgorithmLogo,
    'system': SystemLogo,
    'system-design': SystemLogo,
    'ai': AILogo,
    'genai': AILogo,
    'code': GenericPathLogo
  }
  
  const LogoComponent = logos[type?.toLowerCase()] || GenericPathLogo
  
  return <LogoComponent size={size} className={className} />
}

TechLogo.propTypes = {
  type: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string
}

export default TechLogo
