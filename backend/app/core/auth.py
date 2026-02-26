import logging
import re
from typing import Optional

from fastapi import Header, HTTPException, status
from pydantic import BaseModel

from app.core.config import settings

logger = logging.getLogger(__name__)

# UUID v4 pattern — validates X-User-Id format even in dev mode
_UUID_RE = re.compile(
    r"^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$",
    re.IGNORECASE,
)

# Fallback mock user — only used when debug=True and no header is provided
_MOCK_USER_ID = "00000000-0000-4000-a000-000000000001"


class AuthenticatedUser(BaseModel):
    """Authenticated user information."""
    id: str
    email: Optional[str] = None


def _validate_user_id(user_id: str) -> str:
    """Validate that a user_id looks like a UUID.

    Prevents callers from injecting arbitrary strings as user IDs.
    Also accepts the legacy 'dev-user-001' format in debug mode only.
    """
    if settings.debug and user_id == "dev-user-001":
        # Accept legacy dev ID for backwards compat during migration
        return user_id
    if not _UUID_RE.match(user_id):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid user ID format",
        )
    return user_id


async def get_current_user(
    x_user_id: Optional[str] = Header(None, alias="X-User-Id"),
    authorization: Optional[str] = Header(None),
) -> AuthenticatedUser:
    """Resolve the current authenticated user.

    Production (debug=False):
      Requires a valid Supabase JWT in the Authorization header.
      Falls back to X-User-Id only if JWT is not present AND
      settings allow it (they don't — raises 401).

    Development (debug=True):
      Accepts X-User-Id header or falls back to a mock user.
      Logs a warning so it's obvious mock auth is active.
    """
    # --- Production path: verify JWT ---
    if not settings.debug:
        if not authorization:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required",
                headers={"WWW-Authenticate": "Bearer"},
            )

        token = authorization.removeprefix("Bearer ").strip()
        if not token or token == authorization:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid authorization header format",
                headers={"WWW-Authenticate": "Bearer"},
            )

        if not settings.supabase_jwt_secret:
            logger.error("supabase_jwt_secret is not configured")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Authentication service misconfigured",
            )

        try:
            import jwt as pyjwt  # PyJWT — lightweight, no extra deps

            payload = pyjwt.decode(
                token,
                settings.supabase_jwt_secret,
                algorithms=["HS256"],
                audience="authenticated",
            )
            user_id = payload.get("sub")
            if not user_id:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Invalid token: missing subject",
                )
            return AuthenticatedUser(
                id=_validate_user_id(user_id),
                email=payload.get("email"),
            )
        except HTTPException:
            raise
        except Exception:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid or expired token",
                headers={"WWW-Authenticate": "Bearer"},
            )

    # --- Development path: mock auth ---
    logger.warning("Using mock authentication — NOT SAFE FOR PRODUCTION")
    user_id = x_user_id or _MOCK_USER_ID
    return AuthenticatedUser(
        id=_validate_user_id(user_id),
        email="dev@skilltrail.local",
    )
