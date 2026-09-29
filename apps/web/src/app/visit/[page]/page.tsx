import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@cea/ui';
import { ArrowLeft } from 'lucide-react';
import { getStaticPage } from '../../../lib/content';
import { Markdown } from '../../../lib/markdown';
import { ACADEMY } from '../../../lib/site';
import type { Metadata } from 'next';

const PAGES: Record<string, { file: string; back: string; backLabel: string }> = {
  info: { file: 'visit_info', back: '/visit', backLabel: 'Visit' },
  brochure: { file: 'visit_brochure', back: '/visit', backLabel: 'Visit' },
  feedback: { file: 'visit_feedback', back: '/visit', backLabel: 'Visit' },
};

export function generateStaticParams() {
  return Object.keys(PAGES).map((page) => ({ page }));
}

export async function generateMetadata({ params }: { params: Promise<{ page: string }> }): Promise<Metadata> {
  const { page } = await params;
  const p = PAGES[page] ? getStaticPage(PAGES[page].file) : null;
  if (!p) return { title: 'Page not found' };
  return { title: `${p.title} — Visit`, description: p.description || undefined };
}

export default async function VisitSubPage({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const conf = PAGES[page];
  if (!conf) notFound();
  const p = getStaticPage(conf.file);
  if (!p) notFound();
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href={conf.back} className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> {conf.backLabel}
      </Link>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{p.title}</h1>
      {p.description && <p className="mt-3 text-lg text-muted-foreground">{p.description}</p>}
      <div className="mt-8"><Markdown body={p.body} /></div>
      <div className="mt-8 flex gap-3">
        <Link href="/apply"><Button>Apply</Button></Link>
        <a href={ACADEMY.phoneHref}><Button variant="outline">Call {ACADEMY.phone}</Button></a>
      </div>
    </article>
  );
}
