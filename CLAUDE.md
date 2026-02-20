# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Dev server (http://localhost:5173), auto-copies data/ to public/data/
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test framework is configured. Validation runs in CI via inline Node script in `.github/workflows/deploy.yml`.

## Architecture

Static SPA for AI/ML Korean terminology glossary. No backend; all data is JSON fetched at runtime.

**Stack**: React 19 + TypeScript + Vite + MUI v7, deployed to GitHub Pages.

**Routing** (`App.tsx`): HashRouter with lazy-loaded pages.
- `/` → `SearchPage` (search + alphabet filter)
- `/term/:termId` → `TermDetailPage` (accordion per meaning, related terms)
- `/about` → `AboutPage`

**Data flow**: `data/index.json` lists alphabet JSON files (`a.json`..`w.json`). At build time, `prebuild` copies `data/` → `public/data/`. At runtime, `loadTerms.ts` fetches all files in parallel via `Promise.all`, flattens, and sorts. The `useTerms` hook caches this; `useSearch` debounces (200ms) and filters across `term`, `korean`, `domain`, `synonyms`.

**Homepage**: `SearchPage` embeds `HeroSection` (stats) + `AlphabetNavigation` (A-Z chips) + `TermCard` grid. The `Layout` component wraps non-home pages with AppBar + footer; home page hides AppBar.

## Data Model

Defined in `src/types/term.ts`:

```typescript
interface TermExample { en: string; ko: string; source?: string }
interface TermMeaning {
  korean: string              // Required
  domain: string              // Required, no spaces (e.g., "딥러닝")
  definition: string          // Required
  examples: (string | TermExample)[]  // Union type for backward compat
  synonyms: string[]
}
interface Term { term: string; meanings: TermMeaning[] }
```

Domain colors are mapped in `utils/domainColors.ts` (29 domains). New domains need a color entry there.

**Examples format**: Prefer `TermExample` objects (`{en, ko, source?}`) over plain strings. Both are supported. `TermDetailPage` uses `isTermExample()` type guard to render accordingly.

## Adding New Terms

1. Edit the appropriate `data/{letter}.json` file
2. If creating a new letter file, add it to `data/index.json`
3. Required fields per meaning: `korean`, `domain` (no spaces), `definition`
4. Domain names must have no spaces (e.g., `컴퓨터비전` not `컴퓨터 비전`)
5. CI validates: JSON syntax, required fields, domain spacing, TermExample `en`/`ko` presence

## CI/CD

`.github/workflows/deploy.yml`: On push to `main`, validates term data → builds → deploys to GitHub Pages. The validation step checks all JSON files for required fields, domain spacing, and TermExample structure.

## Branding

- Project name: "AI/ML 용어집"
- Organization: "파이토치 한국 사용자 모임" (full) / "PyTorchKR" (short)
- Theme primary: `#ee4c2c` (PyTorch orange-red), secondary: `#262626`
