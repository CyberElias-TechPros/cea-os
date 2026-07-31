'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Textarea } from '@cea/ui';
import { api } from '../../../lib/api-client';
import {
  FileText, Loader2, Send, Link2, Github, CalendarDays, CheckCircle2, Clock3, NotebookPen,
} from 'lucide-react';

interface Enrollment { id: string; courseId: string }
interface Course { id: string; name: string; modules: Module[] }
interface Module { id: string; title: string }
interface Assignment { id: string; moduleId: string; title: string; description?: string; dueDate?: string; maxPoints?: number }

export default function AssignmentsPage() {
  const [items, setItems] = useState<{ courseName: string; moduleTitle: string; assignment: Assignment }[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState<Assignment | null>(null);
  const [form, setForm] = useState({ textEntry: '', url: '', codeRepoUrl: '' });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const enr = await api<Enrollment[]>('/v1/enrollments');
    const list: { courseName: string; moduleTitle: string; assignment: Assignment }[] = [];
    if (enr.success && enr.data) {
      for (const e of enr.data) {
        const courseRes = await api<Course>(`/v1/courses/${e.courseId}`);
        if (courseRes.success && courseRes.data) {
          for (const m of courseRes.data.modules ?? []) {
            const aRes = await api<Assignment[]>(`/v1/assignments/module/${m.id}`);
            if (aRes.success && aRes.data) {
              for (const a of aRes.data) list.push({ courseName: courseRes.data.name, moduleTitle: m.title, assignment: a });
            }
          }
        }
      }
    }
    setItems(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const submit = async () => {
    if (!open) return;
    setSending(true);
    const res = await api(`/v1/assignments/${open.id}/submit`, { method: 'POST', body: JSON.stringify(form) });
    setSending(false);
    if (res.success) {
      setDone(true);
      await load();
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (open) {
    return (
      <div className="max-w-2xl mx-auto">
        <Button variant="ghost" size="sm" className="mb-4" onClick={() => { setOpen(null); setDone(false); setForm({ textEntry: '', url: '', codeRepoUrl: '' }); }}>
          ← Back to assignments
        </Button>
        {done ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="rounded-3xl border bg-card p-10 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold mt-4">Assignment submitted!</h2>
            <p className="text-muted-foreground mt-2">Your submission has been recorded. Your instructor will grade it soon.</p>
            <Button className="mt-6" onClick={() => { setOpen(null); setDone(false); }}>Done</Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <h1 className="text-2xl font-bold">{open.title}</h1>
                  <p className="text-sm text-muted-foreground mt-1">{open.description || 'Complete this assignment and submit before the deadline.'}</p>
                  {open.dueDate && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
                      <CalendarDays className="h-4 w-4" /> Due: {new Date(open.dueDate).toLocaleString()}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm font-medium"><NotebookPen className="h-4 w-4" /> Your answer</div>
                  <Textarea rows={6} placeholder="Write your solution or notes here…" value={form.textEntry} onChange={(e) => setForm({ ...form, textEntry: e.target.value })} />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium"><Link2 className="h-4 w-4" /> File/document URL</div>
                    <input
                      value={form.url}
                      onChange={(e) => setForm({ ...form, url: e.target.value })}
                      placeholder="https://…"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm font-medium"><Github className="h-4 w-4" /> Code repository</div>
                    <input
                      value={form.codeRepoUrl}
                      onChange={(e) => setForm({ ...form, codeRepoUrl: e.target.value })}
                      placeholder="https://github.com/…"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={submit} disabled={sending || (!form.textEntry && !form.url && !form.codeRepoUrl)}>
                  {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Submit assignment</>}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
        <p className="text-muted-foreground mt-1">Submit your work and track deadlines across all courses.</p>
      </div>

      {items.length === 0 ? (
        <Card><CardContent className="p-14 text-center">
          <FileText className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">No assignments yet. Check back when your instructor posts one.</p>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {items.map(({ courseName, moduleTitle, assignment }, i) => (
            <motion.div key={assignment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="flex items-start justify-between gap-3">
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-white" />
                    </div>
                    {assignment.dueDate && (
                      <Badge variant={new Date(assignment.dueDate) > new Date() ? 'info' : 'destructive'} className="flex items-center gap-1">
                        <Clock3 className="h-3 w-3" />
                        {new Date(assignment.dueDate).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-semibold mt-4">{assignment.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{courseName} · {moduleTitle}</p>
                  <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{assignment.description}</p>
                  <Button className="mt-4 w-full" onClick={() => { setOpen(assignment); setDone(false); }}>Submit work</Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
