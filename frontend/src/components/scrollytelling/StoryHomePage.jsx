import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FadeSection } from './AnimationPrimitives'
import { 
  DoodleArrow, 
  DoodleStar, 
  DoodleCheck,
  DoodleQuestion
} from './DoodleAssets'
import { NarrativeText, EmotionalQuote } from './StorySpaceElements'
import { LeftSidebar, RightSidebar, ProgressIndicator } from './SideContent'
import { 
  ZigZagSection, 
  ZigZagPath, 
  ZigZagTransition,
  OppositeDecoration,
  FillerElement
} from './ZigZagLayout'
import { HeroSection } from './HeroSection'
import { EditorialNav } from '../editorial'

gsap.registerPlugin(ScrollTrigger)

/**
 * StoryHomePage - Zig-Zag Storytelling Layout
 * Pattern: Center → Left → Right → Center → Left → Right
 */
export function StoryHomePage() {
  const containerRef = useRef(null)

  useEffect(() => {
    ScrollTrigger.refresh()
    return () => ScrollTrigger.getAll().forEach(t => t.kill())
  }, [])

  return (
    <>
      <EditorialNav />
      
      {/* Fixed elements */}
      <LeftSidebar />
      <RightSidebar />
      <ProgressIndicator />
      <ZigZagPath />
      
      <div 
        ref={containerRef}
        style={{ 
          background: 'var(--editorial-bg)',
          minHeight: '100vh',
          paddingTop: '5rem',
          position: 'relative'
        }}
      >
        {/* Blueprint grid */}
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 0,
            opacity: 0.15
          }}
        >
          <svg width="100%" height="100%">
            <defs>
              <pattern id="zigzag-grid" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="var(--editorial-grid)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#zigzag-grid)" />
          </svg>
        </div>

        {/* SECTION 1: CENTER (Hero) */}
        <HeroSection />

        <ZigZagTransition 
          narrative="This is where most learners get stuck..."
          toAlign="left"
          decoration={<FillerElement type="dots" />}
        />

        {/* SECTION 2: LEFT (The Struggle) */}
        <ZigZagSection 
          align="left"
          annotation={<>sound<br/>familiar?</>}
          oppositeContent={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <DoodleQuestion size={80} />
              <OppositeDecoration type="lines" />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.8rem',
                color: 'var(--editorial-ink-muted)',
                textAlign: 'center',
                opacity: 0.5
              }}>
                we've all<br/>been here
              </p>
            </div>
          }
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--editorial-ink-muted)',
            marginBottom: '1.5rem',
            display: 'block'
          }}>
            Chapter Two
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--editorial-ink)',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            The Struggle Is Real
          </h2>

          <div style={{ marginTop: '2rem' }}>
            {[
              { num: '01', title: 'Information Overload', text: 'Too many tutorials. Where do you start?' },
              { num: '02', title: 'No Clear Direction', text: 'You finish but don\'t know what\'s next.' },
              { num: '03', title: 'Tutorial Hell', text: 'Learning without building anything real.' }
            ].map((item, i) => (
              <FadeSection key={i} delay={0.2 + i * 0.1}>
                <div style={{
                  padding: '1.25rem',
                  borderLeft: '2px solid var(--editorial-grid)',
                  marginBottom: '1rem',
                  marginLeft: '0.5rem'
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '0.75rem',
                    color: 'var(--editorial-ink-muted)',
                    marginRight: '0.75rem'
                  }}>
                    {item.num}
                  </span>
                  <strong style={{ 
                    fontFamily: 'var(--font-serif)',
                    fontWeight: 500,
                    color: 'var(--editorial-ink)'
                  }}>
                    {item.title}
                  </strong>
                  <p style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '0.95rem',
                    color: 'var(--editorial-ink-light)',
                    marginTop: '0.5rem',
                    lineHeight: 1.6
                  }}>
                    {item.text}
                  </p>
                </div>
              </FadeSection>
            ))}
          </div>
        </ZigZagSection>

        <ZigZagTransition 
          narrative="But what if there was a clear path?"
          toAlign="right"
          decoration={<FillerElement type="arrow" />}
        />

        {/* SECTION 3: RIGHT (The Path) */}
        <ZigZagSection 
          align="right"
          annotation={<>the path<br/>emerges</>}
          oppositeContent={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <OppositeDecoration type="sketch" />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                color: 'var(--editorial-ink-muted)',
                textAlign: 'center',
                opacity: 0.4
              }}>
                a map for<br/>your journey
              </p>
            </div>
          }
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--editorial-ink-muted)',
            marginBottom: '1.5rem',
            display: 'block'
          }}>
            Chapter Three
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--editorial-ink)',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            The Path Emerges
          </h2>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-light)',
            lineHeight: 1.7,
            marginBottom: '2rem'
          }}>
            What if learning had a visible roadmap?<br />
            Each step clear, each milestone meaningful.
          </p>

          {/* Roadmap with boxed cards */}
          <div style={{ 
            position: 'relative', 
            marginTop: '1.5rem',
            paddingLeft: '20px'
          }}>
            {/* Vertical connecting line */}
            <div style={{
              position: 'absolute',
              left: '8px',
              top: '20px',
              bottom: '20px',
              width: '2px',
              background: 'var(--editorial-grid)',
              opacity: 0.5
            }} />

            {[
              { n: '01', t: 'Start Here', d: 'Your journey begins' },
              { n: '02', t: 'Build Foundation', d: 'Core concepts first' },
              { n: '03', t: 'Practice', d: 'Apply what you learn' },
              { n: '04', t: 'Go Deeper', d: 'Advanced techniques' },
              { n: '05', t: 'Master It', d: 'Achieve confidence' }
            ].map((step, i) => (
              <FadeSection key={i} delay={0.2 + i * 0.1}>
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  marginBottom: '1rem',
                  position: 'relative'
                }}>
                  {/* Dot on the line */}
                  <div style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '50%',
                    border: '2px solid var(--editorial-ink-muted)',
                    background: i === 0 ? 'var(--editorial-ink-muted)' : 'var(--editorial-bg)',
                    flexShrink: 0,
                    zIndex: 1
                  }} />
                  
                  {/* Box card */}
                  <div style={{
                    flex: 1,
                    padding: '1rem 1.25rem',
                    border: '1px solid var(--editorial-grid)',
                    background: 'var(--editorial-bg)',
                    position: 'relative'
                  }}>
                    {/* Number badge */}
                    <span style={{
                      position: 'absolute',
                      top: '-8px',
                      left: '12px',
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.7rem',
                      color: 'var(--editorial-ink-muted)',
                      background: 'var(--editorial-bg)',
                      padding: '0 0.4rem'
                    }}>
                      {step.n}
                    </span>
                    
                    <h4 style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1rem',
                      fontWeight: 500,
                      color: 'var(--editorial-ink)',
                      marginBottom: '0.25rem'
                    }}>
                      {step.t}
                    </h4>
                    <p style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '0.85rem',
                      color: 'var(--editorial-ink-light)',
                      lineHeight: 1.5,
                      margin: 0
                    }}>
                      {step.d}
                    </p>
                  </div>
                </div>
              </FadeSection>
            ))}
          </div>
        </ZigZagSection>

        <ZigZagTransition toAlign="center" height="12vh" />

        {/* SECTION 4: CENTER (Checkpoint) */}
        <ZigZagSection align="center" style={{ minHeight: '50vh' }}>
          <FillerElement type="wave" style={{ marginBottom: '2rem', opacity: 0.3 }} />
          <EmotionalQuote>
            "You don't need to know everything yet.<br />
            You just need the next step."
          </EmotionalQuote>
          <FillerElement type="wave" style={{ marginTop: '2rem', opacity: 0.3, transform: 'rotate(180deg)' }} />
        </ZigZagSection>

        <ZigZagTransition 
          narrative="Clarity builds with each step..."
          toAlign="left"
          decoration={<FillerElement type="circle" />}
        />

        {/* SECTION 5: LEFT (Growth) */}
        <ZigZagSection 
          align="left"
          annotation={<>confidence<br/>grows</>}
          oppositeContent={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <DoodleCheck size={50} />
                <DoodleStar size={50} />
              </div>
              <OppositeDecoration type="dots" />
            </div>
          }
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--editorial-ink-muted)',
            marginBottom: '1.5rem',
            display: 'block'
          }}>
            Chapter Four
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--editorial-ink)',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            Clarity & Confidence
          </h2>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-light)',
            lineHeight: 1.7,
            marginBottom: '2rem'
          }}>
            As you follow the path, confusion transforms into understanding.
          </p>

          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            {[
              { label: 'Structured', icon: <DoodleCheck size={30} /> },
              { label: 'Guided', icon: <DoodleArrow direction="right" size={30} /> },
              { label: 'Achievable', icon: <DoodleStar size={30} /> }
            ].map((item, i) => (
              <FadeSection key={i} delay={0.3 + i * 0.1}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ opacity: 0.5 }}>{item.icon}</div>
                  <span style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.7rem',
                    fontWeight: 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--editorial-ink)'
                  }}>
                    {item.label}
                  </span>
                </div>
              </FadeSection>
            ))}
          </div>
        </ZigZagSection>

        <ZigZagTransition toAlign="right" height="12vh" />

        {/* Quote */}
        <ZigZagSection align="center" style={{ minHeight: '40vh' }}>
          <EmotionalQuote>
            "Every expert was once a beginner.<br />
            The only difference is they started."
          </EmotionalQuote>
        </ZigZagSection>

        <ZigZagTransition 
          narrative="Your journey awaits..."
          toAlign="right"
          decoration={<FillerElement type="star" />}
        />

        {/* SECTION 6: RIGHT (CTA) */}
        <ZigZagSection 
          align="right"
          annotation={<>take the<br/>first step</>}
          oppositeContent={
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
              <OppositeDecoration type="target" />
              <p style={{
                fontFamily: 'var(--font-display)',
                fontSize: '0.75rem',
                color: 'var(--editorial-ink-muted)',
                textAlign: 'center',
                opacity: 0.4
              }}>
                your starting<br/>point
              </p>
            </div>
          }
        >
          <span style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--editorial-ink-muted)',
            marginBottom: '1.5rem',
            display: 'block'
          }}>
            Chapter Five
          </span>

          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: 'var(--editorial-ink)',
            lineHeight: 1.1,
            marginBottom: '1.5rem'
          }}>
            Begin Your Journey
          </h2>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: 'var(--editorial-ink-light)',
            lineHeight: 1.7,
            marginBottom: '2rem'
          }}>
            Your learning journey starts with a single step —<br />
            and a clear path forward.
          </p>

          <FadeSection delay={0.4}>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <Link
                to="/roadmaps"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--editorial-bg)',
                  background: 'var(--editorial-ink)',
                  padding: '0.9rem 1.75rem',
                  textDecoration: 'none',
                  border: '1px solid var(--editorial-ink)'
                }}
              >
                Explore Roadmaps
              </Link>
              <Link
                to="/journey"
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--editorial-ink)',
                  background: 'transparent',
                  padding: '0.9rem 1.75rem',
                  textDecoration: 'none',
                  border: '1px solid var(--editorial-ink)'
                }}
              >
                Your Journey
              </Link>
            </div>
          </FadeSection>
        </ZigZagSection>

        <ZigZagTransition toAlign="center" height="8vh" />

        {/* Footer */}
        <footer style={{
          padding: '4rem 1.5rem 3rem',
          borderTop: '1px solid var(--editorial-grid)',
          textAlign: 'center'
        }}>
          <FillerElement type="dots" style={{ margin: '0 auto 2rem' }} />
          <NarrativeText style={{ marginBottom: '2rem' }}>
            Thank you for scrolling through our story.
          </NarrativeText>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--editorial-ink-muted)'
          }}>
            © 2024 SkillTrail — Learn with intention
          </p>
        </footer>
      </div>
    </>
  )
}

export default StoryHomePage
