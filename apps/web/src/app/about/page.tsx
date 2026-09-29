'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent } from '@cea/ui';
import { MapPin, Clock, ArrowRight, BookOpen, Users, Award } from 'lucide-react';
import { ACADEMY, CLASSES } from '../../lib/site';

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 text-center max-w-3xl">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            A training centre on Ebony Road,
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">not a website with courses.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6 text-lg text-muted-foreground">
            {ACADEMY.name} is a training centre at {ACADEMY.address}. We teach short, hands-on courses — Office, computer basics, design, web, data entry, repairs — two sessions a week.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/classes"><Button size="lg">See the classes</Button></Link>
            <Link href="/visit"><Button variant="outline" size="lg">Plan a visit</Button></Link>
          </motion.div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-8 grid md:grid-cols-3 gap-6 max-w-5xl">
        <Card><CardContent className="p-6">
          <MapPin className="h-5 w-5 text-primary mb-2" />
          <div className="font-semibold mb-1">Where</div>
          <div className="text-sm text-muted-foreground">{ACADEMY.address}. Some courses can also be followed online.</div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <Clock className="h-5 w-5 text-primary mb-2" />
          <div className="font-semibold mb-1">When</div>
          <div className="text-sm text-muted-foreground">{ACADEMY.hours}. {ACADEMY.sessionsNote}</div>
        </CardContent></Card>
        <Card><CardContent className="p-6">
          <Award className="h-5 w-5 text-primary mb-2" />
          <div className="font-semibold mb-1">What you get</div>
          <div className="text-sm text-muted-foreground">The certificate is awarded for the named deliverable — a document, a design, a website, a serviced machine — not for sitting in the room.</div>
        </CardContent></Card>
      </section>

      <section className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-6">
          <Card><CardContent className="p-8">
            <Users className="h-5 w-5 text-primary mb-2" />
            <h2 className="text-2xl font-bold">Who it is for</h2>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li><strong className="text-foreground">School leavers and NYSC members</strong> — office skills, typing, and a first website or design you can show.</li>
              <li><strong className="text-foreground">Office, church and NGO staff</strong> — documents, spreadsheets, email and the tools the job already asks for.</li>
              <li><strong className="text-foreground">Small-business owners</strong> — invoices, flyers, a simple web presence, and basic computer care.</li>
            </ul>
          </CardContent></Card>
          <Card><CardContent className="p-8">
            <BookOpen className="h-5 w-5 text-primary mb-2" />
            <h2 className="text-2xl font-bold">Who teaches</h2>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              {ACADEMY.founder} — Founder. He runs the centre at 26 Ebony Road and teaches the courses. The notes on this site are his class voice, written down.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">{ACADEMY.name} Ltd. {ACADEMY.rc}.</p>
            <Link href="/apply" className="mt-4 inline-flex"><Button>Apply <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
          </CardContent></Card>
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Currently teaching {CLASSES.length} classes · <Link href="/classes" className="underline underline-offset-4 hover:text-foreground">see them all</Link>
        </p>
      </section>
    </>
  );
}
