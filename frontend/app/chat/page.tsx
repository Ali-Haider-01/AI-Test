'use client';

import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  KeyboardEvent,
} from 'react';
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Chip,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Avatar,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import MicIcon from '@mui/icons-material/Mic';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import StorefrontIcon from '@mui/icons-material/Storefront';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import TuneIcon from '@mui/icons-material/Tune';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import ImageIcon from '@mui/icons-material/Image';
import SummarizeIcon from '@mui/icons-material/Summarize';
import BarChartIcon from '@mui/icons-material/BarChart';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { useRouter } from 'next/navigation';

import modelsData from '@/data/models.json';
import CameraModal from '@/components/chat/CameraModal';
import Navbar from '@/components/Navbar';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AIModel {
  id: string;
  icon: string;
  bg: string;
  name: string;
  lab: string;
  org: string;
  desc: string;
  tags: string[];
  badge: string;
  rating: number;
  reviews: number;
  price: string;
  price_start: number;
  types: string[];
  context: string;
  provider: string;
}

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  attachments?: { name: string; url?: string }[];
  timestamp: Date;
}

interface Attachment {
  name: string;
  url?: string;
  file?: File;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CHAT_STORAGE_KEY = 'nexusai_chat_session';

const DS = {
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

const CPANEL_TABS: Record<string, string[]> = {
  'Use cases': [
    'Help me brainstorm product ideas',
    'Write a professional email',
    'Explain a complex concept simply',
    'Create a marketing strategy',
    'Debug my code',
    'Summarize this document',
  ],
  Monitor: [
    'Set up a KPI dashboard outline',
    'Analyze performance metrics',
    'Create an alert strategy',
    'Draft a monitoring report',
    'Define SLA thresholds',
    'Explain uptime best practices',
  ],
  Prototype: [
    'Generate a React component',
    'Write a REST API handler',
    'Create a database schema',
    'Build a landing page wireframe',
    'Draft user stories',
    'Scaffold a Next.js app structure',
  ],
  Business: [
    'Write a business proposal',
    'Create financial projections',
    'Draft investor pitch points',
    'Analyze competitor landscape',
    'Define OKRs for my team',
    'Create a go-to-market plan',
  ],
  Create: [
    'Write a short story',
    'Generate image prompt ideas',
    'Compose a blog post intro',
    'Create a tagline for my brand',
    'Write product copy',
    'Draft social media content',
  ],
  Analyze: [
    'Analyze this dataset structure',
    'Find patterns in my data',
    'Explain statistical concepts',
    'Compare two approaches',
    'Review my code for issues',
    'Break down a complex problem',
  ],
  Learn: [
    'Explain machine learning basics',
    'Teach me prompt engineering',
    'How does RAG work?',
    'Explain transformer architecture',
    'What is chain-of-thought?',
    'Guide me through fine-tuning',
  ],
};

const CHAT_HUB_CARD_ITEMS = [
  { label: 'Write content', subtitle: 'Emails, posts, stories', icon: <EmailIcon fontSize="small" />, prompt: 'Help me write content for an email, blog post, or social update.' },
  { label: 'Create images', subtitle: 'Art, photos, designs', icon: <ImageIcon fontSize="small" />, prompt: 'Generate a prompt for an AI art tool around a modern product scene.' },
  { label: 'Build something', subtitle: 'Apps, tools, websites', icon: <CodeIcon fontSize="small" />, prompt: 'Help me design and sketch a web app architecture for a new SaaS product.' },
  { label: 'Automate work', subtitle: 'Save hours every week', icon: <AutoStoriesIcon fontSize="small" />, prompt: 'Create a workflow to automate support ticket triage and response.' },
  { label: 'Analyse data', subtitle: 'PDFs, sheets, reports', icon: <BarChartIcon fontSize="small" />, prompt: 'Analyze this dataset and recommend key insights.' },
  { label: 'Just exploring', subtitle: "Show me what's possible", icon: <SmartToyIcon fontSize="small" />, prompt: 'Show me what AI can do for productivity and creativity.' },
];

const QUICK_ACTIONS = [
  { label: 'Browse Marketplace', icon: <StorefrontIcon fontSize="small" />, prompt: '', nav: '/marketplace' },
  { label: 'Discover Models', icon: <SmartToyIcon fontSize="small" />, prompt: 'Show me the most popular AI models available', nav: '' },
  { label: 'View Agents', icon: <TuneIcon fontSize="small" />, prompt: 'What AI agents are available and how do they work?', nav: '' },
  { label: 'Draft Email', icon: <EmailIcon fontSize="small" />, prompt: 'Help me draft a professional email', nav: '' },
  { label: 'Write Code', icon: <CodeIcon fontSize="small" />, prompt: 'Help me write clean, efficient code', nav: '' },
  { label: 'Create Image', icon: <ImageIcon fontSize="small" />, prompt: 'Help me create an AI image generation prompt', nav: '' },
  { label: 'Summarize Text', icon: <SummarizeIcon fontSize="small" />, prompt: 'Summarize the following text for me:', nav: '' },
  { label: 'Analyze Data', icon: <BarChartIcon fontSize="small" />, prompt: 'Help me analyze this data', nav: '' },
  { label: 'Research Topic', icon: <AutoStoriesIcon fontSize="small" />, prompt: 'Research and explain this topic for me:', nav: '' },
];

const DEFAULT_SPARKLINE_DATA = [28, 34, 41, 47, 53, 58, 60, 55, 49, 44, 39, 35, 37, 42, 46, 50, 52, 48, 43, 38, 33, 30, 29, 31];

function makeMockResponse(model: AIModel, userMsg: string): string {
  const starters = [
    `Great question! As ${model.name},`,
    `I'd be happy to help with that.`,
    `Interesting — let me think through this.`,
    `Sure, here's my take:`,
  ];
  const starter = starters[Math.floor(Math.random() * starters.length)];
  return `${starter} I'm ${model.name} by ${model.lab}, specialized in ${model.tags.slice(0, 2).join(' and ')}. This is a demo response. In production, this connects to the real AI backend.\n\nYour message: "${userMsg.slice(0, 80)}${userMsg.length > 80 ? '...' : ''}"\n\nI can help with ${model.types.join(', ')} tasks. My context window is ${model.context}.`;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <StarIcon key={star} sx={{ fontSize: 13, color: '#C8622A' }} />;
        if (rating >= star - 0.5) return <StarHalfIcon key={star} sx={{ fontSize: 13, color: '#C8622A' }} />;
        return <StarBorderIcon key={star} sx={{ fontSize: 13, color: '#9E9B93' }} />;
      })}
    </Box>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ChatPage() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);

  const models: AIModel[] = modelsData as AIModel[];

  const [activeModel, setActiveModel] = useState<AIModel>(models[0]);
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: `Welcome to NexusAI Chat Hub! I'm ${models[0].name} — ${models[0].desc}\n\nSelect a model from the sidebar or use the prompts below to get started.`,
      timestamp: new Date('2026-04-01T00:00:00.000Z'),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [ttsEnabled, setTtsEnabled] = useState(false);
  const [cameraOpen, setCameraOpen] = useState(false);
  const [cpanelTab, setCpanelTab] = useState('Use cases');
  const [cpanelVisible, setCpanelVisible] = useState(true);
  const [sessionId, setSessionId] = useState('guest');
  const [sparklineData, setSparklineData] = useState<number[]>(DEFAULT_SPARKLINE_DATA);

  useEffect(() => {
    setSessionId(`guest-${Math.floor(Math.random() * 100000)}`);

    const values = Array.from({ length: 24 }, () => Math.floor(Math.random() * 70) + 20);
    setSparklineData(values);

    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(CHAT_STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved) as {
            activeModelId: string;
            messages: Array<{ id: string; role: 'user' | 'assistant'; content: string; attachments?: {name:string; url?:string}[]; timestamp: string; }>;
            sessionId: string;
          };

          if (parsed.sessionId) setSessionId(parsed.sessionId);
          if (parsed.activeModelId) {
            const found = models.find((m) => m.id === parsed.activeModelId);
            if (found) setActiveModel(found);
          }
          if (parsed.messages?.length) {
            setMessages(parsed.messages.map((m) => ({ ...m, timestamp: new Date(m.timestamp) })));
          }
        } catch (err) {
          console.warn('Failed to restore chat state', err);
        }
      }
    }
  }, [models]);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const dataToSave = {
      activeModelId: activeModel.id,
      sessionId,
      messages: messages.map((m) => ({ ...m, timestamp: m.timestamp.toISOString() })),
    };
    window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(dataToSave));
  }, [activeModel, messages, sessionId]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle model pre-selection from URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modelId = params.get('model');
      if (modelId) {
        const found = models.find((m) => m.id === modelId);
        if (found) setActiveModel(found);
      }
    }
  }, [models]);

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSelectModel = (model: AIModel) => {
    setActiveModel(model);
    setMessages([
      {
        id: `switch-${Date.now()}`,
        role: 'assistant',
        content: `Switched to ${model.name} by ${model.lab}. ${model.desc}`,
        timestamp: new Date(),
      },
    ]);
  };

  const handleNewChat = () => {
    setMessages([
      {
        id: `new-${Date.now()}`,
        role: 'assistant',
        content: `New conversation started with ${activeModel.name}. How can I help you?`,
        timestamp: new Date(),
      },
    ]);
    setInput('');
    setAttachments([]);
  };

  const sendMessage = useCallback(
    async (text: string, atts: Attachment[] = []) => {
      if (!text.trim() && atts.length === 0) return;
      const userMsg: Message = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        attachments: atts.map((a) => ({ name: a.name, url: a.url })),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, userMsg]);
      setInput('');
      setAttachments([]);
      setIsLoading(true);
      setCpanelVisible(false);

      try {
        const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';
        const token = typeof window !== 'undefined' ? localStorage.getItem('nexusai_token') : null;
        const res = await fetch(`${apiBase}/chat/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
          body: JSON.stringify({ message: text, modelId: activeModel.id, sessionId, isGuest: !token }),
          signal: AbortSignal.timeout(15000),
        });
        if (!res.ok) throw new Error('API error');
        const data = await res.json();
        const aiMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.response || data.content || data.message || makeMockResponse(activeModel, text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
        if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
          const utt = new SpeechSynthesisUtterance(aiMsg.content);
          window.speechSynthesis.speak(utt);
        }
      } catch {
        const mockMsg: Message = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: makeMockResponse(activeModel, text),
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, mockMsg]);
        if (ttsEnabled && typeof window !== 'undefined' && window.speechSynthesis) {
          const utt = new SpeechSynthesisUtterance(mockMsg.content);
          window.speechSynthesis.speak(utt);
        }
      } finally {
        setIsLoading(false);
      }
    },
    [activeModel, sessionId, ttsEnabled]
  );

  const handleSend = () => sendMessage(input, attachments);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const newAtts: Attachment[] = files.map((f) => ({
      name: f.name,
      url: URL.createObjectURL(f),
      file: f,
    }));
    setAttachments((prev) => [...prev, ...newAtts]);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleVoice = () => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition =
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
    recognitionRef.current = recognition;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput((prev) => (prev ? `${prev} ${transcript}` : transcript));
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
    recognition.start();
    setIsListening(true);
  };

  const handleCameraCapture = (file: File, previewUrl: string) => {
    setAttachments((prev) => [...prev, { name: 'Image captured', url: previewUrl, file }]);
  };

  const filteredModels = models.filter(
    (m) =>
      m.name.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
      m.lab.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: DS.bg,
        fontFamily: 'Instrument Sans, sans-serif',
        overflow: 'hidden',
      }}
    >
      <Navbar />

      {/* ── 3-COLUMN LAYOUT ── */}
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden', minHeight: 0 }}>

      {/* ── LEFT SIDEBAR ── */}
      <Box
        sx={{
          width: 250,
          flexShrink: 0,
          background: DS.white,
          borderRight: `1px solid ${DS.bg2}`,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Sticky Header */}
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            borderBottom: `1px solid ${DS.bg2}`,
            position: 'sticky',
            top: 0,
            background: DS.white,
            zIndex: 1,
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 15,
              color: DS.text,
              mb: 1.5,
            }}
          >
            Models
            <Box
              component="span"
              sx={{
                ml: 1,
                fontSize: 11,
                fontFamily: 'Instrument Sans, sans-serif',
                fontWeight: 600,
                background: DS.bg2,
                color: DS.text2,
                borderRadius: 10,
                px: 1,
                py: 0.25,
              }}
            >
              {filteredModels.length}
            </Box>
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              background: DS.bg,
              borderRadius: 2,
              px: 1.5,
              border: `1px solid ${DS.bg2}`,
            }}
          >
            <SearchIcon sx={{ fontSize: 16, color: DS.text3, mr: 0.75 }} />
            <TextField
              variant="standard"
              placeholder="Search models..."
              value={sidebarSearch}
              onChange={(e) => setSidebarSearch(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{
                flex: 1,
                '& input': {
                  fontSize: 12,
                  color: DS.text,
                  fontFamily: 'Instrument Sans, sans-serif',
                  py: 0.75,
                  '&::placeholder': { color: DS.text3 },
                },
              }}
            />
          </Box>
        </Box>

        {/* Model List */}
        <Box sx={{ flex: 1, overflowY: 'auto', py: 0.5 }}>
          {filteredModels.map((model) => {
            const isActive = activeModel.id === model.id;
            return (
              <Box
                key={model.id}
                onClick={() => handleSelectModel(model)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.25,
                  px: 2,
                  py: 1.25,
                  cursor: 'pointer',
                  borderLeft: `3px solid ${isActive ? DS.accent : 'transparent'}`,
                  background: isActive ? DS.accentLt : 'transparent',
                  transition: 'all 0.15s ease',
                  '&:hover': {
                    background: isActive ? DS.accentLt : DS.bg,
                    borderLeftColor: isActive ? DS.accent : DS.bg2,
                  },
                }}
              >
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: 1.5,
                    background: model.bg,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {model.icon}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <Typography
                      sx={{
                        fontSize: 12,
                        fontWeight: 600,
                        color: isActive ? DS.accent : DS.text,
                        fontFamily: 'Instrument Sans, sans-serif',
                        lineHeight: 1.2,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {model.name}
                    </Typography>
                    {model.badge && (
                      <Box
                        sx={{
                          fontSize: 9,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          color: DS.accent,
                          background: DS.accentLt,
                          px: 0.75,
                          py: 0.1,
                          borderRadius: 1,
                          lineHeight: 1.6,
                          flexShrink: 0,
                        }}
                      >
                        {model.badge}
                      </Box>
                    )}
                  </Box>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: DS.text3,
                      fontFamily: 'Instrument Sans, sans-serif',
                      lineHeight: 1.3,
                    }}
                  >
                    {model.lab}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── CENTER COLUMN ── */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          minWidth: 0,
        }}
      >
        {/* Top Bar */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 3,
            py: 1.5,
            background: DS.white,
            borderBottom: `1px solid ${DS.bg2}`,
            flexShrink: 0,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Typography
              sx={{
                fontFamily: 'Syne, sans-serif',
                fontWeight: 700,
                fontSize: 18,
                color: DS.text,
              }}
            >
              Chat Hub
            </Typography>
            <Chip
              label={activeModel.name}
              size="small"
              sx={{
                background: DS.accentLt,
                color: DS.accent,
                fontWeight: 600,
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: 11,
                height: 24,
                border: `1px solid ${DS.accent}22`,
              }}
            />
          </Box>
          <Tooltip title="New Chat">
            <Button
              startIcon={<AddIcon sx={{ fontSize: 16 }} />}
              onClick={handleNewChat}
              size="small"
              sx={{
                background: DS.bg,
                color: DS.text2,
                fontFamily: 'Instrument Sans, sans-serif',
                fontSize: 12,
                fontWeight: 600,
                borderRadius: 2,
                px: 1.5,
                '&:hover': { background: DS.bg2 },
                textTransform: 'none',
                boxShadow: 'none',
              }}
            >
              New Chat
            </Button>
          </Tooltip>
        </Box>

        {/* Chat Hub card section */}
        <Box sx={{ p: 4, background: DS.white, borderBottom: `1px solid ${DS.bg2}`, border: `1px solid ${DS.bg2}`, borderRadius: 2, mx: 3, mt: 3 }}>
          <Typography
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: 26,
              color: DS.text,
              mb: 0.75,
            }}
          >
            Welcome! I’m here to help you 💫
          </Typography>
          <Typography sx={{ fontSize: 14, color: DS.text2, mb: 2 }}>
            No tech background needed. Tell me what you’d like to achieve — I’ll help you discover what’s possible, step by step.
          </Typography>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 1.25 }}>
            {CHAT_HUB_CARD_ITEMS.map((item) => (
              <Box
                key={item.label}
                onClick={() => sendMessage(item.prompt)}
                sx={{
                  borderRadius: 2,
                  border: `1px solid ${DS.bg2}`,
                  p: 2,
                  background: DS.bg,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': { background: DS.white, boxShadow: '0 4px 15px rgba(28,26,22,0.08)' },
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
                  <Box sx={{ width: 24, height: 24, color: DS.accent }}>{item.icon}</Box>
                  <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: DS.text }}>
                    {item.label}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: 11, color: DS.text3 }}>{item.subtitle}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Messages Area */}
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 3,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
          }}
        >
          {messages.map((msg) => (
            <Box
              key={msg.id}
              sx={{
                display: 'flex',
                flexDirection: msg.role === 'user' ? 'row-reverse' : 'row',
                alignItems: 'flex-start',
                gap: 1.25,
                maxWidth: '85%',
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              }}
            >
              {/* Avatar */}
              {msg.role === 'assistant' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    background: activeModel.bg,
                    fontSize: 16,
                    flexShrink: 0,
                  }}
                >
                  {activeModel.icon}
                </Avatar>
              )}

              {/* Bubble */}
              <Box>
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    borderRadius: msg.role === 'user' ? '16px 4px 16px 16px' : '4px 16px 16px 16px',
                    background: msg.role === 'user' ? DS.white : DS.bg,
                    border: msg.role === 'user' ? `1.5px solid ${DS.accent}33` : `1px solid ${DS.bg2}`,
                    boxShadow: msg.role === 'user' ? `0 0 0 1px ${DS.accent}11` : 'none',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13.5,
                      color: DS.text,
                      fontFamily: 'Instrument Sans, sans-serif',
                      lineHeight: 1.7,
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {msg.content}
                  </Typography>

                  {/* Attachments */}
                  {msg.attachments && msg.attachments.length > 0 && (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mt: 1 }}>
                      {msg.attachments.map((a, i) => (
                        <Chip
                          key={i}
                          label={a.name}
                          size="small"
                          sx={{
                            fontSize: 11,
                            background: DS.bg2,
                            color: DS.text2,
                            fontFamily: 'Instrument Sans, sans-serif',
                          }}
                        />
                      ))}
                    </Box>
                  )}
                </Box>
                <Typography
                  sx={{
                    fontSize: 10,
                    color: DS.text3,
                    fontFamily: 'Instrument Sans, sans-serif',
                    mt: 0.5,
                    px: 0.5,
                    textAlign: msg.role === 'user' ? 'right' : 'left',
                  }}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
              </Box>
            </Box>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25, alignSelf: 'flex-start' }}>
              <Avatar sx={{ width: 32, height: 32, background: activeModel.bg, fontSize: 16 }}>
                {activeModel.icon}
              </Avatar>
              <Box
                sx={{
                  px: 2,
                  py: 1.5,
                  borderRadius: '4px 16px 16px 16px',
                  background: DS.bg,
                  border: `1px solid ${DS.bg2}`,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <CircularProgress size={12} sx={{ color: DS.accent }} />
                <Typography sx={{ fontSize: 12, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
                  {activeModel.name} is thinking...
                </Typography>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </Box>

        {/* CPANEL */}
        {cpanelVisible && (
          <Box sx={{ px: 3, pt: 1, pb: 0.5, borderTop: `1px solid ${DS.bg2}`, background: DS.white, flexShrink: 0 }}>
            {/* Tabs */}
            <Box sx={{ display: 'flex', gap: 0.5, mb: 1, overflowX: 'auto', pb: 0.5 }}>
              {Object.keys(CPANEL_TABS).map((tab) => (
                <Box
                  key={tab}
                  onClick={() => setCpanelTab(tab)}
                  sx={{
                    px: 1.5,
                    py: 0.6,
                    borderRadius: 10,
                    cursor: 'pointer',
                    fontSize: 11,
                    fontWeight: 600,
                    fontFamily: 'Instrument Sans, sans-serif',
                    whiteSpace: 'nowrap',
                    color: cpanelTab === tab ? DS.white : DS.text2,
                    background: cpanelTab === tab ? DS.accent : DS.bg,
                    transition: 'all 0.15s ease',
                    '&:hover': {
                      background: cpanelTab === tab ? DS.accent : DS.bg2,
                    },
                  }}
                >
                  {tab}
                </Box>
              ))}
            </Box>
            {/* Prompt Chips */}
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, pb: 1 }}>
              {CPANEL_TABS[cpanelTab].map((prompt) => (
                <Chip
                  key={prompt}
                  label={prompt}
                  size="small"
                  onClick={() => sendMessage(prompt)}
                  sx={{
                    fontSize: 11,
                    fontFamily: 'Instrument Sans, sans-serif',
                    background: DS.bg,
                    color: DS.text2,
                    border: `1px solid ${DS.bg2}`,
                    cursor: 'pointer',
                    '&:hover': { background: DS.accentLt, borderColor: DS.accent, color: DS.accent },
                    transition: 'all 0.15s ease',
                  }}
                />
              ))}
            </Box>
          </Box>
        )}

        {/* Input Area */}
        <Box
          sx={{
            px: 3,
            py: 2,
            background: DS.white,
            borderTop: `1px solid ${DS.bg2}`,
            flexShrink: 0,
          }}
        >
          {/* Attachments Preview */}
          {attachments.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
              {attachments.map((att, i) => (
                <Chip
                  key={i}
                  label={att.name}
                  size="small"
                  onDelete={() => setAttachments((prev) => prev.filter((_, idx) => idx !== i))}
                  sx={{
                    fontSize: 11,
                    background: DS.accentLt,
                    color: DS.accent,
                    fontFamily: 'Instrument Sans, sans-serif',
                    border: `1px solid ${DS.accent}33`,
                  }}
                />
              ))}
            </Box>
          )}

          {/* Input Row */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 1,
              background: DS.bg,
              borderRadius: 3,
              border: `1.5px solid ${DS.bg2}`,
              px: 1.5,
              py: 1,
              transition: 'border-color 0.15s ease',
              '&:focus-within': { borderColor: DS.accent },
            }}
          >
            {/* Left icons */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flexShrink: 0 }}>
              <Tooltip title="Attach File">
                <IconButton
                  size="small"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{ color: DS.text3, '&:hover': { color: DS.accent, background: DS.accentLt } }}
                >
                  <AttachFileIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Take Photo">
                <IconButton
                  size="small"
                  onClick={() => setCameraOpen(true)}
                  sx={{ color: DS.text3, '&:hover': { color: DS.accent, background: DS.accentLt } }}
                >
                  <VideocamIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
            </Box>

            {/* Textarea */}
            <TextField
              inputRef={textareaRef}
              multiline
              maxRows={5}
              fullWidth
              variant="standard"
              placeholder={`Message ${activeModel.name}...`}
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setCpanelVisible(false);
              }}
              onFocus={() => setCpanelVisible(true)}
              onKeyDown={handleKeyDown}
              InputProps={{
                disableUnderline: true,
                sx: {
                  fontSize: 13.5,
                  color: DS.text,
                  fontFamily: 'Instrument Sans, sans-serif',
                  lineHeight: 1.6,
                  '& textarea::placeholder': { color: DS.text3 },
                },
              }}
              sx={{ flex: 1 }}
            />

            {/* Right side */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25, flexShrink: 0 }}>
              <Chip
                label={activeModel.icon + ' ' + activeModel.name}
                size="small"
                sx={{
                  fontSize: 10,
                  fontFamily: 'Instrument Sans, sans-serif',
                  background: DS.bg2,
                  color: DS.text2,
                  height: 22,
                }}
              />
              <Tooltip title={isListening ? 'Stop Recording' : 'Voice Input'}>
                <IconButton
                  size="small"
                  onClick={handleVoice}
                  sx={{
                    color: isListening ? DS.white : DS.text3,
                    background: isListening ? '#E53935' : 'transparent',
                    '&:hover': {
                      color: isListening ? DS.white : DS.accent,
                      background: isListening ? '#C62828' : DS.accentLt,
                    },
                    transition: 'all 0.15s ease',
                  }}
                >
                  <MicIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <Tooltip title={ttsEnabled ? 'Disable Text-to-Speech' : 'Enable Text-to-Speech'}>
                <IconButton
                  size="small"
                  onClick={() => setTtsEnabled((v) => !v)}
                  sx={{
                    color: ttsEnabled ? DS.accent : DS.text3,
                    background: ttsEnabled ? DS.accentLt : 'transparent',
                    '&:hover': { color: DS.accent, background: DS.accentLt },
                  }}
                >
                  {ttsEnabled ? <VolumeUpIcon sx={{ fontSize: 18 }} /> : <VolumeOffIcon sx={{ fontSize: 18 }} />}
                </IconButton>
              </Tooltip>
              <Tooltip title="Send (Enter)">
                <span>
                  <IconButton
                    size="small"
                    onClick={handleSend}
                    disabled={!input.trim() && attachments.length === 0}
                    sx={{
                      color: DS.white,
                      background: DS.accent,
                      '&:hover': { background: '#b5561f' },
                      '&.Mui-disabled': { background: DS.bg2, color: DS.text3 },
                      transition: 'all 0.15s ease',
                    }}
                  >
                    <SendIcon sx={{ fontSize: 16 }} />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          </Box>

          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.75, textAlign: 'center' }}>
            Enter to send · Shift+Enter for new line · AI can make mistakes
          </Typography>
        </Box>
      </Box>

      {/* ── RIGHT SIDEBAR ── */}
      <Box
        sx={{
          width: 280,
          flexShrink: 0,
          background: DS.white,
          borderLeft: `1px solid ${DS.bg2}`,
          display: 'flex',
          flexDirection: 'column',
          overflowY: 'auto',
        }}
      >
        {/* Model Details */}
        <Box sx={{ p: 2.5, borderBottom: `1px solid ${DS.bg2}` }}>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1.5, mb: 2 }}>
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: 2,
                background: activeModel.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 24,
                flexShrink: 0,
              }}
            >
              {activeModel.icon}
            </Box>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography
                sx={{
                  fontFamily: 'Syne, sans-serif',
                  fontWeight: 700,
                  fontSize: 14,
                  color: DS.text,
                  lineHeight: 1.2,
                }}
              >
                {activeModel.name}
              </Typography>
              <Typography sx={{ fontSize: 11, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.25 }}>
                {activeModel.lab}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.5 }}>
                <StarRating rating={activeModel.rating} />
                <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
                  {activeModel.rating} ({activeModel.reviews.toLocaleString()})
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Meta */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mb: 2 }}>
            {[
              { label: 'Context', value: activeModel.context },
              { label: 'Price', value: activeModel.price },
            ].map(({ label, value }) => (
              <Box key={label} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography sx={{ fontSize: 11, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
                  {label}
                </Typography>
                <Typography sx={{ fontSize: 11, color: DS.text, fontWeight: 600, fontFamily: 'Instrument Sans, sans-serif' }}>
                  {value}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Tags */}
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
            {activeModel.tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  fontSize: 10,
                  height: 20,
                  background: DS.bg,
                  color: DS.text2,
                  fontFamily: 'Instrument Sans, sans-serif',
                  border: `1px solid ${DS.bg2}`,
                }}
              />
            ))}
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="small"
            sx={{
              background: DS.accent,
              fontFamily: 'Instrument Sans, sans-serif',
              fontWeight: 600,
              fontSize: 12,
              borderRadius: 2,
              textTransform: 'none',
              boxShadow: 'none',
              py: 1,
              '&:hover': { background: '#b5561f', boxShadow: 'none' },
            }}
          >
            ✓ Active Model
          </Button>
        </Box>

        {/* Usage Overview */}
        <Box sx={{ p: 2.5, borderBottom: `1px solid ${DS.bg2}` }}>
          <Typography
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              color: DS.text,
              mb: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Usage Overview
          </Typography>

          {/* KPI Cards */}
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            {[
              { label: 'Requests', value: '247' },
              { label: 'Latency', value: '1.2s' },
              { label: 'Cost', value: '$0.04' },
            ].map(({ label, value }) => (
              <Box
                key={label}
                sx={{
                  flex: 1,
                  background: DS.bg,
                  borderRadius: 2,
                  p: 1,
                  textAlign: 'center',
                  border: `1px solid ${DS.bg2}`,
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Syne, sans-serif',
                    fontWeight: 700,
                    fontSize: 14,
                    color: DS.accent,
                    lineHeight: 1.2,
                  }}
                >
                  {value}
                </Typography>
                <Typography sx={{ fontSize: 9, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.25 }}>
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Sparkline */}
          <Box sx={{ height: 44, display: 'flex', alignItems: 'flex-end', gap: '2px' }}>
            {sparklineData.map((val, i) => (
              <Box
                key={i}
                sx={{
                  flex: 1,
                  height: `${val}%`,
                  background: i === sparklineData.length - 1 ? DS.accent : DS.bg2,
                  borderRadius: '2px 2px 0 0',
                  transition: 'height 0.5s ease',
                  minHeight: 2,
                }}
              />
            ))}
          </Box>
          <Typography sx={{ fontSize: 9, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.5 }}>
            Last 24 hours · requests/hr
          </Typography>
        </Box>

        {/* Quick Actions */}
        <Box sx={{ p: 2.5 }}>
          <Typography
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 700,
              fontSize: 12,
              color: DS.text,
              mb: 1.5,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            Quick Actions
          </Typography>

          {/* Navigation & Tools */}
          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mb: 0.75, fontWeight: 600 }}>
            Navigation & Tools
          </Typography>
          <Stack spacing={0.75} sx={{ mb: 1.75 }}>
            {QUICK_ACTIONS.slice(0, 3).map((action) => (
              <Box
                key={action.label}
                onClick={() => {
                  if (action.nav) router.push(action.nav);
                  else if (action.prompt) sendMessage(action.prompt);
                }}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.25,
                  py: 0.875,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: DS.bg,
                  border: `1px solid ${DS.bg2}`,
                  transition: 'all 0.15s ease',
                  '&:hover': { background: DS.accentLt, borderColor: DS.accent, '& .action-icon': { color: DS.accent } },
                }}
              >
                <Box className="action-icon" sx={{ color: DS.text3, display: 'flex', transition: 'color 0.15s ease' }}>
                  {action.icon}
                </Box>
                <Typography sx={{ fontSize: 11, fontFamily: 'Instrument Sans, sans-serif', color: DS.text, fontWeight: 500 }}>
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ mb: 1.75, borderColor: DS.bg2 }} />

          {/* Create & Generate */}
          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mb: 0.75, fontWeight: 600 }}>
            Create & Generate
          </Typography>
          <Stack spacing={0.75} sx={{ mb: 1.75 }}>
            {QUICK_ACTIONS.slice(3, 6).map((action) => (
              <Box
                key={action.label}
                onClick={() => sendMessage(action.prompt)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.25,
                  py: 0.875,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: DS.bg,
                  border: `1px solid ${DS.bg2}`,
                  transition: 'all 0.15s ease',
                  '&:hover': { background: DS.accentLt, borderColor: DS.accent, '& .action-icon': { color: DS.accent } },
                }}
              >
                <Box className="action-icon" sx={{ color: DS.text3, display: 'flex', transition: 'color 0.15s ease' }}>
                  {action.icon}
                </Box>
                <Typography sx={{ fontSize: 11, fontFamily: 'Instrument Sans, sans-serif', color: DS.text, fontWeight: 500 }}>
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Divider sx={{ mb: 1.75, borderColor: DS.bg2 }} />

          {/* Analyze & Write */}
          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mb: 0.75, fontWeight: 600 }}>
            Analyze & Write
          </Typography>
          <Stack spacing={0.75}>
            {QUICK_ACTIONS.slice(6, 9).map((action) => (
              <Box
                key={action.label}
                onClick={() => sendMessage(action.prompt)}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 1.25,
                  py: 0.875,
                  borderRadius: 2,
                  cursor: 'pointer',
                  background: DS.bg,
                  border: `1px solid ${DS.bg2}`,
                  transition: 'all 0.15s ease',
                  '&:hover': { background: DS.accentLt, borderColor: DS.accent, '& .action-icon': { color: DS.accent } },
                }}
              >
                <Box className="action-icon" sx={{ color: DS.text3, display: 'flex', transition: 'color 0.15s ease' }}>
                  {action.icon}
                </Box>
                <Typography sx={{ fontSize: 11, fontFamily: 'Instrument Sans, sans-serif', color: DS.text, fontWeight: 500 }}>
                  {action.label}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>

      </Box> {/* ── end 3-COLUMN LAYOUT ── */}

      {/* ── Hidden file input ── */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,.pdf,.doc,.docx,.txt,.csv"
        multiple
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {/* ── Camera Modal ── */}
      <CameraModal
        open={cameraOpen}
        onClose={() => setCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* ── Model Detail Dialog placeholder (opened from sidebar) ── */}
      <Dialog open={false} onClose={() => {}}>
        <DialogTitle>Model Details</DialogTitle>
        <DialogContent>
          <Typography>Model details</Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}
