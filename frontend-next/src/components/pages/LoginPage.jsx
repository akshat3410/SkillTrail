"use client"
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'

/*
 * LoginPage — Auth Entry
 *
 * Implements Phase 7 Screen Design from auth_design_spec.md
 * Split-screen layout: Visual Column (Left) + Form Column (Right)
 */

// ── Components ──

function AuthInput({ label, type = 'text', value, onChange, placeholder }) {
  const [focused, setFocused] = useState(false)

  return (
    <div style={{ marginBottom: 'var(--st-space-lg)' }}>
      <label style={{
        display: 'block',
        fontFamily: 'var(--st-font-body)',
        fontSize: '0.8rem',
        fontWeight: 500,
        color: 'var(--st-ink)',
        marginBottom: '0.4rem',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '0.75rem var(--st-space-md)',
          fontFamily: 'var(--st-font-body)',
          fontSize: '0.95rem',
          color: 'var(--st-ink)',
          background: 'var(--st-surface)',
          border: `1px solid ${focused ? 'var(--st-accent)' : 'var(--st-border)'}`,
          borderRadius: 'var(--st-radius-btn)',
          outline: 'none',
          transition: 'border-color 200ms ease, box-shadow 200ms ease',
          boxShadow: focused ? '0 0 0 3px var(--st-accent-glow)' : 'none',
        }}
      />
    </div>
  )
}

function AuthButton({ children, onClick, loading, variant = 'primary' }) {
  const isPrimary = variant === 'primary'
  
  return (
    <button
      onClick={onClick}
      disabled={loading}
      style={{
        width: '100%',
        padding: '0.85rem',
        fontFamily: 'var(--st-font-body)',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: isPrimary ? 'var(--st-surface)' : 'var(--st-ink)',
        background: isPrimary ? 'var(--st-ink)' : 'transparent',
        border: isPrimary ? 'none' : '1px solid var(--st-border)',
        borderRadius: 'var(--st-radius-btn)',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        transition: 'all 200ms ease',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
      }}
      onMouseEnter={(e) => {
        if (!loading) {
          e.currentTarget.style.transform = 'translateY(-1px)'
          if (isPrimary) e.currentTarget.style.opacity = '0.9'
          else e.currentTarget.style.background = 'var(--st-surface-raised)'
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        if (isPrimary) e.currentTarget.style.opacity = '1'
        else e.currentTarget.style.background = 'transparent'
      }}
    >
      {loading ? (
        <span style={{
          width: '16px', height: '16px',
          border: '2px solid currentColor',
          borderRightColor: 'transparent',
          borderRadius: '50%',
          animation: 'spin 0.6s linear infinite',
        }} />
      ) : children}
    </button>
  )
}

function Divider({ label }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      margin: 'var(--st-space-xl) 0',
    }}>
      <div style={{ flex: 1, height: '1px', background: 'var(--st-border)' }} />
      <span style={{
        fontFamily: 'var(--st-font-body)',
        fontSize: '0.8rem', color: 'var(--st-ink-muted)',
      }}>{label}</span>
      <div style={{ flex: 1, height: '1px', background: 'var(--st-border)' }} />
    </div>
  )
}

// ── Icons ──

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
)

// ── Main Page ──

export default function LoginPage() {
  const { signInWithGoogle, signInWithGitHub, isAuthenticated, loading } = useAuth()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    if (isAuthenticated) router.push('/')
  }, [isAuthenticated, router])

  const handleSocialLogin = async (provider) => {
    try {
      if (provider === 'google') await signInWithGoogle()
      if (provider === 'github') await signInWithGitHub()
    } catch (err) {
      console.error(err)
      setError('Connection failed. Please try again.')
    }
  }

  const handleEmailLogin = (e) => {
    e.preventDefault()
    // Placeholder for email auth - normally would call signInWithEmail
    setError('Email login is currently disabled for this demo. Please use Google or GitHub.')
  }

  return (
    <>
      
      <main style={{
        minHeight: '100vh',
        background: 'var(--st-surface)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 var(--st-space-lg)',
      }}>
        <div style={{
          width: '100%',
          maxWidth: '900px',
          display: 'grid',
          gridTemplateColumns: 'minmax(300px, 1fr) 1fr',
          gap: 'var(--st-space-3xl)',
          alignItems: 'center',
        }}>

          {/* § Left Column: Visual Context (Phase 3 Spec) */}
          <div className="login-visual" style={{
            display: 'flex', flexDirection: 'column', gap: 'var(--st-space-lg)',
          }}>
            {/* Compass Icon */}
            <div style={{
              width: '48px', height: '48px',
              borderRadius: '50%',
              background: 'var(--st-surface-raised)',
              border: '1px solid var(--st-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--st-accent)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
              </svg>
            </div>

            <h2 style={{
              fontFamily: 'var(--st-font-display)',
              fontSize: '2rem', fontWeight: 400,
              color: 'var(--st-ink)',
              margin: 0,
              lineHeight: 1.2,
            }}>
              Keep your progress safe.
            </h2>
            <p style={{
              fontFamily: 'var(--st-font-serif)',
              fontSize: '1rem',
              color: 'var(--st-ink-secondary)',
              maxWidth: '320px',
              lineHeight: 1.6,
              margin: 0,
            }}>
              Sync your trail across devices and never lose a checkpoint. Your logbook is waiting.
            </p>

            {/* Mini Trail Visual */}
            <div style={{
              marginTop: 'var(--st-space-xl)',
              padding: '1.5rem',
              background: 'var(--st-surface-raised)',
              borderRadius: 'var(--st-radius-card)',
              border: '1px solid var(--st-border)',
              maxWidth: '300px',
            }}>
              <div style={{
                fontFamily: 'var(--st-font-body)',
                fontSize: '0.65rem',
                color: 'var(--st-ink-muted)',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}>Recent Activity</div>
              
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--st-ink)' }} />
                   <div style={{ width: '2px', height: '20px', background: 'var(--st-ink)' }} />
                   <div style={{ width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--st-accent)' }} />
                </div>
                <div>
                   <div style={{ fontFamily: 'var(--st-font-body)', fontSize: '0.8rem', color: 'var(--st-ink)', fontWeight: 500 }}>Introduction</div>
                   <div style={{ height: '22px' }} />
                   <div style={{ fontFamily: 'var(--st-font-body)', fontSize: '0.8rem', color: 'var(--st-ink)' }}>First Commit</div>
                   <div style={{ fontFamily: 'var(--st-font-body)', fontSize: '0.7rem', color: 'var(--st-accent)', marginTop: '0.2rem' }}>Current Step</div>
                </div>
              </div>
            </div>
          </div>

          {/* § Right Column: Form (Phase 3 Spec) */}
          <div style={{
            background: 'var(--st-surface)',
            padding: '2.5rem',
            borderRadius: 'var(--st-radius-card)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: '1px solid var(--st-border)',
          }}>
            <h1 style={{
              fontFamily: 'var(--st-font-display)',
              fontSize: '1.5rem', fontWeight: 500,
              color: 'var(--st-ink)',
              margin: '0 0 var(--st-space-xl)',
            }}>Log Book</h1>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <AuthButton onClick={() => handleSocialLogin('google')} variant="secondary">
                <GoogleIcon /> Continue with Google
              </AuthButton>
              <AuthButton onClick={() => handleSocialLogin('github')} variant="secondary">
                <GitHubIcon /> Continue with GitHub
              </AuthButton>
            </div>

            <Divider label="or" />

            <form onSubmit={handleEmailLogin}>
              <AuthInput
                label="Email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <AuthInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              
              {error && (
                <div style={{
                  padding: '0.75rem',
                  marginBottom: '1rem',
                  fontSize: '0.8rem',
                  color: '#D32F2F',
                  background: '#FFEBEE',
                  borderRadius: 'var(--st-radius-btn)',
                }}>
                  {error}
                </div>
              )}

              <AuthButton loading={loading}>
                Access Log Book
              </AuthButton>
            </form>
          </div>
        </div>

        <style jsx global>{`
          @media (max-width: 800px) {
            .login-visual {
              display: none !important;
            }
          }
        `}</style>
      </main>
    </>
  )
}
