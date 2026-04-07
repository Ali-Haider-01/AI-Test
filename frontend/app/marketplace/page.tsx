'use client';

import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  TextField,
  Chip,
  Button,
  IconButton,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Slider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Tooltip,
  Divider,
  Stack,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';

import modelsData from '@/data/models.json';

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

// ── Design System ─────────────────────────────────────────────────────────────
import { T as DS } from '@/lib/designTokens';

// COLORS kept as alias so existing references still compile
const COLORS = DS;

// ── Helpers ───────────────────────────────────────────────────────────────────

function StarRating({ rating, size = 13 }: { rating: number; size?: number }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <StarIcon key={star} sx={{ fontSize: size, color: DS.accent }} />;
        if (rating >= star - 0.5) return <StarHalfIcon key={star} sx={{ fontSize: size, color: DS.accent }} />;
        return <StarBorderIcon key={star} sx={{ fontSize: size, color: DS.text3 }} />;
      })}
    </Box>
  );
}

const PROVIDERS = Array.from(new Set((modelsData as AIModel[]).map((m) => m.provider))).sort();

const TYPE_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'Language', value: 'language' },
  { label: 'Vision', value: 'vision' },
  { label: 'Code', value: 'code' },
  { label: 'Image Gen', value: 'image' },
  { label: 'Audio', value: 'audio' },
  { label: 'Open Source', value: 'opensource' },
];

const NAVBAR_HEIGHT = 64;

const AI_LABS = [
  { id: 'all', name: 'All Labs', icon: '🌐' },
  { id: 'OpenAI', name: 'OpenAI', icon: '🧠' },
  { id: 'Anthropic', name: 'Anthropic', icon: '👑' },
  { id: 'Google', name: 'Google DeepMind', icon: '🔬' },
  { id: 'Meta', name: 'Meta', icon: '🦙' },
  { id: 'DeepSeek', name: 'DeepSeek', icon: '💻' },
  { id: 'Alibaba', name: 'Alibaba (Qwen)', icon: '🀄' },
  { id: 'xAI', name: 'xAI / Grok', icon: '⚡' },
  { id: 'Mistral', name: 'Mistral AI', icon: '🌀' },
  { id: 'Cohere', name: 'Cohere', icon: '🔵' },
  { id: 'Microsoft', name: 'Microsoft', icon: '🪟' },
];

// ── Model Card ────────────────────────────────────────────────────────────────

function ModelCard({
  model,
  isListView,
  onUseInChat,
  onDetails,
}: {
  model: AIModel;
  isListView: boolean;
  onUseInChat: (id: string) => void;
  onDetails: (model: AIModel) => void;
}) {
  if (isListView) {
    return (
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          background: DS.white,
          border: `1px solid ${DS.bg2}`,
          borderRadius: 3,
          p: 2,
          transition: 'all 0.18s ease',
          '&:hover': {
            borderColor: DS.accent + '44',
            boxShadow: `0 2px 12px ${DS.accent}11`,
          },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: 48,
            height: 48,
            borderRadius: 2,
            background: model.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 24,
            flexShrink: 0,
            position: 'relative',
          }}
        >
          {model.icon}
          {model.badge && (
            <Box
              sx={{
                position: 'absolute',
                top: -6,
                right: -6,
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: DS.white,
                background: model.badge === 'hot' ? DS.accent : DS.blue,
                px: 0.75,
                py: 0.15,
                borderRadius: 1,
                lineHeight: 1.7,
              }}
            >
              {model.badge}
            </Box>
          )}
        </Box>

        {/* Name + lab */}
        <Box sx={{ minWidth: 180 }}>
          <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: DS.text }}>
            {model.name}
          </Typography>
          <Typography sx={{ fontSize: 11, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
            {model.lab}
          </Typography>
        </Box>

        {/* Desc */}
        <Typography
          sx={{
            flex: 1,
            fontSize: 12,
            color: DS.text2,
            fontFamily: 'Instrument Sans, sans-serif',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {model.desc}
        </Typography>

        {/* Tags */}
        <Box sx={{ display: 'flex', gap: 0.5, flexShrink: 0 }}>
          {model.tags.slice(0, 2).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                fontSize: 10,
                height: 20,
                background: DS.bg,
                color: DS.text2,
                border: `1px solid ${DS.bg2}`,
                fontFamily: 'Instrument Sans, sans-serif',
              }}
            />
          ))}
        </Box>

        {/* Rating */}
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, minWidth: 70 }}>
          <StarRating rating={model.rating} />
          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.25 }}>
            {model.rating}
          </Typography>
        </Box>

        {/* Price */}
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: model.price_start === 0 ? '#2E7D32' : DS.text,
            fontFamily: 'Instrument Sans, sans-serif',
            flexShrink: 0,
            minWidth: 90,
            textAlign: 'right',
          }}
        >
          {model.price}
        </Typography>

        {/* Actions */}
        <Box sx={{ display: 'flex', gap: 1, flexShrink: 0 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => onDetails(model)}
            sx={{
              fontSize: 11,
              borderColor: DS.bg2,
              color: DS.text2,
              borderRadius: 2,
              fontFamily: 'Instrument Sans, sans-serif',
              textTransform: 'none',
              '&:hover': { borderColor: DS.accent, color: DS.accent, background: DS.accentLt },
            }}
          >
            Details
          </Button>
          <Button
            size="small"
            variant="contained"
            onClick={() => onUseInChat(model.id)}
            sx={{
              fontSize: 11,
              background: DS.accent,
              borderRadius: 2,
              fontFamily: 'Instrument Sans, sans-serif',
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { background: '#b5561f', boxShadow: 'none' },
            }}
          >
            Use in Chat
          </Button>
        </Box>
      </Box>
    );
  }

  // Grid card
  return (
    <Box
      sx={{
        background: DS.white,
        border: `1px solid ${DS.bg2}`,
        borderRadius: 3,
        p: 2.5,
        display: 'flex',
        flexDirection: 'column',
        gap: 1.5,
        transition: 'all 0.18s ease',
        '&:hover': {
          borderColor: DS.accent + '44',
          boxShadow: `0 4px 20px ${DS.accent}11`,
          transform: 'translateY(-1px)',
        },
        height: '100%',
      }}
    >
      {/* Top Row */}
      <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <Box
          sx={{
            width: 52,
            height: 52,
            borderRadius: 2.5,
            background: model.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 26,
            position: 'relative',
            flexShrink: 0,
          }}
        >
          {model.icon}
          {model.badge && (
            <Box
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                color: DS.white,
                background: model.badge === 'hot' ? DS.accent : DS.blue,
                px: 0.875,
                py: 0.15,
                borderRadius: 1,
                lineHeight: 1.8,
                boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
              }}
            >
              {model.badge}
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <StarRating rating={model.rating} size={12} />
          <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
            ({model.reviews.toLocaleString()})
          </Typography>
        </Box>
      </Box>

      {/* Name + Lab */}
      <Box>
        <Typography
          sx={{
            fontFamily: 'Syne, sans-serif',
            fontWeight: 700,
            fontSize: 15,
            color: DS.text,
            lineHeight: 1.2,
            mb: 0.25,
          }}
        >
          {model.name}
        </Typography>
        <Typography sx={{ fontSize: 11, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
          {model.lab}
        </Typography>
      </Box>

      {/* Description */}
      <Typography
        sx={{
          fontSize: 12,
          color: DS.text2,
          fontFamily: 'Instrument Sans, sans-serif',
          lineHeight: 1.6,
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          flex: 1,
        }}
      >
        {model.desc}
      </Typography>

      {/* Tags */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
        {model.tags.slice(0, 3).map((tag) => (
          <Chip
            key={tag}
            label={tag}
            size="small"
            sx={{
              fontSize: 10,
              height: 20,
              background: DS.bg,
              color: DS.text2,
              border: `1px solid ${DS.bg2}`,
              fontFamily: 'Instrument Sans, sans-serif',
            }}
          />
        ))}
        {model.tags.length > 3 && (
          <Chip
            label={`+${model.tags.length - 3}`}
            size="small"
            sx={{
              fontSize: 10,
              height: 20,
              background: DS.bg2,
              color: DS.text3,
              fontFamily: 'Instrument Sans, sans-serif',
            }}
          />
        )}
      </Box>

      <Divider sx={{ borderColor: DS.bg2 }} />

      {/* Price + Actions */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 700,
            color: model.price_start === 0 ? '#2E7D32' : DS.text,
            fontFamily: 'Instrument Sans, sans-serif',
          }}
        >
          {model.price}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => onDetails(model)}
          sx={{
            fontSize: 11,
            borderColor: DS.bg2,
            color: DS.text2,
            borderRadius: 2,
            fontFamily: 'Instrument Sans, sans-serif',
            textTransform: 'none',
            '&:hover': { borderColor: DS.accent, color: DS.accent, background: DS.accentLt },
          }}
        >
          Details
        </Button>
        <Button
          size="small"
          variant="contained"
          fullWidth
          onClick={() => onUseInChat(model.id)}
          endIcon={<OpenInNewIcon sx={{ fontSize: 12 }} />}
          sx={{
            fontSize: 11,
            background: DS.accent,
            borderRadius: 2,
            fontFamily: 'Instrument Sans, sans-serif',
            textTransform: 'none',
            fontWeight: 600,
            boxShadow: 'none',
            '&:hover': { background: '#b5561f', boxShadow: 'none' },
          }}
        >
          Use in Chat
        </Button>
      </Box>
    </Box>
  );
}

// ── Model Detail Dialog ───────────────────────────────────────────────────────

function ModelDetailDialog({
  model,
  onClose,
  onUseInChat,
}: {
  model: AIModel | null;
  onClose: () => void;
  onUseInChat: (id: string) => void;
}) {
  if (!model) return null;

  const pricingTiers = [
    { tier: 'Input', price: model.price },
    { tier: 'Output', price: model.price_start === 0 ? 'Free' : `$${(model.price_start * 3).toFixed(2)}/1M tk` },
    { tier: 'Batch', price: model.price_start === 0 ? 'Free' : `$${(model.price_start * 0.5).toFixed(2)}/1M tk` },
  ];

  const useCases: Record<string, string[]> = {
    language: ['Text generation', 'Summarization', 'Translation', 'Q&A'],
    vision: ['Image analysis', 'OCR', 'Visual Q&A', 'Scene description'],
    code: ['Code generation', 'Debugging', 'Code review', 'Documentation'],
    image: ['Image creation', 'Style transfer', 'Concept art', 'Product images'],
    audio: ['Transcription', 'Translation', 'Voice recognition', 'Audio analysis'],
  };

  const modelUseCases = model.types.flatMap((t) => useCases[t] || []).slice(0, 8);

  return (
    <Dialog
      open={!!model}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
          background: DS.white,
          overflow: 'hidden',
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 2,
          fontFamily: 'Syne, sans-serif',
          borderBottom: `1px solid ${DS.bg2}`,
          py: 2.5,
          px: 3,
        }}
      >
        <Box
          sx={{
            width: 56,
            height: 56,
            borderRadius: 2.5,
            background: model.bg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            flexShrink: 0,
          }}
        >
          {model.icon}
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 20, color: DS.text, lineHeight: 1.2 }}>
            {model.name}
          </Typography>
          <Typography sx={{ fontSize: 12, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mt: 0.25 }}>
            {model.lab} · {model.provider}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mt: 0.75 }}>
            <StarRating rating={model.rating} />
            <Typography sx={{ fontSize: 11, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
              {model.rating} · {model.reviews.toLocaleString()} reviews
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          size="small"
          sx={{ color: DS.text3, '&:hover': { background: DS.bg } }}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ px: 3, py: 2.5 }}>
        <Stack spacing={2.5}>
          {/* Description */}
          <Box>
            <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: DS.text, mb: 0.75 }}>
              Description
            </Typography>
            <Typography sx={{ fontSize: 13, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif', lineHeight: 1.7 }}>
              {model.desc}
            </Typography>
          </Box>

          {/* All Tags */}
          <Box>
            <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: DS.text, mb: 0.75 }}>
              Capabilities
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {model.tags.map((tag) => (
                <Chip
                  key={tag}
                  label={tag}
                  size="small"
                  sx={{
                    fontSize: 11,
                    background: DS.accentLt,
                    color: DS.accent,
                    border: `1px solid ${DS.accent}33`,
                    fontFamily: 'Instrument Sans, sans-serif',
                    fontWeight: 600,
                  }}
                />
              ))}
              {model.types.map((type) => (
                <Chip
                  key={type}
                  label={type}
                  size="small"
                  sx={{
                    fontSize: 11,
                    background: DS.bg,
                    color: DS.text2,
                    border: `1px solid ${DS.bg2}`,
                    fontFamily: 'Instrument Sans, sans-serif',
                  }}
                />
              ))}
            </Box>
          </Box>

          <Divider sx={{ borderColor: DS.bg2 }} />

          {/* Specs */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Box sx={{ flex: 1, background: DS.bg, borderRadius: 2, p: 1.5, border: `1px solid ${DS.bg2}` }}>
              <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mb: 0.25 }}>
                Context Window
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: DS.text, fontFamily: 'Syne, sans-serif' }}>
                {model.context}
              </Typography>
            </Box>
            <Box sx={{ flex: 1, background: DS.bg, borderRadius: 2, p: 1.5, border: `1px solid ${DS.bg2}` }}>
              <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', mb: 0.25 }}>
                Provider
              </Typography>
              <Typography sx={{ fontSize: 14, fontWeight: 700, color: DS.text, fontFamily: 'Syne, sans-serif' }}>
                {model.provider}
              </Typography>
            </Box>
          </Box>

          {/* Pricing Tiers */}
          <Box>
            <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: DS.text, mb: 1 }}>
              Pricing
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
              {pricingTiers.map(({ tier, price }) => (
                <Box
                  key={tier}
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    px: 1.5,
                    py: 1,
                    background: DS.bg,
                    borderRadius: 2,
                    border: `1px solid ${DS.bg2}`,
                  }}
                >
                  <Typography sx={{ fontSize: 12, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
                    {tier} tokens
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 700,
                      color: model.price_start === 0 ? '#2E7D32' : DS.text,
                      fontFamily: 'Instrument Sans, sans-serif',
                    }}
                  >
                    {price}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Use Cases */}
          <Box>
            <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 13, color: DS.text, mb: 0.75 }}>
              Use Cases
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
              {modelUseCases.map((uc) => (
                <Chip
                  key={uc}
                  label={uc}
                  size="small"
                  sx={{
                    fontSize: 11,
                    background: DS.bg,
                    color: DS.text2,
                    border: `1px solid ${DS.bg2}`,
                    fontFamily: 'Instrument Sans, sans-serif',
                  }}
                />
              ))}
            </Box>
          </Box>
        </Stack>
      </DialogContent>

      <DialogActions
        sx={{
          px: 3,
          py: 2,
          borderTop: `1px solid ${DS.bg2}`,
          gap: 1,
        }}
      >
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: DS.bg2,
            color: DS.text2,
            borderRadius: 2,
            fontFamily: 'Instrument Sans, sans-serif',
            textTransform: 'none',
            '&:hover': { borderColor: DS.text3, background: DS.bg },
          }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          onClick={() => { onUseInChat(model.id); onClose(); }}
          endIcon={<OpenInNewIcon sx={{ fontSize: 14 }} />}
          sx={{
            background: DS.accent,
            borderRadius: 2,
            fontFamily: 'Instrument Sans, sans-serif',
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: 'none',
            '&:hover': { background: '#b5561f', boxShadow: 'none' },
          }}
        >
          Use in Chat Hub
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function MarketplacePage() {
  const router = useRouter();
  const allModels: AIModel[] = modelsData as AIModel[];

  // Filter state
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [selectedProviders, setSelectedProviders] = useState<string[]>([]);
  const [pricingFilter, setPricingFilter] = useState('all');
  const [ratingFilter, setRatingFilter] = useState(0);
  const [contextMax, setContextMax] = useState(2000000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [detailModel, setDetailModel] = useState<AIModel | null>(null);
  const [activeLab, setActiveLab] = useState('all');

  // Parse context numbers
  const parseContext = (ctx: string): number => {
    if (ctx === 'N/A') return 0;
    const match = ctx.match(/(\d+(\.\d+)?)(M|K)?/i);
    if (!match) return 0;
    const num = parseFloat(match[1]);
    const unit = match[3]?.toUpperCase();
    if (unit === 'M') return num * 1_000_000;
    if (unit === 'K') return num * 1_000;
    return num;
  };

  const filteredModels = useMemo(() => {
    return allModels.filter((model) => {
      // Search
      if (search) {
        const q = search.toLowerCase();
        if (
          !model.name.toLowerCase().includes(q) &&
          !model.lab.toLowerCase().includes(q) &&
          !model.desc.toLowerCase().includes(q) &&
          !model.tags.some((t) => t.toLowerCase().includes(q))
        ) return false;
      }
      // Type / category
      if (typeFilter !== 'all') {
        if (typeFilter === 'opensource') {
          if (!model.tags.some((t) => t.toLowerCase().includes('open'))) return false;
        } else {
          if (!model.types.includes(typeFilter)) return false;
        }
      }
      // Lab filter (from labs bar)
      if (activeLab !== 'all' && !model.org?.toLowerCase().includes(activeLab.toLowerCase()) && model.lab !== activeLab) return false;
      // Provider
      if (selectedProviders.length > 0 && !selectedProviders.includes(model.provider)) return false;
      // Pricing
      if (pricingFilter === 'free' && model.price_start !== 0) return false;
      if (pricingFilter === 'lt1' && (model.price_start === 0 || model.price_start >= 1)) return false;
      if (pricingFilter === '1to5' && (model.price_start < 1 || model.price_start >= 5)) return false;
      if (pricingFilter === 'gt5' && model.price_start < 5) return false;
      // Rating
      if (ratingFilter > 0 && model.rating < ratingFilter) return false;
      // Context
      const ctx = parseContext(model.context);
      if (ctx > 0 && ctx > contextMax) return false;
      return true;
    });
  }, [allModels, search, typeFilter, selectedProviders, pricingFilter, ratingFilter, contextMax, activeLab]);

  const handleProviderToggle = (provider: string) => {
    setSelectedProviders((prev) =>
      prev.includes(provider) ? prev.filter((p) => p !== provider) : [...prev, provider]
    );
  };

  const handleClearFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setSelectedProviders([]);
    setPricingFilter('all');
    setRatingFilter(0);
    setContextMax(2000000);
  };

  const handleUseInChat = (modelId: string) => {
    router.push(`/chat?model=${modelId}`);
  };

  const hasActiveFilters =
    search || typeFilter !== 'all' || selectedProviders.length > 0 ||
    pricingFilter !== 'all' || ratingFilter > 0 || contextMax < 2000000;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: DS.bg,
        fontFamily: 'Instrument Sans, sans-serif',
      }}
    >
      <Navbar />

      {/* ── TOP BAR ── */}
      <Box
        sx={{
          background: DS.white,
          borderBottom: `1px solid ${DS.bg2}`,
          px: { xs: 2, md: 4 },
          py: 2,
          position: 'sticky',
          top: 65,
          zIndex: 100,
        }}
      >
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            flexWrap: 'wrap',
          }}
        >
          <Typography
            sx={{
              fontFamily: 'Syne, sans-serif',
              fontWeight: 800,
              fontSize: { xs: 20, md: 26 },
              color: DS.text,
              flexShrink: 0,
            }}
          >
            Marketplace
          </Typography>

          {/* Search */}
          <Box
            sx={{
              flex: 1,
              minWidth: 200,
              maxWidth: 480,
              display: 'flex',
              alignItems: 'center',
              background: DS.bg,
              borderRadius: 2,
              border: `1.5px solid ${DS.bg2}`,
              px: 1.5,
              transition: 'border-color 0.15s',
              '&:focus-within': { borderColor: DS.accent },
            }}
          >
            <SearchIcon sx={{ fontSize: 18, color: DS.text3, mr: 0.75 }} />
            <TextField
              variant="standard"
              placeholder="Search models, labs, capabilities..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              InputProps={{ disableUnderline: true }}
              sx={{
                flex: 1,
                '& input': {
                  fontSize: 13,
                  color: DS.text,
                  fontFamily: 'Instrument Sans, sans-serif',
                  py: 0.875,
                  '&::placeholder': { color: DS.text3 },
                },
              }}
            />
            {search && (
              <IconButton size="small" onClick={() => setSearch('')} sx={{ p: 0.25 }}>
                <CloseIcon sx={{ fontSize: 14, color: DS.text3 }} />
              </IconButton>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
            <Typography sx={{ fontSize: 12, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>
              {filteredModels.length} of {allModels.length} models
            </Typography>
            <Box sx={{ display: 'flex', border: `1px solid ${DS.bg2}`, borderRadius: 2, overflow: 'hidden' }}>
              <Tooltip title="Grid view">
                <IconButton
                  size="small"
                  onClick={() => setViewMode('grid')}
                  sx={{
                    borderRadius: 0,
                    background: viewMode === 'grid' ? DS.accentLt : 'transparent',
                    color: viewMode === 'grid' ? DS.accent : DS.text3,
                    '&:hover': { background: DS.accentLt, color: DS.accent },
                  }}
                >
                  <GridViewIcon sx={{ fontSize: 18 }} />
                </IconButton>
              </Tooltip>
              <IconButton
                size="small"
                onClick={() => setViewMode('list')}
                sx={{
                  borderRadius: 0,
                  background: viewMode === 'list' ? DS.accentLt : 'transparent',
                  color: viewMode === 'list' ? DS.accent : DS.text3,
                  '&:hover': { background: DS.accentLt, color: DS.accent },
                }}
              >
                <ViewListIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
          </Box>
        </Box>

        {/* Type Filter Chips */}
        <Box
          sx={{
            maxWidth: 1400,
            mx: 'auto',
            mt: 1.5,
            display: 'flex',
            gap: 0.75,
            overflowX: 'auto',
            pb: 0.5,
          }}
        >
          {TYPE_FILTERS.map((f) => (
            <Chip
              key={f.value}
              label={f.label}
              onClick={() => setTypeFilter(f.value)}
              sx={{
                fontSize: 12,
                fontWeight: 600,
                fontFamily: 'Instrument Sans, sans-serif',
                cursor: 'pointer',
                background: typeFilter === f.value ? DS.accent : DS.bg,
                color: typeFilter === f.value ? DS.white : DS.text2,
                border: `1px solid ${typeFilter === f.value ? DS.accent : DS.bg2}`,
                flexShrink: 0,
                '&:hover': {
                  background: typeFilter === f.value ? DS.accent : DS.bg2,
                },
                '& .MuiChip-label': { px: 1.5 },
              }}
            />
          ))}
        </Box>
      </Box>

      {/* ── LABS BAR ── */}
      <Box
        sx={{
          background: DS.white,
          borderBottom: `1px solid ${DS.bg2}`,
          px: { xs: 2, md: 4 },
          py: 1,
          overflowX: 'auto',
          '&::-webkit-scrollbar': { height: 0 },
        }}
      >
        <Box sx={{ maxWidth: 1400, mx: 'auto', display: 'flex', alignItems: 'center', gap: 0.5, py: 1 }}>
          <Typography sx={{ fontSize: '10px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: DS.text3, whiteSpace: 'nowrap', pr: 1.5, flexShrink: 0 }}>
            AI Labs
          </Typography>
          {AI_LABS.map((lab) => {
            const count = lab.id === 'all' ? allModels.length : allModels.filter((m) => m.lab === lab.id || m.org?.includes(lab.id)).length;
            const active = activeLab === lab.id;
            return (
              <Box
                key={lab.id}
                onClick={() => setActiveLab(lab.id)}
                sx={{
                  display: 'inline-flex', alignItems: 'center', gap: 0.75,
                  px: 1.5, py: 0.625,
                  border: `1.5px solid ${active ? DS.accent : DS.bg2}`,
                  borderRadius: '2rem',
                  cursor: 'pointer',
                  background: active ? DS.accent : DS.bg,
                  flexShrink: 0,
                  transition: 'all 0.15s',
                  '&:hover': { background: active ? DS.accent : DS.accentLt, borderColor: DS.accent },
                }}
              >
                <Typography sx={{ fontSize: '13px', lineHeight: 1 }}>{lab.icon}</Typography>
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: active ? '#fff' : DS.text2, fontFamily: 'Instrument Sans, sans-serif', whiteSpace: 'nowrap' }}>
                  {lab.name}
                </Typography>
                <Typography sx={{ fontSize: '10px', opacity: 0.7, color: active ? '#fff' : DS.text3, fontWeight: 500 }}>
                  ({count})
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>

      {/* ── BODY ── */}
      <Box
        sx={{
          maxWidth: 1400,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 3,
          display: 'flex',
          gap: 3,
          alignItems: 'flex-start',
        }}
      >
        {/* ── LEFT SIDEBAR FILTERS ── */}
        <Box
          sx={{
            width: 220,
            flexShrink: 0,
            background: DS.white,
            borderRadius: 3,
            border: `1px solid ${DS.bg2}`,
            p: 2.5,
            position: 'sticky',
            top: NAVBAR_HEIGHT + 120,
            display: { xs: 'none', md: 'block' },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <FilterListIcon sx={{ fontSize: 16, color: DS.text2 }} />
              <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 14, color: DS.text }}>
                Filters
              </Typography>
            </Box>
            {hasActiveFilters && (
              <Button
                size="small"
                onClick={handleClearFilters}
                sx={{
                  fontSize: 11,
                  color: DS.accent,
                  fontFamily: 'Instrument Sans, sans-serif',
                  textTransform: 'none',
                  p: 0,
                  minWidth: 0,
                  '&:hover': { background: 'transparent', textDecoration: 'underline' },
                }}
              >
                Clear All
              </Button>
            )}
          </Box>

          <Stack spacing={2.5}>
            {/* Provider */}
            <Box>
              <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 700, fontSize: 11, color: DS.text3, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
                Provider
              </Typography>
              <Stack spacing={0.25}>
                {PROVIDERS.map((p) => (
                  <FormControlLabel
                    key={p}
                    control={
                      <Checkbox
                        checked={selectedProviders.includes(p)}
                        onChange={() => handleProviderToggle(p)}
                        size="small"
                        sx={{
                          p: 0.5,
                          color: DS.text3,
                          '&.Mui-checked': { color: DS.accent },
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 12, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
                        {p}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: DS.bg2 }} />

            {/* Pricing */}
            <FormControl>
              <FormLabel
                sx={{
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: 700,
                  fontSize: 11,
                  color: DS.text3,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  mb: 1,
                  '&.Mui-focused': { color: DS.text3 },
                }}
              >
                Pricing
              </FormLabel>
              <RadioGroup value={pricingFilter} onChange={(e) => setPricingFilter(e.target.value)}>
                {[
                  { label: 'All', value: 'all' },
                  { label: 'Free', value: 'free' },
                  { label: '< $1/M tokens', value: 'lt1' },
                  { label: '$1–5/M tokens', value: '1to5' },
                  { label: '$5+/M tokens', value: 'gt5' },
                ].map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Radio
                        size="small"
                        sx={{ p: 0.5, color: DS.text3, '&.Mui-checked': { color: DS.accent } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 12, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
                        {label}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </RadioGroup>
            </FormControl>

            <Divider sx={{ borderColor: DS.bg2 }} />

            {/* Rating */}
            <Box>
              <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 700, fontSize: 11, color: DS.text3, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
                Minimum Rating
              </Typography>
              <Stack spacing={0.25}>
                {[
                  { label: 'Any rating', value: 0 },
                  { label: '3+ stars', value: 3 },
                  { label: '4+ stars', value: 4 },
                  { label: '4.5+ stars', value: 4.5 },
                ].map(({ label, value }) => (
                  <FormControlLabel
                    key={value}
                    control={
                      <Radio
                        checked={ratingFilter === value}
                        onChange={() => setRatingFilter(value)}
                        size="small"
                        sx={{ p: 0.5, color: DS.text3, '&.Mui-checked': { color: DS.accent } }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: 12, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
                        {label}
                      </Typography>
                    }
                    sx={{ m: 0 }}
                  />
                ))}
              </Stack>
            </Box>

            <Divider sx={{ borderColor: DS.bg2 }} />

            {/* Context Length */}
            <Box>
              <Typography sx={{ fontFamily: 'Instrument Sans, sans-serif', fontWeight: 700, fontSize: 11, color: DS.text3, textTransform: 'uppercase', letterSpacing: '0.06em', mb: 1 }}>
                Context Length
              </Typography>
              <Typography sx={{ fontSize: 12, color: DS.accent, fontFamily: 'Instrument Sans, sans-serif', fontWeight: 600, mb: 1 }}>
                Up to {contextMax >= 1_000_000 ? `${(contextMax / 1_000_000).toFixed(0)}M` : `${(contextMax / 1_000).toFixed(0)}K`} tokens
              </Typography>
              <Slider
                value={contextMax}
                onChange={(_e, v) => setContextMax(v as number)}
                min={8000}
                max={2000000}
                step={8000}
                sx={{
                  color: DS.accent,
                  '& .MuiSlider-thumb': { width: 14, height: 14 },
                  '& .MuiSlider-track': { height: 3 },
                  '& .MuiSlider-rail': { height: 3, background: DS.bg2 },
                }}
              />
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>8K</Typography>
                <Typography sx={{ fontSize: 10, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif' }}>2M</Typography>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* ── MODEL GRID / LIST ── */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          {/* Count Bar */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
            <Typography sx={{ fontSize: 13, color: DS.text2, fontFamily: 'Instrument Sans, sans-serif' }}>
              Showing{' '}
              <Box component="span" sx={{ fontWeight: 700, color: DS.text }}>
                {filteredModels.length}
              </Box>{' '}
              of{' '}
              <Box component="span" sx={{ fontWeight: 700, color: DS.text }}>
                {allModels.length}
              </Box>{' '}
              models
            </Typography>
            {hasActiveFilters && (
              <Chip
                label="Clear filters"
                size="small"
                onDelete={handleClearFilters}
                onClick={handleClearFilters}
                sx={{
                  fontSize: 11,
                  background: DS.accentLt,
                  color: DS.accent,
                  border: `1px solid ${DS.accent}33`,
                  fontFamily: 'Instrument Sans, sans-serif',
                  fontWeight: 600,
                }}
              />
            )}
          </Box>

          {/* Empty state */}
          {filteredModels.length === 0 && (
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                py: 8,
                gap: 2,
                background: DS.white,
                borderRadius: 3,
                border: `1px solid ${DS.bg2}`,
              }}
            >
              <Typography sx={{ fontSize: 48 }}>🔍</Typography>
              <Typography sx={{ fontFamily: 'Syne, sans-serif', fontWeight: 700, fontSize: 18, color: DS.text }}>
                No models found
              </Typography>
              <Typography sx={{ fontSize: 13, color: DS.text3, fontFamily: 'Instrument Sans, sans-serif', textAlign: 'center', maxWidth: 300 }}>
                Try adjusting your filters or search term to find the right model.
              </Typography>
              <Button
                onClick={handleClearFilters}
                variant="outlined"
                sx={{
                  borderColor: DS.accent,
                  color: DS.accent,
                  borderRadius: 2,
                  fontFamily: 'Instrument Sans, sans-serif',
                  textTransform: 'none',
                  '&:hover': { background: DS.accentLt },
                }}
              >
                Clear All Filters
              </Button>
            </Box>
          )}

          {/* Grid */}
          {filteredModels.length > 0 && viewMode === 'grid' && (
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, 1fr)',
                  lg: 'repeat(3, 1fr)',
                },
                gap: 2,
              }}
            >
              {filteredModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isListView={false}
                  onUseInChat={handleUseInChat}
                  onDetails={setDetailModel}
                />
              ))}
            </Box>
          )}

          {/* List */}
          {filteredModels.length > 0 && viewMode === 'list' && (
            <Stack spacing={1.5}>
              {filteredModels.map((model) => (
                <ModelCard
                  key={model.id}
                  model={model}
                  isListView={true}
                  onUseInChat={handleUseInChat}
                  onDetails={setDetailModel}
                />
              ))}
            </Stack>
          )}
        </Box>
      </Box>

      {/* ── Detail Dialog ── */}
      <ModelDetailDialog
        model={detailModel}
        onClose={() => setDetailModel(null)}
        onUseInChat={handleUseInChat}
      />
   
        {/* ── Footer ── */}
         <Box component="footer" sx={{ borderTop: `1px solid #E0DDD6`, py: 4, px: { xs: 2, md: 4 }, background: COLORS.white }}>
           <Box sx={{ maxWidth: 1200, mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
             <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, color: COLORS.text }}>NexusAI</Typography>
             <Typography sx={{ fontSize: 13 }}>© {new Date().getFullYear()} NexusAI. All rights reserved.</Typography>
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
