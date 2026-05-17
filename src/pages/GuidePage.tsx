import React, { useState } from 'react'
import { Typography, Box, Container, Button, Tabs, Tab, Link } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import FeedbackIcon from '@mui/icons-material/Feedback'
import { Layout } from '../components/Layout'

const REPO_URL = 'https://github.com/PyTorchKorea/kr-terms-poc'
const NEW_TERM_URL = `${REPO_URL}/issues/new?template=new-term.yml`
const FEEDBACK_URL = `${REPO_URL}/issues/new?template=term-feedback.yml`

interface TabPanelProps {
  children: React.ReactNode
  index: number
  value: number
}

function TabPanel({ children, value, index }: TabPanelProps): React.ReactNode {
  if (value !== index) return null
  return <Box sx={{ py: 4 }}>{children}</Box>
}

export function GuidePage(): React.ReactNode {
  const [tab, setTab] = useState(0)

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: { xs: 5, md: 8 } }}>
        <PageHeader
          eyebrow="사용법"
          title="검색 · 기여 · 운영을 한 곳에서"
          lead="브라우저에서의 사용 방법부터 JSON 데이터 직접 조회, 이슈를 통한 기여, 관리자 워크플로우까지 단계별로 안내합니다."
        />

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} variant="scrollable" scrollButtons="auto">
            <Tab label="사용 가이드" />
            <Tab label="기여 가이드" />
            <Tab label="관리자 가이드" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}><UserGuide /></TabPanel>
        <TabPanel value={tab} index={1}><ContributorGuide /></TabPanel>
        <TabPanel value={tab} index={2}><AdminGuide /></TabPanel>
      </Container>
    </Layout>
  )
}

/* ============================================================
   사용 가이드
   ============================================================ */
function UserGuide(): React.ReactNode {
  return (
    <>
      <Section eyebrow="Browse" title="브라우저에서 검색하기">
        <Steps
          items={[
            { k: '검색', v: '메인 페이지 검색창에 영어나 한국어를 입력하면 200ms 디바운스로 결과를 실시간으로 좁혀줍니다.' },
            { k: '알파벳', v: '히어로 아래 A–Z 네비게이션에서 알파벳을 누르면 해당 알파벳으로 시작하는 용어만 보여줍니다.' },
            { k: '상세 보기', v: '용어 카드를 누르면 모든 의미와 정의, 예시(EN/KO), 유사 용어, 논의 이력까지 확인할 수 있습니다.' },
            { k: '다의어', v: '여러 의미를 가진 용어는 카드에 보라색 “다중 의미” 배지를 달고, 상세 페이지에서는 의미별로 아코디언을 펼쳐서 보여줍니다.' },
          ]}
        />
      </Section>

      <Section eyebrow="API" title="JSON 데이터로 직접 조회">
        <P>웹 UI를 거치지 않고도 같은 데이터를 자동화·LLM 파이프라인에 그대로 가져다 쓸 수 있습니다.</P>
        <Pre>{`$ curl -s https://poc.terms.kr/data/index.json
{
  "files": ["a.json", "b.json", ..., "w.json"]
}

$ curl -s https://poc.terms.kr/data/a.json | jq '.[] | select(.term == "attention")'
{
  "term": "attention",
  "meanings": [
    {
      "korean": "어텐션",
      "definition": "...",
      "examples": [{ "en": "multi-head attention", "ko": "다중 헤드 어텐션" }],
      "synonyms": []
    }
  ]
}`}</Pre>
        <P>
          전체 데이터셋은{' '}
          <Link href={`${REPO_URL}/tree/poc/data`} target="_blank" rel="noopener noreferrer">
            <code>poc/data/</code>
          </Link>{' '}
          에서 직접 보거나 저장소를 <code>git clone</code>하여 받을 수 있습니다.
        </P>
      </Section>

      <Section eyebrow="LLM" title="LLM 번역 도구에 연결">
        <P>
          <Link href="https://poc.terms.kr/llms.txt" target="_blank" rel="noopener noreferrer">
            <code>llms.txt</code>
          </Link>
          는 LLM이 본 용어집의 구조와 데이터 위치를 자동으로 파악하도록 만든 파일입니다. 번역
          파이프라인이나 시스템 프롬프트에 본 URL을 컨텍스트로 넣어 두면 모델이 직접 검색하고 인용할 수 있습니다.
        </P>
        <Pre>{`# 시스템 프롬프트 예시
한국어로 번역할 때는 다음 표준을 따르시오:
- 영어 용어: https://poc.terms.kr/data/{letter}.json
- 인덱스:    https://poc.terms.kr/data/index.json
- 규약:      https://poc.terms.kr/llms.txt`}</Pre>
      </Section>

      <Section eyebrow="FAQ" title="자주 묻는 질문">
        <FAQ
          items={[
            {
              q: '같은 용어에 다른 번역을 제안할 수 있나요?',
              a: '네. 한 용어가 분야에 따라 다른 번역을 가질 수 있고, 데이터 모델도 이를 일급 시민으로 지원합니다. “용어 피드백” 또는 “새 용어 요청”으로 제안해 주세요.',
            },
            {
              q: '어떤 분야의 용어를 다루나요?',
              a: '딥러닝, 머신러닝, 강화학습, 자연어처리, 컴퓨터비전, 생성형 AI 등 AI/ML 전반을 다룹니다.',
            },
            {
              q: '기여하면 어떻게 기록되나요?',
              a: 'GitHub Issue가 승인되면 자동화가 Co-authored-by 트레일러를 박은 커밋을 만들어 메인 브랜치에 반영합니다.',
            },
            {
              q: '현재 데이터는 신뢰할 수 있나요?',
              a: '현재 PoC 단계이며 수록된 용어 다수는 AI가 생성한 초안입니다. 커뮤니티 검토를 통해 점진적으로 교정됩니다. MIT 라이선스로 자유롭게 사용·재배포 가능합니다.',
            },
          ]}
        />
      </Section>
    </>
  )
}

/* ============================================================
   기여 가이드
   ============================================================ */
function ContributorGuide(): React.ReactNode {
  return (
    <>
      <Section eyebrow="Issue" title="이슈로 기여 (권장)">
        <P>
          코드 작업 없이 GitHub Issue만 작성해도 기여할 수 있습니다. 관리자가 승인하면 자동화가{' '}
          <code>Co-authored-by</code>에 기여자를 담아 커밋합니다.
        </P>

        <SubHead>새 용어 요청</SubHead>
        <Steps
          items={[
            { k: '요청', v: '“새 용어 요청” 버튼을 눌러 영문 용어, 한글 번역, 정의를 입력합니다.' },
            { k: '검토', v: '관리자가 표기·중복·맥락을 검토합니다.' },
            { k: '승인', v: '관리자가 /approve 댓글을 남기면 자동화 워크플로우를 트리거합니다.' },
            { k: '반영', v: '자동화가 데이터 파일에 새 용어를 더하고 이슈를 닫으며, 기여자를 커밋에 함께 기록합니다.' },
          ]}
        />
        <Box sx={{ mt: 2, display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button variant="contained" startIcon={<AddIcon />} href={NEW_TERM_URL} target="_blank" rel="noopener noreferrer">
            새 용어 요청
          </Button>
          <Button variant="outlined" startIcon={<FeedbackIcon />} href={FEEDBACK_URL} target="_blank" rel="noopener noreferrer">
            번역 개선 제안
          </Button>
        </Box>

        <SubHead>번역 피드백</SubHead>
        <Steps
          items={[
            { k: '제안', v: '용어 상세 페이지의 “번역 개선 제안” 버튼으로 피드백 이슈를 엽니다.' },
            { k: '초안', v: '관리자가 /approve를 남기면 봇이 JSON 초안 코멘트를 작성합니다.' },
            { k: '확정', v: '관리자가 commit-ready 라벨을 붙이면 자동화가 봇의 최신 JSON을 그대로 데이터에 반영합니다.' },
          ]}
        />
      </Section>

      <Section eyebrow="PR" title="Pull Request로 기여">
        <P>데이터 파일을 직접 수정해 PR로 제출할 수도 있습니다.</P>
        <Steps
          items={[
            { k: 'Fork', v: <>저장소를 본인 계정으로 포크합니다. <Link href={REPO_URL} target="_blank" rel="noopener noreferrer">{REPO_URL}</Link></> },
            { k: 'Edit', v: <><code>data/&#123;letter&#125;.json</code>을 직접 수정합니다. 새 알파벳 파일을 만들 경우 <code>data/index.json</code>에도 추가합니다.</> },
            { k: 'Validate', v: <><code>npm run build</code>로 TypeScript와 JSON 유효성을 함께 검증합니다.</> },
            { k: 'PR', v: '메인 저장소로 Pull Request를 보내고, 관리자 리뷰 후 병합됩니다.' },
          ]}
        />
      </Section>

      <Section eyebrow="Schema" title="데이터 구조">
        <P>
          용어 데이터는 알파벳별 JSON 배열에 담고, 다의어는 <code>meanings</code> 배열로 표현합니다.
        </P>
        <Pre>{`{
  "term": "agent",
  "meanings": [
    {
      "korean": "에이전트",
      "definition": "환경과 상호작용하며 학습하는 주체",
      "examples": [
        {
          "en": "The agent learns to maximize the reward.",
          "ko": "에이전트는 보상을 최대화하도록 학습한다.",
          "source": "https://..."
        }
      ],
      "synonyms": ["행위자"]
    }
  ],
  "issueNumber": 1,
  "notes": "번역 선택 근거 메모"
}`}</Pre>
        <UL
          items={[
            <><Em>필수</Em>: <code>term</code>, <code>meanings[].korean</code>, <code>meanings[].definition</code></>,
            <><Em>선택</Em>: <code>examples</code> (EN/KO 권장), <code>synonyms</code>, <code>issueNumber</code>, <code>notes</code></>,
          ]}
        />
      </Section>

      <Section eyebrow="Validate" title="제출 전 점검">
        <P>
          PR을 보내기 전에 로컬에서 다음 명령으로 JSON 유효성과 타입을 함께 확인해 주세요.
        </P>
        <Pre>{`$ npm run build      # TypeScript + JSON 유효성 검증
$ npm run lint       # ESLint`}</Pre>
      </Section>
    </>
  )
}

/* ============================================================
   관리자 가이드
   ============================================================ */
function AdminGuide(): React.ReactNode {
  return (
    <>
      <Section eyebrow="Review" title="이슈 검토 워크플로우">
        <P>
          저장소 권한이 있는 관리자가 따르는 표준 절차입니다. <code>/approve</code> 댓글이 자동화 트리거이므로
          신중히 검토해 주세요.
        </P>

        <SubHead>새 용어 요청 처리</SubHead>
        <Steps
          items={[
            { k: '확인', v: <><Link href={`${REPO_URL}/issues?q=label:"새 용어 요청"`} target="_blank" rel="noopener noreferrer">새 용어 요청</Link> 라벨의 이슈를 봅니다.</> },
            { k: '품질', v: '영문 용어, 한글 번역, 정의가 모두 적절한지 확인합니다.' },
            { k: '승인', v: <><code>/approve</code> 댓글로 자동화 트리거 — 데이터 반영 + Co-authored-by 등록 + 이슈 자동 닫힘.</> },
            { k: '거부', v: '사유 코멘트 후 이슈를 닫습니다. 수정이 필요하면 코멘트로 안내합니다.' },
          ]}
        />

        <SubHead>번역 피드백 처리</SubHead>
        <Steps
          items={[
            { k: '확인', v: <><Link href={`${REPO_URL}/issues?q=label:"용어 피드백"`} target="_blank" rel="noopener noreferrer">용어 피드백</Link> 라벨의 이슈를 봅니다.</> },
            { k: '초안', v: <><code>/approve</code> 댓글로 봇의 JSON 초안 코멘트를 받습니다 (이 단계에서는 데이터에 반영되지 않음).</> },
            { k: '편집', v: '필요하면 봇 코멘트를 직접 수정하거나, 새 JSON 코멘트를 추가합니다.' },
            { k: '확정', v: <><code>commit-ready</code> 라벨을 붙이면 봇의 마지막 JSON이 그대로 반영됩니다.</> },
          ]}
        />
      </Section>

      <Section eyebrow="Quality" title="용어 품질 기준">
        <UL
          items={[
            <><Em>필수 필드</Em>: <code>korean</code>과 <code>definition</code>을 모두 채웁니다.</>,
            <><Em>중복 확인</Em>: 같은 한글 번역이 이미 있는지 살핍니다. 자동화 스크립트가 충돌을 발견하면 경고를 띄웁니다.</>,
            <><Em>예시 형식</Em>: <code>&#123;"en", "ko", "source"&#125;</code> 객체 형식을 권장합니다.</>,
            <><Em>API 명</Em>: <code>torch.compile</code>처럼 영문 API 이름은 번역하지 않고 그대로 둡니다.</>,
          ]}
        />
      </Section>

      <Section eyebrow="Ops" title="롤백 및 문제 해결">
        <UL
          items={[
            <><Em>잘못된 커밋</Em>: <code>git revert &lt;sha&gt;</code>로 되돌립니다. 커밋 메시지에 이슈 번호가 들어 있어 추적이 쉽습니다.</>,
            <><Em>워크플로우 실패</Em>: GitHub Actions 탭에서 실패 로그를 확인합니다. 필수 필드 누락이나 JSON 파싱 오류가 주된 원인입니다.</>,
            <><Em>동시 승인</Em>: 여러 이슈를 동시에 승인해도 concurrency group이 순차로 처리하므로 충돌하지 않습니다.</>,
          ]}
        />
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
      <Typography sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.65, color: 'var(--fg-2)', width: '100%' }}>
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

function SubHead({ children }: { children: React.ReactNode }): React.ReactNode {
  return (
    <Typography
      component="h3"
      sx={{
        mt: 3,
        mb: 1,
        fontFamily: 'var(--ff-display)',
        fontWeight: 700,
        fontSize: 18,
        color: 'var(--fg-1)',
      }}
    >
      {children}
    </Typography>
  )
}

function P({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Typography component="p" sx={{ fontSize: 16, lineHeight: 1.75, color: 'var(--fg-1)' }}>{children}</Typography>
}

function Em({ children }: { children: React.ReactNode }): React.ReactNode {
  return <Box component="strong" sx={{ fontWeight: 700, color: 'var(--fg-1)' }}>{children}</Box>
}

function UL({ items }: { items: React.ReactNode[] }): React.ReactNode {
  return (
    <Box
      component="ul"
      sx={{ m: 0, pl: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 1 }}
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

interface Step {
  k: string
  v: React.ReactNode
}

function Steps({ items }: { items: Step[] }): React.ReactNode {
  return (
    <Box component="ol" sx={{ m: 0, p: 0, listStyle: 'none', display: 'flex', flexDirection: 'column' }}>
      {items.map((step, i) => (
        <Box
          key={i}
          component="li"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '80px 1fr', md: '120px 1fr' },
            gap: { xs: 2, md: 3 },
            py: 2,
            borderTop: i === 0 ? '1px solid var(--ptk-line-soft)' : 'none',
            borderBottom: '1px solid var(--ptk-line-soft)',
          }}
        >
          <Box
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--ptk-orange)',
              display: 'flex',
              alignItems: 'baseline',
              gap: 1,
            }}
          >
            <Box component="span" sx={{ color: 'var(--fg-3)' }}>{String(i + 1).padStart(2, '0')}</Box>
            {step.k}
          </Box>
          <Box sx={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-1)' }}>{step.v}</Box>
        </Box>
      ))}
    </Box>
  )
}

interface FAQItem {
  q: string
  a: string
}

function FAQ({ items }: { items: FAQItem[] }): React.ReactNode {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      {items.map((it, i) => (
        <Box
          key={i}
          sx={{
            py: 2.5,
            borderTop: i === 0 ? '1px solid var(--ptk-line-soft)' : 'none',
            borderBottom: '1px solid var(--ptk-line-soft)',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'var(--ff-display)',
              fontWeight: 700,
              fontSize: 17,
              color: 'var(--fg-1)',
              mb: 0.75,
              letterSpacing: '-0.005em',
            }}
          >
            {it.q}
          </Typography>
          <Typography sx={{ fontSize: 15, lineHeight: 1.65, color: 'var(--fg-2)' }}>{it.a}</Typography>
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
