import React from 'react'
import { Card, CardContent, Typography, Chip, Box, CardActionArea, Badge } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import type { Term } from '../types/term'

interface TermCardProps {
  term: Term
  hasDuplicateTranslation?: boolean
}

export function TermCard({ term, hasDuplicateTranslation }: TermCardProps): React.ReactNode {
  const navigate = useNavigate()

  const firstMeaning = term.meanings[0]
  const hasMultipleMeanings = term.meanings.length > 1

  const handleClick = (): void => {
    navigate(`/term/${encodeURIComponent(term.term)}`)
  }

  return (
    <Card sx={{ height: '100%', position: 'relative' }}>
      <CardActionArea onClick={handleClick} sx={{ height: '100%' }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
            <Typography variant="h6" component="h2" sx={{ flexGrow: 1 }}>
              {term.term}
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
          <Typography variant="body1" color="text.secondary" gutterBottom>
            {firstMeaning.korean}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', gap: 1, alignItems: 'center' }}>
            {hasDuplicateTranslation && (
              <Chip
                label="중복"
                size="small"
                variant="outlined"
                color="warning"
                sx={{ fontWeight: 500 }}
              />
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
