'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { ArrowRight, MapPin, Clock, Users, BookOpen, CheckCircle2, Phone } from 'lucide-react';
import { ACADEMY, CLASSES } from '../lib/site';

const steps = ['Learn', 'Practice', 'Create', 'Correct', 'Repeat', 'Demonstrate'];

const faqs = [
  { q: 'Do I need any prior experience?', a: 'No. Absolute-beginner classes assume you are starting from zero.' },
  { q: 'Can I study while working?', a: 'Yes. Classes run two sessions a week, 1.5 to 2 hours each.' },
  { q: 'What do I get at the end?', a: 'A named deliverable — a document, a design, a website, a serviced machine — not just attendance.' },
  { q: 'Where is the academy?', a: '26 Ebony Road, off Rumuola Road, Port Harcourt. Some courses can also be followed online.' },
];

export default function Home() {
  const featured = CLASSES.filter((c) => c.fee).slice(0, 6);
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950" />
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 text-primary" />
              {ACADEMY.address}
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold tracking-tight sm:text-6xl">
              Practical computer and digital-skills training
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">in Port Harcourt.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Short, hands-on courses — Office, computer basics, design, web, data entry, repairs — two sessions a week. You leave with a piece of work, not just a certificate of attendance.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/classes"><Button size="lg" className="w-full sm:w-auto">View Classes <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
              <Link href="/apply"><Button variant="outline" size="lg" className="w-full sm:w-auto">Apply</Button></Link>
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" /> Two sessions a week, at a machine from the first hour
            </motion.p>
          </div>
        </div>
      </section>

      {/* Classes */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Classes we teach now</h2>
            <p className="mt-2 text-muted-foreground">Fees, duration and what you produce are listed on each class page.</p>
          </div>
          <Link href="/classes" className="hidden sm:inline-flex"><Button variant="outline">All {CLASSES.length} classes</Button></Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((c, i) => (
            <motion.div key={c.slug} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <Badge variant="secondary" className="w-fit mb-3">{c.category}</Badge>
                  <h3 className="font-semibold text-lg mb-1">{c.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{c.deliverable}</p>
                  <div className="mt-auto space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> {c.fee} · {c.duration}</div>
                    <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {c.level}</div>
                  </div>
                  <Link href={`/classes/${c.slug}`}><Button variant="outline" size="sm" className="w-full">View class</Button></Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How a class runs */}
      <section className="border-y bg-muted/50">
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold tracking-tight text-center">How a class runs</h2>
          <p className="mt-2 text-center text-muted-foreground max-w-xl mx-auto">{ACADEMY.sessionsNote}</p>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {steps.map((s, i) => (
              <Card key={s}><CardContent className="p-5 text-center">
                <div className="text-2xl font-bold text-primary">0{i + 1}</div>
                <div className="mt-1 font-semibold">{s}</div>
              </CardContent></Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founder + notes */}
      <section className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-6">
        <Card><CardContent className="p-8">
          <h2 className="text-2xl font-bold">Who teaches</h2>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            {ACADEMY.founder} — Founder. He runs the centre at 26 Ebony Road and teaches the courses. The notes on this site are his class voice, written down.
          </p>
          <Link href="/team" className="mt-4 inline-flex"><Button variant="outline" size="sm">Meet the team</Button></Link>
        </CardContent></Card>
        <Card><CardContent className="p-8">
          <div className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-primary" /><h2 className="text-2xl font-bold">Free class notes</h2></div>
          <p className="mt-3 text-muted-foreground leading-relaxed">
            Anyone can read them — sitting down at a computer, files, email, Word, spreadsheets, the phone, and staying safe online. Written as if someone is sitting beside you.
          </p>
          <Link href="/blog" className="mt-4 inline-flex"><Button variant="outline" size="sm">Read the notes</Button></Link>
        </CardContent></Card>
      </section>

      {/* FAQ + visit */}
      <section className="container mx-auto px-4 pb-20 grid md:grid-cols-2 gap-6">
        <Card><CardContent className="p-8">
          <h2 className="text-2xl font-bold mb-4">Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q}><div className="font-semibold">{f.q}</div><div className="text-sm text-muted-foreground mt-1">{f.a}</div></div>
            ))}
          </div>
          <Link href="/faq" className="mt-4 inline-flex"><Button variant="link" className="px-0">More questions <ArrowRight className="ml-1 h-4 w-4" /></Button></Link>
        </CardContent></Card>
        <Card className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white border-0"><CardContent className="p-8">
          <h2 className="text-2xl font-bold">Ready to enrol?</h2>
          <p className="mt-3 text-white/85">Tell us which class you want. We will reply with dates, the fee, and what to bring.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <Link href="/apply"><Button variant="secondary">Apply</Button></Link>
            <a href={ACADEMY.phoneHref}><Button variant="outline" className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"><Phone className="mr-2 h-4 w-4" />{ACADEMY.phone}</Button></a>
          </div>
          <p className="mt-4 text-sm text-white/70">{ACADEMY.hours} · {ACADEMY.address}</p>
        </CardContent></Card>
      </section>
    </>
  );
}
