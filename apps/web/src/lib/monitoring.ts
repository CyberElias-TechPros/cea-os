const SENTRY_DSN = process.env.NEXT_PUBLIC_SENTRY_DSN;

export function reportError(error: Error, context?: Record<string, unknown>) {
  console.error('[Monitoring]', error, context);
  if (SENTRY_DSN) {
    // Sentry integration placeholder
    // Sentry.captureException(error, { extra: context });
  }
}

export function reportEvent(name: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && (window as unknown as Record<string, unknown>).gtag) {
    // Google Analytics placeholder
    // gtag('event', name, properties);
  }
}
