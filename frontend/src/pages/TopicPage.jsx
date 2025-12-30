import { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { api } from '../lib/api'
import * as localProgress from '../lib/localProgress'
import { EditorialNav } from '../components/editorial'
import { LearningContent } from '../components/learning'
import '../styles/step.css'

// Sample content for demonstration when API doesn't provide content
const sampleContent = {
  'git': `## What is Git?

Git is a **distributed version control system** that tracks changes in your code over time.

### Why use version control?

- **Track changes**: See what changed, when, and by whom
- **Collaborate**: Work with others without overwriting each other's work
- **Experiment safely**: Create branches to try new ideas without breaking things
- **Undo mistakes**: Revert to any previous version instantly

### Your first Git commands

\`\`\`bash
# Initialize a new repository
git init

# Check the status of your files
git status

# Add files to staging
git add filename.js

# Commit your changes
git commit -m "Add new feature"
\`\`\`

### Key concepts

1. **Repository**: A folder where Git tracks all changes
2. **Commit**: A snapshot of your project at a moment in time
3. **Branch**: A parallel version of your code for experiments
4. **Remote**: A copy of your repository on a server (like GitHub)

Remember: Git doesn't automatically save. You decide when to commit.`,

  'branch': `## Understanding Branches

Branches let you work on different features without affecting the main code.

### Creating a branch

\`\`\`bash
# Create and switch to a new branch
git checkout -b feature-name

# Or in newer Git versions
git switch -c feature-name
\`\`\`

### The branching workflow

1. Create a branch for your feature
2. Make commits on that branch
3. Merge back into main when ready
4. Delete the branch

### Best practices

- Keep branches focused on one feature
- Use clear, descriptive names
- Merge frequently to avoid conflicts`,

  'default': `## Learning Step

This is where you'll find the main learning content for this step.

### What you'll learn

- Key concepts for this topic
- Practical examples you can try
- Common patterns and best practices

### Try it yourself

The best way to learn is by doing. As you read through this content, try the examples in your own environment.

Take notes below to reinforce what you learn.`
}

// Get sample content based on node title
function getSampleContent(title) {
  const lower = (title || '').toLowerCase()
  if (lower.includes('git') && !lower.includes('branch')) return sampleContent.git
  if (lower.includes('branch')) return sampleContent.branch
  return sampleContent.default
}

// Sample "why this matters" fallbacks
const whyMatters = {
  'git': "Version control is the foundation of modern development. Understanding this unlocks collaboration, experimentation, and the confidence to make changes without fear.",
  'branch': "Branching is how teams work in parallel. Master this, and you'll never be afraid to experiment.",
  'default': "Every step builds on the last. Take your time here — what you learn matters."
}

function getWhyMatters(title) {
  const lower = (title || '').toLowerCase()
  if (lower.includes('git') && !lower.includes('branch')) return whyMatters.git
  if (lower.includes('branch')) return whyMatters.branch
  return whyMatters.default
}

/**
 * TopicPage - Node Learning Experience
 * 
 * A step on the trail where real learning happens.
 * Content is inline, notes persist, progress saves locally.
 */
export function TopicPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const markerRef = useRef(null)
  const contentRef = useRef(null)
  
  const [node, setNode] = useState(null)
  const [allNodes, setAllNodes] = useState([])
  const [nextNode, setNextNode] = useState(null)
  const [prevNode, setPrevNode] = useState(null)
  const [status, setStatus] = useState('not_started')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Notes state with local storage
  const [noteContent, setNoteContent] = useState('')
  const [showSaved, setShowSaved] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const saveTimeoutRef = useRef(null)
  
  // Completion feedback
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [confirmationText, setConfirmationText] = useState('')

  // Load node data and local progress
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Fetch node data
        const nodeData = await api.getNode(id)
        setNode(nodeData)
        
        // Load local progress
        const localStatus = localProgress.getNodeStatus(id, nodeData.roadmap_id)
        setStatus(localStatus)
        
        // Load local notes
        const localNote = localProgress.getNote(id)
        setNoteContent(localNote.content || '')
        
        // Fetch sibling nodes for navigation
        if (nodeData.roadmap_id) {
          try {
            const nodes = await api.getNodes(nodeData.roadmap_id)
            const sorted = nodes.sort((a, b) => a.order_index - b.order_index)
            setAllNodes(sorted)
            
            const currentIdx = sorted.findIndex(n => 
              String(n.id) === String(id)
            )
            
            if (currentIdx > 0) {
              setPrevNode(sorted[currentIdx - 1])
            }
            if (currentIdx !== -1 && currentIdx < sorted.length - 1) {
              setNextNode(sorted[currentIdx + 1])
            }
          } catch (e) {
            console.log('Could not fetch sibling nodes')
          }
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  // Auto-save notes with debounce
  const saveNotes = useCallback((content) => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    setIsSaving(true)
    
    saveTimeoutRef.current = setTimeout(() => {
      const success = localProgress.saveNote(id, content)
      setIsSaving(false)
      
      if (success) {
        setShowSaved(true)
        setTimeout(() => setShowSaved(false), 2000)
      }
    }, 800)
  }, [id])

  const handleNoteChange = (e) => {
    const content = e.target.value
    setNoteContent(content)
    saveNotes(content)
  }

  // Completion logic
  const handleCompleteStep = async () => {
    if (status === 'completed') return
    
    const newStatus = status === 'not_started' ? 'in_progress' : 'completed'
    
    setStatus(newStatus)
    
    const roadmapId = node?.roadmap_id || 'default'
    localProgress.updateNodeProgress(id, newStatus, roadmapId)
    
    if (markerRef.current) {
      markerRef.current.classList.add('animating')
      gsap.fromTo(markerRef.current, 
        { scale: 1 },
        { 
          scale: 1.3, 
          duration: 0.2, 
          yoyo: true, 
          repeat: 1,
          ease: 'power2.out',
          onComplete: () => {
            markerRef.current?.classList.remove('animating')
          }
        }
      )
    }
    
    setConfirmationText(
      newStatus === 'in_progress' 
        ? "Step started — you're on the path!"
        : "Step completed — the trail extends forward!"
    )
    setShowConfirmation(true)
    
    try {
      await api.updateProgress(id, newStatus)
    } catch (e) {
      console.log('Backend sync pending')
    }
    
    if (newStatus === 'completed' && nextNode) {
      setTimeout(() => {
        const nextSection = document.querySelector('.step-next')
        if (nextSection) {
          nextSection.scrollIntoView({ behavior: 'smooth', block: 'center' })
        }
      }, 1500)
    }
    
    setTimeout(() => setShowConfirmation(false), 4000)
  }

  const getActionText = () => {
    switch (status) {
      case 'not_started': return "Begin this step"
      case 'in_progress': return "Complete this step"
      case 'completed': return "Step completed"
      default: return "Begin this step"
    }
  }

  const getCurrentIndex = () => {
    return allNodes.findIndex(n => String(n.id) === String(id))
  }

  // Loading state
  if (loading) {
    return (
      <>
        <EditorialNav />
        <div className="step-page">
          <div className="step-content">
            <p style={{ 
              fontFamily: 'var(--font-serif)', 
              fontStyle: 'italic',
              color: 'var(--step-ink-muted)',
              textAlign: 'center',
              paddingTop: '4rem'
            }}>
              Finding your place on the trail...
            </p>
          </div>
        </div>
      </>
    )
  }

  // Error state
  if (error || !node) {
    return (
      <>
        <EditorialNav />
        <div className="step-page">
          <div className="step-content">
            <p style={{ 
              fontFamily: 'var(--font-serif)',
              color: 'var(--step-ink-muted)',
              marginBottom: '1.5rem'
            }}>
              This step seems to have wandered off the path.
            </p>
            <button className="step-back" onClick={() => navigate(-1)}>
              ← Return to the trail
            </button>
          </div>
        </div>
      </>
    )
  }

  const currentIndex = getCurrentIndex()
  const totalSteps = allNodes.length
  
  // Get content - use node content or fallback to sample
  const displayContent = node.content || getSampleContent(node.title)
  const displayWhyMatters = node.why_matters || getWhyMatters(node.title)

  return (
    <>
      <EditorialNav />
      
      <div className="step-page">
        {/* Trail context */}
        <div className="step-trail-context" aria-hidden="true">
          <div className="step-trail-line" />
          <div ref={markerRef} className="step-trail-marker" />
          
          {totalSteps > 0 && (
            <div style={{
              position: 'absolute',
              bottom: '15%',
              left: '50%',
              transform: 'translateX(-50%)',
              textAlign: 'center'
            }}>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.65rem',
                color: 'var(--step-ink-light)',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}>
                {currentIndex + 1} / {totalSteps}
              </span>
            </div>
          )}
        </div>
        
        {/* Main content */}
        <div className="step-content" ref={contentRef}>
          <button className="step-back" onClick={() => navigate(-1)}>
            ← back to the trail
          </button>
          
          {/* Header */}
          <header className="step-header">
            {currentIndex >= 0 && (
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--step-ink-muted)',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Step {currentIndex + 1}
              </span>
            )}
            
            <h1 className="step-title">{node.title}</h1>
            
            {node.short_summary && (
              <p className="step-subtitle">{node.short_summary}</p>
            )}
            
            {/* Why this step matters */}
            <p className="step-why">{displayWhyMatters}</p>
          </header>
          
          {/* Primary action */}
          <button 
            className={`step-action ${status === 'completed' ? 'completed' : ''}`}
            onClick={handleCompleteStep}
            disabled={status === 'completed'}
          >
            {getActionText()}
            {status !== 'completed' && (
              <span className="step-action-arrow">→</span>
            )}
            {status === 'completed' && (
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M4 9L7 12L14 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            )}
          </button>
          
          {/* Confirmation */}
          <div className={`step-confirmation ${showConfirmation ? 'visible' : ''}`}>
            <svg viewBox="0 0 16 16" fill="none">
              <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 8L7 10L11 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>{confirmationText}</span>
          </div>
          
          {/* Main Learning Content */}
          <section className="step-section" style={{ marginTop: '2rem' }}>
            <LearningContent content={displayContent} />
          </section>
          
          {/* TL;DR */}
          {node.tldr && (
            <section className="step-section">
              <h2 className="step-section-title">In Brief</h2>
              <div className="step-section-content">
                <LearningContent content={node.tldr} />
              </div>
            </section>
          )}
          
          {/* Common Mistakes */}
          {node.common_mistakes && (
            <section className="step-section">
              <h2 className="step-section-title">Watch Out For</h2>
              <div style={{
                padding: '1rem 1.25rem',
                background: 'rgba(42, 42, 42, 0.03)',
                borderLeft: '3px solid var(--step-ink-muted)',
                borderRadius: '0 4px 4px 0'
              }}>
                <LearningContent content={node.common_mistakes} />
              </div>
            </section>
          )}

          {/* YouTube Resources (Cards) */}
          {node.youtubeResources && node.youtubeResources.length > 0 && (
            <section className="step-section">
              <h2 className="step-section-title">Recommended Videos</h2>
              <div className="video-card-grid">
                {node.youtubeResources.map((video, index) => {
                  const videoId = video.url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]
                  if (!videoId) return null
                  
                  return (
                    <a 
                      key={index} 
                      href={video.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="video-card"
                    >
                      <div className="video-thumbnail">
                        <img 
                          src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} 
                          alt={video.title}
                          loading="lazy"
                        />
                        <div className="video-play-icon">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <div className="video-info">
                        <h3 className="video-title">{video.title}</h3>
                        <div className="video-channel">
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeJoin="round">
                              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                           </svg>
                           {video.channel}
                        </div>
                        {video.type && (
                          <div style={{ marginTop: '0.5rem' }}>
                            <span className="video-tag">{video.type}</span>
                          </div>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </section>
          )}
          
          {/* Video */}
          {node.video_url && (
            <section className="step-section">
              <h2 className="step-section-title">Watch</h2>
              <div style={{ 
                position: 'relative',
                width: '100%',
                paddingBottom: '56.25%',
                background: 'var(--step-paper-alt)',
                border: '1px solid var(--step-ink-light)',
                borderRadius: '4px',
                overflow: 'hidden'
              }}>
                <iframe
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  src={`https://www.youtube.com/embed/${node.video_url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)?.[1]}`}
                  title={node.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}
          
          {/* Notes */}
          <section className="step-notes">
            <div className="step-notes-header">
              <h2 className="step-notes-title">Your Notes</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className={`step-notes-saved ${showSaved ? 'visible' : ''}`}>
                  {isSaving ? 'Saving...' : 'Saved ✓'}
                </span>
                <button
                  onClick={() => {
                    const success = localProgress.saveNote(id, noteContent)
                    if (success) {
                      setShowSaved(true)
                      setTimeout(() => setShowSaved(false), 2000)
                    }
                  }}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    color: 'var(--step-ink)',
                    background: 'transparent',
                    border: '1px solid var(--step-ink-light)',
                    borderRadius: '4px',
                    padding: '0.35rem 0.75rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  Save
                </button>
              </div>
            </div>
            
            <textarea
              className="step-notes-textarea"
              value={noteContent}
              onChange={handleNoteChange}
              placeholder="Jot down your thoughts... they save automatically."
            />
          </section>
          
          {/* Navigation */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '3rem',
            paddingTop: '2rem',
            borderTop: '1px dashed var(--step-ink-light)'
          }}>
            {prevNode ? (
              <Link 
                to={`/topic/${prevNode.id}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  color: 'var(--step-ink-muted)',
                  textDecoration: 'none'
                }}
              >
                ← {prevNode.title}
              </Link>
            ) : <span />}
            
            {nextNode && (
              <Link 
                to={`/topic/${nextNode.id}`}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.85rem',
                  color: 'var(--step-ink)',
                  textDecoration: 'none'
                }}
              >
                {nextNode.title} →
              </Link>
            )}
          </div>
          
          {/* What's next */}
          {nextNode && status === 'completed' && (
            <div className="step-next">
              <p className="step-next-label">The path continues</p>
              <p className="step-next-title">{nextNode.title}</p>
              <Link to={`/topic/${nextNode.id}`} className="step-next-link">
                Walk forward →
              </Link>
            </div>
          )}
          
          {/* Side encouragement */}
          <span className="step-doodle left" style={{ top: '35%' }}>
            keep going
          </span>
          <span className="step-doodle right" style={{ top: '55%' }}>
            you are learning
          </span>
        </div>
      </div>
    </>
  )
}

export default TopicPage
