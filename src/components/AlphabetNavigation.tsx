import { Box, Chip } from '@mui/material'

interface AlphabetNavigationProps {
  onLetterClick: (letter: string) => void
  onClearFilter: () => void
  activeLetter: string | null
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function AlphabetNavigation({ onLetterClick, onClearFilter, activeLetter }: AlphabetNavigationProps) {
  return (
    <Box
      role="navigation"
      aria-label="알파벳 탐색"
      sx={{
        position: 'sticky',
        top: 'var(--header-height)',
        zIndex: 10,
        backgroundColor: 'rgba(247,247,248,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        py: 1.5,
        px: 2,
        display: 'flex',
        gap: 1,
        justifyContent: { xs: 'flex-start', sm: 'center' },
        mb: 3,
        overflowX: { xs: 'auto', sm: 'visible' },
        flexWrap: { xs: 'nowrap', sm: 'wrap' },
        '&::-webkit-scrollbar': { height: 4 },
        '&::-webkit-scrollbar-thumb': { backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: 2 },
      }}
    >
      <Chip
        label="전체"
        onClick={onClearFilter}
        color={activeLetter === null ? 'primary' : 'default'}
        variant={activeLetter === null ? 'filled' : 'outlined'}
        aria-label="전체 용어 보기"
        aria-pressed={activeLetter === null}
        sx={{
          minWidth: 44,
          cursor: 'pointer',
          fontWeight: activeLetter === null ? 700 : 400,
          flexShrink: 0,
        }}
      />
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
            minWidth: 44,
            cursor: 'pointer',
            fontWeight: activeLetter === letter ? 700 : 400,
            flexShrink: 0,
          }}
        />
      ))}
    </Box>
  )
}
