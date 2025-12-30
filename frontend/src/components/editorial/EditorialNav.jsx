import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

/**
 * Editorial Navigation Component
 * Small, quiet, refined navigation
 * Thin typography, minimal visual weight
 */
export function EditorialNav({ className = '' }) {
  const location = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/roadmaps', label: 'Roadmaps' },
    { path: '/journey', label: 'Journey' }
  ]
  
  const isActive = (path) => {
    if (path === '/') return location.pathname === '/'
    return location.pathname.startsWith(path)
  }
  
  return (
    <header
      className={`editorial-nav ${className}`}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: 'rgba(245, 243, 239, 0.95)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--editorial-grid)'
      }}
    >
      <nav
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '1rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            color: 'var(--editorial-ink)',
            textDecoration: 'none',
            letterSpacing: '-0.02em'
          }}
        >
          SkillTrail
        </Link>
        
        {/* Desktop Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem'
          }}
          className="hidden md:flex"
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: isActive(link.path) 
                  ? 'var(--editorial-ink)' 
                  : 'var(--editorial-ink-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                transition: 'color 0.2s',
                paddingBottom: '2px',
                borderBottom: isActive(link.path) 
                  ? '1px solid var(--editorial-ink)' 
                  : '1px solid transparent'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            padding: '0.5rem',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}
          aria-label="Toggle menu"
        >
          <span
            style={{
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--editorial-ink)',
              transition: 'transform 0.2s',
              transform: isOpen ? 'rotate(45deg) translateY(5px)' : 'none'
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--editorial-ink)',
              opacity: isOpen ? 0 : 1,
              transition: 'opacity 0.2s'
            }}
          />
          <span
            style={{
              width: '20px',
              height: '1px',
              backgroundColor: 'var(--editorial-ink)',
              transition: 'transform 0.2s',
              transform: isOpen ? 'rotate(-45deg) translateY(-5px)' : 'none'
            }}
          />
        </button>
      </nav>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{
            padding: '1rem 1.5rem 2rem',
            borderTop: '1px solid var(--editorial-grid)',
            backgroundColor: 'var(--editorial-bg)'
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              style={{
                display: 'block',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive(link.path) 
                  ? 'var(--editorial-ink)' 
                  : 'var(--editorial-ink-muted)',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                padding: '0.75rem 0',
                borderBottom: '1px solid var(--editorial-grid-light)'
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}

EditorialNav.propTypes = {
  className: PropTypes.string
}

export default EditorialNav
