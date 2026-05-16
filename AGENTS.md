# AGENTS.md

This file provides guidance to AI coding agents working in this repository.

## Project Context

AI/ML 용어집 - 빠르게 변화하는 AI/ML 분야의 용어를 표준화하여 사람과 AI 번역 도구 모두가 일관된 한국어 번역을 사용할 수 있도록 하는 오픈소스 프로젝트. 파이토치 한국 사용자 모임(PyTorchKR) 운영. 현재 PoC 단계이며, 수록된 용어 데이터는 AI 생성 초안.

**Repository**: `PyTorchKorea/kr-terms-poc` (branch: `poc`)

## Commands

```bash
npm install        # Install dependencies
npm run dev        # Dev server (http://localhost:5173), auto-copies data/ to public/data/
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build
```

No test framework is configured. Validation runs in CI via inline Node script in `.github/workflows/deploy.yml`.

## Architecture

Static SPA for AI/ML Korean terminology glossary. No backend; all data is JSON fetched at runtime.

**Stack**: React 19 + TypeScript + Vite + MUI v7, deployed to GitHub Pages (`poc.terms.kr`).

**Routing** (`App.tsx`): HashRouter with lazy-loaded pages.
- `/` -> `SearchPage` (search + alphabet filter)
- `/term/:termId` -> `TermDetailPage` (accordion per meaning, related terms)
- `/about` -> `AboutPage`

**Data flow**: `data/index.json` lists alphabet JSON files (`a.json`..`w.json`). At build time, `prebuild` copies `data/` -> `public/data/`. At runtime, `loadTerms.ts` fetches all files in parallel via `Promise.all`, flattens, and sorts. The `useTerms` hook caches this; `useSearch` debounces (200ms) and filters across `term`, `korean`, `synonyms`.

**Homepage**: `SearchPage` embeds `HeroSection` (stats) + `AlphabetNavigation` (A-Z chips) + `TermCard` grid. The `Layout` component wraps non-home pages with AppBar + footer; home page hides AppBar.

## Data Model

Defined in `src/types/term.ts`:

```typescript
interface TermExample { en: string; ko: string; source?: string }
interface TermMeaning {
  korean: string              // Required
  definition: string          // Required
  examples: (string | TermExample)[]  // Union type for backward compat
  synonyms: string[]
}
interface Term {
  term: string
  meanings: TermMeaning[]
  issueNumber?: number       // GitHub Issue number for traceability
  notes?: string             // Editorial notes (why this translation was chosen)
}
```

**Examples format**: Prefer `TermExample` objects (`{en, ko, source?}`) over plain strings. Both are supported. `TermDetailPage` uses `isTermExample()` type guard to render accordingly.

**Optional fields**: `issueNumber` links to the GitHub Issue where the term was discussed. `notes` provides editorial context. Both are set automatically by the co-author workflow, or manually when adding terms via PR.

## Adding New Terms

1. Edit the appropriate `data/{letter}.json` file
2. If creating a new letter file, add it to `data/index.json`
3. Required fields per meaning: `korean`, `definition`
4. CI validates: JSON syntax, required fields, TermExample `en`/`ko` presence

## Code Style

- React functional components with explicit `React.ReactNode` return types
- MUI v7 `sx` prop for styling (no CSS modules)
- Named exports (not default exports)
- Immutable patterns - create new objects, don't mutate

## Co-author Workflow

`.github/workflows/term-coauthor.yml`: Triggered when `approved` label is added to an issue.

**Two-path automation**:
- **새 용어 요청** (label: `새 용어 요청`): Parses structured issue fields -> auto-commits to `data/{letter}.json` with `Co-authored-by` trailer -> closes issue.
- **용어 피드백** (label: `용어 피드백`): Posts formatted JSON snippet as comment -> admin reviews -> `commit-ready` label triggers commit.

**Helper script**: `scripts/update-term-from-issue.mjs` handles collision detection (create/append/warn-on-duplicate) and sets `issueNumber` on the term.

## CI/CD

`.github/workflows/deploy.yml`: On push to `poc`, validates term data -> builds -> deploys to GitHub Pages. The validation step checks all JSON files for required fields, TermExample structure, and optional field types (`issueNumber`, `notes`).

`.github/workflows/term-coauthor.yml`: Co-author workflow (see above).

## LLM Integration

- `public/llms.txt`: [llmstxt.org](https://llmstxt.org/) standard guidance file for LLMs. Includes project overview, links to all data files, and data structure documentation. Available at `poc.terms.kr/llms.txt` after deployment.
- JSON data is discoverable via `poc.terms.kr/data/index.json`, with each alphabet file accessible directly.

## Branding

- Project name: "AI/ML 용어집"
- Organization: "파이토치 한국 사용자 모임" (full) / "PyTorchKR" (short)
- Theme primary: `#ee4c2c` (PyTorch orange-red), secondary: `#262626`
- Domain: `poc.terms.kr`

## Security

- No secrets or API keys in this project
- All data is public static JSON
- No user input stored server-side (static site)
