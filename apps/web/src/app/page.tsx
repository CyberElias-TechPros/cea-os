'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent } from '@cea/ui';
import { ArrowRight, BookOpen, Users, Award, BarChart3, Code, Shield, Database, TrendingUp, Sparkles, CheckCircle2, Play, Star, GraduationCap, Zap } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Courses' },
  { value: '95%', label: 'Employment Rate' },
  { value: '4.8/5', label: 'Student Rating' },
];

const features = [
  { icon: Code, title: 'Software Development', description: 'Full-stack, mobile, and systems programming from fundamentals to advanced.', gradient: 'from-blue-600 to-cyan-500' },
  { icon: Shield, title: 'Cyber Security', description: 'Ethical hacking, network defense, and security operations.', gradient: 'from-purple-600 to-violet-500' },
  { icon: Database, title: 'Data Science & AI', description: 'Machine learning, deep learning, and data analytics.', gradient: 'from-pink-600 to-rose-500' },
  { icon: TrendingUp, title: 'Digital Marketing', description: 'SEO, paid ads, content strategy, and social media.', gradient: 'from-amber-600 to-orange-500' },
  { icon: BarChart3, title: 'Business & Tech', description: 'Project management, product ownership, and tech leadership.', gradient: 'from-emerald-600 to-teal-500' },
  { icon: BookOpen, title: 'Career-Ready Skills', description: 'Portfolio building, interview prep, and job placement support.', gradient: 'from-indigo-600 to-blue-500' },
];

const programs = [
  { title: 'Full-Time Bootcamp', duration: '12 weeks', description: 'Intensive immersive program with mentorship, projects, and job placement.', icon: Zap },
  { title: 'Part-Time Evening', duration: '24 weeks', description: 'Flexible schedule for working professionals. Same curriculum, extended timeline.', icon: Clock },
  { title: 'Self-Paced Online', duration: 'Flexible', description: 'Learn at your own pace with recorded content, labs, and weekly mentor sessions.', icon: Play },
];

const testimonials = [
  { name: 'Chinedu O.', role: 'Frontend Developer @ Fintech', quote: 'The bootcamp completely changed my career. I went from retail to a developer role in 5 months.', initials: 'CO', gradient: 'from-blue-600 to-cyan-500' },
  { name: 'Amara B.', role: 'Security Analyst', quote: 'The cyber security track is hands-down the most practical training I have ever taken. Labs were real-world.', initials: 'AB', gradient: 'from-purple-600 to-violet-500' },
  { name: 'Tunde A.', role: 'Data Analyst @ Bank', quote: 'Mentors actually care. My project portfolio landed me three interview invitations in two weeks.', initials: 'TA', gradient: 'from-pink-600 to-rose-500' },
];

function Clock({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.1, ease: 'easeOut' as const } }),
};

export default function Home() {
  return (
    <>
      {/* ===== Hero ===== */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950" />
        <div className="absolute -top-32 -left-32 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-[450px] w-[450px] rounded-full bg-purple-500/15 blur-3xl animate-pulse [animation-delay:1s]" />
        <div className="absolute -bottom-32 left-1/3 h-[400px] w-[400px] rounded-full bg-pink-500/10 blur-3xl animate-pulse [animation-delay:2s]" />

        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 rounded-full border bg-card/60 backdrop-blur px-4 py-1.5 text-sm font-medium text-muted-foreground mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              Now enrolling — Cohort 12 starts soon
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold tracking-tight sm:text-6xl">
              Master Digital Skills.
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">Build Your Future.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }} className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cyber Elias Academy provides industry-relevant training in software development, data science, cyber security, and digital marketing — from beginner to job-ready.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto group shadow-lg shadow-primary/20 hover:shadow-primary/30">
                  Start Learning Today <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">Browse Courses</Button>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }} className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Verified certificates</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Mentor-led projects</span>
              <span className="inline-flex items-center gap-1.5"><CheckCircle2 className="h-4 w-4 text-green-500" /> Job placement support</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Stats ===== */}
      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }} className="text-center">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">What You Can Learn</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our curriculum is designed with industry input to ensure you graduate with skills employers demand.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Card className="group h-full hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  <CardContent className="p-6">
                    <div className={`h-12 w-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Programs ===== */}
      <section className="bg-muted/30 py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
        </div>
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Choose Your Path</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Flexible learning formats designed to fit your schedule and learning style.
            </p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program, i) => (
              <motion.div key={program.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                      <program.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{program.duration}</div>
                    <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                    <p className="text-sm text-muted-foreground flex-1">{program.description}</p>
                    <Link href="/register">
                      <Button className="mt-6 w-full group">Enroll Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button>
                    </Link>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Why CEA ===== */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Why students <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">choose CEA</span>
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We do not just teach theory. Every lesson, lab, and project is built around what the industry actually needs.
              </p>
              <div className="mt-8 space-y-4">
                {[
                  { icon: GraduationCap, title: 'Project-based learning', desc: 'Build a real portfolio with mentors from day one.' },
                  { icon: Users, title: 'Small cohorts, real mentorship', desc: 'Weekly 1-on-1 check-ins with industry professionals.' },
                  { icon: Award, title: 'Employer-recognized certificates', desc: 'Credentials that hiring managers know and trust.' },
                ].map((item, i) => (
                  <motion.div key={item.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="flex gap-4">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <Link href="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline">
                Learn more about us <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {[
                { value: '92%', label: 'Completion rate' },
                { value: '15+', label: 'Industry partners' },
                { value: '3', label: 'Continents served' },
                { value: '24/7', label: 'Platform access' },
              ].map((s, i) => (
                <motion.div key={s.label} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="text-2xl md:text-3xl font-bold text-primary">{s.value}</div>
                      <div className="mt-1 text-xs md:text-sm text-muted-foreground">{s.label}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== Testimonials ===== */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Student success stories</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Real people. Real careers. Real transformation.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-xs font-bold text-white`}>
                        {t.initials}
                      </div>
                      <div>
                        <div className="text-sm font-semibold">{t.name}</div>
                        <div className="text-xs text-muted-foreground">{t.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-5" />
        </div>
        <div className="container mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Ready to Start Your Journey?</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Join hundreds of successful graduates who have transformed their careers through our programs.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="shadow-lg shadow-primary/20 group">Apply Now — Free Assessment <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">Talk to an Advisor</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
