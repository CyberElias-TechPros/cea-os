'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { Loader2, BookOpenText, Plus, Search, Heart, Activity, TicketCheck, ServerCrash } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Article { id: string; title: string; category: string; body?: string; helpfulCount?: number; published: boolean; updatedAt: string; }
interface Monitoring { checkedAt: string; api: string; openTickets: number; totalTickets: number; kbArticles: number; todayAttendance: number; }

const CATEGORIES = ['faq', 'troubleshooting', 'howto', 'policy', 'training'] as const;

export default function ItSupportPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [monitoring, setMonitoring] = useState<Monitoring | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'faq', body: '' });

  const load = async () => {
    setLoading(true);
    const [kbRes, monRes] = await Promise.all([
      api<Article[]>('/v1/platform/it/kb/all'),
      api<Monitoring>('/v1/platform/it/monitoring'),
    ]);
    if (kbRes.success && kbRes.data) setArticles(kbRes.data);
    if (monRes.success && monRes.data) setMonitoring(monRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createArticle = async () => {
    await api('/v1/platform/it/kb', { method: 'POST', body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ title: '', category: 'faq', body: '' });
    await load();
  };

  const togglePublish = async (a: Article) => {
    await api(`/v1/platform/it/kb/${a.id}`, { method: 'PATCH', body: JSON.stringify({ published: !a.published }) });
    await load();
  };

  const helpful = async (id: string) => {
    await api(`/v1/platform/it/kb/${id}/helpful`, { method: 'POST' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const filtered = articles.filter(a =>
    (category === 'all' || a.category === category) &&
    (search === '' || a.title.toLowerCase().includes(search.toLowerCase()) || (a.body ?? '').toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">IT Support</h1><p className="text-muted-foreground mt-1">Knowledge base, system monitoring, and asset health.</p></div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> New Article</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Activity className="h-5 w-5 text-green-500" /><span className="text-sm text-muted-foreground">API Status</span></div><p className="text-2xl font-bold text-green-600 capitalize">{monitoring?.api ?? '—'}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><TicketCheck className="h-5 w-5 text-rose-500" /><span className="text-sm text-muted-foreground">Open tickets</span></div><p className="text-2xl font-bold">{monitoring?.openTickets ?? 0}<span className="text-sm text-muted-foreground"> / {monitoring?.totalTickets ?? 0}</span></p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><BookOpenText className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">KB articles</span></div><p className="text-2xl font-bold">{monitoring?.kbArticles ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><ServerCrash className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">Checked at</span></div><p className="text-sm font-bold mt-1.5">{monitoring ? new Date(monitoring.checkedAt).toLocaleString('en-ZA') : '—'}</p></CardContent></Card>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input className="pl-9" placeholder="Search knowledge base..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="rounded-md border border-input bg-background px-3 py-2 text-sm" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="all">All categories</option>
          {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground"><BookOpenText className="h-12 w-12 mx-auto mb-4" /><p>No articles found.</p></CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(a => (
            <Card key={a.id} className="flex flex-col">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="capitalize">{a.category}</Badge>
                  <Badge variant={a.published ? 'default' : 'secondary'}>{a.published ? 'published' : 'draft'}</Badge>
                </div>
                <CardTitle className="text-base">{a.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-sm text-muted-foreground line-clamp-3 flex-1">{a.body}</p>
                <div className="flex items-center justify-between mt-4">
                  <Button size="sm" variant="ghost" onClick={() => helpful(a.id)}><Heart className="h-3.5 w-3.5 mr-1" /> {a.helpfulCount ?? 0} helpful</Button>
                  <Button size="sm" variant="outline" onClick={() => togglePublish(a)}>{a.published ? 'Unpublish' : 'Publish'}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent><DialogHeader><DialogTitle>New KB Article</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Category</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {CATEGORIES.map(c => <option key={c} value={c} className="capitalize">{c}</option>)}</select></div>
            <div><label className="text-sm font-medium">Body</label><Textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} rows={6} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={createArticle}>Publish</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
