'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import { Plus, Loader2, TicketCheck, MessageSquare, Search } from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface Ticket {
  id: string; title: string; description: string; category: string;
  priority: string; status: string; requesterId: string; assigneeId?: string;
  createdAt: string; messages?: TicketMessage[];
}

interface TicketMessage {
  id: string; ticketId: string; userId: string; message: string;
  isInternal: boolean; createdAt: string;
}

export default function TicketsPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [form, setForm] = useState({ title: '', description: '', category: 'general', priority: 'medium' });

  const load = async () => {
    setLoading(true);
    const res = await api<Ticket[]>('/v1/tickets/my');
    if (res.success && res.data) setTickets(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createTicket = async () => {
    await api('/v1/tickets', { method: 'POST', body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ title: '', description: '', category: 'general', priority: 'medium' });
    await load();
  };

  const openTicket = async (ticket: Ticket) => {
    const res = await api<{ messages: TicketMessage[] }>(`/v1/tickets/${ticket.id}`);
    if (res.success && res.data) {
      setSelectedTicket({ ...ticket, messages: res.data.messages || [] });
    }
  };

  const sendMessage = async () => {
    if (!selectedTicket || !newMessage.trim()) return;
    await api(`/v1/tickets/${selectedTicket.id}/messages`, { method: 'POST', body: JSON.stringify({ message: newMessage }) });
    setNewMessage('');
    if (selectedTicket) await openTicket(selectedTicket);
  };

  const resolveTicket = async () => {
    if (!selectedTicket) return;
    await api(`/v1/tickets/${selectedTicket.id}/resolve`, { method: 'POST' });
    if (selectedTicket) await openTicket(selectedTicket);
    await load();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  const priorityColors: Record<string, string> = { low: 'secondary', medium: 'default', high: 'destructive', urgent: 'destructive' };
  const statusColors: Record<string, string> = { open: 'default', in_progress: 'default', waiting_on_customer: 'secondary', resolved: 'outline', closed: 'outline' };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Support Tickets</h1>
          <p className="text-muted-foreground mt-1">Submit and track support requests</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> New Ticket</Button>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <TicketCheck className="h-12 w-12 mx-auto mb-4" />
          <p>No tickets yet. Submit a support request if you need help.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {tickets.map(t => (
            <Card key={t.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openTicket(t)}>
              <CardContent className="flex items-center justify-between py-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{t.title}</p>
                    <Badge variant={(statusColors[t.status] || 'secondary') as any}>{t.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{t.description.substring(0, 100)}{t.description.length > 100 ? '...' : ''}</p>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Badge variant={(priorityColors[t.priority] || 'secondary') as any}>{t.priority}</Badge>
                  <span className="text-xs text-muted-foreground">{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedTicket} onOpenChange={open => { if (!open) setSelectedTicket(null); }}>
        <DialogContent className="max-w-2xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{selectedTicket.title}</DialogTitle>
                  <Badge variant={(statusColors[selectedTicket.status] || 'secondary') as any}>{selectedTicket.status}</Badge>
                </div>
                <DialogDescription>{selectedTicket.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 max-h-[40vh] overflow-y-auto">
                {(!selectedTicket.messages || selectedTicket.messages.length === 0) ? (
                  <p className="text-sm text-muted-foreground">No messages yet.</p>
                ) : (
                  selectedTicket.messages.map(m => (
                    <div key={m.id} className={`p-3 rounded-lg ${m.isInternal ? 'bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800' : 'bg-muted'}`}>
                      <p className="text-sm">{m.message}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {m.isInternal ? '[Internal] ' : ''}{new Date(m.createdAt).toLocaleString()}
                      </p>
                    </div>
                  ))
                )}
              </div>
              {selectedTicket.status !== 'resolved' && selectedTicket.status !== 'closed' && (
                <div className="flex gap-2">
                  <Textarea
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                    placeholder="Type your reply..."
                    rows={2}
                    className="flex-1"
                  />
                  <div className="flex flex-col gap-1">
                    <Button size="sm" onClick={sendMessage}><MessageSquare className="h-3 w-3 mr-1" /> Send</Button>
                    <Button size="sm" variant="outline" onClick={resolveTicket}><TicketCheck className="h-3 w-3 mr-1" /> Resolve</Button>
                  </div>
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Support Ticket</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Brief summary of the issue" /></div>
            <div><label className="text-sm font-medium">Description *</label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Describe the issue in detail" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Category</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="technical">Technical</option><option value="billing">Billing</option><option value="account">Account</option><option value="course_content">Course Content</option><option value="general">General</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={createTicket}>Submit</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
