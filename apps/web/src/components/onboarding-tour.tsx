'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@cea/ui';
import { Sparkles, X, ArrowRight, ClipboardList, Award, Handshake, FileDown, UserCircle } from 'lucide-react';

const STEPS = [
  {
    title: 'Welcome to CEA-OS',
    body: 'Your dashboard brings learning, careers and community into one place. Let\'s take a quick tour.',
    icon: <Sparkles className="h-5 w-5" />,
  },
  {
    title: 'Test your knowledge',
    body: 'Complete assessments for each module — quizzes and exams are scored automatically with instant feedback.',
    href: '/dashboard/assessments',
    cta: 'Open assessments',
    icon: <ClipboardList className="h-5 w-5" />,
  },
  {
    title: 'Earn verified certificates',
    body: 'Finish a course to earn a blockchain-verifiable certificate employers can check in seconds.',
    href: '/dashboard/certificates',
    cta: 'View certificates',
    icon: <Award className="h-5 w-5" />,
  },
  {
    title: 'Get a mentor',
    body: 'Request a mentorship session with an industry professional who has walked your path.',
    href: '/dashboard/mentorship',
    cta: 'Find a mentor',
    icon: <Handshake className="h-5 w-5" />,
  },
  {
    title: 'Land your first job',
    body: 'Generate a print-ready CV from your portfolio and apply to jobs in the marketplace.',
    href: '/dashboard/cv',
    cta: 'Generate CV',
    icon: <FileDown className="h-5 w-5" />,
  },
  {
    title: 'You\'re all set!',
    body: 'Press Cmd/Ctrl+K anytime to jump anywhere. Complete your profile to get the most out of CEA.',
    href: '/dashboard/profile',
    cta: 'Complete profile',
    icon: <UserCircle className="h-5 w-5" />,
  },
];

const STORAGE_KEY = 'cea-onboarding-done-v1';

export function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  if (!visible) return null;

  const current = STEPS[step]!;
  const isLast = step === STEPS.length - 1;

  const dismiss = () => {
    setVisible(false);
    try { localStorage.setItem(STORAGE_KEY, '1'); } catch { /* ignore */ }
  };

  const next = () => {
    if (isLast) { dismiss(); return; }
    setStep(s => s + 1);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className="mb-8 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
        <button onClick={dismiss} className="absolute top-4 right-4 rounded-full p-1.5 hover:bg-muted transition-colors" aria-label="Dismiss tour">
          <X className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-primary mb-4">
          {current.icon}
          Welcome tour · {step + 1}/{STEPS.length}
        </div>
        <h2 className="text-xl font-bold md:text-2xl">{current.title}</h2>
        <p className="text-muted-foreground mt-2 max-w-2xl">{current.body}</p>

        <div className="flex flex-wrap items-center gap-3 mt-6">
          {current.href ? (
            <a href={current.href}>
              <Button size="sm" onClick={dismiss}>
                {current.cta} <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </a>
          ) : (
            <Button size="sm" onClick={next}>
              {isLast ? 'Get started' : 'Start tour'} <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          )}
          {!isLast && (
            <Button size="sm" variant="outline" onClick={next}>Skip</Button>
          )}
          {isLast && (
            <Button size="sm" variant="outline" onClick={dismiss}>Finish</Button>
          )}
        </div>

        <div className="flex gap-1.5 mt-6">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-1.5 rounded-full transition-all ${i === step ? 'w-8 bg-primary' : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50'}`}
              aria-label={`Go to step ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
