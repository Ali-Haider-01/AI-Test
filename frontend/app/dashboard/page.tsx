'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Avatar,
  Chip,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Grid,
} from '@mui/material';
import {
  Chat as ChatIcon,
  Memory as ModelIcon,
  Api as ApiIcon,
  AttachMoney as CostIcon,
  ArrowForward as ArrowIcon,
  Add as AddIcon,
  Store as StoreIcon,
  Payment as PaymentIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../components/dashboard/DashboardLayout';
import { useSelector } from 'react-redux';
import type { RootState } from '../../lib/store';
import api from '@/lib/api';

const COLORS = {
  bg: '#F4F2EE',
  bg2: '#ECEAE4',
  white: '#FFFFFF',
  text: '#1C1A16',
  text2: '#5A5750',
  text3: '#9E9B93',
  accent: '#C8622A',
  accentLt: '#FDF1EB',
  blue: '#1E4DA8',
};

const DEFAULT_STATS = [
  { label: 'Total Chats', value: '0', icon: <ChatIcon />, color: '#1E4DA8', bg: '#EEF2FB' },
  { label: 'Models Used', value: '0', icon: <ModelIcon />, color: '#C8622A', bg: '#FDF1EB' },
  { label: 'API Calls', value: '0', icon: <ApiIcon />, color: '#0A5E49', bg: '#E8F3F0' },
  { label: 'Cost This Month', value: '$0.00', icon: <CostIcon />, color: '#8A5A00', bg: '#FDF6E3' },
];

const DEFAULT_SESSION = [
  { id: 1, model: 'GPT-4o', preview: 'No activity yet', date: '—', messages: 0 },
];

const favoriteModels = [
  { name: 'GPT-4o', provider: 'OpenAI', tag: 'Most used', color: '#10A37F' },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', tag: 'Favorite', color: '#C8622A' },
  { name: 'Gemini 1.5 Pro', provider: 'Google', tag: 'Fast', color: '#1E4DA8' },
];

const quickActions = [
  { label: 'Start New Chat', icon: <AddIcon fontSize="small" />, href: '/chat', primary: true },
  { label: 'Browse Marketplace', icon: <StoreIcon fontSize="small" />, href: '/marketplace', primary: false },
  { label: 'Manage Billing', icon: <PaymentIcon fontSize="small" />, href: '/dashboard/billing', primary: false },
];

export default function DashboardPage() {
  const { user } = useSelector((state: RootState) => state.auth);
  const [today, setToday] = useState('');
  useEffect(() => {
    setToday(new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }));
  }, []);

  const [stats, setStats] = useState(DEFAULT_STATS);
  const [activity, setActivity] = useState(DEFAULT_SESSION);
  const [loadingStats, setLoadingStats] = useState(true);
  const [loadingActivity, setLoadingActivity] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, activityRes] = await Promise.all([
          api.get('/dashboard/stats'),
          api.get('/dashboard/activity'),
        ]);

        const serverStats = statsRes.data;
        setStats([
          { label: 'Total Chats', value: `${serverStats.totalChats}`, icon: <ChatIcon />, color: '#1E4DA8', bg: '#EEF2FB' },
          { label: 'Models Used', value: `${serverStats.modelsUsed}`, icon: <ModelIcon />, color: '#C8622A', bg: '#FDF1EB' },
          { label: 'API Calls', value: `${serverStats.apiCalls}`, icon: <ApiIcon />, color: '#0A5E49', bg: '#E8F3F0' },
          { label: 'Cost This Month', value: `$${serverStats.costThisMonth.toFixed(2)}`, icon: <CostIcon />, color: '#8A5A00', bg: '#FDF6E3' },
        ]);

        setActivity(activityRes.data);
      } catch (err) {
        // fallback on static/dummy data when API not reachable or unauthenticated
        setStats(DEFAULT_STATS);
        setActivity(DEFAULT_SESSION);
      } finally {
        setLoadingStats(false);
        setLoadingActivity(false);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <DashboardLayout>
      <Box sx={{ p: 4, maxWidth: 1100, mx: 'auto', width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: 28,
              color: COLORS.text,
              letterSpacing: '-0.4px',
            }}
          >
            Welcome back, {user?.name || 'there'}!
          </Typography>
          <Typography sx={{ color: COLORS.text3, fontSize: 14, mt: 0.5 }}>{today}</Typography>
        </Box>

        {/* Stats Row */}
        <Grid container spacing={2.5} sx={{ mb: 4 }}>
          {stats.map((stat) => (
            <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid #E0DDD6',
                  bgcolor: COLORS.white,
                  height: '100%',
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      bgcolor: stat.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: stat.color,
                      mb: 1.5,
                    }}
                  >
                    {stat.icon}
                  </Box>
                  <Typography
                    sx={{
                      fontFamily: "'Syne', sans-serif",
                      fontWeight: 700,
                      fontSize: 26,
                      color: COLORS.text,
                      letterSpacing: '-0.5px',
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </Typography>
                  <Typography sx={{ color: COLORS.text3, fontSize: 13, mt: 0.5 }}>{stat.label}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Activity */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: COLORS.text }}>
                    Recent Activity
                  </Typography>
                  <Button
                    endIcon={<ArrowIcon fontSize="small" />}
                    href="/dashboard/history"
                    sx={{
                      fontSize: 13,
                      color: COLORS.accent,
                      textTransform: 'none',
                      fontFamily: "'Instrument Sans', sans-serif",
                      p: 0,
                      '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                    }}
                  >
                    View all
                  </Button>
                </Box>
                <List disablePadding>
                  {loadingActivity ? (
                    <ListItem>
                      <ListItemText primary="Loading activity..." />
                    </ListItem>
                  ) : activity.length === 0 ? (
                    <ListItem>
                      <ListItemText primary="No activity yet" />
                    </ListItem>
                  ) : (
                    activity.map((session, idx) => (
                      <ListItem
                        key={session.id}
                        disablePadding
                        sx={{
                          py: 1.5,
                          borderBottom: idx < activity.length - 1 ? '1px solid #F0EDE8' : 'none',
                          alignItems: 'flex-start',
                        }}
                      >
                      <ListItemAvatar sx={{ minWidth: 44 }}>
                        <Avatar
                          sx={{
                            width: 32,
                            height: 32,
                            bgcolor: COLORS.bg2,
                            color: COLORS.text2,
                            fontSize: 11,
                            fontFamily: "'Instrument Sans', sans-serif",
                            fontWeight: 700,
                          }}
                        >
                          {session.model.slice(0, 2)}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        disableTypography
                        primary={
                          <Typography
                            noWrap
                            sx={{
                              fontSize: 13,
                              color: COLORS.text,
                              fontFamily: "'Instrument Sans', sans-serif",
                              fontWeight: 500,
                              maxWidth: 320,
                            }}
                          >
                            {session.preview}
                          </Typography>
                        }
                        secondary={
                          <Box sx={{ display: 'flex', gap: 1, mt: 0.3, alignItems: 'center' }}>
                            <Chip
                              label={session.model}
                              size="small"
                              sx={{
                                fontSize: 11,
                                height: 20,
                                bgcolor: COLORS.bg,
                                color: COLORS.text2,
                                fontFamily: "'Instrument Sans', sans-serif",
                              }}
                            />
                            <Typography sx={{ fontSize: 11, color: COLORS.text3 }}>{session.date}</Typography>
                            <Typography sx={{ fontSize: 11, color: COLORS.text3 }}>&middot; {session.messages} msgs</Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                  ))) }
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column */}
          <Grid size={{ xs: 12, md: 5 }}>
            {/* Quick Actions */}
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: COLORS.text, mb: 2 }}>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {quickActions.map((action) => (
                    <Button
                      key={action.label}
                      href={action.href}
                      startIcon={action.icon}
                      variant={action.primary ? 'contained' : 'outlined'}
                      fullWidth
                      sx={{
                        justifyContent: 'flex-start',
                        textTransform: 'none',
                        fontFamily: "'Instrument Sans', sans-serif",
                        fontWeight: 500,
                        fontSize: 14,
                        borderRadius: 2,
                        py: 1.1,
                        ...(action.primary
                          ? {
                              bgcolor: COLORS.accent,
                              color: '#fff',
                              boxShadow: 'none',
                              '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                            }
                          : {
                              borderColor: '#D5D2CB',
                              color: COLORS.text2,
                              '&:hover': { bgcolor: COLORS.bg, borderColor: '#C0BDB5' },
                            }),
                      }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>

            {/* Favorite Models */}
            <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
              <CardContent sx={{ p: 3 }}>
                <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 16, color: COLORS.text, mb: 2 }}>
                  Favorite Models
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                  {favoriteModels.map((model) => (
                    <Box
                      key={model.name}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1.5,
                        p: 1.5,
                        borderRadius: 2,
                        border: '1px solid #E0DDD6',
                        bgcolor: COLORS.bg,
                        cursor: 'pointer',
                        '&:hover': { bgcolor: COLORS.bg2 },
                      }}
                    >
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: model.color,
                          fontSize: 12,
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontWeight: 700,
                          color: '#fff',
                        }}
                      >
                        {model.name.slice(0, 2)}
                      </Avatar>
                      <Box sx={{ flex: 1 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 600, color: COLORS.text, fontFamily: "'Instrument Sans', sans-serif" }}>
                          {model.name}
                        </Typography>
                        <Typography sx={{ fontSize: 11, color: COLORS.text3, fontFamily: "'Instrument Sans', sans-serif" }}>
                          {model.provider}
                        </Typography>
                      </Box>
                      <Chip
                        label={model.tag}
                        size="small"
                        sx={{
                          fontSize: 10,
                          height: 18,
                          bgcolor: COLORS.accentLt,
                          color: COLORS.accent,
                          fontFamily: "'Instrument Sans', sans-serif",
                          fontWeight: 600,
                        }}
                      />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </DashboardLayout>
  );
}
