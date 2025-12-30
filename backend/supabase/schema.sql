-- SkillTrail Database Schema for Supabase
-- Run this in the Supabase SQL Editor

-- =====================
-- TABLES
-- =====================

-- Roadmaps table
CREATE TABLE IF NOT EXISTS roadmaps (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Nodes table (learning steps)
CREATE TABLE IF NOT EXISTS nodes (
    id TEXT PRIMARY KEY,
    roadmap_id TEXT NOT NULL REFERENCES roadmaps(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    short_summary TEXT,
    order_index INTEGER NOT NULL,
    svg_x FLOAT DEFAULT 50,
    svg_y FLOAT DEFAULT 100,
    video_url TEXT,
    blog_links JSONB DEFAULT '[]'::jsonb,
    estimated_time TEXT,
    content TEXT,  -- Main learning content (markdown)
    tldr TEXT,
    why_matters TEXT,
    common_mistakes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User progress table
CREATE TABLE IF NOT EXISTS progress (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    status TEXT DEFAULT 'not_started',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, node_id)
);

-- User notes table
CREATE TABLE IF NOT EXISTS notes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id TEXT NOT NULL,
    node_id TEXT NOT NULL REFERENCES nodes(id) ON DELETE CASCADE,
    content TEXT DEFAULT '',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, node_id)
);

-- =====================
-- INDEXES
-- =====================

CREATE INDEX IF NOT EXISTS idx_nodes_roadmap ON nodes(roadmap_id);
CREATE INDEX IF NOT EXISTS idx_nodes_order ON nodes(roadmap_id, order_index);
CREATE INDEX IF NOT EXISTS idx_progress_user ON progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_node ON progress(node_id);
CREATE INDEX IF NOT EXISTS idx_notes_user ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_node ON notes(node_id);

-- =====================
-- ROW LEVEL SECURITY (RLS)
-- =====================

-- Enable RLS
ALTER TABLE roadmaps ENABLE ROW LEVEL SECURITY;
ALTER TABLE nodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;

-- Public read access to roadmaps and nodes
CREATE POLICY "Roadmaps are viewable by everyone" 
    ON roadmaps FOR SELECT 
    USING (true);

CREATE POLICY "Nodes are viewable by everyone" 
    ON nodes FOR SELECT 
    USING (true);

-- Progress: users can only see/modify their own
CREATE POLICY "Users can view own progress" 
    ON progress FOR SELECT 
    USING (true);  -- For now, allow all (we'll use header-based auth)

CREATE POLICY "Users can insert own progress" 
    ON progress FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can update own progress" 
    ON progress FOR UPDATE 
    USING (true);

-- Notes: users can only see/modify their own
CREATE POLICY "Users can view own notes" 
    ON notes FOR SELECT 
    USING (true);

CREATE POLICY "Users can insert own notes" 
    ON notes FOR INSERT 
    WITH CHECK (true);

CREATE POLICY "Users can update own notes" 
    ON notes FOR UPDATE 
    USING (true);

-- =====================
-- GIT ROADMAP DATA
-- =====================

-- Insert Git & GitHub roadmap
INSERT INTO roadmaps (id, title, description) VALUES 
('git-github', 'Git & GitHub', 'Master version control from first commit to team collaboration')
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- Insert Git nodes (all 13 steps)
INSERT INTO nodes (id, roadmap_id, title, short_summary, order_index, svg_x, svg_y, estimated_time, why_matters, content, common_mistakes, tldr) VALUES

('git-1', 'git-github', 'What is Git?', 'Understanding version control basics', 1, 50, 100, '10 min',
'Before you write a single command, you need to understand what Git actually is. It''s the tool that lets you save your work properly, undo mistakes, and collaborate with others.',
'## What is Git?

Git is a **distributed version control system**. It takes snapshots of your project every time you save (commit). These snapshots let you:

- Go back to any previous version
- See exactly what changed and when
- Work with others without overwriting each other''s work

Imagine writing a document and being able to see every version you ever saved, who changed what, and restore any of them instantly. That''s Git.

### Key Concepts

- **Repository (repo)**: A folder where Git tracks your files
- **Commit**: A saved snapshot of your project
- **History**: The timeline of all your commits

Git lives on your computer. It doesn''t need the internet. GitHub (which we''ll cover later) is a website where you can store and share your Git projects.',
'Thinking Git is the same as GitHub. Git is the tool on your computer. GitHub is a website for sharing Git projects.',
'Git saves snapshots of your project and lets you go back in time. Repository = tracked folder. Commit = saved snapshot.'),

('git-2', 'git-github', 'Installing Git', 'Getting Git on your computer', 2, 150, 200, '5 min',
'You can''t use Git without installing it. This step gets the tool onto your computer so you can start practicing.',
'## Installing Git

Git is free software that runs on Windows, Mac, and Linux.

### Mac
```bash
git --version
```
If Git isn''t installed, your Mac will prompt you to install it.

### Windows
Download from git-scm.com and run the installer.

### Linux
```bash
sudo apt update
sudo apt install git
```

### Verify Installation
```bash
git --version
```

### First-Time Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```',
'Skipping the config step. If you don''t set your name and email, your commits will be labeled with generic info.',
'Install Git, then run git config to set your name and email.'),

('git-3', 'git-github', 'Creating a Repository', 'Starting your first Git project', 3, 50, 300, '5 min',
'A repository is where Git tracks your project. Creating one is the first real Git action you''ll take.',
'## Creating a Repository

A repository (repo) is just a folder with Git tracking enabled.

### Create a New Project
```bash
mkdir my-project
cd my-project
git init
```

### Turn an Existing Folder into a Repo
```bash
cd existing-folder
git init
```

Git creates a hidden `.git` folder that stores all your history.',
'Running git init in the wrong folder. Always cd into your project folder first.',
'Run git init inside your project folder to start tracking it.'),

('git-4', 'git-github', 'Checking Status', 'Seeing what''s happening in your repo', 4, 150, 400, '5 min',
'git status is your best friend. It tells you exactly what''s happening in your repo.',
'## Checking Status

Git tracks files in three states:
1. **Untracked**: New files Git doesn''t know about
2. **Modified**: Files that changed
3. **Staged**: Files ready to be committed

```bash
git status
```

### Reading the Output
- Red files: Changed but not staged
- Green files: Staged and ready to commit
- Untracked files: New files Git hasn''t seen',
'Ignoring the output and running commands blindly. Always read git status before committing.',
'git status shows which files are modified, staged, or untracked.'),

('git-5', 'git-github', 'Staging Files', 'Selecting what to include in your save', 5, 50, 500, '5 min',
'Before Git saves your work, you need to tell it which files to include. Staging is how you select what goes into your next snapshot.',
'## Staging Files

The staging area is like a box where you put files before shipping them.

### Stage a Single File
```bash
git add index.html
```

### Stage Everything
```bash
git add .
```

### Unstage a File
```bash
git restore --staged filename.js
```',
'Using git add . without checking status first. You might accidentally stage files you didn''t mean to.',
'git add filename stages a file. git add . stages everything.'),

('git-6', 'git-github', 'Committing Changes', 'Saving a snapshot of your work', 6, 150, 600, '8 min',
'A commit is a permanent snapshot of your project. It''s the actual save in Git.',
'## Committing Changes

```bash
git commit -m "Add homepage layout"
```

### Writing Good Commit Messages
- Start with a verb: Add, Fix, Update, Remove
- Keep it short (50 characters or less)
- Be specific

**Good examples:**
- "Add user authentication"
- "Fix header alignment on mobile"

**Bad examples:**
- "Changes"
- "asdfasdf"',
'Committing too much at once with vague messages. Small, focused commits with clear messages make your history useful.',
'git commit -m "message" saves staged files. Write short, specific messages.'),

('git-7', 'git-github', 'Viewing History', 'Exploring your project''s timeline', 7, 50, 700, '5 min',
'Your commit history is a complete record of your project. Knowing how to read it lets you understand what happened.',
'## Viewing History

```bash
git log --oneline
```

### See What Changed in a Commit
```bash
git show a1b2c3d
```

### Understanding the Output
- Hash: Unique ID (first 7 characters are enough)
- Author: Who made it
- Date: When
- Message: What changed',
'Not using --oneline for quick scanning. The full log is verbose.',
'git log --oneline shows your commit history.'),

('git-8', 'git-github', 'Branching Basics', 'Working on features safely', 8, 150, 800, '10 min',
'Branches let you work on new features without affecting your main code. If something goes wrong, you haven''t broken anything.',
'## Branching Basics

### See Current Branch
```bash
git branch
```

### Create and Switch
```bash
git checkout -b feature-navbar
```

### Switch to a Branch
```bash
git checkout feature-navbar
```

### Delete a Branch
```bash
git branch -d feature-navbar
```',
'Forgetting which branch you''re on. Always check with git branch before making commits.',
'git checkout -b name creates and switches to a new branch.'),

('git-9', 'git-github', 'Merging Branches', 'Combining your work', 9, 50, 900, '10 min',
'After working on a branch, you need to bring those changes back to main. Merging combines the work.',
'## Merging Branches

```bash
git checkout main
git merge feature-navbar
```

### Handling Merge Conflicts
If both branches changed the same lines, you''ll see conflict markers:
```
<<<<<<< HEAD
Your version
=======
Their version
>>>>>>> feature-navbar
```

Resolve by choosing which code to keep, then:
```bash
git add conflicted-file.html
git commit -m "Resolve merge conflict"
```',
'Panicking at merge conflicts. They''re normal and easy to fix.',
'Switch to the target branch, then git merge source-branch.'),

('git-10', 'git-github', 'GitHub Introduction', 'Sharing and backing up your code', 10, 150, 1000, '8 min',
'So far, Git has lived only on your computer. GitHub is where you share your code with the world.',
'## GitHub Introduction

GitHub is a website that hosts Git repositories. It adds:
- Cloud backup for your code
- A web interface to view history
- Collaboration tools (pull requests, issues)
- A profile to showcase your work

### Sign Up
1. Go to github.com
2. Create a free account
3. Verify your email

### Create a Repository
1. Click "+" → "New repository"
2. Name it
3. Choose public or private
4. Don''t initialize with README if you have local code',
'Creating a repo with a README when you already have local code. This creates conflicts.',
'GitHub hosts your Git repos online. Create an empty repo, then connect your local repo.'),

('git-11', 'git-github', 'Connecting Local Repo to GitHub', 'Linking your computer to the cloud', 11, 50, 1100, '10 min',
'Your local Git repo and GitHub are separate. You need to connect them so you can push and pull code.',
'## Connecting to GitHub

### Add GitHub as a Remote
```bash
git remote add origin https://github.com/username/my-project.git
```

### Verify the Connection
```bash
git remote -v
```

### Push for the First Time
```bash
git push -u origin main
```

After this, you can just use:
```bash
git push
```',
'Forgetting to create the repo on GitHub first. You can''t push to a repo that doesn''t exist.',
'git remote add origin URL connects to GitHub. git push -u origin main uploads your code.'),

('git-12', 'git-github', 'Pushing & Pulling', 'Syncing with GitHub', 12, 150, 1200, '8 min',
'Once connected to GitHub, you''ll constantly push your commits up and pull others'' commits down.',
'## Pushing & Pulling

### Push Your Commits
```bash
git push
```

### Pull Latest Changes
```bash
git pull
```

### The Typical Workflow
```bash
git pull                    # Get latest
# ... do your work ...
git add .
git commit -m "Add feature"
git pull                    # Check for updates
git push                    # Upload your work
```',
'Pushing without pulling first when collaborating. Always pull before you push.',
'git push uploads. git pull downloads. Always pull before pushing when collaborating.'),

('git-13', 'git-github', 'Basic Collaboration Workflow', 'Working with a team', 13, 50, 1300, '15 min',
'Real projects involve multiple people. This step teaches you the standard workflow for collaborating safely.',
'## Basic Collaboration Workflow

1. Create a branch for your work
2. Make commits on your branch
3. Push your branch to GitHub
4. Open a Pull Request (PR)
5. Get feedback and approval
6. Merge into main

### The Full Process
```bash
git checkout main
git pull
git checkout -b add-contact-form
# ... do your work ...
git add .
git commit -m "Add contact form"
git push -u origin add-contact-form
```

### On GitHub:
1. Click "Compare & pull request"
2. Add description
3. Request review
4. After approval, click "Merge"

### Clean Up
```bash
git checkout main
git pull
git branch -d add-contact-form
```',
'Working directly on main. Always create a branch, even for small changes.',
'Branch → Commit → Push → Pull Request → Merge → Pull. This is how teams work safely.')

ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    short_summary = EXCLUDED.short_summary,
    order_index = EXCLUDED.order_index,
    svg_x = EXCLUDED.svg_x,
    svg_y = EXCLUDED.svg_y,
    estimated_time = EXCLUDED.estimated_time,
    why_matters = EXCLUDED.why_matters,
    content = EXCLUDED.content,
    common_mistakes = EXCLUDED.common_mistakes,
    tldr = EXCLUDED.tldr;
