import React, { useState, useMemo } from 'react'
import { TextField, Grid, Typography, Box, InputAdornment, Skeleton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { Layout } from '../components/Layout'
import { TermCard } from '../components/TermCard'
import { HeroSection } from '../components/HeroSection'
import { AlphabetNavigation } from '../components/AlphabetNavigation'
import { useTerms } from '../hooks/useTerms'
import { useSearch } from '../hooks/useSearch'
import { calculateStatistics } from '../utils/statistics'

export function SearchPage(): React.ReactNode {
  const [query, setQuery] = useState('')
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null)
  const { terms, loading, error } = useTerms()
  const filteredTerms = useSearch(terms, query)

  const statistics = useMemo(() => calculateStatistics(terms), [terms])

  const finalFilteredTerms = useMemo(() => {
    let result = filteredTerms

    if (selectedLetter) {
      result = result.filter((term) =>
        term.term.toUpperCase().startsWith(selectedLetter)
      )
    }

    return result
  }, [filteredTerms, selectedLetter])

  const handleLetterClick = (letter: string): void => {
    setSelectedLetter((prev) => (prev === letter ? null : letter))
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
          value={query}
          onChange={(e) => setQuery(e.target.value)}
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

        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {finalFilteredTerms.length}개의 용어 표시 중
        </Typography>
      </Box>

      {finalFilteredTerms.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            검색 결과가 없습니다
          </Typography>
          <Typography variant="body2" color="text.secondary">
            다른 검색어나 필터를 시도해보세요
          </Typography>
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
