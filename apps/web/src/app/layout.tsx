import type { Metadata } from 'next';
import { ThemeProvider } from '@cea/ui';
import { AuthProvider } from '../lib/auth-context';
import { SiteHeader } from '../components/site-header';
import { SiteFooter } from '../components/site-footer';
import { PWARegister } from '../components/pwa-register';
import { CommandPalette } from '../components/command-palette';
import './globals.css';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Cyber Elias Academy',
    template: '%s | Cyber Elias Academy',
  },
  description: 'Empowering the next generation of tech professionals with industry-relevant skills',
  manifest: '/manifest.json',
  icons: [{ rel: 'icon', url: '/icons/icon-192.svg' }],
  openGraph: {
    title: 'Cyber Elias Academy',
    description: 'Empowering the next generation of tech professionals',
    type: 'website',
    locale: 'en_ZA',
    siteName: 'Cyber Elias Academy',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('cea-theme');
                  if (!theme) theme = 'system';
                  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <AuthProvider>
            <PWARegister />
            <CommandPalette />
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main className="flex-1">{children}</main>
              <SiteFooter />
            </div>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
