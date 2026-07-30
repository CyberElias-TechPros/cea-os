'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import { Select } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import { Plus, Loader2, FileText, Download, DollarSign } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Invoice {
  id: string; invoiceNumber: string; clientId?: string; status: string;
  subtotal: number; taxRate: number; taxAmount: number; discount: number;
  total: number; currency: string; dueDate?: string; paidAt?: string;
  paymentMethod?: string; paymentReference?: string; createdAt: string;
}

interface LineItemForm {
  description: string;
  quantity: string;
  unitPrice: string;
  type: string;
}

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ clientId: '', subtotal: '', taxRate: '0', discount: '0', dueDate: '', notes: '' });
  const [lineItems, setLineItems] = useState<LineItemForm[]>([{ description: '', quantity: '1', unitPrice: '', type: 'service' }]);

  const load = async () => {
    setLoading(true);
    const res = await api<Invoice[]>('/v1/invoices');
    if (res.success && res.data) setInvoices(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createInvoice = async () => {
    const subtotal = Number(form.subtotal);
    const taxRate = Number(form.taxRate);
    const discount = Number(form.discount);
    const taxAmount = subtotal * (taxRate / 100);
    const total = subtotal + taxAmount - discount;

    await api('/v1/invoices', {
      method: 'POST',
      body: JSON.stringify({
        ...form,
        subtotal,
        taxRate,
        taxAmount,
        discount,
        total,
        lineItems: lineItems.map(li => ({
          description: li.description,
          quantity: Number(li.quantity),
          unitPrice: Number(li.unitPrice),
          total: Number(li.quantity) * Number(li.unitPrice),
          type: li.type,
        })),
      }),
    });
    setShowForm(false);
    setForm({ clientId: '', subtotal: '', taxRate: '0', discount: '0', dueDate: '', notes: '' });
    setLineItems([{ description: '', quantity: '1', unitPrice: '', type: 'service' }] as LineItemForm[]);
    await load();
  };

  const sendInvoice = async (id: string) => {
    await api(`/v1/invoices/${id}/send`, { method: 'POST' });
    await load();
  };

  const recordPayment = async (id: string) => {
    await api(`/v1/invoices/${id}/pay`, { method: 'POST', body: JSON.stringify({ paymentMethod: 'bank_transfer', paymentReference: prompt('Payment reference:') || '' }) });
    await load();
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  const statusColors: Record<string, string> = { draft: 'secondary', sent: 'default', viewed: 'default', overdue: 'destructive', paid: 'default', cancelled: 'outline' };

  const totals = invoices.reduce((acc, inv) => ({ count: acc.count + 1, total: acc.total + inv.total, paid: inv.status === 'paid' ? acc.paid + inv.total : acc.paid, outstanding: inv.status !== 'paid' && inv.status !== 'cancelled' ? acc.outstanding + inv.total : acc.outstanding }), { count: 0, total: 0, paid: 0, outstanding: 0 });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Invoices</h1>
          <p className="text-muted-foreground mt-1">Create, send, and track invoices</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> New Invoice</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Total</p><p className="text-2xl font-bold">{totals.total.toLocaleString()} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Paid</p><p className="text-2xl font-bold text-green-600">{totals.paid.toLocaleString()} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><p className="text-sm text-muted-foreground">Outstanding</p><p className="text-2xl font-bold text-destructive">{totals.outstanding.toLocaleString()} ZAR</p></CardContent></Card>
      </div>

      {invoices.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FileText className="h-12 w-12 mx-auto mb-4" />
          <p>No invoices yet. Create your first invoice to get started.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {invoices.map(inv => (
            <Card key={inv.id}>
              <CardContent className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium">{inv.invoiceNumber}</p>
                  <p className="text-sm text-muted-foreground">{inv.total.toLocaleString()} {inv.currency} · Due {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={(statusColors[inv.status] || 'secondary') as any}>{inv.status}</Badge>
                  {inv.status === 'draft' && <Button size="sm" variant="outline" onClick={() => sendInvoice(inv.id)}>Send</Button>}
                  {inv.status === 'sent' && <Button size="sm" onClick={() => recordPayment(inv.id)}><DollarSign className="h-3 w-3 mr-1" /> Record Payment</Button>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Invoice</DialogTitle></DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Subtotal *</label>
              <Input type="number" value={form.subtotal} onChange={e => setForm(f => ({ ...f, subtotal: e.target.value }))} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Tax Rate (%)</label>
                <Input type="number" value={form.taxRate} onChange={e => setForm(f => ({ ...f, taxRate: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium">Discount</label>
                <Input type="number" value={form.discount} onChange={e => setForm(f => ({ ...f, discount: e.target.value }))} />
              </div>
            </div>
            <div><label className="text-sm font-medium">Due Date</label><Input type="date" value={form.dueDate} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
            <Separator />
            <p className="text-sm font-medium">Line Items</p>
            {lineItems.map((li, i) => (
              <div key={i} className="grid grid-cols-4 gap-2">
                <div className="col-span-2"><Input value={li.description} onChange={e => setLineItems(lineItems.map((item, idx) => idx === i ? { ...item, description: e.target.value } : item))} placeholder="Description" /></div>
                <div><Input type="number" value={li.quantity} onChange={e => setLineItems(lineItems.map((item, idx) => idx === i ? { ...item, quantity: e.target.value } : item))} placeholder="Qty" /></div>
                <div><Input type="number" value={li.unitPrice} onChange={e => setLineItems(lineItems.map((item, idx) => idx === i ? { ...item, unitPrice: e.target.value } : item))} placeholder="Price" /></div>
              </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => setLineItems([...lineItems, { description: '', quantity: '1', unitPrice: '', type: 'service' }])}>+ Add Item</Button>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={createInvoice}>Create Invoice</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
