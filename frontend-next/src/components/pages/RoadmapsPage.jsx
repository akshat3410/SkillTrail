"use client"
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Navbar } from '@/components/layout/Navbar'
import { StoryRoadmapCard } from '@/components/roadmaps/StoryRoadmapCard'
import { api } from '@/lib/api'

gsap.registerPlugin(ScrollTrigger)

export default function RoadmapsPage() {
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)
  const heroRef = useRef(null)
  const timelineRef = useRef(null)

  useEffect(() => {
    // Mock data fetch
    const load = async () => {
      try {
        const data = await api.getRoadmaps()
        setRoadmaps(data)
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  useEffect(() => {
    if (!loading) {
      // Hero Animation
      const tl = gsap.timeline()
      tl.fromTo('.hero-text', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power2.out' }
      )
      tl.fromTo('.hero-visual',
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 1, ease: 'power2.out' },
        "-=0.6"
      )

      // Timeline Animation
      const steps = gsap.utils.toArray('.timeline-step')
      steps.forEach((step, i) => {
        gsap.fromTo(step,
          { opacity: 0, y: 50 },
          {
            opacity: 1, y: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 80%',
            }
          }
        )
      })
    }
  }, [loading])

  return (
    <>
      <Navbar />
      
      <main style={{
        minHeight: '100vh',
        backgroundColor: 'var(--editorial-bg)',
        overflowX: 'hidden',
      }}>
        {/* Texture */}
        <div className="texture-overlay" />

        {/* ==================== HERO SECTION ==================== */}
        <section ref={heroRef} style={{
          padding: '140px 2rem 80px',
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          minHeight: '90vh', // Full viewport height feel
        }}>
          {/* Left: Text Content */}
          <div>
            <h1 className="hero-text" style={{
              fontFamily: 'var(--st-font-display)',
              fontSize: '4.5rem',
              fontWeight: 700,
              lineHeight: 1.1,
              color: 'var(--editorial-ink)',
              letterSpacing: '-0.02em',
              marginBottom: '2rem',
            }}>
              Stop searching. <br />
              Start <span style={{
                position: 'relative',
                display: 'inline-block',
                zIndex: 1,
              }}>
                following.
                {/* Green Underline */}
                <span style={{
                   position: 'absolute',
                   bottom: '6px', left: 0, width: '100%', height: '12px',
                   background: 'var(--st-accent)',
                   zIndex: -1,
                   opacity: 0.6,
                   transform: 'rotate(-2deg)'
                }} />
              </span>
            </h1>

            <p className="hero-text" style={{
              fontFamily: 'var(--st-font-body)',
              fontSize: '1.2rem',
              color: 'var(--editorial-ink-secondary)',
              lineHeight: 1.6,
              maxWidth: '500px',
              marginBottom: '3rem',
              borderLeft: '2px solid var(--st-accent)',
              paddingLeft: '1.5rem',
            }}>
              Turn chaotic self-learning into a clear, hand-drawn journey. 
              No more random tutorials—just one continuous path to mastery.
            </p>

            <div className="hero-text" style={{ display: 'flex', gap: '1rem' }}>
              <button style={{
                background: 'var(--st-accent)',
                color: 'var(--st-accent-text)',
                fontFamily: 'var(--st-font-sans)',
                fontWeight: 700,
                fontSize: '1rem',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: '2px solid var(--st-accent-text)',
                boxShadow: '4px 4px 0 var(--st-accent-text)',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                transition: 'transform 0.2s',
              }}>
                Pick a Path <span>→</span>
              </button>

              <button style={{
                background: 'transparent',
                color: 'var(--editorial-ink)',
                fontFamily: 'var(--st-font-sans)',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '1rem 2rem',
                borderRadius: '8px',
                border: '2px solid var(--editorial-ink-muted)',
                cursor: 'pointer',
              }}>
                View Demo
              </button>
            </div>

            {/* Social Proof */}
            <div className="hero-text" style={{ marginTop: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ display: 'flex', marginLeft: '10px' }}>
                {[1,2,3].map(i => (
                  <div key={i} style={{
                    width: '32px', height: '32px', borderRadius: '50%', background: '#ddd',
                    border: '2px solid var(--editorial-bg)', marginLeft: '-10px'
                  }} />
                ))}
              </div>
              <span style={{ fontFamily: 'var(--st-font-sans)', fontSize: '0.8rem', color: 'var(--editorial-ink-secondary)' }}>
                Join 10,000+ hikers on the trail
              </span>
            </div>
          </div>

          {/* Right: Visual (Hiker Composition) */}
          <div className="hero-visual" style={{ position: 'relative', height: '600px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {/* Background Sun/Circle */}
            <div style={{
              position: 'absolute',
              width: '500px', height: '500px',
              borderRadius: '50%',
              background: '#FDE68A', // Pale yellow sun
              opacity: 0.5,
              zIndex: 0,
            }} />
            
            {/* Main Card / Image Placeholder */}
            <div style={{
              position: 'relative',
              width: '400px', height: '500px',
              background: 'linear-gradient(to bottom, #d4d4d4 0%, #a3a3a3 100%)', // Mountain gray
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              zIndex: 1,
              overflow: 'hidden',
              display: 'flex', alignItems: 'flex-end', justifyContent: 'center'
            }}>
               {/* Hiker Silhouette (CSS) */}
               <div style={{
                 width: '100px', height: '200px',
                 background: '#333',
                 borderRadius: '50px 50px 0 0',
                 marginBottom: '-20px'
               }} />
               
               {/* Floating Badge */}
               <div style={{
                 position: 'absolute', top: '10%', right: '-20px',
                 background: '#fff', padding: '1rem', borderRadius: '12px',
                 boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                 display: 'flex', gap: '0.5rem', alignItems: 'center'
               }}>
                 <div style={{ width: '40px', height: '6px', background: '#4ade80', borderRadius: '4px' }} />
               </div>

               {/* Objective Card */}
               <div style={{
                 position: 'absolute', bottom: '40px', left: '-40px',
                 background: '#fff', padding: '1.5rem', borderRadius: '16px',
                 boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                 maxWidth: '200px'
               }}>
                 <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#888', marginBottom: '0.5rem' }}>Current Objective</div>
                 <div style={{ fontFamily: 'var(--st-font-body)', fontSize: '0.9rem', lineHeight: 1.4 }}>
                   Reach the summit of React Basics.
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* ==================== TIMELINE SECTION ==================== */}
        <section ref={timelineRef} style={{
          position: 'relative',
          padding: '100px 0',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem', opacity: 0.5, fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            START SCROLLING <br /> ↓
          </div>

          {/* Vertical Line */}
          <div style={{
            position: 'absolute', top: '200px', bottom: '100px', left: '50%', width: '4px',
            background: 'var(--editorial-ink)', transform: 'translateX(-50%)',
            zIndex: 0,
          }} />

          {/* Step 1: Choose Your Path */}
          <div className="timeline-step" style={{
            display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center', marginBottom: '150px'
          }}>
            <div style={{ textAlign: 'right', paddingRight: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--st-font-display)', fontSize: '2rem', marginBottom: '1rem' }}>Choose Your Path</h3>
              <p style={{ color: 'var(--editorial-ink-secondary)' }}>
                Start with a single clear goal. Whether it's Python, Design, or Photography, pick the mountain you want to climb.
              </p>
            </div>
            
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#fff',
              border: '4px solid var(--editorial-ink)', margin: '0 auto', zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <span style={{ fontSize: '1.5rem' }}>🏔</span>
            </div>

            <div style={{ paddingLeft: '2rem' }}>
               <div style={{
                 width: '100%', height: '200px', background: '#eee', borderRadius: '12px',
                 border: '2px solid var(--editorial-ink)', boxShadow: '8px 8px 0 var(--editorial-ink)'
               }} />
            </div>
          </div>

          {/* Step 2: Follow the Story */}
          <div className="timeline-step" style={{
            display: 'grid', gridTemplateColumns: '1fr 80px 1fr', alignItems: 'center', marginBottom: '150px'
          }}>
            <div style={{ paddingRight: '2rem' }}>
               <div style={{
                 width: '100%', height: '200px', background: '#eee', borderRadius: '12px',
                 border: '2px solid var(--editorial-ink)', boxShadow: '-8px 8px 0 var(--editorial-ink)'
               }} />
            </div>
            
            <div style={{
              width: '60px', height: '60px', borderRadius: '50%', background: '#fff',
              border: '4px solid var(--editorial-ink)', margin: '0 auto', zIndex: 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
               <span style={{ fontSize: '1.5rem' }}>👁</span>
            </div>

            <div style={{ paddingLeft: '2rem' }}>
              <h3 style={{ fontFamily: 'var(--st-font-display)', fontSize: '2rem', marginBottom: '1rem' }}>Follow the Story</h3>
              <p style={{ color: 'var(--editorial-ink-secondary)' }}>
                No more boring lists. The content unfolds naturally as you progress, mixing video, reading, and interactive checkpoints.
              </p>
            </div>
          </div>

           {/* Step 3: Master the Craft (Center) */}
           <div className="timeline-step" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{
                width: '80px', height: '80px', borderRadius: '50%', background: 'var(--st-accent)',
                margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 0 20px var(--st-accent-glow)'
              }}>
                 <span style={{ fontSize: '2rem', color: '#fff' }}>★</span>
              </div>
              <h3 style={{ fontFamily: 'var(--st-font-display)', fontSize: '2.5rem', marginBottom: '1rem' }}>Master the Craft</h3>
              <p style={{ color: 'var(--editorial-ink-secondary)', maxWidth: '500px', margin: '0 auto' }}>
                Complete projects, earn certificates, and look back at the mountain you just climbed.
              </p>
           </div>
        </section>

        {/* ==================== POPULAR TRAILS ==================== */}
        <section style={{
          padding: '80px 2rem',
          maxWidth: '1200px',
          margin: '0 auto 100px',
          background: 'rgba(93, 242, 68, 0.1)', // Light green bg
          borderRadius: '32px',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '3rem' }}>
             <h2 style={{ fontFamily: 'var(--st-font-display)', fontSize: '2.5rem' }}>Popular Trails</h2>
             <Link href="/roadmaps" style={{ textDecoration: 'none', color: 'var(--editorial-ink)', fontWeight: 600 }}>
               Explore all →
             </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem',
          }}>
            {roadmaps.slice(0, 3).map((map, i) => (
               <StoryRoadmapCard 
                 key={map.id} 
                 {...map} 
                 chapterNumber={i+1} 
                 align="left"
                 status={i === 2 ? 'coming-soon' : 'available'}
               />
            ))}
             {loading && [1,2,3].map(i => <div key={i} style={{ height: '400px', background: 'rgba(255,255,255,0.5)', borderRadius: '16px' }} />)}
          </div>
        </section>


        
        <style jsx global>{`
          @keyframes pulse {
            0% { opacity: 0.6; }
            50% { opacity: 0.3; }
            100% { opacity: 0.6; }
          }
        `}</style>
      </main>
    </>
  )
}
