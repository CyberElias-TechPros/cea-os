'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Input, Textarea } from '@cea/ui';
import { api } from '../../lib/api-client';
import { Heart, Loader2, CheckCircle2, GraduationCap, BookOpen, Users, Laptop, ShieldCheck } from 'lucide-react';

const PRESETS = [250, 500, 1000, 2500, 5000];

export default function DonatePage() {
  const [amount, setAmount] = useState<number>(500);
  const [custom, setCustom] = useState('');
  const [form, setForm] = useState({ donorName: '', donorEmail: '', message: '', isAnonymous: false });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState<{ ok: boolean; text: string } | null>(null);

  const submit = async () => {
    setSubmitting(true);
    setDone(null);
    const res = await api('/v1/community/donations', {
      method: 'POST',
      body: JSON.stringify({
        donorName: form.isAnonymous ? undefined : form.donorName || 'Anonymous',
        donorEmail: form.isAnonymous ? undefined : form.donorEmail,
        amount: custom ? Number(custom) : amount,
        currency: 'ZAR',
        message: form.message || undefined,
        isAnonymous: form.isAnonymous,
        status: 'pending',
        paymentReference: `DON-${Date.now().toString(36).toUpperCase()}`,
      }),
    });
    setSubmitting(false);
    if (res.success) {
      setDone({ ok: true, text: `Thank you! Your pledge of R${custom ? Number(custom).toLocaleString() : amount.toLocaleString()} has been recorded. Our team will contact you to complete the payment.` });
      setCustom('');
      setForm({ donorName: '', donorEmail: '', message: '', isAnonymous: false });
    } else {
      setDone({ ok: false, text: res.error?.message || 'Something went wrong. Please try again.' });
    }
  };

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-rose-500/10 via-orange-500/5 to-transparent -z-10" />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-14">
          <Badge variant="outline" className="mb-4">Support CEA</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Give a student a future</h1>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Your donation funds scholarships, equipment and community programmes that give talented young South Africans access to tech education.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8 mb-16">
          <Card className="md:col-span-3">
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6">Make a donation</h2>

              <div className="mb-6">
                <div className="text-sm font-medium mb-3">Choose an amount (ZAR)</div>
                <div className="grid grid-cols-5 gap-2 mb-3">
                  {PRESETS.map(p => (
                    <button
                      key={p}
                      onClick={() => { setAmount(p); setCustom(''); }}
                      className={`rounded-xl border py-3 text-sm font-semibold transition-all ${!custom && amount === p ? 'border-primary bg-primary text-primary-foreground shadow-lg' : 'hover:border-primary/50'}`}
                    >
                      R{p.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">R</span>
                  <Input
                    type="number"
                    placeholder="Custom amount"
                    value={custom}
                    onChange={e => setCustom(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full name</label>
                    <Input value={form.donorName} onChange={e => setForm(f => ({ ...f, donorName: e.target.value }))} className="mt-1" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input type="email" value={form.donorEmail} onChange={e => setForm(f => ({ ...f, donorEmail: e.target.value }))} className="mt-1" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Message (optional)</label>
                  <Textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} rows={3} className="mt-1" placeholder="Tell us what inspired your gift..." />
                </div>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" checked={form.isAnonymous} onChange={e => setForm(f => ({ ...f, isAnonymous: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
                  Keep my donation anonymous
                </label>
              </div>

              {done && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 rounded-xl border p-4 text-sm font-medium ${done.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
                  {done.ok && <CheckCircle2 className="h-4 w-4 inline mr-1.5 -mt-0.5" />}{done.text}
                </motion.div>
              )}

              <Button size="lg" className="w-full" onClick={submit} disabled={submitting}>
                {submitting ? <Loader2 className="h-5 w-5 animate-spin mr-2" /> : <Heart className="h-5 w-5 mr-2" />}
                Donate R{(custom ? Number(custom) : amount).toLocaleString()}
              </Button>
              <p className="text-xs text-muted-foreground mt-3 text-center">
                Pledge only — our team will follow up to complete the payment securely.
              </p>
            </CardContent>
          </Card>

          <div className="md:col-span-2 space-y-4">
            {[
              { icon: <GraduationCap className="h-5 w-5" />, title: 'Scholarships', text: 'Full and partial bursaries for students from under-resourced communities.' },
              { icon: <BookOpen className="h-5 w-5" />, title: 'Learning materials', text: 'Textbooks, licenses and certification fees for every programme.' },
              { icon: <Laptop className="h-5 w-5" />, title: 'Lab equipment', text: 'Workstations, networking kits and cyber ranges for hands-on practice.' },
              { icon: <Users className="h-5 w-5" />, title: 'Community programmes', text: 'Free workshops, hackathons and mentorship for the wider community.' },
            ].map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                <Card>
                  <CardContent className="p-5 flex gap-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">{item.icon}</div>
                    <div>
                      <div className="font-semibold text-sm">{item.title}</div>
                      <div className="text-sm text-muted-foreground mt-0.5">{item.text}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
            <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent">
              <CardContent className="p-5 flex items-center gap-3 text-sm">
                <ShieldCheck className="h-5 w-5 text-primary shrink-0" />
                Every donation is tracked transparently — impact reports are shared with donors each semester.
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
