import { useState, useEffect } from 'react'
import type { Term } from '../types/term'

export function useSearch(terms: Term[], query: string): Term[] {
  const [filteredTerms, setFilteredTerms] = useState<Term[]>(terms)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!query.trim()) {
        setFilteredTerms(terms)
        return
      }

      const lowerQuery = query.toLowerCase()
      const filtered = terms.filter((term) => {
        if (term.term.toLowerCase().includes(lowerQuery)) {
          return true
        }

        return term.meanings.some((meaning) =>
          meaning.korean.toLowerCase().includes(lowerQuery) ||
          meaning.synonyms.some((s) => s.toLowerCase().includes(lowerQuery))
        )
      })

      setFilteredTerms(filtered)
    }, 200)

    return () => {
      clearTimeout(timer)
    }
  }, [terms, query])

  return filteredTerms
}
