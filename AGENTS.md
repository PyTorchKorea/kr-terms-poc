# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

## Project Overview

AI/ML 용어집 - An open-source glossary that standardizes Korean translations for AI/ML terminology. Operated by PyTorchKR (파이토치 한국 사용자 모임). Currently in PoC stage; all term data is AI-generated draft pending community review.

**Repository**: `PyTorchKorea/kr-terms-poc` | **Branch**: `poc` | **Domain**: `poc.terms.kr`

## Build & Dev Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server at http://localhost:5173 (auto-copies data/ to public/data/)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

## Architecture

Static SPA (React 19 + TypeScript + Vite + MUI v7). No backend. All term data is JSON fetched at runtime from `public/data/`.

- `data/index.json` → lists alphabet JSON files (`a.json`..`w.json`)
- `prebuild` script copies `data/` → `public/data/`
- HashRouter: `/` (search), `/term/:termId` (detail), `/about` (info)

## Data Model

```typescript
// src/types/term.ts
interface TermExample { en: string; ko: string; source?: string }
interface TermMeaning {
  korean: string              // Required - Korean translation
  domain: string              // Required - no spaces (e.g., "딥러닝")
  definition: string          // Required - Korean definition
  examples: (string | TermExample)[]  // Prefer TermExample objects
  synonyms: string[]
}
interface Term { term: string; meanings: TermMeaning[] }
```

## Adding/Editing Terms

1. Edit `data/{letter}.json` (alphabetical)
2. New letter file → add to `data/index.json`
3. Required fields: `korean`, `domain` (no spaces), `definition`
4. Examples: prefer `{ "en": "...", "ko": "...", "source": "https://..." }` format
5. New domains need a color entry in `src/utils/domainColors.ts`

## Code Style

- React functional components with explicit `React.ReactNode` return types
- MUI v7 `sx` prop for styling (no CSS modules)
- Named exports (not default exports)
- Immutable patterns - create new objects, don't mutate

## CI/CD

`.github/workflows/deploy.yml` on push to `poc`:
1. Validates all JSON files (required fields, domain spacing, TermExample structure)
2. Builds with `npm run build`
3. Deploys to GitHub Pages

## Testing

No test framework configured. Validation is done via inline Node script in CI. When editing data, verify with `npm run build` which runs TypeScript checking.

## Security

- No secrets or API keys in this project
- All data is public static JSON
- No user input stored server-side (static site)
