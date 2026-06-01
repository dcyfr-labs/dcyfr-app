import type { Metadata } from 'next';
import { TemplateGrid } from '@/components/TemplateGrid';
import templates from '@/data/templates.json';
import type { Template } from '@/lib/types';

const typedTemplates = templates as Template[];

export const metadata: Metadata = {
  title: 'Templates',
  description:
    'Browse all DCYFR starter templates for AI-powered applications. Filter by framework, stack, and maturity — every template ships with TypeScript and @dcyfr/ai integration.',
  alternates: { canonical: '/templates' },
  openGraph: {
    type: 'website',
    url: 'https://dcyfr.app/templates',
    title: 'All Templates — DCYFR',
    description:
      'Browse all production-ready DCYFR starter templates. Filter by framework, stack, and maturity.',
  },
};

// Serialize JSON-LD safely: the payload is built from trusted, static local
// data (templates.json), and we additionally escape the HTML-significant
// characters so a value can never break out of the <script> element
// (the `</script>` injection vector for raw JSON.stringify embeds).
function safeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
}

// JSON-LD ItemList for the canonical /templates listing URL (mirrors the
// homepage structured data, but anchored to this route).
function TemplatesJsonLd({ items }: { items: Template[] }) {
  const payload = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'DCYFR Starter Templates',
    description: 'Production-ready starter templates for AI-powered applications',
    url: 'https://dcyfr.app/templates',
    numberOfItems: items.length,
    itemListElement: items.map((t, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'SoftwareApplication',
        name: t.name,
        description: t.description,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        url: `https://dcyfr.app/templates/${t.id}`,
        downloadUrl: `https://github.com/${t.githubRepo}`,
        softwareVersion: t.version,
        programmingLanguage: t.primaryLanguage,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Trusted static data (templates.json), HTML-escaped by safeJsonLd above.
      dangerouslySetInnerHTML={{ __html: safeJsonLd(payload) }}
    />
  );
}

export default function TemplatesPage() {
  return (
    <>
      <TemplatesJsonLd items={typedTemplates} />
      <main>
        {/* Header */}
        <section
          className="border-b border-border/40 bg-gradient-to-b from-background to-card/60 px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="templates-page-heading"
        >
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-secure">
              Starter Templates
            </p>
            <h1
              id="templates-page-heading"
              className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              All templates
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {typedTemplates.length} production-ready starter templates for
              AI-powered applications. Filter by framework, stack, or maturity to
              find your starting point.
            </p>
          </div>
        </section>

        {/* Listing */}
        <section
          className="px-4 py-12 sm:px-6 lg:px-8"
          aria-labelledby="templates-list-heading"
        >
          <div className="mx-auto max-w-7xl">
            <h2 id="templates-list-heading" className="sr-only">
              Template list
            </h2>
            <TemplateGrid templates={typedTemplates} />
          </div>
        </section>
      </main>
    </>
  );
}
