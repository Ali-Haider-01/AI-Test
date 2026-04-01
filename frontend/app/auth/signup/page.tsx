'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Link,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuth } from '@/lib/store';
import api from '@/lib/api';

const COLORS = {
  bg: '#F4F2EE',
  white: '#FFFFFF',
  text: '#1C1A16',
  text2: '#5A5750',
  text3: '#9E9B93',
  accent: '#C8622A',
  accentLt: '#FDF1EB',
};

export default function SignupPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validate = (): string => {
    if (!name.trim()) return 'Name is required.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Enter a valid email address.';
    if (password.length < 8) return 'Password must be at least 8 characters.';
    if (password !== confirmPassword) return 'Passwords do not match.';
    if (!agreed) return 'You must agree to the Terms & Privacy Policy.';
    return '';
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/signup', { name, email, password });
      const { access_token: token, user } = res.data;
      localStorage.setItem('nexusai_token', token);
      localStorage.setItem('nexusai_user', JSON.stringify(user));
      dispatch(setAuth({ user, token }));
      router.push('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: COLORS.bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
        fontFamily: "'Instrument Sans', sans-serif",
      }}
    >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 460,
          borderRadius: 3,
          border: '1px solid #E0DDD6',
          bgcolor: COLORS.white,
          boxShadow: '0 4px 24px rgba(28,26,22,0.07)',
        }}
      >
        <CardContent sx={{ p: 5 }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                bgcolor: COLORS.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                sx={{
                  color: COLORS.white,
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 700,
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                N
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                fontSize: 20,
                color: COLORS.text,
                letterSpacing: '-0.3px',
              }}
            >
              NexusAI
            </Typography>
          </Box>

          {/* Heading */}
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 26,
              color: COLORS.text,
              mb: 0.5,
              letterSpacing: '-0.4px',
            }}
          >
            Create your account
          </Typography>
          <Typography sx={{ color: COLORS.text2, fontSize: 14, mb: 3.5 }}>
            Start exploring the best AI models today
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, fontSize: 13 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSignup} noValidate>
            <TextField
              label="Full name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
            />
            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
              helperText="Minimum 8 characters"
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowPassword(!showPassword)} edge="end">
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Confirm password"
              type={showConfirm ? 'text' : 'password'}
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ mb: 2.5 }}
              size="small"
              error={confirmPassword.length > 0 && password !== confirmPassword}
              helperText={confirmPassword.length > 0 && password !== confirmPassword ? 'Passwords do not match' : ''}
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setShowConfirm(!showConfirm)} edge="end">
                      {showConfirm ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                  size="small"
                  sx={{ color: COLORS.text3, '&.Mui-checked': { color: COLORS.accent } }}
                />
              }
              label={
                <Typography sx={{ fontSize: 13, color: COLORS.text2 }}>
                  I agree to{' '}
                  <Link href="#" sx={{ color: COLORS.accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Terms
                  </Link>{' '}
                  &{' '}
                  <Link href="#" sx={{ color: COLORS.accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Privacy Policy
                  </Link>
                </Typography>
              }
              sx={{ mb: 3, alignItems: 'flex-start' }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: COLORS.accent,
                color: COLORS.white,
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600,
                fontSize: 15,
                py: 1.3,
                borderRadius: 2,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                '&:disabled': { bgcolor: '#E0C4B8', color: '#fff' },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Create Account'}
            </Button>
          </Box>

          <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 13, color: COLORS.text2 }}>
            Already have an account?{' '}
            <Link
              component={NextLink}
              href="/auth/login"
              sx={{
                color: COLORS.accent,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign in
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
