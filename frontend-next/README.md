# SkillTrail — Frontend

Next.js 16 (App Router) frontend for the SkillTrail learning platform.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

- **Next.js 16** — App Router, Server & Client Components
- **Tailwind CSS v4** — Utility-first styling with `@theme` design tokens
- **Framer Motion** — Page transitions, scroll-linked parallax, micro-interactions
- **GSAP + ScrollTrigger** — Scroll-driven animations on roadmap pages
- **Lucide React** — Icon system
- **Supabase JS** — Auth (Google, GitHub) and database client

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server on port 3000 |
| `npm run build` | Production build |
| `npm run start` | Serve production build |
| `npm run lint` | Run ESLint |

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Architecture

```
src/
├── app/            # Routes (layout.jsx renders Navbar + Footer globally)
├── components/     # UI organized by feature (home, dashboard, roadmap, etc.)
├── hooks/          # useAuth
├── lib/            # API client, localStorage progress, Supabase client
└── data/           # Embedded roadmap data for offline/demo mode
```

The app works fully offline using embedded mock data. Authentication and server-side progress sync are optional — progress persists in localStorage by default.
