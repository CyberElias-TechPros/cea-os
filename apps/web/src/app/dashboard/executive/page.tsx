'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, Tabs, TabsContent, TabsList, TabsTrigger, Separator } from '@cea/ui';
import { Loader2, TrendingUp, Users, BookOpenCheck, GraduationCap, Wallet, TicketCheck, AlertTriangle, Target, Plus, CheckCircle2, UserCheck } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Kpis { students: number; activeEnrollments: number; avgGrade: number | null; passRate: number | null; attendanceRate: number | null; courseCompletions: number; newEnrollmentsThisMonth: number; revenue: number; expenses: number; netIncome: number; invoicedAndPaid: number; openTickets: number; totalTickets: number; pendingApplications: number; staffTotal: number; staffActive: number; atRisk: { userId: string; riskScore: number; factors: string[] }[]; }
interface Okr { id: string; title: string; objective?: string; period: string; metric?: string; target?: number; current?: number; status: string; notes?: string; }
interface ApprovalItem { id: string; kind: string; title: string; detail: string; amount?: number; createdAt: string; }

const fmtMoney = (n?: number) => `${(n ?? 0).toLocaleString('en-ZA')} ZAR`;
const OKR_STATUSES = ['draft', 'on_track', 'at_risk', 'behind', 'completed'] as const;

export default function ExecutivePage() {
  const [kpis, setKpis] = useState<Kpis | null>(null);
  const [okrs, setOkrs] = useState<Okr[]>([]);
  const [approvals, setApprovals] = useState<ApprovalItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOkrForm, setShowOkrForm] = useState(false);
  const [okrForm, setOkrForm] = useState({ title: '', objective: '', period: '', metric: '', target: '', current: '', status: 'draft' });

  const load = async () => {
    setLoading(true);
    const [kpiRes, okrRes, expRes, leaveRes] = await Promise.all([
      api<Kpis>('/v1/platform/executive/kpis'),
      api<Okr[]>('/v1/platform/okrs'),
      api<ApprovalItem[]>('/v1/finance/expenses'),
      api<ApprovalItem[]>('/v1/hr/leave'),
    ]);
    if (kpiRes.success && kpiRes.data) setKpis(kpiRes.data);
    if (okrRes.success && okrRes.data) setOkrs(okrRes.data);
    const pending: ApprovalItem[] = [];
    if (expRes.success && expRes.data) expRes.data.filter((e: any) => e.status === 'pending').forEach((e: any) => pending.push({ id: e.id, kind: 'expense', title: e.title ?? 'Expense claim', detail: `${e.category ?? ''} · ${e.currency ?? 'ZAR'} ${e.amount}`, amount: e.amount, createdAt: e.createdAt }));
    if (leaveRes.success && leaveRes.data) leaveRes.data.filter((l: any) => l.status === 'pending').forEach((l: any) => pending.push({ id: l.id, kind: 'leave', title: `${l.type} leave`, detail: `${l.startDate} → ${l.endDate} (${l.days} days)`, createdAt: l.createdAt }));
    setApprovals(pending);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const decideApproval = async (item: ApprovalItem, approved: boolean) => {
    if (item.kind === 'expense') await api(`/v1/finance/expenses/${item.id}/approve`, { method: 'POST', body: JSON.stringify({ approved }) });
    if (item.kind === 'leave') await api(`/v1/hr/leave/${item.id}/decide`, { method: 'POST', body: JSON.stringify({ approved }) });
    await load();
  };

  const createOkr = async () => {
    await api('/v1/platform/okrs', { method: 'POST', body: JSON.stringify({ ...okrForm, target: okrForm.target ? Number(okrForm.target) : undefined, current: okrForm.current ? Number(okrForm.current) : undefined }) });
    setShowOkrForm(false);
    setOkrForm({ title: '', objective: '', period: '', metric: '', target: '', current: '', status: 'draft' });
    await load();
  };

  const updateOkr = async (id: string, body: Partial<Okr>) => {
    await api(`/v1/platform/okrs/${id}`, { method: 'PATCH', body: JSON.stringify(body) });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const progress = (o: Okr) => o.target && o.target > 0 ? Math.min(100, Math.round(((o.current ?? 0) / o.target) * 100)) : 0;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Executive Command Center</h1><p className="text-muted-foreground mt-1">Institution health, OKRs, and approval queue.</p></div>
      </div>

      <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><Users className="h-4 w-4 text-blue-500" /><span className="text-xs text-muted-foreground">Students</span></div><p className="text-2xl font-bold mt-1">{kpis?.students ?? 0}</p><p className="text-xs text-muted-foreground">+{kpis?.newEnrollmentsThisMonth ?? 0} this month</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><BookOpenCheck className="h-4 w-4 text-sky-500" /><span className="text-xs text-muted-foreground">Active enrollments</span></div><p className="text-2xl font-bold mt-1">{kpis?.activeEnrollments ?? 0}</p><p className="text-xs text-muted-foreground">{kpis?.courseCompletions ?? 0} completions</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-violet-500" /><span className="text-xs text-muted-foreground">Avg grade</span></div><p className="text-2xl font-bold mt-1">{kpis?.avgGrade != null ? `${Math.round(kpis.avgGrade)}%` : '—'}</p><p className="text-xs text-muted-foreground">{kpis?.passRate ?? '—'}% pass rate</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><UserCheck className="h-4 w-4 text-green-500" /><span className="text-xs text-muted-foreground">Attendance</span></div><p className="text-2xl font-bold mt-1">{kpis?.attendanceRate ?? '—'}%</p><p className="text-xs text-muted-foreground">{kpis?.staffActive ?? 0}/{kpis?.staffTotal ?? 0} staff active</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><Wallet className="h-4 w-4 text-emerald-500" /><span className="text-xs text-muted-foreground">Net income</span></div><p className="text-2xl font-bold mt-1 text-emerald-600">{fmtMoney(kpis?.netIncome)}</p><p className="text-xs text-muted-foreground">Rev {fmtMoney(kpis?.revenue)}</p></CardContent></Card>
        <Card><CardContent className="p-5"><div className="flex items-center gap-2"><TicketCheck className="h-4 w-4 text-rose-500" /><span className="text-xs text-muted-foreground">Support</span></div><p className="text-2xl font-bold mt-1">{kpis?.openTickets ?? 0}</p><p className="text-xs text-muted-foreground">open of {kpis?.totalTickets ?? 0}</p></CardContent></Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2"><Target className="h-5 w-5 text-orange-500" /> OKRs</h2>
            <Button size="sm" onClick={() => setShowOkrForm(true)}><Plus className="h-4 w-4 mr-1" /> New OKR</Button>
          </div>
          {okrs.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground text-sm">No OKRs yet. Add quarterly objectives to track institutional goals.</CardContent></Card>
          ) : okrs.map(o => (
            <Card key={o.id}><CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{o.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{o.period}{o.metric ? ` · ${o.metric}` : ''}</p>
                </div>
                <select className="rounded-md border border-input bg-background px-2 py-1 text-xs" value={o.status} onChange={e => updateOkr(o.id, { status: e.target.value })}>
                  {OKR_STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                </select>
              </div>
              {o.target != null && (
                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1"><span>{o.current ?? 0} / {o.target}</span><span>{progress(o)}%</span></div>
                  <div className="h-2 rounded-full bg-muted"><div className={`h-2 rounded-full ${o.status === 'completed' ? 'bg-green-500' : o.status === 'at_risk' || o.status === 'behind' ? 'bg-red-500' : 'bg-primary'}`} style={{ width: `${progress(o)}%` }} /></div>
                </div>
              )}
              {o.objective && <p className="text-sm text-muted-foreground mt-2">{o.objective}</p>}
            </CardContent></Card>
          ))}
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-emerald-500" /> Approvals ({approvals.length})</h2>
          {approvals.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-muted-foreground text-sm">Queue clear — nothing waiting on approval.</CardContent></Card>
          ) : approvals.map(a => (
            <Card key={`${a.kind}-${a.id}`}><CardContent className="p-4">
              <Badge variant="outline" className="mb-2 capitalize">{a.kind}</Badge>
              <p className="font-medium text-sm">{a.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{a.detail}</p>
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={() => decideApproval(a, true)}>Approve</Button>
                <Button size="sm" variant="outline" className="text-destructive" onClick={() => decideApproval(a, false)}>Reject</Button>
              </div>
            </CardContent></Card>
          ))}
        </div>
      </div>

      {kpis && kpis.atRisk.length > 0 && (
        <Card className="border-red-200">
          <CardHeader><CardTitle className="flex items-center gap-2 text-red-600"><AlertTriangle className="h-5 w-5" /> At-risk students (AI prediction)</CardTitle><CardDescription>Risk factors from gradebook and attendance signals.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
            {kpis.atRisk.map((s, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                <div><p className="text-sm font-medium">Risk score {s.riskScore}/100</p><p className="text-xs text-muted-foreground">{s.factors.join(' · ')}</p></div>
                <Badge variant={s.riskScore > 60 ? 'destructive' : 'secondary'}>student {s.userId.slice(0, 6)}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      <Dialog open={showOkrForm} onOpenChange={setShowOkrForm}>
        <DialogContent><DialogHeader><DialogTitle>New OKR</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={okrForm.title} onChange={e => setOkrForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Reach 500 active enrollments" /></div>
            <div><label className="text-sm font-medium">Period</label><Input value={okrForm.period} onChange={e => setOkrForm(f => ({ ...f, period: e.target.value }))} placeholder="Q3 2026" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Metric</label><Input value={okrForm.metric} onChange={e => setOkrForm(f => ({ ...f, metric: e.target.value }))} placeholder="enrollments" /></div>
              <div><label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={okrForm.status} onChange={e => setOkrForm(f => ({ ...f, status: e.target.value }))}>
                  {OKR_STATUSES.map(s => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Target</label><Input type="number" value={okrForm.target} onChange={e => setOkrForm(f => ({ ...f, target: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Current</label><Input type="number" value={okrForm.current} onChange={e => setOkrForm(f => ({ ...f, current: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Objective</label><Textarea value={okrForm.objective} onChange={e => setOkrForm(f => ({ ...f, objective: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowOkrForm(false)}>Cancel</Button><Button onClick={createOkr}>Create OKR</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
