from typing import Optional
from fastapi import Depends, Header
from pydantic import BaseModel


# Mock user ID for development (login disabled)
MOCK_USER_ID = "dev-user-001"


class AuthenticatedUser(BaseModel):
    """Authenticated user information."""
    id: str
    email: Optional[str] = None


async def get_current_user(
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
) -> AuthenticatedUser:
    """
    Development auth - accepts X-User-Id header or uses mock user.
    JWT verification is disabled.
    """
    user_id = x_user_id or MOCK_USER_ID
    return AuthenticatedUser(
        id=user_id,
        email="dev@skilltrail.local"
    )


async def get_optional_user(
    x_user_id: Optional[str] = Header(None, alias="X-User-Id")
) -> Optional[AuthenticatedUser]:
    """
    Development auth - always returns a user.
    """
    user_id = x_user_id or MOCK_USER_ID
    return AuthenticatedUser(
        id=user_id,
        email="dev@skilltrail.local"
    )
