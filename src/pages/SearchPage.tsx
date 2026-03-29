import React, { useMemo, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { TextField, Grid, Typography, Box, InputAdornment, Skeleton, Button } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { Layout } from '../components/Layout'
import { TermCard } from '../components/TermCard'
import { HeroSection } from '../components/HeroSection'
import { AlphabetNavigation } from '../components/AlphabetNavigation'
import { useTerms } from '../hooks/useTerms'
import { useSearch } from '../hooks/useSearch'
import { calculateStatistics } from '../utils/statistics'

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

  const handleQueryChange = (newQuery: string): void => {
    updateSearchParams(newQuery, selectedLetter)
  }

  const handleLetterClick = (letter: string): void => {
    const newLetter = selectedLetter === letter ? null : letter
    updateSearchParams(query, newLetter)
  }

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
        <HeroSection totalTerms={0} totalMeanings={0} />
        <Box sx={{ px: 2 }}>
          <Grid container spacing={3}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={i}>
                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 1 }} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <HeroSection
        totalTerms={statistics.totalTerms}
        totalMeanings={statistics.totalMeanings}
      />

      <Box sx={{ px: 2, mb: 4 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="영어 용어 또는 한글 번역으로 검색하세요..."
          aria-label="용어 검색"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
          sx={{ mb: 3 }}
        />

        <Typography variant="subtitle2" gutterBottom sx={{ mb: 1 }}>
          알파벳 탐색
        </Typography>
        <AlphabetNavigation
          onLetterClick={handleLetterClick}
          activeLetter={selectedLetter}
        />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap', gap: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {finalFilteredTerms.length}개의 용어 표시 중
          </Typography>
          <Button
            variant="text"
            size="small"
            startIcon={<AddIcon />}
            href="https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml"
            target="_blank"
            rel="noopener noreferrer"
          >
            새 용어 요청
          </Button>
        </Box>
      </Box>

      {finalFilteredTerms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            검색 결과가 없습니다
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            다른 검색어나 필터를 시도해보세요
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml"
            target="_blank"
            rel="noopener noreferrer"
          >
            찾으시는 용어가 없나요? 새 용어를 요청하세요
          </Button>
        </Box>
      ) : (
        <Box sx={{ px: 2 }}>
          <Grid container spacing={3}>
            {finalFilteredTerms.map((term) => {
              const duplicates = statistics.duplicateTranslations.get(term.meanings[0].korean)
              const hasDuplicate = duplicates && duplicates.length > 1
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={term.term}>
                  <TermCard term={term} hasDuplicateTranslation={hasDuplicate} />
                </Grid>
              )
            })}
          </Grid>
        </Box>
      )}
    </Layout>
  )
}
