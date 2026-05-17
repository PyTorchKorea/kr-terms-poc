import React, { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Grid, Typography, Box, Skeleton, Button, Container } from '@mui/material'
import SearchOffIcon from '@mui/icons-material/SearchOff'
import AddIcon from '@mui/icons-material/Add'
import { Layout } from '../components/Layout'
import { TermCard } from '../components/TermCard'
import { HeroSection } from '../components/HeroSection'
import { AlphabetNavigation } from '../components/AlphabetNavigation'
import { useTerms } from '../hooks/useTerms'
import { useSearch } from '../hooks/useSearch'
import { calculateStatistics } from '../utils/statistics'
import { NEW_TERM_URL } from '../data/const'

export function SearchPage(): React.ReactNode {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const selectedLetter = searchParams.get('letter') || null
  const { terms, loading, error } = useTerms()
  const filteredTerms = useSearch(terms, query)

  const statistics = useMemo(() => calculateStatistics(terms), [terms])

  const finalFilteredTerms = useMemo(() => {
    if (!selectedLetter) return filteredTerms
    return filteredTerms.filter((term) =>
      term.term.toUpperCase().startsWith(selectedLetter)
    )
  }, [filteredTerms, selectedLetter])

  const updateSearchParams = useCallback((q: string, letter: string | null) => {
    const params = new URLSearchParams()
    if (q) params.set('q', q)
    if (letter) params.set('letter', letter)
    setSearchParams(params, { replace: true })
  }, [setSearchParams])

  const handleQueryChange = useCallback((newQuery: string): void => {
    updateSearchParams(newQuery, selectedLetter)
  }, [updateSearchParams, selectedLetter])

  const handleLetterClick = useCallback((letter: string): void => {
    const newLetter = selectedLetter === letter ? null : letter
    updateSearchParams(query, newLetter)
  }, [updateSearchParams, selectedLetter, query])

  const handleClearFilter = useCallback((): void => {
    updateSearchParams(query, null)
  }, [updateSearchParams, query])

  const resultTitle = selectedLetter
    ? query ? `${selectedLetter} 검색 결과` : `${selectedLetter} 용어`
    : query ? '검색 결과' : '전체 용어'

  const emptyMessage = selectedLetter
    ? query ? '검색어를 바꾸거나 알파벳 필터를 해제해 보세요.' : '다른 알파벳을 선택하거나 전체 보기로 돌아가 보세요.'
    : '다른 검색어를 시도해 보세요.'

  if (error) {
    return (
      <Layout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Layout>
    )
  }

  if (loading) {
    return (
      <Layout>
        <HeroSection totalTerms={0} totalMeanings={0} query="" onQueryChange={() => {}} />
        <Container maxWidth="lg" sx={{ py: 5, px: { xs: 2.5, md: 5 } }}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 0 }} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Layout>
    )
  }

  return (
    <Layout>
      <HeroSection
        totalTerms={statistics.totalTerms}
        totalMeanings={statistics.totalMeanings}
        query={query}
        onQueryChange={handleQueryChange}
      />

      <AlphabetNavigation
        onLetterClick={handleLetterClick}
        onClearFilter={handleClearFilter}
        activeLetter={selectedLetter}
      />

      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2.5, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 1.5,
            mb: 3,
            pb: 2,
            borderBottom: '2px solid var(--fg-1)',
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 2, flexWrap: 'wrap' }}>
            <Typography
              component="h2"
              sx={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 700,
                fontSize: { xs: 24, md: 32 },
                letterSpacing: '-0.015em',
                lineHeight: 1,
                color: 'var(--fg-1)',
              }}
            >
              {resultTitle}
            </Typography>
            <Box
              component="span"
              sx={{
                fontFamily: 'var(--ff-mono)',
                fontSize: 13,
                color: 'var(--fg-3)',
                letterSpacing: '0.04em',
              }}
            >
              {finalFilteredTerms.length.toLocaleString()}개 용어
              {selectedLetter && (
                <Box component="span" sx={{ ml: 1, color: 'var(--fg-3)' }}>
                  · {selectedLetter}로 시작
                </Box>
              )}
              {query && (
                <Box component="span" sx={{ ml: 1, color: 'var(--ptk-orange)' }}>
                  · "{query}" 검색
                </Box>
              )}
            </Box>
          </Box>

          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            href={NEW_TERM_URL}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ fontSize: 13, fontWeight: 700 }}
          >
            새 용어 요청
          </Button>
        </Box>

        {finalFilteredTerms.length === 0 ? (
          <Box
            sx={{
              border: '1px dashed var(--ptk-line)',
              p: { xs: 5, md: 8 },
              textAlign: 'center',
              color: 'var(--fg-3)',
            }}
          >
            <SearchOffIcon sx={{ fontSize: 48, color: 'var(--ptk-line)', mb: 2 }} />
            <Typography
              sx={{
                fontFamily: 'var(--ff-display)',
                fontWeight: 400,
                fontSize: 22,
                color: 'var(--fg-1)',
                mb: 1,
              }}
            >
              검색 결과가 없습니다
            </Typography>
            <Typography sx={{ fontSize: 14, color: 'var(--fg-3)', mb: 3 }}>
              {emptyMessage}
            </Typography>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              href={NEW_TERM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              찾으시는 용어가 없나요? 새 용어를 요청하세요
            </Button>
          </Box>
        ) : (
          <Grid container spacing={2.5}>
            {finalFilteredTerms.map((term) => {
              const duplicates = statistics.duplicateTranslations.get(term.meanings[0].korean)
              const hasDuplicate = duplicates && duplicates.length > 1
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={term.term}>
                  <TermCard term={term} hasDuplicateTranslation={hasDuplicate} query={query} />
                </Grid>
              )
            })}
          </Grid>
        )}
      </Container>
    </Layout>
  )
}
