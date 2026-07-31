'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../lib/api-client';
import { GraduationCap, Users, Wallet, CalendarDays, Sparkles, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';

interface Scholarship {
  id: string;
  name: string;
  description?: string;
  fundAmount?: number;
  availableSlots?: number;
  deadline?: string;
  eligibilityCriteria?: string;
  status: string;
}

const criteria = [
  { id: 'need', label: 'Financial need', weight: 35 },
  { id: 'academic', label: 'Strong academics (70%+ average)', weight: 25 },
  { id: 'first_gen', label: 'First-generation student', weight: 15 },
  { id: 'female', label: 'Woman in tech', weight: 15 },
  { id: 'volunteer', label: 'Community service experience', weight: 10 },
];

const coverageTiers = [
  { label: 'Needs-based scholarship', min: 0, max: 49, pct: 50 },
  { label: 'Merit scholarship', min: 50, max: 74, pct: 25 },
  { label: 'Women-in-tech grant', min: 75, max: 100, pct: 25 },
];

function estimateCoverage(selected: string[]) {
  let score = 0;
  for (const c of criteria) if (selected.includes(c.id)) score += c.weight;
  const pct = Math.min(100, Math.round((score / 100) * 100));
  const tier = coverageTiers.find((t) => pct >= t.min && pct <= t.max) ?? coverageTiers[0];
  return { score: pct, tier, stacking: pct >= 75 ? 100 : pct >= 50 ? 75 : 50 };
}

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const res = await api<Scholarship[]>('/v1/community/scholarships');
      if (res.success && res.data) setScholarships(res.data);
      setLoading(false);
    })();
  }, []);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const { score, tier, stacking } = estimateCoverage(selected);
  const active = scholarships.filter((s) => s.status === 'active');

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-pink-500/10 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-14">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
            <GraduationCap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Scholarships & <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">funding</span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Talent is everywhere, but opportunity isn&apos;t. We believe money should never stop a great student — estimate your eligibility and apply.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Eligibility estimator */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.15 }}>
            <div className="rounded-3xl border bg-card/80 backdrop-blur-xl p-8 shadow-xl sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="h-6 w-6 text-primary" />
                <h2 className="text-xl font-bold">Eligibility estimator</h2>
              </div>
              <p className="text-sm text-muted-foreground mb-6">Select all that apply to you. Scholarships can stack up to 100% of tuition.</p>
              <div className="space-y-3">
                {criteria.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => toggle(c.id)}
                    className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${selected.includes(c.id) ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'hover:border-primary/40'}`}
                  >
                    <span className="font-medium">{c.label}</span>
                    {selected.includes(c.id) ? <CheckCircle2 className="h-5 w-5 text-primary" /> : <span className="text-muted-foreground text-xs">{c.weight}%</span>}
                  </button>
                ))}
              </div>

              <div className="mt-6 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
                <div className="flex items-end justify-between">
                  <div>
                    <div className="text-sm text-white/70">Estimated eligibility</div>
                    <div className="text-4xl font-bold mt-1">{score}%</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-white/70">Coverage</div>
                    <div className="text-2xl font-bold">{tier.pct}%</div>
                  </div>
                </div>
                <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
                  <motion.div animate={{ width: `${score}%` }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-white" />
                </div>
                <div className="mt-4 text-sm text-white/90">
                  {score >= 75 ? 'Excellent — you likely qualify for stacked scholarships!' : score >= 50 ? 'Strong candidate — partial funding likely available.' : 'You may qualify for need-based support.'}
                  <span className="block mt-1 text-white/70">Max stacking potential: up to {stacking}% of tuition.</span>
                </div>
              </div>

              <Link href={selected.length > 0 ? '/apply' : '/register'} className="block mt-6">
                <Button size="lg" className="w-full group">Apply for scholarships <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" /></Button>
              </Link>
            </div>
          </motion.div>

          {/* Catalog */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
            <h2 className="text-xl font-bold mb-6">Current scholarships</h2>
            {loading ? (
              <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
            ) : active.length === 0 ? (
              <Card>
                <CardContent className="p-10 text-center">
                  <GraduationCap className="h-10 w-10 text-muted-foreground mx-auto" />
                  <p className="mt-4 text-muted-foreground">No active scholarships right now — check back soon, or apply and our team will match you with funding options.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {active.map((s, i) => (
                  <motion.div key={s.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}>
                    <Card className="hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-lg">{s.name}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{s.description || s.eligibilityCriteria || 'Scholarship to support talented students.'}</p>
                          </div>
                          <Badge variant="success">Open</Badge>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                          {s.fundAmount && (
                            <span className="flex items-center gap-1.5"><Wallet className="h-4 w-4" /> Fund: ₦{s.fundAmount.toLocaleString()}</span>
                          )}
                          {s.availableSlots !== undefined && (
                            <span className="flex items-center gap-1.5"><Users className="h-4 w-4" /> {s.availableSlots} slots</span>
                          )}
                          {s.deadline && (
                            <span className="flex items-center gap-1.5"><CalendarDays className="h-4 w-4" /> Deadline: {new Date(s.deadline).toLocaleDateString()}</span>
                          )}
                        </div>
                        <Link href="/apply"><Button size="sm" className="mt-4">Apply now</Button></Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
