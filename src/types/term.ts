export interface TermExample {
  en: string
  ko: string
  source?: string
}

export interface TermMeaning {
  korean: string
  domain: string
  definition: string
  examples: (string | TermExample)[]
  synonyms: string[]
}

export interface Term {
  term: string
  meanings: TermMeaning[]
  issueNumber?: number
  notes?: string
}
