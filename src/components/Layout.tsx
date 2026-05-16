import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Link, Button, Stack } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import { useNavigate, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.ReactNode {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === ''

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'var(--bg-1)' }}>
      <AppBar position="sticky" elevation={0}>
        <Container maxWidth="lg" disableGutters>
          <Toolbar
            sx={{
              minHeight: 'var(--header-height) !important',
              px: { xs: 2.5, md: 5 },
              gap: 3,
            }}
          >
            <Box
              onClick={() => navigate('/')}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.25,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <Box
                component="span"
                sx={{
                  width: 28,
                  height: 28,
                  display: 'inline-grid',
                  placeItems: 'center',
                  bgcolor: 'var(--ptk-orange)',
                  color: '#fff',
                  fontFamily: 'var(--ff-mono)',
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 0,
                }}
              >
                kr
              </Box>
              <Typography
                component="div"
                sx={{
                  fontFamily: 'var(--ff-display)',
                  fontWeight: 700,
                  fontSize: 17,
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  color: 'var(--fg-1)',
                }}
              >
                AI/ML 용어집
                <Box
                  component="span"
                  sx={{
                    ml: 1.5,
                    pl: 1.5,
                    borderLeft: '1px solid var(--ptk-line)',
                    fontFamily: 'var(--ff-mono)',
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--fg-3)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                  }}
                >
                  PyTorchKR
                </Box>
              </Typography>
            </Box>

            <Box sx={{ flex: 1 }} />

            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/about')}
                sx={{
                  display: { xs: 'none', sm: 'inline-flex' },
                  color: 'var(--fg-1)',
                  fontSize: 14,
                  fontWeight: 700,
                  '&:hover': { color: 'var(--ptk-orange)', bgcolor: 'transparent' },
                }}
              >
                소개
              </Button>
              <Button
                variant="outlined"
                href="https://github.com/PyTorchKorea/kr-terms-poc/issues/new?template=new-term.yml"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: { xs: 'none', md: 'inline-flex' },
                  fontSize: 13,
                  py: 1,
                  px: 2,
                }}
              >
                새 용어 요청
              </Button>
              <IconButton
                href="https://github.com/PyTorchKorea/kr-terms-poc"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub 저장소"
                sx={{
                  color: 'var(--fg-2)',
                  '&:hover': { color: 'var(--ptk-orange)', bgcolor: 'transparent' },
                  minHeight: 44,
                  minWidth: 44,
                }}
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      <Box component="main" sx={{ flex: 1 }}>
        {isHomePage ? (
          children
        ) : (
          <Container maxWidth="lg" sx={{ py: { xs: 5, md: 7 }, px: { xs: 2.5, md: 5 } }}>{children}</Container>
        )}
      </Box>

      <Box
        component="footer"
        sx={{
          mt: 'auto',
          bgcolor: 'var(--ptk-ink-strong)',
          color: 'rgba(255,255,255,0.78)',
          py: { xs: 4, md: 5 },
          px: { xs: 2.5, md: 5 },
        }}
      >
        <Container maxWidth="lg" disableGutters>
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              alignItems: { xs: 'flex-start', md: 'center' },
              gap: { xs: 2, md: 4 },
            }}
          >
            <Box
              sx={{
                fontFamily: 'var(--ff-display)',
                fontSize: 16,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                color: '#fff',
              }}
            >
              AI/ML 용어집
              <Box
                component="span"
                sx={{
                  ml: 1.5,
                  pl: 1.5,
                  borderLeft: '1px solid rgba(255,255,255,0.2)',
                  fontFamily: 'var(--ff-mono)',
                  fontSize: 11,
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.55)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                terms.kr
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: { xs: 2, md: 3 },
                fontSize: 13,
                fontFamily: 'var(--ff-sans)',
              }}
            >
              <Link
                href="https://github.com/PyTorchKorea/kr-terms-poc"
                target="_blank"
                rel="noopener noreferrer"
                sx={footerLinkSx}
              >
                GitHub
              </Link>
              <Link
                component="button"
                onClick={() => navigate('/about')}
                sx={footerLinkSx}
              >
                프로젝트 소개
              </Link>
              <Link
                href="https://github.com/PyTorchKorea/kr-terms-poc/issues"
                target="_blank"
                rel="noopener noreferrer"
                sx={footerLinkSx}
              >
                이슈 제기
              </Link>
              <Link href="https://pytorch.kr" target="_blank" rel="noopener noreferrer" sx={footerLinkSx}>
                pytorch.kr
              </Link>
            </Box>

            <Box
              sx={{
                ml: { md: 'auto' },
                fontFamily: 'var(--ff-mono)',
                fontSize: 11,
                color: 'rgba(255,255,255,0.45)',
                letterSpacing: '0.04em',
                maxWidth: 420,
                lineHeight: 1.5,
              }}
            >
              파이토치 한국 사용자 모임이 운영하는 독립 커뮤니티 프로젝트입니다. 용어는 합의된 번역이며 분야별로 다른 표기가 통용될 수 있습니다.
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}

const footerLinkSx = {
  color: 'rgba(255,255,255,0.85)',
  textDecoration: 'none',
  fontWeight: 500,
  '&:hover': { color: 'var(--ptk-orange)', textDecoration: 'underline' },
  border: 0,
  background: 'transparent',
  cursor: 'pointer',
  font: 'inherit',
  padding: 0,
} as const
