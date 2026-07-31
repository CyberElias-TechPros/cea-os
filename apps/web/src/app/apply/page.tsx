'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Input, Label, Textarea } from '@cea/ui';
import { useAuth } from '../../lib/auth-context';
import { api } from '../../lib/api-client';
import {
  User, GraduationCap, BookOpen, PenLine, CheckCircle2, ChevronLeft, ChevronRight,
  Loader2, LogIn, UserPlus, FileText, CalendarClock, PartyPopper, Send, BadgeCheck,
} from 'lucide-react';

const programs = [
  { id: 'full-stack-web-development', name: 'Full-Stack Web Development', duration: '12 weeks', price: 45000, level: 'Beginner to Advanced' },
  { id: 'python-data-science', name: 'Python for Data Science', duration: '10 weeks', price: 38000, level: 'Beginner' },
  { id: 'cybersecurity-essentials', name: 'Cyber Security Essentials', duration: '14 weeks', price: 52000, level: 'Intermediate' },
  { id: 'digital-marketing-strategy', name: 'Digital Marketing Strategy', duration: '8 weeks', price: 30000, level: 'Beginner' },
  { id: 'cloud-devops', name: 'Cloud & DevOps Engineering', duration: '12 weeks', price: 48000, level: 'Intermediate' },
  { id: 'ai-machine-learning', name: 'AI & Machine Learning', duration: '16 weeks', price: 65000, level: 'Advanced' },
];

const steps = [
  { id: 'personal', label: 'Personal', icon: User },
  { id: 'academic', label: 'Academic', icon: GraduationCap },
  { id: 'program', label: 'Program', icon: BookOpen },
  { id: 'motivation', label: 'Motivation', icon: PenLine },
  { id: 'review', label: 'Review', icon: CheckCircle2 },
];

interface Application {
  id: string;
  status: string;
  programId?: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  offers?: { id: string; status: string; tuitionFee?: number; scholarshipAmount?: number; validUntil?: string }[];
}

const statusStages: Record<string, { label: string; done: boolean }[]> = {
  draft: [{ label: 'Draft', done: true }, { label: 'Submitted', done: false }, { label: 'Under review', done: false }, { label: 'Decision', done: false }],
  submitted: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: false }, { label: 'Decision', done: false }],
  under_review: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Decision', done: false }],
  shortlisted: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Decision', done: false }],
  interview_scheduled: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Interview', done: true }],
  offer_made: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Offer made', done: true }],
  accepted: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Accepted', done: true }],
  rejected: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Rejected', done: true }],
  withdrawn: [{ label: 'Draft', done: true }, { label: 'Submitted', done: true }, { label: 'Under review', done: true }, { label: 'Withdrawn', done: true }],
};

export default function ApplyPage() {
  const { user, loading: authLoading } = useAuth();
  const [step, setStep] = useState(0);
  const [applicationId, setApplicationId] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [saving, setSaving] = useState(false);
  const [myApps, setMyApps] = useState<Application[]>([]);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '', address: '',
    educationLevel: '', previousSchool: '', programId: '', motivation: '',
  });

  const update = (key: string, value: string) => setForm((f) => ({ ...f, [key]: value }));

  const loadMyApps = useCallback(async () => {
    const res = await api<Application[]>('/v1/admissions/my');
    if (res.success && res.data) setMyApps(res.data);
  }, []);

  useEffect(() => {
    if (user) {
      loadMyApps();
      setForm((f) => ({ ...f, firstName: user.firstName, lastName: user.lastName, email: user.email }));
    }
  }, [user, loadMyApps]);

  const saveDraft = async () => {
    if (!user || !applicationId) return null;
    setSaving(true);
    const res = await api(`/v1/admissions/${applicationId}`, {
      method: 'PATCH',
      body: JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, phone: form.phone, dateOfBirth: form.dateOfBirth, address: form.address, educationLevel: form.educationLevel, previousSchool: form.previousSchool, programId: form.programId || undefined, motivation: form.motivation }),
    });
    setSaving(false);
    return res.success;
  };

  const startOrContinue = async () => {
    if (!user) return;
    if (applicationId) { saveDraft(); return; }
    setSaving(true);
    const res = await api<Application>('/v1/admissions', {
      method: 'POST',
      body: JSON.stringify({
        firstName: form.firstName, lastName: form.lastName, email: form.email,
        programId: form.programId || undefined,
      }),
    });
    setSaving(false);
    if (res.success && res.data) {
      setApplicationId(res.data.id);
      await loadMyApps();
    }
  };

  const handleNext = async () => {
    if (step === 0 && !applicationId && user) await startOrContinue();
    if (step === 2 && !form.programId) return;
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const handleSubmit = async () => {
    if (!applicationId) return;
    setSaving(true);
    await saveDraft();
    const res = await api(`/v1/admissions/${applicationId}/submit`, { method: 'POST' });
    setSaving(false);
    if (res.success) {
      setSubmitted(true);
      await loadMyApps();
    }
  };

  const respondToOffer = async (offerId: string, accept: boolean) => {
    await api(`/v1/admissions/offers/${offerId}/respond`, { method: 'POST', body: JSON.stringify({ accept }) });
    await loadMyApps();
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-40">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
        </div>
        <section className="container mx-auto px-4 py-24 max-w-xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
              <FileText className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Apply to Cyber Elias Academy</h1>
            <p className="mt-4 text-muted-foreground">Create a free account to start your application. It takes less than 5 minutes.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register"><Button size="lg" className="w-full sm:w-auto"><UserPlus className="mr-2 h-4 w-4" /> Create Account</Button></Link>
              <Link href="/login"><Button variant="outline" size="lg" className="w-full sm:w-auto"><LogIn className="mr-2 h-4 w-4" /> Sign In</Button></Link>
            </div>
            <div className="mt-10 grid grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex flex-col items-center gap-2">
                <CalendarClock className="h-6 w-6 text-primary" />
                <span>5-minute application</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <BadgeCheck className="h-6 w-6 text-primary" />
                <span>No application fee</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <PartyPopper className="h-6 w-6 text-primary" />
                <span>Scholarships available</span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-green-500/10 blur-3xl" />
        </div>
        <section className="container mx-auto px-4 py-24 max-w-2xl text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
            <h1 className="text-3xl md:text-4xl font-bold mt-6">Application submitted!</h1>
            <p className="mt-4 text-muted-foreground">
              Your application is now in review. Our admissions team will contact you within 5 business days.
              Track its status below.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/scholarships"><Button variant="outline">Explore Scholarships</Button></Link>
              <Link href="/courses"><Button>Browse Courses</Button></Link>
            </div>
          </motion.div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-16 max-w-4xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Application Hub</h1>
          <p className="mt-3 text-muted-foreground">Complete the 5 steps below. Your progress saves automatically.</p>
        </motion.div>

        {/* Stepper */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-10 flex-wrap">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const active = i === step;
            const done = i < step;
            return (
              <button key={s.id} onClick={() => i < step && setStep(i)} className="flex items-center gap-2" disabled={i > step}>
                <div className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-all ${active ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25' : done ? 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'bg-muted text-muted-foreground'}`}>
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{s.label}</span>
                </div>
                {i < steps.length - 1 && <div className={`h-px w-4 md:w-8 ${i < step ? 'bg-green-400' : 'bg-muted'}`} />}
              </button>
            );
          })}
        </div>

        <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="rounded-3xl border bg-card/80 backdrop-blur-xl p-8 shadow-xl">
          {/* Step 1 — Personal */}
          {step === 0 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Personal information</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First name</Label>
                  <Input value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Last name</Label>
                  <Input value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input type="email" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input placeholder="+234..." value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Date of birth</Label>
                  <Input type="date" value={form.dateOfBirth} onChange={(e) => update('dateOfBirth', e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Address</Label>
                  <Input placeholder="City, Country" value={form.address} onChange={(e) => update('address', e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {/* Step 2 — Academic */}
          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Academic background</h2>
              <div className="space-y-2">
                <Label>Highest education level</Label>
                <select
                  value={form.educationLevel}
                  onChange={(e) => update('educationLevel', e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <option value="">Select...</option>
                  <option value="secondary">Secondary school</option>
                  <option value="diploma">Diploma / Certificate</option>
                  <option value="bachelors">Bachelor's degree</option>
                  <option value="masters">Master's degree</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label>Previous school / institution</Label>
                <Input placeholder="Name of institution" value={form.previousSchool} onChange={(e) => update('previousSchool', e.target.value)} />
              </div>
              <div className="rounded-2xl bg-blue-50 dark:bg-blue-900/20 p-4 text-sm text-muted-foreground">
                No transcripts required to apply. Our team may request documents during the review stage.
              </div>
            </div>
          )}

          {/* Step 3 — Program */}
          {step === 2 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Choose your program</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {programs.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => update('programId', p.id)}
                    className={`text-left rounded-2xl border p-5 transition-all ${form.programId === p.id ? 'border-primary ring-2 ring-primary/30 bg-primary/5' : 'hover:border-primary/40 hover:bg-muted/40'}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold">{p.name}</div>
                      {form.programId === p.id && <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />}
                    </div>
                    <div className="mt-2 flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{p.duration}</span>
                      <span>·</span>
                      <span>{p.level}</span>
                      <span>·</span>
                      <span className="font-semibold text-foreground">₦{p.price.toLocaleString()}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4 — Motivation */}
          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Tell us your story</h2>
              <div className="space-y-2">
                <Label>Why do you want to join this program?</Label>
                <Textarea
                  rows={7}
                  placeholder="What are your goals, and how will this program help you achieve them?"
                  value={form.motivation}
                  onChange={(e) => update('motivation', e.target.value)}
                />
              </div>
              <p className="text-xs text-muted-foreground">{form.motivation.length} characters (min 50 recommended)</p>
            </div>
          )}

          {/* Step 5 — Review */}
          {step === 4 && (
            <div className="space-y-5">
              <h2 className="text-xl font-bold">Review your application</h2>
              <div className="rounded-2xl border divide-y">
                {[
                  { label: 'Full name', value: `${form.firstName} ${form.lastName}` },
                  { label: 'Email', value: form.email },
                  { label: 'Phone', value: form.phone || '—' },
                  { label: 'Education', value: form.educationLevel ? form.educationLevel.replace('_', ' ') : '—' },
                  { label: 'Program', value: programs.find((p) => p.id === form.programId)?.name ?? '—' },
                  { label: 'Motivation', value: form.motivation || '—' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between gap-4 px-5 py-3 text-sm">
                    <span className="text-muted-foreground">{row.label}</span>
                    <span className="font-medium text-right">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Nav buttons */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="outline" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}>
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button onClick={handleNext} disabled={saving || (step === 0 && (!form.firstName || !form.lastName || !form.email)) || (step === 2 && !form.programId)}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <>Continue <ChevronRight className="ml-1 h-4 w-4" /></>}
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={saving} className="group">
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1 h-4 w-4" /> Submit Application</>}
              </Button>
            )}
          </div>
        </motion.div>

        {/* Status tracker */}
        {myApps.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-12">
            <h2 className="text-2xl font-bold mb-6">My applications</h2>
            <div className="space-y-4">
              {myApps.map((app) => (
                <div key={app.id} className="rounded-2xl border bg-card p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div>
                      <div className="font-semibold">{app.firstName} {app.lastName}</div>
                      <div className="text-sm text-muted-foreground">
                        {programs.find((p) => p.id === app.programId)?.name ?? 'Program'} · {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold capitalize text-primary">{app.status.replace(/_/g, ' ')}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {(statusStages[app.status] ?? statusStages.draft).map((stage, i) => (
                      <div key={i} className="flex items-center gap-2 flex-1">
                        <div className={`h-2 rounded-full flex-1 ${stage.done ? 'bg-green-500' : 'bg-muted'}`} />
                        <span className={`text-[10px] ${stage.done ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>{stage.label}</span>
                      </div>
                    ))}
                  </div>
                  {app.offers?.map((offer) => (
                    <div key={offer.id} className="mt-4 rounded-xl border-2 border-green-500/30 bg-green-50 dark:bg-green-900/20 p-4">
                      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                          <div className="font-semibold text-green-700 dark:text-green-400">Offer received!</div>
                          <div className="text-sm text-muted-foreground mt-1">
                            {offer.tuitionFee ? `Tuition: ₦${offer.tuitionFee.toLocaleString()}` : ''}
                            {offer.scholarshipAmount ? ` · Scholarship: ₦${offer.scholarshipAmount.toLocaleString()}` : ''}
                            {offer.validUntil ? ` · Valid until ${new Date(offer.validUntil).toLocaleDateString()}` : ''}
                          </div>
                        </div>
                        {offer.status === 'sent' && (
                          <div className="flex gap-2">
                            <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => respondToOffer(offer.id, true)}>Accept</Button>
                            <Button size="sm" variant="outline" onClick={() => respondToOffer(offer.id, false)}>Decline</Button>
                          </div>
                        )}
                        {offer.status !== 'sent' && (
                          <span className="text-sm font-medium capitalize text-muted-foreground">{offer.status}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </section>
    </div>
  );
}
