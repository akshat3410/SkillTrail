import { Link } from 'react-router-dom'
import { EditorialNav } from '../components/editorial'
import '../styles/journey.css'

/**
 * JourneyPage - Overview of user's learning journeys
 * 
 * Shows progress across all roadmaps the user has started.
 */
export function JourneyPage() {
  return (
    <>
      <EditorialNav />
      
      <div className="journey-page">
        <header className="journey-header">
          <h1 className="journey-title">Your Journey</h1>
          <p className="journey-subtitle">
            Every expert was once a beginner. Keep walking.
          </p>
        </header>
        
        <div style={{
          maxWidth: '600px',
          margin: '0 auto',
          padding: '2rem',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            color: 'var(--trail-ink-muted)',
            marginBottom: '2rem'
          }}>
            Your learning trails will appear here as you progress.
          </p>
          
          <Link 
            to="/roadmaps"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.9rem',
              color: 'var(--trail-ink)',
              textDecoration: 'none',
              padding: '0.75rem 1.5rem',
              border: '1px solid var(--trail-ink)',
              borderRadius: '2px'
            }}
          >
            Browse Roadmaps →
          </Link>
        </div>
      </div>
    </>
  )
}

export default JourneyPage
