'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Loader2, Lock, Eye, EyeOff, CheckCircle2, KeyRound } from 'lucide-react';
import { Button, Input, Label } from '@cea/ui';
import { useAuth } from '../../lib/auth-context';

function ResetForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { resetPassword } = useAuth();
  const token = params.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 8) { setError('Password must be at least 8 characters'); return; }
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (!token) { setError('Reset link is invalid or expired.'); return; }
    setLoading(true);
    const res = await resetPassword(token, password);
    setLoading(false);
    if (res.success) setDone(true);
    else setError(res.error || 'Password reset failed');
  };

  if (done) {
    return (
      <div className="text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
        <h2 className="mt-4 text-xl font-bold">Password updated</h2>
        <p className="mt-2 text-sm text-muted-foreground">You can now sign in with your new password.</p>
        <Button className="mt-6 w-full" onClick={() => router.push('/login')}>Go to sign in</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">New password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={show ? 'text' : 'password'}
            className="pl-10 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle password visibility">
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirm">Confirm password</Label>
        <Input id="confirm" type={show ? 'text' : 'password'} value={confirm} onChange={(e) => setConfirm(e.target.value)} required />
      </div>

      {error && (
        <div className="rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-600 dark:text-red-400">{error}</div>
      )}

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Update password'}
      </Button>
      <Link href="/login" className="block text-center text-sm text-muted-foreground hover:text-foreground">Back to sign in</Link>
    </form>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center overflow-hidden px-4 py-16">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-32 right-1/4 h-96 w-96 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full max-w-md rounded-2xl border bg-card/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600">
            <KeyRound className="h-7 w-7 text-white" />
          </div>
          <h2 className="text-2xl font-bold">Choose a new password</h2>
          <p className="mt-1 text-sm text-muted-foreground">Enter a strong password for your account.</p>
        </div>
        <Suspense fallback={<div className="py-10 text-center text-sm text-muted-foreground">Loading…</div>}>
          <ResetForm />
        </Suspense>
      </motion.div>
    </div>
  );
}
