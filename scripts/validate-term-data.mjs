#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

const DATA_DIR = resolve(process.cwd(), 'data')
const indexPath = resolve(DATA_DIR, 'index.json')

let errors = 0

function report(message) {
  console.error(message)
  errors += 1
}

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

function readJson(filePath, label) {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch (error) {
    report(`Invalid JSON in ${label}: ${error.message}`)
    return null
  }
}

const index = readJson(indexPath, 'data/index.json')

if (!Array.isArray(index)) {
  report('data/index.json must be an array of file names')
} else {
  const seenFiles = new Set()

  for (const file of index) {
    if (!isNonEmptyString(file)) {
      report(`Invalid file name in data/index.json: ${String(file)}`)
      continue
    }

    if (seenFiles.has(file)) {
      report(`Duplicate file in data/index.json: ${file}`)
      continue
    }
    seenFiles.add(file)

    const filePath = resolve(DATA_DIR, file)
    if (!existsSync(filePath)) {
      report(`Missing data file listed in index: ${file}`)
      continue
    }

    const terms = readJson(filePath, `data/${file}`)
    if (!Array.isArray(terms)) {
      report(`data/${file} must contain an array of terms`)
      continue
    }

    for (const [termIndex, term] of terms.entries()) {
      const termLabel = `data/${file}[${termIndex}]`

      if (!isNonEmptyString(term?.term)) {
        report(`${termLabel} is missing a non-empty term`)
      }

      if (!Array.isArray(term?.meanings) || term.meanings.length === 0) {
        report(`${termLabel} must include at least one meaning`)
        continue
      }

      if (term.issueNumber !== undefined) {
        const validIssue = typeof term.issueNumber === 'number' &&
          Number.isInteger(term.issueNumber) &&
          term.issueNumber > 0
        if (!validIssue) {
          report(`${termLabel} has invalid issueNumber`)
        }
      }

      if (term.notes !== undefined && typeof term.notes !== 'string') {
        report(`${termLabel} has invalid notes`)
      }

      for (const [meaningIndex, meaning] of term.meanings.entries()) {
        const meaningLabel = `${termLabel}.meanings[${meaningIndex}]`

        if (!isNonEmptyString(meaning?.korean)) {
          report(`${meaningLabel} is missing korean`)
        }

        if (!isNonEmptyString(meaning?.definition)) {
          report(`${meaningLabel} is missing definition`)
        }

        if (meaning.examples !== undefined) {
          if (!Array.isArray(meaning.examples)) {
            report(`${meaningLabel}.examples must be an array`)
          } else {
            for (const [exampleIndex, example] of meaning.examples.entries()) {
              if (typeof example === 'string') continue

              const validExample = example &&
                typeof example === 'object' &&
                isNonEmptyString(example.en) &&
                isNonEmptyString(example.ko) &&
                (example.source === undefined || typeof example.source === 'string')

              if (!validExample) {
                report(`${meaningLabel}.examples[${exampleIndex}] must include en and ko`)
              }
            }
          }
        }

        if (meaning.synonyms !== undefined) {
          const validSynonyms = Array.isArray(meaning.synonyms) &&
            meaning.synonyms.every((synonym) => typeof synonym === 'string')
          if (!validSynonyms) {
            report(`${meaningLabel}.synonyms must be an array of strings`)
          }
        }
      }
    }
  }
}

if (errors > 0) {
  console.error(`${errors} validation error(s) found`)
  process.exit(1)
}

console.log(`All ${Array.isArray(index) ? index.length : 0} data files validated successfully`)
