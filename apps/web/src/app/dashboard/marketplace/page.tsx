'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { Briefcase, Loader2, Send, Wallet, MapPin, Building2, CheckCircle2 } from 'lucide-react';

interface Job { id: string; title: string; description?: string; company?: string; location?: string; jobType?: string; salaryRange?: string; remote?: boolean; employer?: { companyName?: string } }
interface Gig { id: string; title: string; description?: string; budget?: number; duration?: string }
interface MyApplication { id: string; jobListingId: string; status: string }

export default function MarketplacePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [myApps, setMyApps] = useState<MyApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const [jobsRes, gigsRes, appsRes] = await Promise.all([
      api<Job[]>('/v1/marketplace/jobs'),
      api<Gig[]>('/v1/marketplace/gigs'),
      api<MyApplication[]>('/v1/marketplace/applications/my'),
    ]);
    if (jobsRes.success && jobsRes.data) setJobs(jobsRes.data);
    if (gigsRes.success && gigsRes.data) setGigs(gigsRes.data);
    if (appsRes.success && appsRes.data) setMyApps(appsRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const apply = async (jobId: string) => {
    setApplying(jobId);
    setNote(null);
    const res = await api('/v1/marketplace/jobs/' + jobId + '/apply', { method: 'POST', body: JSON.stringify({}) });
    setApplying(null);
    if (res.success) {
      setNote({ ok: true, text: 'Application sent!' });
      await load();
    } else {
      setNote({ ok: false, text: res.error?.message || 'Failed to apply' });
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Marketplace</h1>
        <p className="text-muted-foreground mt-1">Browse jobs and freelance gigs from partner employers.</p>
      </div>

      {note && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 ${note.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20'}`}>
          {note.ok ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <Briefcase className="h-5 w-5 text-red-500" />}
          <span className="text-sm font-medium">{note.text}</span>
        </motion.div>
      )}

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Briefcase className="h-5 w-5 text-blue-500" /> Job openings</h2>
      {jobs.length === 0 ? (
        <Card className="mb-10"><CardContent className="p-10 text-center text-muted-foreground">No open positions right now.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 mb-10">
          {jobs.map((job, i) => {
            const applied = myApps.some((a) => a.jobListingId === job.id);
            return (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex items-start justify-between gap-3">
                      <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
                        <Building2 className="h-5 w-5 text-white" />
                      </div>
                      {job.remote && <Badge variant="info">Remote</Badge>}
                    </div>
                    <h3 className="font-semibold mt-4">{job.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      {job.employer?.companyName || job.company || 'CEA Partner'} {job.location && <><span className="mx-1">·</span><MapPin className="h-3 w-3 inline" /> {job.location}</>}
                    </p>
                    <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{job.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      {job.jobType && <Badge variant="secondary">{job.jobType}</Badge>}
                      {job.salaryRange && <Badge variant="secondary">{job.salaryRange}</Badge>}
                    </div>
                    <Button className="mt-4 w-full" variant={applied ? 'outline' : 'default'} disabled={applied || applying === job.id} onClick={() => apply(job.id)}>
                      {applied ? 'Applied' : applying === job.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Send className="mr-2 h-4 w-4" /> Apply</>}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}

      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2"><Wallet className="h-5 w-5 text-emerald-500" /> Freelance gigs</h2>
      {gigs.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">No open gigs right now.</CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {gigs.map((gig, i) => (
            <motion.div key={gig.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex flex-col h-full">
                  <h3 className="font-semibold">{gig.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 flex-1 line-clamp-2">{gig.description}</p>
                  <div className="mt-3 flex items-center justify-between text-sm">
                    {gig.budget ? <span className="font-bold">₦{gig.budget.toLocaleString()}</span> : <span className="text-muted-foreground">Budget TBD</span>}
                    {gig.duration && <Badge variant="secondary">{gig.duration}</Badge>}
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
