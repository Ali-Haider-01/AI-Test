'use client';

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Avatar,
  Chip,
  InputAdornment,
  Pagination,
  CircularProgress,
} from '@mui/material';
import {
  Search as SearchIcon,
  Add as AddIcon,
  Chat as ChatIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useRouter } from 'next/navigation';
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
};

interface ChatSession {
  id: string;
  model: string;
  preview: string;
  date: string;
  messages: number;
  sessionId: string;
}

const MOCK_SESSIONS: ChatSession[] = [
  { id: '1', model: 'GPT-4o', preview: 'Explain quantum entanglement in simple terms for a high school student...', date: 'Apr 1, 2026', messages: 14, sessionId: 'sess_001' },
  { id: '2', model: 'Claude 3.5 Sonnet', preview: 'Help me refactor this React component to use hooks instead of class...', date: 'Apr 1, 2026', messages: 22, sessionId: 'sess_002' },
  { id: '3', model: 'Gemini 1.5 Pro', preview: 'Write a compelling marketing email for our SaaS product launch...', date: 'Mar 31, 2026', messages: 8, sessionId: 'sess_003' },
  { id: '4', model: 'GPT-4o', preview: 'Summarize the latest breakthroughs in AI research from 2025...', date: 'Mar 31, 2026', messages: 6, sessionId: 'sess_004' },
  { id: '5', model: 'Mistral 7B', preview: 'Draft a Python script to batch process and analyze CSV files...', date: 'Mar 30, 2026', messages: 18, sessionId: 'sess_005' },
  { id: '6', model: 'Claude 3.5 Sonnet', preview: 'Review my resume and suggest improvements for a software engineer...', date: 'Mar 29, 2026', messages: 10, sessionId: 'sess_006' },
  { id: '7', model: 'Gemini 1.5 Pro', preview: 'Generate 20 creative startup ideas in the health tech space...', date: 'Mar 28, 2026', messages: 5, sessionId: 'sess_007' },
  { id: '8', model: 'GPT-4o', preview: 'Explain the differences between SQL and NoSQL databases...', date: 'Mar 27, 2026', messages: 9, sessionId: 'sess_008' },
];

const MODELS = ['All Models', 'GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Mistral 7B'];
const DATE_FILTERS = ['All Time', 'Today', 'Last 7 days', 'Last 30 days'];
const PAGE_SIZE = 5;

const modelColors: Record<string, string> = {
  'GPT-4o': '#10A37F',
  'Claude 3.5 Sonnet': '#C8622A',
  'Gemini 1.5 Pro': '#1E4DA8',
  'Mistral 7B': '#7B3FA0',
};

export default function HistoryPage() {
  const router = useRouter();
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modelFilter, setModelFilter] = useState('All Models');
  const [dateFilter, setDateFilter] = useState('All Time');
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const res = await api.get('/chat/history');
        setSessions(res.data);
      } catch {
        setSessions(MOCK_SESSIONS);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  const filtered = sessions.filter((s) => {
    const matchSearch = search.trim() === '' || s.preview.toLowerCase().includes(search.toLowerCase());
    const matchModel = modelFilter === 'All Models' || s.model === modelFilter;
    return matchSearch && matchModel;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <DashboardLayout>
      <Box sx={{ p: 4, maxWidth: 900, mx: 'auto', width: '100%' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography
              sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, letterSpacing: '-0.4px' }}
            >
              Chat History
            </Typography>
            <Typography sx={{ color: COLORS.text3, fontSize: 14, mt: 0.5 }}>
              {filtered.length} conversation{filtered.length !== 1 ? 's' : ''}
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            href="/chat"
            sx={{
              bgcolor: COLORS.accent,
              color: '#fff',
              textTransform: 'none',
              fontFamily: "'Instrument Sans', sans-serif",
              fontWeight: 600,
              fontSize: 14,
              borderRadius: 2,
              boxShadow: 'none',
              py: 1.1,
              px: 2.5,
              '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
            }}
          >
            New Chat
          </Button>
        </Box>

        {/* Filters */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 2.5 }}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
              <TextField
                placeholder="Search conversations..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                size="small"
                sx={{ flex: 1, minWidth: 220 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon fontSize="small" sx={{ color: COLORS.text3 }} />
                    </InputAdornment>
                  ),
                  style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 },
                }}
              />
              <FormControl size="small" sx={{ minWidth: 160 }}>
                <InputLabel sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>Model</InputLabel>
                <Select
                  value={modelFilter}
                  label="Model"
                  onChange={(e) => { setModelFilter(e.target.value); setPage(1); }}
                  sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}
                >
                  {MODELS.map((m) => (
                    <MenuItem key={m} value={m} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 140 }}>
                <InputLabel sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>Date</InputLabel>
                <Select
                  value={dateFilter}
                  label="Date"
                  onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                  sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}
                >
                  {DATE_FILTERS.map((d) => (
                    <MenuItem key={d} value={d} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>
                      {d}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </CardContent>
        </Card>

        {/* Session List */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress sx={{ color: COLORS.accent }} />
          </Box>
        ) : paginated.length === 0 ? (
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
            <CardContent sx={{ p: 6, textAlign: 'center' }}>
              <ChatIcon sx={{ fontSize: 48, color: COLORS.text3, mb: 2 }} />
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 18, color: COLORS.text, mb: 1 }}>
                No conversations found
              </Typography>
              <Typography sx={{ color: COLORS.text2, fontSize: 14, mb: 3 }}>
                {search || modelFilter !== 'All Models' ? 'Try adjusting your filters.' : 'Start your first chat to see history here.'}
              </Typography>
              <Button
                href="/chat"
                variant="contained"
                sx={{
                  bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                  fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, borderRadius: 2, boxShadow: 'none',
                  '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                }}
              >
                Start New Chat
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
            {paginated.map((session, idx) => (
              <Box
                key={session.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  p: 2.5,
                  borderBottom: idx < paginated.length - 1 ? '1px solid #F0EDE8' : 'none',
                  '&:hover': { bgcolor: COLORS.bg },
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/chat?session=${session.sessionId}`)}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: modelColors[session.model] || '#9E9B93',
                    color: '#fff',
                    fontSize: 13,
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {session.model.slice(0, 2)}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    noWrap
                    sx={{ fontSize: 14, color: COLORS.text, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500 }}
                  >
                    {session.preview}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1.5, mt: 0.5, alignItems: 'center' }}>
                    <Chip
                      label={session.model}
                      size="small"
                      sx={{
                        fontSize: 11, height: 20,
                        bgcolor: COLORS.bg2, color: COLORS.text2,
                        fontFamily: "'Instrument Sans', sans-serif",
                      }}
                    />
                    <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>{session.date}</Typography>
                    <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>&middot; {session.messages} messages</Typography>
                  </Box>
                </Box>
                <Button
                  endIcon={<ArrowIcon fontSize="small" />}
                  onClick={(e) => { e.stopPropagation(); router.push(`/chat?session=${session.sessionId}`); }}
                  sx={{
                    flexShrink: 0,
                    textTransform: 'none',
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 600,
                    color: COLORS.accent,
                    '&:hover': { bgcolor: COLORS.accentLt },
                    borderRadius: 2,
                  }}
                >
                  Continue
                </Button>
              </Box>
            ))}
          </Card>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={totalPages}
              page={page}
              onChange={(_, val) => setPage(val)}
              sx={{
                '& .MuiPaginationItem-root': {
                  fontFamily: "'Instrument Sans', sans-serif",
                  color: COLORS.text2,
                },
                '& .Mui-selected': {
                  bgcolor: `${COLORS.accentLt} !important`,
                  color: COLORS.accent,
                  fontWeight: 700,
                },
              }}
            />
          </Box>
        )}
      </Box>
    </DashboardLayout>
  );
}
