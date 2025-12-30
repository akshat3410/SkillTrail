import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './hooks/useAuth'

// Pages - Scrollytelling (New)
import { StoryHomePage } from './components/scrollytelling'

// Pages - Editorial Design
import RoadmapsPage from './pages/RoadmapsPage'
import LoginPage from './pages/LoginPage'
import RoadmapPage from './pages/RoadmapPage'
import TopicPage from './pages/TopicPage'
import JourneyPage from './pages/JourneyPage'
import AuthCallback from './pages/AuthCallback'

// Styles
import './index.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div 
          className="min-h-screen" 
          style={{ background: 'var(--editorial-bg)' }}
        >
          <main>
            <Routes>
              {/* Scrollytelling Homepage */}
              <Route path="/" element={<StoryHomePage />} />
              
              {/* Editorial Design Pages */}
              <Route path="/roadmaps" element={<RoadmapsPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
              <Route path="/roadmap/:id" element={<RoadmapPage />} />
              <Route path="/topic/:id" element={<TopicPage />} />
              <Route path="/journey" element={<JourneyPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App


