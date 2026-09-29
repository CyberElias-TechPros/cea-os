import type { MetadataRoute } from 'next';
import { CLASSES } from '../lib/site';

// Phase 1: ported marketing/class catalogue URLs. Blog posts and class
// lessons are Phase 2 (scraped content migration).
const STATIC_ROUTES = [
  '', '/about', '/admissions', '/apply', '/blog', '/classes', '/contact',
  '/faq', '/team', '/terms', '/privacy', '/visit', '/verify', '/scholarships',
  '/donate', '/help', '/events', '/community', '/alumni', '/employers',
  '/learn', '/tour', '/login', '/register', '/forgot-password', '/reset-password',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.cea.ng';
  const now = new Date();
  const urls: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${base}${r || '/'}`.replace(/\/$/, '') || `${base}/`,
    lastModified: now,
  }));
  urls[0] = { url: `${base}/`, lastModified: now };
  for (const c of CLASSES) {
    urls.push({ url: `${base}/classes/${c.slug}`, lastModified: now });
  }
  return urls;
}
