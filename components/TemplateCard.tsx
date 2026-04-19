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
        'group relative flex flex-col border-input/60 bg-card/80',
        'transition-all duration-200 ease-out',
        // Scout-proposal: stronger hover-lift + semantic shadow/border.
        // Prior code referenced `dcyfr-accent` without a shade — a legacy
        // palette token that resolves to nothing in the semantic-var bridge,
        // producing silent styling no-ops. Swapped to the accent semantic.
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-accent/10 hover:border-accent/40'
      )}
    >
      <DcyfrCardHeader className="px-0">
        <div className="flex items-center justify-between">
          <DcyfrBadge variant={maturityVariant} size="sm" className="capitalize">
            {template.maturity}
          </DcyfrBadge>
          {/* Scout-proposal: monospace for metadata labels reinforces the
              product-store-meets-Linear aesthetic. */}
          <span className="font-mono text-xs text-muted-foreground">
            {template.framework}
          </span>
        </div>
        <h2 className="mt-3 text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
          {template.name}
        </h2>
      </DcyfrCardHeader>

      <DcyfrCardContent className="flex flex-1 flex-col gap-4 px-0">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {template.description}
        </p>

        {/* Stack tags — DcyfrBadge variant="outline" per content-polish spec */}
        <div className="flex flex-wrap gap-1.5">
          {template.stack.map((tag) => (
            <DcyfrBadge
              key={tag}
              variant="outline"
              size="sm"
              className="border-input/40 bg-muted/40 text-muted-foreground"
            >
              {tag}
            </DcyfrBadge>
          ))}
        </div>

        {/* Feature icons — non-primitive affordance, preserved */}
        <div className="flex gap-3 text-xs text-muted-foreground">
          {template.features.typescript && (
            <span title="TypeScript">
              {/* `text-secure` resolves to the site's investigational blue
                  (217 91% 60% under theme-dcyfr-app) — semantically "trusted
                  language layer" + keeps the TS-brand blue hue. */}
              <span className="text-secure">TS</span>
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
