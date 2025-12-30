import { useState, useCallback } from 'react'
import { api } from '../lib/api'

/**
 * Hook for managing user progress on nodes
 */
export function useProgress() {
    const [progress, setProgress] = useState({})
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const fetchProgress = useCallback(async () => {
        try {
            setLoading(true)
            setError(null)
            const data = await api.getProgress()
            // Convert array to object keyed by node_id for easy lookup
            const progressMap = {}
            data.forEach(p => {
                progressMap[p.node_id] = p.status
            })
            setProgress(progressMap)
            return progressMap
        } catch (err) {
            setError(err.message)
            return {}
        } finally {
            setLoading(false)
        }
    }, [])

    const updateProgress = useCallback(async (nodeId, status) => {
        try {
            setError(null)
            // Optimistic update
            setProgress(prev => ({ ...prev, [nodeId]: status }))
            await api.updateProgress(nodeId, status)
        } catch (err) {
            // Revert on error
            setProgress(prev => {
                const next = { ...prev }
                delete next[nodeId]
                return next
            })
            setError(err.message)
            throw err
        }
    }, [])

    const getNodeStatus = useCallback((nodeId) => {
        return progress[nodeId] || 'not_started'
    }, [progress])

    return {
        progress,
        loading,
        error,
        fetchProgress,
        updateProgress,
        getNodeStatus
    }
}

export default useProgress
