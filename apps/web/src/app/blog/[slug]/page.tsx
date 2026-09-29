import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent, Badge } from '@cea/ui';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { getNote, getNotes } from '../../../lib/content';
import { Markdown } from '../../../lib/markdown';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) return { title: 'Note not found' };
  return { title: n.title, description: n.description || undefined };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const n = getNote(slug);
  if (!n) notFound();
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> All notes
      </Link>
      {n.series && <p className="text-xs uppercase tracking-wider text-primary font-semibold mb-2">{n.series}</p>}
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{n.title}</h1>
      {n.description && <p className="mt-3 text-lg text-muted-foreground">{n.description}</p>}
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span>Cyber Elias Academy</span>
        {n.date && <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {n.date}</span>}
        {n.minutes && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {n.minutes} min</span>}
      </div>
      <div className="mt-8"><Markdown body={n.body} /></div>
      {n.next_href && (
        <Card className="mt-10"><CardContent className="p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Next</div>
          <Link href={n.next_href} className="font-semibold hover:text-primary transition-colors">
            {n.next_title ?? 'Continue reading'}
          </Link>
        </CardContent></Card>
      )}
    </article>
  );
}
