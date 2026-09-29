import Link from 'next/link';
import { Button, Card, CardContent } from '@cea/ui';
import { ACADEMY } from '../../lib/site';

export default function TeamPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Our team</h1>
      <p className="mt-3 text-muted-foreground">Small centre, real people. The person who teaches you is the person who runs the place.</p>
      <Card className="mt-8"><CardContent className="p-8">
        <h2 className="text-2xl font-bold">{ACADEMY.founder}</h2>
        <p className="text-sm text-primary font-medium mt-1">Founder & Instructor</p>
        <p className="mt-3 text-muted-foreground leading-relaxed">
          Graham runs the centre at 26 Ebony Road and teaches the courses. The notes on this site are his class voice, written down.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">{ACADEMY.name} Ltd. {ACADEMY.rc} · {ACADEMY.address} · {ACADEMY.hours}</p>
        <Link href="/contact" className="mt-4 inline-flex"><Button variant="outline" size="sm">Contact us</Button></Link>
      </CardContent></Card>
    </div>
  );
}
