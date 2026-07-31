'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Input, Label, Textarea } from '@cea/ui';
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, MessageSquare, Clock } from 'lucide-react';

const contactMethods = [
  { icon: Mail, title: 'Email us', value: 'hello@cea.academy', href: 'mailto:hello@cea.academy' },
  { icon: Phone, title: 'Call us', value: '+234 800 000 0000', href: 'tel:+2348000000000' },
  { icon: MapPin, title: 'Visit us', value: 'Lagos, Nigeria', href: '#' },
  { icon: Clock, title: 'Response time', value: 'Within 24 hours', href: '#' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    setSending(false);
    setSent(true);
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full bg-purple-500/15 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Let&apos;s <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">talk</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
            Questions about courses, admissions, partnerships, or anything else — we&apos;d love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          {/* Contact methods */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-4">
            {contactMethods.map((m, i) => (
              <motion.a
                key={m.title}
                href={m.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-center gap-4 rounded-2xl border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <m.icon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">{m.title}</div>
                  <div className="font-semibold">{m.value}</div>
                </div>
              </motion.a>
            ))}

            <div className="rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
              <MessageSquare className="h-6 w-6 mb-3" />
              <h3 className="font-bold text-lg">Prefer chat?</h3>
              <p className="text-sm text-white/80 mt-1">Our community team is active in the support channels during business hours.</p>
              <a href="/help"><Button variant="secondary" size="sm" className="mt-4">Visit Help Center</Button></a>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="lg:col-span-3">
            <div className="rounded-2xl border bg-card/80 backdrop-blur-xl p-8 shadow-xl">
              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-2xl font-bold mt-4">Message sent!</h3>
                  <p className="text-muted-foreground mt-2">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                  <Button className="mt-6" onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}>Send another</Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your name</Label>
                      <Input id="name" placeholder="Ada Lovelace" value={form.name} onChange={(e) => update('name', e.target.value)} required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="What is this about?" value={form.subject} onChange={(e) => update('subject', e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" rows={6} placeholder="Tell us everything…" value={form.message} onChange={(e) => update('message', e.target.value)} required />
                  </div>
                  <Button type="submit" size="lg" className="w-full group" disabled={sending}>
                    {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                      <>
                        Send Message <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
