import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Hard-fail if credentials are missing in ANY environment.
// Never fall back to placeholder URLs — that sends auth tokens
// and user data to an unknown third-party domain.
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
        'Missing required environment variables: NEXT_PUBLIC_SUPABASE_URL and/or NEXT_PUBLIC_SUPABASE_ANON_KEY. '
        + 'Add them to your .env.local file.'
    )
}

export const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
        auth: {
            detectSessionInUrl: true,
            persistSession: true,
            autoRefreshToken: true
        }
    }
)

export default supabase
