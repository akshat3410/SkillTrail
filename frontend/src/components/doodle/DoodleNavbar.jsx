import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

// Hand-drawn logo icon
const DoodleLogo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
    <path 
      d="M18 4L6 10L18 16L30 10L18 4Z" 
      fill="var(--doodle-yellow)"
      stroke="var(--doodle-stroke)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M6 26L18 32L30 26" 
      stroke="var(--doodle-stroke)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    <path 
      d="M6 18L18 24L30 18" 
      stroke="var(--doodle-stroke)" 
      strokeWidth="2.5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
  </svg>
)

/**
 * Navigation link component with active state
 */
function NavLink({ to, children, color = 'yellow' }) {
  const location = useLocation()
  const isActive = location.pathname === to
  
  const colorMap = {
    yellow: 'var(--doodle-yellow-light)',
    blue: 'var(--doodle-blue-light)',
    mint: 'var(--doodle-mint-light)',
    pink: 'var(--doodle-pink-light)'
  }
  
  return (
    <Link 
      to={to}
      className="px-4 py-2 font-['Patrick_Hand'] text-lg rounded-xl transition-all duration-200"
      style={{ 
        color: isActive ? 'var(--doodle-text)' : 'var(--doodle-text-muted)', 
        textDecoration: 'none',
        background: isActive ? colorMap[color] : 'transparent',
        transform: isActive ? 'rotate(-1deg)' : 'none'
      }}
    >
      {children}
    </Link>
  )
}

/**
 * Doodle-style navigation bar with updated links
 */
export function DoodleNavbar() {
  const { user, isAuthenticated } = useAuth()

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
      style={{ 
        background: 'var(--doodle-bg)',
        borderBottom: '2.5px solid var(--doodle-stroke)'
      }}
    >
      <div className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center gap-2 no-underline"
          style={{ color: 'var(--doodle-text)' }}
        >
          <DoodleLogo />
          <span className="font-['Caveat'] text-3xl font-semibold">SkillTrail</span>
        </Link>

        {/* Navigation Links - Always visible */}
        <div className="hidden md:flex items-center gap-1">
          <NavLink to="/" color="yellow">Home</NavLink>
          <NavLink to="/roadmaps" color="blue">Roadmaps</NavLink>
          {isAuthenticated && (
            <NavLink to="/journey" color="mint">My Journey</NavLink>
          )}
        </div>

        {/* User Section */}
        <div className="flex items-center gap-4">
          {isAuthenticated && (
            <div className="flex items-center gap-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center font-['Caveat'] text-xl"
                style={{ 
                  background: 'var(--doodle-pink)',
                  border: '2px solid var(--doodle-stroke)'
                }}
              >
                {user?.user_metadata?.full_name?.[0] || '👤'}
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default DoodleNavbar
