'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Separator, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, Wallet, Banknote, CheckCircle2, Receipt, UserCheck } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface PayrollRun { id: string; period: string; status: string; grossTotal?: number; netTotal?: number; payslipCount?: number; approvedAt?: string; paidAt?: string; }
interface PayslipRow { id: string; basicPay?: number; allowances?: number; deductions?: number; grossPay?: number; netPay?: number; status: string; paidAt?: string; employeeCode?: string; position?: string; firstName?: string; lastName?: string; email?: string; period?: string; runStatus?: string; runId?: string; }
interface RunDetail extends PayrollRun { payslips: PayslipRow[]; }

const currency = (n?: number) => `${(n ?? 0).toLocaleString('en-ZA', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ZAR`;
const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-ZA') : '—');

export default function PayrollPage() {
  const [runs, setRuns] = useState<PayrollRun[]>([]);
  const [mySlips, setMySlips] = useState<PayslipRow[]>([]);
  const [detail, setDetail] = useState<RunDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [showRunForm, setShowRunForm] = useState(false);
  const [period, setPeriod] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  const load = async () => {
    setLoading(true);
    const [runsRes, mineRes] = await Promise.all([
      api<PayrollRun[]>('/v1/finance/payroll/runs'),
      api<PayslipRow[]>('/v1/finance/payroll/my-payslips'),
    ]);
    if (runsRes.success && runsRes.data) setRuns(runsRes.data);
    if (mineRes.success && mineRes.data) setMySlips(mineRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createRun = async () => {
    if (!period) return;
    setSaving(true);
    setError('');
    const res = await api<PayrollRun>('/v1/finance/payroll/runs', { method: 'POST', body: JSON.stringify({ period }) });
    if (!res.success) {
      setError(res.error?.message ?? 'Could not create payroll run');
    } else {
      setShowRunForm(false);
      setPeriod('');
      await load();
    }
    setSaving(false);
  };

  const approveRun = async (id: string, approved: boolean) => {
    await api(`/v1/finance/payroll/runs/${id}/approve`, { method: 'POST', body: JSON.stringify({ approved }) });
    await load();
    if (detail?.id === id) await openRun(id);
  };

  const paySlip = async (id: string) => {
    await api(`/v1/finance/payslips/${id}/pay`, { method: 'POST' });
    if (detail?.id) await openRun(detail.id);
    await load();
  };

  const openRun = async (id: string) => {
    const res = await api<RunDetail>(`/v1/finance/payroll/runs/${id}`);
    if (res.success && res.data) setDetail(res.data);
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const approvedNet = runs.filter(r => r.status === 'approved').reduce((s, r) => s + (r.netTotal ?? 0), 0);
  const paidNet = runs.filter(r => r.status === 'paid').reduce((s, r) => s + (r.netTotal ?? 0), 0);
  const totalStaff = runs.length ? (runs[0].payslipCount ?? 0) : 0;
  const pendingApproval = runs.filter(r => r.status === 'draft').length;
  const myPaidNet = mySlips.filter(s => s.status === 'paid').reduce((s, p) => s + (p.netPay ?? 0), 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Payroll</h1><p className="text-muted-foreground mt-1">Run payroll, approve, and pay staff — payslips auto-generated with PAYE.</p></div>
        <Button onClick={() => setShowRunForm(true)}><Plus className="h-4 w-4 mr-2" /> Run Payroll</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Wallet className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Total Runs</span></div><p className="text-2xl font-bold">{runs.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Banknote className="h-5 w-5 text-emerald-500" /><span className="text-sm text-muted-foreground">Paid Out</span></div><p className="text-2xl font-bold text-emerald-600">{currency(paidNet)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Approved (awaiting pay)</span></div><p className="text-2xl font-bold">{currency(approvedNet)}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Draft Runs</span></div><p className="text-2xl font-bold text-orange-600">{pendingApproval}</p></CardContent></Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-4">
          {runs.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-muted-foreground"><Banknote className="h-12 w-12 mx-auto mb-4" /><p>No payroll runs yet. Run the first payroll cycle to generate payslips for active staff.</p></CardContent></Card>
          ) : runs.map(r => (
            <Card key={r.id}><CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{r.period}</h3>
                    <Badge variant={r.status === 'paid' ? 'default' : r.status === 'approved' ? 'secondary' : 'outline'}>{r.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{r.payslipCount ?? 0} payslips · Approved {fmt(r.approvedAt)} · Paid {fmt(r.paidAt)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Net total</p>
                  <p className="text-lg font-bold">{currency(r.netTotal)}</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Button size="sm" variant="outline" onClick={() => openRun(r.id)}>View Payslips</Button>
                {r.status === 'draft' && <Button size="sm" onClick={() => approveRun(r.id, true)}>Approve</Button>}
              </div>
            </CardContent></Card>
          ))}
        </div>

        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader><CardTitle className="flex items-center gap-2"><Receipt className="h-5 w-5 text-violet-500" /> My Payslips</CardTitle><CardDescription>Your payslip history as an employee.</CardDescription></CardHeader>
            <CardContent className="space-y-3">
              {mySlips.length === 0 ? <p className="text-sm text-muted-foreground py-4 text-center">No payslips issued yet.</p> : mySlips.map(s => (
                <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                  <div><p className="font-medium">{s.period}</p><p className="text-xs text-muted-foreground">Gross {currency(s.grossPay)} · Tax {currency(s.deductions)}</p></div>
                  <div className="text-right">
                    <p className="font-bold">{currency(s.netPay)}</p>
                    <Badge variant={s.status === 'paid' ? 'default' : 'secondary'} className="mt-1">{s.status}</Badge>
                  </div>
                </div>
              ))}
              {myPaidNet > 0 && <Separator />}
              {myPaidNet > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Total paid to you</span><span className="font-bold">{currency(myPaidNet)}</span></div>}
            </CardContent>
          </Card>
        </div>
      </div>

      <Dialog open={!!detail} onOpenChange={o => !o && setDetail(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader><DialogTitle>Payroll Run — {detail?.period}</DialogTitle><DialogDescription>{detail?.payslipCount} payslips · Net total {currency(detail?.netTotal)} · Status <Badge variant="outline">{detail?.status}</Badge></DialogDescription></DialogHeader>
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-left">
                <tr><th className="px-3 py-2 font-medium">Employee</th><th className="px-3 py-2 font-medium">Position</th><th className="px-3 py-2 font-medium text-right">Basic</th><th className="px-3 py-2 font-medium text-right">Tax</th><th className="px-3 py-2 font-medium text-right">Net</th><th className="px-3 py-2 font-medium">Status</th><th /></tr>
              </thead>
              <tbody>
                {detail?.payslips.map(p => (
                  <tr key={p.id} className="border-t">
                    <td className="px-3 py-2 font-medium">{p.firstName} {p.lastName}<div className="text-xs text-muted-foreground">{p.employeeCode} · {p.email}</div></td>
                    <td className="px-3 py-2 text-muted-foreground">{p.position || '—'}</td>
                    <td className="px-3 py-2 text-right">{currency(p.basicPay)}</td>
                    <td className="px-3 py-2 text-right text-red-600">-{currency(p.deductions)}</td>
                    <td className="px-3 py-2 text-right font-bold">{currency(p.netPay)}</td>
                    <td className="px-3 py-2"><Badge variant={p.status === 'paid' ? 'default' : 'secondary'}>{p.status}</Badge></td>
                    <td className="px-3 py-2">{detail?.status === 'approved' && p.status === 'pending' && <Button size="sm" variant="outline" onClick={() => paySlip(p.id)}>Pay</Button>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <DialogFooter>
            {detail?.status === 'draft' && <Button onClick={() => approveRun(detail.id, true)}>Approve Run</Button>}
            <Button variant="outline" onClick={() => setDetail(null)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showRunForm} onOpenChange={setShowRunForm}>
        <DialogContent><DialogHeader><DialogTitle>Run Payroll</DialogTitle><DialogDescription>Generates a payslip for every active employee with a salary (15% PAYE deduction).</DialogDescription></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Period (YYYY-MM)</label>
              <Input placeholder="2026-07" value={period} onChange={e => setPeriod(e.target.value)} />
              <p className="text-xs text-muted-foreground mt-1">Tip: {new Date().toISOString().slice(0, 7)}</p></div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRunForm(false)}>Cancel</Button>
            <Button onClick={createRun} disabled={saving || !period}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Generate Payslips</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
