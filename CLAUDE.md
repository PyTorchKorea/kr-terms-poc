# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Context

AI/ML 용어집 - 빠르게 변화하는 AI/ML 분야의 용어를 표준화하여 사람과 AI 번역 도구 모두가 일관된 한국어 번역을 사용할 수 있도록 하는 오픈소스 프로젝트. 파이토치 한국 사용자 모임(PyTorchKR) 운영. 현재 PoC 단계이며, 수록된 용어 데이터는 AI 생성 초안.

**Repository**: `PyTorchKorea/kr-terms-poc` (branch: `poc`)

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

**Stack**: React 19 + TypeScript + Vite + MUI v7, deployed to GitHub Pages (`poc.terms.kr`).

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

`.github/workflows/deploy.yml`: On push to `poc`, validates term data → builds → deploys to GitHub Pages. The validation step checks all JSON files for required fields, domain spacing, and TermExample structure.

## LLM Integration

- `public/llms.txt`: [llmstxt.org](https://llmstxt.org/) 표준에 따른 LLM용 안내 파일. 프로젝트 개요, 전체 데이터 파일 링크, 데이터 구조 설명 포함. 배포 시 `poc.terms.kr/llms.txt`로 접근 가능.
- JSON 데이터는 `poc.terms.kr/data/index.json`에서 파일 목록 조회, 각 알파벳별 파일로 직접 접근 가능.

## Branding

- Project name: "AI/ML 용어집"
- Organization: "파이토치 한국 사용자 모임" (full) / "PyTorchKR" (short)
- Theme primary: `#ee4c2c` (PyTorch orange-red), secondary: `#262626`
- Domain: `poc.terms.kr`
