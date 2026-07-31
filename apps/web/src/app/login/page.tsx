'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import { Mail, Lock, Loader2, ArrowRight, Eye, EyeOff, Sparkles, ShieldCheck, Zap, Trophy } from 'lucide-react';
import { Button, Input, Label } from '@cea/ui';
import { useAuth } from '../../lib/auth-context';

const features = [
  { icon: Zap, title: 'Fast-track your career', desc: 'Industry-aligned curriculum built with real employers' },
  { icon: ShieldCheck, title: 'Learn securely', desc: 'Private vaults, verified credentials, safe community' },
  { icon: Trophy, title: 'Earn real credentials', desc: 'Certificates that employers actually recognize' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(email, password);
    setLoading(false);
    if (result.success) {
      router.push('/dashboard');
    } else {
      setError(result.error || 'Login failed');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" />
        <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Left showcase panel */}
      <div className="hidden lg:flex flex-1 flex-col justify-center px-16 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold tracking-tight leading-tight">
            Welcome back to
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Cyber Elias Academy
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-md">
            Your journey continues. Pick up right where you left off.
          </p>
        </motion.div>

        <div className="mt-10 space-y-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.15 }}
              className="flex items-start gap-4"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/20">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <div>
                <div className="font-semibold">{f.title}</div>
                <div className="text-sm text-muted-foreground">{f.desc}</div>
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
          <div className="rounded-2xl border bg-card/80 backdrop-blur-xl p-8 shadow-2xl shadow-blue-500/5">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-600/30">
                <Sparkles className="h-7 w-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold">Sign in</h2>
              <p className="mt-1 text-sm text-muted-foreground">Enter your credentials to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/help" className="text-xs text-muted-foreground hover:text-foreground">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    className="pl-10 pr-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

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
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="font-medium text-primary hover:underline">
                Create one free
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
