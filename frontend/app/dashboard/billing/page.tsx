'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Chip,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@mui/material';
import {
  CheckCircle as CheckIcon,
  Add as AddIcon,
  Download as DownloadIcon,
  Bolt as BoltIcon,
} from '@mui/icons-material';
import DashboardLayout from '../../../components/dashboard/DashboardLayout';

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

const currentPlan = {
  name: 'Free',
  price: '$0/month',
  features: [
    '100,000 tokens/month',
    '5 AI models included',
    'Standard support',
    'Chat history (30 days)',
    'Basic analytics',
  ],
};

const usageData = {
  used: 68420,
  total: 100000,
  percent: 68.4,
};

const modelUsage = [
  { model: 'GPT-4o', calls: 48, tokens: 32100, cost: '$1.93' },
  { model: 'Claude 3.5 Sonnet', calls: 31, tokens: 21400, cost: '$1.50' },
  { model: 'Gemini 1.5 Pro', calls: 22, tokens: 10200, cost: '$0.82' },
  { model: 'Mistral 7B', calls: 17, tokens: 4720, cost: '$0.47' },
];

const invoices = [
  { id: 'INV-2026-03', date: 'Mar 1, 2026', amount: '$0.00', status: 'Free plan', pdf: '#' },
  { id: 'INV-2026-02', date: 'Feb 1, 2026', amount: '$0.00', status: 'Free plan', pdf: '#' },
  { id: 'INV-2026-01', date: 'Jan 1, 2026', amount: '$0.00', status: 'Free plan', pdf: '#' },
];

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    features: ['100K tokens/month', '5 AI models', 'Standard support', '30-day history'],
    current: true,
    cta: 'Current Plan',
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    features: ['5M tokens/month', '20+ AI models', 'Priority support', 'Unlimited history', 'Agent workflows', 'API access'],
    current: false,
    cta: 'Upgrade to Pro',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    features: ['Unlimited tokens', 'All AI models', 'Dedicated support', 'SSO & SAML', 'Custom integrations', 'SLA guarantee'],
    current: false,
    cta: 'Contact Sales',
  },
];

export default function BillingPage() {
  const [hasPaymentMethod] = useState(false);

  return (
    <DashboardLayout>
      <Box sx={{ p: 4, maxWidth: 900, mx: 'auto', width: '100%' }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, letterSpacing: '-0.4px' }}>
            Billing
          </Typography>
          <Typography sx={{ color: COLORS.text3, fontSize: 14, mt: 0.5 }}>
            Manage your plan and payment details
          </Typography>
        </Box>

        {/* Current Plan */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text }}>
                    {currentPlan.name} Plan
                  </Typography>
                  <Chip
                    label="Active"
                    size="small"
                    sx={{
                      bgcolor: '#EDF7EE', color: '#2E7D32',
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontSize: 12, fontWeight: 600, height: 22,
                    }}
                  />
                </Box>
                <Typography sx={{ fontSize: 14, color: COLORS.text2 }}>{currentPlan.price}</Typography>
              </Box>
              <Button
                variant="contained"
                startIcon={<BoltIcon fontSize="small" />}
                sx={{
                  bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                  fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 14,
                  borderRadius: 2, boxShadow: 'none',
                  '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                }}
              >
                Upgrade Plan
              </Button>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {currentPlan.features.map((f) => (
                <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <CheckIcon sx={{ fontSize: 15, color: '#2E7D32' }} />
                  <Typography sx={{ fontSize: 13, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }}>{f}</Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Usage Meter */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 2 }}>
              Token Usage This Month
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography sx={{ fontSize: 13, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }}>
                {usageData.used.toLocaleString()} tokens used
              </Typography>
              <Typography sx={{ fontSize: 13, color: COLORS.text3, fontFamily: "'Instrument Sans', sans-serif" }}>
                {usageData.total.toLocaleString()} total
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={usageData.percent}
              sx={{
                height: 10,
                borderRadius: 5,
                bgcolor: COLORS.bg2,
                '& .MuiLinearProgress-bar': {
                  borderRadius: 5,
                  bgcolor: usageData.percent > 80 ? '#C8622A' : '#1E4DA8',
                },
              }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography sx={{ fontSize: 12, color: usageData.percent > 80 ? COLORS.accent : COLORS.text3 }}>
                {usageData.percent.toFixed(1)}% used
              </Typography>
              <Typography sx={{ fontSize: 12, color: COLORS.text3 }}>
                Resets April 1, 2026
              </Typography>
            </Box>
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 2 }}>
              Cost Breakdown
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Model', 'API Calls', 'Tokens', 'Cost'].map((h) => (
                      <TableCell key={h} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: COLORS.text3, fontWeight: 600, borderBottom: '1px solid #E0DDD6', pb: 1 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {modelUsage.map((row) => (
                    <TableRow key={row.model} sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, fontWeight: 500, borderBottom: '1px solid #F0EDE8' }}>
                        {row.model}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8' }}>
                        {row.calls}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8' }}>
                        {row.tokens.toLocaleString()}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, fontWeight: 600, borderBottom: '1px solid #F0EDE8' }}>
                        {row.cost}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={3} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, fontWeight: 700, color: COLORS.text, border: 'none', pt: 1.5 }}>
                      Total
                    </TableCell>
                    <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14, fontWeight: 700, color: COLORS.accent, border: 'none', pt: 1.5 }}>
                      $4.72
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

        {/* Plan Comparison */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 3 }}>
              Upgrade Your Plan
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 2 }}>
              {plans.map((plan) => (
                <Box
                  key={plan.name}
                  sx={{
                    p: 2.5,
                    borderRadius: 3,
                    border: plan.highlight ? `2px solid ${COLORS.accent}` : '1px solid #E0DDD6',
                    bgcolor: plan.highlight ? COLORS.accentLt : COLORS.bg,
                    position: 'relative',
                  }}
                >
                  {plan.highlight && (
                    <Chip
                      label="Most Popular"
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -12,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        bgcolor: COLORS.accent,
                        color: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        fontFamily: "'Instrument Sans', sans-serif",
                      }}
                    />
                  )}
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.text, mb: 0.5 }}>
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5, mb: 2 }}>
                    <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 26, color: COLORS.text }}>
                      {plan.price}
                    </Typography>
                    <Typography sx={{ fontSize: 13, color: COLORS.text3 }}>{plan.period}</Typography>
                  </Box>
                  <List disablePadding dense>
                    {plan.features.map((f) => (
                      <ListItem key={f} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 24 }}>
                          <CheckIcon sx={{ fontSize: 14, color: '#2E7D32' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={f}
                          primaryTypographyProps={{ fontSize: 12, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Button
                    fullWidth
                    variant={plan.highlight ? 'contained' : 'outlined'}
                    disabled={plan.current}
                    sx={{
                      mt: 2.5,
                      textTransform: 'none',
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      borderRadius: 2,
                      boxShadow: 'none',
                      ...(plan.highlight
                        ? { bgcolor: COLORS.accent, color: '#fff', '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' } }
                        : { borderColor: '#D5D2CB', color: COLORS.text2, '&:hover': { bgcolor: COLORS.bg2 } }),
                      ...(plan.current ? { bgcolor: COLORS.bg2, borderColor: COLORS.bg2, color: COLORS.text3 } : {}),
                    }}
                  >
                    {plan.cta}
                  </Button>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, mb: 3 }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 2 }}>
              Payment Method
            </Typography>
            {hasPaymentMethod ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2, bgcolor: COLORS.bg, borderRadius: 2, border: '1px solid #E0DDD6' }}>
                <Typography sx={{ fontSize: 13, color: COLORS.text, fontFamily: "'Instrument Sans', sans-serif" }}>
                  Visa ending in 4242
                </Typography>
              </Box>
            ) : (
              <Box sx={{ textAlign: 'center', py: 3 }}>
                <Typography sx={{ fontSize: 14, color: COLORS.text2, mb: 2, fontFamily: "'Instrument Sans', sans-serif" }}>
                  No payment method on file
                </Typography>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    borderColor: COLORS.accent,
                    color: COLORS.accent,
                    borderRadius: 2,
                    '&:hover': { bgcolor: COLORS.accentLt, borderColor: COLORS.accent },
                  }}
                >
                  Add Payment Method
                </Button>
              </Box>
            )}
          </CardContent>
        </Card>

        {/* Invoice History */}
        <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
          <CardContent sx={{ p: 3 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 17, color: COLORS.text, mb: 2 }}>
              Invoice History
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {['Invoice', 'Date', 'Amount', 'Status', ''].map((h, i) => (
                      <TableCell key={i} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: COLORS.text3, fontWeight: 600, borderBottom: '1px solid #E0DDD6', pb: 1 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.id} sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, fontWeight: 500, borderBottom: '1px solid #F0EDE8' }}>
                        {inv.id}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8' }}>
                        {inv.date}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, borderBottom: '1px solid #F0EDE8' }}>
                        {inv.amount}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #F0EDE8' }}>
                        <Chip
                          label={inv.status}
                          size="small"
                          sx={{ fontSize: 11, height: 20, bgcolor: COLORS.bg2, color: COLORS.text3, fontFamily: "'Instrument Sans', sans-serif" }}
                        />
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #F0EDE8' }}>
                        <IconButton size="small" href={inv.pdf} sx={{ color: COLORS.text3, '&:hover': { color: COLORS.accent } }}>
                          <DownloadIcon fontSize="small" />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
