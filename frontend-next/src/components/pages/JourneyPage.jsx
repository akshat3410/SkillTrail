"use client"
import Link from 'next/link'

/**
 * JourneyPage - Field Guide
 *
 * Adjusted to align with Phase 8 "Calm" Design System.
 * Removes legacy background animations for a cleaner look.
 */
export function JourneyPage() {
  return (
    <>
      
      <main style={{
        minHeight: '100vh',
        background: 'var(--st-surface)',
        paddingTop: '80px',
        paddingBottom: 'var(--st-space-4xl)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}>
        <div style={{
          maxWidth: '680px',
          width: '100%',
          padding: '0 var(--st-space-lg)',
          textAlign: 'center',
        }}>
          <header style={{
            marginBottom: 'var(--st-space-3xl)',
            marginTop: 'var(--st-space-2xl)',
          }}>
            <h1 style={{
              fontFamily: 'var(--st-font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              color: 'var(--st-ink)',
              marginBottom: 'var(--st-space-sm)',
            }}>
              Field Guide
            </h1>
            <p style={{
              fontFamily: 'var(--st-font-serif)',
              fontSize: '1.1rem',
              color: 'var(--st-ink-secondary)',
              maxWidth: '400px',
              margin: '0 auto',
            }}>
              Your active trails and learning history.
            </p>
          </header>
          
          <div className="atlas-glass" style={{
            padding: '3rem 2rem',
            borderRadius: 'var(--st-radius-card)',
            border: '1px solid var(--st-border-glass)',
          }}>
            <div style={{
              width: '48px', height: '48px',
              margin: '0 auto 1.5rem',
              borderRadius: '50%',
              background: 'var(--st-surface)',
              border: '1px solid var(--st-border)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'var(--st-ink-muted)',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
            </div>
            
            <p style={{
              fontFamily: 'var(--st-font-body)',
              color: 'var(--st-ink-muted)',
              marginBottom: '2rem',
            }}>
              You haven't started any trails yet.
            </p>
            
            <Link 
              href="/roadmaps"
              style={{
                fontFamily: 'var(--st-font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                color: 'var(--st-surface)',
                background: 'var(--st-ink)',
                textDecoration: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: 'var(--st-radius-btn)',
                display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.9'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Start an Expedition
            </Link>
          </div>
        </div>
      </main>
    </>
  )
}

export default JourneyPage
