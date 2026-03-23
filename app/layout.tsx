import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://dcyfr.app'),
  title: {
    default: 'DCYFR Templates — Production-Ready Starter Templates',
    template: '%s | DCYFR Templates',
  },
  description:
    'Explore 8 production-ready starter templates for AI-powered applications. Next.js, GraphQL, React, Node.js, RAG, Chatbot, and more — all powered by @dcyfr/ai.',
  keywords: [
    'next.js template',
    'react starter template',
    'ai application template',
    'graphql api template',
    'node.js template',
    'typescript template',
    'rag pipeline template',
    'chatbot template',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dcyfr.app',
    siteName: 'DCYFR Templates',
    title: 'DCYFR Templates — Production-Ready Starter Templates',
    description:
      'Explore 8 production-ready starter templates for AI-powered applications.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'DCYFR Templates',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DCYFR Templates',
    description: 'Production-ready starter templates for AI-powered apps.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
