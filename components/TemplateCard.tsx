'use client';

import { type Template } from '@/lib/types';
import { clsx } from 'clsx';
import Link from 'next/link';

interface TemplateCardProps {
  template: Template;
}

const maturityColors: Record<string, string> = {
  stable: 'bg-dcyfr-accent/20 text-dcyfr-accent-200 border-dcyfr-accent/30',
  beta: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  experimental: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
};

const stackColors: Record<string, string> = {
  React: 'bg-sky-500/10 text-sky-300 border-sky-500/20',
  TypeScript: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  GraphQL: 'bg-pink-500/10 text-pink-300 border-pink-500/20',
  'Node.js': 'bg-green-500/10 text-green-300 border-green-500/20',
  Python: 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20',
  RAG: 'bg-orange-500/10 text-orange-300 border-orange-500/20',
  AI: 'bg-violet-500/10 text-violet-300 border-violet-500/20',
};

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <article
      className={clsx(
        'group relative flex flex-col rounded-xl border border-dcyfr-primary-700/60',
        'bg-dcyfr-primary-900/80 p-6 transition-all duration-200',
        'hover:border-dcyfr-accent/40 hover:bg-dcyfr-primary-800/80',
        'hover:shadow-lg hover:shadow-dcyfr-accent/5'
      )}
    >
      {/* Maturity badge */}
      <div className="mb-4 flex items-center justify-between">
        <span
          className={clsx(
            'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
            maturityColors[template.maturity]
          )}
        >
          {template.maturity}
        </span>
        <span className="text-xs text-dcyfr-primary-300">
          {template.framework}
        </span>
      </div>

      {/* Title + description */}
      <h2 className="mb-1 text-lg font-semibold text-white group-hover:text-dcyfr-accent-200 transition-colors">
        {template.name}
      </h2>
      <p className="mb-4 flex-1 text-sm text-dcyfr-primary-300 leading-relaxed">
        {template.description}
      </p>

      {/* Stack tags */}
      <div className="mb-5 flex flex-wrap gap-1.5">
        {template.stack.map((tag) => (
          <span
            key={tag}
            className={clsx(
              'rounded-full border px-2 py-0.5 text-xs font-medium',
              stackColors[tag] ?? 'bg-dcyfr-primary-700/50 text-dcyfr-primary-300 border-dcyfr-primary-600/30'
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Feature icons */}
      <div className="mb-5 flex gap-3 text-xs text-dcyfr-primary-300">
        {template.features.typescript && (
          <span title="TypeScript" className="flex items-center gap-1">
            <span className="text-blue-400">TS</span>
          </span>
        )}
        {template.features.testing && (
          <span title="Testing included" className="flex items-center gap-1">
            <span>✓ Tests</span>
          </span>
        )}
        {template.features.auth && (
          <span title="Auth included" className="flex items-center gap-1">
            <span>🔐 Auth</span>
          </span>
        )}
        {template.features.docker && (
          <span title="Docker ready" className="flex items-center gap-1">
            <span>🐳 Docker</span>
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Link
          href={`/templates/${template.id}`}
          className={clsx(
            'flex-1 rounded-lg border border-dcyfr-primary-600/60 px-3 py-2',
            'text-center text-sm font-medium text-dcyfr-primary-200',
            'transition-colors hover:border-dcyfr-accent/40 hover:text-white'
          )}
        >
          View Details
        </Link>
        {template.vercelDeployUrl && (
          <a
            href={`https://github.com/${template.githubRepo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex-1 rounded-lg bg-dcyfr-accent-700 px-3 py-2',
              'text-center text-sm font-medium text-white',
              'transition-colors hover:bg-dcyfr-accent-600'
            )}
          >
            Use Template
          </a>
        )}
        {!template.vercelDeployUrl && (
          <a
            href={`https://github.com/${template.githubRepo}`}
            target="_blank"
            rel="noopener noreferrer"
            className={clsx(
              'flex-1 rounded-lg bg-dcyfr-accent-700 px-3 py-2',
              'text-center text-sm font-medium text-white',
              'transition-colors hover:bg-dcyfr-accent-600'
            )}
          >
            View on GitHub
          </a>
        )}
      </div>
    </article>
  );
}
