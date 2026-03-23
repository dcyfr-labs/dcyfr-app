'use client';

import { useState } from 'react';
import { clsx } from 'clsx';

type Language = 'typescript' | 'json' | 'bash';

export interface CodeFile {
  name: string;
  language: Language;
  content: string;
}

interface CodePreviewProps {
  files: CodeFile[];
  defaultFile?: string;
}

function highlight(code: string, language: Language): string {
  // Minimal client-safe highlighting via CSS classes - a full syntax highlighter
  // (e.g. shiki) would be wired in at build time for production
  return code;
}

export function CodePreview({ files, defaultFile }: CodePreviewProps) {
  const [activeFile, setActiveFile] = useState(defaultFile ?? files[0]?.name);
  const [copied, setCopied] = useState(false);

  const current = files.find((f) => f.name === activeFile) ?? files[0];

  async function copyToClipboard() {
    if (!current) return;
    await navigator.clipboard.writeText(current.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!current) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-dcyfr-primary-700/60 bg-dcyfr-primary-950">
      {/* Tab bar */}
      <div className="flex items-center justify-between border-b border-dcyfr-primary-700/60 bg-dcyfr-primary-900/60 px-4">
        <div className="flex gap-1" role="tablist" aria-label="Code files">
          {files.map((file) => (
            <button
              key={file.name}
              role="tab"
              aria-selected={activeFile === file.name}
              onClick={() => setActiveFile(file.name)}
              className={clsx(
                'border-b-2 px-3 py-2.5 text-xs font-medium transition-colors',
                activeFile === file.name
                  ? 'border-dcyfr-accent text-white'
                  : 'border-transparent text-dcyfr-primary-400 hover:text-dcyfr-primary-200'
              )}
            >
              {file.name}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          aria-label="Copy code to clipboard"
          className={clsx(
            'flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors',
            copied
              ? 'text-green-400'
              : 'text-dcyfr-primary-400 hover:text-dcyfr-primary-200'
          )}
        >
          {copied ? (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code content */}
      <div
        role="tabpanel"
        className="overflow-x-auto p-4"
      >
        <pre className="text-xs leading-relaxed text-dcyfr-primary-200 font-mono whitespace-pre">
          <code>{current.content}</code>
        </pre>
      </div>
    </div>
  );
}
