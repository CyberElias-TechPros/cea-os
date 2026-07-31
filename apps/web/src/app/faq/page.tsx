'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input } from '@cea/ui';
import { ChevronDown, Search, HelpCircle, Mail, Phone, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const faqs = [
  {
    category: 'Getting started',
    items: [
      { q: 'How do I create an account?', a: 'Click "Get Started" in the header, fill in your email, full name, and a strong password. You will be taken straight into the dashboard where you can browse courses and enroll.' },
      { q: 'Is CEA-OS free to use?', a: 'Creating an account and browsing the platform is completely free. Individual courses are available as one-time purchases, and full career tracks come with subscription options.' },
      { q: 'What is a "visit" and how does it work?', a: 'Visits are structured learning sessions that track your progress. Each course is broken into visit modules with quizzes, projects, and completion certificates.' },
    ],
  },
  {
    category: 'Account & billing',
    items: [
      { q: 'How do I reset my password?', a: 'Head to the login page and click "Forgot password?". We will send a reset link to your registered email address.' },
      { q: 'What payment methods do you accept?', a: 'We accept card payments, bank transfers, and USSD for students in supported regions. All payments are processed securely.' },
      { q: 'Can I get a refund?', a: 'Yes. We offer a 7-day money-back guarantee on all single-course purchases, no questions asked. Subscription plans can be cancelled anytime.' },
    ],
  },
  {
    category: 'Learning experience',
    items: [
      { q: 'Do I get a certificate when I finish a course?', a: 'Yes! Every completed course earns you a verified certificate that you can share on LinkedIn and add to your resume.' },
      { q: 'How much time do I need per week?', a: 'Most courses are designed for 4-6 hours per week. You learn at your own pace — your progress is saved automatically.' },
      { q: 'Can I access courses on my phone?', a: 'Absolutely. The platform is fully responsive, so you can learn on any device with a browser.' },
    ],
  },
  {
    category: 'Technical support',
    items: [
      { q: 'The site is not loading — what should I do?', a: 'First, try a hard refresh (Ctrl+Shift+R). If the issue persists, clear your browser cache or try a different browser. Our engineers monitor uptime 24/7.' },
      { q: 'I found a bug. How do I report it?', a: 'Use the contact form and select "Technical issue" as the subject, or reach us on the support email. Please include screenshots and the steps to reproduce.' },
      { q: 'How do I update my profile information?', a: 'Go to your dashboard, open the profile section, and edit your details. Changes save instantly.' },
    ],
  },
];

export default function FaqPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const normalized = query.trim().toLowerCase();
  const filtered = faqs
    .map((cat) => ({
      ...cat,
      items: cat.items.filter((f) => f.q.toLowerCase().includes(normalized) || f.a.toLowerCase().includes(normalized)),
    }))
    .filter((cat) => cat.items.length > 0);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-20 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Frequently asked <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">questions</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">Everything you need to know about the academy and platform.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="relative mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions… (e.g. refund, certificate)"
            className="pl-12 py-6 text-base rounded-2xl"
          />
        </motion.div>

        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="mt-4 text-muted-foreground">No results for &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try different keywords, or contact support below.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((cat, ci) => (
              <motion.div key={cat.category} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: ci * 0.05 }}>
                <h2 className="text-lg font-bold mb-4">{cat.category}</h2>
                <div className="space-y-3">
                  {cat.items.map((f) => {
                    const id = `${cat.category}-${f.q}`;
                    const isOpen = open === id;
                    return (
                      <motion.div key={id} layout initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="rounded-2xl border bg-card overflow-hidden">
                        <button
                          onClick={() => setOpen(isOpen ? null : id)}
                          className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/40 transition-colors"
                        >
                          <span className="font-medium">{f.q}</span>
                          <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                            >
                              <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Still need help */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-8 text-white text-center">
          <h3 className="text-2xl font-bold">Still have questions?</h3>
          <p className="mt-2 text-white/80">Our team responds within 24 hours.</p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-100 transition-colors">
              <Mail className="h-4 w-4" /> Contact us
            </Link>
            <Link href="/help" className="inline-flex items-center justify-center gap-2 rounded-lg bg-white/15 px-6 py-3 text-sm font-semibold hover:bg-white/25 transition-colors backdrop-blur">
              <MessageSquare className="h-4 w-4" /> Help center
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
