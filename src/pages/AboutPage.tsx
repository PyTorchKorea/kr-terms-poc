import React, { useState } from 'react'
import { Typography, Box, Container, Button, Link, Tabs, Tab } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import AddIcon from '@mui/icons-material/Add'
import MenuBookIcon from '@mui/icons-material/MenuBook'
import { useNavigate } from 'react-router-dom'
import LinkedInIcon from '@mui/icons-material/LinkedIn'
import LanguageIcon from '@mui/icons-material/Language'
import FacebookIcon from '@mui/icons-material/Facebook'
import TwitterIcon from '@mui/icons-material/Twitter'
import { Layout } from '../components/Layout'
import {
  MAINTAINERS,
  ORGANIZATIONS,
  type Member,
  type Organization,
  type MemberLinks,
} from '../data/members'

const REPO_URL = 'https://github.com/PyTorchKorea/kr-terms-poc'
const NEW_TERM_URL = `${REPO_URL}/issues/new?template=new-term.yml`

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps): React.ReactNode {
  if (value !== index) return null
  return <Box sx={{ py: 4 }}>{children}</Box>
}

export function AboutPage(): React.ReactNode {
  const navigate = useNavigate()
  const [tab, setTab] = useState(0)

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <PageHeader
          eyebrow="소개"
          title="AI/ML 용어를 데이터처럼 다룹니다"
          lead="모든 용어는 JSON 파일, 모든 합의는 GitHub Issue·PR 이력으로 남습니다. 사람과 AI 번역 도구 모두가 동일한 한국어 용어를 쓸 수 있도록 표준화하는 오픈소스 프로젝트입니다."
        />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            <Tab label="프로젝트 소개" />
            <Tab label="운영 및 기여 조직" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}><ProjectIntro /></TabPanel>
        <TabPanel value={tab} index={1}><OrgSection /></TabPanel>

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
          모든 용어는{' '}
          <Link href={`${REPO_URL}/tree/poc/data`} target="_blank" rel="noopener noreferrer">
            <code>data/</code> 디렉토리
          </Link>{' '}
          아래 알파벳별 JSON 파일에 들어 있습니다. 빌드 과정이 이 파일들을 정적 사이트와 함께{' '}
          <code>poc.terms.kr/data/</code> 경로에 올립니다.
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
            <><Em>자동화</Em>: GitHub Actions로 이슈 → 데이터 반영, JSON 유효성 검증, 배포</>,
            <><Em>디자인</Em>: PyTorch Korea Design System (오렌지 #EE4C2C, 평면·편집형)</>,
          ]}
        />
      </Section>

      <Section eyebrow="License" title="라이선스">
        <P>
          <Em>코드</Em>:{' '}
          <Link href={`${REPO_URL}/blob/poc/LICENSE`} target="_blank" rel="noopener noreferrer">
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
   운영 및 기여 조직
   ============================================================ */
function OrgSection(): React.ReactNode {
  return (
    <>
      <Section eyebrow="Operator" title="저장소 운영">
        <P>
          본 저장소는 <Em>파이토치 한국 사용자 모임(PyTorchKR)</Em> 산하에서 운영합니다. 아래 관리자들이
          이슈 검토와 용어 승인을 담당하며, 자동화 워크플로우가 변경 사항을 데이터 파일에 반영합니다.
          명단은 <code>_members/</code> 디렉토리의 마크다운 파일을 단일 진실 공급원으로 삼고, 페이지는
          빌드 시점에 그대로 카드로 옮깁니다.
        </P>
      </Section>

      <Section eyebrow="Maintainers" title="용어집 관리자">
        <MemberGrid members={MAINTAINERS} />
      </Section>

      <Section eyebrow="Organizations" title="참여 조직">
        <P>
          본 용어집을 함께 활용하거나 데이터·도메인 지식을 보태는 한국 AI 커뮤니티입니다. 새 조직 참여
          제안은 <Em>아래</Em> 기여·참여 안내를 따라 주세요.
        </P>
        <OrgGrid orgs={ORGANIZATIONS} />
      </Section>

      <Section eyebrow="Join" title="기여·참여 방법">
        <P>
          개인 기여자는 GitHub Issue 또는 Pull Request로 바로 참여하실 수 있습니다. 절차는
          {' '}<Link component="a" href="#/guide">사용법 페이지</Link>의 “기여 가이드” 탭에서 단계별로
          정리해 두었습니다.
        </P>
        <UL
          items={[
            <>
              <Em>이슈로 기여</Em>:{' '}
              <Link href={NEW_TERM_URL} target="_blank" rel="noopener noreferrer">
                새 용어 요청
              </Link>{' '}
              또는{' '}
              <Link href={`${REPO_URL}/issues/new?template=term-feedback.yml`} target="_blank" rel="noopener noreferrer">
                번역 개선 제안
              </Link>{' '}
              템플릿을 사용합니다.
            </>,
            <>
              <Em>Pull Request로 기여</Em>:{' '}
              <Link href={`${REPO_URL}/tree/poc/data`} target="_blank" rel="noopener noreferrer">
                <code>data/</code> 디렉토리
              </Link>
              의 JSON을 직접 수정합니다.
            </>,
          ]}
        />

        <Box
          sx={{
            mt: 3,
            p: 2.5,
            border: '1px dashed var(--ptk-line)',
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--fg-2)',
          }}
        >
          <Box component="span" sx={{ fontWeight: 700, color: 'var(--fg-1)' }}>
            조직·기관 참여 안내:
          </Box>{' '}
          본 용어집을 활용하거나, 자체 도메인의 용어를 함께 추가하고 싶으신 기관·연구실·기업은{' '}
          <Link href={`${REPO_URL}/issues/new`} target="_blank" rel="noopener noreferrer">
            GitHub Issue
          </Link>
          로 문의해 주세요.
        </Box>
      </Section>
    </>
  )
}

/* ============================================================
   Member / Organization cards
   ============================================================ */

function MemberGrid({ members }: { members: Member[] }): React.ReactNode {
  if (members.length === 0) return null
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)',
          sm: 'repeat(3, 1fr)',
          md: 'repeat(4, 1fr)',
        },
        gap: 2,
      }}
    >
      {members.map((m) => (
        <PersonCard key={m.id} member={m} />
      ))}
    </Box>
  )
}

function PersonCard({ member }: { member: Member }): React.ReactNode {
  const avatar = `https://github.com/${member.id}.png?size=160`
  const isLead = /lead/i.test(member.title)
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid var(--ptk-line-soft)',
        borderTop: isLead ? '3px solid var(--ptk-orange)' : '1px solid var(--ptk-line-soft)',
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'border-color 120ms ease',
        '&:hover': { borderColor: 'var(--fg-1)' },
      }}
    >
      <Box
        component="img"
        src={avatar}
        alt={member.name}
        loading="lazy"
        sx={{
          width: 72,
          height: 72,
          borderRadius: '50%',
          mb: 1.5,
          bgcolor: 'var(--bg-2)',
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          fontFamily: 'var(--ff-display)',
          fontWeight: 700,
          fontSize: 15,
          color: 'var(--fg-1)',
          lineHeight: 1.2,
          mb: 0.25,
        }}
      >
        {member.name}
      </Box>
      <Box
        sx={{
          fontFamily: 'var(--ff-mono)',
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isLead ? 'var(--ptk-orange)' : 'var(--fg-3)',
          mb: 0.5,
        }}
      >
        {member.title}
      </Box>
      {member.team && (
        <Box
          sx={{
            fontSize: 12,
            color: 'var(--fg-2)',
            mb: 1.25,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '100%',
          }}
          title={`팀: ${member.team}`}
        >
          {member.team}
        </Box>
      )}
      <SocialRow links={member.links} />
    </Box>
  )
}

function OrgGrid({ orgs }: { orgs: Organization[] }): React.ReactNode {
  if (orgs.length === 0) return null
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
        gap: 2,
        mt: 1,
      }}
    >
      {orgs.map((o) => (
        <OrgCard key={o.id} org={o} />
      ))}
    </Box>
  )
}

function OrgCard({ org }: { org: Organization }): React.ReactNode {
  const avatar = `https://github.com/${org.id}.png?size=160`
  const primary = org.links.homepage || org.links.github
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        border: '1px solid var(--ptk-line-soft)',
        p: 2.25,
        display: 'flex',
        gap: 2,
        alignItems: 'flex-start',
        transition: 'border-color 120ms ease',
        '&:hover': { borderColor: 'var(--fg-1)' },
      }}
    >
      <Box
        component={primary ? 'a' : 'div'}
        href={primary}
        target={primary ? '_blank' : undefined}
        rel={primary ? 'noopener noreferrer' : undefined}
        sx={{ flexShrink: 0, display: 'block' }}
      >
        <Box
          component="img"
          src={avatar}
          alt={org.name}
          loading="lazy"
          sx={{
            width: 56,
            height: 56,
            bgcolor: 'var(--bg-2)',
            border: '1px solid var(--ptk-line-soft)',
            objectFit: 'cover',
          }}
        />
      </Box>
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <Box
          sx={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: 16,
            color: 'var(--fg-1)',
            letterSpacing: '-0.005em',
            mb: 0.25,
          }}
        >
          {primary ? (
            <Link href={primary} target="_blank" rel="noopener noreferrer" underline="none" sx={{ color: 'inherit' }}>
              {org.name}
            </Link>
          ) : (
            org.name
          )}
        </Box>
        {org.title && org.title !== org.name && (
          <Box
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.06em',
              color: 'var(--fg-3)',
              textTransform: 'uppercase',
              mb: 0.5,
            }}
          >
            {org.title}
          </Box>
        )}
        {org.description && (
          <Box sx={{ fontSize: 13, color: 'var(--fg-2)', lineHeight: 1.55, mb: 1 }}>
            {org.description}
          </Box>
        )}
        <SocialRow links={org.links} />
      </Box>
    </Box>
  )
}

function SocialRow({ links }: { links: MemberLinks }): React.ReactNode {
  const entries: Array<{ href: string; label: string; icon: React.ReactNode }> = []
  if (links.github) entries.push({ href: links.github, label: 'GitHub', icon: <GitHubIcon sx={{ fontSize: 16 }} /> })
  if (links.linkedin) entries.push({ href: links.linkedin, label: 'LinkedIn', icon: <LinkedInIcon sx={{ fontSize: 16 }} /> })
  if (links.twitter) entries.push({ href: links.twitter, label: 'Twitter', icon: <TwitterIcon sx={{ fontSize: 16 }} /> })
  if (links.facebook) entries.push({ href: links.facebook, label: 'Facebook', icon: <FacebookIcon sx={{ fontSize: 16 }} /> })
  if (links.homepage) entries.push({ href: links.homepage, label: 'Homepage', icon: <LanguageIcon sx={{ fontSize: 16 }} /> })
  if (entries.length === 0) return null
  return (
    <Box sx={{ display: 'flex', gap: 0.5, mt: 'auto', flexWrap: 'wrap' }}>
      {entries.map((e) => (
        <Box
          key={e.href}
          component="a"
          href={e.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={e.label}
          sx={{
            display: 'inline-grid',
            placeItems: 'center',
            width: 28,
            height: 28,
            color: 'var(--fg-3)',
            border: '1px solid var(--ptk-line-soft)',
            transition: 'color 120ms ease, border-color 120ms ease',
            '&:hover': { color: 'var(--ptk-orange)', borderColor: 'var(--ptk-orange)' },
          }}
        >
          {e.icon}
        </Box>
      ))}
    </Box>
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
      <Box component="code" sx={{ bgcolor: 'transparent', color: 'inherit', p: 0, border: 0 }}>
        {children}
      </Box>
    </Box>
  )
}
