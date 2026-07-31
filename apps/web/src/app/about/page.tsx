'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent } from '@cea/ui';
import { Target, Eye, Heart, Users, Code, Shield, Database, TrendingUp, ArrowRight, GraduationCap, Briefcase, Globe2 } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Industry Courses' },
  { value: '95%', label: 'Employment Rate' },
  { value: '30+', label: 'Expert Mentors' },
];

const values = [
  { icon: Target, title: 'Excellence', desc: 'We hold ourselves to the highest standards in everything we teach.' },
  { icon: Heart, title: 'Community', desc: 'Learning is a team sport. We grow together, support each other, and celebrate wins.' },
  { icon: Eye, title: 'Integrity', desc: 'Honest feedback, transparent pricing, and real outcomes — no shortcuts.' },
  { icon: Users, title: 'Inclusion', desc: 'Tech skills should be accessible to everyone, regardless of background.' },
];

const tracks = [
  { icon: Code, title: 'Software Development', desc: 'Full-stack web, mobile, and systems engineering with real projects.' },
  { icon: Shield, title: 'Cyber Security', desc: 'Ethical hacking, defense, and security operations that protect real systems.' },
  { icon: Database, title: 'Data & AI', desc: 'Analytics, machine learning, and AI engineering from first principles.' },
  { icon: TrendingUp, title: 'Digital Business', desc: 'Marketing, product, and entrepreneurship for the digital economy.' },
];

const milestones = [
  { year: '2019', title: 'The Spark', desc: 'Cyber Elias Academy began as a weekend coding club with 12 students.' },
  { year: '2021', title: 'First Cohort', desc: 'Launched our first structured bootcamp with a 90% completion rate.' },
  { year: '2023', title: 'Full Academy', desc: 'Expanded to 5 campuses and fully online delivery across 3 continents.' },
  { year: '2026', title: 'The Digital Campus', desc: 'A complete digital operating system connecting students, employers, and mentors.' },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-3xl" />
        </div>
        <div className="container mx-auto px-4 py-24 text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold tracking-tight">
            We&apos;re building the
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">future of tech education</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Cyber Elias Academy turns ambitious beginners into confident professionals through project-based learning, mentorship, and real-world experience.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/courses"><Button size="lg">Explore Programs <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            <Link href="/contact"><Button variant="outline" size="lg">Talk to Us</Button></Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{s.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                There is a massive gap between what traditional education teaches and what the tech industry needs. We exist to close that gap.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Every course we design starts with a single question: <span className="font-medium text-foreground">&ldquo;What does an employer actually need this person to be able to do?&rdquo;</span> Then we build the curriculum backwards from there.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { icon: GraduationCap, text: 'Project-based learning that mirrors real jobs' },
                  { icon: Briefcase, text: 'Direct pathways to internships and employment' },
                  { icon: Globe2, text: 'Learning that works across continents and time zones' },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                      <item.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 rounded-3xl blur-2xl" />
              <Card className="relative overflow-hidden border-0 shadow-2xl">
                <CardContent className="p-10">
                  <div className="text-6xl mb-6">🎓</div>
                  <blockquote className="text-xl font-medium leading-relaxed">
                    &ldquo;We don&apos;t teach students what to think. We teach them how to build, how to solve problems, and how to keep learning for the rest of their careers.&rdquo;
                  </blockquote>
                  <div className="mt-6 text-sm font-semibold">— The Cyber Elias Academy Team</div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What we stand for</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Four values guide every decision we make as an academy.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full group hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <v.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{v.title}</h3>
                    <p className="text-sm text-muted-foreground">{v.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What we teach</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Four tracks, one goal: making you employable.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tracks.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="h-11 w-11 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center mb-4">
                      <t.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-semibold mb-2">{t.title}</h3>
                    <p className="text-sm text-muted-foreground">{t.desc}</p>
                    <Link href="/courses" className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline">
                      Learn more <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Our journey</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/50 via-purple-500/50 to-pink-500/50" />
            <div className="space-y-10">
              {milestones.map((m, i) => (
                <motion.div key={m.year} initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className={`relative flex md:w-1/2 ${i % 2 === 0 ? 'md:pr-10 md:ml-auto' : 'md:pl-10'} pl-12 md:pl-0`}>
                  <div className="absolute left-4 md:left-auto top-2 h-3 w-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 ring-4 ring-background" style={i % 2 === 0 ? { right: '-6px' } : undefined} />
                  <div>
                    <div className="text-sm font-bold text-primary">{m.year}</div>
                    <h3 className="font-semibold mt-1">{m.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{m.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to be part of the story?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Join the next cohort and start building the career you deserve.</p>
            <div className="mt-8">
              <Link href="/register"><Button size="lg" className="group">Apply Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button></Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
