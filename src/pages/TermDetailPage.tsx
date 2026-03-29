import React, { useState, useMemo } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Typography,
  Button,
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  List,
  ListItem,
  ListItemText,
  Alert,
  IconButton,
  Snackbar,
  Breadcrumbs,
  Link,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GitHubIcon from '@mui/icons-material/GitHub'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import HomeIcon from '@mui/icons-material/Home'
import HistoryIcon from '@mui/icons-material/History'
import AddIcon from '@mui/icons-material/Add'
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import { Layout } from '../components/Layout'
import { useTerms } from '../hooks/useTerms'
import type { TermExample } from '../types/term'

function isTermExample(example: string | TermExample): example is TermExample {
  return typeof example === 'object' && 'en' in example && 'ko' in example
}

export function TermDetailPage(): React.ReactNode {
  const { termId } = useParams<{ termId: string }>()
  const navigate = useNavigate()
  const { terms, loading, error } = useTerms()
  const [snackbarOpen, setSnackbarOpen] = useState(false)

  const term = useMemo(
    () => terms.find((t) => t.term === decodeURIComponent(termId || '')),
    [terms, termId]
  )

  const hasDuplicateKorean = useMemo(() => {
    if (!term) return false
    const koreanValues = term.meanings.map((m) => m.korean)
    return koreanValues.length !== new Set(koreanValues).size
  }, [term])

  if (loading) {
    return <Layout><Typography>로딩 중...</Typography></Layout>
  }

  if (error) {
    return <Layout><Alert severity="error">{error}</Alert></Layout>
  }

  if (!term) {
    return (
      <Layout>
        <Alert severity="warning">용어를 찾을 수 없습니다</Alert>
        <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
          뒤로 가기
        </Button>
      </Layout>
    )
  }

  const handleGoBack = (): void => {
    navigate('/')
  }

  const handleOpenFeedback = (): void => {
    const url = `https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=term-feedback.yml&title=[용어 피드백] ${encodeURIComponent(term.term)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleRequestMeaning = (): void => {
    const url = `https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml&title=[새 용어] ${encodeURIComponent(term.term)}`
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleCopyKorean = (korean: string): void => {
    navigator.clipboard.writeText(korean).then(() => {
      setSnackbarOpen(true)
    }).catch(() => {
      // Silent fail
    })
  }

  return (
    <Layout>
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link
          component="button"
          variant="body2"
          onClick={handleGoBack}
          sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }}
          underline="hover"
        >
          <HomeIcon fontSize="small" />
          홈
        </Link>
        <Typography variant="body2" color="text.primary">
          {term.term}
        </Typography>
      </Breadcrumbs>

      <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
        {term.term}
      </Typography>

      {term.meanings.length > 1 && (
        <Alert severity="info" sx={{ mb: 3 }}>
          이 용어는 {term.meanings.length}개의 다른 의미를 가지고 있습니다.
        </Alert>
      )}

      {term.notes && (
        <Alert icon={<InfoOutlinedIcon />} severity="success" sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
            번역 참고사항
          </Typography>
          <Typography variant="body2">{term.notes}</Typography>
        </Alert>
      )}

      {term.issueNumber && (
        <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HistoryIcon fontSize="small" color="action" />
          <Link
            href={`https://github.com/PyTorchKorea/kr-terms-poc/issues/${term.issueNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            variant="body2"
          >
            이 용어의 논의 내역 보기 (#{term.issueNumber})
          </Link>
        </Box>
      )}

      <Box sx={{ my: 3 }}>
        {term.meanings.map((meaning, index) => (
          <Accordion
            key={index}
            defaultExpanded={index === 0}
            sx={{
              mb: 2,
              '&:before': { display: 'none' },
              boxShadow: 2,
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                backgroundColor: 'background.default',
                '&:hover': { backgroundColor: 'action.hover' },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {meaning.korean}
                  </Typography>
                  {hasDuplicateKorean && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                      {meaning.definition.slice(0, 30)}{meaning.definition.length > 30 ? '...' : ''}
                    </Typography>
                  )}
                </Box>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopyKorean(meaning.korean)
                  }}
                  aria-label={`${meaning.korean} 복사`}
                  sx={{ mr: 1 }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box>
                <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                  {meaning.definition}
                </Typography>

                {meaning.examples.length > 0 && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      예시
                    </Typography>
                    <List dense>
                      {meaning.examples.map((example, exIndex) => (
                        <ListItem key={exIndex} sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                          {isTermExample(example) ? (
                            <Box sx={{ width: '100%' }}>
                              <Typography variant="body2" sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                                {example.en}
                              </Typography>
                              <Typography variant="body2" sx={{ mt: 0.5 }}>
                                {example.ko}
                              </Typography>
                              {example.source && (
                                <Link
                                  href={example.source}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  variant="caption"
                                  sx={{ mt: 0.5, display: 'inline-block' }}
                                >
                                  출처
                                </Link>
                              )}
                            </Box>
                          ) : (
                            <ListItemText
                              primary={example}
                              primaryTypographyProps={{ variant: 'body2' }}
                            />
                          )}
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {meaning.synonyms.length > 0 && (
                  <Box>
                    <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600, color: 'primary.main' }}>
                      유사 용어
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {meaning.synonyms.map((synonym, synIndex) => (
                        <Chip key={synIndex} label={synonym} size="small" variant="outlined" />
                      ))}
                    </Box>
                  </Box>
                )}
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={handleOpenFeedback}
          size="large"
        >
          번역 개선 제안하기
        </Button>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={handleRequestMeaning}
          size="large"
        >
          새로운 의미 추가 요청
        </Button>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleGoBack}
          size="large"
        >
          목록으로 돌아가기
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={() => setSnackbarOpen(false)}
        message="번역이 복사되었습니다"
      />
    </Layout>
  )
}
