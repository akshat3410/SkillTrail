import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let _supabase = null

function getSupabase() {
    if (_supabase) return _supabase

    if (!supabaseUrl || !supabaseAnonKey) {
        // During static build (CI), env vars may not be available.
        // Return null — features requiring Supabase will be disabled.
        if (typeof window === 'undefined') return null

        console.warn(
            'Missing NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY. '
            + 'Auth and cloud sync features are disabled.'
        )
        return null
    }

    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true,
        },
    })

    return _supabase
}

export const supabase = typeof window !== 'undefined' ? getSupabase() : getSupabase()
export default supabase
export { getSupabase }
