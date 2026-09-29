import Link from 'next/link';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import { CLASSES } from '../../lib/site';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Classes',
  description: 'Short, practical computer courses in Port Harcourt — fees, duration and what you produce.',
};

const categories = [...new Set(CLASSES.map((c) => c.category))];

export default function ClassesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Classes</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        These are the classes we teach now. Two sessions a week, at a machine from the first hour. The certificate is awarded for the named deliverable — not for sitting in the room.
      </p>
      {categories.map((cat) => (
        <div key={cat} className="mt-10">
          <h2 className="text-xl font-bold mb-4">{cat}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CLASSES.filter((c) => c.category === cat).map((c) => (
              <Card key={c.slug} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-semibold text-lg">{c.title}</h3>
                  {c.deliverable && <p className="text-sm text-muted-foreground mt-1 mb-3">{c.deliverable}</p>}
                  <div className="mt-auto space-y-2 text-sm text-muted-foreground mb-4">
                    {c.fee && c.duration ? (
                      <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {c.fee} · {c.duration}{c.level ? ` · ${c.level}` : ''}</div>
                    ) : (
                      <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> Contact us for the current fee and schedule</div>
                    )}
                    <div className="text-xs">{c.lessons.length} lessons</div>
                  </div>
                  <Link href={`/classes/${c.slug}`}><Button variant="outline" size="sm" className="w-full">View class <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button></Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
