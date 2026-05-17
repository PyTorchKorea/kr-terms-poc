import React from 'react'
import { Typography, Box, Container, Button, Link } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useNavigate } from 'react-router-dom'
import { Layout } from '../components/Layout'
import { PARTNER_ORGS } from '../data/members'

const REPO_URL = 'https://github.com/PyTorchKorea/kr-terms-poc'
const NEW_TERM_URL = `${REPO_URL}/issues/new?template=new-term.yml`

export function AboutPage(): React.ReactNode {
  const navigate = useNavigate()

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <PageHeader
          eyebrow="소개"
          title="AI/ML 용어를 데이터처럼 다룹니다"
          lead="모든 용어는 JSON 파일, 모든 합의는 GitHub Issue·PR 이력으로 남습니다. 사람과 AI 번역 도구 모두가 동일한 한국어 용어를 쓸 수 있도록 표준화하는 오픈소스 프로젝트입니다."
        />

        <Section eyebrow="Why" title="왜 용어집을 데이터로?">
          <P>
            AI/ML 분야는 새로운 용어가 매일같이 쏟아지고, 사람마다 같은 용어를 다르게 번역합니다.
            누군가는 <Em>"attention"</Em>을 <Em>어텐션</Em>으로 적고, 다른 누군가는 <Em>주의</Em>·<Em>주의 메커니즘</Em>·
            <Em>집중 메커니즘</Em>으로 적습니다. <Em>"embedding"</Em>도 마찬가지로 <Em>임베딩</Em>·<Em>매장</Em>·<Em>매장값</Em>으로
            갈립니다. 이런 분기(分岐)는 문서를 읽는 사람과 번역하는 LLM 모두에게 부담을 줍니다.
          </P>
          <P>
            본 프로젝트는 각 용어를 <Em>JSON 한 줄</Em>로 표준화하고, 채택 근거와 다의어를 함께 기록합니다.
            데이터는 <code>data/&#123;letter&#125;.json</code>에 모으고, 합의 과정은{' '}
            <code>Co-authored-by</code>를 담은 Git 커밋과 닫힌 GitHub Issue에 그대로 남깁니다.
          </P>
          <UL
            items={[
              <><code>git log</code>로 누가 <Em>언제 용어를 추가하거나 고쳤는지</Em> 확인</>,
              <><code>git diff</code>로 <Em>어떤 번역이 어떻게 달라졌는지</Em> 한눈에 비교</>,
              <><code>jq</code>·<code>grep</code>으로 전체 용어 체계에서 <Em>키워드와 분야</Em>를 검색</>,
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
            검색 결과와 상세 페이지는 각 의미를 별도 카드로 나누어 보여줍니다. <code>notes</code>에는
            왜 그 번역을 골랐는지 적어 두어, 후속 기여자가 같은 논의를 다시 하지 않도록 돕습니다.
          </P>
        </Section>

        <Section eyebrow="Data" title="데이터 출처와 형식">
          <P>
            모든 용어는 <Link href={`${REPO_URL}/tree/poc/data`} target="_blank" rel="noopener noreferrer">
              <code>data/</code> 디렉토리</Link> 아래 알파벳별 JSON 파일에 들어 있습니다. 빌드 과정이 이
            파일들을 정적 사이트와 함께 <code>poc.terms.kr/data/</code> 경로에 올립니다.
          </P>
          <UL
            items={[
              <>
                <Link href="https://poc.terms.kr/data/index.json" target="_blank" rel="noopener noreferrer">
                  <code>/data/index.json</code>
                </Link>
                : 수록한 알파벳 파일 목록
              </>,
              <>
                <Link href="https://poc.terms.kr/data/a.json" target="_blank" rel="noopener noreferrer">
                  <code>/data/&#123;a-z&#125;.json</code>
                </Link>
                : 알파벳별 용어 배열 (병렬 fetch)
              </>,
              <>
                <Link href="https://poc.terms.kr/llms.txt" target="_blank" rel="noopener noreferrer">
                  <code>/llms.txt</code>
                </Link>
                : <Link href="https://llmstxt.org/" target="_blank" rel="noopener noreferrer">llmstxt.org</Link> 표준 LLM 안내 파일
              </>,
            ]}
          />
          <P>
            현재 수록한 용어는 AI가 만든 초안이며, 커뮤니티가 검토하고 승인하면서 점차 다듬어 갑니다.
            관리자가 이슈에 <code>/approve</code> 댓글을 남기면 자동화 워크플로우가{' '}
            <code>Co-authored-by</code>를 담아 커밋합니다.
          </P>
        </Section>

        <Section eyebrow="Stack" title="기술 스택">
          <UL
            items={[
              <><Em>데이터</Em>: Markdown × JSON, 알파벳별 파일 분할, 다의어 배열 구조</>,
              <><Em>웹</Em>: React 19 + TypeScript + Vite + MUI v7, GitHub Pages 정적 배포</>,
              <><Em>자동화</Em>: GitHub Actions — 이슈 → 데이터 반영, JSON 유효성 검증, 배포</>,
              <><Em>디자인</Em>: PyTorch Korea Design System (오렌지 #EE4C2C, 평면·편집형)</>,
            ]}
          />
        </Section>

        <Section eyebrow="Org" title="운영 및 기여 조직">
          <P>
            <Em>파이토치 한국 사용자 모임(PyTorchKR)</Em>이 본 저장소를 운영합니다. 관리자 명단과 활동 이력은
            GitHub Organization 페이지에서 직접 확인하실 수 있습니다 — 본 페이지에 따로 명단을 박제하지
            않습니다.
          </P>

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
              gap: 1.5,
              mt: 2,
            }}
          >
            {PARTNER_ORGS.map((org) => (
              <Box
                key={org.href}
                component="a"
                href={org.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: 'block',
                  textDecoration: 'none',
                  p: 2.25,
                  bgcolor: '#fff',
                  border: '1px solid var(--ptk-line-soft)',
                  transition: 'border-color 120ms ease',
                  '&:hover': { borderColor: 'var(--fg-1)' },
                }}
              >
                <Box
                  sx={{
                    fontFamily: 'var(--ff-display)',
                    fontWeight: 700,
                    fontSize: 16,
                    color: 'var(--fg-1)',
                    mb: 0.5,
                    letterSpacing: '-0.005em',
                  }}
                >
                  {org.name}
                </Box>
                <Box sx={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.5, mb: 1 }}>
                  {org.description}
                </Box>
                <Box
                  sx={{
                    fontFamily: 'var(--ff-mono)',
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    color: 'var(--ptk-orange)',
                  }}
                >
                  {org.href.replace(/^https?:\/\//, '')} →
                </Box>
              </Box>
            ))}
          </Box>

          <Box
            sx={{
              mt: 2.5,
              p: 2.25,
              border: '1px dashed var(--ptk-line)',
              fontSize: 13,
              lineHeight: 1.6,
              color: 'var(--fg-2)',
            }}
          >
            <Box component="span" sx={{ fontWeight: 700, color: 'var(--fg-1)' }}>
              조직·기관 참여 안내:
            </Box>{' '}
            본 용어집을 활용하거나 자체 도메인의 용어를 추가하고 싶으신 기관·연구실·기업은{' '}
            <Link href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer">
              GitHub Issue
            </Link>
            로 문의해 주세요.
          </Box>
        </Section>

        <Section eyebrow="License" title="라이선스">
          <P>
            <Em>코드</Em>: <Link href={`${REPO_URL}/blob/poc/LICENSE`} target="_blank" rel="noopener noreferrer">MIT License</Link>.
            누구나 자유롭게 사용, 수정, 재배포할 수 있습니다.
          </P>
          <P>
            <Em>용어 데이터</Em>: 동일하게 MIT 하에 공개됩니다. 인용·번역·RAG 데이터셋 등 어떤 용도로도
            자유롭게 활용 가능합니다. 출처를 표기해 주시면 감사하겠습니다.
          </P>
        </Section>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
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

/* ---------- Section primitives (editorial layout) ---------- */

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
    <Box sx={{ mb: 7 }}>
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
    <Typography component="p" sx={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-1)' }}>
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
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
      }}
    >
      {items.map((it, i) => (
        <Box
          key={i}
          component="li"
          sx={{
            position: 'relative',
            pl: 2.5,
            fontSize: 15,
            lineHeight: 1.65,
            color: 'var(--fg-1)',
            '&::before': {
              content: '"—"',
              position: 'absolute',
              left: 0,
              top: 0,
              color: 'var(--ptk-orange)',
              fontFamily: 'var(--ff-mono)',
              fontWeight: 700,
            },
          }}
        >
          {it}
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
      <Box component="code" sx={{ bgcolor: 'transparent', color: 'inherit', p: 0 }}>
        {children}
      </Box>
    </Box>
  )
}
