"""
Seed Script: Git & GitHub Roadmap

Loads the Git roadmap content from JSON into Supabase database.
Run this script to populate the database with learning content.

Usage:
    cd backend
    python -m scripts.seed_git_roadmap
"""

import json
import os
import sys
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.core.supabase import init_supabase


def load_git_roadmap():
    """Load the Git roadmap JSON data."""
    data_path = Path(__file__).parent.parent / "data" / "git_roadmap.json"
    
    if not data_path.exists():
        print(f"Error: {data_path} not found")
        sys.exit(1)
    
    with open(data_path, "r") as f:
        return json.load(f)


def seed_roadmap(supabase, roadmap_data):
    """Insert or update the roadmap."""
    roadmap = roadmap_data["roadmap"]
    
    # Check if roadmap already exists
    existing = supabase.table("roadmaps").select("id").eq("id", roadmap["id"]).execute()
    
    if existing.data:
        # Update existing
        print(f"Updating roadmap: {roadmap['title']}")
        supabase.table("roadmaps").update({
            "title": roadmap["title"],
            "description": roadmap["description"]
        }).eq("id", roadmap["id"]).execute()
    else:
        # Insert new
        print(f"Creating roadmap: {roadmap['title']}")
        supabase.table("roadmaps").insert({
            "id": roadmap["id"],
            "title": roadmap["title"],
            "description": roadmap["description"]
        }).execute()
    
    return roadmap["id"]


def seed_nodes(supabase, roadmap_id, nodes):
    """Insert or update nodes for the roadmap."""
    for node in nodes:
        node_data = {
            "id": node["id"],
            "roadmap_id": roadmap_id,
            "title": node["title"],
            "short_summary": node.get("short_summary"),
            "order_index": node["order_index"],
            "svg_x": node.get("svg_x", 50),
            "svg_y": node.get("svg_y", 100),
            "video_url": node.get("video_url"),
            "blog_links": node.get("blog_links", []),
            "estimated_time": node.get("estimated_time"),
            "content": node.get("content"),
            "tldr": node.get("tldr"),
            "why_matters": node.get("why_matters"),
            "common_mistakes": node.get("common_mistakes")
        }
        
        # Check if node exists
        existing = supabase.table("nodes").select("id").eq("id", node["id"]).execute()
        
        if existing.data:
            print(f"  Updating node: {node['title']}")
            supabase.table("nodes").update(node_data).eq("id", node["id"]).execute()
        else:
            print(f"  Creating node: {node['title']}")
            supabase.table("nodes").insert(node_data).execute()


def main():
    print("=" * 50)
    print("Seeding Git & GitHub Roadmap")
    print("=" * 50)
    
    # Initialize Supabase
    try:
        supabase = init_supabase()
        print("✓ Connected to Supabase")
    except Exception as e:
        print(f"✗ Failed to connect to Supabase: {e}")
        sys.exit(1)
    
    # Load data
    data = load_git_roadmap()
    print(f"✓ Loaded {len(data['nodes'])} nodes from JSON")
    
    # Seed roadmap
    try:
        roadmap_id = seed_roadmap(supabase, data)
        print(f"✓ Roadmap ready: {roadmap_id}")
    except Exception as e:
        print(f"✗ Failed to seed roadmap: {e}")
        sys.exit(1)
    
    # Seed nodes
    try:
        seed_nodes(supabase, roadmap_id, data["nodes"])
        print(f"✓ All {len(data['nodes'])} nodes seeded")
    except Exception as e:
        print(f"✗ Failed to seed nodes: {e}")
        sys.exit(1)
    
    print("=" * 50)
    print("✓ Seeding complete!")
    print("=" * 50)


if __name__ == "__main__":
    main()
