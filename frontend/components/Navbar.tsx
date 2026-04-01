'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '@/lib/store';
import { logout } from '@/lib/store';

// Language options
interface Language {
  code: string;
  label: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
}

const LANGUAGES: Language[] = [
  { code: 'EN', label: 'English', nativeLabel: 'English', dir: 'ltr' },
  { code: 'FR', label: 'French', nativeLabel: 'Français', dir: 'ltr' },
  { code: 'DE', label: 'German', nativeLabel: 'Deutsch', dir: 'ltr' },
  { code: 'ES', label: 'Spanish', nativeLabel: 'Español', dir: 'ltr' },
  { code: 'AR', label: 'Arabic', nativeLabel: 'العربية', dir: 'rtl' },
  { code: 'UR', label: 'Urdu', nativeLabel: 'اردو', dir: 'rtl' },
  { code: 'ZH', label: 'Chinese', nativeLabel: '中文', dir: 'ltr' },
  { code: 'JA', label: 'Japanese', nativeLabel: '日本語', dir: 'ltr' },
];

const NAV_LINKS = [
  { label: 'Chat Hub', href: '/chat' },
  { label: 'Marketplace', href: '/marketplace' },
  { label: 'Discover New', href: '/discover' },
  { label: 'Agents', href: '/agents' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const [langOpen, setLangOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Language>(LANGUAGES[0]);
  const [langToast, setLangToast] = useState<string | null>(null);

  const langRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  function handleSelectLang(lang: Language) {
    setSelectedLang(lang);
    setLangOpen(false);
    document.documentElement.dir = lang.dir;
    document.documentElement.lang = lang.code.toLowerCase();
    setLangToast(`Language changed to ${lang.nativeLabel}`);
    setTimeout(() => setLangToast(null), 2500);
  }

  function handleLogout() {
    dispatch(logout());
    if (typeof window !== 'undefined') {
      localStorage.removeItem('nexusai_token');
      localStorage.removeItem('nexusai_user');
    }
    setUserMenuOpen(false);
    router.push('/');
  }

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Styles
  const navStyle: React.CSSProperties = {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    background: 'rgba(244,242,238,0.92)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(28,26,22,0.08)',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
  };

  const containerStyle: React.CSSProperties = {
    maxWidth: '1280px',
    margin: '0 auto',
    padding: '0 24px',
    height: '64px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '24px',
  };

  const logoStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    textDecoration: 'none',
    flexShrink: 0,
  };

  const logoMarkStyle: React.CSSProperties = {
    width: '32px',
    height: '32px',
    borderRadius: '8px',
    background: '#C8622A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontFamily: "'Syne', Arial, sans-serif",
    fontWeight: 800,
    fontSize: '18px',
    letterSpacing: '-1px',
    flexShrink: 0,
  };

  const logoTextStyle: React.CSSProperties = {
    fontFamily: "'Syne', Arial, sans-serif",
    fontWeight: 700,
    fontSize: '20px',
    color: '#1C1A16',
    letterSpacing: '-0.5px',
  };

  const navLinksStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    listStyle: 'none',
  };

  const rightSideStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexShrink: 0,
  };

  const ghostBtnStyle: React.CSSProperties = {
    padding: '8px 16px',
    borderRadius: '20px',
    border: '1px solid rgba(28,26,22,0.18)',
    background: 'transparent',
    color: '#1C1A16',
    fontFamily: "'Instrument Sans', Arial, sans-serif",
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
  };

  const primaryBtnStyle: React.CSSProperties = {
    padding: '8px 18px',
    borderRadius: '20px',
    border: 'none',
    background: '#C8622A',
    color: '#fff',
    fontFamily: "'Instrument Sans', Arial, sans-serif",
    fontSize: '13px',
    fontWeight: 600,
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    transition: 'all 0.15s ease',
    whiteSpace: 'nowrap',
    boxShadow: '0 1px 4px rgba(200,98,42,0.25)',
  };

  return (
    <>
      <nav style={navStyle} role="navigation" aria-label="Main navigation">
        <div style={containerStyle}>
          {/* Logo */}
          <Link href="/" style={logoStyle} aria-label="NexusAI Home">
            <div style={logoMarkStyle} aria-hidden="true">N</div>
            <span style={logoTextStyle}>NexusAI</span>
          </Link>

          {/* Center nav links - hidden on mobile */}
          <ul style={{ ...navLinksStyle, display: 'none' }} className="nexus-nav-links" aria-label="Navigation links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  style={{
                    display: 'inline-block',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontFamily: "'Instrument Sans', Arial, sans-serif",
                    fontSize: '13.5px',
                    fontWeight: 500,
                    textDecoration: 'none',
                    color: isActive(link.href) ? '#C8622A' : '#5A5750',
                    background: isActive(link.href) ? '#FDF1EB' : 'transparent',
                    transition: 'all 0.15s ease',
                  }}
                  aria-current={isActive(link.href) ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right side */}
          <div style={rightSideStyle}>
            {/* Language selector */}
            <div ref={langRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setLangOpen(!langOpen)}
                style={{
                  ...ghostBtnStyle,
                  gap: '4px',
                  padding: '7px 12px',
                }}
                aria-label="Select language"
                aria-expanded={langOpen}
                aria-haspopup="listbox"
              >
                <span style={{ fontSize: '13px', color: '#9E9B93' }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}>
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </span>
                <span style={{ fontWeight: 600, color: '#1C1A16', fontSize: '12px' }}>{selectedLang.code}</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#9E9B93" strokeWidth="2.5" style={{ display: 'inline', verticalAlign: 'middle', marginLeft: '2px' }}>
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {langOpen && (
                <div
                  role="listbox"
                  aria-label="Language options"
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1px solid rgba(28,26,22,0.1)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                    minWidth: '168px',
                    overflow: 'hidden',
                    zIndex: 1100,
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      role="option"
                      aria-selected={selectedLang.code === lang.code}
                      onClick={() => handleSelectLang(lang)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                        padding: '9px 14px',
                        background: selectedLang.code === lang.code ? '#FDF1EB' : 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: "'Instrument Sans', Arial, sans-serif",
                        fontSize: '13px',
                        color: selectedLang.code === lang.code ? '#C8622A' : '#1C1A16',
                        textAlign: 'left',
                        transition: 'background 0.1s',
                      }}
                    >
                      <span>{lang.nativeLabel}</span>
                      <span style={{ fontSize: '11px', color: '#9E9B93', marginLeft: '8px' }}>{lang.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth buttons or user menu */}
            {isAuthenticated && user ? (
              <div ref={userMenuRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '50%',
                    background: '#C8622A',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    fontFamily: "'Syne', Arial, sans-serif",
                    fontSize: '14px',
                    fontWeight: 700,
                  }}
                  aria-label="User menu"
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {userMenuOpen && (
                  <div
                    role="menu"
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 8px)',
                      right: 0,
                      background: '#fff',
                      borderRadius: '12px',
                      border: '1px solid rgba(28,26,22,0.1)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
                      minWidth: '180px',
                      overflow: 'hidden',
                      zIndex: 1100,
                    }}
                  >
                    <div style={{ padding: '12px 14px 8px', borderBottom: '1px solid rgba(28,26,22,0.07)' }}>
                      <div style={{ fontWeight: 600, fontSize: '13px', color: '#1C1A16' }}>{user.name}</div>
                      <div style={{ fontSize: '11px', color: '#9E9B93', marginTop: '2px' }}>{user.email}</div>
                    </div>
                    {[
                      { label: 'Dashboard', href: '/dashboard' },
                      { label: 'History', href: '/dashboard/history' },
                      { label: 'Settings', href: '/dashboard/settings' },
                      { label: 'Billing', href: '/dashboard/billing' },
                    ].map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        style={{
                          display: 'block',
                          padding: '9px 14px',
                          fontFamily: "'Instrument Sans', Arial, sans-serif",
                          fontSize: '13px',
                          color: '#1C1A16',
                          textDecoration: 'none',
                          transition: 'background 0.1s',
                        }}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <div style={{ borderTop: '1px solid rgba(28,26,22,0.07)', marginTop: '4px' }}>
                      <button
                        role="menuitem"
                        onClick={handleLogout}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '9px 14px',
                          fontFamily: "'Instrument Sans', Arial, sans-serif",
                          fontSize: '13px',
                          color: '#9B2042',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left',
                          transition: 'background 0.1s',
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/auth/login" style={ghostBtnStyle} className="nexus-signin-btn">
                  Sign In
                </Link>
                <Link href="/auth/signup" style={primaryBtnStyle}>
                  Get Started
                </Link>
              </>
            )}

            {/* Hamburger - mobile only */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="nexus-hamburger"
              style={{
                display: 'none',
                flexDirection: 'column',
                gap: '5px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '4px',
              }}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span style={{ width: '22px', height: '2px', background: '#1C1A16', borderRadius: '2px', display: 'block', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
              <span style={{ width: '22px', height: '2px', background: '#1C1A16', borderRadius: '2px', display: 'block', opacity: mobileOpen ? 0 : 1, transition: 'opacity 0.2s' }} />
              <span style={{ width: '22px', height: '2px', background: '#1C1A16', borderRadius: '2px', display: 'block', transition: 'all 0.2s', transform: mobileOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div
            className="nexus-mobile-drawer"
            style={{
              background: '#F4F2EE',
              borderTop: '1px solid rgba(28,26,22,0.08)',
              padding: '16px 24px 24px',
            }}
          >
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      fontFamily: "'Instrument Sans', Arial, sans-serif",
                      fontSize: '15px',
                      fontWeight: 500,
                      textDecoration: 'none',
                      color: isActive(link.href) ? '#C8622A' : '#1C1A16',
                      background: isActive(link.href) ? '#FDF1EB' : 'transparent',
                    }}
                    aria-current={isActive(link.href) ? 'page' : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {!isAuthenticated && (
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <Link href="/auth/login" style={{ ...ghostBtnStyle, flex: 1, justifyContent: 'center' }}>
                  Sign In
                </Link>
                <Link href="/auth/signup" style={{ ...primaryBtnStyle, flex: 1, justifyContent: 'center' }}>
                  Get Started
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Toast notification */}
      {langToast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#1C1A16',
            color: '#fff',
            padding: '10px 20px',
            borderRadius: '20px',
            fontSize: '13px',
            fontFamily: "'Instrument Sans', Arial, sans-serif",
            zIndex: 9999,
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}
        >
          {langToast}
        </div>
      )}

      {/* Responsive styles */}
      <style>{`
        @media (min-width: 768px) {
          .nexus-nav-links {
            display: flex !important;
          }
          .nexus-hamburger {
            display: none !important;
          }
          .nexus-mobile-drawer {
            display: none !important;
          }
          .nexus-signin-btn {
            display: inline-flex !important;
          }
        }
        @media (max-width: 767px) {
          .nexus-nav-links {
            display: none !important;
          }
          .nexus-hamburger {
            display: flex !important;
          }
          .nexus-signin-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
