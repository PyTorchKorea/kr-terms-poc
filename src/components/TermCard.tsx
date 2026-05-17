import React from 'react'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Term } from '../types/term'

interface TermCardProps {
  term: Term
  hasDuplicateTranslation?: boolean
  query?: string
}

function highlightText(text: string, query: string | undefined): React.ReactNode {
  if (!query || query.trim() === '') return text
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = text.split(new RegExp(`(${escaped})`, 'gi'))
  if (parts.length === 1) return text
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={i}>{part}</mark>
      : part
  )
}

export function TermCard({ term, hasDuplicateTranslation, query }: TermCardProps): React.ReactNode {
  const navigate = useNavigate()

  const firstMeaning = term.meanings[0]
  const hasMultipleMeanings = term.meanings.length > 1
  const firstSynonym = firstMeaning.synonyms.length > 0 ? firstMeaning.synonyms[0] : null

  const handleClick = (): void => {
    navigate(`/term/${encodeURIComponent(term.term)}`)
  }

  return (
    <Box
      component="article"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        bgcolor: '#fff',
        border: '1px solid var(--ptk-line-soft)',
        borderRadius: 0,
        p: 2.5,
        cursor: 'pointer',
        transition: 'border-color 120ms ease, background 120ms ease',
        '&:hover': {
          borderColor: 'var(--fg-1)',
        },
        '&:hover .term-name-underline': {
          backgroundSize: '100% 1px',
        },
        '&:focus-visible': {
          outline: '2px solid var(--ptk-orange)',
          outlineOffset: 2,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, mb: 1 }}>
        <Typography
          component="h2"
          className="term-name-underline"
          sx={{
            flex: 1,
            fontFamily: 'var(--ff-display)',
            fontWeight: 700,
            fontSize: '1.35rem',
            lineHeight: 1.2,
            letterSpacing: '-0.01em',
            color: 'var(--fg-1)',
            backgroundImage: 'linear-gradient(var(--fg-1), var(--fg-1))',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '0 100%',
            backgroundSize: '0% 1px',
            transition: 'background-size 200ms ease',
            wordBreak: 'break-word',
          }}
        >
          {highlightText(term.term, query)}
        </Typography>

        {hasMultipleMeanings && (
          <Box
            sx={{
              flexShrink: 0,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 0.75,
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#fff',
              bgcolor: 'var(--ptk-purple)',
              px: 1.25,
              py: 0.625,
              borderRadius: 0,
              whiteSpace: 'nowrap',
              lineHeight: 1,
              boxShadow: '2px 2px 0 0 rgba(129,44,229,0.18)',
            }}
            aria-label={`다중 의미 (${term.meanings.length}개)`}
          >
            <Box
              component="span"
              sx={{
                width: 5,
                height: 5,
                bgcolor: '#fff',
                borderRadius: '50%',
                opacity: 0.95,
              }}
            />
            다중 의미
            <Box
              component="span"
              sx={{
                pl: 0.75,
                ml: 0.25,
                borderLeft: '1px solid rgba(255,255,255,0.4)',
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              {term.meanings.length}
            </Box>
          </Box>
        )}
      </Box>

      <Typography
        component="div"
        sx={{
          fontSize: '1rem',
          fontWeight: 500,
          color: 'var(--ptk-orange)',
          mb: 1,
          lineHeight: 1.4,
        }}
      >
        {highlightText(firstMeaning.korean, query)}
      </Typography>

      <Typography
        sx={{
          fontSize: 14,
          lineHeight: 1.55,
          color: 'var(--fg-2)',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          mb: 1.5,
          flex: 1,
        }}
      >
        {firstMeaning.definition}
      </Typography>

      <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap', mt: 'auto' }}>
        {firstSynonym && (
          <Box
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--fg-2)',
              border: '1px solid var(--ptk-line-soft)',
              bgcolor: 'var(--bg-3)',
              px: 1,
              py: 0.5,
              maxWidth: 200,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              letterSpacing: '0.02em',
            }}
          >
            {firstSynonym}
          </Box>
        )}
        {hasDuplicateTranslation && (
          <Box
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: '#b07300',
              border: '1px solid rgba(255,193,7,0.5)',
              bgcolor: 'rgba(255,193,7,0.1)',
              px: 1,
              py: 0.5,
            }}
          >
            중복 번역
          </Box>
        )}
      </Box>
    </Box>
  )
}
