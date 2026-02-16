import { Box, Typography, Container, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'

interface HeroSectionProps {
  totalTerms: number
  totalMeanings: number
}

export function HeroSection({ totalTerms, totalMeanings }: HeroSectionProps) {
  const navigate = useNavigate()

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: 8,
        mb: 4,
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          terms.kr
        </Typography>
        <Typography variant="h6" align="center" sx={{ mb: 3, opacity: 0.95 }}>
          인공지능과 머신러닝 용어의 한국어 번역을 표준화합니다
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalTerms}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              총 용어 수
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h4" sx={{ fontWeight: 700 }}>
              {totalMeanings}
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>
              총 의미 수
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/about')}
            sx={{ mt: 3, color: 'white', borderColor: 'rgba(255,255,255,0.5)', '&:hover': { borderColor: 'white', backgroundColor: 'rgba(255,255,255,0.1)' } }}
          >
            프로젝트 소개
          </Button>
        </Box>
      </Container>
    </Box>
  )
}
