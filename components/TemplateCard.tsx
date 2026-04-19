'use client';

import Link from 'next/link';
import { clsx } from 'clsx';
import { type Template } from '@/lib/types';
import {
  DcyfrCard,
  DcyfrCardContent,
  DcyfrCardFooter,
  DcyfrCardHeader,
} from '@/components/ui/dcyfr-card';
import { DcyfrBadge } from '@/components/ui/dcyfr-badge';
import { DcyfrButton } from '@/components/ui/dcyfr-button';

interface TemplateCardProps {
  template: Template;
}

// Maturity → DcyfrBadge variant mapping.
// The dcyfr-badge variant palette (brand/secure/danger/info/outline/ghostly)
// doesn't have a dedicated "beta/experimental" — we use `info` for beta
// (muted neutral) and `outline` for experimental. Stable gets `brand` since
// it's production-ready (identity-forward).
const MATURITY_VARIANT = {
  stable: 'brand',
  beta: 'info',
  experimental: 'outline',
} as const;

type DcyfrBadgeVariant =
  | 'brand'
  | 'secure'
  | 'danger'
  | 'info'
  | 'outline'
  | 'ghostly';

export function TemplateCard({ template }: TemplateCardProps) {
  const maturityVariant: DcyfrBadgeVariant =
    MATURITY_VARIANT[template.maturity as keyof typeof MATURITY_VARIANT] ??
    'outline';

  return (
    <DcyfrCard
      variant="elevated"
      padding="lg"
      className={clsx(
        'group relative flex flex-col border-dcyfr-primary-700/60 bg-dcyfr-primary-900/80',
        'transition-all duration-200',
        'hover:-translate-y-0.5 hover:shadow-xl hover:shadow-dcyfr-accent/10 hover:border-dcyfr-accent/40'
      )}
    >
      <DcyfrCardHeader className="px-0">
        <div className="flex items-center justify-between">
          <DcyfrBadge variant={maturityVariant} size="sm" className="capitalize">
            {template.maturity}
          </DcyfrBadge>
          <span className="text-xs text-dcyfr-primary-300">
            {template.framework}
          </span>
        </div>
        <h2 className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-dcyfr-accent-200">
          {template.name}
        </h2>
      </DcyfrCardHeader>

      <DcyfrCardContent className="flex flex-1 flex-col gap-4 px-0">
        <p className="text-sm leading-relaxed text-dcyfr-primary-300">
          {template.description}
        </p>

        {/* Stack tags — DcyfrBadge variant="outline" per content-polish spec */}
        <div className="flex flex-wrap gap-1.5">
          {template.stack.map((tag) => (
            <DcyfrBadge
              key={tag}
              variant="outline"
              size="sm"
              className="border-dcyfr-primary-600/40 bg-dcyfr-primary-800/40 text-dcyfr-primary-200"
            >
              {tag}
            </DcyfrBadge>
          ))}
        </div>

        {/* Feature icons — non-primitive affordance, preserved */}
        <div className="flex gap-3 text-xs text-dcyfr-primary-300">
          {template.features.typescript && (
            <span title="TypeScript">
              <span className="text-blue-400">TS</span>
            </span>
          )}
          {template.features.testing && <span title="Testing included">✓ Tests</span>}
          {template.features.auth && <span title="Auth included">🔐 Auth</span>}
          {template.features.docker && <span title="Docker ready">🐳 Docker</span>}
        </div>
      </DcyfrCardContent>

      <DcyfrCardFooter className="mt-4 gap-2 px-0">
        <DcyfrButton asChild variant="ghostly" size="md" className="flex-1">
          <Link href={`/templates/${template.id}`}>View Details</Link>
        </DcyfrButton>
        <DcyfrButton asChild variant="brand" size="md" className="flex-1">
          <a
            href={`https://github.com/${template.githubRepo}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {template.vercelDeployUrl ? 'Use Template' : 'View on GitHub'}
          </a>
        </DcyfrButton>
      </DcyfrCardFooter>
    </DcyfrCard>
  );
}
