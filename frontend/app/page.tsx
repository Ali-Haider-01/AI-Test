import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';
import NewsletterForm from '@/components/NewsletterForm';

// ─── Data ────────────────────────────────────────────────────────────────────

const STATS = [
  { value: '400+', label: 'AI Models' },
  { value: '50+', label: 'Providers' },
  { value: '1M+', label: 'Requests/day' },
  { value: '99.9%', label: 'Uptime' },
];

const FEATURES = [
  {
    title: 'Chat Hub',
    description: 'Talk to GPT-5, Claude, Gemini, Llama, and 400+ more models through one unified chat interface — switch mid-conversation without losing context.',
    href: '/chat',
    badge: '400+ Models',
    accent: '#C8622A',
    bg: '#FDF1EB',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#C8622A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
  },
  {
    title: 'Marketplace',
    description: 'Filter 400+ models by capability, price, context window, and speed. Side-by-side benchmarks so you always pick the right model for the job.',
    href: '/marketplace',
    badge: '50+ Providers',
    accent: '#1E4DA8',
    bg: '#EEF2FB',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1E4DA8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
  },
  {
    title: 'AI Agents',
    description: 'Build autonomous agents that browse, write, code, and ship — chain models together into powerful multi-step workflows with no-code builders.',
    href: '/agents',
    badge: 'Coming Soon',
    accent: '#0A5E49',
    bg: '#E8F3F0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0A5E49" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
];

const STEPS = [
  {
    n: '01',
    title: 'Choose a model',
    body: 'Browse 400+ models across GPT, Claude, Gemini, Llama, Mistral, and more. Filter by speed, price, or capability.',
    accent: '#C8622A',
  },
  {
    n: '02',
    title: 'Start chatting',
    body: 'Paste a prompt or pick a suggestion. Upload files, images, or code. Switch models at any point without losing your history.',
    accent: '#1E4DA8',
  },
  {
    n: '03',
    title: 'Ship faster',
    body: 'Export conversations, automate with agents, or connect to your own app via the NexusAI API. Go from idea to production in minutes.',
    accent: '#0A5E49',
  },
];

const MODEL_CHIPS = [
  { icon: '🧠', name: 'GPT-5', lab: 'OpenAI', bg: '#EEF2FD' },
  { icon: '👑', name: 'Claude Sonnet 4.6', lab: 'Anthropic', bg: '#FDF1EB' },
  { icon: '🔬', name: 'Gemini 2.5 Pro', lab: 'Google', bg: '#E8F3F0' },
  { icon: '🦙', name: 'Llama 3.3 70B', lab: 'Meta', bg: '#F0EDF9' },
  { icon: '💻', name: 'DeepSeek V3', lab: 'DeepSeek', bg: '#EEF6FF' },
  { icon: '🌀', name: 'Mistral Large', lab: 'Mistral', bg: '#FDF6E3' },
  { icon: '⚡', name: 'Grok-3', lab: 'xAI', bg: '#F5F5F5' },
  { icon: '🀄', name: 'Qwen 2.5 Max', lab: 'Alibaba', bg: '#FFF0F0' },
];

const TESTIMONIALS = [
  {
    quote: "We cut our model-switching overhead by 80%. Having one interface for GPT, Claude, and Gemini is a game-changer for our research team.",
    name: 'Sarah K.',
    role: 'AI Research Lead, Synthex',
    avatar: 'SK',
    color: '#C8622A',
  },
  {
    quote: "The Marketplace benchmarks saved us hours of trial-and-error. We found the right model for our use case in under 10 minutes.",
    name: 'Daniel M.',
    role: 'CTO, BuildFast',
    avatar: 'DM',
    color: '#1E4DA8',
  },
  {
    quote: "Guest mode means my whole team can try NexusAI without signing up first. Onboarding friction went to zero.",
    name: 'Priya R.',
    role: 'Product Manager, Nexgen',
    avatar: 'PR',
    color: '#0A5E49',
  },
];

const TRUST_LOGOS = ['OpenAI', 'Anthropic', 'Google DeepMind', 'Meta AI', 'Mistral AI', 'DeepSeek', 'xAI', 'Cohere', 'Alibaba'];

const FOOTER_COLS = [
  {
    heading: 'Product',
    links: [
      { label: 'Chat Hub', href: '/chat' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'AI Agents', href: '/agents' },
      { label: 'Discover', href: '/discover' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Cookie Policy', href: '/cookies' },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div style={{ background: '#F4F2EE', color: '#1C1A16', fontFamily: "'Instrument Sans', Arial, sans-serif", overflowX: 'hidden' }}>
      <style>{`
        /* Global resets for this page */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        /* Hover utilities */
        .nx-feature-card { transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease !important; }
        .nx-feature-card:hover { transform: translateY(-4px) !important; box-shadow: 0 12px 40px rgba(0,0,0,0.10) !important; border-color: rgba(28,26,22,0.14) !important; }

        .nx-cta-primary { transition: background 0.15s, box-shadow 0.15s, transform 0.15s !important; }
        .nx-cta-primary:hover { background: #B5561F !important; box-shadow: 0 6px 24px rgba(200,98,42,0.45) !important; transform: translateY(-1px) !important; }

        .nx-cta-secondary { transition: background 0.15s, border-color 0.15s !important; }
        .nx-cta-secondary:hover { background: #ECEAE4 !important; border-color: rgba(28,26,22,0.25) !important; }

        .nx-step-card { transition: box-shadow 0.2s, border-color 0.2s !important; }
        .nx-step-card:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.08) !important; border-color: rgba(28,26,22,0.12) !important; }

        .nx-model-chip { transition: background 0.15s, box-shadow 0.15s, transform 0.15s !important; cursor: default; }
        .nx-model-chip:hover { transform: translateY(-2px) !important; box-shadow: 0 4px 16px rgba(0,0,0,0.08) !important; }

        .nx-footer-link { transition: color 0.15s !important; }
        .nx-footer-link:hover { color: #C8622A !important; }

        .nx-testimonial { transition: box-shadow 0.2s !important; }
        .nx-testimonial:hover { box-shadow: 0 8px 32px rgba(0,0,0,0.09) !important; }

        /* Scrolling marquee */
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .nx-marquee-inner { display: flex; gap: 40px; animation: marquee 28s linear infinite; width: max-content; }
        .nx-marquee-inner:hover { animation-play-state: paused; }

        /* Dot grid hero background */
        .nx-hero-bg {
          background-image: radial-gradient(circle, rgba(28,26,22,0.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }

        /* Gradient text */
        .nx-gradient-text {
          background: linear-gradient(135deg, #C8622A 0%, #E8822A 50%, #A34D1E 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Responsive */
        @media (max-width: 640px) {
          .nx-hero-title { font-size: 2.2rem !important; }
          .nx-stats-row { gap: 24px !important; }
          .nx-steps-grid { grid-template-columns: 1fr !important; }
          .nx-features-grid { grid-template-columns: 1fr !important; }
          .nx-models-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .nx-testimonials-grid { grid-template-columns: 1fr !important; }
          .nx-footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
          .nx-cta-buttons { flex-direction: column !important; align-items: stretch !important; }
          .nx-cta-buttons a { justify-content: center !important; }
        }
        @media (max-width: 900px) {
          .nx-models-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="nx-hero-bg" style={{ padding: '96px 24px 80px', textAlign: 'center', position: 'relative' }}>

        {/* Radial glow behind headline */}
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-60%)', width: '700px', height: '400px', background: 'radial-gradient(ellipse, rgba(200,98,42,0.07) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '780px', margin: '0 auto', position: 'relative' }}>

          {/* Eyebrow pill */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDF1EB', border: '1px solid rgba(200,98,42,0.25)', borderRadius: '999px', padding: '6px 16px', marginBottom: '32px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0, boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
            <span style={{ fontSize: '13px', fontWeight: 600, color: '#C8622A', letterSpacing: '0.01em', whiteSpace: 'nowrap' }}>
              Now with 400+ AI Models
            </span>
          </div>

          {/* H1 */}
          <h1 className="nx-hero-title" style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(2.6rem, 6vw, 4.2rem)', fontWeight: 800, color: '#1C1A16', lineHeight: 1.08, letterSpacing: '-0.035em', marginBottom: '24px' }}>
            One platform for<br />
            <span className="nx-gradient-text">every AI model</span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#5A5750', maxWidth: '520px', margin: '0 auto 40px', lineHeight: 1.75 }}>
            Chat with GPT-5, Claude, Gemini, Llama, and 400+ more — compare, switch, and deploy from one unified hub.
          </p>

          {/* Search bar */}
          <SearchBar />

          {/* Trust note */}
          <p style={{ fontSize: '13px', color: '#9E9B93', marginTop: '16px' }}>
            No credit card required · Guest mode available · 82K+ builders trust NexusAI
          </p>
        </div>

        {/* Stats strip */}
        <div className="nx-stats-row" style={{ display: 'flex', justifyContent: 'center', gap: '56px', flexWrap: 'wrap', marginTop: '72px', paddingTop: '48px', borderTop: '1px solid rgba(28,26,22,0.08)' }}>
          {STATS.map((s, i) => (
            <div key={s.label} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              {i > 0 && <div style={{ display: 'none' }} />}
              <span style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: '2rem', fontWeight: 800, color: '#1C1A16', lineHeight: 1 }}>
                {s.value}
              </span>
              <span style={{ fontSize: '12.5px', color: '#9E9B93', fontWeight: 500, letterSpacing: '0.02em' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── TRUST LOGOS / MARQUEE ────────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgba(28,26,22,0.07)', borderBottom: '1px solid rgba(28,26,22,0.07)', background: '#ECEAE4', padding: '20px 0', overflow: 'hidden' }}>
        <div style={{ marginBottom: '8px', textAlign: 'center' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9E9B93' }}>
            Models from the world&apos;s leading AI labs
          </span>
        </div>
        <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)' }}>
          <div className="nx-marquee-inner">
            {[...TRUST_LOGOS, ...TRUST_LOGOS].map((logo, i) => (
              <span key={i} style={{ fontSize: '14px', fontWeight: 600, color: '#9E9B93', whiteSpace: 'nowrap', fontFamily: "'Syne', Arial, sans-serif", letterSpacing: '-0.2px' }}>
                {logo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Section header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8622A', background: '#FDF1EB', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px' }}>
              Platform
            </div>
            <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)', fontWeight: 800, color: '#1C1A16', letterSpacing: '-0.03em', marginBottom: '14px' }}>
              Everything you need to build with AI
            </h2>
            <p style={{ color: '#5A5750', fontSize: '16px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.7 }}>
              One platform for exploring, comparing, and deploying AI — across every use case and team size.
            </p>
          </div>

          {/* Feature cards */}
          <div className="nx-features-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {FEATURES.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="nx-feature-card"
                style={{ display: 'flex', flexDirection: 'column', background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid rgba(28,26,22,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', textDecoration: 'none' }}
              >
                {/* Icon + badge */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: f.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {f.icon}
                  </div>
                  <span style={{ fontSize: '11px', fontWeight: 700, color: f.accent, background: f.bg, padding: '4px 11px', borderRadius: '999px', letterSpacing: '0.02em', whiteSpace: 'nowrap' }}>
                    {f.badge}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: '19px', fontWeight: 700, color: '#1C1A16', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#5A5750', lineHeight: 1.7, flex: 1 }}>
                  {f.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '24px', color: f.accent, fontSize: '13px', fontWeight: 700 }}>
                  Explore {f.title}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#ECEAE4', borderTop: '1px solid rgba(28,26,22,0.07)', borderBottom: '1px solid rgba(28,26,22,0.07)', padding: '96px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#1E4DA8', background: '#EEF2FB', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px' }}>
              How it works
            </div>
            <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#1C1A16', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              From zero to AI in 3 steps
            </h2>
          </div>

          {/* Steps */}
          <div className="nx-steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {STEPS.map((step, i) => (
              <div key={step.n} className="nx-step-card" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '32px', border: '1px solid rgba(28,26,22,0.07)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)', position: 'relative' }}>
                {/* Step number */}
                <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '0.08em', color: step.accent, marginBottom: '20px', fontFamily: "'Syne', Arial, sans-serif" }}>
                  {step.n}
                </div>
                {/* Connector line (not last) */}
                {i < STEPS.length - 1 && (
                  <div style={{ display: 'none' }} className="nx-connector" />
                )}
                <h3 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: '18px', fontWeight: 700, color: '#1C1A16', marginBottom: '10px', letterSpacing: '-0.02em' }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#5A5750', lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODEL SHOWCASE ───────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#0A5E49', background: '#E8F3F0', display: 'inline-block', padding: '5px 14px', borderRadius: '999px', marginBottom: '12px' }}>
                Models
              </div>
              <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 800, color: '#1C1A16', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
                Top models, one place
              </h2>
            </div>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: 600, color: '#C8622A', textDecoration: 'none', whiteSpace: 'nowrap' }}>
              Browse all models
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          {/* Model chips grid */}
          <div className="nx-models-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px' }}>
            {MODEL_CHIPS.map((m) => (
              <Link
                key={m.name}
                href="/marketplace"
                className="nx-model-chip"
                style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#FFFFFF', border: '1px solid rgba(28,26,22,0.07)', borderRadius: '14px', padding: '14px 16px', textDecoration: 'none', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: m.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}>
                  {m.icon}
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1A16', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: '11.5px', color: '#9E9B93', marginTop: '2px' }}>
                    {m.lab}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* More models pill */}
          <div style={{ textAlign: 'center', marginTop: '28px' }}>
            <Link href="/marketplace" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#ECEAE4', borderRadius: '999px', padding: '10px 22px', fontSize: '13px', fontWeight: 600, color: '#5A5750', textDecoration: 'none', border: '1px solid rgba(28,26,22,0.07)' }}>
              + 392 more models in the Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section style={{ background: '#ECEAE4', borderTop: '1px solid rgba(28,26,22,0.07)', borderBottom: '1px solid rgba(28,26,22,0.07)', padding: '96px 24px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '56px' }}>
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#C8622A', background: '#FDF1EB', padding: '5px 14px', borderRadius: '999px', marginBottom: '16px' }}>
              Testimonials
            </div>
            <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)', fontWeight: 800, color: '#1C1A16', letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Loved by 82K+ builders
            </h2>
          </div>

          {/* Cards */}
          <div className="nx-testimonials-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="nx-testimonial" style={{ background: '#FFFFFF', borderRadius: '20px', padding: '28px', border: '1px solid rgba(28,26,22,0.07)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Quote marks */}
                <div style={{ fontSize: '36px', lineHeight: 1, color: t.color, fontFamily: 'Georgia, serif', opacity: 0.5 }}>&ldquo;</div>
                <p style={{ fontSize: '14.5px', color: '#1C1A16', lineHeight: 1.72, flex: 1 }}>
                  {t.quote}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingTop: '16px', borderTop: '1px solid rgba(28,26,22,0.07)' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: t.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: "'Instrument Sans', Arial, sans-serif", fontWeight: 700, fontSize: '12px', flexShrink: 0 }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#1C1A16' }}>{t.name}</div>
                    <div style={{ fontSize: '12px', color: '#9E9B93', marginTop: '1px' }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section style={{ padding: '96px 24px', textAlign: 'center', background: '#F4F2EE' }}>
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Tag */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDF1EB', border: '1px solid rgba(200,98,42,0.25)', borderRadius: '999px', padding: '5px 14px', marginBottom: '24px' }}>
            <span style={{ fontSize: '12px', fontWeight: 700, color: '#C8622A', letterSpacing: '0.05em' }}>FREE TO START</span>
          </div>

          <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(2rem, 5vw, 3.2rem)', fontWeight: 800, color: '#1C1A16', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '18px' }}>
            Start building with AI<br />today — no credit card
          </h2>
          <p style={{ color: '#5A5750', fontSize: '16px', marginBottom: '36px', lineHeight: 1.7 }}>
            Join thousands of developers and businesses already shipping faster, smarter products with NexusAI.
          </p>

          {/* Buttons */}
          <div className="nx-cta-buttons" style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/chat"
              className="nx-cta-primary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#C8622A', color: '#fff', padding: '14px 30px', borderRadius: '999px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 20px rgba(200,98,42,0.35)', fontFamily: "'Instrument Sans', Arial, sans-serif" }}
            >
              Start Building Now
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/marketplace"
              className="nx-cta-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', color: '#1C1A16', padding: '14px 26px', borderRadius: '999px', fontSize: '15px', fontWeight: 600, textDecoration: 'none', border: '1.5px solid rgba(28,26,22,0.15)', fontFamily: "'Instrument Sans', Arial, sans-serif" }}
            >
              Browse Models
            </Link>
          </div>

          {/* Trust signals */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', flexWrap: 'wrap', marginTop: '32px' }}>
            {['No credit card', 'Guest mode', '400+ models free to explore'].map((item) => (
              <span key={item} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#9E9B93' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────────────────────── */}
      <footer>
        {/* Newsletter band */}
        <div style={{ background: '#1C1A16', padding: '80px 24px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            {/* Left: copy */}
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8622A', marginBottom: '16px' }}>
                Newsletter
              </div>
              <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.15, letterSpacing: '-0.03em', marginBottom: '14px' }}>
                New models drop every week.
              </h2>
              <p style={{ fontSize: '15px', color: '#9E9B93', lineHeight: 1.65 }}>
                Get a curated weekly digest: new releases, benchmarks, pricing changes, and prompt tips — straight to your inbox.
              </p>
            </div>
            {/* Right: form */}
            <div>
              <NewsletterForm />
              <p style={{ fontSize: '12px', color: '#5A5750', marginTop: '12px' }}>
                No spam. Unsubscribe any time. Trusted by 82K+ builders.
              </p>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div style={{ background: '#141310', padding: '56px 24px 32px' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
            {/* Top: logo + cols */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr repeat(3, 1fr)', gap: '48px', marginBottom: '48px' }}>
              {/* Brand col */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: '#C8622A', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ color: '#fff', fontFamily: "'Syne', Arial, sans-serif", fontWeight: 800, fontSize: '16px', lineHeight: 1 }}>N</span>
                  </div>
                  <span style={{ fontFamily: "'Syne', Arial, sans-serif", fontWeight: 700, fontSize: '18px', color: '#FFFFFF' }}>NexusAI</span>
                </div>
                <p style={{ fontSize: '13.5px', color: '#5A5750', lineHeight: 1.7, maxWidth: '220px' }}>
                  The AI Model Hub for every task. Access, compare, and deploy 400+ AI models in one place.
                </p>
              </div>

              {/* Link cols */}
              {FOOTER_COLS.map((col) => (
                <div key={col.heading}>
                  <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#5A5750', marginBottom: '16px' }}>
                    {col.heading}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="nx-footer-link" style={{ fontSize: '13.5px', color: '#5A5750', textDecoration: 'none' }}>
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Bottom bar */}
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <span style={{ fontSize: '12.5px', color: '#3A3830' }}>
                © {new Date().getFullYear()} NexusAI Model Hub. All rights reserved.
              </span>
              <div style={{ display: 'flex', gap: '20px' }}>
                {['Privacy', 'Terms', 'Cookies'].map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`} className="nx-footer-link" style={{ fontSize: '12.5px', color: '#3A3830', textDecoration: 'none' }}>
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
