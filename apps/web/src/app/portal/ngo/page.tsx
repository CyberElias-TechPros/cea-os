'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Badge, Separator } from '@cea/ui';
import { Loader2, Building2, HandCoins, Users, Award, TrendingUp } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';
import { Button } from '@cea/ui';

interface Donation { id: string; donorName?: string; amount: number; currency?: string; message?: string; isAnonymous: boolean; status: string; createdAt: string; }
interface ScholarshipApp { id: string; scholarshipId: string; userId: string; motivation?: string; status: string; createdAt: string; }
interface NgoData { donations: Donation[]; scholarships: ScholarshipApp[]; volunteerCount: number; totalDonated: number; scholarshipsAwarded: number; recentDonation: Donation | null; }

export default function NgoPortal() {
  const [data, setData] = useState<NgoData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<NgoData>('/v1/platform/portals/ngo');
    if (res.success && res.data) setData(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const completed = (data?.donations ?? []).filter(d => d.status === 'completed').reduce((s, d) => s + d.amount, 0);

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">NGO Partner Portal</Badge>
          <h1 className="text-3xl font-bold">Impact Dashboard</h1>
          <p className="text-muted-foreground mt-1">Scholarship funds, donations and community impact.</p>
        </div>
        <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><HandCoins className="h-5 w-5 text-emerald-500" /><span className="text-sm text-muted-foreground">Total donated</span></div><p className="text-2xl font-bold text-emerald-600">{(data?.totalDonated ?? 0).toLocaleString('en-ZA')} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Award className="h-5 w-5 text-amber-500" /><span className="text-sm text-muted-foreground">Scholarships awarded</span></div><p className="text-2xl font-bold">{data?.scholarshipsAwarded ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Volunteers</span></div><p className="text-2xl font-bold">{data?.volunteerCount ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-violet-500" /><span className="text-sm text-muted-foreground">Completed donations</span></div><p className="text-2xl font-bold">{completed.toLocaleString('en-ZA')} ZAR</p></CardContent></Card>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Building2 className="h-5 w-5 text-emerald-500" /> Donations</h2>
          {(data?.donations ?? []).length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground">No donations recorded.</CardContent></Card> : data!.donations.map(d => (
            <Card key={d.id}><CardContent className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">{d.isAnonymous ? 'Anonymous' : (d.donorName || 'Donor')}</p>
                <p className="text-xs text-muted-foreground">{new Date(d.createdAt).toLocaleDateString('en-ZA')}{d.message ? ` · "${d.message}"` : ''}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{(d.amount ?? 0).toLocaleString('en-ZA')} {d.currency ?? 'ZAR'}</p>
                <Badge variant={d.status === 'completed' ? 'default' : d.status === 'failed' ? 'destructive' : 'secondary'}>{d.status}</Badge>
              </div>
            </CardContent></Card>
          ))}
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold flex items-center gap-2"><Award className="h-5 w-5 text-amber-500" /> Scholarship applications</h2>
          {(data?.scholarships ?? []).length === 0 ? <Card><CardContent className="p-10 text-center text-muted-foreground">No scholarship applications yet.</CardContent></Card> : data!.scholarships.map(s => (
            <Card key={s.id}><CardContent className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium">Scholarship application</p>
                <p className="text-xs text-muted-foreground">{new Date(s.createdAt).toLocaleDateString('en-ZA')} · student {s.userId.slice(0, 8)}</p>
                {s.motivation && <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{s.motivation}</p>}
              </div>
              <Badge variant={s.status === 'awarded' ? 'default' : s.status === 'approved' ? 'secondary' : 'outline'}>{s.status}</Badge>
            </CardContent></Card>
          ))}
          <Separator />
          <p className="text-xs text-muted-foreground">Funds and volunteers shown are shared with the academy in real time. Contact the finance office to allocate scholarship budgets.</p>
        </div>
      </div>
    </div>
  );
}
