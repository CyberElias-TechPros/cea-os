'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cea/ui';
import { Select } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import { Plus, Search, Loader2, Users, DollarSign, TrendingUp } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Contact {
  id: string; firstName: string; lastName: string; email: string; phone?: string;
  company?: string; title?: string; source: string; status: string; type: string;
  notes?: string; assignedToId?: string; createdAt: string;
}

interface Deal {
  id: string; contactId: string; name: string; value?: number; currency: string;
  stage: string; probability: number; expectedCloseDate?: string; notes?: string;
}

export default function ClientsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showContactForm, setShowContactForm] = useState(false);
  const [showDealForm, setShowDealForm] = useState(false);
  const [contactForm, setContactForm] = useState({ firstName: '', lastName: '', email: '', phone: '', company: '', title: '', source: 'website', status: 'lead', type: 'prospective_student', notes: '' });
  const [dealForm, setDealForm] = useState({ contactId: '', name: '', value: '', currency: 'ZAR', stage: 'qualification', probability: '0', expectedCloseDate: '', notes: '' });

  const load = async () => {
    setLoading(true);
    const [cRes, dRes] = await Promise.all([
      api<Contact[]>('/v1/crm/contacts'),
      api<Deal[]>('/v1/crm/deals'),
    ]);
    if (cRes.success && cRes.data) setContacts(cRes.data);
    if (dRes.success && dRes.data) setDeals(dRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveContact = async () => {
    await api('/v1/crm/contacts', { method: 'POST', body: JSON.stringify(contactForm) });
    setShowContactForm(false);
    setContactForm({ firstName: '', lastName: '', email: '', phone: '', company: '', title: '', source: 'website', status: 'lead', type: 'prospective_student', notes: '' });
    await load();
  };

  const saveDeal = async () => {
    await api('/v1/crm/deals', { method: 'POST', body: JSON.stringify({ ...dealForm, value: dealForm.value ? Number(dealForm.value) : undefined, probability: Number(dealForm.probability) }) });
    setShowDealForm(false);
    setDealForm({ contactId: '', name: '', value: '', currency: 'ZAR', stage: 'qualification', probability: '0', expectedCloseDate: '', notes: '' });
    await load();
  };

  const filtered = contacts.filter(c =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.email.toLowerCase().includes(search.toLowerCase()) ||
    (c.company || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM</h1>
          <p className="text-muted-foreground mt-1">Manage contacts, deals, and pipeline</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowDealForm(true)}><DollarSign className="h-4 w-4 mr-2" /> New Deal</Button>
          <Button onClick={() => setShowContactForm(true)}><Plus className="h-4 w-4 mr-2" /> Add Contact</Button>
        </div>
      </div>

      <Tabs defaultValue="contacts">
        <TabsList>
          <TabsTrigger value="contacts">Contacts ({contacts.length})</TabsTrigger>
          <TabsTrigger value="deals">Deals ({deals.length})</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
        </TabsList>

        <TabsContent value="contacts" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search contacts..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground"><Users className="h-12 w-12 mx-auto mb-4" /><p>No contacts found.</p></div>
          ) : (
            <div className="grid gap-3">
              {filtered.map(c => (
                <Card key={c.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">{c.firstName} {c.lastName}</p>
                      <p className="text-sm text-muted-foreground">{c.email}{c.company ? ` · ${c.company}` : ''}</p>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{c.status}</Badge>
                        <Badge variant="outline">{c.type}</Badge>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="deals" className="space-y-4">
          {deals.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground"><DollarSign className="h-12 w-12 mx-auto mb-4" /><p>No deals yet.</p></div>
          ) : (
            <div className="grid gap-3">
              {deals.map(d => (
                <Card key={d.id}>
                  <CardContent className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">{d.name}</p>
                      <p className="text-sm text-muted-foreground">{d.currency} {d.value?.toLocaleString()} · {d.probability}%</p>
                    </div>
                    <Badge>{d.stage}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="pipeline" className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            {['qualification', 'proposal', 'negotiation'].map(stage => {
              const stageDeals = deals.filter(d => d.stage === stage && d.value);
              const totalValue = stageDeals.reduce((sum, d) => sum + (d.value || 0), 0);
              return (
                <Card key={stage}>
                  <CardHeader>
                    <CardTitle className="text-sm capitalize">{stage.replace(/_/g, ' ')}</CardTitle>
                    <CardDescription>{stageDeals.length} deals · {totalValue.toLocaleString()} ZAR</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {stageDeals.length === 0 ? <p className="text-xs text-muted-foreground">No deals</p> : (
                      <div className="space-y-2">
                        {stageDeals.map(d => (
                          <div key={d.id} className="text-sm p-2 rounded bg-muted">
                            <p className="font-medium">{d.name}</p>
                            <p className="text-xs text-muted-foreground">{d.currency} {d.value?.toLocaleString()}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={showContactForm} onOpenChange={setShowContactForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Contact</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">First Name *</label><Input value={contactForm.firstName} onChange={e => setContactForm(f => ({ ...f, firstName: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Last Name *</label><Input value={contactForm.lastName} onChange={e => setContactForm(f => ({ ...f, lastName: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Email *</label><Input type="email" value={contactForm.email} onChange={e => setContactForm(f => ({ ...f, email: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Phone</label><Input value={contactForm.phone} onChange={e => setContactForm(f => ({ ...f, phone: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Company</label><Input value={contactForm.company} onChange={e => setContactForm(f => ({ ...f, company: e.target.value }))} /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={contactForm.status} onChange={e => setContactForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="lead">Lead</option><option value="qualified">Qualified</option><option value="proposal">Proposal</option><option value="negotiation">Negotiation</option><option value="won">Won</option><option value="lost">Lost</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={contactForm.type} onChange={e => setContactForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="prospective_student">Prospective Student</option><option value="client">Client</option><option value="partner">Partner</option><option value="employer">Employer</option>
                </select>
              </div>
            </div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={contactForm.notes} onChange={e => setContactForm(f => ({ ...f, notes: e.target.value }))} rows={3} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowContactForm(false)}>Cancel</Button><Button onClick={saveContact}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDealForm} onOpenChange={setShowDealForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Deal</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Contact</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={dealForm.contactId} onChange={e => setDealForm(f => ({ ...f, contactId: e.target.value }))}>
                <option value="">Select contact</option>
                {contacts.map(c => <option key={c.id} value={c.id}>{c.firstName} {c.lastName}</option>)}
              </select>
            </div>
            <div><label className="text-sm font-medium">Deal Name *</label><Input value={dealForm.name} onChange={e => setDealForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Value</label><Input type="number" value={dealForm.value} onChange={e => setDealForm(f => ({ ...f, value: e.target.value }))} /></div>
              <div>
                <label className="text-sm font-medium">Stage</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={dealForm.stage} onChange={e => setDealForm(f => ({ ...f, stage: e.target.value }))}>
                  <option value="qualification">Qualification</option><option value="needs_analysis">Needs Analysis</option><option value="proposal">Proposal</option><option value="negotiation">Negotiation</option>
                </select>
              </div>
            </div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={dealForm.notes} onChange={e => setDealForm(f => ({ ...f, notes: e.target.value }))} rows={3} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowDealForm(false)}>Cancel</Button><Button onClick={saveDeal}>Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
