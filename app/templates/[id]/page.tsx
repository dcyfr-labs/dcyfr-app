import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CodePreview, type CodeFile } from '@/components/CodePreview';
import templates from '@/data/templates.json';
import type { Template } from '@/lib/types';
import { clsx } from 'clsx';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return (templates as Template[]).map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const template = (templates as Template[]).find((t) => t.id === id);
  if (!template) return {};

  return {
    title: `${template.name} Template`,
    description: template.description,
    openGraph: {
      title: `${template.name} — DCYFR Templates`,
      description: template.description,
      url: `https://dcyfr.app/templates/${template.id}`,
      type: 'website',
    },
  };
}

function getCodeFiles(template: Template): CodeFile[] {
  // Representative code files shown in the preview
  const files: CodeFile[] = [
    {
      name: 'package.json',
      language: 'json' as const,
      content: JSON.stringify(
        {
          name: template.packageName,
          version: template.version,
          description: template.description,
          scripts: {
            dev: 'next dev',
            build: 'next build',
            start: 'next start',
            test: 'vitest',
          },
          dependencies: {
            '@dcyfr/ai': '^1.0.0',
            ...(template.features.designSystem ? { '@dcyfr/design-system': '*' } : {}),
            next: '^15',
            react: '^19',
            'react-dom': '^19',
          },
        },
        null,
        2
      ),
    },
  ];

  if (template.features.typescript) {
    files.push({
      name: 'tsconfig.json',
      language: 'json' as const,
      content: JSON.stringify(
        {
          compilerOptions: {
            target: 'ES2017',
            strict: true,
            module: 'esnext',
            moduleResolution: 'bundler',
            jsx: 'preserve',
          },
        },
        null,
        2
      ),
    });
  }

  files.push({
    name: 'README.md',
    language: 'bash' as const,
    content: `# ${template.name}

${template.description}

## Quick Start

\`\`\`bash
npx create-dcyfr-app my-app --template ${template.id}
cd my-app
npm install
npm run dev
\`\`\`

## Environment Variables

\`\`\`bash
# Required
DCYFR_AI_API_KEY=your_api_key_here
${template.features.database ? 'DATABASE_URL=your_database_url\n' : ''}${template.features.auth ? 'JWT_SECRET=your_jwt_secret\n' : ''}\`\`\`
`,
  });

  return files;
}

export default async function TemplatePage({ params }: Readonly<Props>) {
  const { id } = await params;
  const template = (templates as Template[]).find((t) => t.id === id);
  if (!template) notFound();

  const codeFiles = getCodeFiles(template);
  const cloneUrl = `https://github.com/${template.githubRepo}`;
  // Maturity state colors map to DCYFR semantic tokens:
  //   stable       → success (green)   — shipped & reliable
  //   beta         → warning (yellow)  — test phase, mind the caveats
  //   experimental → secure  (blue)    — investigational; may shift
  // Previously used `dcyfr-accent` (legacy palette; silently no-op'd in
  // the semantic-var bridge) + hardcoded yellow/purple Tailwind scales.
  // All three now resolve via CSS vars — per-site identity overrides
  // these colors via the `theme-<site>` class.
  const maturityClasses: Record<string, string> = {
    stable:       'border-success/30 bg-success/20 text-success',
    beta:         'border-warning/30 bg-warning/20 text-warning',
    experimental: 'border-secure/30 bg-secure/20 text-secure',
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: template.name,
            description: template.description,
            applicationCategory: 'DeveloperApplication',
            url: `https://dcyfr.app/templates/${template.id}`,
            downloadUrl: cloneUrl,
            softwareVersion: template.version,
            programmingLanguage: template.primaryLanguage,
            license: 'https://opensource.org/licenses/MIT',
          }),
        }}
      />

      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
            <a href="/" className="hover:text-white transition-colors">
              dcyfr.app
            </a>
            <span aria-hidden="true">/</span>
            <a href="/#templates" className="hover:text-white transition-colors">
              Templates
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-muted-foreground" aria-current="page">
              {template.name}
            </span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className={clsx('rounded-full border px-2.5 py-0.5 text-xs font-medium', maturityClasses[template.maturity])}>
                    {template.maturity}
                  </span>
                  <span className="text-xs text-muted-foreground">v{template.version}</span>
                </div>
                <h1 className="mb-3 text-3xl font-bold text-white">{template.name}</h1>
                <p className="text-muted-foreground leading-relaxed">{template.description}</p>
              </div>

              {/* Code preview */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-white">Code Preview</h2>
                <CodePreview files={codeFiles} />
              </div>

              {/* Environment setup */}
              <div>
                <h2 className="mb-4 text-lg font-semibold text-white">Setup</h2>
                <div className="rounded-xl border border-input/60 bg-card/60 p-5 space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dcyfr-accent/20 text-xs font-bold text-dcyfr-accent">
                      1
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Clone the template</p>
                      <code className="mt-1 block rounded bg-background px-3 py-1.5 text-xs text-accent/70 font-mono">
                        npx create-dcyfr-app my-app --template {template.id}
                      </code>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dcyfr-accent/20 text-xs font-bold text-dcyfr-accent">
                      2
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Install dependencies</p>
                      <code className="mt-1 block rounded bg-background px-3 py-1.5 text-xs text-accent/70 font-mono">
                        cd my-app && npm install
                      </code>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dcyfr-accent/20 text-xs font-bold text-dcyfr-accent">
                      3
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Configure environment</p>
                      <code className="mt-1 block rounded bg-background px-3 py-1.5 text-xs text-accent/70 font-mono">
                        cp .env.example .env.local
                      </code>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dcyfr-accent/20 text-xs font-bold text-dcyfr-accent">
                      4
                    </span>
                    <div>
                      <p className="text-sm font-medium text-white">Start developing</p>
                      <code className="mt-1 block rounded bg-background px-3 py-1.5 text-xs text-accent/70 font-mono">
                        npm run dev
                      </code>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* Clone CTA */}
              <div className="rounded-xl border border-input/60 bg-card/60 p-5">
                <h2 className="mb-4 font-semibold text-white">Get Started</h2>
                <div className="space-y-2.5">
                  <a
                    href={cloneUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    Use Template
                  </a>
                  {template.vercelDeployUrl && (
                    <a
                      href={template.vercelDeployUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-lg border border-input/60 px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:border-dcyfr-accent/40 hover:text-white"
                    >
                      ▲ Deploy to Vercel
                    </a>
                  )}
                </div>
              </div>

              {/* Stack info */}
              <div className="rounded-xl border border-input/60 bg-card/60 p-5">
                <h2 className="mb-3 font-semibold text-white">Stack</h2>
                <div className="flex flex-wrap gap-1.5">
                  {template.stack.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-input/40 bg-muted/60 px-2.5 py-0.5 text-xs font-medium text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="rounded-xl border border-input/60 bg-card/60 p-5">
                <h2 className="mb-3 font-semibold text-white">Included</h2>
                <ul className="space-y-2 text-sm">
                  {[
                    { flag: template.features.typescript, label: 'TypeScript' },
                    { flag: template.features.testing, label: 'Testing (Vitest)' },
                    { flag: template.features.designSystem, label: '@dcyfr/design-system' },
                    { flag: template.features.dcyfrAi, label: '@dcyfr/ai integration' },
                    { flag: template.features.auth, label: 'Authentication' },
                    { flag: template.features.database, label: 'Database (Drizzle)' },
                    { flag: template.features.docker, label: 'Docker' },
                  ].map(({ flag, label }) => (
                    <li
                      key={label}
                      className={clsx(
                        'flex items-center gap-2',
                        flag ? 'text-muted-foreground' : 'text-muted-foreground line-through'
                      )}
                    >
                      <span aria-hidden="true">{flag ? '✓' : '—'}</span>
                      {label}
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
