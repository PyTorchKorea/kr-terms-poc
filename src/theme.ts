import { createTheme } from '@mui/material/styles'

/**
 * MUI theme aligned with the PyTorchKR design system.
 * Tokens live in src/styles/design-tokens.css; this file
 * re-exposes them through MUI so existing components inherit
 * brand colors, type, square corners, and flat surfaces.
 */
const FONT_SANS = '"Noto Sans KR", "Source Sans 3", "Helvetica Neue", Helvetica, Arial, sans-serif'
const FONT_DISPLAY = '"Source Sans 3", "Noto Sans KR", "Helvetica Neue", Helvetica, Arial, sans-serif'
const FONT_MONO = '"IBM Plex Mono", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'

export const theme = createTheme({
  palette: {
    primary: {
      main: '#EE4C2C',
      dark: '#D63916',
      light: '#F26C50',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#262626',
      light: '#4D5154',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#262626',
      secondary: '#4D5154',
      disabled: '#8C8C8C',
    },
    divider: '#E2E2E2',
    warning: { main: '#FFC107' },
    success: { main: '#198754' },
    info: { main: '#0DCAF0' },
    error: { main: '#DC3545' },
  },
  shape: {
    borderRadius: 4,
  },
  typography: {
    fontFamily: FONT_SANS,
    h1: {
      fontFamily: FONT_DISPLAY,
      fontSize: 'clamp(40px, 5.5vw, 60px)',
      fontWeight: 300,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: FONT_DISPLAY,
      fontSize: '36px',
      fontWeight: 300,
      lineHeight: 1.15,
      letterSpacing: '-0.015em',
    },
    h3: {
      fontFamily: FONT_DISPLAY,
      fontSize: '28px',
      fontWeight: 400,
      lineHeight: 1.2,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontFamily: FONT_DISPLAY,
      fontSize: '22px',
      fontWeight: 400,
      lineHeight: 1.25,
    },
    h5: {
      fontFamily: FONT_DISPLAY,
      fontSize: '18px',
      fontWeight: 600,
      lineHeight: 1.3,
    },
    h6: {
      fontFamily: FONT_SANS,
      fontSize: '16px',
      fontWeight: 700,
      lineHeight: 1.3,
    },
    body1: { fontSize: '16px', lineHeight: 1.65 },
    body2: { fontSize: '14px', lineHeight: 1.6 },
    caption: { fontSize: '12px', lineHeight: 1.5, fontFamily: FONT_MONO, letterSpacing: '0.04em' },
    button: { fontWeight: 700, letterSpacing: '0.02em' },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { fontFamily: FONT_SANS },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 700,
          paddingTop: 9,
          paddingBottom: 9,
          paddingLeft: 18,
          paddingRight: 18,
        },
        containedPrimary: {
          backgroundColor: '#EE4C2C',
          color: '#FFFFFF',
          '&:hover': { backgroundColor: '#D63916' },
        },
        outlinedPrimary: {
          borderColor: '#CCCDD1',
          color: '#262626',
          '&:hover': { borderColor: '#EE4C2C', color: '#EE4C2C', backgroundColor: 'transparent' },
        },
        textPrimary: {
          color: '#EE4C2C',
          '&:hover': { color: '#D63916', backgroundColor: 'transparent', textDecoration: 'underline' },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        rounded: { borderRadius: 4 },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #E2E2E2',
          boxShadow: 'none',
          transition: 'border-color 120ms ease, transform 120ms ease',
          '&:hover': {
            borderColor: '#262626',
            transform: 'none',
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontFamily: FONT_MONO,
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.04em',
          height: 28,
        },
        outlined: {
          borderColor: '#E2E2E2',
          color: '#4D5154',
          '&:hover': { borderColor: '#262626' },
        },
        colorPrimary: {
          backgroundColor: '#EE4C2C',
          color: '#FFFFFF',
        },
      },
    },
    MuiAccordion: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
          border: '1px solid #E2E2E2',
          boxShadow: 'none',
          '&:before': { display: 'none' },
          '&.Mui-expanded': { margin: '0 0 16px' },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          paddingLeft: 20,
          paddingRight: 20,
          minHeight: 60,
          '&.Mui-expanded': { minHeight: 60 },
        },
        content: {
          margin: '14px 0',
          '&.Mui-expanded': { margin: '14px 0' },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: { padding: '0 20px 20px' },
      },
    },
    MuiAppBar: {
      defaultProps: { elevation: 0, color: 'default' },
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#262626',
          borderBottom: '1px solid #E2E2E2',
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontFamily: FONT_SANS,
          '& fieldset': { borderColor: '#CCCDD1' },
          '&:hover fieldset': { borderColor: '#979797' },
          '&.Mui-focused fieldset': { borderColor: '#EE4C2C', borderWidth: 1 },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid',
          fontFamily: FONT_SANS,
        },
        standardInfo: {
          backgroundColor: '#F3F4F7',
          borderColor: '#CCCDD1',
          color: '#262626',
        },
        standardSuccess: {
          backgroundColor: 'rgba(25,135,84,0.06)',
          borderColor: 'rgba(25,135,84,0.4)',
          color: '#262626',
        },
        standardWarning: {
          backgroundColor: 'rgba(255,193,7,0.08)',
          borderColor: 'rgba(255,193,7,0.5)',
          color: '#262626',
        },
        standardError: {
          backgroundColor: 'rgba(220,53,69,0.06)',
          borderColor: 'rgba(220,53,69,0.4)',
          color: '#262626',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        maxWidthLg: {
          '@media (min-width: 1200px)': { maxWidth: 1320 },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: '#EE4C2C',
          textDecorationColor: 'rgba(238,76,44,0.4)',
          '&:hover': { color: '#D63916' },
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          fontFamily: FONT_MONO,
          fontWeight: 700,
          backgroundColor: '#812CE5',
          color: '#FFFFFF',
        },
      },
    },
  },
})
