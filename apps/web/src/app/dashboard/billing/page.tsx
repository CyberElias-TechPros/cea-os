'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { CreditCard, Loader2, ReceiptText, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../../lib/auth-context';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientId?: string;
  status: string;
  amount?: number;
  currency?: string;
  dueDate?: string;
  createdAt: string;
  paymentMethod?: string;
}

export default function BillingPage() {
  const { user } = useAuth();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState<string | null>(null);
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    const res = await api<Invoice[]>('/v1/invoices');
    if (res.success && res.data) {
      setInvoices(res.data.filter((i) => i.clientId === user?.id));
    }
    setLoading(false);
  }, [user?.id]);

  useEffect(() => { load(); }, [load]);

  const pay = async (id: string) => {
    setPaying(id);
    setNote(null);
    const res = await api(`/v1/invoices/${id}/pay`, {
      method: 'POST',
      body: JSON.stringify({ paymentMethod: 'card', paymentReference: 'PAY-' + Date.now().toString(36).toUpperCase() }),
    });
    setPaying(null);
    if (res.success) {
      setNote({ ok: true, text: 'Payment recorded — receipt sent to your email.' });
      await load();
    } else {
      setNote({ ok: false, text: res.error?.message || 'Payment failed' });
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const due = invoices.filter((i) => i.status === 'sent').reduce((s, i) => s + (i.amount ?? 0), 0);
  const paid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + (i.amount ?? 0), 0);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Billing & Payments</h1>
        <p className="text-muted-foreground mt-1">View invoices, pay tuition, and download receipts.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Outstanding balance</div>
            <div className="text-3xl font-bold mt-1">₦{due.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground">Total paid</div>
            <div className="text-3xl font-bold mt-1 text-green-600 dark:text-green-400">₦{paid.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {note && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 ${note.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20'}`}>
          {note.ok ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <ReceiptText className="h-5 w-5 text-red-500" />}
          <span className="text-sm font-medium">{note.text}</span>
        </motion.div>
      )}

      {invoices.length === 0 ? (
        <Card><CardContent className="p-14 text-center">
          <ReceiptText className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">No invoices yet. When the academy issues you an invoice, it will appear here.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {invoices.map((inv, i) => (
            <motion.div key={inv.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card>
                <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${inv.status === 'paid' ? 'bg-green-100 dark:bg-green-900/40' : 'bg-amber-100 dark:bg-amber-900/40'}`}>
                      <CreditCard className={`h-5 w-5 ${inv.status === 'paid' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`} />
                    </div>
                    <div>
                      <div className="font-mono text-sm font-semibold">{inv.invoiceNumber}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {new Date(inv.createdAt).toLocaleDateString()}
                        {inv.dueDate && ` · Due ${new Date(inv.dueDate).toLocaleDateString()}`}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-lg">₦{(inv.amount ?? 0).toLocaleString()}</div>
                      <Badge variant={inv.status === 'paid' ? 'success' : inv.status === 'cancelled' ? 'secondary' : 'warning'} className="capitalize mt-1">
                        {inv.status}
                      </Badge>
                    </div>
                    {inv.status === 'sent' && (
                      <Button onClick={() => pay(inv.id)} disabled={paying === inv.id} className="shrink-0">
                        {paying === inv.id ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Pay now'}
                      </Button>
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
