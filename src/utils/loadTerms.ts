import type { Term } from '../types/term'

export async function loadAllTerms(): Promise<Term[]> {
  try {
    const basePath = import.meta.env.BASE_URL
    const indexResponse = await fetch(`${basePath}data/index.json`)

    if (!indexResponse.ok) {
      throw new Error('Failed to load index.json')
    }

    const files = await indexResponse.json() as string[]

    const termArrays = await Promise.all(
      files.map(async (file) => {
        const response = await fetch(`${basePath}data/${file}`)
        if (!response.ok) {
          throw new Error(`Failed to load ${file}`)
        }
        return response.json() as Promise<Term[]>
      })
    )

    const allTerms = termArrays.flat()

    return [...allTerms].sort((a, b) => a.term.localeCompare(b.term))
  } catch (error) {
    throw new Error(
      `Failed to load terms: ${error instanceof Error ? error.message : 'Unknown error'}`,
      { cause: error }
    )
  }
}
