'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Input } from '@cea/ui';
import { api } from '../../lib/api-client';
import { ShieldCheck, Search, Loader2, BadgeCheck, XCircle, Award, CalendarDays, FileDigit } from 'lucide-react';

interface VerifyResult {
  verified: boolean;
  certificateNumber: string;
  recipientName: string;
  courseName: string;
  issuedAt?: string;
}

export default function VerifyPage() {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    const res = await api<VerifyResult>(`/v1/certificates/verify/${encodeURIComponent(code.trim())}`);
    setLoading(false);
    if (res.success && res.data) setResult(res.data);
    else setError(res.error?.message || 'Certificate not found');
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-20 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 flex items-center justify-center">
            <ShieldCheck className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Certificate <span className="bg-gradient-to-r from-green-600 to-emerald-500 bg-clip-text text-transparent">verification</span></h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Verify the authenticity of a Cyber Elias Academy certificate. Employers can confirm credentials in seconds.
          </p>
        </motion.div>

        <motion.form
          onSubmit={verify}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex gap-3"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Enter verification code (e.g. CERT-…)"
              className="pl-12 py-6 text-base rounded-2xl font-mono"
              required
            />
          </div>
          <Button type="submit" size="lg" className="rounded-2xl" disabled={loading}>
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : 'Verify'}
          </Button>
        </motion.form>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-6 rounded-2xl border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 p-6 flex items-start gap-4"
            >
              <XCircle className="h-8 w-8 text-red-500 shrink-0" />
              <div>
                <div className="font-semibold text-red-700 dark:text-red-400">Certificate not verified</div>
                <p className="text-sm text-muted-foreground mt-1">We could not find a certificate matching that code. Double-check the code and try again.</p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 rounded-3xl border-2 border-green-500/40 bg-gradient-to-br from-green-50 via-white to-emerald-50 dark:from-green-950/40 dark:via-background dark:to-emerald-950/40 p-8 text-center"
            >
              <div className="mx-auto h-20 w-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
                <BadgeCheck className="h-12 w-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="mt-4 text-2xl font-bold text-green-700 dark:text-green-400">Verified</div>
              <p className="text-sm text-muted-foreground mt-1">This certificate is authentic and issued by Cyber Elias Academy.</p>
              <div className="mt-6 grid grid-cols-2 gap-4 text-left">
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Award className="h-3.5 w-3.5" /> Recipient</div>
                  <div className="font-semibold mt-1">{result.recipientName}</div>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><Award className="h-3.5 w-3.5" /> Course</div>
                  <div className="font-semibold mt-1">{result.courseName}</div>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><CalendarDays className="h-3.5 w-3.5" /> Issued</div>
                  <div className="font-semibold mt-1">{result.issuedAt ? new Date(result.issuedAt).toLocaleDateString() : '—'}</div>
                </div>
                <div className="rounded-xl border bg-background p-4">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground"><FileDigit className="h-3.5 w-3.5" /> Certificate No.</div>
                  <div className="font-mono text-xs font-semibold mt-1 break-all">{result.certificateNumber}</div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
