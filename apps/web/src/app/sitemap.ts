import type { MetadataRoute } from 'next';
import { CLASSES } from '../lib/site';
import { getAllLessonPaths, getNotes } from '../lib/content';

// Phase 2: notes + lessons ported from the live site. Remaining strays
// (accessibility, payment, refunds, shipping, shop, visit/*) still to port.
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
  for (const n of getNotes()) {
    urls.push({ url: `${base}/blog/${n.slug}`, lastModified: n.date ? new Date(n.date) : now });
  }
  for (const { classSlug, lesson } of getAllLessonPaths()) {
    urls.push({ url: `${base}/classes/${classSlug}/${lesson}`, lastModified: now });
  }
  for (const r of ['/accessibility', '/payment', '/refunds', '/shipping',
    '/visit/info', '/visit/brochure', '/visit/feedback', '/certificates/verify']) {
    urls.push({ url: `${base}${r}`, lastModified: now });
  }
  return urls;
}
