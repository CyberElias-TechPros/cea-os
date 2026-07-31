'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Button, Badge, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { Loader2, Users2, Plus, GraduationCap, TrendingUp, CalendarX } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';

interface Ward {
  studentId: string; relation: string;
  student: { firstName: string; lastName: string; email: string } | null;
  invoices: { id: string; invoiceNumber: string; status: string; total: number; currency?: string; dueDate?: string }[];
  courses: number; avgGrade: number | null; absences: number;
}

export default function ParentPortal() {
  const [wards, setWards] = useState<Ward[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLink, setShowLink] = useState(false);
  const [linkForm, setLinkForm] = useState({ studentEmail: '', relation: 'guardian' });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<Ward[]>('/v1/platform/portals/parent');
    if (res.success && res.data) setWards(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const link = async () => {
    await api('/v1/platform/portals/parent/link', { method: 'POST', body: JSON.stringify(linkForm) });
    setShowLink(false);
    setLinkForm({ studentEmail: '', relation: 'guardian' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Parent Portal</Badge>
          <h1 className="text-3xl font-bold">My Children's Progress</h1>
          <p className="text-muted-foreground mt-1">Grades, attendance, courses and fees for your wards.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowLink(true)}><Plus className="h-4 w-4 mr-2" /> Link a ward</Button>
          <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
        </div>
      </div>

      {wards.length === 0 ? (
        <Card><CardContent className="p-12 text-center">
          <Users2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No wards linked yet. Add your child's registered email to see their progress.</p>
        </CardContent></Card>
      ) : wards.map(w => (
        <Card key={w.studentId}>
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2"><h3 className="font-semibold">{w.student ? `${w.student.firstName} ${w.student.lastName}` : 'Student'}</h3><Badge variant="outline" className="capitalize">{w.relation}</Badge></div>
                <p className="text-sm text-muted-foreground">{w.student?.email}</p>
              </div>
              <div className="flex gap-3 text-center">
                <div className="rounded-lg border px-4 py-2"><div className="flex items-center gap-1 text-xs text-muted-foreground"><TrendingUp className="h-3 w-3" /> Average</div><p className="text-xl font-bold">{w.avgGrade != null ? `${w.avgGrade}%` : '—'}</p></div>
                <div className="rounded-lg border px-4 py-2"><div className="flex items-center gap-1 text-xs text-muted-foreground"><GraduationCap className="h-3 w-3" /> Courses</div><p className="text-xl font-bold">{w.courses}</p></div>
                <div className="rounded-lg border px-4 py-2"><div className="flex items-center gap-1 text-xs text-muted-foreground"><CalendarX className="h-3 w-3" /> Absences</div><p className="text-xl font-bold">{w.absences}</p></div>
              </div>
            </div>

            {w.invoices.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-2">Fees & invoices</p>
                <div className="space-y-2">
                  {w.invoices.map(inv => (
                    <div key={inv.id} className="flex items-center justify-between rounded-lg border px-3 py-2 text-sm">
                      <span className="font-mono">{inv.invoiceNumber}</span>
                      <span className="text-muted-foreground">due {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString('en-ZA') : '—'}</span>
                      <span className="font-bold">{(inv.total ?? 0).toLocaleString('en-ZA')} {inv.currency ?? 'ZAR'}</span>
                      <Badge variant={inv.status === 'paid' ? 'default' : inv.status === 'overdue' ? 'destructive' : 'secondary'}>{inv.status}</Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}

      <Dialog open={showLink} onOpenChange={setShowLink}>
        <DialogContent><DialogHeader><DialogTitle>Link a Ward</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Student email *</label><Input type="email" value={linkForm.studentEmail} onChange={e => setLinkForm(f => ({ ...f, studentEmail: e.target.value }))} placeholder="student@cea.academy" /></div>
            <div><label className="text-sm font-medium">Relation</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={linkForm.relation} onChange={e => setLinkForm(f => ({ ...f, relation: e.target.value }))}>
                <option value="guardian">Guardian</option><option value="parent">Parent</option><option value="sponsor">Sponsor</option></select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowLink(false)}>Cancel</Button><Button onClick={link}>Link</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
