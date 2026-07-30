'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, Truck, ShoppingCart, CheckCircle, XCircle } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Supplier { id: string; name: string; contactPerson?: string; email?: string; phone?: string; status: string; }
interface PurchaseOrder { id: string; poNumber: string; supplierId?: string; status: string; totalAmount?: number; currency: string; createdAt: string; }

export default function ProcurementPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSupplierForm, setShowSupplierForm] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [supForm, setSupForm] = useState({ name: '', contactPerson: '', email: '', phone: '', address: '', paymentTerms: '' });
  const [orderForm, setOrderForm] = useState({ supplierId: '', totalAmount: '', notes: '' });

  const load = async () => {
    setLoading(true);
    const [sRes, oRes] = await Promise.all([
      api<Supplier[]>('/v1/procurement/suppliers'),
      api<PurchaseOrder[]>('/v1/procurement/orders'),
    ]);
    if (sRes.success && sRes.data) setSuppliers(sRes.data);
    if (oRes.success && oRes.data) setOrders(oRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createSupplier = async () => {
    await api('/v1/procurement/suppliers', { method: 'POST', body: JSON.stringify(supForm) });
    setShowSupplierForm(false);
    setSupForm({ name: '', contactPerson: '', email: '', phone: '', address: '', paymentTerms: '' });
    await load();
  };

  const createOrder = async () => {
    await api('/v1/procurement/orders', { method: 'POST', body: JSON.stringify({ ...orderForm, totalAmount: orderForm.totalAmount ? Number(orderForm.totalAmount) : undefined }) });
    setShowOrderForm(false);
    setOrderForm({ supplierId: '', totalAmount: '', notes: '' });
    await load();
  };

  const approveOrder = async (id: string) => {
    await api(`/v1/procurement/orders/${id}/approve`, { method: 'POST' });
    await load();
  };

  const receiveOrder = async (id: string) => {
    await api(`/v1/procurement/orders/${id}/receive`, { method: 'POST' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Procurement</h1><p className="text-muted-foreground mt-1">Manage suppliers and purchase orders</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowSupplierForm(true)}><Truck className="h-4 w-4 mr-2" /> Add Supplier</Button>
          <Button onClick={() => setShowOrderForm(true)}><Plus className="h-4 w-4 mr-2" /> New PO</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Truck className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Suppliers</span></div><p className="text-2xl font-bold">{suppliers.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><ShoppingCart className="h-5 w-5 text-green-500" /><span className="text-sm text-muted-foreground">Purchase Orders</span></div><p className="text-2xl font-bold">{orders.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Approved</span></div><p className="text-2xl font-bold">{orders.filter(o => o.status === 'approved').length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="orders">
        <TabsList>
          <TabsTrigger value="orders">Purchase Orders ({orders.length})</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers ({suppliers.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="orders">
          {orders.length === 0 ? <div className="text-center py-12 text-muted-foreground"><ShoppingCart className="h-12 w-12 mx-auto mb-4" /><p>No purchase orders yet.</p></div> : (
            <div className="space-y-2">{orders.map(o => (
              <Card key={o.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="font-medium">{o.poNumber}</p><p className="text-sm text-muted-foreground">{o.totalAmount ? `${o.totalAmount.toLocaleString()} ${o.currency}` : 'No amount'} · {new Date(o.createdAt).toLocaleDateString()}</p></div>
                <div className="flex items-center gap-2">
                  <Badge variant={o.status === 'draft' ? 'secondary' : o.status === 'approved' ? 'default' : o.status === 'received' ? 'default' : 'destructive'}>{o.status}</Badge>
                  {o.status === 'draft' && <Button size="sm" variant="outline" onClick={() => approveOrder(o.id)}>Approve</Button>}
                  {o.status === 'approved' && <Button size="sm" onClick={() => receiveOrder(o.id)}>Receive</Button>}
                </div>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="suppliers">
          {suppliers.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Truck className="h-12 w-12 mx-auto mb-4" /><p>No suppliers registered.</p></div> : (
            <div className="grid gap-3">{suppliers.map(s => (
              <Card key={s.id}><CardContent className="flex items-center justify-between py-4">
                <div><p className="font-medium">{s.name}</p><p className="text-sm text-muted-foreground">{s.contactPerson || 'N/A'} · {s.email || 'N/A'}</p></div>
                <Badge variant={s.status === 'active' ? 'default' : 'secondary'}>{s.status}</Badge>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showSupplierForm} onOpenChange={setShowSupplierForm}>
        <DialogContent><DialogHeader><DialogTitle>Add Supplier</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Company Name *</label><Input value={supForm.name} onChange={e => setSupForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium">Contact Person</label><Input value={supForm.contactPerson} onChange={e => setSupForm(f => ({ ...f, contactPerson: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Email</label><Input type="email" value={supForm.email} onChange={e => setSupForm(f => ({ ...f, email: e.target.value }))} /></div></div>
            <div><label className="text-sm font-medium">Phone</label><Input value={supForm.phone} onChange={e => setSupForm(f => ({ ...f, phone: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Payment Terms</label><Input value={supForm.paymentTerms} onChange={e => setSupForm(f => ({ ...f, paymentTerms: e.target.value }))} placeholder="e.g. Net 30" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowSupplierForm(false)}>Cancel</Button><Button onClick={createSupplier}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOrderForm} onOpenChange={setShowOrderForm}>
        <DialogContent><DialogHeader><DialogTitle>New Purchase Order</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Supplier</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={orderForm.supplierId} onChange={e => setOrderForm(f => ({ ...f, supplierId: e.target.value }))}>
                <option value="">Select supplier</option>{suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
            <div><label className="text-sm font-medium">Total Amount</label><Input type="number" value={orderForm.totalAmount} onChange={e => setOrderForm(f => ({ ...f, totalAmount: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={orderForm.notes} onChange={e => setOrderForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowOrderForm(false)}>Cancel</Button><Button onClick={createOrder}>Create PO</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
