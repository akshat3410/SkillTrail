"use client"
import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { gsap } from 'gsap'
import { api } from '@/lib/api'
import * as localProgress from '@/lib/localProgress'
import { LearningContent } from '@/components/learning'

/*
 * TopicPage — Node View
 *
 * Phase 8 Assembly:
 * 1. Navbar
 * 2. Node Header (Back link + Title + Done toggle)
 * 3. Content Area (Reading + Resources)
 * 4. Node Footer (Prev/Next Navigation)
 *
 * Styles: Uses --st-* design tokens (Phase 6)
 * Motion: Phase 7 rules
 */

// ── Sample Data (Preserved) ──
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

function getSampleContent(title) {
  const lower = (title || '').toLowerCase()
  if (lower.includes('git') && !lower.includes('branch')) return sampleContent.git
  if (lower.includes('branch')) return sampleContent.branch
  return sampleContent.default
}


// ── Components ──

function StatusToggle({ isCompleted, onToggle }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: '0.6rem',
        background: isCompleted ? 'var(--st-surface-raised)' : 'transparent',
        border: `1px solid ${isCompleted ? 'var(--st-accent)' : 'var(--st-border)'}`,
        padding: '0.5rem 1rem',
        borderRadius: '20px',
        cursor: 'pointer',
        transition: 'all 200ms ease',
      }}
    >
      <div style={{
        width: '18px', height: '18px', borderRadius: '50%',
        background: isCompleted ? 'var(--st-accent)' : 'transparent',
        border: `1.5px solid ${isCompleted ? 'var(--st-accent)' : 'var(--st-ink-muted)'}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {isCompleted && (
          <svg width="10" height="10" viewBox="0 0 10 10">
            <path d="M1.5 5 L3.5 7 L8.5 2.5" fill="none" stroke="var(--st-surface)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <span style={{
        fontFamily: 'var(--st-font-body)',
        fontSize: '0.8rem', fontWeight: 500,
        color: isCompleted ? 'var(--st-ink)' : 'var(--st-ink-secondary)',
      }}>
        {isCompleted ? 'Completed' : 'Mark as done'}
      </span>
    </button>
  )
}

function NavButton({ direction, node, onClick }) {
  if (!node) return <div style={{ flex: 1 }} /> // Spacer

  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: direction === 'prev' ? 'flex-start' : 'flex-end',
        textAlign: direction === 'prev' ? 'left' : 'right',
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '1rem',
        borderRadius: 'var(--st-radius-card)',
        transition: 'background 150ms ease',
      }}
      onMouseEnter={(e) => e.currentTarget.style.background = 'var(--st-surface-raised)'}
      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
    >
      <span style={{
        fontFamily: 'var(--st-font-body)',
        fontSize: '0.7rem',
        color: 'var(--st-ink-muted)',
        marginBottom: '0.25rem',
        display: 'flex', alignItems: 'center', gap: '0.4rem',
      }}>
        {direction === 'prev' && '←'}
        {direction === 'prev' ? 'Previous Step' : 'Next Step'}
        {direction === 'next' && '→'}
      </span>
      <span style={{
        fontFamily: 'var(--st-font-display)',
        fontSize: '1rem', fontWeight: 500,
        color: 'var(--st-ink)',
      }}>
        {node.title}
      </span>
    </button>
  )
}


// ── Main Page ──

export default function TopicPage() {
  const params = useParams()
  const router = useRouter()
  const topicId = params.id

  const [node, setNode] = useState(null)
  const [roadmap, setRoadmap] = useState(null)
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [completed, setCompleted] = useState(false)

  // Fetch logic
  useEffect(() => {
    const load = async () => {
      if (!topicId) return
      setLoading(true)
      try {
        // 1. Get roadmap to find the node context
        const roadmaps = await api.getRoadmaps()
        let foundNode = null
        let foundRoadmap = null

        // Inefficient but functional search for demo
        for (const r of roadmaps) {
          const detail = await api.getRoadmap(r.id)
          const n = detail?.nodes?.find(n => n.id === topicId)
          if (n) {
            foundNode = n
            foundRoadmap = detail
            break
          }
        }

        if (foundNode && foundRoadmap) {
          setNode(foundNode)
          setRoadmap(foundRoadmap)
          // 2. Get content (mock or real)
          // In real implementation, this would be api.getTopicContent(topicId)
          setContent(getSampleContent(foundNode.title))
          // 3. Get status
          const progress = localProgress.getProgress(foundRoadmap.id)
          setCompleted(progress[foundNode.id] === 'completed')
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [topicId])

  const toggleComplete = () => {
    if (!node || !roadmap) return
    const newStatus = !completed
    setCompleted(newStatus)
    localProgress.updateNodeProgress(node.id, newStatus ? 'completed' : 'in_progress', roadmap.id)
    // Dispatch event for other components to pick up if needed
    window.dispatchEvent(new Event('skilltrail-progress-update'))
  }

  // Navigation logic
  const sortedNodes = roadmap?.nodes?.sort((a, b) => a.order_index - b.order_index) || []
  const currentIndex = sortedNodes.findIndex(n => n.id === node?.id)
  const prevNode = currentIndex > 0 ? sortedNodes[currentIndex - 1] : null
  const nextNode = currentIndex < sortedNodes.length - 1 ? sortedNodes[currentIndex + 1] : null

  const handleNav = (targetNode) => {
    if (targetNode) router.push(`/topic/${targetNode.id}`)
  }

  // Animation (Phase 7)
  const contentRef = useRef(null)
  useEffect(() => {
    if (!loading && node && contentRef.current) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
      )
    }
  }, [loading, node])


  if (loading) {
    return (
      <>
        <div style={{
          minHeight: '100vh',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--st-font-body)', color: 'var(--st-ink-muted)',
        }}>Loading step...</div>
      </>
    )
  }

  if (!node) {
    return (
      <>
        <div style={{
          minHeight: '100vh', padding: '100px 20px', textAlign: 'center',
          fontFamily: 'var(--st-font-body)',
        }}>Step not found. <Link href="/roadmaps">Return to trails</Link></div>
      </>
    )
  }

  return (
    <>
      <main style={{
        minHeight: '100vh',
        background: 'var(--st-surface)',
        paddingTop: '80px',
        paddingBottom: 'var(--st-space-4xl)',
      }}>
        <article style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '0 var(--st-space-lg)',
        }}>

          {/* § Node Header — Phase 8, 2 */}
          <header style={{ marginBottom: 'var(--st-space-2xl)' }}>
            <Link
              href={`/roadmap/${roadmap.id}`}
              style={{
                fontFamily: 'var(--st-font-body)',
                fontSize: '0.85rem',
                color: 'var(--st-ink-secondary)',
                textDecoration: 'none',
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                marginBottom: 'var(--st-space-lg)',
              }}
            >
              ← Back to {roadmap.title}
            </Link>

            <div style={{
              display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
              gap: 'var(--st-space-lg)',
              flexWrap: 'wrap',
            }}>
              <h1 style={{
                fontFamily: 'var(--st-font-display)',
                fontSize: '2.2rem', fontWeight: 400,
                color: 'var(--st-ink)',
                margin: 0,
                lineHeight: 1.2,
              }}>{node.title}</h1>

              <StatusToggle isCompleted={completed} onToggle={toggleComplete} />
            </div>
          </header>

          {/* § Content Area — Phase 8, 3 */}
          <div ref={contentRef} style={{
            fontFamily: 'var(--st-font-serif)',
            fontSize: '1.1rem',
            lineHeight: 1.7,
            color: 'var(--st-ink)',
          }}>
            {/* Using existing LearningContent for markdown rendering, 
                assuming it handles basic rendering well. 
                If it imposes conflicting styles, we might need a custom renderer later. */}
            <LearningContent content={content} />
          </div>

          {/* § Node Footer — Phase 8, 4 */}
          <footer style={{
            marginTop: 'var(--st-space-4xl)',
            paddingTop: 'var(--st-space-xl)',
            borderTop: '1px solid var(--st-border-light)',
          }}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <NavButton direction="prev" node={prevNode} onClick={() => handleNav(prevNode)} />
              <NavButton direction="next" node={nextNode} onClick={() => handleNav(nextNode)} />
            </div>
          </footer>

        </article>
      </main>
    </>
  )
}
