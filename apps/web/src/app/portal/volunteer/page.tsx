'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Button, Badge, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { Loader2, HeartHandshake, Clock, MapPin, Plus } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';

interface Opportunity { id: string; title: string; description?: string; location?: string; skills?: string; commitment?: string; slots?: number; status: string; }
interface Signup { id: string; opportunityId: string; status: string; createdAt: string; }
interface HourEntry { id: string; date: string; hours: number; description?: string; status: string; }

export default function VolunteerPortal() {
  const [opps, setOpps] = useState<Opportunity[]>([]);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [hours, setHours] = useState<HourEntry[]>([]);
  const [totalHours, setTotalHours] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showHours, setShowHours] = useState(false);
  const [hourForm, setHourForm] = useState({ signupId: '', date: '', hours: '', description: '' });

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<{ opportunities: Opportunity[]; signups: Signup[]; hours: HourEntry[]; totalHours: number }>('/v1/platform/portals/volunteer');
    if (res.success && res.data) {
      setOpps(res.data.opportunities);
      setSignups(res.data.signups);
      setHours(res.data.hours);
      setTotalHours(res.data.totalHours);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const signup = async (opportunityId: string) => {
    await api('/v1/platform/portals/volunteer/signup', { method: 'POST', body: JSON.stringify({ opportunityId }) });
    await load();
  };

  const logHours = async () => {
    await api('/v1/platform/portals/volunteer/hours', { method: 'POST', body: JSON.stringify({ ...hourForm, hours: Number(hourForm.hours), signupId: hourForm.signupId || undefined }) });
    setShowHours(false);
    setHourForm({ signupId: '', date: '', hours: '', description: '' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const mySignupIds = new Set(signups.map(s => s.opportunityId));
  const pendingHours = hours.filter(h => h.status === 'pending').reduce((s, h) => s + h.hours, 0);

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Volunteer Portal</Badge>
          <h1 className="text-3xl font-bold">Volunteer with CEA</h1>
          <p className="text-muted-foreground mt-1">Find opportunities, sign up, and log your hours.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => setShowHours(true)}><Plus className="h-4 w-4 mr-2" /> Log hours</Button>
          <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Approved hours</div><p className="text-2xl font-bold text-emerald-600">{totalHours}h</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Pending approval</div><p className="text-2xl font-bold text-amber-600">{pendingHours}h</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">My signups</div><p className="text-2xl font-bold">{signups.length}</p></CardContent></Card>
      </div>

      <h2 className="text-xl font-semibold flex items-center gap-2"><HeartHandshake className="h-5 w-5 text-pink-500" /> Open opportunities</h2>
      {opps.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">No open opportunities right now.</CardContent></Card>
      ) : opps.map(o => (
        <Card key={o.id}><CardContent className="p-5 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2"><p className="font-semibold">{o.title}</p>{mySignupIds.has(o.id) && <Badge>Signed up</Badge>}</div>
            <p className="text-sm text-muted-foreground mt-1">{o.description}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
              {o.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{o.location}</span>}
              {o.commitment && <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{o.commitment}</span>}
              {o.slots != null && <span>{o.slots} slots</span>}
              {o.skills && <span>Needs: {o.skills}</span>}
            </div>
          </div>
          {!mySignupIds.has(o.id) && <Button size="sm" onClick={() => signup(o.id)}>Sign up</Button>}
        </CardContent></Card>
      ))}

      {hours.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">My logged hours</h2>
          <div className="space-y-2">
            {hours.map(h => (
              <Card key={h.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">{new Date(h.date).toLocaleDateString('en-ZA')} — {h.hours}h</p>{h.description && <p className="text-xs text-muted-foreground">{h.description}</p>}</div>
                <Badge variant={h.status === 'approved' ? 'default' : h.status === 'rejected' ? 'destructive' : 'secondary'}>{h.status}</Badge>
              </CardContent></Card>
            ))}
          </div>
        </>
      )}

      <Dialog open={showHours} onOpenChange={setShowHours}>
        <DialogContent><DialogHeader><DialogTitle>Log Volunteer Hours</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Date *</label><Input type="date" value={hourForm.date} onChange={e => setHourForm(f => ({ ...f, date: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Hours *</label><Input type="number" step="0.5" value={hourForm.hours} onChange={e => setHourForm(f => ({ ...f, hours: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={hourForm.description} onChange={e => setHourForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowHours(false)}>Cancel</Button><Button onClick={logHours}>Log hours</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
