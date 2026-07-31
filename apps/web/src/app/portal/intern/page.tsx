'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Button, Badge, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { Loader2, LaptopMinimal, Plus, Clock, CheckCircle2 } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';

interface Task { id: string; title: string; description?: string; dueDate?: string; status: string; }
interface Timesheet { id: string; date: string; hours: number; description?: string; status: string; }

export default function InternPortal() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [timesheets, setTimesheets] = useState<Timesheet[]>([]);
  const [approvedHours, setApprovedHours] = useState(0);
  const [pendingHours, setPendingHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showTask, setShowTask] = useState(false);
  const [showTs, setShowTs] = useState(false);
  const [taskForm, setTaskForm] = useState({ title: '', description: '', dueDate: '' });
  const [tsForm, setTsForm] = useState({ date: '', hours: '', description: '' });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<{ tasks: Task[]; timesheets: Timesheet[]; approvedHours: number; pendingHours: number }>('/v1/platform/portals/intern');
    if (res.success && res.data) {
      setTasks(res.data.tasks);
      setTimesheets(res.data.timesheets);
      setApprovedHours(res.data.approvedHours);
      setPendingHours(res.data.pendingHours);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const createTask = async () => {
    await api('/v1/platform/portals/intern/tasks', { method: 'POST', body: JSON.stringify(taskForm) });
    setShowTask(false);
    setTaskForm({ title: '', description: '', dueDate: '' });
    await load();
  };

  const setTaskStatus = async (id: string, status: string) => {
    await api(`/v1/platform/portals/intern/tasks/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  const submitTs = async () => {
    await api('/v1/platform/portals/intern/timesheets', { method: 'POST', body: JSON.stringify({ ...tsForm, hours: Number(tsForm.hours) }) });
    setShowTs(false);
    setTsForm({ date: '', hours: '', description: '' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Intern Portal</Badge>
          <h1 className="text-3xl font-bold">Intern Workspace</h1>
          <p className="text-muted-foreground mt-1">Track tasks and submit your timesheets.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowTask(true)}><Plus className="h-4 w-4 mr-2" /> New task</Button>
          <Button onClick={() => setShowTs(true)}><Clock className="h-4 w-4 mr-2" /> Submit timesheet</Button>
          <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Approved hours</div><p className="text-2xl font-bold text-emerald-600">{approvedHours}h</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Pending hours</div><p className="text-2xl font-bold text-amber-600">{pendingHours}h</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Open tasks</div><p className="text-2xl font-bold">{tasks.filter(t => t.status !== 'done').length}</p></CardContent></Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><LaptopMinimal className="h-5 w-5 text-emerald-500" /> My tasks ({tasks.length})</h2>
          {tasks.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground">No tasks yet.</CardContent></Card> : tasks.map(t => (
            <Card key={t.id}><CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{t.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{t.description}{t.dueDate ? ` · due ${new Date(t.dueDate).toLocaleDateString('en-ZA')}` : ''}</p>
                </div>
                <select className="rounded-md border border-input bg-background px-2 py-1 text-xs" value={t.status} onChange={e => setTaskStatus(t.id, e.target.value)}>
                  <option value="todo">todo</option><option value="in_progress">in progress</option><option value="review">review</option><option value="done">done</option>
                </select>
              </div>
              {t.status === 'done' && <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Completed</p>}
            </CardContent></Card>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Clock className="h-5 w-5 text-blue-500" /> Timesheets ({timesheets.length})</h2>
          {timesheets.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground">No timesheets submitted.</CardContent></Card> : timesheets.map(ts => (
            <Card key={ts.id}><CardContent className="flex items-center justify-between py-3">
              <div><p className="text-sm font-medium">{new Date(ts.date).toLocaleDateString('en-ZA')} — {ts.hours}h</p>{ts.description && <p className="text-xs text-muted-foreground">{ts.description}</p>}</div>
              <Badge variant={ts.status === 'approved' ? 'default' : ts.status === 'rejected' ? 'destructive' : 'secondary'}>{ts.status}</Badge>
            </CardContent></Card>
          ))}
        </div>
      </div>

      <Dialog open={showTask} onOpenChange={setShowTask}>
        <DialogContent><DialogHeader><DialogTitle>New Task</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={taskForm.title} onChange={e => setTaskForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={taskForm.description} onChange={e => setTaskForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div><label className="text-sm font-medium">Due date</label><Input type="date" value={taskForm.dueDate} onChange={e => setTaskForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowTask(false)}>Cancel</Button><Button onClick={createTask}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTs} onOpenChange={setShowTs}>
        <DialogContent><DialogHeader><DialogTitle>Submit Timesheet</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Date *</label><Input type="date" value={tsForm.date} onChange={e => setTsForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Hours *</label><Input type="number" step="0.5" value={tsForm.hours} onChange={e => setTsForm(f => ({ ...f, hours: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={tsForm.description} onChange={e => setTsForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowTs(false)}>Cancel</Button><Button onClick={submitTs}>Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
