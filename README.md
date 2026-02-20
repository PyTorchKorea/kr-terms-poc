# AI/ML 용어집 (terms.kr)

AI/ML 용어의 한국어 번역을 표준화하는 오픈소스 용어집입니다. 파이토치 한국 사용자 모임(PyTorchKR)에서 운영합니다.

> **PoC (Proof of Concept)**: 이 프로젝트는 현재 PoC 단계입니다. 용어 데이터의 구조와 워크플로우를 검증하고, 커뮤니티의 피드백을 반영하여 개선해 나가는 중입니다. 현재 수록된 용어 데이터는 모두 AI가 생성한 초안이며, 커뮤니티 검토를 거쳐 정확도를 높여갈 예정입니다.

🌐 **사이트**: [https://poc.terms.kr](https://poc.terms.kr)

## 프로젝트 목적

개발자뿐 아니라 연구자, 번역가, 학생 등 **누구나** GitHub를 통해 AI/ML 용어의 한국어 번역을 제안하고 검토할 수 있는 열린 프로젝트입니다.

- 동일한 용어가 여러 도메인에서 다른 의미로 사용될 때, 각각의 정의를 명확히 구분하여 제공합니다.
- 코드를 몰라도 [GitHub Issue](https://github.com/PyTorchKorea/kr-terms-poc/issues)를 통해 새로운 용어 추가, 번역 개선, 오류 수정 등을 제안할 수 있습니다.

## 피드백 및 제안

수정이 필요한 사항이나 새로운 용어 제안은 GitHub Issue에서 받고 있습니다:

- [새 용어 요청](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml)
- [용어 피드백 (번역 개선, 오류 수정 등)](https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=term-feedback.yml)

## 주요 기능

- 🔍 **빠른 검색**: 영문 또는 한국어로 용어를 검색할 수 있습니다
- 📚 **다의어 지원**: 하나의 용어가 여러 도메인에서 다른 의미로 사용될 때 모든 의미를 표시합니다
- 🔤 **알파벳 탐색**: A-Z 알파벳별로 용어를 탐색할 수 있습니다
- 🎨 **반응형 UI**: 모바일과 데스크톱 모두에서 사용하기 편리합니다

## 기술 스택

- **React 19**: 최신 React로 구현된 프론트엔드
- **MUI v7**: Material-UI 컴포넌트 라이브러리
- **TypeScript**: 타입 안정성을 위한 TypeScript
- **Vite**: 빠른 개발 환경과 빌드
- **GitHub Pages**: 무료 정적 사이트 호스팅

## 로컬 개발 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행 (http://localhost:5173)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 기여 방법

용어를 추가하거나 수정하고 싶으신가요? [기여 가이드](CONTRIBUTING.md)를 참고해주세요!

## 라이센스

MIT License - 자세한 내용은 [LICENSE](LICENSE) 파일을 참고하세요.
