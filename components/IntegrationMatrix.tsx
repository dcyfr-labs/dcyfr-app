import type { Template } from '@/lib/types';
import { clsx } from 'clsx';

interface IntegrationMatrixProps {
  templates: Template[];
}

const FEATURES = [
  { key: 'typescript', label: 'TypeScript' },
  { key: 'testing', label: 'Testing' },
  { key: 'designSystem', label: 'Design System' },
  { key: 'dcyfrAi', label: '@dcyfr/ai' },
  { key: 'auth', label: 'Auth' },
  { key: 'database', label: 'Database' },
  { key: 'docker', label: 'Docker' },
] as const;

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}

function DashIcon({ className }: { className?: string }) {
  return (
    <svg
      className={clsx('h-4 w-4', className)}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
    </svg>
  );
}

export function IntegrationMatrix({ templates }: IntegrationMatrixProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-dcyfr-primary-700/60">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="border-b border-dcyfr-primary-700/60 bg-dcyfr-primary-900/80">
            <th
              scope="col"
              className="px-4 py-3 text-left text-xs font-semibold text-dcyfr-primary-300 uppercase tracking-wide"
            >
              Template
            </th>
            {FEATURES.map(({ key, label }) => (
              <th
                key={key}
                scope="col"
                className="px-3 py-3 text-center text-xs font-semibold text-dcyfr-primary-300 uppercase tracking-wide whitespace-nowrap"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-dcyfr-primary-700/40">
          {templates.map((template) => (
            <tr
              key={template.id}
              className="bg-dcyfr-primary-950/60 hover:bg-dcyfr-primary-900/40 transition-colors"
            >
              <td className="px-4 py-3">
                <div>
                  <p className="font-medium text-white">{template.name}</p>
                  <p className="text-xs text-dcyfr-primary-300">{template.framework}</p>
                </div>
              </td>
              {FEATURES.map(({ key }) => (
                <td key={key} className="px-3 py-3 text-center">
                  {template.features[key] ? (
                    <span className="inline-flex items-center justify-center text-dcyfr-accent-300">
                      <CheckIcon />
                      <span className="sr-only">Included</span>
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center text-dcyfr-primary-600">
                      <DashIcon />
                      <span className="sr-only">Not included</span>
                    </span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
