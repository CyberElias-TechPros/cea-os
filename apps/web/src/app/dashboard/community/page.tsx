'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, MessageSquare, Users, CalendarDays, GraduationCap, Handshake, Heart, Search, UserPlus } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface ForumThread { id: string; categoryId: string; title: string; userId: string; isPinned: boolean; replyCount: number; viewCount: number; lastActivityAt: string; createdAt: string; }
interface Group { id: string; name: string; description?: string; type: string; memberCount: number; }
interface Event { id: string; title: string; type: string; format: string; startDate: string; location?: string; status: string; }
interface Scholarship { id: string; name: string; description?: string; fundAmount?: number; deadline?: string; }
interface Partnership { id: string; organizationName: string; contactPerson?: string; email?: string; type: string; status: string; startDate?: string; notes?: string; }
interface VolunteerOpportunity { id: string; title: string; description?: string; location?: string; skills?: string; commitment?: string; slots?: number; status: string; createdAt: string; }

export default function CommunityPage() {
  const [threads, setThreads] = useState<ForumThread[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [volunteerOpportunities, setVolunteerOpportunities] = useState<VolunteerOpportunity[]>([]);
  const [partnerships, setPartnerships] = useState<Partnership[]>([]);
  const [loading, setLoading] = useState(true);
  const [showThreadForm, setShowThreadForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [showPartnershipForm, setShowPartnershipForm] = useState(false);
  const [threadForm, setThreadForm] = useState({ categoryId: '', title: '', content: '' });
  const [eventForm, setEventForm] = useState({ title: '', description: '', type: 'workshop', format: 'virtual', startDate: '', location: '', virtualLink: '', maxAttendees: '' });
  const [groupForm, setGroupForm] = useState({ name: '', description: '', type: 'study', visibility: 'public' });
  const [volunteerForm, setVolunteerForm] = useState({ title: '', description: '', location: '', skills: '', commitment: '', slots: '1' });
  const [partnershipForm, setPartnershipForm] = useState({ organizationName: '', contactPerson: '', email: '', type: 'educational', notes: '' });
  const [selectedThread, setSelectedThread] = useState<ForumThread | null>(null);
  const [threadPosts, setThreadPosts] = useState<{ id: string; content: string; userId: string; createdAt: string }[]>([]);
  const [newPost, setNewPost] = useState('');

  const load = async () => {
    setLoading(true);
    const [tRes, gRes, eRes, sRes, vRes, pRes] = await Promise.all([
      api<ForumThread[]>('/v1/community/forums/threads'),
      api<Group[]>('/v1/community/groups'),
      api<Event[]>('/v1/community/events'),
      api<Scholarship[]>('/v1/community/scholarships'),
      api<VolunteerOpportunity[]>('/v1/community/volunteer/opportunities'),
      api<Partnership[]>('/v1/community/partnerships'),
    ]);
    if (tRes.success && tRes.data) setThreads(tRes.data);
    if (gRes.success && gRes.data) setGroups(gRes.data);
    if (eRes.success && eRes.data) setEvents(eRes.data);
    if (sRes.success && sRes.data) setScholarships(sRes.data);
    if (vRes.success && vRes.data) setVolunteerOpportunities(vRes.data);
    if (pRes.success && pRes.data) setPartnerships(pRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createThread = async () => {
    await api('/v1/community/forums/threads', { method: 'POST', body: JSON.stringify(threadForm) });
    setShowThreadForm(false);
    setThreadForm({ categoryId: '', title: '', content: '' });
    await load();
  };

  const createEvent = async () => {
    await api('/v1/community/events', { method: 'POST', body: JSON.stringify({ ...eventForm, maxAttendees: eventForm.maxAttendees ? Number(eventForm.maxAttendees) : undefined }) });
    setShowEventForm(false);
    setEventForm({ title: '', description: '', type: 'workshop', format: 'virtual', startDate: '', location: '', virtualLink: '', maxAttendees: '' });
    await load();
  };

  const createGroup = async () => {
    await api('/v1/community/groups', { method: 'POST', body: JSON.stringify(groupForm) });
    setShowGroupForm(false);
    setGroupForm({ name: '', description: '', type: 'study', visibility: 'public' });
    await load();
  };

  const openThread = async (thread: ForumThread) => {
    setSelectedThread(thread);
    const res = await api<{ posts: { id: string; content: string; userId: string; createdAt: string }[] }>(`/v1/community/forums/threads/${thread.id}`);
    if (res.success && res.data) setThreadPosts(res.data.posts || []);
  };

  const replyToThread = async () => {
    if (!selectedThread || !newPost.trim()) return;
    await api(`/v1/community/forums/threads/${selectedThread.id}/posts`, { method: 'POST', body: JSON.stringify({ content: newPost }) });
    setNewPost('');
    if (selectedThread) await openThread(selectedThread);
  };

  const registerEvent = async (eventId: string) => {
    await api(`/v1/community/events/${eventId}/register`, { method: 'POST' });
    await load();
  };

  const joinGroup = async (groupId: string) => {
    await api(`/v1/community/groups/${groupId}/join`, { method: 'POST' });
    await load();
  };

  const createVolunteerOpportunity = async () => {
    await api('/v1/community/volunteer/opportunities', { method: 'POST', body: JSON.stringify({ ...volunteerForm, slots: Number(volunteerForm.slots) }) });
    setShowVolunteerForm(false);
    setVolunteerForm({ title: '', description: '', location: '', skills: '', commitment: '', slots: '1' });
    await load();
  };

  const signUpVolunteer = async (id: string) => {
    await api(`/v1/community/volunteer/opportunities/${id}/signup`, { method: 'POST' });
    await load();
  };

  const createPartnership = async () => {
    await api('/v1/community/partnerships', { method: 'POST', body: JSON.stringify(partnershipForm) });
    setShowPartnershipForm(false);
    setPartnershipForm({ organizationName: '', contactPerson: '', email: '', type: 'educational', notes: '' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Community Hub</h1><p className="text-muted-foreground mt-1">Forums, groups, events, and more</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowGroupForm(true)}><Users className="h-4 w-4 mr-2" /> New Group</Button>
          <Button variant="outline" onClick={() => setShowEventForm(true)}><CalendarDays className="h-4 w-4 mr-2" /> New Event</Button>
          <Button variant="outline" onClick={() => setShowVolunteerForm(true)}><Heart className="h-4 w-4 mr-2" /> Add Volunteer Role</Button>
          <Button variant="outline" onClick={() => setShowPartnershipForm(true)}><Handshake className="h-4 w-4 mr-2" /> Add Partnership</Button>
          <Button onClick={() => setShowThreadForm(true)}><Plus className="h-4 w-4 mr-2" /> New Thread</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6 text-center"><MessageSquare className="h-6 w-6 mx-auto mb-2 text-blue-500" /><p className="text-2xl font-bold">{threads.length}</p><p className="text-xs text-muted-foreground">Discussions</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><Users className="h-6 w-6 mx-auto mb-2 text-green-500" /><p className="text-2xl font-bold">{groups.length}</p><p className="text-xs text-muted-foreground">Groups</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><CalendarDays className="h-6 w-6 mx-auto mb-2 text-purple-500" /><p className="text-2xl font-bold">{events.length}</p><p className="text-xs text-muted-foreground">Events</p></CardContent></Card>
        <Card><CardContent className="p-6 text-center"><GraduationCap className="h-6 w-6 mx-auto mb-2 text-orange-500" /><p className="text-2xl font-bold">{scholarships.length}</p><p className="text-xs text-muted-foreground">Scholarships</p></CardContent></Card>
      </div>

      <Tabs defaultValue="discussions">
        <TabsList>
          <TabsTrigger value="discussions">Discussions ({threads.length})</TabsTrigger>
          <TabsTrigger value="groups">Groups ({groups.length})</TabsTrigger>
          <TabsTrigger value="events">Events ({events.length})</TabsTrigger>
          <TabsTrigger value="scholarships">Scholarships ({scholarships.length})</TabsTrigger>
          <TabsTrigger value="volunteer">Volunteer ({volunteerOpportunities.length})</TabsTrigger>
          <TabsTrigger value="partners">Partners ({partnerships.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="discussions" className="space-y-3">
          {threads.length === 0 ? <div className="text-center py-12 text-muted-foreground"><MessageSquare className="h-12 w-12 mx-auto mb-4" /><p>No discussions yet. Start a new thread!</p></div> : (
            threads.map(t => (
              <Card key={t.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => openThread(t)}>
                <CardContent className="flex items-center justify-between py-4">
                  <div>
                    <div className="flex items-center gap-2"><p className="font-medium">{t.title}</p>{t.isPinned && <Badge variant="outline">Pinned</Badge>}</div>
                    <p className="text-xs text-muted-foreground mt-1">{t.replyCount} replies · {t.viewCount} views · {t.lastActivityAt ? new Date(t.lastActivityAt).toLocaleDateString() : ''}</p>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="groups">
          {groups.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Users className="h-12 w-12 mx-auto mb-4" /><p>No groups yet.</p></div> : (
            <div className="grid gap-4 md:grid-cols-2">{groups.map(g => (
              <Card key={g.id}>
                <CardHeader><CardTitle className="text-lg">{g.name}</CardTitle><CardDescription>{g.description}</CardDescription></CardHeader>
                <CardContent className="flex items-center justify-between"><Badge variant="secondary">{g.type}</Badge><div className="flex items-center gap-2"><span className="text-sm text-muted-foreground">{g.memberCount} members</span><Button size="sm" variant="outline" onClick={() => joinGroup(g.id)}><UserPlus className="h-3 w-3 mr-1" /> Join</Button></div></CardContent>
              </Card>
            ))}</div>
          )}
        </TabsContent>

        <TabsContent value="events">
          {events.length === 0 ? <div className="text-center py-12 text-muted-foreground"><CalendarDays className="h-12 w-12 mx-auto mb-4" /><p>No upcoming events.</p></div> : (
            <div className="grid gap-4 md:grid-cols-2">{events.map(e => (
              <Card key={e.id}>
                <CardHeader><CardTitle className="text-lg">{e.title}</CardTitle><CardDescription>{e.type} · {e.format}</CardDescription></CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm"><strong>Date:</strong> {new Date(e.startDate).toLocaleString()}</p>
                  {e.location && <p className="text-sm"><strong>Location:</strong> {e.location}</p>}
                  <Button size="sm" onClick={() => registerEvent(e.id)}>Register</Button>
                </CardContent>
              </Card>
            ))}</div>
          )}
        </TabsContent>

        <TabsContent value="scholarships">
          {scholarships.length === 0 ? <div className="text-center py-12 text-muted-foreground"><GraduationCap className="h-12 w-12 mx-auto mb-4" /><p>No scholarships available.</p></div> : (
            <div className="grid gap-4 md:grid-cols-2">{scholarships.map(s => (
              <Card key={s.id}>
                <CardHeader><CardTitle className="text-lg">{s.name}</CardTitle><CardDescription>{s.description}</CardDescription></CardHeader>
                <CardContent className="space-y-1 text-sm">
                  {s.fundAmount && <p><strong>Amount:</strong> {s.fundAmount.toLocaleString()} ZAR</p>}
                  {s.deadline && <p><strong>Deadline:</strong> {new Date(s.deadline).toLocaleDateString()}</p>}
                </CardContent>
              </Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="volunteer">
          {volunteerOpportunities.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Heart className="h-12 w-12 mx-auto mb-4" /><p>No volunteer opportunities yet. Add one to mobilise the community.</p></div> : (
            <div className="grid gap-4 md:grid-cols-2">{volunteerOpportunities.map(v => (
              <Card key={v.id}>
                <CardHeader><CardTitle className="text-lg">{v.title}</CardTitle><CardDescription>{v.description}</CardDescription></CardHeader>
                <CardContent className="space-y-1 text-sm">
                  {v.location && <p><strong>Location:</strong> {v.location}</p>}
                  {v.skills && <p><strong>Skills:</strong> {v.skills}</p>}
                  {v.commitment && <p><strong>Commitment:</strong> {v.commitment}</p>}
                  {v.slots !== undefined && <p><strong>Slots:</strong> {v.slots}</p>}
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant={v.status === 'open' ? 'success' : 'outline'} className="text-xs capitalize">{v.status}</Badge>
                    {v.status === 'open' && <Button size="sm" variant="outline" onClick={() => signUpVolunteer(v.id)}>Sign up</Button>}
                  </div>
                </CardContent>
              </Card>
            ))}</div>
          )}
        </TabsContent>

        <TabsContent value="partners">
          {partnerships.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Handshake className="h-12 w-12 mx-auto mb-4" /><p>No partnerships yet. Register an organisation you're working with.</p></div> : (
            <div className="grid gap-4 md:grid-cols-2">{partnerships.map(p => (
              <Card key={p.id}>
                <CardHeader><CardTitle className="text-lg">{p.organizationName}</CardTitle><CardDescription className="capitalize">{p.type.replace('_', ' ')} partnership</CardDescription></CardHeader>
                <CardContent className="space-y-1 text-sm">
                  {p.contactPerson && <p><strong>Contact:</strong> {p.contactPerson}{p.email ? ` · ${p.email}` : ''}</p>}
                  {p.startDate && <p><strong>Since:</strong> {new Date(p.startDate).toLocaleDateString()}</p>}
                  {p.notes && <p className="text-muted-foreground">{p.notes}</p>}
                  <div className="pt-1"><Badge variant={p.status === 'active' ? 'success' : 'outline'} className="text-xs capitalize">{p.status}</Badge></div>
                </CardContent>
              </Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedThread} onOpenChange={open => { if (!open) setSelectedThread(null); }}>
        <DialogContent className="max-w-2xl">{selectedThread && (
          <>
            <DialogHeader><DialogTitle>{selectedThread.title}</DialogTitle></DialogHeader>
            <div className="space-y-4 max-h-[40vh] overflow-y-auto">
              {threadPosts.length === 0 ? <p className="text-sm text-muted-foreground">No replies yet.</p> : (
                threadPosts.map(p => <div key={p.id} className="p-3 rounded-lg bg-muted"><p className="text-sm">{p.content}</p><p className="text-xs text-muted-foreground mt-1">{new Date(p.createdAt).toLocaleString()}</p></div>)
              )}
            </div>
            <div className="flex gap-2"><Textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="Write a reply..." rows={2} className="flex-1" /><Button size="sm" onClick={replyToThread}>Reply</Button></div>
          </>
        )}</DialogContent>
      </Dialog>

      <Dialog open={showThreadForm} onOpenChange={setShowThreadForm}>
        <DialogContent><DialogHeader><DialogTitle>New Discussion Thread</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={threadForm.title} onChange={e => setThreadForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Content *</label><Textarea value={threadForm.content} onChange={e => setThreadForm(f => ({ ...f, content: e.target.value }))} rows={4} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowThreadForm(false)}>Cancel</Button><Button onClick={createThread}>Post</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEventForm} onOpenChange={setShowEventForm}>
        <DialogContent><DialogHeader><DialogTitle>Create Event</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={eventForm.title} onChange={e => setEventForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={eventForm.description} onChange={e => setEventForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventForm.type} onChange={e => setEventForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="workshop">Workshop</option><option value="webinar">Webinar</option><option value="networking">Networking</option><option value="social">Social</option></select></div>
              <div><label className="text-sm font-medium">Format</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={eventForm.format} onChange={e => setEventForm(f => ({ ...f, format: e.target.value }))}>
                  <option value="virtual">Virtual</option><option value="in_person">In Person</option><option value="hybrid">Hybrid</option></select></div>
            </div>
            <div><label className="text-sm font-medium">Start Date/Time *</label><Input type="datetime-local" value={eventForm.startDate} onChange={e => setEventForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Location</label><Input value={eventForm.location} onChange={e => setEventForm(f => ({ ...f, location: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowEventForm(false)}>Cancel</Button><Button onClick={createEvent}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showGroupForm} onOpenChange={setShowGroupForm}>
        <DialogContent><DialogHeader><DialogTitle>Create Group</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Name *</label><Input value={groupForm.name} onChange={e => setGroupForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={groupForm.description} onChange={e => setGroupForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={groupForm.type} onChange={e => setGroupForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="study">Study</option><option value="project">Project</option><option value="social">Social</option><option value="alumni">Alumni</option></select></div>
              <div><label className="text-sm font-medium">Visibility</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={groupForm.visibility} onChange={e => setGroupForm(f => ({ ...f, visibility: e.target.value }))}>
                  <option value="public">Public</option><option value="private">Private</option></select></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowGroupForm(false)}>Cancel</Button><Button onClick={createGroup}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showVolunteerForm} onOpenChange={setShowVolunteerForm}>
        <DialogContent><DialogHeader><DialogTitle>Add Volunteer Opportunity</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={volunteerForm.title} onChange={e => setVolunteerForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={volunteerForm.description} onChange={e => setVolunteerForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Location</label><Input value={volunteerForm.location} onChange={e => setVolunteerForm(f => ({ ...f, location: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Slots</label><Input type="number" value={volunteerForm.slots} onChange={e => setVolunteerForm(f => ({ ...f, slots: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Skills needed</label><Input value={volunteerForm.skills} onChange={e => setVolunteerForm(f => ({ ...f, skills: e.target.value }))} placeholder="e.g. Teaching, Mentoring, Events" /></div>
            <div><label className="text-sm font-medium">Commitment</label><Input value={volunteerForm.commitment} onChange={e => setVolunteerForm(f => ({ ...f, commitment: e.target.value }))} placeholder="e.g. 4 hours/week for 8 weeks" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowVolunteerForm(false)}>Cancel</Button><Button onClick={createVolunteerOpportunity}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showPartnershipForm} onOpenChange={setShowPartnershipForm}>
        <DialogContent><DialogHeader><DialogTitle>Register Partnership</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Organization *</label><Input value={partnershipForm.organizationName} onChange={e => setPartnershipForm(f => ({ ...f, organizationName: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Contact person</label><Input value={partnershipForm.contactPerson} onChange={e => setPartnershipForm(f => ({ ...f, contactPerson: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Email</label><Input type="email" value={partnershipForm.email} onChange={e => setPartnershipForm(f => ({ ...f, email: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={partnershipForm.type} onChange={e => setPartnershipForm(f => ({ ...f, type: e.target.value }))}>
                <option value="educational">Educational</option><option value="corporate">Corporate</option><option value="government">Government</option><option value="ngo">NGO</option><option value="other">Other</option></select></div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={partnershipForm.notes} onChange={e => setPartnershipForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowPartnershipForm(false)}>Cancel</Button><Button onClick={createPartnership}>Register</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
