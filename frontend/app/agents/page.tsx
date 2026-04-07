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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import {
  Search as SearchIcon,
  Code as CodeIcon,
  BarChart as DataIcon,
  Create as ContentIcon,
  Support as SupportIcon,
  AutoAwesome as AutoIcon,
  PlayArrow as TryIcon,
  Add as AddIcon,
  CheckCircle as SuccessIcon,
  Error as ErrorIcon,
  HourglassEmpty as PendingIcon,
  ArrowForward as ArrowIcon,
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

const MODELS = ['GPT-4o', 'Claude 3.5 Sonnet', 'Gemini 1.5 Pro', 'Mistral 7B', 'Llama 3.1'];

interface AgentCard {
  icon: React.ReactNode;
  name: string;
  description: string;
  models: string[];
  color: string;
  bg: string;
  runs: number;
}

const agents: AgentCard[] = [
  {
    icon: <SearchIcon />,
    name: 'Research Agent',
    description: 'Autonomously searches the web, synthesizes information, and produces comprehensive research reports on any topic.',
    models: ['GPT-4o', 'Web Search'],
    color: '#1E4DA8',
    bg: '#EEF2FB',
    runs: 1842,
  },
  {
    icon: <CodeIcon />,
    name: 'Code Review Agent',
    description: 'Analyzes your code for bugs, security issues, and style violations. Provides detailed suggestions and fixes.',
    models: ['Claude 3.5', 'ESLint'],
    color: '#C8622A',
    bg: '#FDF1EB',
    runs: 3201,
  },
  {
    icon: <DataIcon />,
    name: 'Data Analysis Agent',
    description: 'Parses CSV/Excel files, runs statistical analysis, generates charts, and extracts key insights automatically.',
    models: ['Gemini 1.5 Pro', 'CSV Parser'],
    color: '#2E7D32',
    bg: '#EDF7EE',
    runs: 987,
  },
  {
    icon: <ContentIcon />,
    name: 'Content Creator Agent',
    description: 'Multi-model pipeline that researches, drafts, edits, and optimizes content across blogs, social media, and more.',
    models: ['GPT-4o', 'Claude 3.5', 'DALL-E 3'],
    color: '#7B3FA0',
    bg: '#F5EDF9',
    runs: 2156,
  },
  {
    icon: <SupportIcon />,
    name: 'Customer Support Agent',
    description: 'Fine-tuned for customer interactions. Handles inquiries, escalates edge cases, and maintains tone consistency.',
    models: ['Fine-tuned GPT-4o'],
    color: '#B8530A',
    bg: '#FFF3E0',
    runs: 5420,
  },
  {
    icon: <AutoIcon />,
    name: 'Automation Agent',
    description: 'Orchestrates complex multi-step workflows by chaining tools, APIs, and models to automate repetitive tasks.',
    models: ['GPT-4o', 'Zapier', 'APIs'],
    color: '#0277BD',
    bg: '#E1F5FE',
    runs: 762,
  },
];

const agentRuns = [
  { id: 'run_001', agent: 'Research Agent', status: 'completed', duration: '2m 14s', cost: '$0.08', time: '5 min ago' },
  { id: 'run_002', agent: 'Code Review Agent', status: 'completed', duration: '0m 47s', cost: '$0.03', time: '18 min ago' },
  { id: 'run_003', agent: 'Data Analysis Agent', status: 'running', duration: '1m 30s+', cost: '$0.05', time: 'Running...' },
  { id: 'run_004', agent: 'Content Creator Agent', status: 'failed', duration: '3m 02s', cost: '$0.12', time: '1 hr ago' },
  { id: 'run_005', agent: 'Customer Support Agent', status: 'completed', duration: '0m 22s', cost: '$0.01', time: '2 hr ago' },
];

const steps = [
  {
    step: '01',
    title: 'Define Your Goal',
    description: 'Write a clear objective for your agent. Describe what you want it to accomplish, what tools it can use, and any constraints.',
  },
  {
    step: '02',
    title: 'Select Models & Tools',
    description: 'Choose from 20+ AI models and connect tools like web search, code execution, file parsing, or external APIs.',
  },
  {
    step: '03',
    title: 'Run & Iterate',
    description: 'Launch your agent, monitor its steps in real-time, review outputs, and refine the system prompt to improve performance.',
  },
];

function StatusIcon({ status }: { status: string }) {
  if (status === 'completed') return <SuccessIcon sx={{ fontSize: 16, color: '#2E7D32' }} />;
  if (status === 'running') return <PendingIcon sx={{ fontSize: 16, color: '#1E4DA8' }} />;
  return <ErrorIcon sx={{ fontSize: 16, color: '#C62828' }} />;
}

function StatusChip({ status }: { status: string }) {
  const configs = {
    completed: { label: 'Completed', bg: '#EDF7EE', color: '#2E7D32' },
    running: { label: 'Running', bg: '#EEF2FB', color: '#1E4DA8' },
    failed: { label: 'Failed', bg: '#FFEBEE', color: '#C62828' },
  };
  const cfg = configs[status as keyof typeof configs] || configs.failed;
  return (
    <Chip
      icon={<StatusIcon status={status} />}
      label={cfg.label}
      size="small"
      sx={{ fontSize: 11, height: 22, bgcolor: cfg.bg, color: cfg.color, fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600 }}
    />
  );
}

export default function AgentsPage() {
  const [selectedModel, setSelectedModel] = useState('GPT-4o');
  const [systemPrompt, setSystemPrompt] = useState('');
  const [agentName, setAgentName] = useState('');
  const [agentGoal, setAgentGoal] = useState('');

  return (
    <Box sx={{ bgcolor: COLORS.bg, minHeight: '100vh', fontFamily: "'Instrument Sans', sans-serif" }}>
      <Navbar />

      <Box sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, py: 6 }}>
        {/* Hero */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip label="AI Agents" sx={{ bgcolor: COLORS.accentLt, color: COLORS.accent, fontWeight: 600, fontSize: 12, fontFamily: "'Instrument Sans', sans-serif", mb: 2 }} />
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
            Build
            <Box component="span" sx={{ color: COLORS.accent }}> AI Agents</Box>
          </Typography>
          <Typography sx={{ fontSize: 18, color: COLORS.text2, maxWidth: 560, mx: 'auto', lineHeight: 1.6, mb: 3.5 }}>
            Create autonomous multi-step workflows that research, analyze, code, and create — all on autopilot.
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              href="#build"
              sx={{
                bgcolor: COLORS.accent, color: '#fff', textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 15,
                borderRadius: 2, boxShadow: 'none', px: 3, py: 1.3,
                '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
              }}
            >
              Build Custom Agent
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: '#D5D2CB', color: COLORS.text2, textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif", fontWeight: 500, fontSize: 15,
                borderRadius: 2, px: 3, py: 1.3,
                '&:hover': { bgcolor: COLORS.bg2, borderColor: '#C0BDB5' },
              }}
            >
              View Docs
            </Button>
          </Box>
        </Box>

        {/* Featured Agents Grid */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text, mb: 1 }}>
            Featured Agents
          </Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.text2, mb: 3 }}>
            Ready-to-use agents powered by the best AI models
          </Typography>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(3, 1fr)' }, gap: 2.5 }}>
            {agents.map((agent) => (
              <Card
                key={agent.name}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid #E0DDD6',
                  bgcolor: COLORS.white,
                  cursor: 'pointer',
                  '&:hover': { boxShadow: '0 4px 20px rgba(28,26,22,0.1)', transform: 'translateY(-2px)', transition: 'all 0.2s ease' },
                  transition: 'all 0.2s ease',
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: agent.bg, color: agent.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {agent.icon}
                    </Box>
                    <Typography sx={{ fontSize: 11, color: COLORS.text3, fontFamily: "'Instrument Sans', sans-serif" }}>
                      {agent.runs.toLocaleString()} runs
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 700, fontSize: 16, color: COLORS.text, mb: 1 }}>
                    {agent.name}
                  </Typography>
                  <Typography sx={{ fontSize: 13, color: COLORS.text2, lineHeight: 1.6, mb: 2 }}>
                    {agent.description}
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2.5 }}>
                    {agent.models.map((m) => (
                      <Chip
                        key={m}
                        label={m}
                        size="small"
                        sx={{ fontSize: 11, height: 20, bgcolor: COLORS.bg, color: COLORS.text2, fontFamily: "'Instrument Sans', sans-serif" }}
                      />
                    ))}
                  </Box>
                  <Button
                    fullWidth
                    startIcon={<TryIcon fontSize="small" />}
                    variant="outlined"
                    sx={{
                      textTransform: 'none',
                      fontFamily: "'Instrument Sans', sans-serif",
                      fontWeight: 600,
                      fontSize: 13,
                      borderRadius: 2,
                      borderColor: agent.color,
                      color: agent.color,
                      '&:hover': { bgcolor: agent.bg, borderColor: agent.color },
                    }}
                  >
                    Try Agent
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Box>

        {/* Build Custom Agent */}
        <Box id="build" sx={{ mb: 8 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text, mb: 1 }}>
            Build Custom Agent
          </Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.text2, mb: 3 }}>
            Design your own agent with a custom model and system prompt
          </Typography>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
            <CardContent sx={{ p: 3.5 }}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2.5, mb: 2.5 }}>
                <TextField
                  label="Agent Name"
                  placeholder="e.g. My Research Agent"
                  value={agentName}
                  onChange={(e) => setAgentName(e.target.value)}
                  size="small"
                  fullWidth
                  InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
                  inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
                />
                <FormControl size="small" fullWidth>
                  <InputLabel sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>Select Model</InputLabel>
                  <Select
                    value={selectedModel}
                    label="Select Model"
                    onChange={(e) => setSelectedModel(e.target.value)}
                    sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}
                  >
                    {MODELS.map((m) => (
                      <MenuItem key={m} value={m} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 }}>{m}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <TextField
                label="Agent Goal"
                placeholder="What should this agent accomplish? Be specific..."
                value={agentGoal}
                onChange={(e) => setAgentGoal(e.target.value)}
                multiline
                rows={2}
                fullWidth
                size="small"
                sx={{ mb: 2.5 }}
                InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
                inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
              />

              <TextField
                label="System Prompt"
                placeholder="You are an expert AI agent specialized in... You have access to..."
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                multiline
                rows={5}
                fullWidth
                size="small"
                sx={{ mb: 3 }}
                InputLabelProps={{ style: { fontFamily: "'Instrument Sans', sans-serif", fontSize: 14 } }}
                inputProps={{ style: { fontFamily: "'Instrument Sans', sans-serif" } }}
              />

              <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 500,
                    fontSize: 14,
                    borderColor: '#D5D2CB',
                    color: COLORS.text2,
                    borderRadius: 2,
                    '&:hover': { bgcolor: COLORS.bg, borderColor: '#C0BDB5' },
                  }}
                >
                  Save Draft
                </Button>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  sx={{
                    textTransform: 'none',
                    fontFamily: "'Instrument Sans', sans-serif",
                    fontWeight: 600,
                    fontSize: 14,
                    bgcolor: COLORS.accent,
                    color: '#fff',
                    borderRadius: 2,
                    boxShadow: 'none',
                    '&:hover': { bgcolor: '#B5561F', boxShadow: 'none' },
                  }}
                >
                  Create Agent
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Agent Runs Log */}
        <Box sx={{ mb: 8 }}>
          <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: COLORS.text, mb: 1 }}>
            Recent Agent Runs
          </Typography>
          <Typography sx={{ fontSize: 14, color: COLORS.text2, mb: 3 }}>
            Monitor all your agent executions in one place
          </Typography>
          <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: COLORS.bg }}>
                    {['Run ID', 'Agent', 'Status', 'Duration', 'Cost', 'Time'].map((h) => (
                      <TableCell key={h} sx={{ fontFamily: "'Instrument Sans', sans-serif", fontWeight: 600, fontSize: 12, color: COLORS.text3, borderBottom: '1px solid #E0DDD6', py: 1.5 }}>
                        {h}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {agentRuns.map((run) => (
                    <TableRow key={run.id} sx={{ '&:hover': { bgcolor: COLORS.bg } }}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: 12, color: COLORS.text3, borderBottom: '1px solid #F0EDE8' }}>
                        {run.id}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, fontWeight: 500, borderBottom: '1px solid #F0EDE8' }}>
                        {run.agent}
                      </TableCell>
                      <TableCell sx={{ borderBottom: '1px solid #F0EDE8' }}>
                        <StatusChip status={run.status} />
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text2, borderBottom: '1px solid #F0EDE8' }}>
                        {run.duration}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 13, color: COLORS.text, fontWeight: 600, borderBottom: '1px solid #F0EDE8' }}>
                        {run.cost}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "'Instrument Sans', sans-serif", fontSize: 12, color: COLORS.text3, borderBottom: '1px solid #F0EDE8' }}>
                        {run.time}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>

        {/* Docs / How to build */}
        <Box sx={{ mb: 6 }}>
          <Box sx={{ textAlign: 'center', mb: 5 }}>
            <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 28, color: COLORS.text, letterSpacing: '-0.4px', mb: 1 }}>
              How to Build Agents
            </Typography>
            <Typography sx={{ fontSize: 15, color: COLORS.text2, maxWidth: 480, mx: 'auto' }}>
              Get from idea to running agent in minutes with our simple 3-step process
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 3 }}>
            {steps.map((step) => (
              <Card
                key={step.step}
                elevation={0}
                sx={{ borderRadius: 3, border: '1px solid #E0DDD6', bgcolor: COLORS.white, position: 'relative', overflow: 'visible' }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      bgcolor: COLORS.accent,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                    }}
                  >
                    <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 16, color: '#fff' }}>
                      {step.step}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18, color: COLORS.text, mb: 1 }}>
                    {step.title}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: COLORS.text2, lineHeight: 1.6 }}>
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Button
              endIcon={<ArrowIcon />}
              variant="outlined"
              sx={{
                textTransform: 'none',
                fontFamily: "'Instrument Sans', sans-serif",
                fontWeight: 600,
                fontSize: 14,
                borderColor: COLORS.accent,
                color: COLORS.accent,
                borderRadius: 2,
                px: 3,
                py: 1.2,
                '&:hover': { bgcolor: COLORS.accentLt, borderColor: COLORS.accent },
              }}
            >
              Read Full Documentation
            </Button>
          </Box>
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
