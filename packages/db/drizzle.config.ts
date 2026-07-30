import type { Config } from 'drizzle-kit';

export default {
  schema: './src/schema/*.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'd1-http',
  dbCredentials: {
    accountId: process.env.CF_ACCOUNT_ID ?? '',
    databaseId: process.env.CF_DATABASE_ID ?? '',
    token: process.env.CF_API_TOKEN ?? '',
  },
} satisfies Config;
