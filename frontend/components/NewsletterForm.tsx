'use client';

import { useState, FormEvent } from 'react';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <p style={{ color: '#22c55e', fontSize: '15px', fontFamily: "'Instrument Sans', Arial, sans-serif", fontWeight: 500 }}>
        You&apos;re in! Check your inbox for a confirmation.
      </p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}
        noValidate
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          aria-label="Email address for newsletter"
          style={{
            flex: '1',
            minWidth: '220px',
            maxWidth: '320px',
            padding: '12px 18px',
            background: 'rgba(255,255,255,0.06)',
            border: `1px solid ${error ? '#f87171' : 'rgba(255,255,255,0.12)'}`,
            borderRadius: '2rem',
            color: '#FFFFFF',
            fontSize: '14px',
            fontFamily: "'Instrument Sans', Arial, sans-serif",
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            padding: '12px 24px',
            background: '#C8622A',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '2rem',
            fontSize: '14px',
            fontWeight: 600,
            fontFamily: "'Instrument Sans', Arial, sans-serif",
            cursor: 'pointer',
            whiteSpace: 'nowrap',
          }}
        >
          Subscribe free →
        </button>
      </form>
      {error && (
        <p style={{ color: '#f87171', fontSize: '13px', marginTop: '8px', fontFamily: "'Instrument Sans', Arial, sans-serif" }}>
          {error}
        </p>
      )}
    </>
  );
}
