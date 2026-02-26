"use client"
import { useRef, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { gsap } from 'gsap'
import { TechLogo } from '@/components/roadmaps/TechLogos'
import { api } from '@/lib/api'

/*
 * RoadmapPage — Trail View
 *
 * Phase 8 Assembly:
 * 1. Navbar
 * 2. Trail Header (Logo + Title + Progress)
 * 3. Trail Stream (Vertical list of nodes)
 * 4. Trail Footer
 *
 * Styles: Uses --st-* design tokens (Phase 6)
 * Motion: Phase 7 rules (staggered entry)
 */

// ── Component: Node Row (Phase 5 #3) ──
function NodeRow({ node, index, status, isLast }) {
  const isDone = status === 'completed'
  const isCurrent = status === 'in_progress' || (!isDone && index === 0 && status !== 'completed') // Simple current logic for demo
  // In a real app, 'isCurrent' would be strictly next-up.

  const ref = useRef(null)

  return (
    <Link
      href={`/topic/${node.id}`}
      ref={ref}
      className={`st-node-row ${isCurrent ? 'current' : ''}`}
      data-animate-node
      style={{
        display: 'flex',
        gap: 'var(--st-space-md)',
        textDecoration: 'none',
        padding: 'var(--st-space-sm) 0',
        position: 'relative',
        opacity: 0, // Initial for animation
      }}
    >
      {/* Visual Track */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '24px',
        flexShrink: 0,
        paddingTop: '4px',
      }}>
        {/* Dot */}
        <div style={{
          width: isCurrent ? '16px' : '12px',
          height: isCurrent ? '16px' : '12px',
          borderRadius: '50%',
          background: isDone ? 'var(--st-ink)' : isCurrent ? 'var(--st-surface)' : 'var(--st-border)',
          border: isCurrent ? '3px solid var(--st-accent)' : 'none',
          boxShadow: isCurrent ? '0 0 0 6px var(--st-accent-glow)' : 'none',
          position: 'relative',
          zIndex: 2,
          transition: 'all 200ms ease',
        }}>
          {isDone && (
            <svg width="100%" height="100%" viewBox="0 0 12 12" style={{ padding: '2px' }}>
              <path d="M2.5 6 L4.5 9 L9.5 3" fill="none" stroke="var(--st-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>

        {/* Connector Line */}
        {!isLast && (
          <div style={{
            width: '2px',
            flex: 1,
            background: isDone ? 'var(--st-ink)' : 'var(--st-border)',
            marginTop: '4px',
            marginBottom: '4px',
            minHeight: '40px',
            transition: 'background 300ms ease',
          }} />
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        paddingBottom: 'var(--st-space-lg)',
        borderBottom: isLast ? 'none' : '1px solid var(--st-border-light)',
      }}>
        <h3 style={{
          fontFamily: 'var(--st-font-display)',
          fontSize: '1.2rem',
          fontWeight: isCurrent ? 600 : 500,
          color: isDone || isCurrent ? 'var(--st-ink)' : 'var(--st-ink-muted)',
          margin: '0 0 0.25rem',
          transition: 'color 200ms ease',
        }}>
          {node.title}
        </h3>
        <p style={{
          fontFamily: 'var(--st-font-body)',
          fontSize: '0.9rem',
          color: isCurrent ? 'var(--st-accent)' : 'var(--st-ink-muted)',
          margin: 0,
        }}>
          {isCurrent ? 'Current Step' : isDone ? 'Completed' : 'Upcoming'}
        </p>

        {isCurrent && (
          <div style={{
            marginTop: '0.75rem',
            display: 'inline-block',
            fontFamily: 'var(--st-font-body)',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            color: 'var(--st-accent)',
          }}>
            Continue Series →
          </div>
        )}
      </div>
    </Link>
  )
}


// ── Main Page ──

export default function RoadmapPage() {
  const params = useParams()
  const roadmapId = params.id
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        setLoading(true)
        const data = await api.getRoadmap(roadmapId)
        if (data) {
          // Sort nodes by order_index just to be safe, though usage might vary
          const sortedNodes = (data.nodes || []).sort((a, b) => a.order_index - b.order_index)
          setRoadmap({ ...data, nodes: sortedNodes })
        } else {
          setError('Roadmap not found')
        }
      } catch (err) {
        console.error(err)
        setError('Failed to load roadmap')
      } finally {
        setLoading(false)
      }
    }

    if (roadmapId) fetchRoadmap()
  }, [roadmapId])

  // Animation: Stagger in nodes (Phase 7 motion)
  useEffect(() => {
    if (!loading && roadmap && containerRef.current) {
      const nodes = containerRef.current.querySelectorAll('[data-animate-node]')
      gsap.fromTo(nodes,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.05, ease: 'power2.out', delay: 0.1 }
      )
    }
  }, [loading, roadmap])

  if (loading) {
    return (
      <>
        <div style={{
          minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--st-font-body)',
          color: 'var(--st-ink-muted)',
        }}>
          Loading trail...
        </div>
      </>
    )
  }

  if (error || !roadmap) {
    return (
      <>
        <div style={{
          minHeight: '100vh',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '1rem',
        }}>
          <div style={{ fontFamily: 'var(--st-font-display)', fontSize: '1.2rem' }}>Trail not found</div>
          <Link href="/" style={{
            fontFamily: 'var(--st-font-body)',
            textDecoration: 'underline',
            color: 'var(--st-ink)',
          }}>Return Home</Link>
        </div>
      </>
    )
  }

  // Calculate progress
  // For demo, we mock status. In real app, this comes from user profile/local storage.
  const currentNodeIndex = 0 // Mock: first node is current
  // Mock statuses based on index
  const getNodeStatus = (idx) => {
    if (idx < currentNodeIndex) return 'completed'
    if (idx === currentNodeIndex) return 'in_progress'
    return 'not_started'
  }

  const completedCount = 0
  const totalCount = roadmap.nodes.length

  return (
    <>

      <main style={{
        minHeight: '100vh',
        background: 'var(--st-surface)',
        paddingTop: '80px', // Navbar + spacing
        paddingBottom: 'var(--st-space-4xl)',
      }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 var(--st-space-lg)',
        }}>

          {/* § Trail Header — Phase 8, 3 */}
          <header style={{
            marginBottom: 'var(--st-space-3xl)',
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--st-space-md)',
            }}>
              <TechLogo type={roadmap.tech || 'code'} size={48} />
            </div>

            <h1 style={{
              fontFamily: 'var(--st-font-display)',
              fontSize: '2.5rem',
              fontWeight: 400,
              color: 'var(--st-ink)',
              margin: '0 0 var(--st-space-sm)',
              letterSpacing: '-0.02em',
            }}>
              {roadmap.title}
            </h1>

            <p style={{
              fontFamily: 'var(--st-font-serif)',
              fontSize: '1.1rem',
              color: 'var(--st-ink-secondary)',
              lineHeight: 1.6,
              maxWidth: '540px',
              margin: '0 auto var(--st-space-lg)',
            }}>
              {roadmap.description}
            </p>

            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 1rem',
              background: 'var(--st-surface-raised)',
              border: '1px solid var(--st-border)',
              borderRadius: '20px',
            }}>
              <div style={{
                width: '8px', height: '8px', borderRadius: '50%',
                background: completedCount > 0 ? 'var(--st-accent)' : 'var(--st-ink-muted)',
              }} />
              <span style={{
                fontFamily: 'var(--st-font-body)',
                fontSize: '0.75rem',
                fontWeight: 500,
                color: 'var(--st-ink)',
              }}>
                {completedCount} of {totalCount} steps complete
              </span>
            </div>
          </header>

          {/* § Trail Stream — Phase 8, 3 */}
          <div ref={containerRef} style={{
            position: 'relative',
            paddingLeft: '1rem', // Slight offset for visual balance
          }}>
            {/* Continuous line background guide (optional, but requested in design system Phase 4 "Vertical connector") */}
            <div style={{
              position: 'absolute',
              top: '12px',
              left: '22px', // Align with dot center (1rem padding + 12px half-width node track)
              bottom: '24px',
              width: '2px',
              background: 'var(--st-border-light)',
              zIndex: 0,
            }} />

            {roadmap.nodes.map((node, i) => (
              <NodeRow
                key={node.id}
                node={node}
                index={i}
                status={getNodeStatus(i)}
                isLast={i === roadmap.nodes.length - 1}
              />
            ))}
          </div>

          {/* § Trail Footer — Phase 8, 3 */}
          <footer style={{
            marginTop: 'var(--st-space-3xl)',
            textAlign: 'center',
            paddingTop: 'var(--st-space-xl)',
            borderTop: '1px solid var(--st-border-light)',
          }}>
            <p style={{
              fontFamily: 'var(--st-font-body)',
              fontSize: '0.8rem',
              color: 'var(--st-ink-muted)',
            }}>
              {totalCount} topics to master in this trail.
            </p>
          </footer>

        </div>
      </main>
    </>
  )
}
