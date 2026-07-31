'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, Tabs, TabsContent, TabsList, TabsTrigger, Separator } from '@cea/ui';
import { Loader2, Megaphone, CalendarDays, Mail, Plus, Send, Users, TrendingUp, Sparkles } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Campaign { id: string; name: string; channel: string; audience?: string; subject?: string; content?: string; status: string; scheduledAt?: string; sentAt?: string; sentCount?: number; }
interface ContentItem { id: string; title: string; type: string; platform?: string; publishAt?: string; status: string; }
interface Lead { id: string; email: string; firstName?: string; source?: string; status: string; createdAt: string; }

const fmt = (d?: string) => (d ? new Date(d).toLocaleDateString('en-ZA') : '—');

export default function MarketingPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [content, setContent] = useState<ContentItem[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCampaign, setShowCampaign] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [campaignForm, setCampaignForm] = useState({ name: '', channel: 'email', audience: '', subject: '', content: '', scheduledAt: '' });
  const [contentForm, setContentForm] = useState({ title: '', type: 'blog', platform: 'website', publishAt: '', status: 'idea' });

  const load = async () => {
    setLoading(true);
    const [cRes, coRes, lRes] = await Promise.all([
      api<Campaign[]>('/v1/platform/marketing/campaigns'),
      api<ContentItem[]>('/v1/platform/marketing/content'),
      api<Lead[]>('/v1/platform/marketing/leads'),
    ]);
    if (cRes.success && cRes.data) setCampaigns(cRes.data);
    if (coRes.success && coRes.data) setContent(coRes.data);
    if (lRes.success && lRes.data) setLeads(lRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createCampaign = async () => {
    await api('/v1/platform/marketing/campaigns', { method: 'POST', body: JSON.stringify(campaignForm) });
    setShowCampaign(false);
    setCampaignForm({ name: '', channel: 'email', audience: '', subject: '', content: '', scheduledAt: '' });
    await load();
  };

  const sendCampaign = async (id: string) => {
    await api(`/v1/platform/marketing/campaigns/${id}/send`, { method: 'POST' });
    await load();
  };

  const createContent = async () => {
    await api('/v1/platform/marketing/content', { method: 'POST', body: JSON.stringify(contentForm) });
    setShowContent(false);
    setContentForm({ title: '', type: 'blog', platform: 'website', publishAt: '', status: 'idea' });
    await load();
  };

  const updateContent = async (id: string, status: string) => {
    await api(`/v1/platform/marketing/content/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const sentCount = campaigns.reduce((s, c) => s + (c.sentCount ?? 0), 0);
  const activeSubscribers = leads.filter(l => l.status === 'subscribed').length;
  const published = content.filter(c => c.status === 'published').length;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Marketing</h1><p className="text-muted-foreground mt-1">Campaigns, content calendar, and lead capture.</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowContent(true)}><CalendarDays className="h-4 w-4 mr-2" /> Add Content</Button>
          <Button onClick={() => setShowCampaign(true)}><Megaphone className="h-4 w-4 mr-2" /> New Campaign</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Megaphone className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Campaigns</span></div><p className="text-2xl font-bold">{campaigns.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Send className="h-5 w-5 text-emerald-500" /><span className="text-sm text-muted-foreground">Emails delivered</span></div><p className="text-2xl font-bold text-emerald-600">{sentCount.toLocaleString()}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Subscribers</span></div><p className="text-2xl font-bold">{activeSubscribers}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Published content</span></div><p className="text-2xl font-bold">{published}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="campaigns">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns ({campaigns.length})</TabsTrigger>
          <TabsTrigger value="content">Content Calendar ({content.length})</TabsTrigger>
          <TabsTrigger value="leads">Leads ({leads.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-3">
          {campaigns.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground"><Megaphone className="h-12 w-12 mx-auto mb-4" /><p>No campaigns yet. Create your first outreach campaign.</p></CardContent></Card> : campaigns.map(c => (
            <Card key={c.id}><CardContent className="flex items-center justify-between py-4">
              <div>
                <div className="flex items-center gap-2"><p className="font-medium">{c.name}</p><Badge variant="outline" className="capitalize">{c.channel}</Badge><Badge>{c.status}</Badge></div>
                <p className="text-xs text-muted-foreground mt-1">{c.audience || 'All subscribers'}{c.subject ? ` · "${c.subject}"` : ''}{c.sentCount ? ` · ${c.sentCount} sent ${fmt(c.sentAt)}` : c.scheduledAt ? ` · scheduled ${fmt(c.scheduledAt)}` : ''}</p>
                {c.content && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{c.content}</p>}
              </div>
              {(c.status === 'draft' || c.status === 'scheduled') && <Button size="sm" onClick={() => sendCampaign(c.id)}><Send className="h-3.5 w-3.5 mr-1" /> Send Now</Button>}
            </CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="content" className="space-y-3">
          {content.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground"><CalendarDays className="h-12 w-12 mx-auto mb-4" /><p>No content planned. Add posts to the calendar.</p></CardContent></Card> : content.map(c => (
            <Card key={c.id}><CardContent className="flex items-center justify-between py-4">
              <div>
                <div className="flex items-center gap-2"><p className="font-medium">{c.title}</p><Badge variant="outline" className="capitalize">{c.type}</Badge></div>
                <p className="text-xs text-muted-foreground mt-1">{c.platform} · publish {fmt(c.publishAt)}</p>
              </div>
              <div className="flex items-center gap-2">
                <select className="rounded-md border border-input bg-background px-2 py-1 text-xs" value={c.status} onChange={e => updateContent(c.id, e.target.value)}>
                  <option value="idea">idea</option><option value="draft">draft</option><option value="review">review</option><option value="scheduled">scheduled</option><option value="published">published</option>
                </select>
              </div>
            </CardContent></Card>
          ))}
        </TabsContent>

        <TabsContent value="leads" className="space-y-3">
          {leads.length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground"><Users className="h-12 w-12 mx-auto mb-4" /><p>No leads yet. Newsletter signups appear here.</p></CardContent></Card> : leads.map(l => (
            <Card key={l.id}><CardContent className="flex items-center justify-between py-3">
              <div><p className="font-medium">{l.email}</p><p className="text-xs text-muted-foreground">{l.firstName || 'No name'} · via {l.source} · {fmt(l.createdAt)}</p></div>
              <Badge variant={l.status === 'subscribed' ? 'default' : 'secondary'}>{l.status}</Badge>
            </CardContent></Card>
          ))}
        </TabsContent>
      </Tabs>

      <Dialog open={showCampaign} onOpenChange={setShowCampaign}>
        <DialogContent><DialogHeader><DialogTitle>New Campaign</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Name *</label><Input value={campaignForm.name} onChange={e => setCampaignForm(f => ({ ...f, name: e.target.value }))} placeholder="Open day invite" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Channel</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={campaignForm.channel} onChange={e => setCampaignForm(f => ({ ...f, channel: e.target.value }))}>
                  <option value="email">Email</option><option value="social">Social</option><option value="content">Content</option><option value="events">Events</option></select></div>
              <div><label className="text-sm font-medium">Scheduled for</label><Input type="date" value={campaignForm.scheduledAt} onChange={e => setCampaignForm(f => ({ ...f, scheduledAt: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Audience</label><Input value={campaignForm.audience} onChange={e => setCampaignForm(f => ({ ...f, audience: e.target.value }))} placeholder="e.g. Prospective students" /></div>
            <div><label className="text-sm font-medium">Subject</label><Input value={campaignForm.subject} onChange={e => setCampaignForm(f => ({ ...f, subject: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Content</label><Textarea value={campaignForm.content} onChange={e => setCampaignForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowCampaign(false)}>Cancel</Button><Button onClick={createCampaign}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showContent} onOpenChange={setShowContent}>
        <DialogContent><DialogHeader><DialogTitle>Add Content</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={contentForm.title} onChange={e => setContentForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={contentForm.type} onChange={e => setContentForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="blog">Blog</option><option value="video">Video</option><option value="social_post">Social post</option><option value="newsletter">Newsletter</option><option value="webinar">Webinar</option></select></div>
              <div><label className="text-sm font-medium">Platform</label><Input value={contentForm.platform} onChange={e => setContentForm(f => ({ ...f, platform: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Publish date</label><Input type="date" value={contentForm.publishAt} onChange={e => setContentForm(f => ({ ...f, publishAt: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowContent(false)}>Cancel</Button><Button onClick={createContent}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
