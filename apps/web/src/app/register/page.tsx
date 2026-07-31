'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Mail, Lock, User, Phone, Loader2, ArrowRight, Eye, EyeOff, Sparkles, ShieldCheck, GraduationCap, Rocket } from 'lucide-react';
import { Button, Input, Label } from '@cea/ui';
import { useAuth } from '../../lib/auth-context';

const benefits = [
  { icon: GraduationCap, title: 'World-class curriculum', desc: 'From zero to job-ready, guided by industry mentors' },
  { icon: ShieldCheck, title: 'Verified credentials', desc: 'Certificates and badges employers trust' },
  { icon: Rocket, title: 'Career launchpad', desc: 'Portfolio, internships, and placement support' },
];

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', password: '', acceptTerms: false });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key: string, value: string | boolean) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!form.acceptTerms) {
      setError('You must accept the terms of service');
      return;
    }
    setLoading(true);
    const result = await register({
      email: form.email,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
    });
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Registration failed');
    }
  };

  const passwordChecks = [
    { label: '8+ characters', ok: form.password.length >= 8 },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(form.password) },
    { label: 'Lowercase letter', ok: /[a-z]/.test(form.password) },
    { label: 'Number', ok: /[0-9]/.test(form.password) },
  ];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1.2s' }} />
        <div className="absolute bottom-0 right-1/3 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2.4s' }} />
      </div>

      {/* Left benefits panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-16">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Start your
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              tech journey
            </span>
            today.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Join a community of builders, learners, and future tech leaders. Free to start.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shrink-0 shadow-lg shadow-purple-600/20">
                <b.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">{b.title}</div>
                <div className="text-sm text-muted-foreground">{b.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="w-full max-w-md"
        >
          <div className="rounded-2xl border bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-purple-500/5">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Create your account</h2>
              <p className="mt-1 text-sm text-muted-foreground">Free forever for students</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" placeholder="Ada" className="pl-10" value={form.firstName} onChange={(e) => update('firstName', e.target.value)} required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input id="lastName" placeholder="Lovelace" value={form.lastName} onChange={(e) => update('lastName', e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="you@example.com" className="pl-10" value={form.email} onChange={(e) => update('email', e.target.value)} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="phone" type="tel" placeholder="+234 800 000 0000" className="pl-10" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a strong password" className="pl-10 pr-10" value={form.password} onChange={(e) => update('password', e.target.value)} required />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {passwordChecks.map((c) => (
                    <div key={c.label} className={`flex items-center gap-1.5 text-xs ${c.ok ? 'text-green-600 dark:text-green-400' : 'text-muted-foreground'}`}>
                      <span className={`inline-block h-1.5 w-1.5 rounded-full ${c.ok ? 'bg-green-500' : 'bg-muted-foreground/40'}`} />
                      {c.label}
                    </div>
                  ))}
                </div>
              </div>

              <label className="flex items-start gap-2 text-sm text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.acceptTerms}
                  onChange={(e) => update('acceptTerms', e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-input accent-primary"
                />
                <span>
                  I agree to the{' '}
                  <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                </span>
              </label>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-2.5 text-sm text-red-600 dark:text-red-400"
                >
                  {error}
                </motion.div>
              )}

              <Button type="submit" className="w-full group" size="lg" disabled={loading}>
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    Create Account
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
