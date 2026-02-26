"use client"

/**
 * Compass - Brand watermark
 * 
 * A subtle compass SVG fixed in the bottom-right corner of the page.
 * Non-interactive, decorative-only.
 */
export default function Compass({ opacity = 0.12, size = 90 }) {
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1.5rem',
        right: '1.5rem',
        width: `${size}px`,
        height: `${size}px`,
        opacity,
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        {/* Outer ring */}
        <circle cx="50" cy="50" r="46" stroke="#888" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="42" stroke="#aaa" strokeWidth="0.5" />

        {/* Tick marks */}
        {[0, 90, 180, 270].map((angle) => (
          <line
            key={`major-${angle}`}
            x1="50"
            y1="6"
            x2="50"
            y2="14"
            stroke="#777"
            strokeWidth="1.5"
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}
        {[45, 135, 225, 315].map((angle) => (
          <line
            key={`minor-${angle}`}
            x1="50"
            y1="8"
            x2="50"
            y2="13"
            stroke="#aaa"
            strokeWidth="0.8"
            strokeLinecap="round"
            transform={`rotate(${angle} 50 50)`}
          />
        ))}

        {/* Cardinal labels */}
        <text x="50" y="22" textAnchor="middle" fontSize="7" fontFamily="Inter, sans-serif" fontWeight="600" fill="#666">N</text>
        <text x="50" y="94" textAnchor="middle" fontSize="6" fontFamily="Inter, sans-serif" fill="#999">S</text>
        <text x="88" y="53" textAnchor="middle" fontSize="6" fontFamily="Inter, sans-serif" fill="#999">E</text>
        <text x="12" y="53" textAnchor="middle" fontSize="6" fontFamily="Inter, sans-serif" fill="#999">W</text>

        {/* Inner decorative circle */}
        <circle cx="50" cy="50" r="28" stroke="#bbb" strokeWidth="0.5" />

        {/* Compass needle - North (dark) */}
        <polygon
          points="50,24 46,50 54,50"
          fill="#555"
        />
        {/* Compass needle - South (light) */}
        <polygon
          points="50,76 46,50 54,50"
          fill="#ccc"
        />

        {/* Center pin */}
        <circle cx="50" cy="50" r="3.5" fill="#888" />
        <circle cx="50" cy="50" r="1.5" fill="#ddd" />
      </svg>
    </div>
  )
}
