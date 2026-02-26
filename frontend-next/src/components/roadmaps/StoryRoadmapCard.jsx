"use client"
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { RoadmapLogo } from './RoadmapLogos'

gsap.registerPlugin(ScrollTrigger)

/**
 * StoryRoadmapCard - A roadmap presented as a story chapter
 */
export function StoryRoadmapCard({
  id,
  title,
  description,
  type,
  status = 'available', // 'available' | 'coming-soon'
  chapterNumber,
  align = 'left',
  delay = 0
}) {
  const cardRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    if (!cardRef.current) return

    const slideFrom = align === 'left' ? -40 : 40

    gsap.set(cardRef.current, { 
      opacity: 0, 
      x: slideFrom, 
      y: 20 
    })

    const anim = gsap.to(cardRef.current, {
      opacity: 1,
      x: 0,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: cardRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [align, delay])

  // Logo hover animation
  const handleMouseEnter = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1.1,
        rotate: 3,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const handleMouseLeave = () => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        scale: 1,
        rotate: 0,
        duration: 0.3,
        ease: 'power2.out'
      })
    }
  }

  const isComingSoon = status === 'coming-soon'

  return (
    <div
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        display: 'flex',
        flexDirection: 'column', // Stacked layout
        gap: '0',
        opacity: isComingSoon ? 0.7 : 1,
        background: '#fff',
        padding: '1rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
        border: '1px solid #f0f0f0',
        maxWidth: '400px', // Restrict width
      }}
    >
      {/* Top Image Area */}
      <div style={{
        backgroundColor: '#D9D9D9', // Placeholder gray
        height: '160px',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        position: 'relative',
        backgroundImage: 'linear-gradient(to bottom, #ddd, #ccc)', // Subtle gradient
        overflow: 'hidden',
      }}>
         {/* Chapter Badge */}
         <div style={{
           position: 'absolute', top: '12px', right: '12px',
           background: '#fff',
           padding: '4px 12px',
           borderRadius: '99px',
           fontSize: '10px',
           fontWeight: 700,
           letterSpacing: '0.05em',
           fontFamily: 'var(--st-font-sans)',
           boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
         }}>
           Chapter {chapterNumber ? String(chapterNumber).padStart(2, '0') : '01'}
         </div>
      </div>

      {/* Content */}
      <div style={{ padding: '0 0.5rem' }}>
        {/* Title */}
        <h3
          style={{
            fontFamily: 'var(--st-font-display)', // Playfair
            fontSize: '1.75rem',
            fontWeight: 500,
            color: 'var(--editorial-ink)',
            marginBottom: '0.75rem',
            lineHeight: 1.1,
          }}
        >
          {title}
        </h3>

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--st-font-sans)', // Inter for body in this card
            fontSize: '0.85rem',
            color: 'var(--editorial-ink-secondary)',
            lineHeight: 1.6,
            marginBottom: '1.5rem',
          }}
        >
          {description}
        </p>

        {/* Footer: Time + Action */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f5f5f5', paddingTop: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.75rem', color: '#888', fontFamily: 'var(--st-font-sans)' }}>
            <span>⏱</span> 15 min read
          </div>

          {isComingSoon ? (
             <span style={{ fontSize: '0.8rem', color: '#888' }}>Coming Soon</span>
          ) : (
            <Link
              href={`/roadmap/${id}`}
              style={{
                fontFamily: 'var(--st-font-sans)',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: 'var(--st-accent-text)', // Dark green text
                 // No border, just text+arrow as per reference
                textDecoration: 'none',
                display: 'flex', alignItems: 'center', gap: '0.25rem',
                transition: 'gap 0.2s',
              }}
              className="group"
            >
              Start Chapter <span style={{ transition: 'transform 0.2s' }} className="arrow">→</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

StoryRoadmapCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  type: PropTypes.string,
  status: PropTypes.oneOf(['available', 'coming-soon']),
  chapterNumber: PropTypes.number,
  align: PropTypes.oneOf(['left', 'right']),
  delay: PropTypes.number
}

/**
 * RoadmapRequestForm - Simple, friendly form to request new roadmaps
 */
export function RoadmapRequestForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    reason: '',
    email: ''
  })
  const [status, setStatus] = useState('idle') // 'idle' | 'submitting' | 'success' | 'error'
  const [error, setError] = useState('')
  const formRef = useRef(null)

  useEffect(() => {
    if (!formRef.current) return

    gsap.set(formRef.current, { opacity: 0, y: 30 })

    const anim = gsap.to(formRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: formRef.current,
        start: 'top 85%',
        toggleActions: 'play none none reverse'
      }
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
  }, [])

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name.trim()) {
      setError('Please enter a roadmap name')
      return
    }

    setStatus('submitting')
    setError('')

    try {
      const response = await fetch('/api/v1/roadmaps/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          reason: formData.reason.trim() || null,
          email: formData.email.trim() || null
        })
      })

      if (!response.ok) {
        throw new Error('Failed to submit request')
      }

      setStatus('success')
      setFormData({ name: '', reason: '', email: '' })
      if (onSuccess) onSuccess()
    } catch (err) {
      console.error('Request submission error:', err)
      setStatus('error')
      setError('Something went wrong. Please try again.')
    }
  }

  if (status === 'success') {
    return (
      <div
        ref={formRef}
        style={{
          textAlign: 'center',
          padding: '3rem 2rem',
          border: '1px solid var(--editorial-grid)',
          background: 'var(--editorial-bg)'
        }}
      >
        <svg width="50" height="50" viewBox="0 0 50 50" style={{ marginBottom: '1.5rem' }}>
          <circle cx="25" cy="25" r="20" fill="none" stroke="var(--editorial-ink)" strokeWidth="1.5" />
          <path d="M 15 25 L 22 32 L 35 18" fill="none" stroke="var(--editorial-ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.3rem',
          color: 'var(--editorial-ink)',
          marginBottom: '0.75rem'
        }}>
          Got it. We&apos;ll build this path.
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          color: 'var(--editorial-ink-light)',
          fontStyle: 'italic'
        }}>
          Thank you for shaping the journey.
        </p>
      </div>
    )
  }

  return (
    <div
      ref={formRef}
      style={{
        padding: '2.5rem 2rem',
        border: '1px solid var(--editorial-grid)',
        background: 'var(--editorial-bg)'
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.7rem',
          color: 'var(--editorial-ink-muted)',
          letterSpacing: '0.1em',
          display: 'block',
          marginBottom: '0.75rem'
        }}>
          ✎ Request
        </span>
        
        <h3 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '1.5rem',
          color: 'var(--editorial-ink)',
          marginBottom: '0.5rem'
        }}>
          Don&apos;t see your path?
        </h3>
        
        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '0.95rem',
          color: 'var(--editorial-ink-light)',
          fontStyle: 'italic'
        }}>
          Tell us what you want to learn.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Roadmap name - required */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label
            htmlFor="roadmap-name"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            Roadmap Name *
          </label>
          <input
            id="roadmap-name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Cybersecurity, Game Development"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--editorial-ink)',
              background: 'transparent',
              border: '1px solid var(--editorial-grid)',
              outline: 'none'
            }}
          />
        </div>

        {/* Reason - optional */}
        <div style={{ marginBottom: '1.25rem' }}>
          <label
            htmlFor="roadmap-reason"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            Why? <span style={{ opacity: 0.6 }}>(optional)</span>
          </label>
          <textarea
            id="roadmap-reason"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="A few words about why this matters to you..."
            rows={2}
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--editorial-ink)',
              background: 'transparent',
              border: '1px solid var(--editorial-grid)',
              outline: 'none',
              resize: 'vertical',
              minHeight: '60px'
            }}
          />
        </div>

        {/* Email - optional */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label
            htmlFor="roadmap-email"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--editorial-ink-muted)',
              display: 'block',
              marginBottom: '0.5rem'
            }}
          >
            Email <span style={{ opacity: 0.6 }}>(optional, for updates)</span>
          </label>
          <input
            id="roadmap-email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            style={{
              width: '100%',
              padding: '0.75rem 1rem',
              fontFamily: 'var(--font-serif)',
              fontSize: '1rem',
              color: 'var(--editorial-ink)',
              background: 'transparent',
              border: '1px solid var(--editorial-grid)',
              outline: 'none'
            }}
          />
        </div>

        {/* Error message */}
        {error && (
          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '0.9rem',
            color: '#c0392b',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          style={{
            width: '100%',
            padding: '0.9rem 1.5rem',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.75rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--editorial-bg)',
            background: 'var(--editorial-ink)',
            border: '1px solid var(--editorial-ink)',
            cursor: status === 'submitting' ? 'wait' : 'pointer',
            opacity: status === 'submitting' ? 0.7 : 1,
            transition: 'opacity 0.2s ease'
          }}
        >
          {status === 'submitting' ? 'Sending...' : 'Request This Path'}
        </button>
      </form>
    </div>
  )
}

RoadmapRequestForm.propTypes = {
  onSuccess: PropTypes.func
}

export default StoryRoadmapCard
