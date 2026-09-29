import { notFound } from 'next/navigation';
import { getStaticPage } from '../../lib/content';
import { Markdown } from '../../lib/markdown';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getStaticPage(slug);
  if (!p) return { title: 'Page not found' };
  return { title: p.title, description: p.description || undefined };
}

const TITLES: Record<string, string> = {
  accessibility: 'Accessibility',
  payment: 'Payment',
  refunds: 'Refunds',
  shipping: 'Shipping',
};

export function generateStaticParams() {
  return Object.keys(TITLES).map((slug) => ({ slug }));
}

export default async function StaticPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!TITLES[slug]) notFound();
  const p = getStaticPage(slug);
  if (!p) notFound();
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{p.title}</h1>
      {p.description && <p className="mt-3 text-lg text-muted-foreground">{p.description}</p>}
      <div className="mt-8"><Markdown body={p.body} /></div>
    </article>
  );
}
