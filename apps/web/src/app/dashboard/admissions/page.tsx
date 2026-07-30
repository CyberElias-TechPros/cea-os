'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, Users, FileText, CheckCircle, XCircle, Send, Search } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Application {
  id: string; userId: string; programId?: string; status: string;
  firstName: string; lastName: string; email: string; phone?: string;
  educationLevel?: string; motivation?: string; submittedAt?: string; createdAt: string;
}

export default function AdmissionsPage() {
  const [apps, setApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '', educationLevel: '', motivation: '' });

  const load = async () => {
    setLoading(true);
    const res = await api<Application[]>('/v1/admissions');
    if (res.success && res.data) setApps(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createApp = async () => {
    await api('/v1/admissions', { method: 'POST', body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ firstName: '', lastName: '', email: '', phone: '', educationLevel: '', motivation: '' });
    await load();
  };

  const submitApp = async (id: string) => {
    await api(`/v1/admissions/${id}/submit`, { method: 'POST' });
    await load();
  };

  const updateStatus = async (id: string, status: string) => {
    await api(`/v1/admissions/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  const filtered = apps.filter(a =>
    `${a.firstName} ${a.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors: Record<string, string> = { draft: 'secondary', submitted: 'default', under_review: 'default', shortlisted: 'default', interview_scheduled: 'default', offer_made: 'default', accepted: 'default', rejected: 'destructive', withdrawn: 'outline' };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const pipeline = [
    { stage: 'submitted', label: 'Submitted', color: 'bg-blue-100 dark:bg-blue-950' },
    { stage: 'under_review', label: 'Under Review', color: 'bg-yellow-100 dark:bg-yellow-950' },
    { stage: 'shortlisted', label: 'Shortlisted', color: 'bg-purple-100 dark:bg-purple-950' },
    { stage: 'offer_made', label: 'Offer Made', color: 'bg-green-100 dark:bg-green-950' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Admissions</h1><p className="text-muted-foreground mt-1">Manage the student application pipeline</p></div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> New Application</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {pipeline.map(p => (
          <Card key={p.stage} className={p.color}>
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold">{apps.filter(a => a.status === p.stage).length}</p>
              <p className="text-sm text-muted-foreground">{p.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search applicants..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground"><Users className="h-12 w-12 mx-auto mb-4" /><p>No applications yet.</p></div>
      ) : (
        <div className="grid gap-3">
          {filtered.map(a => (
            <Card key={a.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedApp(a)}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{a.firstName} {a.lastName}</p>
                  <p className="text-sm text-muted-foreground">{a.email}{a.educationLevel ? ` · ${a.educationLevel}` : ''}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={(statusColors[a.status] || 'secondary') as any}>{a.status}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(a.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedApp} onOpenChange={open => { if (!open) setSelectedApp(null); }}>
        <DialogContent className="max-w-2xl">{selectedApp && (
          <>
            <DialogHeader>
              <DialogTitle>{selectedApp.firstName} {selectedApp.lastName}</DialogTitle>
              <DialogDescription>{selectedApp.email}</DialogDescription>
            </DialogHeader>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <p><strong>Phone:</strong> {selectedApp.phone || 'N/A'}</p>
                <p><strong>Education:</strong> {selectedApp.educationLevel || 'N/A'}</p>
                <p><strong>Status:</strong> <Badge variant={(statusColors[selectedApp.status] || 'secondary') as any}>{selectedApp.status}</Badge></p>
                <p><strong>Submitted:</strong> {selectedApp.submittedAt ? new Date(selectedApp.submittedAt).toLocaleDateString() : 'Not yet'}</p>
              </div>
              {selectedApp.motivation && <div><h4 className="text-sm font-medium">Motivation</h4><p className="text-sm text-muted-foreground mt-1">{selectedApp.motivation}</p></div>}
              <div className="flex flex-wrap gap-2 pt-2">
                {selectedApp.status === 'draft' && <Button size="sm" onClick={() => submitApp(selectedApp.id)}><Send className="h-3 w-3 mr-1" /> Submit</Button>}
                {selectedApp.status === 'submitted' && <Button size="sm" onClick={() => updateStatus(selectedApp.id, 'under_review')}>Start Review</Button>}
                {selectedApp.status === 'under_review' && (
                  <>
                    <Button size="sm" variant="default" onClick={() => updateStatus(selectedApp.id, 'shortlisted')}>Shortlist</Button>
                    <Button size="sm" variant="destructive" onClick={() => updateStatus(selectedApp.id, 'rejected')}>Reject</Button>
                  </>
                )}
                {selectedApp.status === 'shortlisted' && <Button size="sm" onClick={() => updateStatus(selectedApp.id, 'offer_made')}>Make Offer</Button>}
              </div>
            </div>
          </>
        )}</DialogContent>
      </Dialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Application</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">First Name *</label><Input value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Last Name *</label><Input value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Email *</label><Input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Phone</label><Input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Education Level</label><Input value={form.educationLevel} onChange={e => setForm(f => ({ ...f, educationLevel: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Motivation</label><Textarea value={form.motivation} onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))} rows={3} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={createApp}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
