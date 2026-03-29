import React from 'react'
import { Card, CardContent, Typography, Chip, Box, CardActionArea, Badge } from '@mui/material'
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
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Typography
              variant="h6"
              component="h2"
              sx={{ flexGrow: 1, fontWeight: 700, fontSize: '1.15rem' }}
            >
              {highlightText(term.term, query)}
            </Typography>
            {hasMultipleMeanings && (
              <Badge
                badgeContent={term.meanings.length}
                color="secondary"
                sx={{
                  '& .MuiBadge-badge': {
                    fontSize: '0.75rem',
                    height: 20,
                    minWidth: 20,
                  },
                }}
              />
            )}
          </Box>
          <Typography
            variant="body1"
            sx={{ color: 'primary.main', fontWeight: 500, mb: 0.5 }}
          >
            {highlightText(firstMeaning.korean, query)}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              mb: 1,
            }}
          >
            {firstMeaning.definition}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', flexWrap: 'wrap' }}>
            {hasDuplicateTranslation && (
              <Chip
                label="중복"
                size="small"
                variant="outlined"
                color="warning"
                sx={{ fontWeight: 500 }}
              />
            )}
            {firstSynonym && (
              <Chip
                label={firstSynonym}
                size="small"
                variant="outlined"
                sx={{ maxWidth: 120, '& .MuiChip-label': { overflow: 'hidden', textOverflow: 'ellipsis' } }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
