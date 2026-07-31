'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button, Card, CardContent, Badge, Input } from '@cea/ui';
import { api } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';
import { CalendarDays, MapPin, Video, Loader2, Search, Users, ArrowRight, CheckCircle2, Laptop } from 'lucide-react';

interface EventItem {
  id: string; title: string; description?: string; slug: string;
  type: string; format: string; startDate: string; endDate?: string;
  location?: string; virtualLink?: string; maxAttendees?: number; status: string;
}

const TYPE_LABELS: Record<string, string> = {
  workshop: 'Workshop', webinar: 'Webinar', networking: 'Networking', social: 'Social',
  academic: 'Academic', career_fair: 'Career Fair', other: 'Other',
};

const TYPE_COLORS: Record<string, string> = {
  workshop: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',
  webinar: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20',
  networking: 'bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20',
  social: 'bg-pink-500/10 text-pink-600 dark:text-pink-400 border-pink-500/20',
  academic: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  career_fair: 'bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20',
  other: 'bg-slate-500/10 text-slate-600 dark:text-slate-400 border-slate-500/20',
};

export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [registered, setRegistered] = useState<string[]>([]);
  const [registering, setRegistering] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<EventItem[]>('/v1/community/events');
    if (res.success && res.data) setEvents(res.data.filter(e => e.status === 'published'));
    if (user) {
      const regRes = await api<{ eventId: string }[]>('/v1/community/events/registered');
      if (regRes.success && regRes.data) setRegistered(regRes.data.map(r => r.eventId));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => { load(); }, [load]);

  const register = async (eventId: string) => {
    if (!user) return;
    setRegistering(eventId);
    const res = await api(`/v1/community/events/${eventId}/register`, { method: 'POST' });
    setRegistering(null);
    if (res.success) {
      setRegistered(prev => [...prev, eventId]);
    }
  };

  const upcoming = useMemo(() => {
    const now = Date.now();
    return events
      .filter(e => new Date(e.startDate).getTime() >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [events]);

  const past = useMemo(() => {
    const now = Date.now();
    return events
      .filter(e => new Date(e.startDate).getTime() < now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [events]);

  const filtered = upcoming.filter(e =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    (e.description || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-80 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent -z-10" />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Community Calendar</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Events at CEA</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Workshops, webinars, career fairs and networking — learn, connect and grow with the CEA community.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search events..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        {upcoming.length === 0 ? (
          <Card><CardContent className="p-14 text-center">
            <CalendarDays className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="mt-4 text-muted-foreground">No upcoming events right now — check back soon.</p>
          </CardContent></Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((e, i) => {
              const isRegistered = registered.includes(e.id);
              return (
                <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.06 }}>
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="p-6 pb-4">
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <Badge variant="outline" className={`text-xs ${TYPE_COLORS[e.type] ?? TYPE_COLORS.other}`}>{TYPE_LABELS[e.type] ?? e.type}</Badge>
                          <span className="text-xs text-muted-foreground font-medium">{e.format.replace('_', ' ')}</span>
                        </div>
                        <h3 className="font-bold text-lg leading-snug">{e.title}</h3>
                        {e.description && <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{e.description}</p>}
                      </div>
                      <div className="px-6 py-4 border-t space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" />
                          {new Date(e.startDate).toLocaleDateString('en-ZA', { weekday: 'short', day: 'numeric', month: 'short' })}
                          {' · '}
                          {new Date(e.startDate).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                        {e.location && <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {e.location}</div>}
                        {e.format === 'virtual' && <div className="flex items-center gap-2"><Video className="h-4 w-4" /> Online via CEA</div>}
                        {e.maxAttendees !== undefined && e.maxAttendees !== null && (
                          <div className="flex items-center gap-2"><Users className="h-4 w-4" /> Up to {e.maxAttendees} attendees</div>
                        )}
                      </div>
                      <div className="p-6 pt-4">
                        {isRegistered ? (
                          <Button variant="outline" className="w-full" disabled>
                            <CheckCircle2 className="mr-2 h-4 w-4 text-green-500" /> Registered
                          </Button>
                        ) : user ? (
                          <Button className="w-full" disabled={registering === e.id} onClick={() => register(e.id)}>
                            {registering === e.id ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Register
                          </Button>
                        ) : (
                          <Link href="/login?next=/events" className="block">
                            <Button variant="outline" className="w-full">Log in to register</Button>
                          </Link>
                        )}
                        {isRegistered && e.virtualLink && (
                          <a href={e.virtualLink} target="_blank" rel="noopener noreferrer" className="block mt-2">
                            <Button size="sm" className="w-full"><Laptop className="mr-2 h-4 w-4" /> Join live session</Button>
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {past.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold mb-6">Past events</h2>
            <div className="space-y-3">
              {past.slice(0, 5).map(e => (
                <Card key={e.id} className="opacity-70">
                  <CardContent className="p-4 flex flex-wrap items-center gap-x-4 gap-y-1">
                    <span className="text-sm text-muted-foreground shrink-0">{new Date(e.startDate).toLocaleDateString()}</span>
                    <span className="font-medium">{e.title}</span>
                    <Badge variant="outline" className="text-xs shrink-0">{TYPE_LABELS[e.type] ?? e.type}</Badge>
                    <span className="ml-auto text-xs text-muted-foreground flex items-center gap-1 shrink-0"><ArrowRight className="h-3 w-3" /> Completed</span>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
