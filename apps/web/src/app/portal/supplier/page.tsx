'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@cea/ui';
import { Loader2, Truck, CheckCircle2, XCircle, PackageOpen } from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import Link from 'next/link';

interface Supplier { id: string; name: string; contactPerson?: string; paymentTerms?: string; status: string; }
interface Order { id: string; poNumber: string; status: string; totalAmount?: number; currency?: string; expectedDate?: string; notes?: string; createdAt: string; }

export default function SupplierPortal() {
  const { user } = useAuth();
  const [supplier, setSupplier] = useState<Supplier | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<{ supplier: Supplier | null; orders: Order[] }>('/v1/platform/portals/supplier');
    if (res.success && res.data) {
      setSupplier(res.data.supplier);
      setOrders(res.data.orders);
    }
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const respond = async (id: string, accepted: boolean) => {
    await api(`/v1/platform/portals/supplier/orders/${id}/respond`, { method: 'POST', body: JSON.stringify({ accepted }) });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const pending = orders.filter(o => o.status === 'sent').length;
  const approved = orders.filter(o => o.status === 'approved').length;

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Supplier Portal</Badge>
          <h1 className="text-3xl font-bold">{supplier?.name ?? 'Supplier Portal'}</h1>
          <p className="text-muted-foreground mt-1">{supplier?.contactPerson ? `Contact: ${supplier.contactPerson}` : 'Sign in with the email registered on your supplier account.'}</p>
        </div>
        <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
      </div>

      {!supplier ? (
        <Card><CardContent className="p-12 text-center">
          <Truck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No supplier profile linked to this account. Ask the academy to add your supplier email, or register with the same email used on your supplier account.</p>
        </CardContent></Card>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Pending orders</div><p className="text-2xl font-bold">{pending}</p></CardContent></Card>
            <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Approved</div><p className="text-2xl font-bold text-emerald-600">{approved}</p></CardContent></Card>
            <Card><CardContent className="p-6"><div className="text-sm text-muted-foreground">Payment terms</div><p className="text-2xl font-bold">{supplier.paymentTerms ?? '—'}</p></CardContent></Card>
          </div>

          <h2 className="text-xl font-semibold flex items-center gap-2"><PackageOpen className="h-5 w-5 text-orange-500" /> Purchase orders</h2>
          {orders.length === 0 ? (
            <Card><CardContent className="p-10 text-center text-muted-foreground">No purchase orders yet.</CardContent></Card>
          ) : orders.map(o => (
            <Card key={o.id}><CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2"><p className="font-semibold font-mono">{o.poNumber}</p><Badge>{o.status}</Badge></div>
                  <p className="text-sm text-muted-foreground mt-1">Issued {new Date(o.createdAt).toLocaleDateString('en-ZA')}{o.expectedDate ? ` · expected ${new Date(o.expectedDate).toLocaleDateString('en-ZA')}` : ''}</p>
                  {o.notes && <p className="text-sm mt-2">{o.notes}</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{(o.totalAmount ?? 0).toLocaleString('en-ZA')} {o.currency ?? 'ZAR'}</p>
                  {o.status === 'sent' && (
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" onClick={() => respond(o.id, true)}><CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Accept</Button>
                      <Button size="sm" variant="outline" className="text-destructive" onClick={() => respond(o.id, false)}><XCircle className="h-3.5 w-3.5 mr-1" /> Decline</Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent></Card>
          ))}
        </>
      )}
    </div>
  );
}
