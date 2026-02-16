import type { Term } from '../types/term'

export interface Statistics {
  totalTerms: number
  totalMeanings: number
  domainCounts: Record<string, number>
  duplicateTranslations: Map<string, string[]>
}

export function calculateStatistics(terms: Term[]): Statistics {
  const totalTerms = terms.length
  let totalMeanings = 0
  const domainCounts: Record<string, number> = {}
  const koreanToTerms = new Map<string, string[]>()

  terms.forEach((term) => {
    totalMeanings += term.meanings.length

    term.meanings.forEach((meaning) => {
      domainCounts[meaning.domain] = (domainCounts[meaning.domain] || 0) + 1

      const existing = koreanToTerms.get(meaning.korean) || []
      if (!existing.includes(term.term)) {
        koreanToTerms.set(meaning.korean, [...existing, term.term])
      }
    })
  })

  const duplicateTranslations = new Map<string, string[]>()
  koreanToTerms.forEach((termList, korean) => {
    if (termList.length > 1) {
      duplicateTranslations.set(korean, termList)
    }
  })

  return {
    totalTerms,
    totalMeanings,
    domainCounts,
    duplicateTranslations,
  }
}
