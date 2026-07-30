export const config = {
  app: {
    name: 'Cyber Elias Academy',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000',
    wsUrl: process.env.NEXT_PUBLIC_WS_URL ?? 'ws://localhost:4001',
    cdnUrl: process.env.NEXT_PUBLIC_CDN_URL ?? 'http://localhost:4002',
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET ?? 'dev-secret-change-in-production',
    jwtExpiresIn: '15m',
    refreshTokenExpiresIn: '7d',
    bcryptRounds: 12,
    mfaIssuer: 'CEA',
  },
  db: {
    url: process.env.DATABASE_URL ?? '',
  },
  cloudflare: {
    accountId: process.env.CF_ACCOUNT_ID ?? '',
    apiToken: process.env.CF_API_TOKEN ?? '',
  },
  stripe: {
    secretKey: process.env.STRIPE_SECRET_KEY ?? '',
    webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ?? '',
    priceIds: {
      standard: process.env.STRIPE_PRICE_STANDARD ?? '',
      premium: process.env.STRIPE_PRICE_PREMIUM ?? '',
    },
  },
  email: {
    from: process.env.EMAIL_FROM ?? 'noreply@cea.academy',
    fromName: 'Cyber Elias Academy',
    sendGridApiKey: process.env.SENDGRID_API_KEY ?? '',
    resendApiKey: process.env.RESEND_API_KEY ?? '',
  },
  sms: {
    twilioAccountSid: process.env.TWILIO_ACCOUNT_SID ?? '',
    twilioAuthToken: process.env.TWILIO_AUTH_TOKEN ?? '',
    twilioFrom: process.env.TWILIO_FROM ?? '',
  },
  sentry: {
    dsn: process.env.SENTRY_DSN ?? '',
  },
} as const;

export type Config = typeof config;
