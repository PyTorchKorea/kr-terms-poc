import React, { useRef, useEffect } from 'react'
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Link, Button } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate, useLocation } from 'react-router-dom'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): React.ReactNode {
  const navigate = useNavigate()
  const location = useLocation()
  const isHomePage = location.pathname === '/' || location.pathname === ''
  const appBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isHomePage) return

    const handleScroll = () => {
      if (!appBarRef.current) return
      const scrolled = window.scrollY > 60
      appBarRef.current.style.backgroundColor = scrolled ? '#262626' : 'transparent'
      appBarRef.current.style.boxShadow = scrolled ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isHomePage])

  const handleSearchClick = () => {
    if (isHomePage) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        ref={appBarRef}
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: isHomePage ? 'transparent' : '#262626',
          transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
          zIndex: 20,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 600 }}
            onClick={() => navigate('/')}
          >
            AI/ML 용어집
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleSearchClick}
            aria-label="검색"
            sx={{ mr: 0.5, minHeight: 44, minWidth: 44 }}
          >
            <SearchIcon />
          </IconButton>
          <Button
            color="inherit"
            onClick={() => navigate('/about')}
            sx={{ mr: 1, minHeight: 44 }}
          >
            소개
          </Button>
          <IconButton
            color="inherit"
            href="https://github.com/PyTorchKorea/kr-terms-poc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub 저장소"
            sx={{ minHeight: 44, minWidth: 44 }}
          >
            <GitHubIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flex: 1, pt: 'var(--header-height)' }}>
        {isHomePage ? (
          children
        ) : (
          <Container maxWidth="lg" sx={{ py: 4, px: { xs: 2, md: 3 } }}>{children}</Container>
        )}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 2.5,
          px: 2,
          mt: 'auto',
          bgcolor: '#262626',
          color: '#f3f4f7',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" sx={{ color: '#CCCDD1' }} align="center" gutterBottom>
            terms.kr - PyTorchKR 오픈소스 프로젝트
          </Typography>
          <Typography variant="caption" sx={{ color: '#6c6c6d' }} align="center" display="block">
            <Link
              href="https://github.com/PyTorchKorea/kr-terms-poc"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#ee4c2c', '&:hover': { color: '#f26849' }, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
              underline="hover"
            >
              GitHub에서 기여하기
            </Link>
            {' · '}
            <Link
              component="button"
              onClick={() => navigate('/about')}
              sx={{ color: '#ee4c2c', '&:hover': { color: '#f26849' }, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
              underline="hover"
            >
              프로젝트 소개
            </Link>
            {' · '}
            <Link
              href="https://github.com/PyTorchKorea/kr-terms-poc/issues"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: '#ee4c2c', '&:hover': { color: '#f26849' }, minHeight: 44, display: 'inline-flex', alignItems: 'center' }}
              underline="hover"
            >
              이슈 제기
            </Link>
          </Typography>
        </Container>
      </Box>
    </Box>
  )
}
