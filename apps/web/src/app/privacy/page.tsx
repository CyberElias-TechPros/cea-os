'use client';

import { motion } from 'motion/react';
import { Lock, Eye, Database, Cookie, UserCheck, MailCheck, Trash2 } from 'lucide-react';

const sections = [
  { icon: UserCheck, title: '1. What We Collect', body: 'We collect the information you provide when registering: name, email, phone number, and optional profile details. We also collect usage data such as courses viewed, progress, and assessment results to improve your learning experience.' },
  { icon: Lock, title: '2. How We Use It', body: 'Your data is used to deliver the Service: manage your account, process enrollments and payments, track learning progress, send notifications and receipts, and personalize course recommendations.' },
  { icon: Database, title: '3. Data Storage & Security', body: 'Your data is stored on encrypted cloud infrastructure. Passwords are hashed and never stored in plain text. Access to production data is restricted to authorized personnel only.' },
  { icon: Cookie, title: '4. Cookies & Tracking', body: 'We use essential cookies for authentication and session management. Analytics cookies help us understand platform usage. You can disable non-essential cookies in your browser settings.' },
  { icon: Eye, title: '5. Sharing Your Data', body: 'We never sell your personal data. We share data only with trusted service providers (payment processors, email delivery, hosting) under strict data-processing agreements, and when legally required.' },
  { icon: MailCheck, title: '6. Your Rights', body: 'You may access, correct, export, or delete your personal data at any time from your profile settings, or by contacting privacy@cea.academy. We respond to all requests within 30 days.' },
  { icon: Trash2, title: '7. Data Retention', body: 'We retain account data for as long as your account is active. After account deletion, data is removed within 30 days, except where retention is legally required.' },
];

export default function PrivacyPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-[400px] w-[400px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
            <Lock className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">Last updated: July 2026</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <h2 className="font-semibold">{s.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-10 text-sm text-muted-foreground text-center">
          Privacy questions? Email <a href="mailto:privacy@cea.academy" className="text-primary hover:underline">privacy@cea.academy</a>.
        </motion.p>
      </section>
    </div>
  );
}
