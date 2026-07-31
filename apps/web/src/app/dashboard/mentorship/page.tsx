'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { Users, Loader2, Handshake, CheckCircle2, Target, CalendarClock } from 'lucide-react';
import { useAuth } from '../../../lib/auth-context';

interface Mentor {
  id: string;
  user?: { id: string; firstName: string; lastName: string; avatarUrl?: string };
  industry?: string;
  currentPosition?: string;
  graduationYear?: number;
  mentorshipAreas?: string[];
}
interface Mentorship { id: string; mentorId: string; menteeId: string; focusArea?: string; status: string; startDate?: string }

export default function MentorshipPage() {
  const { user } = useAuth();
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [relations, setRelations] = useState<Mentorship[]>([]);
  const [loading, setLoading] = useState(true);
  const [focus, setFocus] = useState('');
  const [requesting, setRequesting] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [mRes, rRes] = await Promise.all([
      api<Mentor[]>('/v1/alumni/mentors'),
      api<Mentorship[]>('/v1/community/mentorship/relations'),
    ]);
    if (mRes.success && mRes.data) setMentors(mRes.data.filter((m) => m.user?.id !== user?.id));
    if (rRes.success && rRes.data) setRelations(rRes.data);
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { load(); }, [load]);

  const request = async (mentorId: string) => {
    if (!focus.trim()) return;
    setRequesting(mentorId);
    setNote(null);
    const res = await api('/v1/community/mentorship/request', {
      method: 'POST',
      body: JSON.stringify({ mentorId, focusArea: focus }),
    });
    setRequesting(null);
    if (res.success) {
      setNote({ ok: true, text: 'Mentorship request sent!' });
      setFocus('');
      await load();
    } else {
      setNote({ ok: false, text: res.error?.message || 'Request failed' });
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const myActive = relations.filter((r) => r.menteeId === user?.id);
  const pending = myActive.filter((r) => r.status === 'pending');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Mentorship</h1>
        <p className="text-muted-foreground mt-1">Get matched with an industry mentor who will guide your career.</p>
      </div>

      {note && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 ${note.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20'}`}>
          {note.ok ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Handshake className="h-5 w-5 text-red-500" />}
          <span className="text-sm font-medium">{note.text}</span>
        </motion.div>
      )}

      {myActive.length > 0 && (
        <div className="mb-10">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Handshake className="h-5 w-5 text-primary" /> My mentorship</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {myActive.map((rel, i) => (
              <motion.div key={rel.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold">{rel.focusArea || 'Career mentorship'}</div>
                        <div className="text-sm text-muted-foreground mt-1 capitalize">
                          {rel.status}
                          {rel.startDate && ` · Started ${new Date(rel.startDate).toLocaleDateString()}`}
                        </div>
                      </div>
                      <Badge variant={rel.status === 'active' ? 'success' : 'warning'} className="capitalize">{rel.status}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /> Available mentors</h2>

      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-3 items-stretch">
            <div className="flex-1">
              <div className="text-sm font-medium mb-1 flex items-center gap-2"><Target className="h-4 w-4" /> What do you want to work on?</div>
              <input
                value={focus}
                onChange={(e) => setFocus(e.target.value)}
                placeholder="e.g. Breaking into backend engineering"
                className="flex h-10 w-full rounded-lg border bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {mentors.length === 0 ? (
        <Card><CardContent className="p-14 text-center">
          <Users className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">No mentors available yet. Check back soon!</p>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mentors.map((mentor, i) => {
            const m = mentor.user!;
            const already = myActive.some((r) => r.mentorId === mentor.id && (r.status === 'pending' || r.status === 'active'));
            return (
              <motion.div key={mentor.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold">
                        {m.firstName?.[0]}{m.lastName?.[0]}
                      </div>
                      <div>
                        <div className="font-semibold">{m.firstName} {m.lastName}</div>
                        <div className="text-xs text-muted-foreground">{mentor.currentPosition || mentor.industry || 'Alumni mentor'}</div>
                      </div>
                    </div>
                    {mentor.mentorshipAreas && mentor.mentorshipAreas.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {mentor.mentorshipAreas.map((area) => (
                          <Badge key={area} variant="outline" className="text-xs">{area}</Badge>
                        ))}
                      </div>
                    )}
                    <div className="mt-auto flex items-center justify-between gap-3">
                      <span className="text-xs text-muted-foreground flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> Weekly sessions</span>
                      <Button size="sm" variant={already ? 'outline' : 'default'} disabled={already || requesting === mentor.id} onClick={() => request(mentor.id)}>
                        {already ? 'Requested' : requesting === mentor.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Request'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
