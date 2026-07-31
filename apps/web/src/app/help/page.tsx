'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Input, Button } from '@cea/ui';
import { Search, KeyRound, User, CreditCard, PlayCircle, Wrench, ArrowRight, Mail, MessageSquare } from 'lucide-react';
import Link from 'next/link';

const topics = [
  {
    icon: KeyRound,
    title: 'Account & Password',
    color: 'from-blue-600 to-blue-400',
    items: [
      { q: 'I forgot my password', a: 'On the login page, click "Forgot password?" and enter the email you registered with. You will receive a reset link within a few minutes. Check your spam folder if it does not arrive.' },
      { q: 'How do I change my password?', a: 'Log in, open your profile settings, and choose "Security". Enter your current password, then your new one (at least 8 characters with a mix of letters and numbers).' },
      { q: 'I was locked out of my account', a: 'Multiple failed attempts temporarily lock your account for 15 minutes. Wait, or use the password reset flow. Still stuck? Contact support and we will verify your identity.' },
    ],
  },
  {
    icon: User,
    title: 'Profile & Dashboard',
    color: 'from-purple-600 to-purple-400',
    items: [
      { q: 'How do I update my profile?', a: 'From your dashboard, open the profile section to edit your name, phone, bio, and avatar. Changes are saved instantly.' },
      { q: 'What is the progress bar in my dashboard?', a: 'It shows your overall completion across all enrolled courses. Finishing lessons and passing quizzes moves it forward.' },
    ],
  },
  {
    icon: CreditCard,
    title: 'Payments & Billing',
    color: 'from-pink-600 to-pink-400',
    items: [
      { q: 'My payment failed. What now?', a: 'Check that your card details are correct and that your bank allows online payments. If the charge went through but you did not get access, contact support with your receipt.' },
      { q: 'How do I request a refund?', a: 'Within 7 days of purchase, email support with your order reference. Refunds are processed back to the original payment method within 5-10 business days.' },
    ],
  },
  {
    icon: PlayCircle,
    title: 'Learning & Certificates',
    color: 'from-emerald-600 to-emerald-400',
    items: [
      { q: 'When do I earn my certificate?', a: 'Immediately after completing every lesson and quiz in a course, a certificate is generated in your dashboard. Download it as a PDF and share it on LinkedIn.' },
      { q: 'Can I retake a quiz?', a: 'Yes, unlimited retakes. Only your best score is recorded.' },
    ],
  },
  {
    icon: Wrench,
    title: 'Technical Issues',
    color: 'from-amber-600 to-amber-400',
    items: [
      { q: 'Videos will not play', a: 'Try a hard refresh, disable ad-blockers for this site, or switch browsers. If you are on a school or work network, a firewall may be blocking the video streams.' },
      { q: 'The site looks broken after an update', a: 'Clear your browser cache (Ctrl+Shift+R for a hard reload). If it persists, try incognito mode — this usually isolates cached-script issues.' },
    ],
  },
];

export default function HelpPage() {
  const [open, setOpen] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const normalized = query.trim().toLowerCase();
  const filtered = topics
    .map((t) => ({
      ...t,
      items: t.items.filter((f) => f.q.toLowerCase().includes(normalized) || f.a.toLowerCase().includes(normalized)),
    }))
    .filter((t) => t.items.length > 0);

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      {/* Hero with search */}
      <section className="container mx-auto px-4 pt-20 pb-10 text-center max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">How can we <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">help?</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">Search the help center, or browse topics below.</p>
          <div className="relative mt-8 max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search for help… (e.g. password, refund)" className="pl-12 py-6 text-base rounded-2xl" />
          </div>
        </motion.div>
      </section>

      {/* Topics */}
      <section className="container mx-auto px-4 pb-20 max-w-4xl">
        {filtered.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No articles match &ldquo;{query}&rdquo;.</p>
            <p className="mt-2 text-sm text-muted-foreground">Try different keywords, or contact support below.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filtered.map((topic, ti) => (
              <motion.div key={topic.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: ti * 0.05 }}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${topic.color} flex items-center justify-center`}>
                    <topic.icon className="h-5 w-5 text-white" />
                  </div>
                  <h2 className="text-lg font-bold">{topic.title}</h2>
                </div>
                <div className="space-y-3">
                  {topic.items.map((f) => {
                    const id = `${topic.title}-${f.q}`;
                    const isOpen = open === id;
                    return (
                      <div key={id} className="rounded-2xl border bg-card overflow-hidden">
                        <button onClick={() => setOpen(isOpen ? null : id)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted/40 transition-colors">
                          <span className="font-medium">{f.q}</span>
                          <ArrowRight className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-300 ${isOpen ? 'rotate-90 text-primary' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: 'easeInOut' }}>
                              <p className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Contact cards */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mt-16 grid sm:grid-cols-2 gap-4">
          <Link href="/contact" className="rounded-2xl border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-semibold mt-4">Email support</h3>
            <p className="text-sm text-muted-foreground mt-1">Replies within 24 hours, 7 days a week.</p>
          </Link>
          <Link href="/faq" className="rounded-2xl border bg-card p-6 hover:border-primary/50 hover:shadow-lg transition-all group">
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-semibold mt-4">Browse FAQ</h3>
            <p className="text-sm text-muted-foreground mt-1">Quick answers to the most common questions.</p>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
