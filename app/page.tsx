import type { Metadata } from 'next';
import { TemplateGrid } from '@/components/TemplateGrid';
import { IntegrationMatrix } from '@/components/IntegrationMatrix';
import templates from '@/data/templates.json';
import type { Template } from '@/lib/types';

export const metadata: Metadata = {
  title: 'DCYFR Templates — Production-Ready Starter Templates',
};

// JSON-LD structured data for SEO (task 3.4)
function TemplateJsonLd() {
  const items = (templates as Template[]).map((t) => ({
    '@type': 'SoftwareApplication',
    name: t.name,
    description: t.description,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    url: `https://dcyfr.app/templates/${t.id}`,
    downloadUrl: `https://github.com/${t.githubRepo}`,
    softwareVersion: t.version,
    programmingLanguage: t.primaryLanguage,
  }));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'DCYFR Starter Templates',
          description: 'Production-ready starter templates for AI-powered applications',
          url: 'https://dcyfr.app',
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item,
          })),
        }),
      }}
    />
  );
}

export default function HomePage() {
  const typedTemplates = templates as Template[];

  return (
    <>
      <TemplateJsonLd />
      <div className="min-h-screen">
        {/* Header / Nav */}
        <header className="border-b border-dcyfr-primary-800/60 bg-dcyfr-primary-950/95 sticky top-0 z-10 backdrop-blur-sm">
          <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <a href="/" className="flex items-center gap-2.5">
              <span className="text-lg font-bold text-white">
                dcyfr<span className="text-dcyfr-accent">.app</span>
              </span>
            </a>
            <nav className="flex items-center gap-4 text-sm" aria-label="Main navigation">
              <a
                href="#templates"
                className="text-dcyfr-primary-300 hover:text-white transition-colors"
              >
                Templates
              </a>
              <a
                href="#matrix"
                className="text-dcyfr-primary-300 hover:text-white transition-colors"
              >
                Compare
              </a>
              <a
                href="https://dcyfr.io"
                className="text-dcyfr-primary-300 hover:text-white transition-colors"
              >
                dcyfr.io ↗
              </a>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section
          className="border-b border-dcyfr-primary-800/40 bg-gradient-to-b from-dcyfr-primary-950 to-dcyfr-primary-900/60 px-4 py-16 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-dcyfr-accent">
              Starter Templates
            </p>
            <h1
              id="hero-heading"
              className="mb-4 text-4xl font-bold tracking-tight text-white sm:text-5xl"
            >
              Build faster with{' '}
              <span className="text-dcyfr-accent">production-ready</span> templates
            </h1>
            <p className="mb-8 text-lg text-dcyfr-primary-300 leading-relaxed">
              8 battle-tested starter templates for AI-powered applications. Every template
              ships with TypeScript, @dcyfr/ai integration, and the tooling you actually need.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href="#templates"
                className="rounded-lg bg-dcyfr-accent-700 px-6 py-3 text-sm font-semibold text-white transition-opacity hover:bg-dcyfr-accent-600 focus-visible:outline-2 focus-visible:outline-dcyfr-accent"
              >
                Browse Templates
              </a>
              <a
                href="https://github.com/dcyfr"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg border border-dcyfr-primary-600/60 px-6 py-3 text-sm font-semibold text-dcyfr-primary-200 transition-colors hover:border-dcyfr-accent/40 hover:text-white"
              >
                View on GitHub
              </a>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-b border-dcyfr-primary-800/40 bg-dcyfr-primary-900/40">
          <div className="mx-auto flex max-w-7xl divide-x divide-dcyfr-primary-800/60 px-4 sm:px-6 lg:px-8">
            {[
              { value: '8', label: 'Templates' },
              { value: '100%', label: 'TypeScript' },
              { value: '@dcyfr/ai', label: 'Powered by' },
              { value: 'MIT', label: 'License' },
            ].map(({ value, label }) => (
              <div key={label} className="flex-1 px-6 py-4 text-center">
                <p className="text-lg font-bold text-white">{value}</p>
                <p className="text-xs text-dcyfr-primary-300">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <main>
          <section
            id="templates"
            className="px-4 py-12 sm:px-6 lg:px-8"
            aria-labelledby="templates-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="templates-heading"
                className="mb-8 text-2xl font-bold text-white"
              >
                All Templates
              </h2>
              <TemplateGrid templates={typedTemplates} />
            </div>
          </section>

          {/* Integration Matrix */}
          <section
            id="matrix"
            className="border-t border-dcyfr-primary-800/40 px-4 py-12 sm:px-6 lg:px-8"
            aria-labelledby="matrix-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="matrix-heading"
                className="mb-2 text-2xl font-bold text-white"
              >
                Feature Comparison
              </h2>
              <p className="mb-8 text-dcyfr-primary-300">
                Compare what&apos;s included in each template at a glance.
              </p>
              <IntegrationMatrix templates={typedTemplates} />
            </div>
          </section>

          {/* Deployment CTA */}
          <section
            className="border-t border-dcyfr-primary-800/40 bg-dcyfr-primary-900/40 px-4 py-12 sm:px-6 lg:px-8"
            aria-labelledby="deploy-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="deploy-heading"
                className="mb-2 text-2xl font-bold text-white"
              >
                Deploy in seconds
              </h2>
              <p className="mb-6 text-dcyfr-primary-300">
                Every template is pre-wired for one-click Vercel deployment.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {typedTemplates
                  .filter((t) => t.vercelDeployUrl)
                  .slice(0, 3)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-lg border border-dcyfr-primary-700/60 bg-dcyfr-primary-900/60 p-4"
                    >
                      <div>
                        <p className="font-medium text-white">{t.name}</p>
                        <p className="text-xs text-dcyfr-primary-300">{t.stack.join(' · ')}</p>
                      </div>
                      <a
                        href={t.vercelDeployUrl!}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-md bg-black px-3 py-1.5 text-xs font-medium text-white hover:bg-dcyfr-primary-800 transition-colors border border-dcyfr-primary-700/60"
                      >
                        ▲ Deploy
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-dcyfr-primary-800/60 px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">
                dcyfr<span className="text-dcyfr-accent">.app</span>
              </span>
              <span className="text-dcyfr-primary-500">·</span>
              <span className="text-dcyfr-primary-400">Starter template showcase</span>
            </div>
            <nav className="flex gap-4 text-dcyfr-primary-400" aria-label="Footer navigation">
              <a href="https://dcyfr.io" className="hover:text-white transition-colors">
                dcyfr.io
              </a>
              <a href="https://github.com/dcyfr" className="hover:text-white transition-colors">
                GitHub
              </a>
              <a href="/trademark" className="hover:text-white transition-colors">
                Trademark
              </a>
              <a href="/privacy" className="hover:text-white transition-colors">
                Privacy
              </a>
            </nav>
          </div>
        </footer>
      </div>
    </>
  );
}
