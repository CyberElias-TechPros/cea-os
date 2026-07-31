'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Input } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { LogIn, LogOut, Loader2, UserPlus, Search, Building2, DoorOpen } from 'lucide-react';

interface Visitor {
  id: string; firstName: string; lastName: string; email: string; phone?: string;
  organization?: string; purpose: string; hostName?: string; notes?: string;
  status: string; checkedInAt?: number | string; checkedOutAt?: number | string; qrCode?: string;
}

const PURPOSES: { value: string; label: string }[] = [
  { value: 'visit', label: 'General visit' },
  { value: 'enrollment_inquiry', label: 'Enrollment inquiry' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'interview', label: 'Interview' },
  { value: 'meeting', label: 'Meeting' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
];

export default function FrontDeskPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [busyId, setBusyId] = useState<string | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', organization: '', purpose: 'visit', hostName: '', notes: '' });
  const [showForm, setShowForm] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [forbidden, setForbidden] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setForbidden(false);
    const res = await api<Visitor[]>('/v1/visitors');
    if (!res.success && (res.error?.code === 'FORBIDDEN' || res.error?.code === 'UNAUTHORIZED')) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    if (res.success && res.data) setVisitors(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const act = async (id: string, action: 'checkin' | 'checkout') => {
    setBusyId(id);
    const res = await api(`/v1/visitors/${id}/${action}`, { method: 'PATCH' });
    setBusyId(null);
    if (res.success) await load();
  };

  const submit = async () => {
    setMsg(null);
    if (!form.firstName || !form.lastName || !form.email) {
      setMsg({ ok: false, text: 'Name and email are required.' });
      return;
    }
    const res = await api('/v1/visitors/request', { method: 'POST', body: JSON.stringify(form) });
    if (res.success) {
      setMsg({ ok: true, text: `${form.firstName} added to the visitor queue.` });
      setForm({ firstName: '', lastName: '', email: '', phone: '', organization: '', purpose: 'visit', hostName: '', notes: '' });
      setShowForm(false);
      await load();
    } else {
      setMsg({ ok: false, text: res.error?.message || 'Failed to add visitor' });
    }
  };

  const filtered = visitors.filter(v =>
    `${v.firstName} ${v.lastName} ${v.email} ${v.organization ?? ''}`.toLowerCase().includes(search.toLowerCase())
  );

  const pending = visitors.filter(v => v.status === 'pending');
  const checkedIn = visitors.filter(v => v.status === 'checked_in');

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (forbidden) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Front Desk</h1>
        <Card><CardContent className="p-14 text-center">
          <DoorOpen className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium mt-4">Staff access required</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            The front desk console is restricted to staff with visitor management permissions.
          </p>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Front Desk</h1>
          <p className="text-muted-foreground mt-1">Visitor management — pre-registration, check-in and check-out.</p>
        </div>
        <Button onClick={() => setShowForm(v => !v)}>
          <UserPlus className="mr-2 h-4 w-4" /> Pre-register visitor
        </Button>
      </div>

      {msg && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 rounded-xl border p-4 text-sm font-medium ${msg.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>
          {msg.text}
        </motion.div>
      )}

      {showForm && (
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">First name *</label>
                <Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Last name *</label>
                <Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Email *</label>
                <Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Phone</label>
                <Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Organization</label>
                <Input value={form.organization} onChange={e => setForm(f => ({ ...f, organization: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Purpose *</label>
                <select
                  value={form.purpose}
                  onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))}
                  className="mt-1 flex h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {PURPOSES.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Host name</label>
                <Input value={form.hostName} onChange={e => setForm(f => ({ ...f, hostName: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Input value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className="mt-1" />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button onClick={submit}>Add visitor</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        <Card><CardContent className="p-5">
          <div className="text-3xl font-bold">{visitors.length}</div>
          <div className="text-sm text-muted-foreground">Total on-site</div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="text-3xl font-bold">{pending.length}</div>
          <div className="text-sm text-muted-foreground">Awaiting check-in</div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="text-3xl font-bold">{checkedIn.length}</div>
          <div className="text-sm text-muted-foreground">Currently inside</div>
        </CardContent></Card>
      </div>

      <Tabs defaultValue="queue">
        <TabsList>
          <TabsTrigger value="queue">Queue ({pending.length})</TabsTrigger>
          <TabsTrigger value="inside">Inside ({checkedIn.length})</TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="queue" className="space-y-3">
          {pending.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">No visitors waiting.</CardContent></Card>
          ) : (
            pending.map(v => (
              <VisitorRow key={v.id} v={v} busyId={busyId} onCheckin={() => act(v.id, 'checkin')} />
            ))
          )}
        </TabsContent>
        <TabsContent value="inside" className="space-y-3">
          {checkedIn.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">Nobody checked in right now.</CardContent></Card>
          ) : (
            checkedIn.map(v => (
              <VisitorRow key={v.id} v={v} busyId={busyId} onCheckout={() => act(v.id, 'checkout')} />
            ))
          )}
        </TabsContent>
        <TabsContent value="all" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search all visitors..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          {filtered.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">No visitors match your search.</CardContent></Card>
          ) : (
            filtered.map(v => (
              <VisitorRow key={v.id} v={v} busyId={busyId} onCheckin={() => act(v.id, 'checkin')} onCheckout={() => act(v.id, 'checkout')} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function VisitorRow({ v, busyId, onCheckin, onCheckout }: { v: Visitor; busyId: string | null; onCheckin?: () => void; onCheckout?: () => void }) {
  const isBusy = busyId === v.id;
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold">{v.firstName} {v.lastName}</span>
              <Badge variant={v.status === 'checked_in' ? 'success' : v.status === 'checked_out' ? 'outline' : 'warning'} className="text-xs capitalize">{v.status.replace('_', ' ')}</Badge>
              <span className="text-xs text-muted-foreground capitalize">{v.purpose.replace('_', ' ')}</span>
            </div>
            <div className="text-sm text-muted-foreground mt-1 flex flex-wrap items-center gap-x-4 gap-y-0.5">
              <span>{v.email}</span>
              {v.organization && <span className="flex items-center gap-1"><Building2 className="h-3 w-3" /> {v.organization}</span>}
              {v.hostName && <span>Host: {v.hostName}</span>}
              {v.checkedInAt && <span className="text-xs">In: {new Date(v.checkedInAt).toLocaleTimeString()}</span>}
              {v.checkedOutAt && <span className="text-xs">Out: {new Date(v.checkedOutAt).toLocaleTimeString()}</span>}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            {v.status === 'pending' && onCheckin && (
              <Button size="sm" disabled={isBusy} onClick={onCheckin}>
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="mr-1 h-4 w-4" />} Check in
              </Button>
            )}
            {v.status === 'checked_in' && onCheckout && (
              <Button size="sm" variant="outline" disabled={isBusy} onClick={onCheckout}>
                {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="mr-1 h-4 w-4" />} Check out
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
