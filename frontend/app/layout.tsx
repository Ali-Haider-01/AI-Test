import type { Metadata } from 'next';
import { Syne, Instrument_Sans } from 'next/font/google';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter';
import './globals.css';
import Providers from '@/components/Providers';

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NexusAI — AI Model Hub',
  description:
    'NexusAI is the premier AI Model Hub — explore 400+ AI models from 50+ providers, chat with any AI, and build powerful workflows.',
  keywords: ['AI', 'artificial intelligence', 'AI models', 'chatbot', 'NexusAI', 'AI hub'],
  authors: [{ name: 'NexusAI' }],
  openGraph: {
    title: 'NexusAI — AI Model Hub',
    description: 'Explore 400+ AI models. Chat, build, and automate with the best AI.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${syne.variable} ${instrumentSans.variable}`}
    >
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
