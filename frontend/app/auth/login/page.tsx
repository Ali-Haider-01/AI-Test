'use client';

import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Divider,
  Link,
  Alert,
  CircularProgress,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
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
  blue: '#1E4DA8',
};

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      const { access_token: token, user } = res.data;
      localStorage.setItem('nexusai_token', token);
      localStorage.setItem('nexusai_user', JSON.stringify(user));
      dispatch(setAuth({ user, token }));
      router.push('/dashboard');
    } catch (err: unknown) {
      const axiosErr = err as { response?: { data?: { message?: string } } };
      setError(axiosErr?.response?.data?.message || 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGuest = () => {
    router.push('/chat');
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: COLORS.bg }}>
      {/* Back to home bar */}
      <Box
        sx={{
          px: 3,
          py: 1.5,
          display: 'flex',
          alignItems: 'center',
          borderBottom: '1px solid rgba(28,26,22,0.08)',
        }}
      >
        <Link
          component={NextLink}
          href="/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: 13,
            color: COLORS.text2,
            textDecoration: 'none',
            fontWeight: 500,
            '&:hover': { color: COLORS.text },
          }}
        >
          <ArrowBack sx={{ fontSize: 15 }} />
          Back to NexusAI
        </Link>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
          py: 6,
        }}
      >
      <Card
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 440,
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
            Welcome back
          </Typography>
          <Typography sx={{ color: COLORS.text2, fontSize: 14, mb: 3.5 }}>
            Sign in to your NexusAI account
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2.5, fontSize: 13 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSignIn} noValidate>
            <TextField
              label="Email address"
              type="email"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
              size="small"
            />
            <TextField
              label="Password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1 }}
              size="small"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2.5 }}>
              <Link
                component={NextLink}
                href="/auth/forgot-password"
                sx={{
                  fontSize: 13,
                  color: COLORS.accent,
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                bgcolor: COLORS.accent,
                color: COLORS.white,
                fontWeight: 600,
                fontSize: 15,
                py: 1.3,
                boxShadow: 'none',
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                '&:disabled': { bgcolor: '#E0C4B8', color: '#fff' },
              }}
            >
              {loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Sign In'}
            </Button>
          </Box>

          <Divider sx={{ my: 3, color: COLORS.text3, fontSize: 12 }}>or</Divider>

          <Button
            fullWidth
            variant="outlined"
            onClick={handleGuest}
            sx={{
              borderColor: '#D5D2CB',
              color: COLORS.text2,
              fontWeight: 500,
              fontSize: 14,
              py: 1.2,
              bgcolor: 'transparent',
              '&:hover': { bgcolor: '#F4F2EE', borderColor: '#C0BDB5' },
            }}
          >
            Continue as Guest
          </Button>

          <Typography sx={{ textAlign: 'center', mt: 3, fontSize: 13, color: COLORS.text2 }}>
            Don&apos;t have an account?{' '}
            <Link
              component={NextLink}
              href="/auth/signup"
              sx={{
                color: COLORS.accent,
                fontWeight: 600,
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Sign up
            </Link>
          </Typography>
        </CardContent>
      </Card>
      </Box>
    </Box>
  );
}
