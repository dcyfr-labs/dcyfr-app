'use client';

import { useState, useMemo } from 'react';
import { TemplateCard } from './TemplateCard';
import { TemplateFilters, type FilterState } from './TemplateFilters';
import type { Template } from '@/lib/types';
import { DcyfrButton } from '@/components/ui/dcyfr-button';

interface TemplateGridProps {
  templates: Template[];
}

export function TemplateGrid({ templates }: TemplateGridProps) {
  const [filters, setFilters] = useState<FilterState>({
    framework: 'All',
    stack: 'All',
    maturity: 'All',
    search: '',
  });

  const filtered = useMemo(() => {
    return templates.filter((t) => {
      if (filters.framework !== 'All' && t.framework !== filters.framework) return false;
      if (filters.stack !== 'All' && !t.stack.includes(filters.stack)) return false;
      if (filters.maturity !== 'All' && t.maturity !== filters.maturity) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        return (
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.stack.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [templates, filters]);

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <TemplateFilters
          filters={filters}
          onChange={setFilters}
          totalCount={templates.length}
          filteredCount={filtered.length}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No templates match your filters.</p>
          <DcyfrButton
            variant="ghostly"
            size="sm"
            className="mt-3 text-secure"
            onClick={() =>
              setFilters({ framework: 'All', stack: 'All', maturity: 'All', search: '' })
            }
          >
            Clear filters
          </DcyfrButton>
        </div>
      )}
    </div>
  );
}
