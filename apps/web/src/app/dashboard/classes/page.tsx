'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { Video, MonitorPlay, Loader2, CalendarDays, Clock, Mic, MessageSquare, Users, Hand, Laptop } from 'lucide-react';

interface Session {
  id: string; title: string; type: string; format: string; startDate: string; endDate?: string;
  virtualLink?: string; description?: string; maxAttendees?: number; status: string;
}

export default function ClassesPage() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<Session[]>('/v1/community/events');
    if (res.success && res.data) {
      setSessions(res.data.filter(s => s.status === 'published'));
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const now = Date.now();

  const liveNow = useMemo(() => sessions.filter(s =>
    s.format !== 'in_person' && new Date(s.startDate).getTime() <= now &&
    (!s.endDate || new Date(s.endDate).getTime() >= now)
  ), [sessions, now]);

  const upcoming = useMemo(() => sessions
    .filter(s => s.format !== 'in_person' && new Date(s.startDate).getTime() > now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
  , [sessions, now]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Live Classes</h1>
        <p className="text-muted-foreground mt-1">Interactive online sessions with instructors and peers.</p>
      </div>

      <Card className="mb-8 overflow-hidden border-primary/30">
        <CardContent className="p-0">
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 md:p-12">
            <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #6366f1 0, transparent 40%), radial-gradient(circle at 80% 20%, #22d3ee 0, transparent 35%), radial-gradient(circle at 70% 80%, #a855f7 0, transparent 40%)' }} />
            <div className="relative">
              <div className="flex items-center gap-3 mb-6">
                {liveNow.length > 0 ? (
                  <Badge className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" /> LIVE NOW</Badge>
                ) : (
                  <Badge variant="outline" className="flex items-center gap-1.5 text-white/80"><MonitorPlay className="h-3 w-3" /> CLASSROOM</Badge>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                {liveNow.length > 0 ? liveNow[0]!.title : 'The live classroom awaits'}
              </h2>
              <p className="text-white/70 mt-2 max-w-xl">
                {liveNow.length > 0
                  ? 'Your instructor is live. Join now to participate in real time.'
                  : 'Join scheduled sessions from here. Your instructor will bring lessons to life with interactive tools — chat, questions, polls and more.'}
              </p>
              <div className="flex flex-wrap gap-3 mt-6">
                {liveNow.length > 0 && liveNow[0]!.virtualLink ? (
                  <a href={liveNow[0]!.virtualLink} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-white text-slate-900 hover:bg-white/90">
                      <Video className="mr-2 h-4 w-4" /> Join session
                    </Button>
                  </a>
                ) : (
                  <Button disabled className="opacity-60"><Clock className="mr-2 h-4 w-4" /> No sessions live right now</Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10 text-white/60">
                <div className="flex items-center gap-2 text-sm"><Mic className="h-4 w-4" /> Live audio & video</div>
                <div className="flex items-center gap-2 text-sm"><MessageSquare className="h-4 w-4" /> Real-time chat</div>
                <div className="flex items-center gap-2 text-sm"><Hand className="h-4 w-4" /> Raise hand</div>
                <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4" /> Small cohorts</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Upcoming sessions</h2>
      {upcoming.length === 0 ? (
        <Card><CardContent className="p-12 text-center">
          <MonitorPlay className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">No upcoming live sessions scheduled yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-3">
          {upcoming.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
              <Card>
                <CardContent className="p-5 flex flex-col md:flex-row md:items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                    <Laptop className="h-6 w-6 text-primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-semibold truncate">{s.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5 flex flex-wrap items-center gap-x-4 gap-y-0.5">
                      <span>{new Date(s.startDate).toLocaleDateString('en-ZA', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                      <span>{new Date(s.startDate).toLocaleTimeString('en-ZA', { hour: '2-digit', minute: '2-digit' })}</span>
                      <Badge variant="outline" className="text-xs capitalize">{s.format.replace('_', ' ')}</Badge>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs text-muted-foreground mb-1">
                      {Math.ceil((new Date(s.startDate).getTime() - now) / 86400000)} day(s) away
                    </div>
                    {s.virtualLink ? (
                      <a href={s.virtualLink} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="outline"><Video className="mr-2 h-4 w-4" /> Session link</Button>
                      </a>
                    ) : (
                      <Button size="sm" variant="outline" disabled>Link opens before start</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
