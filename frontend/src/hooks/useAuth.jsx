import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock user for development (login disabled)
const MOCK_USER = {
  id: 'dev-user-001',
  email: 'dev@skilltrail.local',
  user_metadata: {
    full_name: 'Dev User',
    avatar_url: null
  }
}

export function AuthProvider({ children }) {
  // Always logged in with mock user
  const [user] = useState(MOCK_USER)
  const [loading] = useState(false)

  const signInWithGoogle = async () => {
    console.log('Login disabled - using mock user')
  }

  const signInWithGitHub = async () => {
    console.log('Login disabled - using mock user')
  }

  const signOut = async () => {
    console.log('Logout disabled - using mock user')
  }

  const value = {
    user,
    session: { access_token: 'mock-token' },
    loading,
    signInWithGoogle,
    signInWithGitHub,
    signOut,
    isAuthenticated: true  // Always authenticated
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
