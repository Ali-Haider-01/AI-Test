import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Palette {
    accent2: Palette['primary'];
    teal: Palette['primary'];
    amber: Palette['primary'];
    rose: Palette['primary'];
  }
  interface PaletteOptions {
    accent2?: PaletteOptions['primary'];
    teal?: PaletteOptions['primary'];
    amber?: PaletteOptions['primary'];
    rose?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#C8622A',
      dark: '#A34D1E',
      light: '#FDF1EB',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#1E4DA8',
      contrastText: '#FFFFFF',
    },
    accent2: {
      main: '#A34D1E',
    },
    teal: {
      main: '#0A5E49',
    },
    amber: {
      main: '#8A5A00',
    },
    rose: {
      main: '#9B2042',
    },
    background: {
      default: '#F4F2EE',
      paper: '#FFFFFF',
    },
    text: {
      primary: '#1C1A16',
      secondary: '#5A5750',
      disabled: '#9E9B93',
    },
    divider: 'rgba(28,26,22,0.1)',
    error: {
      main: '#9B2042',
    },
    success: {
      main: '#0A5E49',
    },
    warning: {
      main: '#8A5A00',
    },
    info: {
      main: '#1E4DA8',
    },
  },
  typography: {
    fontFamily: "'Instrument Sans', Arial, sans-serif",
    h1: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Syne', Arial, sans-serif",
      fontWeight: 600,
    },
    body1: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
      lineHeight: 1.6,
    },
    body2: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
      lineHeight: 1.6,
    },
    button: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
      fontWeight: 500,
      textTransform: 'none',
    },
    caption: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
    },
    overline: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
    },
    subtitle1: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
    },
    subtitle2: {
      fontFamily: "'Instrument Sans', Arial, sans-serif",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
    '0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.05)',
    '0 4px 12px rgba(0,0,0,0.09), 0 8px 24px rgba(0,0,0,0.06)',
    '0 6px 16px rgba(0,0,0,0.10), 0 12px 32px rgba(0,0,0,0.07)',
    '0 8px 20px rgba(0,0,0,0.11), 0 16px 40px rgba(0,0,0,0.08)',
    '0 10px 24px rgba(0,0,0,0.12), 0 20px 48px rgba(0,0,0,0.09)',
    '0 12px 28px rgba(0,0,0,0.13), 0 24px 56px rgba(0,0,0,0.10)',
    '0 14px 32px rgba(0,0,0,0.14), 0 28px 64px rgba(0,0,0,0.11)',
    '0 16px 36px rgba(0,0,0,0.15), 0 32px 72px rgba(0,0,0,0.12)',
    '0 18px 40px rgba(0,0,0,0.16), 0 36px 80px rgba(0,0,0,0.13)',
    '0 20px 44px rgba(0,0,0,0.17), 0 40px 88px rgba(0,0,0,0.14)',
    '0 22px 48px rgba(0,0,0,0.18), 0 44px 96px rgba(0,0,0,0.15)',
    '0 24px 52px rgba(0,0,0,0.19), 0 48px 104px rgba(0,0,0,0.16)',
    '0 26px 56px rgba(0,0,0,0.20), 0 52px 112px rgba(0,0,0,0.17)',
    '0 28px 60px rgba(0,0,0,0.21), 0 56px 120px rgba(0,0,0,0.18)',
    '0 30px 64px rgba(0,0,0,0.22), 0 60px 128px rgba(0,0,0,0.19)',
    '0 32px 68px rgba(0,0,0,0.23), 0 64px 136px rgba(0,0,0,0.20)',
    '0 34px 72px rgba(0,0,0,0.24), 0 68px 144px rgba(0,0,0,0.21)',
    '0 36px 76px rgba(0,0,0,0.25), 0 72px 152px rgba(0,0,0,0.22)',
    '0 38px 80px rgba(0,0,0,0.26), 0 76px 160px rgba(0,0,0,0.23)',
    '0 40px 84px rgba(0,0,0,0.27), 0 80px 168px rgba(0,0,0,0.24)',
    '0 42px 88px rgba(0,0,0,0.28), 0 84px 176px rgba(0,0,0,0.25)',
    '0 44px 92px rgba(0,0,0,0.29), 0 88px 184px rgba(0,0,0,0.26)',
    '0 46px 96px rgba(0,0,0,0.30), 0 92px 192px rgba(0,0,0,0.27)',
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          fontFamily: "'Instrument Sans', Arial, sans-serif",
          fontWeight: 500,
          textTransform: 'none',
        },
        contained: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.08), 0 6px 20px rgba(0,0,0,0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontFamily: "'Instrument Sans', Arial, sans-serif",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "'Instrument Sans', Arial, sans-serif",
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: "'Instrument Sans', Arial, sans-serif",
        },
      },
    },
  },
});
