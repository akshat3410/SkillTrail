import PropTypes from 'prop-types'

/**
 * SkillTrail Brand-Wide Icon System
 * 
 * Hand-drawn / doodle-style SVG icons with consistent visual grammar.
 * All icons are line-based, monoline (1.8px stroke), with slightly
 * rounded ends for a sketch-like feel.
 * 
 * Usage:
 *   import { DoodleIcon } from './DoodleIcons'
 *   <DoodleIcon name="git" size={24} />
 */

// Icon path definitions - centralized for consistency
const ICON_PATHS = {
  // === VERSION CONTROL ===
  
  // Git - branching network
  git: (
    <>
      <path d="M6 3c0.3 0.1 0.5 0.5 0.3 0.8L6 18" />
      <circle cx="6" cy="20" r="2" />
      <path d="M6 8c2.5 0 4.5 1.5 6.5 4.5c2 3 4.5 4 7.5 3.5" />
      <circle cx="20" cy="16" r="2" />
    </>
  ),
  
  // Branch - forking path  
  branch: (
    <>
      <path d="M6 3v14" />
      <circle cx="6" cy="19" r="2" />
      <circle cx="18" cy="5" r="2" />
      <path d="M18 7c0 3.5-2.5 5.5-5.5 7.5c-3 2-6.5 2.5-6.5 2.5" />
    </>
  ),
  
  // Merge - converging lines
  merge: (
    <>
      <circle cx="6" cy="5" r="2" />
      <circle cx="18" cy="19" r="2" />
      <path d="M6 7v4c0 4 4 6 12 10" />
      <circle cx="18" cy="5" r="2" />
      <path d="M18 7v3c0 2.5-1.5 4-4 6" />
    </>
  ),
  
  // Commit/Save - floppy disk
  commit: (
    <>
      <path d="M5 3h10l5 5v11c0 1-1 2-2 2H5c-1 0-2-1-2-2V5c0-1 1-2 2-2z" />
      <path d="M7 3v5h8V3" />
      <rect x="7" y="13" width="10" height="7" rx="1" />
    </>
  ),
  
  // === CLOUD & REMOTE ===
  
  // Cloud - remote repository
  cloud: (
    <>
      <path d="M6.5 18c-2 0-3.5-1.5-3.5-3.5c0-1.8 1.2-3 3-3.5c0.5-2.5 2.5-4 5-4c3 0 5 2 5 5c1.5 0.5 2.5 1.5 2.5 3c0 2-1.5 3-3 3h-9z" />
    </>
  ),
  
  // Upload - push to remote
  upload: (
    <>
      <path d="M12 15V4" />
      <path d="M8 8l4-4l4 4" />
      <path d="M4 17v2c0 1 1 2 2 2h12c1 0 2-1 2-2v-2" />
    </>
  ),
  
  // Download - pull/clone
  download: (
    <>
      <path d="M12 4v11" />
      <path d="M8 11l4 4l4-4" />
      <path d="M4 17v2c0 1 1 2 2 2h12c1 0 2-1 2-2v-2" />
    </>
  ),
  
  // === DEVELOPMENT ===
  
  // Code - terminal/editor
  code: (
    <>
      <path d="M8 6L3 12l5 6" />
      <path d="M16 6l5 6l-5 6" />
      <path d="M14 4l-4 16" />
    </>
  ),
  
  // Terminal - command line
  terminal: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M7 9l3 3l-3 3" />
      <path d="M12 15h5" />
    </>
  ),
  
  // Folder - project/repository
  folder: (
    <>
      <path d="M3 7c0-1.5 0.8-2 2-2h4l2 2h8c1.2 0 2 0.5 2 2v9c0 1.5-0.8 2-2 2H5c-1.2 0-2-0.5-2-2V7z" />
    </>
  ),
  
  // File - document
  file: (
    <>
      <path d="M6 3h8l5 5v11c0 1-1 2-2 2H6c-1 0-2-1-2-2V5c0-1 1-2 2-2z" />
      <path d="M14 3v5h5" />
    </>
  ),
  
  // === LEARNING & KNOWLEDGE ===
  
  // Book - reading/learning
  book: (
    <>
      <path d="M4 4c2-0.8 4-0.8 8 1v15c-4-1.8-6-1.8-8-1V4z" />
      <path d="M20 4c-2-0.8-4-0.8-8 1v15c4-1.8 6-1.8 8-1V4z" />
    </>
  ),
  
  // Lightbulb - idea/tip
  lightbulb: (
    <>
      <path d="M9 21h6" />
      <path d="M12 3c-3.5 0-5.5 2.5-5.5 5.5c0 1.8 0.8 2.8 1.8 4c0.6 0.8 0.9 1.5 0.9 2.5h5.6c0-1 0.3-1.7 0.9-2.5c1-1.2 1.8-2.2 1.8-4c0-3-2-5.5-5.5-5.5z" />
      <path d="M10 17.5v1" />
      <path d="M14 17.5v1" />
    </>
  ),
  
  // Graduation - mastery
  graduate: (
    <>
      <path d="M2 9l10-4l10 4l-10 4z" />
      <path d="M6 11v6c2 2 8 2 10 0v-6" />
      <path d="M22 9v7" />
    </>
  ),
  
  // === NAVIGATION & FLOW ===
  
  // Arrow right - next step
  arrowRight: (
    <>
      <path d="M4 12h16" />
      <path d="M14 6l6 6l-6 6" />
    </>
  ),
  
  // Arrow down - continue
  arrowDown: (
    <>
      <path d="M12 4v16" />
      <path d="M6 14l6 6l6-6" />
    </>
  ),
  
  // Path/Route - journey
  path: (
    <>
      <circle cx="5" cy="6" r="2" />
      <circle cx="19" cy="18" r="2" />
      <path d="M5 8c0 4 4 6 7 7c3 1 7 2 7 5" />
    </>
  ),
  
  // Map - overview
  map: (
    <>
      <path d="M3 6l6-2l6 2l6-2v16l-6 2l-6-2l-6 2V6z" />
      <path d="M9 4v16" />
      <path d="M15 6v16" />
    </>
  ),
  
  // === UI & ACTIONS ===
  
  // Check - completed
  check: (
    <>
      <path d="M4 12l5 5c0.5 0.5 1 0.3 1.5-0.2L20 6" />
    </>
  ),
  
  // Circle check - completed (with circle)
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12l2.5 2.5l5-5" />
    </>
  ),
  
  // Progress/In-progress - half circle
  progress: (
    <>
      <path d="M12 3a9 9 0 0 1 9 9" />
      <circle cx="12" cy="12" r="9" opacity="0.3" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  
  // Star - favorite/current
  star: (
    <>
      <path d="M12 3l2.5 5l5.5 0.8l-4 3.9l1 5.3l-5-2.6l-5 2.6l1-5.3l-4-3.9l5.5-0.8z" />
    </>
  ),
  
  // Settings - configuration
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3" />
      <path d="M2 12h3M19 12h3" />
      <path d="M4.9 4.9l2.1 2.1M17 17l2.1 2.1" />
      <path d="M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
    </>
  ),
  
  // === COLLABORATION ===
  
  // User - single person
  user: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
    </>
  ),
  
  // Users - team/collaboration
  users: (
    <>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 20c0-3 2.5-5.5 6-5.5s6 2.5 6 5.5" />
      <circle cx="17" cy="8" r="2.5" />
      <path d="M15 20c0-2 1.2-3.5 3-4c1.8-0.5 3 1 3 4" />
    </>
  ),
  
  // Comment - discussion
  comment: (
    <>
      <path d="M4 5c0-1 1-2 2-2h12c1 0 2 1 2 2v10c0 1-1 2-2 2h-6l-4 4v-4H6c-1 0-2-1-2-2V5z" />
    </>
  ),
  
  // === STATUS ===
  
  // Clock - time/duration  
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  
  // Target - goal
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  
  // Flag - milestone
  flag: (
    <>
      <path d="M5 3v18" />
      <path d="M5 4c8-2 8 4 14 2v8c-6 2-6-4-14-2" />
    </>
  ),
  
  // === MISC ===
  
  // Search - find
  search: (
    <>
      <circle cx="10" cy="10" r="6" />
      <path d="M14.5 14.5l5 5" />
    </>
  ),
  
  // Plus - add
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  
  // Menu - navigation
  menu: (
    <>
      <path d="M4 6h16" />
      <path d="M4 12h16" />
      <path d="M4 18h16" />
    </>
  ),
  
  // External link
  external: (
    <>
      <path d="M10 4H5c-1 0-2 1-2 2v13c0 1 1 2 2 2h13c1 0 2-1 2-2v-5" />
      <path d="M14 3h7v7" />
      <path d="M21 3L10 14" />
    </>
  ),
  
  // Link
  link: (
    <>
      <path d="M10 14a4 4 0 0 1-1-5.5l2.5-2.5a4 4 0 0 1 5.5 5.5l-1 1" />
      <path d="M14 10a4 4 0 0 1 1 5.5l-2.5 2.5a4 4 0 0 1-5.5-5.5l1-1" />
    </>
  ),
  
  // Default fallback - simple circle with dot
  default: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="2" />
    </>
  )
}

// Icon name aliases for flexible usage
const ICON_ALIASES = {
  save: 'commit',
  push: 'upload',
  pull: 'download',
  clone: 'download',
  remote: 'cloud',
  repository: 'folder',
  repo: 'folder',
  project: 'folder',
  idea: 'lightbulb',
  tip: 'lightbulb',
  learn: 'book',
  reading: 'book',
  next: 'arrowRight',
  flow: 'path',
  workflow: 'path',
  journey: 'path',
  team: 'users',
  collaborate: 'users',
  collaboration: 'users',
  pr: 'users',
  review: 'comment',
  done: 'check',
  complete: 'check',
  completed: 'checkCircle',
  time: 'clock',
  duration: 'clock',
  goal: 'target',
  milestone: 'flag',
  config: 'settings',
  configuration: 'settings',
  install: 'download',
  setup: 'download'
}

/**
 * DoodleIcon Component
 * 
 * Renders a hand-drawn style SVG icon from the SkillTrail icon system.
 * 
 * @param {string} name - Icon name (e.g., 'git', 'branch', 'check')
 * @param {number} size - Icon size in pixels (default: 24)
 * @param {string} color - Stroke color (default: 'currentColor')
 * @param {number} strokeWidth - Stroke width (default: 1.8)
 * @param {string} className - Additional CSS classes
 */
export function DoodleIcon({ 
  name, 
  size = 24, 
  color = 'currentColor',
  strokeWidth = 1.8,
  className = '',
  ...props 
}) {
  // Resolve aliases
  const iconName = ICON_ALIASES[name] || name
  const paths = ICON_PATHS[iconName] || ICON_PATHS.default
  
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`doodle-icon doodle-icon-${iconName} ${className}`}
      aria-hidden="true"
      {...props}
    >
      {paths}
    </svg>
  )
}

DoodleIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number,
  color: PropTypes.string,
  strokeWidth: PropTypes.number,
  className: PropTypes.string
}

/**
 * Get all available icon names
 */
export function getIconNames() {
  return Object.keys(ICON_PATHS)
}

/**
 * Check if an icon exists
 */
export function hasIcon(name) {
  const iconName = ICON_ALIASES[name] || name
  return iconName in ICON_PATHS
}

/**
 * NodeIcon - Specialized icon for roadmap nodes
 * Includes hover and state styling
 */
export function NodeIcon({ 
  name, 
  status = 'not_started',
  size = 28,
  className = '' 
}) {
  const statusColors = {
    not_started: 'var(--doodle-stroke)',
    in_progress: 'var(--doodle-yellow)',
    completed: 'var(--doodle-mint)'
  }
  
  return (
    <DoodleIcon
      name={status === 'completed' ? 'check' : name}
      size={size}
      color={statusColors[status]}
      strokeWidth={status === 'completed' ? 2.2 : 1.8}
      className={`node-icon node-icon-${status} ${className}`}
    />
  )
}

NodeIcon.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['not_started', 'in_progress', 'completed']),
  size: PropTypes.number,
  className: PropTypes.string
}

export default DoodleIcon
