'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { DoorOpen, CalendarRange, Wrench, Loader2, Plus, CheckCircle2, XCircle, Building2, Clock, AlertTriangle } from 'lucide-react';

interface Room { id: string; name: string; code: string; type: string; capacity?: number; location?: string; amenities?: string[]; status: string }
interface Booking { id: string; roomId: string; bookerId: string; title: string; purpose?: string; startTime: string; endTime: string; status: string; roomName?: string }
interface WorkOrder { id: string; title: string; description?: string; category: string; priority: string; status: string; location?: string; reportedBy?: string; dueDate?: string; createdAt: string }

const STATUS_COLORS: Record<string, 'success' | 'warning' | 'destructive' | 'outline' | 'default' | 'secondary'> = {
  available: 'success', approved: 'success', resolved: 'success', closed: 'outline',
  pending: 'warning', in_progress: 'warning', on_hold: 'secondary', maintenance: 'warning',
  declined: 'destructive', cancelled: 'destructive', open: 'default',
};

export default function FacilitiesPage() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [roomForm, setRoomForm] = useState({ name: '', code: '', type: 'classroom', capacity: '20', location: '', amenities: '', status: 'available' });
  const [bookingForm, setBookingForm] = useState({ roomId: '', title: '', purpose: '', startTime: '', endTime: '' });
  const [orderForm, setOrderForm] = useState({ title: '', description: '', category: 'other', priority: 'medium', location: '' });
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [rRes, bRes, wRes] = await Promise.all([
      api<Room[]>('/v1/facilities/rooms'),
      api<Booking[]>('/v1/facilities/bookings'),
      api<WorkOrder[]>('/v1/facilities/work-orders'),
    ]);
    if (rRes.success && rRes.data) setRooms(rRes.data);
    if (bRes.success && bRes.data) setBookings(bRes.data);
    if (wRes.success && wRes.data) setWorkOrders(wRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const createRoom = async () => {
    const res = await api('/v1/facilities/rooms', {
      method: 'POST',
      body: JSON.stringify({ ...roomForm, capacity: Number(roomForm.capacity), amenities: roomForm.amenities ? roomForm.amenities.split(',').map(s => s.trim()) : [] }),
    });
    setShowRoomForm(false);
    setRoomForm({ name: '', code: '', type: 'classroom', capacity: '20', location: '', amenities: '', status: 'available' });
    if (res.success) { setMsg({ ok: true, text: 'Room added' }); await load(); } else { setMsg({ ok: false, text: res.error?.message || 'Failed' }); }
  };

  const createBooking = async () => {
    const res = await api('/v1/facilities/bookings', { method: 'POST', body: JSON.stringify(bookingForm) });
    setShowBookingForm(false);
    setBookingForm({ roomId: '', title: '', purpose: '', startTime: '', endTime: '' });
    if (res.success) { setMsg({ ok: true, text: 'Booking requested' }); await load(); } else { setMsg({ ok: false, text: res.error?.message || 'Failed' }); }
  };

  const setBookingStatus = async (id: string, status: string) => {
    await api(`/v1/facilities/bookings/${id}/status`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  const createOrder = async () => {
    const res = await api('/v1/facilities/work-orders', { method: 'POST', body: JSON.stringify(orderForm) });
    setShowOrderForm(false);
    setOrderForm({ title: '', description: '', category: 'other', priority: 'medium', location: '' });
    if (res.success) { setMsg({ ok: true, text: 'Work order created' }); await load(); } else { setMsg({ ok: false, text: res.error?.message || 'Failed' }); }
  };

  const setOrderStatus = async (id: string, status: string) => {
    await api(`/v1/facilities/work-orders/${id}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const myBookings = bookings.filter(b => b.bookerId === user?.id);
  const openOrders = workOrders.filter(w => w.status === 'open' || w.status === 'in_progress');

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Facilities & Ops</h1>
          <p className="text-muted-foreground mt-1">Room bookings, maintenance and work orders.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" onClick={() => setShowRoomForm(true)}><Plus className="h-4 w-4 mr-2" /> Room</Button>
          <Button variant="outline" onClick={() => setShowBookingForm(true)}><CalendarRange className="h-4 w-4 mr-2" /> Book room</Button>
          <Button onClick={() => setShowOrderForm(true)}><Wrench className="h-4 w-4 mr-2" /> Work order</Button>
        </div>
      </div>

      {msg && (
        <div className={`mb-6 rounded-xl border p-4 text-sm font-medium ${msg.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300'}`}>{msg.text}</div>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card><CardContent className="p-5"><div className="text-3xl font-bold">{rooms.length}</div><div className="text-sm text-muted-foreground flex items-center gap-1"><DoorOpen className="h-3.5 w-3.5" /> Rooms</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="text-3xl font-bold">{bookings.filter(b => b.status === 'pending').length}</div><div className="text-sm text-muted-foreground flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> Pending bookings</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="text-3xl font-bold">{openOrders.length}</div><div className="text-sm text-muted-foreground flex items-center gap-1"><Wrench className="h-3.5 w-3.5" /> Open work orders</div></CardContent></Card>
        <Card><CardContent className="p-5"><div className="text-3xl font-bold text-amber-600">{workOrders.filter(w => w.priority === 'urgent' && w.status !== 'resolved' && w.status !== 'closed').length}</div><div className="text-sm text-muted-foreground flex items-center gap-1"><AlertTriangle className="h-3.5 w-3.5" /> Urgent</div></CardContent></Card>
      </div>

      <Tabs defaultValue="rooms">
        <TabsList>
          <TabsTrigger value="rooms">Rooms ({rooms.length})</TabsTrigger>
          <TabsTrigger value="bookings">Bookings ({bookings.length})</TabsTrigger>
          <TabsTrigger value="mine">My bookings ({myBookings.length})</TabsTrigger>
          <TabsTrigger value="orders">Work orders ({workOrders.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="rooms" className="space-y-3">
          {rooms.length === 0 ? (
            <Card><CardContent className="p-12 text-center"><DoorOpen className="h-12 w-12 text-muted-foreground mx-auto" /><p className="mt-4 text-muted-foreground">No rooms registered yet.</p></CardContent></Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms.map(r => (
                <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="h-full">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="font-semibold">{r.name}</div>
                          <div className="text-xs text-muted-foreground font-mono mt-0.5">{r.code} · {r.type.replace('_', ' ')}</div>
                        </div>
                        <Badge variant={STATUS_COLORS[r.status] ?? 'outline'} className="text-xs capitalize">{r.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-3 space-y-1">
                        {r.capacity !== undefined && r.capacity !== null && <div className="flex items-center gap-2"><Building2 className="h-3.5 w-3.5" /> Capacity: {r.capacity}</div>}
                        {r.location && <div className="flex items-center gap-2"><DoorOpen className="h-3.5 w-3.5" /> {r.location}</div>}
                      </div>
                      {r.amenities && r.amenities.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {r.amenities.map(a => <Badge key={a} variant="outline" className="text-[10px]">{a}</Badge>)}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="bookings" className="space-y-3">
          {bookings.length === 0 ? (
            <Card><CardContent className="p-12 text-center"><CalendarRange className="h-12 w-12 text-muted-foreground mx-auto" /><p className="mt-4 text-muted-foreground">No bookings yet.</p></CardContent></Card>
          ) : (
            bookings.map(b => (
              <Card key={b.id}>
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{b.title}</span>
                      <Badge variant={STATUS_COLORS[b.status] ?? 'outline'} className="text-xs capitalize">{b.status}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {b.roomName} · {new Date(b.startTime).toLocaleString('en-ZA', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })} → {new Date(b.endTime).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                      {b.bookerId === user?.id && <span className="ml-2 text-xs text-primary">(yours)</span>}
                    </div>
                  </div>
                  {b.status === 'pending' && (
                    <div className="flex gap-2 shrink-0">
                      <Button size="sm" variant="outline" onClick={() => setBookingStatus(b.id, 'approved')}><CheckCircle2 className="h-4 w-4 mr-1 text-green-600" /> Approve</Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setBookingStatus(b.id, 'declined')}><XCircle className="h-4 w-4 mr-1" /> Decline</Button>
                    </div>
                  )}
                  {b.bookerId === user?.id && (b.status === 'pending' || b.status === 'approved') && (
                    <Button size="sm" variant="ghost" className="text-destructive shrink-0" onClick={() => setBookingStatus(b.id, 'cancelled')}>Cancel booking</Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="mine" className="space-y-3">
          {myBookings.length === 0 ? (
            <Card><CardContent className="p-12 text-center text-muted-foreground">You haven't made any bookings.</CardContent></Card>
          ) : (
            myBookings.map(b => (
              <Card key={b.id}>
                <CardContent className="p-4 flex items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2"><span className="font-semibold">{b.title}</span><Badge variant={STATUS_COLORS[b.status] ?? 'outline'} className="text-xs capitalize">{b.status}</Badge></div>
                    <div className="text-sm text-muted-foreground mt-1">{b.roomName} · {new Date(b.startTime).toLocaleString()}</div>
                  </div>
                  {(b.status === 'pending' || b.status === 'approved') && (
                    <Button size="sm" variant="ghost" className="text-destructive shrink-0" onClick={() => setBookingStatus(b.id, 'cancelled')}>Cancel</Button>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="orders" className="space-y-3">
          {workOrders.length === 0 ? (
            <Card><CardContent className="p-12 text-center"><Wrench className="h-12 w-12 text-muted-foreground mx-auto" /><p className="mt-4 text-muted-foreground">No work orders yet. Report an issue to keep the campus running.</p></CardContent></Card>
          ) : (
            workOrders.map(w => (
              <Card key={w.id}>
                <CardContent className="p-4 flex flex-col md:flex-row md:items-center gap-3 justify-between">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="font-semibold">{w.title}</span>
                      <Badge variant={w.priority === 'urgent' ? 'destructive' : w.priority === 'high' ? 'warning' : 'outline'} className="text-xs capitalize">{w.priority}</Badge>
                      <Badge variant={STATUS_COLORS[w.status] ?? 'outline'} className="text-xs capitalize">{w.status.replace('_', ' ')}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground mt-1 flex flex-wrap gap-x-4 gap-y-0.5">
                      <span className="capitalize">{w.category}</span>
                      {w.location && <span>{w.location}</span>}
                      {w.reportedBy && <span>by {w.reportedBy}</span>}
                      <span className="text-xs">{new Date(w.createdAt).toLocaleDateString()}</span>
                    </div>
                    {w.description && <p className="text-sm text-muted-foreground mt-1">{w.description}</p>}
                  </div>
                  {(w.status === 'open' || w.status === 'in_progress' || w.status === 'on_hold') && (
                    <div className="flex flex-wrap gap-2 shrink-0">
                      {w.status === 'open' && <Button size="sm" variant="outline" onClick={() => setOrderStatus(w.id, 'in_progress')}>Start</Button>}
                      {w.status === 'in_progress' && <Button size="sm" variant="outline" onClick={() => setOrderStatus(w.id, 'on_hold')}>On hold</Button>}
                      <Button size="sm" onClick={() => setOrderStatus(w.id, 'resolved')}><CheckCircle2 className="h-4 w-4 mr-1" /> Resolve</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showRoomForm} onOpenChange={setShowRoomForm}>
        <DialogContent><DialogHeader><DialogTitle>Add Room</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Name *</label><Input value={roomForm.name} onChange={e => setRoomForm(f => ({ ...f, name: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Code *</label><Input value={roomForm.code} onChange={e => setRoomForm(f => ({ ...f, code: e.target.value }))} placeholder="e.g. LAB-02" /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Type</label>
                <select className="mt-1 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" value={roomForm.type} onChange={e => setRoomForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="classroom">Classroom</option><option value="lab">Lab</option><option value="meeting">Meeting</option><option value="event_hall">Event hall</option><option value="study">Study</option><option value="other">Other</option></select></div>
              <div><label className="text-sm font-medium">Capacity</label><Input type="number" value={roomForm.capacity} onChange={e => setRoomForm(f => ({ ...f, capacity: e.target.value }))} /></div>
            </div>
            <div><label className="text-sm font-medium">Location</label><Input value={roomForm.location} onChange={e => setRoomForm(f => ({ ...f, location: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Amenities (comma-separated)</label><Input value={roomForm.amenities} onChange={e => setRoomForm(f => ({ ...f, amenities: e.target.value }))} placeholder="Projector, Whiteboard, AC" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowRoomForm(false)}>Cancel</Button><Button onClick={createRoom}>Add room</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent><DialogHeader><DialogTitle>Book a Room</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Room *</label>
              <select className="mt-1 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" value={bookingForm.roomId} onChange={e => setBookingForm(f => ({ ...f, roomId: e.target.value }))}>
                <option value="">Select a room...</option>
                {rooms.filter(r => r.status === 'available').map(r => <option key={r.id} value={r.id}>{r.name} ({r.code})</option>)}
              </select></div>
            <div><label className="text-sm font-medium">Title *</label><Input value={bookingForm.title} onChange={e => setBookingForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Python bootcamp session" /></div>
            <div><label className="text-sm font-medium">Purpose</label><Textarea value={bookingForm.purpose} onChange={e => setBookingForm(f => ({ ...f, purpose: e.target.value }))} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Start *</label><Input type="datetime-local" value={bookingForm.startTime} onChange={e => setBookingForm(f => ({ ...f, startTime: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">End *</label><Input type="datetime-local" value={bookingForm.endTime} onChange={e => setBookingForm(f => ({ ...f, endTime: e.target.value }))} /></div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowBookingForm(false)}>Cancel</Button><Button onClick={createBooking}>Request booking</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent><DialogHeader><DialogTitle>Report a Work Order</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={orderForm.title} onChange={e => setOrderForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. AC not working in Lab 2" /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={orderForm.description} onChange={e => setOrderForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Category</label>
                <select className="mt-1 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" value={orderForm.category} onChange={e => setOrderForm(f => ({ ...f, category: e.target.value }))}>
                  <option value="plumbing">Plumbing</option><option value="electrical">Electrical</option><option value="it">IT</option><option value="cleaning">Cleaning</option><option value="furniture">Furniture</option><option value="other">Other</option></select></div>
              <div><label className="text-sm font-medium">Priority</label>
                <select className="mt-1 flex h-10 w-full rounded-lg border bg-background px-3 text-sm" value={orderForm.priority} onChange={e => setOrderForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option></select></div>
            </div>
            <div><label className="text-sm font-medium">Location</label><Input value={orderForm.location} onChange={e => setOrderForm(f => ({ ...f, location: e.target.value }))} placeholder="e.g. 2nd floor, Room 204" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowOrderForm(false)}>Cancel</Button><Button onClick={createOrder}>Create order</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
