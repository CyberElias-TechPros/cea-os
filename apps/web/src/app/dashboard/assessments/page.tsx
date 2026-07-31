'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import {
  ClipboardList, Loader2, ChevronLeft, ChevronRight, CheckCircle2, XCircle,
  Timer, Send, AlertTriangle, FileQuestion,
} from 'lucide-react';

interface Enrollment { id: string; courseId: string; status: string }
interface Course { id: string; name: string; modules: Module[] }
interface Module { id: string; title: string }
interface Assessment { id: string; moduleId: string; title: string; type: string; description?: string; timeLimitMinutes?: number; passingPercentage?: number }
interface Question { id: string; question: string; questionType: string; options?: string[]; points?: number }
interface Attempt { id: string; assessmentId: string; status: string; attempt: number }

export default function AssessmentsPage() {
  const [assessments, setAssessments] = useState<{ courseName: string; assessment: Assessment }[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [attemptId, setAttemptId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; totalPoints: number; percentage: number; passed: boolean } | null>(null);
  const [qIndex, setQIndex] = useState(0);
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const enr = await api<Enrollment[]>('/v1/enrollments');
    const items: { courseName: string; assessment: Assessment }[] = [];
    if (enr.success && enr.data) {
      for (const e of enr.data) {
        const courseRes = await api<Course>(`/v1/courses/${e.courseId}`);
        if (courseRes.success && courseRes.data) {
          for (const m of courseRes.data.modules ?? []) {
            const aRes = await api<Assessment[]>(`/v1/assessments/module/${m.id}`);
            if (aRes.success && aRes.data) {
              for (const a of aRes.data) items.push({ courseName: courseRes.data.name, assessment: a });
            }
          }
        }
      }
    }
    setAssessments(items);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const start = async (a: Assessment) => {
    setBusy(true);
    const attempt = await api<Attempt>(`/v1/assessments/${a.id}/start`, { method: 'POST' });
    if (!attempt.success || !attempt.data) { setBusy(false); return; }
    const qRes = await api<{ questions: Question[] }>(`/v1/assessments/${a.id}`);
    setActive(a);
    setAttemptId(attempt.data.id);
    setQuestions(qRes.success && qRes.data ? qRes.data.questions : []);
    setAnswers({});
    setResult(null);
    setQIndex(0);
    setBusy(false);
  };

  const submit = async () => {
    if (!attemptId) return;
    setBusy(true);
    const res = await api<{ score: number; totalPoints: number; percentage: number; passed: boolean }>(`/v1/assessments/attempts/${attemptId}/submit`, {
      method: 'POST',
      body: JSON.stringify({ responses: Object.entries(answers).map(([questionId, response]) => ({ questionId, response })) }),
    });
    setBusy(false);
    if (res.success && res.data) setResult(res.data);
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (result) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border bg-card p-10 text-center">
          {result.passed ? (
            <CheckCircle2 className="h-20 w-20 text-green-500 mx-auto" />
          ) : (
            <XCircle className="h-20 w-20 text-red-500 mx-auto" />
          )}
          <h2 className="text-3xl font-bold mt-6">{result.passed ? 'Assessment passed!' : 'Assessment needs review'}</h2>
          <p className="text-muted-foreground mt-2">{active?.title}</p>
          <div className="mt-6 text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {Math.round(result.percentage)}%
          </div>
          <p className="text-sm text-muted-foreground mt-2">{result.score} / {result.totalPoints} points</p>
          <div className="mt-8">
            <Button onClick={() => { setActive(null); setResult(null); load(); }}>Back to assessments</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  if (active) {
    const q = questions[qIndex];
    return (
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold">{active.title}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              {qIndex + 1} of {questions.length} · {active.timeLimitMinutes ? `${active.timeLimitMinutes} min limit` : 'Untimed'}
            </p>
          </div>
          <Badge variant="warning" className="flex items-center gap-1"><Timer className="h-3.5 w-3.5" /> In progress</Badge>
        </div>

        <div className="mb-6 h-2 rounded-full bg-muted overflow-hidden">
          <motion.div animate={{ width: `${((qIndex + 1) / questions.length) * 100}%` }} className="h-full bg-gradient-to-r from-blue-600 to-purple-600" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={qIndex} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardContent className="p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <h2 className="text-lg font-semibold">{q?.question}</h2>
                  <Badge variant="secondary" className="shrink-0">{q?.points ?? 0} pts</Badge>
                </div>
                <div className="space-y-3">
                  {q?.options?.map((opt, i) => {
                    const selected = answers[q.id] === opt;
                    return (
                      <button
                        key={i}
                        onClick={() => q && setAnswers((a) => ({ ...a, [q.id]: opt }))}
                        className={`w-full text-left rounded-xl border px-5 py-4 transition-all ${selected ? 'border-primary bg-primary/5 ring-1 ring-primary/30' : 'hover:border-primary/40'}`}
                      >
                        <span className="flex items-center gap-3">
                          <span className={`h-6 w-6 shrink-0 rounded-full border flex items-center justify-center text-xs font-bold ${selected ? 'bg-primary border-primary text-primary-foreground' : 'text-muted-foreground'}`}>
                            {String.fromCharCode(65 + i)}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <Button variant="outline" onClick={() => setQIndex((i) => Math.max(0, i - 1))} disabled={qIndex === 0}>
            <ChevronLeft className="mr-1 h-4 w-4" /> Previous
          </Button>
          {qIndex < questions.length - 1 ? (
            <Button onClick={() => setQIndex((i) => i + 1)}>Next <ChevronRight className="ml-1 h-4 w-4" /></Button>
          ) : (
            <Button onClick={submit} disabled={busy} className="group">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-1 h-4 w-4" /> Submit</>}
            </Button>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 justify-center">
          {questions.map((question, i) => {
            const answered = answers[question.id] !== undefined;
            return (
              <button
                key={question.id}
                onClick={() => setQIndex(i)}
                className={`h-9 w-9 rounded-lg border text-sm font-medium transition-all ${i === qIndex ? 'bg-primary border-primary text-primary-foreground' : answered ? 'bg-green-100 border-green-300 text-green-700 dark:bg-green-900/40 dark:text-green-400' : 'text-muted-foreground hover:border-primary/50'}`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Assessments</h1>
        <p className="text-muted-foreground mt-1">Upcoming exams, quizzes, and past results for your enrolled courses.</p>
      </div>

      {assessments.length === 0 ? (
        <Card>
          <CardContent className="p-14 text-center">
            <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="mt-4 text-muted-foreground">No assessments yet. Enroll in a course to see its quizzes and exams.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {assessments.map(({ courseName, assessment }, i) => (
            <motion.div key={assessment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shrink-0">
                      <ClipboardList className="h-5 w-5 text-white" />
                    </div>
                    <Badge variant={assessment.type === 'exam' ? 'warning' : 'info'}>{assessment.type}</Badge>
                  </div>
                  <h3 className="font-semibold mt-4">{assessment.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{courseName}</p>
                  {assessment.description && <p className="text-sm text-muted-foreground mt-2 flex-1">{assessment.description}</p>}
                  <Button className="mt-4 w-full" onClick={() => start(assessment)} disabled={busy}>
                    {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Start assessment'}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
