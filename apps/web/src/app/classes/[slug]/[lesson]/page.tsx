import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Card, CardContent } from '@cea/ui';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { getAllLessonPaths, getLesson } from '../../../../lib/content';
import { Markdown } from '../../../../lib/markdown';
import { ACADEMY, CLASSES, humanizeLesson } from '../../../../lib/site';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllLessonPaths().map(({ classSlug, lesson }) => ({ slug: classSlug, lesson }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string; lesson: string }> }): Promise<Metadata> {
  const { slug, lesson } = await params;
  const l = getLesson(slug, lesson);
  if (!l) return { title: 'Lesson not found' };
  const cls = CLASSES.find((c) => c.slug === slug);
  return { title: `${l.title} — ${cls?.title ?? slug}`, description: l.description || undefined };
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string; lesson: string }> }) {
  const { slug, lesson } = await params;
  const l = getLesson(slug, lesson);
  if (!l) notFound();
  const cls = CLASSES.find((c) => c.slug === slug);
  const order = cls?.lessons ?? [];
  const idx = order.indexOf(lesson);
  const prev = idx > 0 ? order[idx - 1] : null;
  const next = idx >= 0 && idx < order.length - 1 ? order[idx + 1] : null;
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="mb-6 text-sm text-muted-foreground">
        <Link href="/classes" className="hover:text-foreground">Classes</Link>
        {' / '}
        <Link href={`/classes/${slug}`} className="hover:text-foreground">{cls?.title ?? slug}</Link>
      </nav>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{l.title}</h1>
      {l.description && <p className="mt-3 text-lg text-muted-foreground">{l.description}</p>}
      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
        <span>Cyber Elias Academy</span>
        {l.minutes && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {l.minutes} min read</span>}
      </div>
      <div className="mt-8"><Markdown body={l.body} /></div>
      <div className="mt-10 grid sm:grid-cols-2 gap-4">
        {prev ? (
          <Link href={`/classes/${slug}/${prev}`}><Card className="hover:shadow-md transition-shadow h-full"><CardContent className="p-5">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center gap-1"><ArrowLeft className="h-3 w-3" /> Previous</div>
            <div className="font-semibold">{humanizeLesson(prev)}</div>
          </CardContent></Card></Link>
        ) : <span />}
        {next ? (
          <Link href={`/classes/${slug}/${next}`}><Card className="hover:shadow-md transition-shadow h-full"><CardContent className="p-5 text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1 flex items-center justify-end gap-1">Next <ArrowRight className="h-3 w-3" /></div>
            <div className="font-semibold">{humanizeLesson(next)}</div>
          </CardContent></Card></Link>
        ) : (
          <Link href="/apply"><Card className="hover:shadow-md transition-shadow h-full border-primary/40"><CardContent className="p-5 text-right">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-1">Finished this class?</div>
            <div className="font-semibold text-primary">Apply to learn it at the centre</div>
          </CardContent></Card></Link>
        )}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Learn this at a machine in Port Harcourt — <a className="underline underline-offset-4" href={ACADEMY.phoneHref}>{ACADEMY.phone}</a>
      </p>
    </article>
  );
}
