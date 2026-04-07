'use client';

import React, { useState } from 'react';
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
  Switch,
  Divider,
  Alert,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  ContentCopy as CopyIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';
import { useSelector } from 'react-redux';
import type { RootState } from '../../../lib/store';

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

const MODELS = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Mistral 7B', 'Llama 3.1'];
const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Japanese', 'Chinese', 'Portuguese'];

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
      <CardContent sx={{ p: 3 }}>
        <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 2.5 }}>
          {title}
        </Typography>
        {children}
      </CardContent>
    </Card>
  );
}

export default function SettingsPage() {
  const { user } = useSelector((state: RootState) => state.auth) as { user: { name?: string; email?: string } | null };

  // Profile
  const [name, setName] = useState((user as { name?: string } | null)?.name || 'Alex Johnson');
  const [email, setEmail] = useState((user as { email?: string } | null)?.email || 'alex@example.com');
  const [profileSaved, setProfileSaved] = useState(false);

  // Preferences
  const [defaultModel, setDefaultModel] = useState('GPT-4o');
  const [language, setLanguage] = useState('English');
  const [prefSaved, setPrefSaved] = useState(false);

  // API Key
  const [showKey, setShowKey] = useState(false);
  const [apiKey] = useState('nxs_sk_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6');
  const [keyCopied, setKeyCopied] = useState(false);

  // Notifications
  const [emailNotif, setEmailNotif] = useState(true);
  const [browserNotif, setBrowserNotif] = useState(false);
  const [notifSaved, setNotifSaved] = useState(false);

  const maskedKey = apiKey.slice(0, 12) + '••••••••••••••••••••' + apiKey.slice(-4);

  const handleCopyKey = () => {
    navigator.clipboard.writeText(apiKey);
    setKeyCopied(true);
    setTimeout(() => setKeyCopied(false), 2000);
  };

  const handleSaveProfile = () => {
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  const handleSavePref = () => {
    setPrefSaved(true);
    setTimeout(() => setPrefSaved(false), 3000);
  };

  const handleSaveNotif = () => {
    setNotifSaved(true);
    setTimeout(() => setNotifSaved(false), 3000);
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 4, maxWidth: 740, mx: 'auto', width: '100%' }}>
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, letterSpacing: '-0.4px' }}>
            Settings
          </Typography>
          <Typography sx={{ color: COLORS.text3, fontSize: 14, mt: 0.5 }}>
            Manage your account preferences
          </Typography>
        </Box>

        {/* Profile */}
        <SectionCard title="Profile">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5, mb: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: COLORS.accent,
                fontSize: 22,
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                color: '#fff',
              }}
            >
              {name.charAt(0).toUpperCase()}
            </Avatar>
            <Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon fontSize="small" />}
                size="small"
                sx={{
                  textTransform: 'none',
                  fontFamily: "'Instrument Sans', sans-serif",
                  fontSize: 13,
                  borderColor: '#D5D2CB',
                  color: COLORS.text2,
                  borderRadius: 2,
                  '&:hover': { bgcolor: COLORS.bg, borderColor: '#C0BDB5' },
                }}
              >
                Change avatar
              </Button>
              <Typography sx={{ fontSize: 12, color: COLORS.text3, mt: 0.5 }}>
                JPG, PNG up to 2MB
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            <TextField
              label="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="small"
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
            />
            <TextField
              label="Email address"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              size="small"
              InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
              inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
            />
          </Box>

          {profileSaved && (
            <Alert severity="success" icon={<CheckIcon fontSize="small" />} sx={{ mt: 2, fontSize: 13 }}>
              Profile saved successfully.
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <Button
              variant="contained"
              onClick={handleSaveProfile}
              sx={{
                bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14,
                borderRadius: 2, boxShadow: 'none',
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
              }}
            >
              Save Profile
            </Button>
          </Box>
        </SectionCard>

        {/* Preferences */}
        <SectionCard title="Preferences">
          <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' } }}>
            <FormControl size="small">
              <InputLabel sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>Default AI Model</InputLabel>
              <Select
                value={defaultModel}
                label="Default AI Model"
                onChange={(e) => setDefaultModel(e.target.value)}
                sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}
              >
                {MODELS.map((m) => (
                  <MenuItem key={m} value={m} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>{m}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl size="small">
              <InputLabel sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>Language</InputLabel>
              <Select
                value={language}
                label="Language"
                onChange={(e) => setLanguage(e.target.value)}
                sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}
              >
                {LANGUAGES.map((l) => (
                  <MenuItem key={l} value={l} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>{l}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ mt: 2, p: 2, bgcolor: COLORS.bg, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box
              sx={{
                width: 16, height: 16, borderRadius: '50%', bgcolor: COLORS.accent,
                display: 'inline-block', flexShrink: 0,
              }}
            />
            <Box>
              <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.text }}>
                Theme: Light
              </Typography>
              <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>Dark mode coming soon</Typography>
            </Box>
            <Chip
              label="Light only"
              size="small"
              sx={{ ml: 'auto', fontSize: 11, bgcolor: COLORS.bg2, color: COLORS.text3, fontFamily: "'Instrument Sans', sans-serif" }}
            />
          </Box>

          {prefSaved && (
            <Alert severity="success" icon={<CheckIcon fontSize="small" />} sx={{ mt: 2, fontSize: 13 }}>
              Preferences saved.
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <Button
              variant="contained"
              onClick={handleSavePref}
              sx={{
                bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14,
                borderRadius: 2, boxShadow: 'none',
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
              }}
            >
              Save Preferences
            </Button>
          </Box>
        </SectionCard>

        {/* API Keys */}
        <SectionCard title="API Keys">
          <Typography sx={{ fontSize: 13, color: COLORS.text2, mb: 2 }}>
            Use your API key to authenticate requests to the NexusAI API.
          </Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1.5,
              borderRadius: 2,
              border: '1px solid #E0DDD6',
              bgcolor: COLORS.bg,
              mb: 2,
            }}
          >
            <Typography
              sx={{
                flex: 1,
                fontFamily: 'monospace',
                fontSize: 13,
                color: COLORS.text,
                wordBreak: 'break-all',
              }}
            >
              {showKey ? apiKey : maskedKey}
            </Typography>
            <IconButton size="small" onClick={() => setShowKey(!showKey)} sx={{ color: COLORS.text3 }}>
              {showKey ? <VisibilityOffIcon fontSize="small" /> : <VisibilityIcon fontSize="small" />}
            </IconButton>
            <IconButton size="small" onClick={handleCopyKey} sx={{ color: keyCopied ? '#2E7D32' : COLORS.text3 }}>
              {keyCopied ? <CheckIcon fontSize="small" /> : <CopyIcon fontSize="small" />}
            </IconButton>
          </Box>
          {keyCopied && (
            <Typography sx={{ fontSize: 12, color: '#2E7D32', mb: 1.5 }}>Copied to clipboard!</Typography>
          )}
          <Divider sx={{ my: 2 }} />
          <Button
            startIcon={<RefreshIcon fontSize="small" />}
            variant="outlined"
            sx={{
              textTransform: 'none',
              fontFamily: "'Instrument Sans', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: '#C62828',
              borderColor: '#FFCDD2',
              borderRadius: 2,
              '&:hover': { bgcolor: '#FFF5F5', borderColor: '#EF9A9A' },
            }}
          >
            Regenerate API Key
          </Button>
          <Typography sx={{ fontSize: 12, color: COLORS.text3, mt: 1 }}>
            Regenerating will invalidate your current key immediately.
          </Typography>
        </SectionCard>

        {/* Notifications */}
        <SectionCard title="Notifications">
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, border: '1px solid #E0DDD6' }}>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: "'Instrument Sans', sans-serif" }}>
                  Email Notifications
                </Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>
                  Receive updates about your account and model releases
                </Typography>
              </Box>
              <Switch
                checked={emailNotif}
                onChange={(e) => setEmailNotif(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: COLORS.accent },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: COLORS.accent },
                }}
              />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2, borderRadius: 2, border: '1px solid #E0DDD6' }}>
              <Box>
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: COLORS.text, fontFamily: "'Instrument Sans', sans-serif" }}>
                  Browser Notifications
                </Typography>
                <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>
                  Get notified in your browser when agent tasks complete
                </Typography>
              </Box>
              <Switch
                checked={browserNotif}
                onChange={(e) => setBrowserNotif(e.target.checked)}
                sx={{
                  '& .MuiSwitch-switchBase.Mui-checked': { color: COLORS.accent },
                  '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': { bgcolor: COLORS.accent },
                }}
              />
            </Box>
          </Box>

          {notifSaved && (
            <Alert severity="success" icon={<CheckIcon fontSize="small" />} sx={{ mt: 2, fontSize: 13 }}>
              Notification preferences saved.
            </Alert>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2.5 }}>
            <Button
              variant="contained"
              onClick={handleSaveNotif}
              sx={{
                bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14,
                borderRadius: 2, boxShadow: 'none',
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
              }}
            >
              Save Notifications
            </Button>
          </Box>
        </SectionCard>
      </Box>
    </DashboardLayout>
  );
}
