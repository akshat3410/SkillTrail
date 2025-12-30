import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { api } from '../lib/api'
import { 
  DoodlePage, 
  DoodleButton, 
  DoodleCard, 
  DoodleCardHeader, 
  DoodleCardTitle, 
  DoodleCardDescription,
  DoodleBadge,
  ScrollTrail,
  BackgroundDoodles,
  ScrollReveal,
  StaggerReveal,
  AnimatedSection,
  ParallaxElement
} from '../components/doodle'

/**
 * Home page - SkillTrail landing with clear value proposition
 * Enhanced with scroll-triggered motion animations
 */
export function HomePage() {
  const [roadmaps, setRoadmaps] = useState([])
  const [loading, setLoading] = useState(true)

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

  return (
    <DoodlePage>
      {/* Background decorative doodles with parallax */}
      <ParallaxElement speed={0.3} direction="up">
        <BackgroundDoodles />
      </ParallaxElement>
      
      {/* Scroll-triggered learning trail */}
      <ScrollTrail />

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="py-16 md:py-24">
        <div className="container max-w-4xl mx-auto text-center">
          {/* Primary Headline */}
          <ScrollReveal>
            <h1 
              className="font-['Caveat'] text-5xl md:text-7xl font-bold mb-6 leading-tight"
              style={{ color: 'var(--doodle-text)' }}
            >
              Learn skills as a{' '}
              <span 
                style={{ 
                  background: 'var(--doodle-yellow)',
                  padding: '0 16px',
                  borderRadius: '8px',
                  display: 'inline-block',
                  transform: 'rotate(-1deg)'
                }}
              >
                journey
              </span>
              , not a playlist.
            </h1>
          </ScrollReveal>

          {/* Sub-headline */}
          <ScrollReveal delay={0.1}>
            <p 
              className="font-['Patrick_Hand'] text-xl md:text-2xl mb-8 max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'var(--doodle-text-muted)' }}
            >
              SkillTrail helps you follow visual roadmaps, track real progress, 
              and remember <em>why</em> you learned each skill — not just what you watched.
            </p>
          </ScrollReveal>

          {/* Supporting Points */}
          <StaggerReveal delay={0.2} stagger={0.08}>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ 
                  background: 'var(--doodle-mint-light)',
                  border: '2px solid var(--doodle-stroke)'
                }}
              >
                <span>🗺️</span>
                <span className="font-['Patrick_Hand'] text-base">Visual, scroll-based roadmaps</span>
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ 
                  background: 'var(--doodle-blue-light)',
                  border: '2px solid var(--doodle-stroke)'
                }}
              >
                <span>📈</span>
                <span className="font-['Patrick_Hand'] text-base">Beginner → Confident paths</span>
              </div>
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{ 
                  background: 'var(--doodle-purple-light)',
                  border: '2px solid var(--doodle-stroke)'
                }}
              >
                <span>💾</span>
                <span className="font-['Patrick_Hand'] text-base">Progress & notes saved</span>
              </div>
            </div>
          </StaggerReveal>

          {/* CTAs */}
          <ScrollReveal delay={0.4}>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/roadmaps">
                <DoodleButton variant="primary" size="lg">
                  Start a Roadmap
                </DoodleButton>
              </Link>
              <Link 
                to="/roadmaps" 
                className="font-['Patrick_Hand'] text-lg flex items-center gap-1 px-4 py-3"
                style={{ color: 'var(--doodle-text-muted)', textDecoration: 'none' }}
              >
                View Roadmaps →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ============================================
          WHY SKILLTRAIL EXISTS
          ============================================ */}
      <AnimatedSection>
        <section className="py-16" style={{ background: 'var(--doodle-bg-alt)' }}>
          <div className="container max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 
                className="font-['Caveat'] text-4xl md:text-5xl font-bold mb-10 text-center"
                style={{ color: 'var(--doodle-text)' }}
              >
                Why SkillTrail
              </h2>
            </ScrollReveal>

            <StaggerReveal stagger={0.15}>
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* The Problem */}
                <DoodleCard variant="pink">
                  <h3 className="font-['Caveat'] text-2xl font-semibold mb-4 flex items-center gap-2">
                    <span>😓</span> Learning today is broken
                  </h3>
                  <ul className="space-y-3 font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Learning is fragmented across too many sources</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Courses teach topics, not complete paths</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>People forget what they learned and why</span>
                    </li>
                  </ul>
                </DoodleCard>

                {/* The Solution */}
                <DoodleCard variant="mint">
                  <h3 className="font-['Caveat'] text-2xl font-semibold mb-4 flex items-center gap-2">
                    <span>✨</span> SkillTrail fixes this
                  </h3>
                  <ul className="space-y-3 font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Skills become clear visual journeys</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Shows what's next, not everything at once</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>•</span>
                      <span>Save progress, notes, and context</span>
                    </li>
                  </ul>
                </DoodleCard>
              </div>
            </StaggerReveal>

            <ScrollReveal delay={0.3}>
              <p 
                className="font-['Patrick_Hand'] text-xl text-center max-w-2xl mx-auto"
                style={{ color: 'var(--doodle-text)' }}
              >
                <strong>SkillTrail is your personal map for learning anything seriously.</strong>
              </p>
            </ScrollReveal>
          </div>
        </section>
      </AnimatedSection>

      {/* ============================================
          HOW IT WORKS - 3 Steps
          ============================================ */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 
                className="font-['Caveat'] text-4xl md:text-5xl font-bold mb-12 text-center"
                style={{ color: 'var(--doodle-text)' }}
              >
                How It Works
              </h2>
            </ScrollReveal>

            <StaggerReveal stagger={0.12}>
              <div className="grid md:grid-cols-3 gap-6">
                {/* Step 1 */}
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center font-['Caveat'] text-3xl font-bold"
                    style={{ 
                      background: 'var(--doodle-yellow)',
                      border: '3px solid var(--doodle-stroke)',
                      borderRadius: '50%',
                      transform: 'rotate(-3deg)'
                    }}
                  >
                    1
                  </div>
                  <h3 className="font-['Caveat'] text-2xl font-semibold mb-2">Choose a Roadmap</h3>
                  <p className="font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                    Start with a structured path designed to make sense end-to-end.
                  </p>
                </div>

                {/* Step 2 */}
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center font-['Caveat'] text-3xl font-bold"
                    style={{ 
                      background: 'var(--doodle-blue)',
                      border: '3px solid var(--doodle-stroke)',
                      borderRadius: '50%',
                      transform: 'rotate(2deg)'
                    }}
                  >
                    2
                  </div>
                  <h3 className="font-['Caveat'] text-2xl font-semibold mb-2">Follow the Path</h3>
                  <p className="font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                    Scroll through an animated roadmap where each step builds on the last.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="text-center">
                  <div 
                    className="w-16 h-16 mx-auto mb-4 flex items-center justify-center font-['Caveat'] text-3xl font-bold"
                    style={{ 
                      background: 'var(--doodle-mint)',
                      border: '3px solid var(--doodle-stroke)',
                      borderRadius: '50%',
                      transform: 'rotate(-2deg)'
                    }}
                  >
                    3
                  </div>
                  <h3 className="font-['Caveat'] text-2xl font-semibold mb-2">Learn Deeply</h3>
                  <p className="font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                    Click any step to understand it, learn deeply, and track your progress.
                  </p>
                </div>
              </div>
            </StaggerReveal>
          </div>
        </section>
      </AnimatedSection>

      {/* ============================================
          WHO IT'S FOR
          ============================================ */}
      <AnimatedSection>
        <section className="py-16" style={{ background: 'var(--doodle-bg-alt)' }}>
          <div className="container max-w-3xl mx-auto text-center">
            <ScrollReveal>
              <h2 
                className="font-['Caveat'] text-4xl md:text-5xl font-bold mb-8"
                style={{ color: 'var(--doodle-text)' }}
              >
                Who It's For
              </h2>
            </ScrollReveal>

            <StaggerReveal stagger={0.1}>
              <div className="flex flex-wrap justify-center gap-3">
                <DoodleBadge variant="yellow">👨‍💻 Developers & tech learners</DoodleBadge>
                <DoodleBadge variant="blue">📚 Self-learners who want clarity</DoodleBadge>
                <DoodleBadge variant="pink">🎯 Tired of random tutorials</DoodleBadge>
                <DoodleBadge variant="mint">🧠 Anyone who wants to remember their journey</DoodleBadge>
              </div>
            </StaggerReveal>
          </div>
        </section>
      </AnimatedSection>

      {/* ============================================
          FEATURED ROADMAPS (Preview)
          ============================================ */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container">
            <ScrollReveal>
              <div className="flex items-center justify-between mb-8">
                <h2 
                  className="font-['Caveat'] text-3xl font-bold"
                  style={{ color: 'var(--doodle-text)' }}
                >
                  📚 Start Learning
                </h2>
                <Link 
                  to="/roadmaps" 
                  className="font-['Patrick_Hand'] text-lg"
                  style={{ color: 'var(--doodle-text-muted)', textDecoration: 'none' }}
                >
                  View all →
                </Link>
              </div>
            </ScrollReveal>

            {loading ? (
              <div className="text-center py-12">
                <div className="doodle-spinner mx-auto mb-4" />
                <p className="font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                  Loading roadmaps...
                </p>
              </div>
            ) : (
              <StaggerReveal stagger={0.1}>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {roadmaps.slice(0, 3).map((roadmap, index) => (
                    <Link key={roadmap.id} to={`/roadmap/${roadmap.id}`} className="no-underline">
                      <DoodleCard variant={['yellow', 'blue', 'mint'][index % 3]}>
                        <DoodleCardHeader>
                          <div 
                            className="w-12 h-12 mb-3 flex items-center justify-center text-xl"
                            style={{ 
                              background: 'white',
                              border: '2.5px solid var(--doodle-stroke)',
                              borderRadius: '12px'
                            }}
                          >
                            📖
                          </div>
                          <DoodleCardTitle>{roadmap.title}</DoodleCardTitle>
                          <DoodleCardDescription>{roadmap.description}</DoodleCardDescription>
                        </DoodleCardHeader>
                        <div className="mt-4">
                          <span 
                            className="font-['Patrick_Hand'] text-base"
                            style={{ color: 'var(--doodle-text)' }}
                          >
                            View Roadmap →
                          </span>
                        </div>
                      </DoodleCard>
                    </Link>
                  ))}

                  {roadmaps.length === 0 && !loading && (
                    <div className="col-span-full text-center py-8">
                      <p className="font-['Patrick_Hand'] text-lg" style={{ color: 'var(--doodle-text-muted)' }}>
                        Roadmaps coming soon! 🚧
                      </p>
                    </div>
                  )}
                </div>
              </StaggerReveal>
            )}
          </div>
        </section>
      </AnimatedSection>

      {/* ============================================
          FINAL CTA
          ============================================ */}
      <AnimatedSection>
        <section className="py-16">
          <div className="container max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <h2 
                className="font-['Caveat'] text-3xl md:text-4xl font-bold mb-4"
                style={{ color: 'var(--doodle-text)' }}
              >
                Ready to learn with direction?
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p 
                className="font-['Patrick_Hand'] text-xl mb-6"
                style={{ color: 'var(--doodle-text-muted)' }}
              >
                Pick a roadmap and start your journey.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <Link to="/roadmaps">
                <DoodleButton variant="primary" size="lg">
                  Browse Roadmaps
                </DoodleButton>
              </Link>
            </ScrollReveal>
          </div>
        </section>
      </AnimatedSection>
    </DoodlePage>
  )
}

export default HomePage

