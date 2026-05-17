import { Box, Container, InputBase, IconButton } from '@mui/material'
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
      component="section"
      sx={{
        bgcolor: 'var(--bg-2)',
        borderBottom: '1px solid var(--ptk-line-soft)',
        py: { xs: 6, md: 9 },
        px: { xs: 2.5, md: 5 },
      }}
    >
      <Container maxWidth="lg" disableGutters>
        <Box
          sx={{
            fontFamily: 'var(--ff-mono)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ptk-orange)',
            mb: 2,
          }}
        >
          Glossary
        </Box>

        <Box
          component="h1"
          sx={{
            fontFamily: 'var(--ff-display)',
            fontWeight: 300,
            fontSize: 'clamp(40px, 6vw, 68px)',
            lineHeight: 1.04,
            letterSpacing: '-0.025em',
            color: 'var(--fg-1)',
            m: 0,
            maxWidth: 900,
          }}
        >
          AI/ML 용어 번역을<br />
          <Box component="span" sx={{ color: 'var(--ptk-orange)', fontWeight: 400 }}>
            한 곳에서
          </Box>
          {' '} 정리합니다
        </Box>

        <Box
          component="p"
          sx={{
            mt: 3,
            mb: 4.5,
            maxWidth: 640,
            fontSize: { xs: 16, md: 17 },
            lineHeight: 1.65,
            color: 'var(--fg-2)',
          }}
        >
          AI/ML 분야의 영문 용어, 한국어 번역, 동의어를 한 번에 검색하고 사람과 AI 번역 도구가 함께 쓸 수 있도록 개선합니다.
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'stretch',
            maxWidth: 720,
            bgcolor: '#fff',
            border: '1px solid var(--ptk-line)',
            transition: 'border-color 120ms, box-shadow 120ms',
            '&:focus-within': {
              borderColor: 'var(--ptk-orange)',
              boxShadow: 'var(--shadow-focus)',
            },
          }}
        >
          <Box sx={{ display: 'grid', placeItems: 'center', px: 2, color: 'var(--fg-3)' }}>
            <SearchIcon />
          </Box>
          <InputBase
            fullWidth
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="영문 용어, 한국어 번역, 동의어 검색"
            inputProps={{ 'aria-label': '용어 검색' }}
            sx={{
              flex: 1,
              fontFamily: 'var(--ff-sans)',
              fontSize: 16,
              color: 'var(--fg-1)',
              '& input': { py: 2, pr: 1 },
            }}
          />
          {query ? (
            <IconButton
              onClick={() => onQueryChange('')}
              aria-label="검색어 지우기"
              sx={{
                mx: 1,
                color: 'var(--fg-3)',
                '&:hover': { color: 'var(--fg-1)' },
              }}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          ) : (
            <Box
              sx={{
                alignSelf: 'center',
                mr: 1.5,
                fontFamily: 'var(--ff-mono)',
                fontSize: 11,
                color: 'var(--fg-3)',
                bgcolor: 'var(--bg-2)',
                border: '1px solid var(--ptk-line-soft)',
                px: 1,
                py: 0.5,
                letterSpacing: '0.04em',
              }}
            >
              실시간
            </Box>
          )}
        </Box>

        <Box
          sx={{
            mt: 3,
            display: 'flex',
            flexWrap: 'wrap',
            gap: { xs: 2.5, md: 4 },
            fontFamily: 'var(--ff-mono)',
            fontSize: 13,
            color: 'var(--fg-3)',
            letterSpacing: '0.02em',
          }}
        >
          <span>
            <Box component="b" sx={{ color: 'var(--fg-1)', fontFamily: 'var(--ff-sans)', fontWeight: 700, mr: 1 }}>
              {totalTerms.toLocaleString()}
            </Box>
            용어
          </span>
          <Box component="span" sx={{ color: 'var(--ptk-line)' }}>/</Box>
          <span>
            <Box component="b" sx={{ color: 'var(--fg-1)', fontFamily: 'var(--ff-sans)', fontWeight: 700, mr: 1 }}>
              {totalMeanings.toLocaleString()}
            </Box>
            의미
          </span>
        </Box>
      </Container>
    </Box>
  )
}
