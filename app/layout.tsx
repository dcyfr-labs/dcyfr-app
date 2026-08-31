import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/theme-provider';
import { PageShell, SiteNav, SiteFooter } from '@/components/chrome';
import './globals.css';

const DcyfrAppLogo = (
  <span className="text-lg font-bold tracking-tight">
    dcyfr<span className="text-accent-600">.app</span>
  </span>
);

const NAV_LINKS = [
  { href: '/#templates', label: 'Templates' },
  { href: '/#matrix', label: 'Compare' },
  { href: 'https://dcyfr.io', label: 'dcyfr.io', external: true },
];

const FOOTER_COLUMNS = [
  {
    title: 'Showcase',
    links: [
      { href: '/#templates', label: 'Templates' },
      { href: '/#matrix', label: 'Compare' },
    ],
  },
  {
    title: 'Ecosystem',
    links: [
      { href: 'https://dcyfr.io', label: 'dcyfr.io', external: true },
      { href: 'https://github.com/dcyfr', label: 'GitHub', external: true },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/trademark', label: 'Trademark' },
      { href: '/privacy', label: 'Privacy' },
    ],
  },
];

const inter = Inter({
  subsets: ['latin'],
  // Named for the face, not the role. The theme engine binds <body> and
  // headings to --font-body / --font-display, and the theme resolves each
  // through a --font-<role>-loaded hook; globals.css points those hooks and
  // the `font-sans` utility at this one variable. Naming it for the face means
  // three roles can share it without any Tailwind theme key pointing at
  // another, and swapping Inter out later is a one-line change here.
  //
  // (v4 also emits its own `--font-sans` default onto this same <html>, but
  // inside `@layer theme`, and next/font injects this class unlayered —
  // unlayered beats layered regardless of source order, so there is no
  // clobber.)
  variable: '--font-inter',
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
    // data-identity selects the theme package; the .dark class (added by
    // ThemeProvider) selects the scheme. They are orthogonal by construction —
    // the theme is scoped [data-identity="slate"] / [data-identity="slate"].dark
    // — so identity and scheme can no longer tie on specificity the way two
    // single classes on this same element did. Stamped server-side, so it is
    // present in the first paint rather than after hydration.
    <html
      lang="en"
      suppressHydrationWarning
      data-identity="slate"
      className={`${inter.variable} theme-dcyfr-app`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PageShell
            nav={<SiteNav logo={DcyfrAppLogo} links={NAV_LINKS} />}
            footer={
              <SiteFooter
                brand={{
                  name: 'dcyfr.app',
                  tagline: 'Starter template showcase',
                }}
                columns={FOOTER_COLUMNS}
              />
            }
            padding="none"
            maxWidth="full"
          >
            {children}
          </PageShell>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
