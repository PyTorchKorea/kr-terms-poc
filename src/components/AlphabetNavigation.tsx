import { Box, Container } from '@mui/material'

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
        zIndex: 5,
        bgcolor: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid var(--ptk-line-soft)',
      }}
    >
      <Container maxWidth="lg" disableGutters sx={{ px: { xs: 2.5, md: 5 } }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            py: 1.5,
            overflowX: { xs: 'auto', md: 'visible' },
            '&::-webkit-scrollbar': { height: 4 },
            '&::-webkit-scrollbar-thumb': { backgroundColor: 'var(--ptk-line)' },
          }}
        >
          <Box
            component="span"
            sx={{
              fontFamily: 'var(--ff-mono)',
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--fg-3)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              mr: 2,
              flexShrink: 0,
            }}
          >
            A–Z
          </Box>

          <LetterButton
            label="ALL"
            active={activeLetter === null}
            onClick={onClearFilter}
            ariaLabel="전체 용어 보기"
          />

          {ALPHABET.map((letter) => (
            <LetterButton
              key={letter}
              label={letter}
              active={activeLetter === letter}
              onClick={() => onLetterClick(letter)}
              ariaLabel={`${letter}로 시작하는 용어 필터`}
            />
          ))}
        </Box>
      </Container>
    </Box>
  )
}

interface LetterButtonProps {
  label: string
  active: boolean
  onClick: () => void
  ariaLabel: string
}

function LetterButton({ label, active, onClick, ariaLabel }: LetterButtonProps) {
  return (
    <Box
      component="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={active}
      sx={{
        flexShrink: 0,
        minWidth: 36,
        height: 32,
        px: label.length > 1 ? 1.25 : 0,
        display: 'inline-grid',
        placeItems: 'center',
        fontFamily: 'var(--ff-mono)',
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: '0.04em',
        cursor: 'pointer',
        border: '1px solid',
        borderColor: active ? 'var(--ptk-orange)' : 'transparent',
        bgcolor: active ? 'var(--ptk-orange)' : 'transparent',
        color: active ? '#fff' : 'var(--fg-2)',
        transition: 'all 120ms ease',
        borderRadius: 0,
        '&:hover': {
          color: active ? '#fff' : 'var(--ptk-orange)',
          bgcolor: active ? 'var(--ptk-orange)' : 'var(--bg-2)',
        },
      }}
    >
      {label}
    </Box>
  )
}
