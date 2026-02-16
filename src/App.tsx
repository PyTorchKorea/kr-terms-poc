import React, { lazy, Suspense } from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CircularProgress, Box } from '@mui/material'
import { theme } from './theme'

const SearchPage = lazy(() => import('./pages/SearchPage').then(m => ({ default: m.SearchPage })))
const TermDetailPage = lazy(() => import('./pages/TermDetailPage').then(m => ({ default: m.TermDetailPage })))
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })))

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
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/term/:termId" element={<TermDetailPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </HashRouter>
    </ThemeProvider>
  )
}
