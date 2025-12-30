import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { api } from '../lib/api'
import {
  EditorialPage,
  EditorialNav,
  BrushHeading,
  EditorialText,
  EditorialDivider,
  EditorialButton,
  EditorialCard,
  EditorialSection,
  EditorialContainer
} from '../components/editorial'

gsap.registerPlugin(ScrollTrigger)

/**
 * Editorial Homepage
 * Design magazine meets architectural blueprint aesthetic
 * Calm, premium, art-driven landing page
 */
export function EditorialHomePage() {
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)
  
  useEffect(() => {
    const fetchRoadmaps = async () => {
      try {
        setLoading(true)
        const data = await api.getRoadmaps()
        setRoadmaps(data)
      } catch (err) {
        console.error('Failed to fetch roadmaps:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchRoadmaps()
  }, [])
  
  // Hero parallax effect
  useEffect(() => {
    if (!heroRef.current) return
    
    const elements = heroRef.current.querySelectorAll('.parallax-element')
    
    elements.forEach((el, i) => {
      gsap.to(el, {
        y: (i + 1) * 30,
        ease: 'none',
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5
        }
      })
    })
    
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])
  
  return (
    <>
      <EditorialNav />
      
      <EditorialPage showGrid={true} showPath={true}>
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <EditorialSection spacing="xl">
          <div ref={heroRef}>
            <EditorialContainer size="lg">
              <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
                {/* Label */}
                <EditorialText 
                  variant="label" 
                  className="parallax-element"
                  style={{ marginBottom: '2rem' }}
                >
                  A New Way to Learn
                </EditorialText>
                
                {/* Main Headline - Brush Typography */}
                <BrushHeading 
                  size="2xl" 
                  className="parallax-element"
                  style={{ marginBottom: '2rem' }}
                >
                  Follow the Path,
                  <br />
                  Master the Skill
                </BrushHeading>
                
                {/* Subheadline - Elegant Serif */}
                <EditorialText 
                  variant="lead"
                  className="parallax-element"
                  style={{ 
                    maxWidth: '600px', 
                    margin: '0 auto 3rem' 
                  }}
                >
                  SkillTrail transforms scattered tutorials into structured journeys. 
                  Visual roadmaps that guide you from beginner to confident.
                </EditorialText>
                
                {/* CTA Buttons */}
                <div 
                  className="parallax-element"
                  style={{ 
                    display: 'flex', 
                    gap: '1rem', 
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                  }}
                >
                  <Link to="/roadmaps" style={{ textDecoration: 'none' }}>
                    <EditorialButton variant="solid" size="lg">
                      Browse Roadmaps
                    </EditorialButton>
                  </Link>
                  <Link to="/journey" style={{ textDecoration: 'none' }}>
                    <EditorialButton variant="outlined" size="lg">
                      Your Journey
                    </EditorialButton>
                  </Link>
                </div>
              </div>
            </EditorialContainer>
          </div>
        </EditorialSection>
        
        <EditorialContainer size="md">
          <EditorialDivider variant="center" />
        </EditorialContainer>
        
        {/* ============================================
            THE PROBLEM / SOLUTION
            ============================================ */}
        <EditorialSection spacing="lg">
          <EditorialContainer size="md">
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '4rem'
            }}>
              {/* The Problem */}
              <div>
                <EditorialText 
                  variant="label" 
                  style={{ marginBottom: '1.5rem' }}
                >
                  The Problem
                </EditorialText>
                <BrushHeading 
                  as="h2" 
                  size="md" 
                  style={{ marginBottom: '1.5rem' }}
                >
                  Learning is Fragmented
                </BrushHeading>
                <EditorialText variant="body">
                  Endless tutorials. Scattered resources. No clear direction. 
                  You finish a course but still don't know what to learn next. 
                  The path forward remains invisible.
                </EditorialText>
              </div>
              
              {/* The Solution */}
              <div>
                <EditorialText 
                  variant="label" 
                  style={{ marginBottom: '1.5rem' }}
                >
                  The Solution
                </EditorialText>
                <BrushHeading 
                  as="h2" 
                  size="md" 
                  style={{ marginBottom: '1.5rem' }}
                >
                  Visual Learning Paths
                </BrushHeading>
                <EditorialText variant="body">
                  Structured roadmaps that map your entire journey. 
                  See what comes next. Track your progress. 
                  Learn with intention and clarity.
                </EditorialText>
              </div>
            </div>
          </EditorialContainer>
        </EditorialSection>
        
        <EditorialContainer size="md">
          <EditorialDivider variant="full" />
        </EditorialContainer>
        
        {/* ============================================
            HOW IT WORKS
            ============================================ */}
        <EditorialSection spacing="lg">
          <EditorialContainer size="lg">
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <EditorialText 
                variant="label" 
                style={{ marginBottom: '1rem' }}
              >
                The Process
              </EditorialText>
              <BrushHeading as="h2" size="lg">
                How It Works
              </BrushHeading>
            </div>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {[
                {
                  number: '01',
                  title: 'Choose a Path',
                  description: 'Select a roadmap that matches your learning goals and current skill level.'
                },
                {
                  number: '02',
                  title: 'Follow the Map',
                  description: 'Navigate through structured topics, each building on the last in logical sequence.'
                },
                {
                  number: '03',
                  title: 'Track Progress',
                  description: 'Mark topics complete, save notes, and see how far you\'ve come.'
                }
              ].map((step, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      color: 'var(--editorial-ink-faint)',
                      marginBottom: '1rem'
                    }}
                  >
                    {step.number}
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: '1rem',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: 'var(--editorial-ink)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    {step.title}
                  </h3>
                  <EditorialText variant="body" style={{ fontSize: '0.95rem' }}>
                    {step.description}
                  </EditorialText>
                </div>
              ))}
            </div>
          </EditorialContainer>
        </EditorialSection>
        
        <EditorialContainer size="md">
          <EditorialDivider variant="center" />
        </EditorialContainer>
        
        {/* ============================================
            FEATURED ROADMAPS
            ============================================ */}
        <EditorialSection spacing="lg">
          <EditorialContainer size="lg">
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'baseline',
              marginBottom: '3rem'
            }}>
              <BrushHeading as="h2" size="md">
                Featured Roadmaps
              </BrushHeading>
              <Link 
                to="/roadmaps"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--editorial-ink-muted)',
                  textDecoration: 'none'
                }}
              >
                View All →
              </Link>
            </div>
            
            {loading ? (
              <EditorialText variant="body" style={{ textAlign: 'center' }}>
                Loading roadmaps...
              </EditorialText>
            ) : (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                {roadmaps.slice(0, 3).map((roadmap) => (
                  <Link 
                    key={roadmap.id}
                    to={`/roadmap/${roadmap.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <EditorialCard variant="bordered" padding="lg">
                      <EditorialText 
                        variant="label" 
                        style={{ marginBottom: '0.75rem' }}
                      >
                        Roadmap
                      </EditorialText>
                      <h3
                        style={{
                          fontFamily: 'var(--font-serif)',
                          fontSize: '1.5rem',
                          fontWeight: 500,
                          color: 'var(--editorial-ink)',
                          marginBottom: '0.75rem',
                          margin: 0
                        }}
                      >
                        {roadmap.title}
                      </h3>
                      <EditorialText 
                        variant="body" 
                        style={{ 
                          fontSize: '0.95rem',
                          marginTop: '0.75rem'
                        }}
                      >
                        {roadmap.description}
                      </EditorialText>
                    </EditorialCard>
                  </Link>
                ))}
              </div>
            )}
          </EditorialContainer>
        </EditorialSection>
        
        <EditorialContainer size="md">
          <EditorialDivider variant="full" />
        </EditorialContainer>
        
        {/* ============================================
            FINAL CTA
            ============================================ */}
        <EditorialSection spacing="xl">
          <EditorialContainer size="sm">
            <div style={{ textAlign: 'center' }}>
              <BrushHeading size="lg" style={{ marginBottom: '1.5rem' }}>
                Ready to Begin?
              </BrushHeading>
              <EditorialText 
                variant="lead" 
                style={{ marginBottom: '2rem' }}
              >
                Your learning journey awaits. Choose a roadmap and start building real skills.
              </EditorialText>
              <Link to="/roadmaps" style={{ textDecoration: 'none' }}>
                <EditorialButton variant="solid" size="lg">
                  Explore Roadmaps
                </EditorialButton>
              </Link>
            </div>
          </EditorialContainer>
        </EditorialSection>
        
        {/* Footer */}
        <EditorialSection spacing="md">
          <EditorialContainer size="lg">
            <EditorialDivider variant="full" style={{ marginBottom: '2rem' }} />
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <EditorialText variant="caption">
                © 2024 SkillTrail
              </EditorialText>
              <EditorialText variant="caption">
                Learn with intention
              </EditorialText>
            </div>
          </EditorialContainer>
        </EditorialSection>
      </EditorialPage>
    </>
  )
}

export default EditorialHomePage
