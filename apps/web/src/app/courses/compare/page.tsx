'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { ArrowLeft, Check, Minus, X, SlidersHorizontal } from 'lucide-react';

const allCourses = [
  { slug: 'full-stack-web-development', title: 'Full-Stack Web Development', category: 'Software Dev', duration: '12 weeks', students: 120, level: 'Beginner to Advanced', price: 45000, features: ['HTML/CSS/JS', 'React + Node.js', 'Databases', 'Production projects', 'Portfolio review'] },
  { slug: 'python-data-science', title: 'Python for Data Science', category: 'Data Science', duration: '10 weeks', students: 85, level: 'Beginner', price: 38000, features: ['Python fundamentals', 'pandas & NumPy', 'Matplotlib', 'ML basics', 'Kaggle projects'] },
  { slug: 'cybersecurity-essentials', title: 'Cyber Security Essentials', category: 'Cyber Security', duration: '14 weeks', students: 95, level: 'Intermediate', price: 52000, features: ['Network security', 'Ethical hacking', 'Incident response', 'Security labs', 'Compliance'] },
  { slug: 'digital-marketing-strategy', title: 'Digital Marketing Strategy', category: 'Marketing', duration: '8 weeks', students: 110, level: 'Beginner', price: 30000, features: ['SEO & SEM', 'Social media', 'Content strategy', 'Analytics', 'Campaign builds'] },
  { slug: 'cloud-devops', title: 'Cloud & DevOps Engineering', category: 'Cloud', duration: '12 weeks', students: 60, level: 'Intermediate', price: 48000, features: ['AWS', 'Docker', 'Kubernetes', 'CI/CD pipelines', 'IaC'] },
  { slug: 'ai-machine-learning', title: 'AI & Machine Learning', category: 'AI', duration: '16 weeks', students: 70, level: 'Advanced', price: 65000, features: ['Deep learning', 'NLP', 'Computer vision', 'TensorFlow/PyTorch', 'Model deployment'] },
  { slug: 'ui-ux-design', title: 'UI/UX Design', category: 'Design', duration: '8 weeks', students: 90, level: 'Beginner', price: 35000, features: ['User research', 'Wireframing', 'Prototyping', 'Design systems', 'Figma mastery'] },
  { slug: 'mobile-app-development', title: 'Mobile App Development', category: 'Software Dev', duration: '12 weeks', students: 55, level: 'Intermediate', price: 47000, features: ['React Native', 'Flutter', 'App store publishing', 'APIs', 'Portfolio apps'] },
];

const columns = ['duration', 'level', 'price', 'students', 'features'] as const;

export default function ComparePage() {
  const [selected, setSelected] = useState<string[]>(['full-stack-web-development', 'cybersecurity-essentials']);
  const [showPicker, setShowPicker] = useState(false);

  const courses = allCourses.filter((c) => selected.includes(c.slug));
  const available = allCourses.filter((c) => !selected.includes(c.slug));
  const allFeatures = [...new Set(courses.flatMap((c) => c.features))];

  const toggle = (slug: string) => {
    setSelected((s) => {
      if (s.includes(slug)) return s.filter((x) => x !== slug);
      if (s.length >= 4) return s;
      return [...s, slug];
    });
  };

  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[400px] w-[700px] rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <section className="container mx-auto px-4 py-16 max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft className="h-4 w-4" /> Back to courses
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">Compare <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">programs</span></h1>
              <p className="mt-3 text-muted-foreground">Side-by-side comparison. Select up to 4 programs.</p>
            </div>
            <Button variant="outline" onClick={() => setShowPicker(!showPicker)}>
              <SlidersHorizontal className="mr-2 h-4 w-4" /> {selected.length}/4 selected
            </Button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showPicker && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="mb-8 rounded-2xl border bg-card p-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {allCourses.map((c) => {
                  const on = selected.includes(c.slug);
                  const full = selected.length >= 4 && !on;
                  return (
                    <button
                      key={c.slug}
                      onClick={() => toggle(c.slug)}
                      disabled={full}
                      className={`text-left rounded-xl border px-4 py-3 text-sm transition-all ${on ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : full ? 'opacity-40 cursor-not-allowed' : 'hover:border-primary/40'}`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-medium">{c.title}</span>
                        {on && <Check className="h-4 w-4 text-primary shrink-0" />}
                      </div>
                      <span className="text-xs text-muted-foreground">{c.category} · {c.duration}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {courses.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-muted-foreground">Select programs above to start comparing.</p>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="overflow-x-auto rounded-3xl border bg-card/60 backdrop-blur">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-4 text-left text-muted-foreground font-medium w-40">Program</th>
                  {courses.map((c) => (
                    <th key={c.slug} className="p-4 text-left">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold">{c.title}</div>
                          <Badge variant="secondary" className="mt-1">{c.category}</Badge>
                        </div>
                        <button onClick={() => toggle(c.slug)} className="text-muted-foreground hover:text-red-500 transition-colors" aria-label={`Remove ${c.title}`}>
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-4 font-medium text-muted-foreground">Duration</td>
                  {courses.map((c) => <td key={c.slug} className="p-4 font-semibold">{c.duration}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-muted-foreground">Level</td>
                  {courses.map((c) => <td key={c.slug} className="p-4">{c.level}</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-muted-foreground">Students enrolled</td>
                  {courses.map((c) => <td key={c.slug} className="p-4">{c.students}+</td>)}
                </tr>
                <tr className="border-b">
                  <td className="p-4 font-medium text-muted-foreground">Tuition</td>
                  {courses.map((c) => (
                    <td key={c.slug} className="p-4">
                      <span className="text-lg font-bold">₦{c.price.toLocaleString()}</span>
                      <span className="block text-xs text-muted-foreground">per course</span>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td className="p-4 font-medium text-muted-foreground align-top">Features</td>
                  {courses.map((c) => (
                    <td key={c.slug} className="p-4 align-top">
                      <ul className="space-y-2">
                        {allFeatures.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-xs">
                            {c.features.includes(f) ? <Check className="h-3.5 w-3.5 text-green-500 shrink-0" /> : <Minus className="h-3.5 w-3.5 text-muted-foreground/50 shrink-0" />}
                            <span className={c.features.includes(f) ? '' : 'text-muted-foreground/60'}>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </td>
                  ))}
                </tr>
                <tr>
                  <td />
                  {courses.map((c) => (
                    <td key={c.slug} className="p-4">
                      <Link href={`/courses/${c.slug}`}><Button className="w-full" size="sm">View course</Button></Link>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </section>
    </div>
  );
}
