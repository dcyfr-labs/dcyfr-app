import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ThemeProvider } from '@/components/chrome/theme-provider';
import { SiteHeader, type HeaderNavItem } from '@/components/chrome/site-header';
import { SiteFooter, type FooterLink } from '@/components/chrome/site-footer';
import type { ChromeNavSection } from '@/components/chrome/nav-utils';
import './globals.css';

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

const DcyfrAppLogo = (
  <span className="text-lg font-bold tracking-tight">
    dcyfr<span className="text-accent-600">.app</span>
  </span>
);

// The v1 nav list minus the `external` flag: v2 nav items carry no such flag
// and every off-site link opens in the same tab.
const NAV: HeaderNavItem[] = [
  { href: '/#templates', label: 'Templates' },
  { href: '/#matrix', label: 'Compare' },
  { href: 'https://dcyfr.io', label: 'dcyfr.io' },
];

// The drawer is the only place every link is reachable below `md`: the header
// link row and the footer link row are both `hidden md:flex`. Showcase and
// Ecosystem are the v1 footer's two columns; Legal is its legal row, which the
// one-line v2 footer keeps on desktop and drops below `md`.
//
// No item may carry `icon`. This file is a Server Component and SiteHeader is
// 'use client', so an ElementType cannot cross the boundary.
const SECTIONS: ChromeNavSection[] = [
  {
    id: 'showcase',
    label: 'Showcase',
    items: [
      { href: '/#templates', label: 'Templates' },
      { href: '/#matrix', label: 'Compare' },
      { href: '/templates', label: 'All templates' },
    ],
  },
  {
    id: 'ecosystem',
    label: 'Ecosystem',
    items: [
      { href: 'https://dcyfr.io', label: 'dcyfr.io' },
      { href: 'https://github.com/dcyfr', label: 'GitHub' },
    ],
  },
  {
    id: 'legal',
    label: 'Legal',
    items: [
      { href: '/privacy', label: 'Privacy' },
      { href: 'https://dcyfr.ai/terms', label: 'Terms' },
      { href: 'https://dcyfr.ai/security', label: 'Security' },
    ],
  },
];

// Flat, and short by design: the v2 footer link row sits on one line beside the
// copyright. The v1 footer's two link columns live in the drawer above.
const FOOTER: FooterLink[] = [
  { href: '/privacy', label: 'Privacy' },
  { href: 'https://dcyfr.ai/terms', label: 'Terms' },
  { href: 'https://dcyfr.ai/security', label: 'Security' },
];

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
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
      <body className="flex min-h-dvh flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* focus:z-50 clears the fixed header, which is z-40. */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg"
          >
            Skip to content
          </a>
          <SiteHeader
            logo={DcyfrAppLogo}
            logoAriaLabel="dcyfr.app home"
            links={NAV}
            mobileNavSections={SECTIONS}
          />
          {/* pt-18 clears the fixed h-18 header. */}
          <main id="main-content" className="flex-1 pt-18">
            {children}
          </main>
          <SiteFooter brand="DCYFR" links={FOOTER} />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
