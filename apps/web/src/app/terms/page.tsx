'use client';

import { motion } from 'motion/react';
import { FileText, Scale, Shield, CreditCard, Copyright, RefreshCw, Gavel, AlertTriangle } from 'lucide-react';

const sections = [
  { icon: Scale, title: '1. Acceptance of Terms', body: 'By creating an account or using any part of the Cyber Elias Academy platform ("the Service"), you agree to be bound by these Terms of Service. If you do not agree, please do not use the Service.' },
  { icon: Shield, title: '2. Accounts', body: 'You are responsible for maintaining the confidentiality of your credentials and for all activity under your account. You must be at least 13 years old to use the Service, and provide accurate registration information.' },
  { icon: CreditCard, title: '3. Payments & Refunds', body: 'Course purchases are one-time or subscription-based as displayed at checkout. We offer a 7-day money-back guarantee on single-course purchases. Subscription plans auto-renew until cancelled; you may cancel anytime from your dashboard.' },
  { icon: Copyright, title: '4. Intellectual Property', body: 'All course content, software, design, and materials on the platform are the property of Cyber Elias Academy or its licensors. You may not copy, resell, redistribute, or create derivative works from any content without written permission.' },
  { icon: RefreshCw, title: '5. Acceptable Use', body: 'You agree not to misuse the Service: no unauthorized access, scraping, account sharing abuse, cheating on assessments, uploading harmful content, or any activity that disrupts the platform for other users.' },
  { icon: Gavel, title: '6. Termination', body: 'We may suspend or terminate accounts that violate these terms, including fraudulent transactions or abusive behavior. You may close your account at any time from the profile settings.' },
  { icon: AlertTriangle, title: '7. Disclaimers', body: 'The Service is provided "as is" without warranties of any kind. While we strive for accuracy, we do not guarantee specific learning outcomes, employment, or income results from course completion.' },
  { icon: FileText, title: '8. Changes to These Terms', body: 'We may update these terms from time to time. Material changes will be announced via email or in-app notification. Continued use of the Service after changes constitutes acceptance.' },
];

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>
      <section className="container mx-auto px-4 py-20 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="mx-auto mb-6 h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <Scale className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">Last updated: July 2026</p>
        </motion.div>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-2xl border bg-card p-6">
              <div className="flex items-start gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <s.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
          Questions about these terms? <a href="/contact" className="text-primary hover:underline">Contact us</a>.
        </motion.p>
      </section>
    </div>
  );
}
