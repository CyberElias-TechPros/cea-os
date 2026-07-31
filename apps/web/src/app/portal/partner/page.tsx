'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Button, Badge } from '@cea/ui';
import { Loader2, Handshake, UserPlus } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';

interface Partnership { id: string; organizationName: string; contactPerson?: string; type: string; status: string; startDate?: string; endDate?: string; notes?: string; }
interface Referral { id: string; firstName: string; lastName: string; email: string; status: string; createdAt: string; }

export default function PartnerPortal() {
  const [partnership, setPartnership] = useState<Partnership | null>(null);
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<{ partnership: Partnership | null; referrals: Referral[] }>('/v1/platform/portals/partner');
    if (res.success && res.data) {
      setPartnership(res.data.partnership);
      setReferrals(res.data.referrals);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Partner Portal</Badge>
          <h1 className="text-3xl font-bold">{partnership?.organizationName ?? 'Partner Portal'}</h1>
          <p className="text-muted-foreground mt-1">Agreements, referrals and collaboration status.</p>
        </div>
        <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
      </div>

      {!partnership ? (
        <Card><CardContent className="p-12 text-center">
          <Handshake className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No active partnership linked to this account. Sign in with the email registered on your partnership agreement.</p>
        </CardContent></Card>
      ) : (
        <>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="outline" className="capitalize">{partnership.type}</Badge>
                <Badge variant={partnership.status === 'active' ? 'default' : partnership.status === 'negotiation' ? 'secondary' : 'outline'}>{partnership.status}</Badge>
              </div>
              {partnership.contactPerson && <p className="text-sm text-muted-foreground">Contact: {partnership.contactPerson}</p>}
              {(partnership.startDate || partnership.endDate) && <p className="text-sm text-muted-foreground mt-1">{partnership.startDate && `Start ${new Date(partnership.startDate).toLocaleDateString('en-ZA')}`}{partnership.endDate && ` · End ${new Date(partnership.endDate).toLocaleDateString('en-ZA')}`}</p>}
              {partnership.notes && <p className="text-sm mt-3">{partnership.notes}</p>}
            </CardContent>
          </Card>

          <h2 className="text-xl font-semibold flex items-center gap-2"><UserPlus className="h-5 w-5 text-violet-500" /> Referrals ({referrals.length})</h2>
          {referrals.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-muted-foreground">No referrals yet. Student applications matching your email appear here.</CardContent></Card>
          ) : referrals.map(r => (
            <Card key={r.id}><CardContent className="flex items-center justify-between py-3">
              <div><p className="font-medium">{r.firstName} {r.lastName}</p><p className="text-xs text-muted-foreground">{r.email} · {new Date(r.createdAt).toLocaleDateString('en-ZA')}</p></div>
              <Badge>{r.status.replace('_', ' ')}</Badge>
            </CardContent></Card>
          ))}
        </>
      )}
    </div>
  );
}
