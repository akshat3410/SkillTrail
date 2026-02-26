# SkillTrail

**Visual learning roadmap platform.** Scroll through animated trails, click topics to learn, track your progress.

[![GitHub](https://img.shields.io/badge/github-repo-black.svg)](https://github.com/akshat3410/SkillTrail)

## Features

- **Interactive Roadmaps** — Scroll-driven animated trails with node-by-node progression
- **Rich Content** — Markdown lessons, embedded video cards, code blocks with syntax highlighting
- **Progress Tracking** — Mark topics complete, track status across trails (localStorage + Supabase sync)
- **Quiz System** — Knowledge checks with animated transitions and instant feedback
- **Auth** — Google & GitHub login via Supabase Auth
- **Dashboard** — Streak tracking, active paths, skill radar visualization
- **Swiss Tech Noir Design** — Dark-mode interface with volt (#CCFF00) accents, scroll-linked animations, and a lantern cursor effect

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Styling** | Tailwind CSS v4 + CSS custom properties |
| **Animation** | Framer Motion, GSAP + ScrollTrigger |
| **Icons** | Lucide React |
| **Auth & DB** | Supabase (PostgreSQL + Auth + RLS) |
| **Backend** | FastAPI (Python) |
| **Utilities** | clsx, tailwind-merge |

## Prerequisites

- Node.js 18+
- Python 3.10+
- A Supabase project ([supabase.com](https://supabase.com) — free tier works)

## Setup

### 1. Clone & Install

```bash
git clone https://github.com/akshat3410/SkillTrail.git
cd SkillTrail

# Frontend
cd frontend-next
npm install

# Backend
cd ../backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Enable **Google** and **GitHub** under Authentication → Providers
3. Run `supabase/schema.sql` in the SQL Editor
4. Copy credentials from Settings → API

### 3. Environment Variables

**Frontend** (`frontend-next/.env.local`):
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

**Backend** (`backend/.env`):
```env
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:3000
DEBUG=true
```

> Find the JWT Secret in **Settings → API → JWT Settings**

### 4. Run

```bash
# Terminal 1 — Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 — Frontend
cd frontend-next
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
SkillTrail/
├── frontend-next/
│   └── src/
│       ├── app/                    # Next.js routes (10 pages)
│       │   ├── layout.jsx          # Root layout (Navbar, Footer, LanternEffect)
│       │   ├── page.jsx            # Homepage
│       │   ├── dashboard/          # User dashboard
│       │   ├── roadmaps/           # Trail catalog
│       │   ├── roadmap/[slug]/     # Interactive roadmap viewer
│       │   ├── topic/[id]/         # Topic content & learning
│       │   ├── lesson/[slug]/      # Lesson reader
│       │   ├── quiz/[slug]/        # Quiz engine
│       │   ├── login/              # Authentication
│       │   ├── journey/            # User journey
│       │   └── auth/callback/      # OAuth callback
│       ├── components/
│       │   ├── home/               # Homepage sections (Hero, ValueGrid, CinematicScroll, etc.)
│       │   ├── layout/             # Navbar, Footer
│       │   ├── dashboard/          # StreakWidget, ActivePathsWidget, SkillRadarWidget
│       │   ├── roadmap/            # InteractiveMap, NodeDetailPanel, RoadmapHeader
│       │   ├── roadmaps/           # RoadmapCard, StoryRoadmapCard, TechLogos
│       │   ├── learning/           # LearningContent, CodeBlock, YouTubeCard
│       │   ├── lesson/             # LessonContent, LessonSidebar
│       │   ├── pages/              # Full-page client components
│       │   └── ui/                 # Compass, LanternEffect
│       ├── hooks/                  # useAuth
│       ├── lib/                    # api.js, localProgress.js, supabase.js
│       └── data/                   # Mock roadmap data (Git, GenAI)
│
├── backend/
│   ├── app/
│   │   ├── api/v1/                 # roadmaps, nodes, progress, notes, user
│   │   ├── core/                   # config, auth, supabase client
│   │   └── models/                 # Pydantic schemas
│   ├── main.py
│   └── requirements.txt
│
└── supabase/
    └── schema.sql                  # Tables, RLS policies, seed data
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/roadmaps` | No | List all roadmaps |
| GET | `/api/v1/roadmaps/{id}` | No | Get roadmap with nodes |
| GET | `/api/v1/roadmaps/{id}/nodes` | No | Get nodes for a roadmap |
| GET | `/api/v1/nodes/{id}` | No | Get node details |
| GET | `/api/v1/progress` | Yes | Get user progress |
| PUT | `/api/v1/progress/{node_id}` | Yes | Update progress status |
| GET | `/api/v1/notes` | Yes | Get user notes |
| PUT | `/api/v1/notes/{node_id}` | Yes | Create/update note |
| GET | `/api/v1/user/journey` | Yes | User journey dashboard |

## Design System

**Swiss Tech Noir** — a dark, typographic-heavy design language.

| Token | Value | Usage |
|-------|-------|-------|
| `--void-black` | `#050505` | Background |
| `--paper` | `#F2F2F2` | Text |
| `--graphite` | `#1A1A1A` | Surfaces |
| `--volt` | `#CCFF00` | Accent / CTAs |
| `--muted` | `#888888` | Secondary text |

**Typography**: Space Grotesk (display), JetBrains Mono (body/code).

## License

MIT
