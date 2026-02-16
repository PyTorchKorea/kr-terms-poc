export interface TermMeaning {
  korean: string
  domain: string
  definition: string
  examples: string[]
  synonyms: string[]
}

export interface Term {
  term: string
  meanings: TermMeaning[]
}
