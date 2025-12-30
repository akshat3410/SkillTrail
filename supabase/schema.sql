-- SkillTrail Database Schema
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (auto-populated via Supabase Auth trigger)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  avatar_url TEXT,
  provider TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Nodes table (topics within a roadmap)
CREATE TABLE IF NOT EXISTS nodes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  roadmap_id UUID REFERENCES roadmaps(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  short_summary TEXT,
  order_index INTEGER NOT NULL,
  svg_x FLOAT NOT NULL,
  svg_y FLOAT NOT NULL,
  video_url TEXT,
  blog_links TEXT[] DEFAULT '{}',
  estimated_time TEXT,
  tldr TEXT,
  why_matters TEXT,
  common_mistakes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- User progress tracking
CREATE TABLE IF NOT EXISTS user_progress (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (user_id, node_id)
);

-- User notes
CREATE TABLE IF NOT EXISTS notes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  node_id UUID REFERENCES nodes(id) ON DELETE CASCADE,
  content TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, node_id)
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_nodes_roadmap_id ON nodes(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_nodes_order_index ON nodes(order_index);
CREATE INDEX IF NOT EXISTS idx_user_progress_user_id ON user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_user_progress_node_id ON user_progress(node_id);
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_node_id ON notes(node_id);

-- Row Level Security policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile" ON users 
  FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users 
  FOR UPDATE USING (auth.uid() = id);

-- Roadmaps are publicly readable
CREATE POLICY "Roadmaps are viewable by everyone" ON roadmaps 
  FOR SELECT USING (true);

-- Nodes are publicly readable
CREATE POLICY "Nodes are viewable by everyone" ON nodes 
  FOR SELECT USING (true);

-- Progress policies
CREATE POLICY "Users can view own progress" ON user_progress 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own progress" ON user_progress 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own progress" ON user_progress 
  FOR UPDATE USING (auth.uid() = user_id);

-- Notes policies
CREATE POLICY "Users can view own notes" ON notes 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own notes" ON notes 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own notes" ON notes 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own notes" ON notes 
  FOR DELETE USING (auth.uid() = user_id);

-- Function to auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, avatar_url, provider)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name'),
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_app_meta_data->>'provider'
  );
  RETURN NEW;
END;
$$;

-- Trigger to call function on user signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SEED DATA: Git Fundamentals Roadmap
-- ============================================

-- Insert the Git Fundamentals roadmap
INSERT INTO roadmaps (id, title, description) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'Git Fundamentals', 'Master the essential Git workflow from basics to collaboration. Learn version control step by step.')
ON CONFLICT (id) DO NOTHING;

-- Insert nodes for the roadmap
INSERT INTO nodes (id, roadmap_id, title, short_summary, order_index, svg_x, svg_y, video_url, blog_links, estimated_time, tldr, why_matters, common_mistakes) VALUES
(
  '660e8400-e29b-41d4-a716-446655440001',
  '550e8400-e29b-41d4-a716-446655440001',
  'What is Git?',
  'Understand version control and why Git matters',
  1,
  200,
  100,
  'https://www.youtube.com/watch?v=2ReR1YJrNOM',
  ARRAY['https://git-scm.com/book/en/v2/Getting-Started-What-is-Git%3F', 'https://www.atlassian.com/git/tutorials/what-is-git'],
  '15 min',
  'Git is a distributed version control system that tracks changes in your code. It lets you save snapshots (commits), work on different features simultaneously (branches), and collaborate with others.',
  'Version control is the foundation of modern software development. Without it, you risk losing work, creating conflicts when collaborating, and having no way to undo mistakes. Git is used by 90%+ of developers worldwide.',
  'Confusing Git (the tool) with GitHub (the hosting service). Not understanding that Git stores the complete history of your project locally. Thinking version control is only for teams—it''s valuable for solo projects too.'
),
(
  '660e8400-e29b-41d4-a716-446655440002',
  '550e8400-e29b-41d4-a716-446655440001',
  'Installing Git',
  'Set up Git on your computer',
  2,
  400,
  220,
  'https://www.youtube.com/watch?v=nbFwejIsHlY',
  ARRAY['https://git-scm.com/book/en/v2/Getting-Started-Installing-Git', 'https://github.com/git-guides/install-git'],
  '10 min',
  'Download Git from git-scm.com, run the installer, and configure your username and email using git config. These settings identify your commits.',
  'Proper installation ensures Git commands work correctly and your commits are attributed to you. Setting up your identity now prevents confusion later.',
  'Not configuring user.name and user.email after installation. Installing GUI clients without understanding command-line basics first. Using default editor settings without knowing how to exit them (especially Vim).'
),
(
  '660e8400-e29b-41d4-a716-446655440003',
  '550e8400-e29b-41d4-a716-446655440001',
  'Creating a Repository',
  'Initialize your first Git project',
  3,
  200,
  350,
  'https://www.youtube.com/watch?v=3RjQznt-8kE',
  ARRAY['https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository', 'https://www.atlassian.com/git/tutorials/setting-up-a-repository'],
  '10 min',
  'Use git init to create a new repository or git clone to copy an existing one. The .git folder contains all version control information.',
  'Creating a repository is the first step to tracking your project. Understanding the .git folder helps you realize Git stores everything locally—no internet required for most operations.',
  'Running git init in the wrong directory. Accidentally nesting repositories (running git init inside another Git repo). Deleting the .git folder and losing all history.'
),
(
  '660e8400-e29b-41d4-a716-446655440004',
  '550e8400-e29b-41d4-a716-446655440001',
  'Staging & Committing',
  'Save changes to your repository',
  4,
  400,
  480,
  'https://www.youtube.com/watch?v=8JJ101D3knE',
  ARRAY['https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository', 'https://www.atlassian.com/git/tutorials/saving-changes'],
  '20 min',
  'Use git add to stage changes (prepare them for commit), then git commit to save a snapshot. Each commit should be a logical unit of work with a clear message.',
  'Commits are the building blocks of your project history. Good commit habits make it easy to understand changes, revert mistakes, and collaborate effectively.',
  'Committing too much at once (giant commits). Writing vague commit messages like "fixed stuff". Not staging all related changes together. Committing directly without reviewing staged changes.'
),
(
  '660e8400-e29b-41d4-a716-446655440005',
  '550e8400-e29b-41d4-a716-446655440001',
  'Branching Basics',
  'Work on features in isolation',
  5,
  200,
  620,
  'https://www.youtube.com/watch?v=e2IbNHi4uCI',
  ARRAY['https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell', 'https://www.atlassian.com/git/tutorials/using-branches'],
  '20 min',
  'Branches let you work on different features without affecting main code. Use git branch to create, git checkout or git switch to change branches. Main/master is your stable branch.',
  'Branching is what makes Git powerful. It enables parallel development, experimentation, and safe feature work. Without branches, teams would constantly overwrite each other''s work.',
  'Working directly on main/master instead of feature branches. Creating too many long-lived branches. Not naming branches descriptively. Forgetting which branch you''re on before making changes.'
),
(
  '660e8400-e29b-41d4-a716-446655440006',
  '550e8400-e29b-41d4-a716-446655440001',
  'Merging Branches',
  'Combine your work back together',
  6,
  400,
  760,
  'https://www.youtube.com/watch?v=0chZFIZLR_0',
  ARRAY['https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging', 'https://www.atlassian.com/git/tutorials/using-branches/git-merge'],
  '25 min',
  'Use git merge to combine branches. Fast-forward merges happen when there''s no divergence. Merge conflicts occur when the same lines were changed—resolve them manually, then commit.',
  'Merging brings your isolated work back into the main codebase. Understanding merge conflicts is crucial—they''re not errors, just Git asking for human judgment when changes overlap.',
  'Panicking when seeing merge conflicts. Using force flags without understanding consequences. Not testing after merging. Merging without pulling the latest changes first.'
),
(
  '660e8400-e29b-41d4-a716-446655440007',
  '550e8400-e29b-41d4-a716-446655440001',
  'Remote Repositories',
  'Push and pull from GitHub/GitLab',
  7,
  200,
  900,
  'https://www.youtube.com/watch?v=HkdAHXoRtos',
  ARRAY['https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes', 'https://docs.github.com/en/get-started/getting-started-with-git/about-remote-repositories'],
  '20 min',
  'Remotes are copies of your repo on servers (GitHub, GitLab). Use git push to upload commits, git pull to download. git remote add connects local to remote repos.',
  'Remote repositories enable backup, sharing, and collaboration. They''re the bridge between your local work and the rest of the world. GitHub/GitLab also add project management features.',
  'Forgetting to pull before starting work (leads to conflicts). Force pushing and overwriting teammates'' work. Not setting up SSH keys (typing passwords repeatedly). Committing secrets/API keys.'
),
(
  '660e8400-e29b-41d4-a716-446655440008',
  '550e8400-e29b-41d4-a716-446655440001',
  'Collaboration & PRs',
  'Work with others using pull requests',
  8,
  400,
  1050,
  'https://www.youtube.com/watch?v=rgbCcBNZcdQ',
  ARRAY['https://docs.github.com/en/pull-requests/collaborating-with-pull-requests', 'https://www.atlassian.com/git/tutorials/making-a-pull-request'],
  '30 min',
  'Pull Requests (PRs) are a way to propose changes. Fork repos you don''t own, create branches for changes, then open a PR for review. Code review catches bugs and shares knowledge.',
  'PRs are the standard workflow for open source and team development. They create a review checkpoint before code enters the main branch, improving code quality and team awareness.',
  'Opening PRs without clear descriptions. Not responding to review feedback promptly. Creating massive PRs that are hard to review. Not keeping PRs up to date with the main branch.'
)
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- ROADMAP REQUESTS TABLE
-- ============================================

-- Table for storing roadmap requests from users
CREATE TABLE IF NOT EXISTS roadmap_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  reason TEXT,
  email TEXT,
  status TEXT CHECK (status IN ('pending', 'approved', 'rejected', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_roadmap_requests_status ON roadmap_requests(status);
CREATE INDEX IF NOT EXISTS idx_roadmap_requests_created_at ON roadmap_requests(created_at DESC);

-- RLS policies for roadmap_requests
ALTER TABLE roadmap_requests ENABLE ROW LEVEL SECURITY;

-- Anyone can insert a request (public form)
CREATE POLICY "Anyone can submit roadmap requests" ON roadmap_requests 
  FOR INSERT WITH CHECK (true);

-- Only authenticated admin users can view all requests (for admin panel)
-- For now, make it public readable for simplicity
CREATE POLICY "Roadmap requests are viewable" ON roadmap_requests 
  FOR SELECT USING (true);

