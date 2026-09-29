import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { ArrowLeft, CheckCircle2, Clock, Phone } from 'lucide-react';
import { ACADEMY, CLASSES, humanizeLesson } from '../../../lib/site';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return CLASSES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = CLASSES.find((x) => x.slug === slug);
  if (!c) return { title: 'Class not found' };
  return {
    title: c.title,
    description: `${c.title} at Cyber Elias Academy, Port Harcourt${c.fee ? ` — ${c.fee}, ${c.duration}` : ''}. ${c.deliverable ?? 'Practical, hands-on training.'}`,
  };
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const c = CLASSES.find((x) => x.slug === slug);
  if (!c) notFound();
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <Link href="/classes" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4" /> All classes
      </Link>
      <Badge variant="secondary" className="mb-3">{c.category}</Badge>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{c.title}</h1>
      {c.deliverable && <p className="mt-3 text-lg text-muted-foreground">{c.deliverable}</p>}
      <Card className="mt-6"><CardContent className="p-6 grid sm:grid-cols-3 gap-4 text-sm">
        <div><div className="font-semibold mb-1">Fee</div><div className="text-muted-foreground">{c.fee ?? 'Ask us — contact the centre'}</div></div>
        <div><div className="font-semibold mb-1">Duration</div><div className="text-muted-foreground">{c.duration ?? 'Two sessions a week'}</div></div>
        <div><div className="font-semibold mb-1">Level</div><div className="text-muted-foreground">{c.level ?? 'All levels welcome'}</div></div>
      </CardContent></Card>

      <h2 className="mt-10 text-2xl font-bold">What you will cover</h2>
      <ol className="mt-4 space-y-2">
        {c.lessons.map((l, i) => (
          <li key={l} className="flex items-start gap-3 rounded-lg border p-3 hover:border-primary/50 transition-colors">
            <span className="font-bold text-primary"> {(i + 1).toString().padStart(2, '0')}</span>
            <Link href={`/classes/${c.slug}/${l}`} className="hover:text-primary transition-colors">{humanizeLesson(l)}</Link>
          </li>
        ))}
      </ol>

      <Card className="mt-10"><CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" /> {ACADEMY.hours} · {ACADEMY.address}
        </div>
        <div className="sm:ml-auto flex gap-3">
          <Link href="/apply"><Button>Apply</Button></Link>
          <a href={ACADEMY.phoneHref}><Button variant="outline"><Phone className="mr-2 h-4 w-4" />Call</Button></a>
        </div>
      </CardContent></Card>
      {c.fee === null && (
        <p className="mt-4 flex items-start gap-2 text-sm text-muted-foreground">
          <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
          Fees for this class are confirmed at the centre — call or visit and we will reply with dates, the fee, and what to bring.
        </p>
      )}
    </div>
  );
}
