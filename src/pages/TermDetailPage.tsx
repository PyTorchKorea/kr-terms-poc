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
  Divider,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import GitHubIcon from '@mui/icons-material/GitHub'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import HomeIcon from '@mui/icons-material/Home'
import { Layout } from '../components/Layout'
import { useTerms } from '../hooks/useTerms'
import { getDomainColor } from '../utils/domainColors'
import type { Term } from '../types/term'

function getRelatedTerms(terms: Term[], currentTerm: Term): Term[] {
  const currentDomains = new Set(currentTerm.meanings.map((m) => m.domain))
  return terms
    .filter((t) =>
      t.term !== currentTerm.term &&
      t.meanings.some((m) => currentDomains.has(m.domain))
    )
    .slice(0, 6)
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

  const relatedTerms = useMemo(
    () => term ? getRelatedTerms(terms, term) : [],
    [terms, term]
  )

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

  const handleOpenIssue = (): void => {
    const url = `https://github.com/9bow/terms-kr/issues/new?template=term-feedback.yml&title=[용어 피드백] ${encodeURIComponent(term.term)}`
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
                <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}>
                  {meaning.korean}
                </Typography>
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleCopyKorean(meaning.korean)
                  }}
                  sx={{ mr: 1 }}
                >
                  <ContentCopyIcon fontSize="small" />
                </IconButton>
                <Chip
                  label={meaning.domain}
                  size="small"
                  sx={{
                    backgroundColor: getDomainColor(meaning.domain),
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
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
                        <ListItem key={exIndex}>
                          <ListItemText
                            primary={example}
                            primaryTypographyProps={{ variant: 'body2' }}
                          />
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

      {relatedTerms.length > 0 && (
        <>
          <Divider sx={{ my: 4 }} />
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
              같은 도메인의 관련 용어
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {relatedTerms.map((relatedTerm) => (
                <Chip
                  key={relatedTerm.term}
                  label={relatedTerm.term}
                  onClick={() => navigate(`/term/${encodeURIComponent(relatedTerm.term)}`)}
                  sx={{ cursor: 'pointer' }}
                />
              ))}
            </Box>
          </Box>
        </>
      )}

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          startIcon={<GitHubIcon />}
          onClick={handleOpenIssue}
          size="large"
        >
          번역 개선 제안하기
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
