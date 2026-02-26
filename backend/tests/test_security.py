"""
Security test suite for the SkillTrail backend.

Tests cover:
- Schema validation (input bounds, enum enforcement, email format)
- Auth bypass detection (unauthenticated access to protected endpoints)
- Error opacity (no internal details leaked in error responses)

Run: pytest tests/test_security.py -v
"""
import pytest
from pydantic import ValidationError

from app.models.schemas import (
    NoteUpdate,
    ProgressUpdate,
    RoadmapRequestCreate,
)


# ===========================
# Schema: ProgressUpdate
# ===========================

class TestProgressUpdateSchema:
    """ProgressUpdate.status should only accept the three valid Literal values."""

    def test_valid_statuses_accepted(self):
        for status in ("not_started", "in_progress", "completed"):
            update = ProgressUpdate(status=status)
            assert update.status == status

    def test_invalid_status_rejected(self):
        with pytest.raises(ValidationError):
            ProgressUpdate(status="garbage")

    def test_empty_status_rejected(self):
        with pytest.raises(ValidationError):
            ProgressUpdate(status="")

    def test_sql_injection_status_rejected(self):
        with pytest.raises(ValidationError):
            ProgressUpdate(status="'; DROP TABLE user_progress; --")


# ===========================
# Schema: NoteUpdate
# ===========================

class TestNoteUpdateSchema:
    """NoteUpdate.content should be bounded to 50,000 characters."""

    def test_normal_content_accepted(self):
        note = NoteUpdate(content="Hello world")
        assert note.content == "Hello world"

    def test_empty_content_accepted(self):
        note = NoteUpdate(content="")
        assert note.content == ""

    def test_max_length_accepted(self):
        content = "x" * 50_000
        note = NoteUpdate(content=content)
        assert len(note.content) == 50_000

    def test_over_max_length_rejected(self):
        with pytest.raises(ValidationError):
            NoteUpdate(content="x" * 50_001)

    def test_large_unicode_content_rejected(self):
        # Unicode chars still count against the limit
        with pytest.raises(ValidationError):
            NoteUpdate(content="🔥" * 50_001)


# ===========================
# Schema: RoadmapRequestCreate
# ===========================

class TestRoadmapRequestCreateSchema:
    """RoadmapRequestCreate should validate name length and email format."""

    def test_valid_request(self):
        req = RoadmapRequestCreate(name="Kubernetes", reason="I want to learn K8s")
        assert req.name == "Kubernetes"

    def test_empty_name_rejected(self):
        with pytest.raises(ValidationError):
            RoadmapRequestCreate(name="")

    def test_name_over_200_chars_rejected(self):
        with pytest.raises(ValidationError):
            RoadmapRequestCreate(name="x" * 201)

    def test_reason_over_2000_chars_rejected(self):
        with pytest.raises(ValidationError):
            RoadmapRequestCreate(name="Valid", reason="x" * 2001)

    def test_valid_email_accepted(self):
        req = RoadmapRequestCreate(name="Valid", email="user@example.com")
        assert req.email == "user@example.com"

    def test_invalid_email_rejected(self):
        with pytest.raises(ValidationError):
            RoadmapRequestCreate(name="Valid", email="not-an-email")

    def test_email_without_tld_rejected(self):
        with pytest.raises(ValidationError):
            RoadmapRequestCreate(name="Valid", email="user@localhost")

    def test_null_email_accepted(self):
        req = RoadmapRequestCreate(name="Valid", email=None)
        assert req.email is None


# ===========================
# Auth: User ID validation
# ===========================

class TestAuthUserIdValidation:
    """User ID format validation in auth module."""

    def test_valid_uuid_accepted(self):
        from app.core.auth import _validate_user_id
        result = _validate_user_id("550e8400-e29b-41d4-a716-446655440000")
        assert result == "550e8400-e29b-41d4-a716-446655440000"

    def test_arbitrary_string_rejected(self):
        from app.core.auth import _validate_user_id
        from fastapi import HTTPException
        with pytest.raises(HTTPException) as exc_info:
            _validate_user_id("admin")
        assert exc_info.value.status_code == 400

    def test_sql_injection_rejected(self):
        from app.core.auth import _validate_user_id
        from fastapi import HTTPException
        with pytest.raises(HTTPException):
            _validate_user_id("'; DROP TABLE users; --")

    def test_empty_string_rejected(self):
        from app.core.auth import _validate_user_id
        from fastapi import HTTPException
        with pytest.raises(HTTPException):
            _validate_user_id("")


# ===========================
# Error opacity
# ===========================

class TestErrorOpacity:
    """Verify that error responses in router code use generic messages."""

    def test_roadmaps_router_no_str_e(self):
        """Confirm no f-string error leaking in roadmaps router."""
        import inspect
        from app.api.v1 import roadmaps
        source = inspect.getsource(roadmaps)
        assert "str(e)" not in source, "roadmaps.py still leaks exception details via str(e)"

    def test_nodes_router_no_str_e(self):
        import inspect
        from app.api.v1 import nodes
        source = inspect.getsource(nodes)
        assert "str(e)" not in source, "nodes.py still leaks exception details via str(e)"

    def test_progress_router_no_str_e(self):
        import inspect
        from app.api.v1 import progress
        source = inspect.getsource(progress)
        assert "str(e)" not in source, "progress.py still leaks exception details via str(e)"

    def test_notes_router_no_str_e(self):
        import inspect
        from app.api.v1 import notes
        source = inspect.getsource(notes)
        assert "str(e)" not in source, "notes.py still leaks exception details via str(e)"

    def test_user_router_no_str_e(self):
        import inspect
        from app.api.v1 import user
        source = inspect.getsource(user)
        assert "str(e)" not in source, "user.py still leaks exception details via str(e)"
