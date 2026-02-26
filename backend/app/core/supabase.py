from functools import lru_cache
from supabase import create_client, Client
from app.core.config import settings


def _create_client() -> Client:
    """Create and return Supabase client with service role key."""
    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise ValueError("Supabase credentials not configured")

    return create_client(
        settings.supabase_url,
        settings.supabase_service_role_key
    )


@lru_cache()
def get_supabase() -> Client:
    """Get the singleton Supabase client instance."""
    return _create_client()
