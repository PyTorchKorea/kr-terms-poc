import React from 'react'
import { AppBar, Toolbar, Typography, Container, Box, IconButton, Link, Button } from '@mui/material'
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
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isHomePage && (
        <AppBar position="static" elevation={2}>
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, cursor: 'pointer', fontWeight: 600 }}
              onClick={() => navigate('/')}
            >
              terms.kr
            </Typography>
            <Button color="inherit" onClick={() => navigate('/about')} sx={{ mr: 1 }}>
              소개
            </Button>
            <IconButton
              color="inherit"
              href="https://github.com/9bow/terms-kr"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub 저장소"
            >
              <GitHubIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}

      <Box component="main" sx={{ flex: 1 }}>
        {isHomePage ? (
          children
        ) : (
          <Container sx={{ py: 4 }}>{children}</Container>
        )}
      </Box>

      <Box
        component="footer"
        sx={{
          py: 4,
          px: 2,
          mt: 'auto',
          bgcolor: 'grey.100',
          borderTop: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="body2" color="text.secondary" align="center" gutterBottom>
            terms.kr - 오픈소스 프로젝트
          </Typography>
          <Typography variant="caption" color="text.secondary" align="center" display="block">
            <Link
              href="https://github.com/9bow/terms-kr"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
              underline="hover"
            >
              GitHub에서 기여하기
            </Link>
            {' · '}
            <Link component="button" onClick={() => navigate('/about')} color="primary" underline="hover">
              프로젝트 소개
            </Link>
            {' · '}
            <Link
              href="https://github.com/9bow/terms-kr/issues"
              target="_blank"
              rel="noopener noreferrer"
              color="primary"
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
