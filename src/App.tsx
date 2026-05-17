import React, { lazy, Suspense, useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CircularProgress, Box } from '@mui/material'
import { theme } from './theme'

const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })))
const TermDetailPage = lazy(() => import('./pages/TermDetailPage').then(m => ({ default: m.TermDetailPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))
const GuidePage = lazy(() => import('./pages/GuidePage').then(m => ({ default: m.GuidePage })))

function ScrollToTop(): null {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function LoadingFallback(): React.ReactNode {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <CircularProgress />
    </Box>
  )
}

export function App(): React.ReactNode {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <HashRouter>
        <ScrollToTop />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/term/:termId" element={<TermDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/guide" element={<GuidePage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  )
}
