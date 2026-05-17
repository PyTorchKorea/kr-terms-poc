# AI/ML 용어집 (terms.kr)

AI/ML 용어의 한국어 번역을 표준화하는 오픈소스 용어집입니다. 파이토치 한국 사용자 모임(PyTorchKR)에서 운영합니다.

> **PoC (Proof of Concept)**: 이 프로젝트는 현재 PoC 단계입니다. 용어 데이터의 구조와 워크플로우를 검증하고, 커뮤니티의 피드백을 반영하여 개선해 나가는 중입니다. 현재 수록된 용어 데이터는 모두 AI가 생성한 초안이며, 커뮤니티 검토를 거쳐 정확도를 높여갈 예정입니다.

🌐 **사이트**: [https://poc.terms.kr](https://poc.terms.kr)

- **소개**: [https://poc.terms.kr/#/about](https://poc.terms.kr/#/about)
- **사용법**: [https://poc.terms.kr/#/guide](https://poc.terms.kr/#/guide)
- **운영 및 기여 조직**: [https://poc.terms.kr/#/organizations](https://poc.terms.kr/#/organizations)

## 왜 AI/ML 용어집인가?

번역은 생성형 AI 모델을 사용하여 자동화할 수 있지만, 이러한 번역 시에도 **일관된 용어를 사용하는 것은 매우 중요합니다.** AI/ML 용어집은 빠르게 변화하는 AI/ML 분야의 다양한 용어들을 표준화하고, 이를 공개하여 누구나 사용할 수 있도록 하는 것을 목표로 하고 있습니다.

## 프로젝트 목적

개발자뿐 아니라 연구자, 번역가, 학생 등 **누구나** GitHub를 통해 AI/ML 용어의 한국어 번역을 제안하고 검토할 수 있는 열린 프로젝트입니다.

- 동일한 용어가 여러 맥락에서 다른 의미로 사용될 때, 각각의 정의를 명확히 구분하여 제공합니다.
- 코드를 몰라도 [GitHub Issue](https://github.com/PyTorchKorea/kr-terms-poc/issues)를 통해 새로운 용어 추가, 번역 개선, 오류 수정 등을 제안할 수 있습니다.

## LLM / AI 번역 도구 연동

이 용어집은 사람뿐 아니라 AI 도구에서도 활용할 수 있도록 기계 판독 가능한 형식을 제공합니다:

- **[llms.txt](https://poc.terms.kr/llms.txt)**: [llmstxt.org](https://llmstxt.org/) 표준에 따른 LLM용 프로젝트 안내 파일
- **[AGENTS.md](AGENTS.md)**: [agents.md](https://agents.md/) 표준에 따른 AI 코딩 에이전트용 프로젝트 가이드
- **[JSON 데이터](https://poc.terms.kr/data/)**: 알파벳별 JSON 파일로 전체 용어 데이터에 접근 가능 (`data/index.json`에서 파일 목록 조회)

AI 번역 시 이 용어집을 컨텍스트로 제공하면, 일관된 한국어 번역을 유지하는 데 도움이 됩니다.

## 피드백 및 제안

수정이 필요한 사항이나 새로운 용어 제안은 GitHub Issue에서 받고 있습니다:

- [새 용어 요청](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml)
- [용어 피드백 (번역 개선 등)](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=term-feedback.yml)
- [조직 참여 신청](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=organization-join.yml)

## 주요 기능

- 🔍 **빠른 검색**: 영문 용어, 한국어 번역, 동의어로 용어를 검색할 수 있습니다
- 📚 **다의어 지원**: 하나의 용어가 여러 맥락에서 다른 의미로 사용될 때 모든 의미를 표시합니다
- 🔤 **알파벳 탐색**: A-Z 알파벳별로 용어를 탐색할 수 있습니다
- 🤖 **LLM 연동**: llms.txt 및 JSON API를 통해 AI 번역 도구에서 활용 가능합니다
- 🧭 **사용법 안내**: 브라우저 사용, JSON 데이터 조회, 기여 및 운영 워크플로우를 한 곳에서 확인할 수 있습니다
- 🤝 **운영 및 기여 조직**: 관리자와 참여 조직을 별도 페이지에서 확인할 수 있으며, 참여 조직 카드는 조회 시마다 무작위 순서로 표시됩니다

## 데이터와 변경 이력

- 용어 데이터는 `data/{letter}.json`에 알파벳별 JSON 배열로 저장하고, `data/index.json`에서 수록 파일 목록을 관리합니다.
- `npm run dev`와 `npm run build` 실행 전 `scripts/sync-public-data.mjs`가 `data/`를 `public/data/`로 복사합니다. 배포 후에는 `https://poc.terms.kr/data/index.json` 및 각 알파벳 JSON으로 접근할 수 있습니다.
- 새 용어와 번역 피드백은 GitHub Issue 템플릿으로 받고, 승인된 변경은 `issueNumber`와 Git 커밋 이력으로 추적합니다.
- 용어 추가, 번역 변경, 정의 수정은 모두 JSON diff로 남기 때문에 `git diff`, Pull Request diff, GitHub Issue 링크를 통해 용어의 변천사를 확인할 수 있습니다.

## 운영 및 참여 조직

- 관리자와 참여 조직 정보는 `_members/` 아래 Markdown frontmatter로 관리합니다.
- 참여 조직은 `src/pages/OrganizationsPage.tsx`의 운영 및 기여 조직 페이지에서 표시됩니다.
- 조직 데이터는 홈페이지, GitHub, Hugging Face, SNS 링크를 지원하며, `image` 필드가 있으면 카드 썸네일로 우선 사용합니다.
- Hugging Face 조직은 조직 페이지에서 가져올 수 있는 썸네일을 사용할 수 있으며, Hugging Face KREW처럼 전용 이미지 URL을 지정할 수 있습니다.
- 새 조직은 [조직 참여 신청 이슈](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=organization-join.yml)로 참여 의사를 남길 수 있습니다.

## 기술 스택

- **React 19**: React 기반 프론트엔드
- **MUI v7**: Material-UI 컴포넌트 라이브러리
- **React Router 7**: HashRouter 기반 정적 SPA 라우팅
- **TypeScript 5.9**: 타입 안정성을 위한 TypeScript
- **Vite 7**: 빠른 개발 환경과 빌드
- **GitHub Pages**: 무료 정적 사이트 호스팅
- **Node.js 22.12+ / npm 11.12.1**: 로컬 개발 및 빌드 환경

## 유지보수 참고

- 공통 URL과 연락처 값은 `src/data/const.ts`에서 관리합니다. 예: `REPO_URL`, `NEW_TERM_URL`, `FEEDBACK_URL`, `ORGANIZATION_JOIN_URL`, `CONTACT_EMAIL`.
- 프로젝트 전용 GitHub 라벨은 `.github/labels.yml`에 정의되어 있습니다. 워크플로우는 `새 용어 요청`, `용어 피드백`, `조직 참여`, `approved`, `commit-ready` 라벨을 사용합니다.
- 의존성 보안 점검은 `npm run audit:security`로 실행합니다. GitHub Pages 배포 워크플로우도 같은 명령으로 moderate 이상 취약점과 npm 서명을 확인합니다.
- 화면에서 문단과 인라인 코드가 함께 표시될 때 줄 간격이 흔들리지 않도록 공통 스타일을 `src/styles/design-tokens.css`에서 조정합니다.
- 정적 사이트이므로 서버 저장소나 비공개 API 없이 공개 JSON과 GitHub 이력만으로 동작합니다.

## 로컬 개발 방법

Node.js `22.12.0` 이상과 npm `11.12.1` 기준입니다.

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (실행 전 data/를 public/data/로 복사)
npm run dev

# 린트
npm run lint

# 프로덕션 빌드 (실행 전 data/를 public/data/로 복사)
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 기여 방법

용어를 추가하거나 수정하고 싶으신가요? [기여 가이드](CONTRIBUTING.md)를 참고해주세요!

## 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
