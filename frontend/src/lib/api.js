import { gitRoadmap, gitNodes, getGitNode, getGitNodesSorted } from '../data/gitRoadmap'
import { genaiRoadmap, genaiNodes, getGenAiNode, getGenAiNodesSorted } from '../data/genaiRoadmap'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

// Mock user ID for development (login disabled)
const MOCK_USER_ID = 'dev-user-001'

// Use the Git roadmap data as primary source + GenAI
const ROADMAPS = [
    {
        id: gitRoadmap.id,
        title: gitRoadmap.title,
        description: gitRoadmap.description,
        created_at: new Date().toISOString()
    },
    {
        id: 'genai-prompting',
        title: 'Generative AI & Prompt Engineering',
        description: 'Master AI tools from basics to advanced prompting techniques.',
        created_at: new Date().toISOString()
    }
]

/**
 * API client with Git roadmap data as primary source
 * Falls back to backend when available
 */
class ApiClient {
    constructor(baseUrl) {
        this.baseUrl = baseUrl
    }

    getHeaders() {
        return {
            'Content-Type': 'application/json',
            'X-User-Id': MOCK_USER_ID
        }
    }

    async request(endpoint, options = {}) {
        const headers = this.getHeaders()

        try {
            const response = await fetch(`${this.baseUrl}${endpoint}`, {
                ...options,
                headers: {
                    ...headers,
                    ...options.headers
                }
            })

            if (!response.ok) {
                const error = await response.json().catch(() => ({ message: 'Request failed' }))
                throw new Error(error.detail || error.message || 'Request failed')
            }

            return response.json()
        } catch (error) {
            throw error
        }
    }

    // Roadmaps - Git roadmap is primary
    async getRoadmaps() {
        try {
            const data = await this.request('/api/v1/roadmaps')
            return data.length > 0 ? data : ROADMAPS
        } catch {
            return ROADMAPS
        }
    }

    async getRoadmap(id) {
        // Check if it's the Git roadmap
        if (id === gitRoadmap.id || id === 'git-fundamentals' || id === '1') {
            return {
                id: gitRoadmap.id,
                title: gitRoadmap.title,
                description: gitRoadmap.description,
                created_at: new Date().toISOString()
            }
        }

        // Check if it's the GenAI roadmap
        if (id === genaiRoadmap.id) {
            return {
                id: genaiRoadmap.id,
                title: genaiRoadmap.title,
                description: genaiRoadmap.description,
                created_at: new Date().toISOString()
            }
        }

        try {
            return await this.request(`/api/v1/roadmaps/${id}`)
        } catch {
            return ROADMAPS[0]
        }
    }

    // Nodes - Use Git/GenAI nodes as primary source
    async getNodes(roadmapId) {
        // Return Git nodes for Git roadmap
        if (roadmapId === gitRoadmap.id || roadmapId === 'git-fundamentals' || roadmapId === '1') {
            return getGitNodesSorted()
        }

        // Return GenAI nodes for GenAI roadmap
        if (roadmapId === genaiRoadmap.id) {
            return getGenAiNodesSorted()
        }

        try {
            const data = await this.request(`/api/v1/roadmaps/${roadmapId}/nodes`)
            return data.length > 0 ? data : getGitNodesSorted()
        } catch {
            return getGitNodesSorted()
        }
    }

    async getNode(id) {
        // Check if it's a Git node
        const gitNode = getGitNode(id)
        if (gitNode) {
            return gitNode
        }

        // Check if it's a GenAI node
        const genaiNode = getGenAiNode(id)
        if (genaiNode) {
            return genaiNode
        }

        // Check for legacy node IDs (node-1, node-2, etc.)
        const legacyMatch = id.match(/^node-(\d+)$/)
        if (legacyMatch) {
            const index = parseInt(legacyMatch[1])
            const sortedNodes = getGitNodesSorted()
            if (index > 0 && index <= sortedNodes.length) {
                return sortedNodes[index - 1]
            }
        }

        try {
            return await this.request(`/api/v1/nodes/${id}`)
        } catch {
            // Fallback to first Git node
            return getGitNodesSorted()[0]
        }
    }

    // Progress - silent fail, uses localStorage in frontend
    async getProgress() {
        try {
            return await this.request('/api/v1/progress')
        } catch {
            return {}
        }
    }

    async getNodeProgress(nodeId) {
        try {
            return await this.request(`/api/v1/progress/${nodeId}`)
        } catch {
            return { status: 'not_started' }
        }
    }

    async updateProgress(nodeId, status) {
        try {
            return await this.request(`/api/v1/progress/${nodeId}`, {
                method: 'PUT',
                body: JSON.stringify({ status })
            })
        } catch {
            // Silent fail - localStorage handles this
            return { nodeId, status }
        }
    }

    // Notes - silent fail, uses localStorage in frontend
    async getNotes() {
        try {
            return await this.request('/api/v1/notes')
        } catch {
            return []
        }
    }

    async getNote(nodeId) {
        try {
            return await this.request(`/api/v1/notes/${nodeId}`)
        } catch {
            return { content: '' }
        }
    }

    async updateNote(nodeId, content) {
        try {
            return await this.request(`/api/v1/notes/${nodeId}`, {
                method: 'PUT',
                body: JSON.stringify({ content })
            })
        } catch {
            // Silent fail - localStorage handles this
            return { nodeId, content }
        }
    }

    // User Journey
    async getJourney() {
        try {
            return await this.request('/api/v1/user/journey')
        } catch {
            return { roadmaps: [], recent_topics: [], notes: [] }
        }
    }
}

export const api = new ApiClient(API_URL)
export default api
