-- Run this to seed/update the Git roadmap data
-- (Tables already exist, just updating data)

-- Insert/Update Git & GitHub roadmap
INSERT INTO roadmaps (id, title, description) VALUES 
('git-github', 'Git & GitHub', 'Master version control from first commit to team collaboration')
ON CONFLICT (id) DO UPDATE SET 
    title = EXCLUDED.title,
    description = EXCLUDED.description;

-- Insert/Update Git nodes (all 13 steps)
INSERT INTO nodes (id, roadmap_id, title, short_summary, order_index, svg_x, svg_y, estimated_time, why_matters, content, common_mistakes, tldr) VALUES

('git-1', 'git-github', 'What is Git?', 'Understanding version control basics', 1, 50, 100, '10 min',
'Before you write a single command, you need to understand what Git actually is.',
'## What is Git?

Git is a **distributed version control system**. It takes snapshots of your project every time you save (commit).

### Key Concepts
- **Repository (repo)**: A folder where Git tracks your files
- **Commit**: A saved snapshot of your project
- **History**: The timeline of all your commits',
'Thinking Git is the same as GitHub. Git is the tool. GitHub is a website.',
'Git saves snapshots of your project and lets you go back in time.'),

('git-2', 'git-github', 'Installing Git', 'Getting Git on your computer', 2, 150, 200, '5 min',
'You cannot use Git without installing it.',
'## Installing Git

### Mac
```bash
git --version
```

### Windows
Download from git-scm.com

### First-Time Setup
```bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
```',
'Skipping the config step.',
'Install Git, then run git config.'),

('git-3', 'git-github', 'Creating a Repository', 'Starting your first Git project', 3, 50, 300, '5 min',
'A repository is where Git tracks your project.',
'## Creating a Repository

```bash
mkdir my-project
cd my-project
git init
```',
'Running git init in the wrong folder.',
'Run git init inside your project folder.'),

('git-4', 'git-github', 'Checking Status', 'Seeing what is happening', 4, 150, 400, '5 min',
'git status is your best friend.',
'## Checking Status

```bash
git status
```

- Red files: Changed but not staged
- Green files: Staged and ready',
'Ignoring the output.',
'git status shows which files are modified.'),

('git-5', 'git-github', 'Staging Files', 'Selecting what to include', 5, 50, 500, '5 min',
'Staging is how you select what goes into your next snapshot.',
'## Staging Files

```bash
git add index.html
git add .
```',
'Using git add . without checking status first.',
'git add filename stages a file.'),

('git-6', 'git-github', 'Committing Changes', 'Saving a snapshot', 6, 150, 600, '8 min',
'A commit is a permanent snapshot.',
'## Committing Changes

```bash
git commit -m "Add homepage layout"
```

Write short, specific messages.',
'Committing too much at once with vague messages.',
'git commit -m "message" saves staged files.'),

('git-7', 'git-github', 'Viewing History', 'Exploring your timeline', 7, 50, 700, '5 min',
'Your commit history is a complete record.',
'## Viewing History

```bash
git log --oneline
git show a1b2c3d
```',
'Not using --oneline for quick scanning.',
'git log --oneline shows your commit history.'),

('git-8', 'git-github', 'Branching Basics', 'Working on features safely', 8, 150, 800, '10 min',
'Branches let you work without affecting main code.',
'## Branching Basics

```bash
git branch
git checkout -b feature-navbar
git branch -d feature-navbar
```',
'Forgetting which branch you are on.',
'git checkout -b name creates and switches to a branch.'),

('git-9', 'git-github', 'Merging Branches', 'Combining your work', 9, 50, 900, '10 min',
'Merging combines work from one branch into another.',
'## Merging Branches

```bash
git checkout main
git merge feature-navbar
```',
'Panicking at merge conflicts.',
'Switch to target branch, then git merge source-branch.'),

('git-10', 'git-github', 'GitHub Introduction', 'Sharing your code', 10, 150, 1000, '8 min',
'GitHub is where you share your code with the world.',
'## GitHub Introduction

1. Go to github.com
2. Create account
3. Click New repository',
'Creating a repo with README when you have local code.',
'GitHub hosts your Git repos online.'),

('git-11', 'git-github', 'Connecting to GitHub', 'Linking to the cloud', 11, 50, 1100, '10 min',
'You need to connect local repo to GitHub.',
'## Connecting to GitHub

```bash
git remote add origin https://github.com/user/repo.git
git push -u origin main
```',
'Forgetting to create the repo on GitHub first.',
'git remote add origin URL connects to GitHub.'),

('git-12', 'git-github', 'Pushing and Pulling', 'Syncing with GitHub', 12, 150, 1200, '8 min',
'Push uploads, pull downloads.',
'## Pushing and Pulling

```bash
git push
git pull
```',
'Pushing without pulling first.',
'git push uploads. git pull downloads.'),

('git-13', 'git-github', 'Collaboration Workflow', 'Working with a team', 13, 50, 1300, '15 min',
'The standard workflow for safe collaboration.',
'## Collaboration Workflow

```bash
git checkout main
git pull
git checkout -b feature
git push -u origin feature
```

Then open a Pull Request on GitHub.',
'Working directly on main.',
'Branch, Commit, Push, Pull Request, Merge.')

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
