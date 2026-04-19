import type { Metadata } from 'next';
import Link from 'next/link';
import { TemplateGrid } from '@/components/TemplateGrid';
import { IntegrationMatrix } from '@/components/IntegrationMatrix';
import templates from '@/data/templates.json';
import type { Template } from '@/lib/types';
import { DcyfrButton } from '@/components/ui/dcyfr-button';
import { DcyfrBadge } from '@/components/ui/dcyfr-badge';

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
      <div>
        {/* Hero */}
        <section
          className="border-b border-border/40 bg-gradient-to-b from-background to-card/60 px-4 py-16 sm:px-6 lg:px-8"
          aria-labelledby="hero-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secure">
              Starter Templates
            </p>
            <h1
              id="hero-heading"
              className="mb-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Build faster with{' '}
              <span className="text-secure">production-ready</span> templates
            </h1>
            <p className="mb-8 text-lg text-muted-foreground leading-relaxed">
              8 battle-tested starter templates for AI-powered applications. Every template
              ships with TypeScript, @dcyfr/ai integration, and the tooling you actually need.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <DcyfrButton asChild variant="brand" size="lg">
                <Link href="#templates">Browse Templates</Link>
              </DcyfrButton>
              <DcyfrButton asChild variant="ghostly" size="lg">
                <a
                  href="https://github.com/dcyfr"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub
                </a>
              </DcyfrButton>
            </div>
          </div>
        </section>

        {/* Stats bar */}
        <div className="border-b border-border/40 bg-card/40 overflow-x-hidden">
          <div className="mx-auto flex max-w-7xl divide-x divide-border/60 px-4 sm:px-6 lg:px-8">
            {[
              { value: '8', label: 'Templates' },
              { value: '100%', label: 'TypeScript' },
              { value: '@dcyfr/ai', label: 'Powered by' },
              { value: 'MIT', label: 'License' },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex-1 min-w-0 px-3 py-4 sm:px-6 text-center"
              >
                <p className="text-lg font-bold text-foreground">{value}</p>
                <DcyfrBadge
                  variant="info"
                  size="sm"
                  className="mt-0.5 border-0 bg-transparent text-muted-foreground"
                >
                  {label}
                </DcyfrBadge>
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
                className="mb-8 text-2xl font-bold text-foreground"
              >
                All Templates
              </h2>
              <TemplateGrid templates={typedTemplates} />
            </div>
          </section>

          {/* Integration Matrix */}
          <section
            id="matrix"
            className="border-t border-border/40 px-4 py-12 sm:px-6 lg:px-8 overflow-x-hidden"
            aria-labelledby="matrix-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="matrix-heading"
                className="mb-2 text-2xl font-bold text-foreground"
              >
                Feature Comparison
              </h2>
              <p className="mb-8 text-muted-foreground">
                Compare what&apos;s included in each template at a glance.
              </p>
              <IntegrationMatrix templates={typedTemplates} />
            </div>
          </section>

          {/* Deployment CTA */}
          <section
            className="border-t border-border/40 bg-card/40 px-4 py-12 sm:px-6 lg:px-8"
            aria-labelledby="deploy-heading"
          >
            <div className="mx-auto max-w-7xl">
              <h2
                id="deploy-heading"
                className="mb-2 text-2xl font-bold text-foreground"
              >
                Deploy in seconds
              </h2>
              <p className="mb-6 text-muted-foreground">
                Every template is pre-wired for one-click Vercel deployment.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {typedTemplates
                  .filter((t) => t.vercelDeployUrl)
                  .slice(0, 3)
                  .map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between rounded-lg border border-input/60 bg-card/60 p-4"
                    >
                      <div>
                        <p className="font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.stack.join(' · ')}</p>
                      </div>
                      <DcyfrButton
                        asChild
                        variant="ghostly"
                        size="sm"
                        className="border border-input/60 bg-foreground text-background hover:bg-muted"
                      >
                        <a
                          href={t.vercelDeployUrl!}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          ▲ Deploy
                        </a>
                      </DcyfrButton>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        </main>

      </div>
    </>
  );
}
