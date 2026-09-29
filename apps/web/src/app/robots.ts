import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/', '/app/', '/dashboard/', '/portal/'] }],
    sitemap: 'https://www.cea.ng/sitemap.xml',
  };
}
