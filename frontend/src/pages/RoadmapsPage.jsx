import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { EditorialNav } from '../components/editorial'
import { TechLogo } from '../components/roadmaps/TechLogos'
import { RoadmapRequestForm } from '../components/roadmaps/StoryRoadmapCard'
import api from '../lib/api'

/**
 * RoadmapsPage - Confident, intentional, human
 * Fast scanning. Calm guidance. Distinctly SkillTrail.
 */

// Fallback roadmaps shown while loading or if API fails
const fallbackRoadmaps = [
  {
    id: 'git-github',
    title: 'Git & GitHub',
    description: 'Master version control from first commit to team collaboration.',
    tech: 'git',
    status: 'available',
    topics: 13,
    isStartingPoint: true,
    hint: 'Most learners start here'
  },
  {
    id: 'genai-prompting',
    title: 'Generative AI & Prompt Engineering',
    description: 'Master AI tools from basics to advanced prompting techniques.',
    tech: 'ai',
    status: 'available',
    topics: 27,
    isStartingPoint: false,
    hint: 'The future of productivity'
  }
]

// Map roadmap IDs to tech icons
const techMapping = {
  'git-github': 'git',
  'genai-prompting': 'ai',
  'javascript': 'javascript',
  'react': 'react',
  'python': 'python',
  'sql': 'database'
}

// Count nodes for each roadmap (we'll fetch this)
const defaultTopicCounts = {
  'git-github': 13,
  'genai-prompting': 28
}


function RoadmapCard({ roadmap, index }) {
  const cardRef = useRef(null)
  const isAvailable = roadmap.status === 'available' || true // All DB roadmaps are available
  const isStart = roadmap.isStartingPoint || index === 0
  const tech = roadmap.tech || techMapping[roadmap.id] || 'code'

  useEffect(() => {
    if (!cardRef.current) return

    gsap.set(cardRef.current, { opacity: 0, y: 12 })
    const anim = gsap.to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      delay: index * 0.04,
      ease: 'power2.out'
    })

    return () => anim.kill()
  }, [index])

  const CardWrapper = isAvailable ? Link : 'div'
  const cardProps = isAvailable ? { to: `/roadmap/${roadmap.id}` } : {}

  return (
    <div style={{ position: 'relative' }}>
      {/* Hand-drawn arrow pointing to start */}
      {isStart && (
        <svg
          width="50"
          height="30"
          viewBox="0 0 50 30"
          style={{
            position: 'absolute',
            top: '-28px',
            left: '20px',
            opacity: 0.5
          }}
        >
          <path
            d="M 5 5 Q 20 8 30 20 L 25 16 M 30 20 L 28 12"
            fill="none"
            stroke="var(--editorial-ink)"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <text
            x="32"
            y="10"
            fontFamily="var(--font-display)"
            fontSize="8"
            fill="var(--editorial-ink)"
            fontStyle="italic"
          >
            start
          </text>
        </svg>
      )}

      <CardWrapper
        ref={cardRef}
        {...cardProps}
        style={{
          display: 'block',
          padding: '1.25rem',
          background: isStart 
            ? 'linear-gradient(135deg, rgba(245, 240, 235, 0.6) 0%, var(--editorial-bg) 100%)'
            : 'var(--editorial-bg)',
          border: isStart 
            ? '1.5px solid var(--editorial-ink)' 
            : '1px solid var(--editorial-grid)',
          borderRadius: '4px',
          textDecoration: 'none',
          cursor: isAvailable ? 'pointer' : 'default',
          opacity: isAvailable ? 1 : 0.5,
          transition: 'transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => {
          if (isAvailable) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'
            e.currentTarget.style.borderColor = 'var(--editorial-ink)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
          e.currentTarget.style.borderColor = isStart 
            ? 'var(--editorial-ink)' 
            : 'var(--editorial-grid)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          {/* Logo in organic container */}
          <div
            style={{
              flexShrink: 0,
              width: '54px',
              height: '54px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: isStart 
                ? 'rgba(255, 248, 240, 0.8)' 
                : 'rgba(248, 248, 248, 0.6)',
              borderRadius: '12px',
              position: 'relative',
              border: '1px solid rgba(0,0,0,0.06)'
            }}
          >
            {/* Organic hand-drawn shape behind logo */}
            <svg
              style={{
                position: 'absolute',
                top: '-3px',
                left: '-3px',
                width: 'calc(100% + 6px)',
                height: 'calc(100% + 6px)',
                pointerEvents: 'none'
              }}
              viewBox="0 0 60 60"
            >
              <path
                d="M 8 15 Q 5 8 15 5 Q 30 3 45 5 Q 55 8 55 15 Q 57 30 55 45 Q 52 55 45 55 Q 30 57 15 55 Q 5 52 5 45 Q 3 30 8 15"
                fill="none"
                stroke="var(--editorial-ink)"
                strokeWidth="0.8"
                opacity="0.12"
              />
            </svg>
            <TechLogo type={tech} size={34} />
          </div>

          {/* Content */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              marginBottom: '0.25rem' 
            }}>
              <h3 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '1.05rem',
                fontWeight: 500,
                color: 'var(--editorial-ink)',
                margin: 0
              }}>
                {roadmap.title}
              </h3>
              
              {!isAvailable && (
                <span style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.55rem',
                  fontStyle: 'italic',
                  color: 'var(--editorial-ink-muted)',
                  opacity: 0.8
                }}>
                  soon
                </span>
              )}
            </div>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              color: 'var(--editorial-ink-light)',
              margin: 0,
              lineHeight: 1.5
            }}>
              {roadmap.tagline || roadmap.description}
            </p>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'space-between',
              marginTop: '0.6rem' 
            }}>
              <span style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.6rem',
                color: 'var(--editorial-ink-muted)',
                letterSpacing: '0.02em'
              }}>
                {roadmap.topics || defaultTopicCounts[roadmap.id] || '?'} topics
              </span>
              
              {isAvailable && (
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: 'var(--editorial-ink)',
                  letterSpacing: '0.04em'
                }}>
                  Begin →
                </span>
              )}
            </div>

            {/* Micro-guidance */}
            {roadmap.hint && (
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.6rem',
                fontStyle: 'italic',
                color: 'var(--editorial-ink-muted)',
                marginTop: '0.4rem',
                opacity: 0.65
              }}>
                ↳ {roadmap.hint}
              </p>
            )}
          </div>
        </div>
      </CardWrapper>
    </div>
  )
}

export default function RoadmapsPage() {
  const [showRequest, setShowRequest] = useState(false)
  const [roadmaps, setRoadmaps] = useState(fallbackRoadmaps)
  const [loading, setLoading] = useState(true)

  // Fetch roadmaps from API
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        const data = await api.getRoadmaps()
        if (data && data.length > 0) {
          // Transform API data for display
          const transformedRoadmaps = data.map((r, i) => ({
            ...r,
            tech: techMapping[r.id] || 'code',
            status: 'available',
            topics: defaultTopicCounts[r.id] || 10,
            isStartingPoint: i === 0,
            hint: i === 0 ? 'Most learners start here' : null
          }))
          setRoadmaps(transformedRoadmaps)
        }
      } catch (err) {
        console.error('Failed to fetch roadmaps:', err)
        // Keep fallback
      } finally {
        setLoading(false)
      }
    }
    fetchRoadmaps()
  }, [])

  return (
    <>
      <EditorialNav />

      <div style={{
        background: 'var(--editorial-bg)',
        minHeight: '100vh',
        paddingTop: '5.5rem'
      }}>
        {/* Paper texture */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.06
        }}>
          <svg width="100%" height="100%">
            <defs>
              <pattern id="paper-grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="var(--editorial-grid)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#paper-grid)" />
          </svg>
        </div>

        {/* Content */}
        <div style={{
          maxWidth: '780px',
          margin: '0 auto',
          padding: '0 1.5rem 4rem',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Header */}
          <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.75rem, 4.5vw, 2.5rem)',
              color: 'var(--editorial-ink)',
              marginBottom: '0.5rem',
              fontWeight: 400
            }}>
              Learning Paths
            </h1>

            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              color: 'var(--editorial-ink-light)',
              maxWidth: '340px',
              margin: '0 auto',
              lineHeight: 1.55
            }}>
              Pick a skill. Follow the path. Build real projects.
            </p>
          </header>

          {/* Quiet divider */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.75rem'
          }}>
            <div style={{ flex: 1, height: '1px', background: 'var(--editorial-grid)' }} />
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.55rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              opacity: 0.7
            }}>
              Choose your path
            </span>
            <div style={{ flex: 1, height: '1px', background: 'var(--editorial-grid)' }} />
          </div>

          {/* Roadmap grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.75rem 1.25rem',
            marginBottom: '2.5rem'
          }}>
            {roadmaps.map((roadmap, index) => (
              <RoadmapCard key={roadmap.id} roadmap={roadmap} index={index} />
            ))}
          </div>

          {/* Gentle separator */}
          <div style={{ 
            textAlign: 'center', 
            padding: '0.5rem 0 1.5rem',
            opacity: 0.3
          }}>
            <span style={{ 
              display: 'inline-block',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              background: 'var(--editorial-ink)',
              margin: '0 6px'
            }} />
            <span style={{ 
              display: 'inline-block',
              width: '3px',
              height: '3px',
              borderRadius: '50%',
              background: 'var(--editorial-ink)',
              margin: '0 6px'
            }} />
            <span style={{ 
              display: 'inline-block',
              width: '2px',
              height: '2px',
              borderRadius: '50%',
              background: 'var(--editorial-ink)',
              margin: '0 6px'
            }} />
          </div>

          {/* Request section with human tone */}
          <div style={{
            borderTop: '1px solid var(--editorial-grid)',
            paddingTop: '2rem',
            textAlign: 'center'
          }}>
            {!showRequest ? (
              <div>
                <p style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '0.9rem',
                  color: 'var(--editorial-ink-light)',
                  marginBottom: '0.5rem'
                }}>
                  Don't see what you're looking for?
                </p>
                
                {/* Human tone line */}
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.7rem',
                  fontStyle: 'italic',
                  color: 'var(--editorial-ink-muted)',
                  marginBottom: '1rem',
                  opacity: 0.65
                }}>
                  New paths are built from real learner requests.
                </p>

                <button
                  onClick={() => setShowRequest(true)}
                  style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--editorial-ink)',
                    background: 'transparent',
                    padding: '0.6rem 1.2rem',
                    border: '1px solid var(--editorial-ink)',
                    borderRadius: '2px',
                    cursor: 'pointer',
                    transition: 'background 0.15s ease, color 0.15s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--editorial-ink)'
                    e.currentTarget.style.color = 'var(--editorial-bg)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--editorial-ink)'
                  }}
                >
                  Request a Path
                </button>
              </div>
            ) : (
              <div style={{ maxWidth: '360px', margin: '0 auto' }}>
                <RoadmapRequestForm onSuccess={() => setShowRequest(false)} />
              </div>
            )}
          </div>

          {/* Footer */}
          <footer style={{
            marginTop: '3.5rem',
            textAlign: 'center',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--editorial-grid)'
          }}>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.65rem',
              fontStyle: 'italic',
              color: 'var(--editorial-ink-muted)',
              marginBottom: '0.5rem',
              opacity: 0.55
            }}>
              Every skill starts with choosing to begin.
            </p>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.55rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              opacity: 0.4
            }}>
              © 2024 SkillTrail
            </p>
          </footer>
        </div>
      </div>
    </>
  )
}
