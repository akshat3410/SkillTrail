# SkillTrail - Visual Learning Roadmap Platform

A visual learning platform where users learn skills as a scrollable animated journey. Scroll through beautifully animated roadmaps, click topics to deep dive, and track your progress. Now featuring a complete **Generative AI & Prompt Engineering** course.

## Features

- 🎨 **Visual Roadmaps** - Scroll through animated SVG paths that draw as you progress
- 🤖 **GenAI Course** - Complete 27-node curriculum from Foundations to Agents
- 📺 **Rich Media** - Video cards with thumbnails integrated directly into learning steps
- ✨ **GSAP Animations** - Smooth, scroll-linked animations for a calm experience
- ⚡ **Frontend First** - Works fully locally with embedded roadmap data (no backend required for demo)
- 🔐 **Authentication** - (Optional) Login with Google or GitHub via Supabase Auth
- 📝 **Personal Notes** - Add notes to any topic with auto-save (Local Storage supported)
- 📊 **Progress Tracking** - Track your status across topics (Not Started / In Progress / Completed)

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- GSAP + ScrollTrigger
- React Router
- Supabase JS Client

### Backend
- FastAPI (Python)
- Supabase (PostgreSQL + Auth)
- JWT Authentication

## Prerequisites

- Node.js 18+
- Python 3.10+
- A Supabase project (free tier works)

## Setup

### 1. Clone and Install

```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **Authentication > Providers** and enable:
   - Google
   - GitHub
3. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
4. Copy your project credentials from **Settings > API**

### 3. Environment Variables

**Frontend** (`frontend/.env`):
```env
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_URL=http://localhost:8000
```

**Backend** (`backend/.env`):
```env
SUPABASE_URL=your-project-url
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
SUPABASE_JWT_SECRET=your-jwt-secret
FRONTEND_URL=http://localhost:5173
DEBUG=true
```

> **Note**: Find the JWT Secret in **Settings > API > JWT Settings > JWT Secret**

### 4. Run Development Servers

```bash
# Terminal 1 - Backend
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000

# Terminal 2 - Frontend
cd frontend
npm run dev
```

Visit `http://localhost:5173` to see the app.

## Project Structure

```
Learning platform/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/          # Button, Card, ProgressToggle, Textarea
│   │   │   ├── layout/      # Navbar, PageTransition
│   │   │   └── roadmap/     # Roadmap, RoadmapPath, RoadmapNode
│   │   ├── pages/           # HomePage, LoginPage, RoadmapPage, TopicPage, JourneyPage
│   │   ├── hooks/           # useAuth, useProgress, useNotes
│   │   ├── lib/             # supabase.js, api.js
│   │   └── index.css        # Design system
│   └── package.json
│
├── backend/
│   ├── app/
│   │   ├── api/v1/          # roadmaps, nodes, progress, notes, user
│   │   ├── core/            # config, auth, supabase
│   │   └── models/          # schemas
│   ├── main.py
│   └── requirements.txt
│
└── supabase/
    └── schema.sql           # Database schema + seed data
```

## API Endpoints

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/v1/roadmaps` | No | List all roadmaps |
| GET | `/api/v1/roadmaps/{id}` | No | Get roadmap details |
| GET | `/api/v1/roadmaps/{id}/nodes` | No | Get nodes for a roadmap |
| GET | `/api/v1/nodes/{id}` | No | Get node details |
| GET | `/api/v1/progress` | Yes | Get all user progress |
| PUT | `/api/v1/progress/{node_id}` | Yes | Update progress status |
| GET | `/api/v1/notes` | Yes | Get all user notes |
| PUT | `/api/v1/notes/{node_id}` | Yes | Create/update note |
| GET | `/api/v1/user/journey` | Yes | Get user journey dashboard |

## Animation Architecture

The roadmap animation uses GSAP ScrollTrigger to create a scroll-linked path drawing effect:

```javascript
// RoadmapPath.jsx - Key animation logic
gsap.to(path, {
  strokeDashoffset: 0,
  ease: "none",
  scrollTrigger: {
    trigger: container,
    start: "top center",
    end: "bottom center",
    scrub: 0.5  // Smooth 0.5s lag for premium feel
  }
});
```

Nodes animate in sequentially as they enter the viewport, with a subtle scale + fade effect.

## License

MIT
