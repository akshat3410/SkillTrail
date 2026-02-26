/**
 * Local Progress Store
 * 
 * Frontend-first progress management using localStorage.
 * Persists across page reloads without requiring backend.
 * 
 * Storage structure:
 * skilltrail_progress: { [roadmapId]: { [nodeId]: status } }
 * skilltrail_notes: { [nodeId]: { content, updatedAt } }
 */

const PROGRESS_KEY = 'skilltrail_progress'
const NOTES_KEY = 'skilltrail_notes'
const CURRENT_POSITION_KEY = 'skilltrail_position'

// ==================
// PROGRESS FUNCTIONS
// ==================

/**
 * Get all progress for a roadmap
 */
export function getProgress(roadmapId = 'default') {
    try {
        const stored = localStorage.getItem(PROGRESS_KEY)
        if (!stored) return {}
        const all = JSON.parse(stored)
        return all[roadmapId] || {}
    } catch (e) {
        console.error('Error reading progress:', e)
        return {}
    }
}

/**
 * Get status for a specific node
 */
export function getNodeStatus(nodeId, roadmapId = 'default') {
    const progress = getProgress(roadmapId)
    return progress[nodeId] || 'not_started'
}

/**
 * Update progress for a node
 */
export function updateNodeProgress(nodeId, status, roadmapId = 'default') {
    try {
        const stored = localStorage.getItem(PROGRESS_KEY)
        const all = stored ? JSON.parse(stored) : {}

        if (!all[roadmapId]) {
            all[roadmapId] = {}
        }

        all[roadmapId][nodeId] = status
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(all))

        // Dispatch custom event so other components can react
        window.dispatchEvent(new CustomEvent('skilltrail-progress-update', {
            detail: { nodeId, status, roadmapId }
        }))

        return true
    } catch (e) {
        console.error('Error saving progress:', e)
        return false
    }
}

/**
 * Get completed nodes count for a roadmap
 */
export function getCompletedCount(roadmapId = 'default') {
    const progress = getProgress(roadmapId)
    return Object.values(progress).filter(s => s === 'completed').length
}

/**
 * Get the current position (first incomplete node index)
 */
export function getCurrentPosition(nodes, roadmapId = 'default') {
    const progress = getProgress(roadmapId)
    const sorted = [...nodes].sort((a, b) => a.order_index - b.order_index)

    const idx = sorted.findIndex(n => {
        const status = progress[n.id]
        return !status || status === 'not_started' || status === 'in_progress'
    })

    return idx === -1 ? sorted.length - 1 : idx
}

// ===============
// NOTES FUNCTIONS
// ===============

/**
 * Get note for a specific node
 */
export function getNote(nodeId) {
    try {
        const stored = localStorage.getItem(NOTES_KEY)
        if (!stored) return { content: '', updatedAt: null }
        const all = JSON.parse(stored)
        return all[nodeId] || { content: '', updatedAt: null }
    } catch (e) {
        console.error('Error reading note:', e)
        return { content: '', updatedAt: null }
    }
}

/**
 * Save note for a node
 */
export function saveNote(nodeId, content) {
    try {
        const stored = localStorage.getItem(NOTES_KEY)
        const all = stored ? JSON.parse(stored) : {}

        all[nodeId] = {
            content,
            updatedAt: new Date().toISOString()
        }

        localStorage.setItem(NOTES_KEY, JSON.stringify(all))
        return true
    } catch (e) {
        console.error('Error saving note:', e)
        return false
    }
}

/**
 * Get all notes for display
 */
export function getAllNotes() {
    try {
        const stored = localStorage.getItem(NOTES_KEY)
        if (!stored) return {}
        return JSON.parse(stored)
    } catch (e) {
        console.error('Error reading notes:', e)
        return {}
    }
}

// ===============
// POSITION SYNC
// ===============

/**
 * Save current trail position for resume
 */
export function savePosition(roadmapId, nodeId, scrollProgress) {
    try {
        const stored = localStorage.getItem(CURRENT_POSITION_KEY)
        const all = stored ? JSON.parse(stored) : {}

        all[roadmapId] = {
            nodeId,
            scrollProgress,
            lastVisit: new Date().toISOString()
        }

        localStorage.setItem(CURRENT_POSITION_KEY, JSON.stringify(all))
        return true
    } catch (e) {
        console.error('Error saving position:', e)
        return false
    }
}

/**
 * Get last position for resume
 */
export function getPosition(roadmapId) {
    try {
        const stored = localStorage.getItem(CURRENT_POSITION_KEY)
        if (!stored) return null
        const all = JSON.parse(stored)
        return all[roadmapId] || null
    } catch (e) {
        console.error('Error reading position:', e)
        return null
    }
}

// ===============
// RESET (Dev only)
// ===============

export function resetAllProgress() {
    localStorage.removeItem(PROGRESS_KEY)
    localStorage.removeItem(NOTES_KEY)
    localStorage.removeItem(CURRENT_POSITION_KEY)
}

const localProgressAPI = {
    getProgress,
    getNodeStatus,
    updateNodeProgress,
    getCompletedCount,
    getCurrentPosition,
    getNote,
    saveNote,
    getAllNotes,
    savePosition,
    getPosition,
    resetAllProgress
}

export default localProgressAPI
