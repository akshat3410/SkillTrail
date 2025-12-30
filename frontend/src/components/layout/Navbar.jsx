import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from '../ui/Button'

/**
 * Navigation bar component with auth state
 */
export function Navbar() {
  const { user, isAuthenticated, signOut, loading } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[var(--color-bg-primary)]/80 backdrop-blur-md border-b border-[var(--color-border)]">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-text-primary)]">
          <svg 
            width="28" 
            height="28" 
            viewBox="0 0 28 28" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path 
              d="M14 2L2 8L14 14L26 8L14 2Z" 
              stroke="url(#logoGradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2 20L14 26L26 20" 
              stroke="url(#logoGradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <path 
              d="M2 14L14 20L26 14" 
              stroke="url(#logoGradient)" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="logoGradient" x1="2" y1="14" x2="26" y2="14" gradientUnits="userSpaceOnUse">
                <stop stopColor="var(--color-accent-blue)" />
                <stop offset="1" stopColor="var(--color-accent-green)" />
              </linearGradient>
            </defs>
          </svg>
          <span className="font-semibold text-lg">SkillTrail</span>
        </Link>

        {/* Navigation Links */}
        {isAuthenticated && (
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              Roadmaps
            </Link>
            <Link 
              to="/journey" 
              className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
            >
              My Journey
            </Link>
          </div>
        )}

        {/* Auth Section */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="spinner" />
          ) : isAuthenticated ? (
            <>
              <div className="flex items-center gap-3">
                {user?.user_metadata?.avatar_url && (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt={user.user_metadata.full_name || 'User'} 
                    className="w-8 h-8 rounded-full border border-[var(--color-border)]"
                  />
                )}
                <span className="hidden md:block text-sm text-[var(--color-text-secondary)]">
                  {user?.user_metadata?.full_name || user?.email}
                </span>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="primary" size="sm">
                Get Started
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
