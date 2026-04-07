'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  TextField,
  InputAdornment,
  Alert,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  ArrowForward as ArrowIcon,
  Email as EmailIcon,
  NewReleases as NewIcon,
  CheckCircle as CheckIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import Navbar from '@/components/Navbar';

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

interface ModelCard {
  name: string;
  provider: string;
  description: string;
  tags: string[];
  color: string;
  isNew?: boolean;
  trending?: boolean;
}

const trendingModels: ModelCard[] = [
  { name: 'GPT-4o', provider: 'OpenAI', description: 'Most capable model with multimodal reasoning', tags: ['Chat', 'Vision', 'Code'], color: '#10A37F', trending: true },
  { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', description: 'Fast, smart, and safe for enterprise use', tags: ['Chat', 'Analysis'], color: '#C8622A', trending: true },
  { name: 'Gemini 1.5 Pro', provider: 'Google', description: '1M context window, multimodal powerhouse', tags: ['Vision', 'Long context'], color: '#1E4DA8', trending: true },
  { name: 'Llama 3.1 405B', provider: 'Meta', description: 'Open-source frontier model, fully local', tags: ['Open source', 'Code'], color: '#7B3FA0', trending: true },
  { name: 'Mistral Large', provider: 'Mistral AI', description: 'European AI powerhouse, multilingual', tags: ['Multilingual', 'Fast'], color: '#2E7D32', trending: true },
  { name: 'Command R+', provider: 'Cohere', description: 'RAG-optimized with grounding capabilities', tags: ['RAG', 'Enterprise'], color: '#B8530A' },
];

const newArrivals: ModelCard[] = [
  { name: 'Phi-3.5 Mini', provider: 'Microsoft', description: 'Compact powerhouse, runs on-device', tags: ['Small', 'Fast', 'On-device'], color: '#0078D4', isNew: true },
  { name: 'Gemma 2 27B', provider: 'Google', description: 'Open model rivaling much larger ones', tags: ['Open source'], color: '#4285F4', isNew: true },
  { name: 'Qwen 2.5', provider: 'Alibaba', description: 'Multilingual coding and reasoning', tags: ['Code', 'Multilingual'], color: '#FF6A00', isNew: true },
  { name: 'DeepSeek V3', provider: 'DeepSeek', description: 'MoE architecture at frontier performance', tags: ['MoE', 'Code'], color: '#1E4DA8', isNew: true },
];

const categories = [
  {
    name: 'Language Models',
    type: 'language',
    models: [
      { name: 'GPT-4o', provider: 'OpenAI', color: '#10A37F', tags: ['General'] },
      { name: 'Claude 3.5', provider: 'Anthropic', color: '#C8622A', tags: ['Analysis'] },
      { name: 'Gemini Pro', provider: 'Google', color: '#1E4DA8', tags: ['Long context'] },
      { name: 'Llama 3.1', provider: 'Meta', color: '#7B3FA0', tags: ['Open source'] },
    ],
  },
  {
    name: 'Vision Models',
    type: 'vision',
    models: [
      { name: 'GPT-4o Vision', provider: 'OpenAI', color: '#10A37F', tags: ['Image'] },
      { name: 'Gemini 1.5', provider: 'Google', color: '#1E4DA8', tags: ['Video'] },
      { name: 'Claude 3.5 Vision', provider: 'Anthropic', color: '#C8622A', tags: ['OCR'] },
      { name: 'LLaVA 1.6', provider: 'Open', color: '#7B3FA0', tags: ['Open source'] },
    ],
  },
  {
    name: 'Code Models',
    type: 'code',
    models: [
      { name: 'GPT-4o', provider: 'OpenAI', color: '#10A37F', tags: ['All languages'] },
      { name: 'Claude 3.5 Sonnet', provider: 'Anthropic', color: '#C8622A', tags: ['SWE-bench'] },
      { name: 'DeepSeek Coder', provider: 'DeepSeek', color: '#1E4DA8', tags: ['Specialized'] },
      { name: 'CodeLlama', provider: 'Meta', color: '#7B3FA0', tags: ['Open source'] },
    ],
  },
  {
    name: 'Image Generation',
    type: 'image',
    models: [
      { name: 'DALL-E 3', provider: 'OpenAI', color: '#10A37F', tags: ['Photorealistic'] },
      { name: 'Stable Diffusion 3', provider: 'Stability', color: '#B8530A', tags: ['Open source'] },
      { name: 'Midjourney v6', provider: 'Midjourney', color: '#7B3FA0', tags: ['Artistic'] },
      { name: 'Flux 1.1 Pro', provider: 'Black Forest', color: '#2E7D32', tags: ['Fast'] },
    ],
  },
  {
    name: 'Audio Models',
    type: 'audio',
    models: [
      { name: 'Whisper v3', provider: 'OpenAI', color: '#10A37F', tags: ['Transcription'] },
      { name: 'ElevenLabs', provider: 'ElevenLabs', color: '#7B3FA0', tags: ['TTS'] },
      { name: 'Suno v4', provider: 'Suno', color: '#C8622A', tags: ['Music gen'] },
      { name: 'Bark', provider: 'Suno', color: '#2E7D32', tags: ['Open source'] },
    ],
  },
];

const comparisonModels = [
  {
    name: 'GPT-4o',
    provider: 'OpenAI',
    color: '#10A37F',
    context: '128K',
    speed: 'Fast',
    cost: '$2.50/1M',
    multimodal: true,
    openSource: false,
    codeGen: true,
    streaming: true,
  },
  {
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    color: '#C8622A',
    context: '200K',
    speed: 'Fast',
    cost: '$3.00/1M',
    multimodal: true,
    openSource: false,
    codeGen: true,
    streaming: true,
  },
  {
    name: 'Gemini 1.5 Pro',
    provider: 'Google',
    color: '#1E4DA8',
    context: '1M',
    speed: 'Medium',
    cost: '$1.25/1M',
    multimodal: true,
    openSource: false,
    codeGen: true,
    streaming: true,
  },
];

function SmallModelCard({ model }: { model: { name: string; provider: string; color: string; tags: string[] } }) {
  return (
    <Box
      sx={{
        flexShrink: 0,
        width: 200,
        p: 2,
        borderRadius: 2.5,
        border: '1px solid #E0DDD6',
        bgcolor: COLORS.white,
        cursor: 'pointer',
        '&:hover': { boxShadow: '0 4px 16px rgba(28,26,22,0.08)', transform: 'translateY(-1px)', transition: 'all 0.15s ease' },
        transition: 'all 0.15s ease',
      }}
    >
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: 1.5,
          bgcolor: model.color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 12,
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          mb: 1.5,
        }}
      >
        {model.name.slice(0, 2)}
      </Box>
      <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: COLORS.text, mb: 0.3 }}>
        {model.name}
      </Typography>
      <Typography sx={{ fontSize: 11, color: COLORS.text3, mb: 1 }}>{model.provider}</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {model.tags.slice(0, 2).map((t) => (
          <Chip key={t} label={t} size="small" sx={{ fontSize: 10, height: 18, bgcolor: COLORS.bg, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }} />
        ))}
      </Box>
    </Box>
  );
}

export default function DiscoverPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '100vh', fontFamily: "'Instrument Sans', sans-serif" }}>
      <Navbar />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 6 }}>
        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="Explore AI Models"
            sx={{ bgcolor: COLORS.accentLt, color: COLORS.accent, fontWeight: 600, fontSize: 12, fontFamily: "'Instrument Sans', sans-serif", mb: 2 }}
          />
          <Typography
            sx={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: { xs: 36, md: 56 },
              color: COLORS.text,
              letterSpacing: '-1px',
              lineHeight: 1.1,
              mb: 2,
            }}
          >
            Discover New
            <Box component="span" sx={{ color: COLORS.accent }}> AI Models</Box>
          </Typography>
          <Typography sx={{ fontSize: 18, color: COLORS.text2, maxWidth: 540, mx: 'auto', lineHeight: 1.6 }}>
            Explore the latest and most capable AI models. Compare, discover, and find the perfect model for your use case.
          </Typography>
        </Box>

        {/* Trending Section */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text }}>
              Trending Now
            </Typography>
            <Button endIcon={<ArrowIcon fontSize="small" />} href="/marketplace" sx={{ textTransform: 'none', fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.accent, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
              View All
            </Button>
          </Box>
          <Box sx={{ display: 'flex', gap: 2.5, overflowX: 'auto', pb: 1, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
            {trendingModels.map((model) => (
              <Box
                key={model.name}
                sx={{
                  flexShrink: 0,
                  width: 260,
                  p: 2.5,
                  borderRadius: 3,
                  border: '1px solid #E0DDD6',
                  bgcolor: COLORS.white,
                  cursor: 'pointer',
                  '&:hover': { boxShadow: '0 4px 20px rgba(28,26,22,0.1)', transform: 'translateY(-2px)', transition: 'all 0.2s ease' },
                  transition: 'all 0.2s ease',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Box sx={{ width: 42, height: 42, borderRadius: 2, bgcolor: model.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14 }}>
                    {model.name.slice(0, 2)}
                  </Box>
                  {model.trending && (
                    <Chip label="Trending" size="small" sx={{ fontSize: 10, height: 20, bgcolor: '#FFF3E0', color: '#E65100', fontWeight: 600, fontFamily: "'Instrument Sans', sans-serif" }} />
                  )}
                </Box>
                <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.text, mb: 0.3 }}>{model.name}</Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.text3, mb: 1 }}>{model.provider}</Typography>
                <Typography sx={{ fontSize: 13, color: COLORS.text2, mb: 1.5, lineHeight: 1.5 }}>{model.description}</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {model.tags.map((t) => (
                    <Chip key={t} label={t} size="small" sx={{ fontSize: 10, height: 18, bgcolor: COLORS.bg, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }} />
                  ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* New Arrivals */}
        <Box sx={{ mb: 8 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text }}>
              New Arrivals
            </Typography>
            <Button endIcon={<ArrowIcon fontSize="small" />} href="/marketplace?sort=new" sx={{ textTransform: 'none', fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.accent, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}>
              View All
            </Button>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
            {newArrivals.map((model) => (
              <Card
                key={model.name}
                elevation={0}
                sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, cursor: 'pointer', '&:hover': { boxShadow: '0 4px 16px rgba(28,26,22,0.08)' } }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
                    <Box sx={{ width: 38, height: 38, borderRadius: 1.5, bgcolor: model.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 13 }}>
                      {model.name.slice(0, 2)}
                    </Box>
                    {model.isNew && (
                      <Chip
                        icon={<NewIcon sx={{ fontSize: '12px !important' }} />}
                        label="NEW"
                        size="small"
                        sx={{ fontSize: 10, height: 20, bgcolor: COLORS.accentLt, color: COLORS.accent, fontWeight: 700, fontFamily: "'Instrument Sans', sans-serif" }}
                      />
                    )}
                  </Box>
                  <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14, color: COLORS.text, mb: 0.3 }}>{model.name}</Typography>
                  <Typography sx={{ fontSize: 11, color: COLORS.text3, mb: 1 }}>{model.provider}</Typography>
                  <Typography sx={{ fontSize: 12, color: COLORS.text2, lineHeight: 1.5, mb: 1.5 }}>{model.description}</Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {model.tags.slice(0, 2).map((t) => (
                      <Chip key={t} label={t} size="small" sx={{ fontSize: 10, height: 18, bgcolor: COLORS.bg, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }} />
                    ))}
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Category Sections */}
        {categories.map((cat) => (
          <Box key={cat.name} sx={{ mb: 7 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2.5 }}>
              <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: COLORS.text }}>
                {cat.name}
              </Typography>
              <Button
                endIcon={<ArrowIcon fontSize="small" />}
                href={`/marketplace?type=${cat.type}`}
                sx={{ textTransform: 'none', fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.accent, '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
              >
                View All
              </Button>
            </Box>
            <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1, scrollbarWidth: 'none', '&::-webkit-scrollbar': { display: 'none' } }}>
              {cat.models.map((m) => (
                <SmallModelCard key={m.name} model={m} />
              ))}
            </Box>
          </Box>
        ))}

        {/* Featured Comparison */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text, mb: 1 }}>
            Compare Top Models
          </Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.text2, mb: 3 }}>
            Side-by-side comparison of the leading frontier models
          </Typography>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: COLORS.bg }}>
                    <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: COLORS.text3, borderBottom: '1px solid #E0DDD6' }}>
                      Feature
                    </TableCell>
                    {comparisonModels.map((m) => (
                      <TableCell key={m.name} align="center" sx={{ borderBottom: '1px solid #E0DDD6', py: 2 }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5 }}>
                          <Box sx={{ width: 32, height: 32, borderRadius: 1.5, bgcolor: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 12 }}>
                            {m.name.slice(0, 2)}
                          </Box>
                          <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 13, color: COLORS.text }}>{m.name}</Typography>
                          <Typography sx={{ fontSize: 11, color: COLORS.text3 }}>{m.provider}</Typography>
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {[
                    { label: 'Context Window', key: 'context' },
                    { label: 'Speed', key: 'speed' },
                    { label: 'Cost (input)', key: 'cost' },
                  ].map((row) => (
                    <TableRow key={row.label} sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8', fontWeight: 500 }}>
                        {row.label}
                      </TableCell>
                      {comparisonModels.map((m) => (
                        <TableCell key={m.name} align="center" sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, borderBottom: '1px solid #F0EDE8', fontWeight: 500 }}>
                          {m[row.key as keyof typeof m] as string}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  {[
                    { label: 'Multimodal', key: 'multimodal' },
                    { label: 'Open Source', key: 'openSource' },
                    { label: 'Code Generation', key: 'codeGen' },
                    { label: 'Streaming', key: 'streaming' },
                  ].map((row) => (
                    <TableRow key={row.label} sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8', fontWeight: 500 }}>
                        {row.label}
                      </TableCell>
                      {comparisonModels.map((m) => (
                        <TableCell key={m.name} align="center" sx={{ borderBottom: '1px solid #F0EDE8' }}>
                          {m[row.key as keyof typeof m]
                            ? <CheckIcon sx={{ fontSize: 18, color: '#2E7D32' }} />
                            : <CancelIcon sx={{ fontSize: 18, color: '#BDBDBD' }} />}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>

        {/* Newsletter */}
        <Box
          sx={{
            bgcolor: COLORS.white,
            borderRadius: 4,
            border: '1px solid #E0DDD6',
            p: { xs: 3, md: 6 },
            textAlign: 'center',
            mb: 6,
          }}
        >
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text, mb: 1, letterSpacing: '-0.4px' }}>
            Stay updated with new model releases
          </Typography>
          <Typography sx={{ fontSize: 15, color: COLORS.text2, mb: 3 }}>
            Get notified when the latest AI models arrive on NexusAI.
          </Typography>
          {subscribed ? (
            <Alert
              severity="success"
              icon={<CheckIcon />}
              sx={{ display: 'inline-flex', fontSize: 14, fontFamily: "'Instrument Sans', sans-serif", borderRadius: 2 }}
            >
              You&apos;re subscribed! We&apos;ll keep you in the loop.
            </Alert>
          ) : (
            <Box component="form" onSubmit={handleSubscribe} sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
              <TextField
                placeholder="Enter your email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                sx={{ width: 300 }}
                InputProps={{
                  startAdornment: <InputAdornment position="start"><EmailIcon fontSize="small" sx={{ color: COLORS.text3 }} /></InputAdornment>,
                  style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 },
                }}
              />
              <Button
                type="submit"
                variant="contained"
                sx={{
                  bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                  fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14,
                  borderRadius: 2, boxShadow: 'none', px: 3,
                  '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                }}
              >
                Subscribe
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      {/* ── Footer ── */}
      <Box component="footer" sx={{ borderTop: `1px solid #E0DDD6`, py: 4, px: { xs: 2, md: 4 }, background: COLORS.white }}>
        <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.text }}>NexusAI</Typography>
          <Typography sx={{ fontSize: 13, color: COLORS.text3 }}>© {new Date().getFullYear()} NexusAI. All rights reserved.</Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            {['Privacy', 'Terms', 'Docs', 'Contact'].map((l) => (
              <Typography key={l} component="a" href="#" sx={{ fontSize: 13, color: COLORS.text2, textDecoration: 'none', '&:hover': { color: COLORS.accent } }}>{l}</Typography>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
