'use client';

import React, { useEffect } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  Divider,
} from '@mui/material';
import {
  GridView as OverviewIcon,
  History as HistoryIcon,
  Settings as SettingsIcon,
  CreditCard as BillingIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuth } from '@/lib/store';
import type { RootState } from '../../lib/store';

const COLORS = {
  bg: '#F4F2EE',
  bg2: '#ECEAE4',
  white: '#FFFFFF',
  text: '#1C1A16',
  text2: '#5A5750',
  text3: '#9E9B93',
  accent: '#C8622A',
  accentLt: '#FDF1EB',
};

const SIDEBAR_WIDTH = 240;

const navItems = [
  { label: 'Overview', href: '/dashboard', icon: <OverviewIcon fontSize="small" /> },
  { label: 'History', href: '/dashboard/history', icon: <HistoryIcon fontSize="small" /> },
  { label: 'Settings', href: '/dashboard/settings', icon: <SettingsIcon fontSize="small" /> },
  { label: 'Billing', href: '/dashboard/billing', icon: <BillingIcon fontSize="small" /> },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated && typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('nexusai_token');
      if (!storedToken) {
        router.replace('/auth/login');
      }
    }
  }, [isAuthenticated, router]);

  const handleLogout = () => {
    localStorage.removeItem('nexusai_token');
    localStorage.removeItem('nexusai_user');
    dispatch(clearAuth());
    router.push('/auth/login');
  };

  if (!isAuthenticated) return null;

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: COLORS.bg }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: SIDEBAR_WIDTH,
          minWidth: SIDEBAR_WIDTH,
          bgcolor: COLORS.white,
          borderRight: '1px solid #E0DDD6',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Box sx={{ px: 2.5, py: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 32,
              height: 32,
              borderRadius: 1.5,
              bgcolor: COLORS.accent,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <Typography
              sx={{ color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1 }}
            >
              N
            </Typography>
          </Box>
          <Typography
            sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.text, letterSpacing: '-0.3px' }}
          >
            NexusAI
          </Typography>
        </Box>

        <Divider sx={{ borderColor: '#E0DDD6' }} />

        {/* Nav */}
        <Box sx={{ flex: 1, py: 1.5, overflowY: 'auto' }}>
          <List disablePadding>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <ListItem key={item.href} disablePadding sx={{ px: 1.5, mb: 0.5 }}>
                  <ListItemButton
                    onClick={() => router.push(item.href)}
                    sx={{
                      borderRadius: 2,
                      py: 1,
                      px: 1.5,
                      bgcolor: isActive ? COLORS.accentLt : 'transparent',
                      color: isActive ? COLORS.accent : COLORS.text2,
                      '&:hover': {
                        bgcolor: isActive ? COLORS.accentLt : COLORS.bg,
                      },
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 34,
                        color: isActive ? COLORS.accent : COLORS.text3,
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: isActive ? 600 : 500,
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>

        <Divider sx={{ borderColor: '#E0DDD6' }} />

        {/* Logout */}
        <Box sx={{ p: 2 }}>
          <Button
            fullWidth
            startIcon={<LogoutIcon fontSize="small" />}
            onClick={handleLogout}
            sx={{
              justifyContent: 'flex-start',
              color: COLORS.text2,
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 500,
              fontSize: 14,
              textTransform: 'none',
              borderRadius: 2,
              py: 1,
              px: 1.5,
              '&:hover': { bgcolor: COLORS.bg, color: COLORS.text },
            }}
          >
            Logout
          </Button>
        </Box>
      </Box>

      {/* Main content */}
      <Box
        sx={{
          flex: 1,
          ml: `${SIDEBAR_WIDTH}px`,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
