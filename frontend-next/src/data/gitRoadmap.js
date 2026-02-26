/**
 * Git & GitHub Roadmap Data
 * 
 * Frontend-first content delivery.
 * This data can be replaced with API calls later.
 */

export const gitRoadmap = {
    id: "git-github",
    title: "Git & GitHub",
    description: "Master version control from first commit to team collaboration"
}

export const gitNodes = [
    {
        id: "git-1",
        roadmap_id: "git-github",
        title: "What is Git?",
        short_summary: "Understanding version control basics",
        order_index: 1,
        svg_x: 50,
        svg_y: 100,
        estimated_time: "10 min",
        why_matters: "Before you write a single command, you need to understand what Git actually is. It's the tool that lets you save your work properly, undo mistakes, and collaborate with others.",
        content: `## What is Git?

Git is a **distributed version control system**. It takes snapshots of your project every time you save (commit). These snapshots let you:

- Go back to any previous version
- See exactly what changed and when
- Work with others without overwriting each other's work

Imagine writing a document and being able to see every version you ever saved, who changed what, and restore any of them instantly. That's Git.

### Key Concepts

- **Repository (repo)**: A folder where Git tracks your files
- **Commit**: A saved snapshot of your project
- **History**: The timeline of all your commits

Git lives on your computer. It doesn't need the internet. GitHub (which we'll cover later) is a website where you can store and share your Git projects.`,
        common_mistakes: "Thinking Git is the same as GitHub. Git is the tool on your computer. GitHub is a website for sharing Git projects. You can use Git without ever touching GitHub.",
        tldr: "Git saves snapshots of your project and lets you go back in time. Repository = tracked folder. Commit = saved snapshot."
    },
    {
        id: "git-2",
        roadmap_id: "git-github",
        title: "Installing Git",
        short_summary: "Getting Git on your computer",
        order_index: 2,
        svg_x: 150,
        svg_y: 200,
        estimated_time: "5 min",
        why_matters: "You can't use Git without installing it. This step gets the tool onto your computer so you can start practicing.",
        content: `## Installing Git

Git is free software that runs on Windows, Mac, and Linux. Once installed, you'll use it from the terminal (command line).

### Mac

Open Terminal and run:

\`\`\`bash
git --version
\`\`\`

If Git isn't installed, your Mac will prompt you to install it.

### Windows

Download Git from [git-scm.com](https://git-scm.com) and run the installer. Use the default options.

### Linux (Ubuntu/Debian)

\`\`\`bash
sudo apt update
sudo apt install git
\`\`\`

### Verify Installation

\`\`\`bash
git --version
# Should show something like: git version 2.40.0
\`\`\`

### First-Time Setup

Tell Git who you are (this labels your commits):

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
\`\`\``,
        common_mistakes: "Skipping the config step. If you don't set your name and email, your commits will be labeled with generic info, making collaboration confusing.",
        tldr: "Install Git, then run `git config` to set your name and email. Run `git --version` to verify."
    },
    {
        id: "git-3",
        roadmap_id: "git-github",
        title: "Creating a Repository",
        short_summary: "Starting your first Git project",
        order_index: 3,
        svg_x: 50,
        svg_y: 300,
        estimated_time: "5 min",
        why_matters: "A repository is where Git tracks your project. Creating one is the first real Git action you'll take. Without a repo, Git can't help you.",
        content: `## Creating a Repository

A repository (repo) is just a folder with Git tracking enabled. When you initialize a repo, Git creates a hidden \`.git\` folder that stores all your history.

### Create a New Project

\`\`\`bash
mkdir my-project
cd my-project
git init
# Initialized empty Git repository in /my-project/.git/
\`\`\`

### Turn an Existing Folder into a Repo

\`\`\`bash
cd existing-folder
git init
\`\`\`

### What Just Happened?

Git created a hidden \`.git\` folder inside your project. This folder contains everything Git needs — your history, settings, and tracking data. You never need to touch this folder directly.

### Verify It Worked

\`\`\`bash
ls -la
# Look for the .git folder
\`\`\``,
        common_mistakes: "Running `git init` in the wrong folder (like your home directory). Always `cd` into your project folder first. If you accidentally init in the wrong place, just delete the `.git` folder.",
        tldr: "Run `git init` inside your project folder to start tracking it. This creates a hidden `.git` folder."
    },
    {
        id: "git-4",
        roadmap_id: "git-github",
        title: "Checking Status",
        short_summary: "Seeing what's happening in your repo",
        order_index: 4,
        svg_x: 150,
        svg_y: 400,
        estimated_time: "5 min",
        why_matters: "`git status` is your best friend. It tells you exactly what's happening — which files changed, what's ready to save, and what Git is ignoring. You'll run this constantly.",
        content: `## Checking Status

Git tracks files in three states:

1. **Untracked**: New files Git doesn't know about yet
2. **Modified**: Files that changed since the last commit
3. **Staged**: Files ready to be committed

\`git status\` shows you which files are in which state.

### Run It

\`\`\`bash
git status
\`\`\`

### If Your Repo is Clean

\`\`\`
On branch main
nothing to commit, working tree clean
\`\`\`

### If You Have Changes

\`\`\`
On branch main
Changes not staged for commit:
  modified:   index.html

Untracked files:
  style.css
\`\`\`

### Reading the Output

- **Red files**: Changed but not staged
- **Green files**: Staged and ready to commit
- **Untracked files**: New files Git hasn't seen before`,
        common_mistakes: "Ignoring the output and just running commands blindly. Always read `git status` before committing. It prevents mistakes.",
        tldr: "`git status` shows which files are modified, staged, or untracked. Red = not staged, Green = staged."
    },
    {
        id: "git-5",
        roadmap_id: "git-github",
        title: "Staging Files",
        short_summary: "Selecting what to include in your save",
        order_index: 5,
        svg_x: 50,
        svg_y: 500,
        estimated_time: "5 min",
        why_matters: "Before Git saves your work, you need to tell it which files to include. Staging is how you select what goes into your next snapshot.",
        content: `## Staging Files

The **staging area** is like a box where you put files before shipping them. Only staged files get included in your next commit.

### Stage a Single File

\`\`\`bash
git add index.html
\`\`\`

### Stage Multiple Files

\`\`\`bash
git add index.html style.css
\`\`\`

### Stage Everything

\`\`\`bash
git add .
# Stages all changed and new files
\`\`\`

### Check What's Staged

\`\`\`bash
git status
# Staged files appear in green
\`\`\`

### Unstage a File

Made a mistake? Remove from staging:

\`\`\`bash
git restore --staged filename.js
\`\`\``,
        common_mistakes: "Using `git add .` without checking status first. You might accidentally stage files you didn't mean to include (like passwords or large files).",
        tldr: "`git add filename` stages a file. `git add .` stages everything. Only staged files get committed."
    },
    {
        id: "git-6",
        roadmap_id: "git-github",
        title: "Committing Changes",
        short_summary: "Saving a snapshot of your work",
        order_index: 6,
        svg_x: 150,
        svg_y: 600,
        estimated_time: "8 min",
        why_matters: "A commit is a permanent snapshot of your project. It's the actual save in Git. Every commit becomes part of your history.",
        content: `## Committing Changes

When you commit, Git takes everything in staging and creates a snapshot with a unique ID.

### Make a Commit

\`\`\`bash
git commit -m "Add homepage layout"
\`\`\`

### Stage and Commit in One Step

\`\`\`bash
git commit -am "Fix navigation bug"
# Only works for files Git already tracks
\`\`\`

### Writing Good Commit Messages

- Start with a verb: Add, Fix, Update, Remove
- Keep it short (50 characters or less)
- Be specific

**Good examples:**
- "Add user authentication"
- "Fix header alignment on mobile"

**Bad examples:**
- "Changes"
- "asdfasdf"

### View Your Commit

\`\`\`bash
git log --oneline
\`\`\``,
        common_mistakes: "Committing too much at once with vague messages. Small, focused commits with clear messages make your history useful.",
        tldr: "`git commit -m \"message\"` saves staged files. Write short, specific commit messages starting with a verb."
    },
    {
        id: "git-7",
        roadmap_id: "git-github",
        title: "Viewing History",
        short_summary: "Exploring your project's timeline",
        order_index: 7,
        svg_x: 50,
        svg_y: 700,
        estimated_time: "5 min",
        why_matters: "Your commit history is a complete record of your project. Knowing how to read it lets you understand what happened and find when bugs were introduced.",
        content: `## Viewing History

Every commit is recorded in a timeline. You can view this timeline and jump back to any point.

### View Full History

\`\`\`bash
git log
\`\`\`

### Compact View (Recommended)

\`\`\`bash
git log --oneline
# Example output:
# a1b2c3d Add contact page
# e4f5g6h Fix navigation
# i7j8k9l Initial commit
\`\`\`

### See What Changed in a Commit

\`\`\`bash
git show a1b2c3d
\`\`\`

### See Changes in a Specific File

\`\`\`bash
git log --oneline index.html
\`\`\`

### Understanding the Output

- **Hash**: Unique ID (first 7 characters are enough)
- **Author**: Who made it
- **Date**: When
- **Message**: What changed`,
        common_mistakes: "Not using `--oneline` for quick scanning. The full log is verbose. Use `--oneline` when you just need an overview.",
        tldr: "`git log --oneline` shows your commit history. `git show hash` shows what changed in a specific commit."
    },
    {
        id: "git-8",
        roadmap_id: "git-github",
        title: "Branching Basics",
        short_summary: "Working on features safely",
        order_index: 8,
        svg_x: 150,
        svg_y: 800,
        estimated_time: "10 min",
        why_matters: "Branches let you work on new features without affecting your main code. If something goes wrong, you haven't broken anything.",
        content: `## Branching Basics

A branch is a parallel version of your project. You can experiment safely and merge back when ready.

### See Current Branch

\`\`\`bash
git branch
# * main  (asterisk shows current)
\`\`\`

### Create a Branch

\`\`\`bash
git branch feature-navbar
\`\`\`

### Switch to a Branch

\`\`\`bash
git checkout feature-navbar
# Or newer syntax:
git switch feature-navbar
\`\`\`

### Create and Switch in One Command

\`\`\`bash
git checkout -b feature-navbar
# Or:
git switch -c feature-navbar
\`\`\`

### Delete a Branch

\`\`\`bash
git branch -d feature-navbar
# Only works if merged
\`\`\``,
        common_mistakes: "Forgetting which branch you're on. Always check with `git branch` before making commits.",
        tldr: "`git branch name` creates a branch. `git checkout name` switches to it. `git checkout -b name` does both at once."
    },
    {
        id: "git-9",
        roadmap_id: "git-github",
        title: "Merging Branches",
        short_summary: "Combining your work",
        order_index: 9,
        svg_x: 50,
        svg_y: 900,
        estimated_time: "10 min",
        why_matters: "After working on a branch, you need to bring those changes back to main. Merging combines the work from one branch into another.",
        content: `## Merging Branches

When you merge, Git combines changes from one branch into another.

### Merge a Feature Branch into Main

\`\`\`bash
git checkout main
# Switch to main first

git merge feature-navbar
# Brings changes into main
\`\`\`

### Handling Merge Conflicts

If both branches changed the same lines, Git marks the conflict:

\`\`\`
<<<<<<< HEAD
Your version
=======
Their version
>>>>>>> feature-navbar
\`\`\`

**To resolve:**
1. Open the file
2. Choose which code to keep
3. Delete the markers
4. Save, stage, and commit

\`\`\`bash
git add conflicted-file.html
git commit -m "Resolve merge conflict"
\`\`\``,
        common_mistakes: "Panicking at merge conflicts. They're normal and easy to fix. Just read the file, decide what to keep, and commit.",
        tldr: "Switch to the target branch, then `git merge source-branch`. Conflicts require manual resolution."
    },
    {
        id: "git-10",
        roadmap_id: "git-github",
        title: "GitHub Introduction",
        short_summary: "Sharing and backing up your code",
        order_index: 10,
        svg_x: 150,
        svg_y: 1000,
        estimated_time: "8 min",
        why_matters: "So far, Git has lived only on your computer. GitHub is where you share your code with the world, back it up online, and collaborate with others.",
        content: `## GitHub Introduction

**GitHub** is a website that hosts Git repositories. It adds:

- Cloud backup for your code
- A web interface to view history
- Collaboration tools (pull requests, issues)
- A profile to showcase your work

### Git ≠ GitHub

Git is the tool. GitHub is one of many hosting websites (others: GitLab, Bitbucket).

### Sign Up

1. Go to [github.com](https://github.com)
2. Create a free account
3. Verify your email

### Create a Repository on GitHub

1. Click "+" → "New repository"
2. Name it (e.g., "my-project")
3. Choose public or private
4. **Don't** initialize with README if you have local code
5. Click "Create repository"

### Key Concepts

- **Repository**: Your project's home on GitHub
- **README**: File that describes your project
- **Fork**: Your copy of someone else's repo
- **Star**: Bookmarking a repo`,
        common_mistakes: "Creating a repo with a README on GitHub when you already have local code. This creates conflicts. If you have existing code, create an empty repo.",
        tldr: "GitHub hosts your Git repos online. Create an empty repo there, then connect your local repo to it."
    },
    {
        id: "git-11",
        roadmap_id: "git-github",
        title: "Connecting Local Repo to GitHub",
        short_summary: "Linking your computer to the cloud",
        order_index: 11,
        svg_x: 50,
        svg_y: 1100,
        estimated_time: "10 min",
        why_matters: "Your local Git repo and GitHub are separate. You need to connect them so you can push and pull code.",
        content: `## Connecting Local Repo to GitHub

A **remote** is a connection to a repo on a server. The standard name is \`origin\`.

### Add GitHub as a Remote

\`\`\`bash
git remote add origin https://github.com/username/my-project.git
\`\`\`

### Verify the Connection

\`\`\`bash
git remote -v
# origin  https://github.com/... (fetch)
# origin  https://github.com/... (push)
\`\`\`

### Push for the First Time

\`\`\`bash
git push -u origin main
# -u sets origin/main as default
\`\`\`

After this, you can just use:

\`\`\`bash
git push
\`\`\`

### Authentication

GitHub requires authentication:
- **HTTPS**: Use a Personal Access Token as password
- **SSH**: Set up once, never enter credentials again`,
        common_mistakes: "Forgetting to create the repo on GitHub first. You can't push to a repo that doesn't exist.",
        tldr: "`git remote add origin URL` connects to GitHub. `git push -u origin main` uploads your code."
    },
    {
        id: "git-12",
        roadmap_id: "git-github",
        title: "Pushing & Pulling",
        short_summary: "Syncing with GitHub",
        order_index: 12,
        svg_x: 150,
        svg_y: 1200,
        estimated_time: "8 min",
        why_matters: "Once connected to GitHub, you'll constantly push your commits up and pull others' commits down. This is the rhythm of remote work.",
        content: `## Pushing & Pulling

- **Push**: Upload your commits to GitHub
- **Pull**: Download commits from GitHub

### Push Your Commits

\`\`\`bash
git push
\`\`\`

### Pull Latest Changes

\`\`\`bash
git pull
\`\`\`

### Check Remote Status

\`\`\`bash
git fetch
# Downloads info without merging
git status
# Shows if you're ahead/behind
\`\`\`

### The Typical Workflow

\`\`\`bash
git pull                    # Get latest
# ... do your work ...
git add .
git commit -m "Add feature"
git pull                    # Check for updates
git push                    # Upload your work
\`\`\``,
        common_mistakes: "Pushing without pulling first when collaborating. If someone else pushed, your push will be rejected. Always pull before you push.",
        tldr: "`git push` uploads. `git pull` downloads. Always pull before pushing when collaborating."
    },
    {
        id: "git-13",
        roadmap_id: "git-github",
        title: "Basic Collaboration Workflow",
        short_summary: "Working with a team",
        order_index: 13,
        svg_x: 50,
        svg_y: 1300,
        estimated_time: "15 min",
        why_matters: "Real projects involve multiple people. This step teaches you the standard workflow for collaborating safely.",
        content: `## Basic Collaboration Workflow

The professional workflow:

1. Create a branch for your work
2. Make commits on your branch
3. Push your branch to GitHub
4. Open a Pull Request (PR)
5. Get feedback and approval
6. Merge into main

### The Full Process

\`\`\`bash
# 1. Start with latest main
git checkout main
git pull

# 2. Create feature branch
git checkout -b add-contact-form

# 3. Do your work
git add .
git commit -m "Add contact form"

# 4. Push to GitHub
git push -u origin add-contact-form
\`\`\`

### On GitHub:

1. Click "Compare & pull request"
2. Add description
3. Request review
4. After approval, click "Merge"

### Clean Up

\`\`\`bash
git checkout main
git pull
git branch -d add-contact-form
\`\`\``,
        common_mistakes: "Working directly on main. Always create a branch, even for small changes. It's the habit that saves you when working with others.",
        tldr: "Branch → Commit → Push → Pull Request → Merge → Pull. This is how teams work safely."
    }
]

// Helper to get node by ID
export function getGitNode(nodeId) {
    return gitNodes.find(n => n.id === nodeId) || null
}

// Helper to get all nodes sorted
export function getGitNodesSorted() {
    return [...gitNodes].sort((a, b) => a.order_index - b.order_index)
}

const gitRoadmapData = { gitRoadmap, gitNodes, getGitNode, getGitNodesSorted }

export default gitRoadmapData
