'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, Package, AlertTriangle, Monitor, ArrowUpDown } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface InventoryItem { id: string; sku: string; name: string; category: string; quantity: number; minQuantity: number; unitPrice?: number; location?: string; }
interface AssetTrack { id: string; inventoryItemId: string; assetTag: string; status: string; assignedToId?: string; }

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [assets, setAssets] = useState<AssetTrack[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [showMovement, setShowMovement] = useState(false);
  const [movementItem, setMovementItem] = useState<InventoryItem | null>(null);
  const [form, setForm] = useState({ sku: '', name: '', description: '', category: 'other', quantity: '0', minQuantity: '0', unitPrice: '', location: '' });
  const [movement, setMovement] = useState({ type: 'in', quantity: '1', notes: '' });

  const load = async () => {
    setLoading(true);
    const [iRes, aRes] = await Promise.all([
      api<InventoryItem[]>('/v1/inventory'),
      api<AssetTrack[]>('/v1/inventory/assets'),
    ]);
    if (iRes.success && iRes.data) setItems(iRes.data);
    if (aRes.success && aRes.data) setAssets(aRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createItem = async () => {
    await api('/v1/inventory', { method: 'POST', body: JSON.stringify({ ...form, quantity: Number(form.quantity), minQuantity: Number(form.minQuantity), unitPrice: form.unitPrice ? Number(form.unitPrice) : undefined }) });
    setShowForm(false);
    setForm({ sku: '', name: '', description: '', category: 'other', quantity: '0', minQuantity: '0', unitPrice: '', location: '' });
    await load();
  };

  const recordMovement = async () => {
    if (!movementItem) return;
    await api(`/v1/inventory/${movementItem.id}/movement`, { method: 'POST', body: JSON.stringify({ ...movement, quantity: Number(movement.quantity) }) });
    setShowMovement(false);
    setMovement({ type: 'in', quantity: '1', notes: '' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const lowStock = items.filter(i => i.quantity <= i.minQuantity);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Inventory & Assets</h1><p className="text-muted-foreground mt-1">Track stock, equipment, and assets</p></div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> Add Item</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Package className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Total Items</span></div><p className="text-2xl font-bold">{items.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><AlertTriangle className="h-5 w-5 text-red-500" /><span className="text-sm text-muted-foreground">Low Stock</span></div><p className="text-2xl font-bold text-red-600">{lowStock.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Monitor className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Assets Tracked</span></div><p className="text-2xl font-bold">{assets.length}</p></CardContent></Card>
      </div>

      {lowStock.length > 0 && (
        <Card className="border-destructive/50">
          <CardHeader><CardTitle className="text-destructive flex items-center gap-2"><AlertTriangle className="h-5 w-5" /> Low Stock Alert</CardTitle></CardHeader>
          <CardContent><div className="space-y-1">{lowStock.map(i => <p key={i.id} className="text-sm">{i.name} — {i.quantity} remaining (min: {i.minQuantity})</p>)}</div></CardContent>
        </Card>
      )}

      <Tabs defaultValue="items">
        <TabsList>
          <TabsTrigger value="items">Inventory ({items.length})</TabsTrigger>
          <TabsTrigger value="assets">Assets ({assets.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="items">
          {items.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Package className="h-12 w-12 mx-auto mb-4" /><p>No inventory items.</p></div> : (
            <div className="grid gap-3">{items.map(i => (
              <Card key={i.id}><CardContent className="flex items-center justify-between py-4">
                <div><p className="font-medium">{i.name}</p><p className="text-sm text-muted-foreground">SKU: {i.sku} · {i.category}{i.location ? ` · ${i.location}` : ''}</p></div>
                <div className="flex items-center gap-3">
                  <div className="text-right"><p className={`font-bold text-lg ${i.quantity <= i.minQuantity ? 'text-destructive' : ''}`}>{i.quantity}</p><p className="text-xs text-muted-foreground">min: {i.minQuantity}</p></div>
                  <Button variant="outline" size="sm" onClick={() => { setMovementItem(i); setShowMovement(true); }}><ArrowUpDown className="h-3 w-3" /></Button>
                </div>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="assets">
          {assets.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Monitor className="h-12 w-12 mx-auto mb-4" /><p>No assets tracked.</p></div> : (
            <div className="grid gap-3">{assets.map(a => (
              <Card key={a.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">{a.assetTag}</p></div>
                <Badge variant={a.status === 'available' ? 'default' : a.status === 'assigned' ? 'secondary' : a.status === 'maintenance' ? 'outline' : 'destructive'}>{a.status}</Badge>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent><DialogHeader><DialogTitle>Add Inventory Item</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium">SKU *</label><Input value={form.sku} onChange={e => setForm(f => ({ ...f, sku: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Name *</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium">Quantity</label><Input type="number" value={form.quantity} onChange={e => setForm(f => ({ ...f, quantity: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Min Quantity</label><Input type="number" value={form.minQuantity} onChange={e => setForm(f => ({ ...f, minQuantity: e.target.value }))} /></div></div>
            <div><label className="text-sm font-medium">Location</label><Input value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={createItem}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showMovement} onOpenChange={setShowMovement}>
        <DialogContent><DialogHeader><DialogTitle>Stock Movement — {movementItem?.name}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={movement.type} onChange={e => setMovement(f => ({ ...f, type: e.target.value }))}>
                <option value="in">Stock In</option><option value="out">Stock Out</option><option value="adjustment">Adjustment</option></select></div>
            <div><label className="text-sm font-medium">Quantity</label><Input type="number" value={movement.quantity} onChange={e => setMovement(f => ({ ...f, quantity: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Notes</label><Input value={movement.notes} onChange={e => setMovement(f => ({ ...f, notes: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowMovement(false)}>Cancel</Button><Button onClick={recordMovement}>Record</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
