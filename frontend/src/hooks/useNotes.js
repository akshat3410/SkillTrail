import { useState, useCallback, useEffect, useRef } from 'react'
import { api } from '../lib/api'

/**
 * Hook for managing notes with auto-save debouncing
 */
export function useNotes(nodeId) {
    const [content, setContent] = useState('')
    const [savedContent, setSavedContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [saving, setSaving] = useState(false)
    const [error, setError] = useState(null)
    const saveTimeoutRef = useRef(null)

    // Fetch note when nodeId changes
    useEffect(() => {
        if (!nodeId) return

        const fetchNote = async () => {
            try {
                setLoading(true)
                setError(null)
                const data = await api.getNote(nodeId)
                setContent(data.content || '')
                setSavedContent(data.content || '')
            } catch (err) {
                // Note might not exist yet, that's okay
                if (!err.message.includes('not found')) {
                    setError(err.message)
                }
                setContent('')
                setSavedContent('')
            } finally {
                setLoading(false)
            }
        }

        fetchNote()
    }, [nodeId])

    // Auto-save with debounce
    useEffect(() => {
        if (content === savedContent || loading) return

        // Clear existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current)
        }

        // Set new timeout for auto-save (1 second debounce)
        saveTimeoutRef.current = setTimeout(async () => {
            try {
                setSaving(true)
                setError(null)
                await api.updateNote(nodeId, content)
                setSavedContent(content)
            } catch (err) {
                setError(err.message)
            } finally {
                setSaving(false)
            }
        }, 1000)

        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current)
            }
        }
    }, [content, savedContent, nodeId, loading])

    const updateContent = useCallback((newContent) => {
        setContent(newContent)
    }, [])

    const saveNow = useCallback(async () => {
        if (content === savedContent) return

        try {
            setSaving(true)
            setError(null)
            await api.updateNote(nodeId, content)
            setSavedContent(content)
        } catch (err) {
            setError(err.message)
            throw err
        } finally {
            setSaving(false)
        }
    }, [content, savedContent, nodeId])

    const hasUnsavedChanges = content !== savedContent

    return {
        content,
        loading,
        saving,
        error,
        hasUnsavedChanges,
        updateContent,
        saveNow
    }
}

export default useNotes
