import { Box, Chip } from '@mui/material'

interface AlphabetNavigationProps {
  onLetterClick: (letter: string) => void
  activeLetter: string | null
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function AlphabetNavigation({ onLetterClick, activeLetter }: AlphabetNavigationProps) {
  return (
    <Box
      role="navigation"
      aria-label="알파벳 탐색"
      sx={{
        display: 'flex',
        gap: 1,
        justifyContent: { xs: 'flex-start', sm: 'center' },
        mb: 3,
        overflowX: { xs: 'auto', sm: 'visible' },
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        pb: { xs: 1, sm: 0 },
        '&::-webkit-scrollbar': { height: 4 },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2 },
      }}
    >
      {ALPHABET.map((letter) => (
        <Chip
          key={letter}
          label={letter}
          onClick={() => onLetterClick(letter)}
          color={activeLetter === letter ? 'primary' : 'default'}
          variant={activeLetter === letter ? 'filled' : 'outlined'}
          aria-label={`${letter}로 시작하는 용어 필터`}
          aria-pressed={activeLetter === letter}
          sx={{
            minWidth: 40,
            cursor: 'pointer',
            fontWeight: activeLetter === letter ? 700 : 400,
            flexShrink: 0,
          }}
        />
      ))}
    </Box>
  )
}
