import { useState, useEffect } from 'react'
import type { Term } from '../types/term'
import { loadAllTerms } from '../utils/loadTerms'

interface UseTermsResult {
  terms: Term[]
  loading: boolean
  error: string | null
}

export function useTerms(): UseTermsResult {
  const [terms, setTerms] = useState<Term[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function fetchTerms(): Promise<void> {
      try {
        const loadedTerms = await loadAllTerms()
        if (mounted) {
          setTerms(loadedTerms)
          setLoading(false)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setLoading(false)
        }
      }
    }

    fetchTerms()

    return () => {
      mounted = false
    }
  }, [])

  return { terms, loading, error }
}
