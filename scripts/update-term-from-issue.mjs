#!/usr/bin/env node

/**
 * Update term data from a GitHub Issue.
 *
 * Usage:
 *   node scripts/update-term-from-issue.mjs \
 *     --term "attention" \
 *     --korean "어텐션" \
 *     --definition "..." \
 *     --issue-number 42 \
 *     [--examples "EN: ... | KO: ... | source: ..."] \
 *     [--synonyms "syn1, syn2"]
 *
 * Collision rules:
 *   (a) Term does not exist → create new entry
 *   (b) Term exists + different korean → append as additional meaning
 *   (c) Term exists + same korean → exit with warning
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DATA_DIR = resolve(__dirname, '..', 'data')

function parseArgs(argv) {
  const args = {}
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, '')
    args[key] = argv[i + 1]
  }
  return args
}

function parseExamples(raw) {
  if (!raw || !raw.trim()) return []

  const examples = []
  const blocks = raw.split(/\n\n+|\n(?=-\s*EN:)/i)

  for (const block of blocks) {
    const lines = block.trim()
    if (!lines) continue

    const enMatch = lines.match(/(?:^|\n)\s*-?\s*EN:\s*(.+)/i)
    const koMatch = lines.match(/(?:^|\n)\s*-?\s*KO:\s*(.+)/i)
    const sourceMatch = lines.match(/(?:^|\n)\s*-?\s*(?:출처|source):\s*(.+)/i)

    if (enMatch && koMatch) {
      const example = { en: enMatch[1].trim(), ko: koMatch[1].trim() }
      if (sourceMatch) example.source = sourceMatch[1].trim()
      examples.push(example)
    }
  }

  return examples
}

function parseSynonyms(raw) {
  if (!raw || !raw.trim()) return []
  return raw.split(',').map((s) => s.trim()).filter(Boolean)
}

function main() {
  const args = parseArgs(process.argv)

  const required = ['term', 'korean', 'definition', 'issue-number']
  for (const field of required) {
    if (!args[field]) {
      console.error(`Missing required field: --${field}`)
      process.exit(1)
    }
  }

  const termName = args.term.trim()
  const issueNumber = parseInt(args['issue-number'], 10)

  if (isNaN(issueNumber) || issueNumber <= 0) {
    console.error(`Invalid issue number: ${args['issue-number']}`)
    process.exit(1)
  }

  const letter = termName[0].toLowerCase()
  const fileName = `${letter}.json`
  const filePath = resolve(DATA_DIR, fileName)
  const indexPath = resolve(DATA_DIR, 'index.json')

  // Load or create the data file
  let terms = []
  if (existsSync(filePath)) {
    terms = JSON.parse(readFileSync(filePath, 'utf-8'))
  }

  // Ensure index.json includes this file
  const index = JSON.parse(readFileSync(indexPath, 'utf-8'))
  if (!index.includes(fileName)) {
    index.push(fileName)
    index.sort()
    writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n', 'utf-8')
    console.log(`Added ${fileName} to index.json`)
  }

  const newMeaning = {
    korean: args.korean.trim(),
    definition: args.definition.trim(),
    examples: parseExamples(args.examples || ''),
    synonyms: parseSynonyms(args.synonyms || ''),
  }

  const existingTerm = terms.find(
    (t) => t.term.toLowerCase() === termName.toLowerCase()
  )

  if (!existingTerm) {
    // Rule (a): new term
    terms.push({
      term: termName,
      meanings: [newMeaning],
      issueNumber,
    })
    terms.sort((a, b) => a.term.localeCompare(b.term))
    console.log(`Created new term: ${termName}`)
  } else {
    // Check for collision
    const duplicate = existingTerm.meanings.find(
      (m) => m.korean === newMeaning.korean
    )

    if (duplicate) {
      // Rule (c): same korean → warn and exit
      console.error(
        `COLLISION: Term "${termName}" already has meaning with korean="${newMeaning.korean}". Manual resolution required.`
      )
      process.exit(2)
    }

    // Rule (b): append new meaning
    existingTerm.meanings.push(newMeaning)
    if (!existingTerm.issueNumber) {
      existingTerm.issueNumber = issueNumber
    }
    console.log(
      `Appended new meaning to existing term: ${termName} (korean: ${newMeaning.korean})`
    )
  }

  writeFileSync(filePath, JSON.stringify(terms, null, 2) + '\n', 'utf-8')
  console.log(`Updated ${filePath}`)
}

main()
