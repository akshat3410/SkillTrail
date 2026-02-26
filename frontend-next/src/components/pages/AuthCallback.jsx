"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

/**
 * OAuth callback handler
 * Processes the callback from Supabase auth and redirects to home
 */
export function AuthCallback() {
  const router = useRouter()

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the session from the URL hash
        const { data, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          router.push('/login')
          return
        }

        if (data.session) {
          // Successfully authenticated, redirect to home
          router.push('/')
        } else {
          // No session, redirect to login
          router.push('/login')
        }
      } catch (err) {
        console.error('Auth callback error:', err)
        router.push('/login')
      }
    }

    handleAuthCallback()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 border-4 border-[var(--color-border)] border-t-[var(--color-accent-blue)] rounded-full animate-spin" role="status" aria-label="Loading" />
        <p className="text-[var(--color-text-muted)]">Completing sign in...</p>
      </div>
    </div>
  )
}

export default AuthCallback
