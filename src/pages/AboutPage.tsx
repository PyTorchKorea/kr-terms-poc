import React, { useState } from 'react'
import {
  Typography, Box, Container, Paper, List, ListItem, ListItemText,
  Divider, Chip, Button, Alert, Tabs, Tab, Link,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
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
  return <Box sx={{ py: 3 }}>{children}</Box>
}

function IntroTab(): React.ReactNode {
  return (
    <>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          왜 AI/ML 용어집인가?
        </Typography>
        <Typography variant="body1" paragraph>
          번역은 생성형 AI 모델을 사용하여 자동화할 수 있지만, 이러한 번역 시에도 <strong>일관된 용어를 사용하는 것은 매우 중요합니다.</strong>{' '}
          인공지능 및 머신러닝 분야의 다양한 용어들을 표준화하고, 이를 공개하여 누구나 사용할 수 있도록 하는 것을 목표로 하고 있습니다.
        </Typography>
        <Typography variant="body1" paragraph>
          이 프로젝트는 오픈소스 커뮤니티 기반으로 용어의 표준화된 번역을 제공하고, 다의어와 맥락별 번역을 체계적으로 관리합니다.
          파이토치 한국 사용자 모임(PyTorchKR)에서 운영합니다.
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
          <Chip label="오픈소스" color="primary" size="small" />
          <Chip label="커뮤니티 기반" color="secondary" size="small" />
          <Chip label="다의어 지원" color="info" size="small" />
          <Chip label="맥락 기반 번역" color="success" size="small" />
          <Chip label="LLM 연동" color="warning" size="small" />
        </Box>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          프로젝트의 의의
        </Typography>
        <Typography variant="body1" paragraph>
          한국어로 된 인공지능/머신러닝 문서를 읽을 때 같은 용어가 여러 가지로 번역되어 혼란을 느끼신 적이 있으실 겁니다.
          예를 들어, &quot;attention&quot;은 &quot;어텐션&quot;, &quot;주의&quot;, &quot;주의 메커니즘&quot;, &quot;집중 메커니즘&quot; 등으로 번역되곤 합니다.
        </Typography>
        <Typography variant="body1" paragraph>
          이 용어집은 이러한 문제를 해결하기 위해 시작되었습니다. 각 용어에 대해 <strong>표준 번역</strong>을 제공하고,
          왜 그 번역이 선택되었는지에 대한 근거도 함께 기록합니다. 사람뿐 아니라 AI 번역 도구에서도 이 데이터를 참조하여 일관된 번역을 유지할 수 있습니다.
        </Typography>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          LLM / AI 번역 도구 연동
        </Typography>
        <Typography variant="body1" paragraph>
          이 용어집은 사람뿐 아니라 AI 도구에서도 활용할 수 있도록 기계 판독 가능한 형식을 제공합니다.
          AI 번역 시 이 용어집을 컨텍스트로 제공하면, 일관된 한국어 번역을 유지하는 데 도움이 됩니다.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="llms.txt"
              secondary={<>llmstxt.org 표준에 따른 LLM용 프로젝트 안내 파일 (<Link href="https://poc.terms.kr/llms.txt" target="_blank" rel="noopener noreferrer">poc.terms.kr/llms.txt</Link>)</>}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="JSON 데이터"
              secondary={<>알파벳별 JSON 파일로 전체 용어 데이터에 접근 가능 (<Link href="https://poc.terms.kr/data/index.json" target="_blank" rel="noopener noreferrer">poc.terms.kr/data/</Link>)</>}
            />
          </ListItem>
        </List>
      </Paper>
    </>
  )
}

function UserGuideTab(): React.ReactNode {
  return (
    <>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          용어 검색하기
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. 검색"
              secondary="메인 페이지에서 영어 또는 한국어로 용어를 검색하세요. 실시간으로 결과가 필터링됩니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="2. 알파벳 탐색"
              secondary="A-Z 알파벳 칩을 클릭하면 해당 알파벳으로 시작하는 용어만 필터링됩니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="3. 상세 정보 확인"
              secondary="검색 결과를 클릭하면 용어의 모든 의미, 설명, 사용 예시, 관련 용어를 확인할 수 있습니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="4. 다의어 구분"
              secondary="하나의 용어가 여러 의미를 가질 경우, 각 의미별로 아코디언으로 구분되어 표시됩니다. 맥락에 따라 번역이 다를 수 있습니다."
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          용어 요청 및 피드백
        </Typography>
        <Typography variant="body1" paragraph>
          찾으시는 용어가 없거나, 기존 번역에 대한 의견이 있으시면 GitHub Issue를 통해 요청하실 수 있습니다.
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href={NEW_TERM_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            새 용어 요청
          </Button>
          <Button
            variant="outlined"
            startIcon={<FeedbackIcon />}
            href={FEEDBACK_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            번역 개선 제안
          </Button>
        </Box>
        <Alert severity="info">
          각 용어 상세 페이지에서도 &quot;번역 개선 제안하기&quot;, &quot;새로운 의미 추가 요청&quot; 버튼을 통해 바로 피드백을 제출할 수 있습니다.
        </Alert>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          자주 묻는 질문
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="같은 용어에 다른 번역을 제안할 수 있나요?"
              secondary="네. 하나의 용어가 맥락에 따라 다른 번역을 가질 수 있습니다. 새로운 의미 추가 요청을 통해 제안해주세요."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="어떤 분야의 용어를 다루나요?"
              secondary="딥러닝, 머신러닝, 강화학습, 자연어처리, 컴퓨터비전, 생성형AI 등 AI/ML 전 분야를 다룹니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="기여하면 어떤 혜택이 있나요?"
              secondary="GitHub Issue를 통해 제안한 용어가 승인되면 Co-authored-by로 기여자가 자동 등록됩니다. 커밋 히스토리에 여러분의 이름이 남습니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="현재 PoC 단계인데 실제로 사용해도 되나요?"
              secondary="네, 자유롭게 사용하실 수 있습니다. 다만, 현재 수록된 용어 데이터는 AI가 생성한 초안이며 커뮤니티 검토를 거치는 중입니다. MIT 라이센스로 자유롭게 활용 가능합니다."
            />
          </ListItem>
        </List>
      </Paper>
    </>
  )
}

function ContributorGuideTab(): React.ReactNode {
  return (
    <>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Issue를 통한 기여 (추천)
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          코드 작업 없이 GitHub Issue만으로 기여할 수 있습니다. 승인되면 Co-authored-by로 자동 등록됩니다.
        </Alert>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
          새 용어 추가 요청
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary={'1. "새 용어 요청" 버튼을 클릭합니다'} />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. 영문 용어, 한글 번역, 정의를 입력합니다" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. 관리자가 검토 후 approved 라벨을 추가합니다" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. 자동으로 용어가 반영되고, 기여자로 등록됩니다" />
          </ListItem>
        </List>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          href={NEW_TERM_URL}
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 1, mb: 3 }}
        >
          새 용어 요청하기
        </Button>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 2, mb: 1 }}>
          번역 개선 제안
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText primary="1. 용어 상세 페이지에서 '번역 개선 제안하기' 버튼을 클릭합니다" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. 피드백 유형을 선택하고 제안 내용을 작성합니다" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. 관리자가 검토 후 JSON 초안을 코멘트로 작성합니다" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. 관리자가 commit-ready 라벨을 추가하면 자동 반영됩니다" />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          Pull Request를 통한 기여
        </Typography>
        <Typography variant="body1" paragraph>
          직접 데이터 파일을 수정하여 PR로 기여할 수도 있습니다.
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary="1. 저장소 Fork"
              secondary={<>
                <Link href={REPO_URL} target="_blank" rel="noopener noreferrer">{REPO_URL}</Link>를 본인 계정으로 포크합니다.
              </>}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="2. 데이터 수정"
              secondary="data/ 디렉토리의 알파벳별 JSON 파일에 새로운 용어를 추가하거나 기존 항목을 수정합니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="3. Pull Request 생성"
              secondary="변경사항을 커밋하고 원본 저장소로 Pull Request를 생성합니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="4. 리뷰 및 병합"
              secondary="관리자 리뷰를 거쳐 승인되면 메인 브랜치에 병합됩니다."
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          데이터 구조
        </Typography>
        <Typography variant="body1" paragraph>
          용어 데이터는 알파벳별 JSON 파일로 관리되며, 다의어를 지원하기 위해 <code>meanings</code> 배열 구조를 사용합니다.
        </Typography>
        <Box
          component="pre"
          sx={{
            bgcolor: 'grey.100',
            p: 2,
            borderRadius: 1,
            overflow: 'auto',
            fontSize: '0.875rem',
          }}
        >
{`{
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
}`}
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          <strong>필수 필드:</strong> term, korean, definition
          <br />
          <strong>선택 필드:</strong> examples, synonyms, issueNumber (GitHub Issue 번호), notes (번역 참고사항)
        </Typography>
      </Paper>
    </>
  )
}

function AdminGuideTab(): React.ReactNode {
  return (
    <>
      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          이슈 검토 워크플로우
        </Typography>
        <Typography variant="body1" paragraph>
          저장소에 권한이 있는 관리자는 다음 절차로 용어를 관리합니다.
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <code>approved</code> 라벨을 추가하면 자동으로 데이터가 반영됩니다. 신중하게 검토한 후 라벨을 추가하세요.
        </Alert>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
          새 용어 요청 처리
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="1. 이슈 확인"
              secondary={<>
                <Link href={`${REPO_URL}/issues?q=label:"새 용어 요청"`} target="_blank" rel="noopener noreferrer">새 용어 요청</Link> 라벨의 이슈를 확인합니다.
              </>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="2. 품질 기준 확인"
              secondary="영문 용어, 한글 번역, 정의가 모두 적절한지 확인합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={'3. 승인: approved 라벨 추가'}
              secondary="자동으로 용어가 데이터에 추가되고, 이슈 작성자가 Co-authored-by로 등록됩니다. 이슈가 자동으로 닫힙니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="4. 거부: 이슈 닫기"
              secondary="사유를 코멘트로 작성한 후 이슈를 닫습니다. 수정 요청이 필요한 경우 코멘트로 안내합니다."
            />
          </ListItem>
        </List>

        <Typography variant="subtitle1" sx={{ fontWeight: 600, mt: 3, mb: 1 }}>
          번역 피드백 처리
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="1. 이슈 확인"
              secondary={<>
                <Link href={`${REPO_URL}/issues?q=label:"용어 피드백"`} target="_blank" rel="noopener noreferrer">용어 피드백</Link> 라벨의 이슈를 확인합니다.
              </>}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={'2. approved 라벨 추가'}
              secondary="봇이 자동으로 JSON 초안 코멘트를 작성합니다. 이 단계에서는 데이터에 반영되지 않습니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="3. JSON 초안 검토/수정"
              secondary="봇이 작성한 JSON 코멘트를 확인하고, 필요 시 수정 코멘트를 작성합니다."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={'4. commit-ready 라벨 추가'}
              secondary="봇의 마지막 JSON 코멘트 내용이 자동으로 데이터에 반영되고, 이슈가 닫힙니다."
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          용어 품질 기준
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="필수 필드 확인"
              secondary="korean, definition이 모두 채워져 있어야 합니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="중복 확인"
              secondary="같은 한글 번역이 이미 있는지 확인합니다. 중복 시 스크립트가 자동으로 경고합니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="예시 형식"
              secondary={'예시는 "en" (영문), "ko" (한글), "source" (출처, 선택) 형식을 권장합니다.'}
            />
          </ListItem>
        </List>
      </Paper>

      <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
          롤백 및 문제 해결
        </Typography>
        <List dense>
          <ListItem>
            <ListItemText
              primary="잘못된 커밋 되돌리기"
              secondary={'git revert <commit-sha>로 되돌릴 수 있습니다. 커밋 메시지에 이슈 번호가 포함되어 있어 추적이 가능합니다.'}
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="워크플로우 실패 시"
              secondary="GitHub Actions 탭에서 실패 로그를 확인합니다. 필수 필드 누락이나 JSON 형식 오류가 주요 원인입니다."
            />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText
              primary="동시 승인"
              secondary="여러 이슈가 동시에 승인되어도 대기열 방식(concurrency group)으로 순차 처리되므로 충돌이 발생하지 않습니다."
            />
          </ListItem>
        </List>
      </Paper>
    </>
  )
}

export function AboutPage(): React.ReactNode {
  const [tab, setTab] = useState(0)

  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            AI/ML 용어집
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            인공지능 및 머신러닝 분야의 용어 표준화를 위한 오픈소스 프로젝트
          </Typography>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 1 }}>
          <Tabs
            value={tab}
            onChange={(_, v) => setTab(v)}
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="소개" />
            <Tab label="사용 가이드" />
            <Tab label="기여 가이드" />
            <Tab label="관리자 가이드" />
          </Tabs>
        </Box>

        <TabPanel value={tab} index={0}>
          <IntroTab />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <UserGuideTab />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <ContributorGuideTab />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <AdminGuideTab />
        </TabPanel>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            함께 만들어가는 AI/ML 용어 사전
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
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
              새 용어 요청하기
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            MIT 라이센스 · 파이토치 한국 사용자 모임 · 누구나 자유롭게 사용하고 기여할 수 있습니다
          </Typography>
        </Box>
      </Container>
    </Layout>
  )
}
