import { Box, Typography, Container, TextField, InputAdornment, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

interface HeroSectionProps {
  totalTerms: number
  totalMeanings: number
  query: string
  onQueryChange: (query: string) => void
}

export function HeroSection({ totalTerms, totalMeanings, query, onQueryChange }: HeroSectionProps) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #ee4c2c 0%, #2D2D2D 100%)',
        color: 'white',
        pt: { xs: 10, md: 11 },
        pb: { xs: 3, md: 4 },
        mb: 0,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h3"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          AI/ML 용어집
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3, opacity: 0.9 }}>
          AI/ML 한국어 번역 표준화 · {totalTerms} 용어 · {totalMeanings} 의미
        </Typography>
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="영어 용어 또는 한글 번역으로 검색하세요..."
            aria-label="용어 검색"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: query ? (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => onQueryChange('')}
                      aria-label="검색어 지우기"
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </InputAdornment>
                ) : null,
              },
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: 'white',
                borderRadius: '28px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                '& fieldset': { border: 'none' },
              },
              '& .MuiOutlinedInput-input': {
                py: 1.5,
              },
            }}
          />
        </Box>
      </Container>
    </Box>
  )
}
