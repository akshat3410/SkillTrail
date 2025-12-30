import { useState, useEffect, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import { api } from '../lib/api'
import * as localProgress from '../lib/localProgress'
import { EditorialNav } from '../components/editorial'
import { TrailContainer } from '../components/journey'
import '../styles/journey.css'

/**
 * RoadmapPage - Trail Experience
 * 
 * The learner walks a path, not reads a syllabus.
 * Uses local storage for progress - no auth required.
 * Trail state persists across reloads.
 */
export function RoadmapPage() {
  const { id } = useParams()
  
  const [roadmap, setRoadmap] = useState(null)
  const [nodes, setNodes] = useState([])
  const [progress, setProgress] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data and load local progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        
        // Fetch roadmap and nodes from API
        const [roadmapData, nodesData] = await Promise.all([
          api.getRoadmap(id),
          api.getNodes(id)
        ])
        
        setRoadmap(roadmapData)
        setNodes(nodesData)
        
        // Load progress - try multiple possible IDs for compatibility
        const roadmapId = roadmapData?.id || id
        let localProg = localProgress.getProgress(roadmapId)
        
        // Only check legacy fallbacks if we are on the Git roadmap (or legacy default)
        const isGitRoadmap = roadmapId === 'git-github' || roadmapId === '1' || roadmapId === 'git-fundamentals'
        
        if (Object.keys(localProg).length === 0 && isGitRoadmap) {
          localProg = localProgress.getProgress('git-github')
        }
        if (Object.keys(localProg).length === 0 && isGitRoadmap) {
          localProg = localProgress.getProgress('default')
        }
        setProgress(localProg)
        
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  // Refresh progress when page becomes visible (after navigating back)
  useEffect(() => {
    const refreshProgress = () => {
      // Use roadmap.id if available (matches what TopicPage saves to)
      const roadmapId = roadmap?.id || id
      let localProg = localProgress.getProgress(roadmapId)
      
      // Only check legacy fallbacks if we are on the Git roadmap
      const isGitRoadmap = roadmapId === 'git-github' || roadmapId === '1' || roadmapId === 'git-fundamentals'
      
      if (Object.keys(localProg).length === 0 && isGitRoadmap) {
        localProg = localProgress.getProgress('git-github')
      }
      if (Object.keys(localProg).length === 0 && isGitRoadmap) {
        localProg = localProgress.getProgress('default')
      }
      
      setProgress(localProg)
    }

    // Listen for visibility changes (tab becomes visible)
    const handleVisibility = () => {
      if (document.visibilityState === 'visible') {
        refreshProgress()
      }
    }

    // Listen for focus (window gets focus)
    const handleFocus = () => {
      refreshProgress()
    }

    // Listen for storage changes (from other tabs)
    const handleStorage = (e) => {
      if (e.key === 'skilltrail_progress') {
        refreshProgress()
      }
    }

    // Listen for custom progress update event (immediate sync)
    const handleProgressUpdate = () => {
      refreshProgress()
    }

    // Refresh on mount (in case we navigated back)
    refreshProgress()

    document.addEventListener('visibilitychange', handleVisibility)
    window.addEventListener('focus', handleFocus)
    window.addEventListener('storage', handleStorage)
    window.addEventListener('skilltrail-progress-update', handleProgressUpdate)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      window.removeEventListener('focus', handleFocus)
      window.removeEventListener('storage', handleStorage)
      window.removeEventListener('skilltrail-progress-update', handleProgressUpdate)
    }
  }, [id, roadmap])

  // Sort nodes by order
  const sortedNodes = useMemo(() => 
    [...nodes].sort((a, b) => a.order_index - b.order_index), 
    [nodes]
  )

  // Find current index (first not completed) - derived from local progress
  const currentIndex = useMemo(() => {
    const idx = sortedNodes.findIndex(n => {
      const status = progress[n.id]
      return !status || status === 'not_started' || status === 'in_progress'
    })
    return idx === -1 ? sortedNodes.length - 1 : idx
  }, [sortedNodes, progress])

  // Completed count
  const completedCount = useMemo(() => {
    return Object.values(progress).filter(s => s === 'completed').length
  }, [progress])

  if (loading) {
    return (
      <>
        <EditorialNav />
        <div style={{ 
          background: 'var(--editorial-bg)', 
          minHeight: '100vh', 
          paddingTop: '50vh',
          textAlign: 'center'
        }}>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-muted)'
          }}>
            Finding the path...
          </p>
        </div>
      </>
    )
  }

  if (error || !roadmap) {
    return (
      <>
        <EditorialNav />
        <div style={{ 
          background: 'var(--editorial-bg)', 
          minHeight: '100vh', 
          paddingTop: '40vh',
          textAlign: 'center',
          padding: '40vh 1.5rem 4rem'
        }}>
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1rem',
            color: 'var(--editorial-ink-light)',
            marginBottom: '1.5rem'
          }}>
            The path seems unclear.
          </p>
          <Link 
            to="/roadmaps" 
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: 'var(--editorial-ink-muted)',
              textDecoration: 'none'
            }}
          >
            ← return to the crossroads
          </Link>
        </div>
      </>
    )
  }

  return (
    <>
      <EditorialNav />
      
      <div style={{ 
        background: 'var(--editorial-bg)', 
        minHeight: '100vh', 
        paddingTop: '5rem'
      }}>
        {/* Header - minimal */}
        <header style={{
          textAlign: 'center',
          padding: '2rem 1.5rem 1rem',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          <Link
            to="/roadmaps"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.7rem',
              fontStyle: 'italic',
              color: 'var(--editorial-ink-muted)',
              textDecoration: 'none',
              display: 'block',
              marginBottom: '1.5rem',
              opacity: 0.5
            }}
          >
            ← all paths
          </Link>

          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
            color: 'var(--editorial-ink)',
            fontWeight: 400,
            marginBottom: '0.75rem',
            letterSpacing: '-0.01em'
          }}>
            {roadmap.title}
          </h1>

          {roadmap.description && (
            <p style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.85rem',
              fontStyle: 'italic',
              color: 'var(--editorial-ink-muted)',
              lineHeight: 1.5,
              marginBottom: '1rem'
            }}>
              {roadmap.description}
            </p>
          )}

          {/* Progress indicator */}
          {sortedNodes.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              marginTop: '1rem'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                color: 'var(--editorial-ink-muted)'
              }}>
                {completedCount} of {sortedNodes.length} steps completed
              </span>
              
              {/* Mini progress bar */}
              <div style={{
                width: '60px',
                height: '3px',
                background: 'rgba(42, 42, 42, 0.1)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${(completedCount / sortedNodes.length) * 100}%`,
                  height: '100%',
                  background: 'var(--editorial-ink)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
          )}
        </header>

        {/* Scroll invitation */}
        <div style={{
          textAlign: 'center',
          padding: '2rem 0 3rem',
          opacity: 0.4
        }}>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.7rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-muted)'
          }}>
            scroll to walk the path
          </span>
        </div>

        {/* The Trail */}
        <TrailContainer
          nodes={sortedNodes}
          progress={progress}
          currentIndex={currentIndex}
        />

        {/* End marker */}
        <footer style={{
          textAlign: 'center',
          padding: '3rem 1.5rem 4rem',
          opacity: 0.3
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" style={{ display: 'block', margin: '0 auto' }}>
            <circle cx="8" cy="8" r="6" fill="none" stroke="var(--editorial-ink)" strokeWidth="1"/>
            <circle cx="8" cy="8" r="2" fill="var(--editorial-ink)"/>
          </svg>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.65rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-muted)',
            marginTop: '1rem'
          }}>
            {completedCount === sortedNodes.length 
              ? 'journey complete' 
              : 'the path continues'
            }
          </p>
        </footer>
      </div>
    </>
  )
}

export default RoadmapPage
