import Link from 'next/link';
import Navbar from '@/components/Navbar';
import SearchBar from '@/components/SearchBar';

// Feature cards data
interface Feature {
  title: string;
  description: string;
  href: string;
  color: string;
  bgColor: string;
  badge: string;
}

const FEATURES: Feature[] = [
  {
    title: 'Chat Hub',
    description:
      'Access 400+ AI models in one place. Switch between GPT-5, Claude, Gemini, and more — all with a unified conversation interface.',
    href: '/chat',
    color: '#C8622A',
    bgColor: '#FDF1EB',
    badge: '400+ Models',
  },
  {
    title: 'Marketplace',
    description:
      'Browse, compare, and discover AI models by capability, cost, and performance. Find the perfect model for every task.',
    href: '/marketplace',
    color: '#1E4DA8',
    bgColor: '#EEF2FB',
    badge: '50+ Providers',
  },
  {
    title: 'AI Agents',
    description:
      'Build and deploy autonomous AI agents that handle complex workflows, research tasks, and business automation.',
    href: '/agents',
    color: '#0A5E49',
    bgColor: '#E8F3F0',
    badge: 'Automation',
  },
];

const STATS = [
  { value: '400+', label: 'AI Models' },
  { value: '50+', label: 'Providers' },
  { value: '1M+', label: 'Requests/day' },
  { value: '99.9%', label: 'Uptime' },
];

const FOOTER_LINKS = ['Privacy', 'Terms', 'Docs', 'Blog', 'Contact'];

export default function HomePage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F4F2EE', fontFamily: "'Instrument Sans', Arial, sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section style={{ padding: '80px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Eyebrow badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDF1EB', border: '1px solid rgba(200,98,42,0.2)', borderRadius: '20px', padding: '6px 14px', marginBottom: '28px' }}>
            <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#22c55e', display: 'inline-block', boxShadow: '0 0 0 3px rgba(34,197,94,0.2)' }} />
            <span style={{ fontSize: '13px', fontWeight: 500, color: '#C8622A', letterSpacing: '0.01em' }}>
              400+ AI Models Available
            </span>
          </div>

          {/* H1 */}
          <h1 style={{
            fontFamily: "'Syne', Arial, sans-serif",
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#1C1A16',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            maxWidth: '800px',
            margin: '0 auto 20px',
          }}>
            The AI Model Hub for{' '}
            <span style={{ color: '#C8622A' }}>Every Task</span>
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 2vw, 1.15rem)',
            color: '#5A5750',
            maxWidth: '560px',
            margin: '0 auto 36px',
            lineHeight: 1.7,
          }}>
            Access, compare, and chat with the world&apos;s best AI models in one unified platform.
            From GPT-5 to Claude, Gemini to open-source — all in one place.
          </p>

          {/* Search bar */}
          <SearchBar />

          {/* Stats row */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '56px' }}>
            {STATS.map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: '2rem', fontWeight: 800, color: '#1C1A16', lineHeight: 1 }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: '13px', color: '#9E9B93', marginTop: '4px', fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '24px 24px 80px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{
              fontFamily: "'Syne', Arial, sans-serif",
              fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
              fontWeight: 700,
              color: '#1C1A16',
              marginBottom: '12px',
            }}>
              Everything you need to build with AI
            </h2>
            <p style={{ color: '#5A5750', fontSize: '15px', maxWidth: '460px', margin: '0 auto' }}>
              One platform for exploring, comparing, and deploying AI across every use case.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
            {FEATURES.map((feature) => (
              <Link
                key={feature.href}
                href={feature.href}
                style={{
                  display: 'block',
                  background: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px',
                  border: '1px solid rgba(28,26,22,0.07)',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.07), 0 4px 16px rgba(0,0,0,0.04)',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: feature.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feature.color,
                  }}>
                    <FeatureIcon title={feature.title} color={feature.color} />
                  </div>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: 600,
                    color: feature.color,
                    background: feature.bgColor,
                    padding: '4px 10px',
                    borderRadius: '20px',
                    letterSpacing: '0.02em',
                  }}>
                    {feature.badge}
                  </span>
                </div>
                <h3 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: '18px', fontWeight: 700, color: '#1C1A16', marginBottom: '10px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#5A5750', lineHeight: 1.65 }}>
                  {feature.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '20px', color: feature.color, fontSize: '13px', fontWeight: 600 }}>
                  Explore
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ background: '#ECEAE4', borderTop: '1px solid rgba(28,26,22,0.07)', borderBottom: '1px solid rgba(28,26,22,0.07)', padding: '72px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#FDF1EB', border: '1px solid rgba(200,98,42,0.2)', borderRadius: '20px', padding: '5px 12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '12px', fontWeight: 600, color: '#C8622A' }}>FREE TO START</span>
          </div>
          <h2 style={{
            fontFamily: "'Syne', Arial, sans-serif",
            fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
            fontWeight: 800,
            color: '#1C1A16',
            lineHeight: 1.15,
            marginBottom: '16px',
            letterSpacing: '-0.02em',
          }}>
            Start building with AI<br />today — no credit card needed
          </h2>
          <p style={{ color: '#5A5750', fontSize: '15px', marginBottom: '32px', lineHeight: 1.7 }}>
            Join thousands of developers and businesses already using NexusAI to ship faster, smarter products.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/chat"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#C8622A',
                color: '#fff',
                padding: '13px 28px',
                borderRadius: '20px',
                fontFamily: "'Instrument Sans', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 2px 12px rgba(200,98,42,0.3)',
                transition: 'all 0.15s ease',
              }}
            >
              Start Building Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
            <Link
              href="/marketplace"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: '#FFFFFF',
                color: '#1C1A16',
                padding: '13px 24px',
                borderRadius: '20px',
                fontFamily: "'Instrument Sans', Arial, sans-serif",
                fontSize: '15px',
                fontWeight: 500,
                textDecoration: 'none',
                border: '1px solid rgba(28,26,22,0.15)',
                transition: 'all 0.15s ease',
              }}
            >
              Browse Models
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter + Dark Footer */}
      <footer>
        {/* Newsletter band */}
        <div style={{ background: '#1C1A16', padding: '72px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C8622A', marginBottom: '16px' }}>
              Stay ahead of the curve
            </div>
            <h2 style={{ fontFamily: "'Syne', Arial, sans-serif", fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: '16px' }}>
              New models drop every week.<br />Don&apos;t miss a release.
            </h2>
            <p style={{ fontSize: '15px', color: '#9E9B93', lineHeight: 1.6, marginBottom: '32px' }}>
              Get a curated weekly digest: new model releases, benchmark comparisons, pricing changes, and prompt engineering tips — straight to your inbox.
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <input
                type="email"
                placeholder="your@email.com"
                style={{ flex: '1', minWidth: '220px', maxWidth: '320px', padding: '12px 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '2rem', color: '#FFFFFF', fontSize: '14px', fontFamily: "'Instrument Sans', Arial, sans-serif", outline: 'none' }}
              />
              <button style={{ padding: '12px 24px', background: '#C8622A', color: '#FFFFFF', border: 'none', borderRadius: '2rem', fontSize: '14px', fontWeight: 600, fontFamily: "'Instrument Sans', Arial, sans-serif", cursor: 'pointer', whiteSpace: 'nowrap' }}>
                Subscribe free →
              </button>
            </div>
            <p style={{ fontSize: '12px', color: '#5A5750', marginTop: '12px' }}>
              No spam. Unsubscribe any time. Trusted by 82K+ builders.
            </p>
          </div>
        </div>
        {/* Footer bar */}
        <div style={{ background: '#141310', padding: '20px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontFamily: "'Syne', Arial, sans-serif", fontWeight: 600, fontSize: '14px', color: '#9E9B93' }}>
              NexusAI Model Hub
            </span>
            <nav style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              {FOOTER_LINKS.map((item) => (
                <Link key={item} href={`/${item.toLowerCase()}`} style={{ fontSize: '13px', color: '#5A5750', textDecoration: 'none' }}>
                  {item}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Inline SVG icons per feature to avoid JSX in data array
function FeatureIcon({ title, color }: { title: string; color: string }) {
  if (title === 'Chat Hub') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    );
  }
  if (title === 'Marketplace') {
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    );
  }
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07M8.46 8.46a5 5 0 0 0 0 7.07" />
    </svg>
  );
}
