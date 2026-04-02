/**
 * Shared design tokens — single source of truth.
 * Import this instead of redefining COLORS/DS in every file.
 * These mirror the MUI theme palette so you can use either.
 */
export const T = {
  bg: '#F4F2EE',
  bg2: '#ECEAE4',
  white: '#FFFFFF',
  text: '#1C1A16',
  text2: '#5A5750',
  text3: '#9E9B93',
  accent: '#C8622A',
  accentDark: '#A34D1E',
  accentLt: '#FDF1EB',
  blue: '#1E4DA8',
  teal: '#0A5E49',
  rose: '#9B2042',
  border: 'rgba(28,26,22,0.1)',
  borderLight: '#E0DDD6',
} as const;
