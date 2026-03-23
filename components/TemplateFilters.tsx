'use client';

import { clsx } from 'clsx';
import type { TemplateFramework, TemplateMaturity, TemplateStack } from '@/lib/types';

export interface FilterState {
  framework: TemplateFramework | 'All';
  stack: TemplateStack | 'All';
  maturity: TemplateMaturity | 'All';
  search: string;
}

interface TemplateFiltersProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  totalCount: number;
  filteredCount: number;
}

const frameworks: Array<TemplateFramework | 'All'> = ['All', 'Web', 'API', 'Chatbot', 'CLI'];
const stacks: Array<TemplateStack | 'All'> = ['All', 'React', 'TypeScript', 'GraphQL', 'Node.js', 'RAG', 'AI'];
const maturities: Array<TemplateMaturity | 'All'> = ['All', 'stable', 'beta', 'experimental'];

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150',
        active
          ? 'border-dcyfr-accent-700 bg-dcyfr-accent-700 text-white'
          : 'border-dcyfr-primary-600/60 text-dcyfr-primary-300 hover:border-dcyfr-accent/50 hover:text-white'
      )}
    >
      {children}
    </button>
  );
}

export function TemplateFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: TemplateFiltersProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center text-dcyfr-primary-400 pointer-events-none">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input
          type="search"
          placeholder="Search templates..."
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          className={clsx(
            'w-full rounded-lg border border-dcyfr-primary-600/60 bg-dcyfr-primary-900/60',
            'pl-10 pr-4 py-2.5 text-sm text-white placeholder-dcyfr-primary-500',
            'focus:border-dcyfr-accent/60 focus:outline-none focus:ring-1 focus:ring-dcyfr-accent/40'
          )}
        />
      </div>

      {/* Filter rows */}
      <div className="space-y-3">
        <div>
          <p className="mb-2 text-xs font-medium text-dcyfr-primary-300 uppercase tracking-wide">
            Framework
          </p>
          <div className="flex flex-wrap gap-2">
            {frameworks.map((f) => (
              <FilterButton
                key={f}
                active={filters.framework === f}
                onClick={() => onChange({ ...filters, framework: f })}
              >
                {f}
              </FilterButton>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-dcyfr-primary-300 uppercase tracking-wide">
            Stack
          </p>
          <div className="flex flex-wrap gap-2">
            {stacks.map((s) => (
              <FilterButton
                key={s}
                active={filters.stack === s}
                onClick={() => onChange({ ...filters, stack: s })}
              >
                {s}
              </FilterButton>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2 text-xs font-medium text-dcyfr-primary-300 uppercase tracking-wide">
            Maturity
          </p>
          <div className="flex flex-wrap gap-2">
            {maturities.map((m) => (
              <FilterButton
                key={m}
                active={filters.maturity === m}
                onClick={() => onChange({ ...filters, maturity: m })}
              >
                {m}
              </FilterButton>
            ))}
          </div>
        </div>
      </div>

      {/* Result count */}
      <p className="text-xs text-dcyfr-primary-500">
        Showing {filteredCount} of {totalCount} templates
      </p>
    </div>
  );
}
