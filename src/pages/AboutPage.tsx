import React from 'react'
import { Typography, Box, Container, Paper, List, ListItem, ListItemText, Divider, Chip, Button, Alert } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Layout } from '../components/Layout'

export function AboutPage(): React.ReactNode {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ py: 6 }}>
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: 'center' }}>
          <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700, color: 'primary.main' }}>
            프로젝트 소개
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            terms.kr은 PyTorch Korea 커뮤니티에서 운영하는 AI/ML 용어의 한국어 번역 표준화 오픈소스 프로젝트입니다
          </Typography>
        </Box>

        {/* Section 1: 프로젝트 소개 */}
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            📖 프로젝트 목표
          </Typography>
          <Typography variant="body1" paragraph>
            AI/ML 분야의 급속한 발전과 함께 다양한 용어들이 등장하고 있지만, 한국어 번역이 통일되지 않아 혼란이 발생하고 있습니다.
            이 프로젝트는 커뮤니티 기반으로 용어의 표준화된 번역을 제공하고, 다의어와 맥락별 번역을 체계적으로 관리합니다.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
            <Chip label="오픈소스" color="primary" size="small" />
            <Chip label="커뮤니티 기반" color="secondary" size="small" />
            <Chip label="다의어 지원" color="info" size="small" />
            <Chip label="맥락 기반 번역" color="success" size="small" />
          </Box>
        </Paper>

        {/* Section 2: 사용 방법 */}
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            🔍 사용 방법
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
                primary="2. 상세 정보 확인"
                secondary="검색 결과를 클릭하면 용어의 모든 의미, 설명, 예시, 관련 용어를 확인할 수 있습니다."
              />
            </ListItem>
            <Divider component="li" />
            <ListItem>
              <ListItemText
                primary="3. 다의어 구분"
                secondary="하나의 용어가 여러 의미를 가질 경우, 각 의미별로 구분되어 표시됩니다."
              />
            </ListItem>
          </List>
        </Paper>

        {/* Section 3: 기여 방법 */}
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            🤝 기여 방법
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            누구나 GitHub Pull Request를 통해 새로운 용어를 추가하거나 기존 번역을 개선할 수 있습니다.
          </Alert>
          <Typography variant="body1" paragraph>
            <strong>기여 절차:</strong>
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                primary="1. GitHub 저장소 Fork"
                secondary="https://github.com/9bow/terms-kr 저장소를 본인 계정으로 포크합니다."
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
                secondary="커뮤니티 리뷰를 거쳐 승인되면 메인 브랜치에 병합됩니다."
              />
            </ListItem>
          </List>
        </Paper>

        {/* Section 4: 데이터 구조 */}
        <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            📊 데이터 구조
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
      "domain": "강화학습",
      "definition": "환경과 상호작용하며 학습하는 주체",
      "examples": ["에이전트는 보상을 최대화하도록 학습한다."],
      "synonyms": ["행위자"]
    },
    {
      "korean": "대리인",
      "domain": "인공지능",
      "definition": "사용자를 대신하여 작업을 수행하는 시스템",
      "examples": ["AI 에이전트가 일정을 관리한다."],
      "synonyms": ["AI 비서"]
    }
  ]
}`}
          </Box>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <strong>주요 필드:</strong> term (영어 원문), meanings (의미 배열), korean (한국어 번역),
            domain (분야), definition (설명), examples (예시), synonyms (유의어)
          </Typography>
        </Paper>

        {/* CTA Section */}
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
            함께 만들어가는 AI/ML 용어 사전
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<GitHubIcon />}
              href="https://github.com/9bow/terms-kr"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub에서 보기
            </Button>
            <Button
              variant="outlined"
              size="large"
              href="https://github.com/9bow/terms-kr/issues/new"
              target="_blank"
              rel="noopener noreferrer"
            >
              용어 제안하기
            </Button>
          </Box>
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 2 }}>
            MIT 라이센스 · PyTorch Korea 커뮤니티 · 누구나 자유롭게 사용하고 기여할 수 있습니다
          </Typography>
        </Box>
      </Container>
    </Layout>
  )
}
