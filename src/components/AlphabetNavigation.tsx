import { Box, Chip } from '@mui/material'

interface AlphabetNavigationProps {
  onLetterClick: (letter: string) => void
  activeLetter: string | null
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function AlphabetNavigation({ onLetterClick, activeLetter }: AlphabetNavigationProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 1,
        justifyContent: 'center',
        mb: 3,
      }}
    >
      {ALPHABET.map((letter) => (
        <Chip
          key={letter}
          label={letter}
          onClick={() => onLetterClick(letter)}
          color={activeLetter === letter ? 'primary' : 'default'}
          variant={activeLetter === letter ? 'filled' : 'outlined'}
          sx={{
            minWidth: 40,
            cursor: 'pointer',
            fontWeight: activeLetter === letter ? 700 : 400,
          }}
        />
      ))}
    </Box>
  )
}
