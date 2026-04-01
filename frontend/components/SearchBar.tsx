'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/chat?q=${encodeURIComponent(query.trim())}`);
    } else {
      router.push('/chat');
    }
  }

  const SUGGESTIONS = [
    'Summarise this document',
    'Generate an image',
    'Write a business plan',
    'Build a chatbot',
  ];

  return (
    <div style={{ maxWidth: '620px', margin: '0 auto' }}>
      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', background: '#fff', borderRadius: '28px', border: '1.5px solid rgba(28,26,22,0.12)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)', overflow: 'hidden', alignItems: 'center', padding: '6px 6px 6px 20px' }}>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#9E9B93"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ flexShrink: 0 }}
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ask any AI model anything..."
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: "'Instrument Sans', Arial, sans-serif",
            fontSize: '15px',
            color: '#1C1A16',
            padding: '8px 12px',
          }}
          aria-label="Search or ask any AI model"
        />
        <button
          type="submit"
          style={{
            background: '#C8622A',
            color: '#fff',
            border: 'none',
            borderRadius: '20px',
            padding: '10px 20px',
            fontFamily: "'Instrument Sans', Arial, sans-serif",
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'background 0.15s ease',
            whiteSpace: 'nowrap',
          }}
          aria-label="Start chatting"
        >
          Start Chatting
        </button>
      </form>

      {/* Suggestion pills */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '14px' }}>
        {SUGGESTIONS.map((s) => (
          <button
            key={s}
            type="button"
            onClick={() => {
              setQuery(s);
              router.push(`/chat?q=${encodeURIComponent(s)}`);
            }}
            style={{
              background: '#ECEAE4',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontSize: '12.5px',
              color: '#5A5750',
              cursor: 'pointer',
              fontFamily: "'Instrument Sans', Arial, sans-serif",
              fontWeight: 500,
              transition: 'background 0.15s',
            }}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
