from supabase import create_client, Client
from app.core.config import settings


def get_supabase_client() -> Client:
    """Create and return Supabase client with service role key."""
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise ValueError("Supabase credentials not configured")
    
    return create_client(
        settings.supabase_url,
        settings.supabase_service_role_key
    )


# Singleton client instance
supabase: Client = None


def init_supabase() -> Client:
    """Initialize the Supabase client singleton."""
    global supabase
    if supabase is None:
        supabase = get_supabase_client()
    return supabase
