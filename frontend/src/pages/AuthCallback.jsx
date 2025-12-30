import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

/**
 * OAuth callback handler
 * Processes the callback from Supabase auth and redirects to home
 */
export function AuthCallback() {
  const navigate = useNavigate()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          navigate('/login')
          return
        }

        if (data.session) {
          // Successfully authenticated, redirect to home
          navigate('/')
        } else {
          // No session, redirect to login
          navigate('/login')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        navigate('/login')
      }
    }

    handleAuthCallback()
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="spinner mx-auto mb-4" />
        <p className="text-[var(--color-text-muted)]">Completing sign in...</p>
      </div>
    </div>
  )
}

export default AuthCallback
