import { withSentryConfig } from '@sentry/nextjs';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dcyfr/design-system'],
  images: {
    domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
};

export default withSentryConfig(nextConfig, {
  // Sentry organization + project (set via env or replace here)
  org: process.env.SENTRY_ORG ?? 'dcyfr',
  project: process.env.SENTRY_PROJECT ?? 'dcyfr-app',

  // Suppress Sentry CLI output during builds
  silent: !process.env.CI,

  // Upload source maps only in CI/production
  widenClientFileUpload: true,
  sourcemaps: { disable: false, deleteSourcemapsAfterUpload: true },
  disableLogger: true,

  // Tunnel Sentry requests through /api/monitoring to avoid ad-blockers
  tunnelRoute: '/monitoring',

  automaticVercelMonitors: true,
});
