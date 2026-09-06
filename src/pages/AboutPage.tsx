import React from 'react'
import { Typography, Box, Container, Button, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { DATA_TREE_URL, LICENSE_URL, NEW_TERM_URL, REPO_URL } from '../data/const'

export function AboutPage(): React.ReactNode {
  const navigate = useNavigate()

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 0 }}>
        <PageHeader
          eyebrow="소개"
          title="AI/ML 용어를 데이터처럼 다룹니다"
          lead="모든 용어는 JSON 파일로, 모든 합의는 GitHub Issue와 PR 이력으로 남습니다. 사람과 AI 번역 도구 모두가 동일한 한국어 용어를 쓸 수 있도록 표준화하는 오픈소스 프로젝트입니다."
        />

        <ProjectIntro />

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, fontWeight: 600 }}>
            함께 만들어가는 AI/ML 용어 사전
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<MenuBookIcon />}
              onClick={() => navigate('/guide')}
            >
              사용법 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<GitHubIcon />}
              href={REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub에서 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              startIcon={<AddIcon />}
              href={NEW_TERM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              새 용어 요청
            </Button>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

/* ============================================================
   프로젝트 소개
   ============================================================ */
function ProjectIntro(): React.ReactNode {
  return (
    <>
      <Section eyebrow="Why" title="왜 용어집을 데이터로?">
        <P>
          AI/ML 분야는 새로운 용어가 매일같이 쏟아지고, 사람마다 같은 용어를 다르게 번역합니다.
          누군가는 <Em>"attention"</Em>을 <Em>어텐션</Em>으로 적고, 다른 누군가는 <Em>주의</Em>, <Em>주의 메커니즘</Em>, <Em>집중 메커니즘</Em>으로 적습니다.
          이러한 일관성 없는 번역은 문서를 읽는 사람과 번역하는 LLM 모두에게 혼란을 줍니다.
        </P>
        <P>
          AI/ML 용어집은 각 용어를 <Em>JSON 데이터</Em>로 정리하고, 채택 근거와 다의어를 함께 기록합니다.
          데이터는 <code>data/&#123;letter&#125;.json</code>에 모으고, 논의 과정은 <code>Co-authored-by</code>를 담은 Git 커밋과 닫힌 GitHub Issue에 그대로 남깁니다.
        </P>
        <UL
          items={[
            <><code>git log</code>로 누가 <Em>언제 용어를 추가하거나 고쳤는지</Em> 확인</>,
            <><code>git diff</code>로 <Em>어떤 번역이 어떻게 달라졌는지</Em> 한 눈에 비교</>,
            <><code>jq</code>·<code>grep</code>으로 전체 용어 체계에서 <Em>용어, 번역, 동의어</Em>를 검색</>,
            <>누구나 <Em>포크(fork)·복제(clone)·분석</Em>할 수 있는 오픈 데이터 (MIT)</>,
          ]}
        />
      </Section>

      <Section eyebrow="How" title="다의어와 맥락별 번역까지">
        <P>
          한 영어 단어가 분야에 따라 다른 한국어 번역을 갖는 경우는 흔합니다. 예를 들어
          <code>head</code>는 맥락에 따라 "헤드", "어텐션 헤드", "출력층"으로 갈립니다. 그래서 데이터 모델도
          다의어를 기본으로 고려하도록 설계했습니다.
        </P>
        <Pre>{`{
  "term": "head",
  "meanings": [
    {
      "korean": "헤드",
      "definition": "Transformer에서 하나의 어텐션 계산 단위",
      "examples": [{ "en": "multi-head attention", "ko": "다중 헤드 어텐션" }],
      "synonyms": ["어텐션 헤드"]
    },
    {
      "korean": "출력층",
      "definition": "모델의 마지막 분류/회귀 출력 모듈",
      "examples": [{ "en": "classification head", "ko": "분류 출력층" }],
      "synonyms": []
    }
  ],
  "issueNumber": 42,
  "notes": "분야에 따라 의미가 달라지는 대표 다의어"
}`}</Pre>
        <P>
          검색 결과는 대표 번역을 먼저 보여주고, 상세 페이지는 각 의미를 별도 영역으로 나누어 보여줍니다. <code>notes</code>에는
          왜 그 번역을 골랐는지 적어 두어, 후속 기여자가 같은 논의를 다시 하지 않도록 돕습니다.
        </P>
      </Section>

      <Section eyebrow="Data" title="데이터 출처와 형식">
        <P>
          모든 용어는{' '}
          <Link href={DATA_TREE_URL} target="_blank" rel="noopener noreferrer">
            <code>data/</code> 디렉토리
          </Link>{' '}
          아래 알파벳별 JSON 파일에 들어 있습니다. 빌드 과정이 이 파일들을 정적 사이트와 함께{' '}
          <code>terms.kr/data/</code> 경로에 올립니다.
        </P>
        <UL
          items={[
            <>
              <Link href="https://terms.kr/data/index.json" target="_blank" rel="noopener noreferrer">
                <code>/data/index.json</code>
              </Link>
              : 수록한 알파벳 파일 목록
            </>,
            <>
              <Link href="https://terms.kr/data/a.json" target="_blank" rel="noopener noreferrer">
                <code>/data/&#123;a-z&#125;.json</code>
              </Link>
              : 알파벳별 용어 배열 (병렬 fetch)
            </>,
            <>
              <Link href="https://terms.kr/llms.txt" target="_blank" rel="noopener noreferrer">
                <code>/llms.txt</code>
              </Link>
              : <Link href="https://llmstxt.org/" target="_blank" rel="noopener noreferrer">llmstxt.org</Link> 표준 LLM 안내 파일
            </>,
          ]}
        />
        <P>
          현재 수록한 용어는 AI가 만든 초안이며, 커뮤니티가 검토하고 승인하면서 점차 다듬어 갑니다.
          관리자가 이슈에 <code>/approve</code> 댓글을 남기거나 <code>approved</code> 라벨을 붙이면 자동화 워크플로우가{' '}
          <code>Co-authored-by</code>를 담아 커밋합니다.
        </P>
      </Section>

      <Section eyebrow="Stack" title="기술 스택">
        <UL
          items={[
            <><Em>데이터</Em>: Markdown × JSON, 알파벳별 파일 분할, 다의어 배열 구조</>,
            <><Em>웹</Em>: React 19 + TypeScript + Vite + MUI v7, GitHub Pages 정적 배포</>,
            <><Em>자동화</Em>: GitHub Actions로 이슈 → 데이터 반영, JSON 유효성 검증, 배포</>,
            <><Em>디자인</Em>: PyTorch Korea Design System (오렌지 #EE4C2C, 평면·편집형)</>,
          ]}
        />
      </Section>

      <Section eyebrow="License" title="라이선스">
        <P>
          <Em>코드</Em>:{' '}
          <Link href={LICENSE_URL} target="_blank" rel="noopener noreferrer">
            MIT License
          </Link>
          . 누구나 자유롭게 사용·수정·재배포할 수 있습니다.
        </P>
        <P>
          <Em>용어 데이터</Em>: 동일하게 MIT 하에 공개합니다. 인용·번역·RAG 데이터셋 등 어떤 용도로도
          자유롭게 활용 가능합니다. 출처를 표기해 주시면 감사하겠습니다.
        </P>
      </Section>
    </>
  )
}

/* ============================================================
   Shared editorial primitives
   ============================================================ */

function PageHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead: string
}): React.ReactNode {
  return (
    <Box sx={{ mb: 4 }}>
      <Box
        sx={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--ptk-orange)',
          mb: 1.5,
        }}
      >
        {eyebrow}
      </Box>
      <Typography
        component="h1"
        sx={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 300,
          fontSize: 'clamp(34px, 5vw, 52px)',
          lineHeight: 1.08,
          letterSpacing: '-0.025em',
          color: 'var(--fg-1)',
          mb: 2.5,
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: 16, md: 18 },
          lineHeight: 1.65,
          color: 'var(--fg-2)',
          width: '100%',
        }}
      >
        {lead}
      </Typography>
    </Box>
  )
}

function Section({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children: React.ReactNode
}): React.ReactNode {
  return (
    <Box component="section" sx={{ mt: 6, mb: 6 }}>
      <Box sx={{ mb: 3, pb: 1.5, borderBottom: '2px solid var(--fg-1)' }}>
        <Box
          sx={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--ptk-orange)',
            mb: 0.75,
          }}
        >
          {eyebrow}
        </Box>
        <Typography
          component="h2"
          sx={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: { xs: 24, md: 32 },
            letterSpacing: '-0.015em',
            color: 'var(--fg-1)',
            lineHeight: 1.1,
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box sx={{ '& > * + *': { mt: 2 } }}>{children}</Box>
    </Box>
  )
}

function P({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <Typography component="p" sx={{ my: 0.75, fontSize: 16, lineHeight: 1.75, color: 'var(--fg-1)' }}>
      {children}
    </Typography>
  )
}

function Em({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Box component="strong" sx={{ fontWeight: 700, color: 'var(--fg-1)' }}>{children}</Box>
}

function UL({ items }: { items: React.ReactNode[] }): React.ReactNode {
  return (
    <Box
      component="ul"
      sx={{
        m: 0,
        pl: 0,
        listStyle: 'none',
        display: 'grid',
        rowGap: 1.25,
      }}
    >
      {items.map((it, i) => (
        <Box
          key={i}
          component="li"
          sx={{
            display: 'grid',
            gridTemplateColumns: '20px minmax(0, 1fr)',
            columnGap: 0.5,
            fontSize: 15,
            lineHeight: 1.7,
            color: 'var(--fg-1)',
            '& code': {
              display: 'inline-flex',
              alignItems: 'center',
              lineHeight: 1,
              py: '1px',
              verticalAlign: 'baseline',
            },
            '& a': {
              lineHeight: 'inherit',
            },
          }}
        >
          <Box
            component="span"
            aria-hidden="true"
            sx={{
              color: 'var(--ptk-orange)',
              fontFamily: 'var(--ff-mono)',
              fontWeight: 700,
              lineHeight: 'inherit',
            }}
          >
            —
          </Box>
          <Box component="span" sx={{ minWidth: 0, lineHeight: 'inherit' }}>
            {it}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

function Pre({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <Box
      component="pre"
      sx={{
        bgcolor: 'var(--ptk-ink-strong)',
        color: '#f8f8f2',
        p: 2.5,
        m: 0,
        fontFamily: 'var(--ff-mono)',
        fontSize: 13,
        lineHeight: 1.55,
        overflow: 'auto',
        borderRadius: 0,
      }}
    >
      <Box component="code" sx={{ bgcolor: 'transparent', color: 'inherit', p: 0, border: 0 }}>
        {children}
      </Box>
    </Box>
  )
}
