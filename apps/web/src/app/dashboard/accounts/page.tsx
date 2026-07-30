'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, DollarSign, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Transaction { id: string; accountId: string; type: string; amount: number; currency: string; description?: string; category: string; transactionDate: string; }
interface ExpenseClaim { id: string; title: string; amount: number; status: string; category: string; createdAt: string; }
interface Budget { id: string; name: string; fiscalYear: string; amount: number; spent: number; }

export default function AccountsPage() {
  const [txns, setTxns] = useState<Transaction[]>([]);
  const [expenses, setExpenses] = useState<ExpenseClaim[]>([]);
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTxForm, setShowTxForm] = useState(false);
  const [showExpenseForm, setShowExpenseForm] = useState(false);
  const [txForm, setTxForm] = useState({ accountId: '', type: 'debit', amount: '', description: '', category: 'other', transactionDate: new Date().toISOString().split('T')[0] });
  const [expForm, setExpForm] = useState({ title: '', amount: '', category: 'other', description: '' });

  const load = async () => {
    setLoading(true);
    const [tRes, eRes, bRes] = await Promise.all([
      api<Transaction[]>('/v1/finance/transactions'),
      api<ExpenseClaim[]>('/v1/finance/expenses'),
      api<Budget[]>('/v1/finance/budgets'),
    ]);
    if (tRes.success && tRes.data) setTxns(tRes.data);
    if (eRes.success && eRes.data) setExpenses(eRes.data);
    if (bRes.success && bRes.data) setBudgets(bRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const createTx = async () => {
    await api('/v1/finance/transactions', { method: 'POST', body: JSON.stringify({ ...txForm, amount: Number(txForm.amount) }) });
    setShowTxForm(false);
    setTxForm({ accountId: '', type: 'debit', amount: '', description: '', category: 'other', transactionDate: new Date().toISOString().split('T')[0] });
    await load();
  };

  const submitExpense = async () => {
    await api('/v1/finance/expenses', { method: 'POST', body: JSON.stringify({ ...expForm, amount: Number(expForm.amount) }) });
    setShowExpenseForm(false);
    setExpForm({ title: '', amount: '', category: 'other', description: '' });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const totalIncome = txns.filter(t => t.type === 'credit').reduce((s, t) => s + t.amount, 0);
  const totalExpense = txns.filter(t => t.type === 'debit').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">Finance</h1><p className="text-muted-foreground mt-1">Transactions, expenses, and budgets</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowExpenseForm(true)}>Claim Expense</Button>
          <Button onClick={() => setShowTxForm(true)}><Plus className="h-4 w-4 mr-2" /> New Transaction</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Wallet className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Balance</span></div><p className="text-2xl font-bold">{(totalIncome - totalExpense).toLocaleString()} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-green-500" /><span className="text-sm text-muted-foreground">Income</span></div><p className="text-2xl font-bold text-green-600">{totalIncome.toLocaleString()} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><TrendingDown className="h-5 w-5 text-red-500" /><span className="text-sm text-muted-foreground">Expenses</span></div><p className="text-2xl font-bold text-red-600">{totalExpense.toLocaleString()} ZAR</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Pending Claims</span></div><p className="text-2xl font-bold">{expenses.filter(e => e.status === 'pending').length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions ({txns.length})</TabsTrigger>
          <TabsTrigger value="expenses">Expenses ({expenses.length})</TabsTrigger>
          <TabsTrigger value="budgets">Budgets ({budgets.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="transactions">
          {txns.length === 0 ? <div className="text-center py-12 text-muted-foreground"><DollarSign className="h-12 w-12 mx-auto mb-4" /><p>No transactions yet.</p></div> : (
            <div className="space-y-2">{txns.map(t => (
              <Card key={t.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">{t.description || t.category}</p><p className="text-xs text-muted-foreground">{new Date(t.transactionDate).toLocaleDateString()}</p></div>
                <p className={`font-medium ${t.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>{t.type === 'credit' ? '+' : '-'}{t.amount.toLocaleString()} {t.currency}</p>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="expenses">
          {expenses.length === 0 ? <div className="text-center py-12 text-muted-foreground"><DollarSign className="h-12 w-12 mx-auto mb-4" /><p>No expenses claimed.</p></div> : (
            <div className="space-y-2">{expenses.map(e => (
              <Card key={e.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">{e.title}</p><p className="text-xs text-muted-foreground">{e.category} · {new Date(e.createdAt).toLocaleDateString()}</p></div>
                <div className="flex items-center gap-2"><Badge variant={e.status === 'approved' ? 'default' : e.status === 'rejected' ? 'destructive' : 'secondary'}>{e.status}</Badge><p className="font-medium">{e.amount.toLocaleString()} ZAR</p></div>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="budgets">
          {budgets.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Wallet className="h-12 w-12 mx-auto mb-4" /><p>No budgets created.</p></div> : (
            <div className="grid gap-3">{budgets.map(b => (
              <Card key={b.id}><CardContent className="py-4">
                <div className="flex items-center justify-between"><p className="font-medium">{b.name}</p><p className="text-sm text-muted-foreground">{b.fiscalYear}</p></div>
                <div className="mt-2"><div className="flex justify-between text-sm"><span>{b.spent?.toLocaleString()} / {b.amount.toLocaleString()} ZAR</span><span>{Math.round(((b.spent || 0) / b.amount) * 100)}%</span></div>
                <div className="w-full bg-muted rounded-full h-2 mt-1"><div className="bg-primary rounded-full h-2" style={{ width: `${Math.min(((b.spent || 0) / b.amount) * 100, 100)}%` }} /></div></div>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showTxForm} onOpenChange={setShowTxForm}>
        <DialogContent><DialogHeader><DialogTitle>New Transaction</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={txForm.type} onChange={e => setTxForm(f => ({ ...f, type: e.target.value }))}>
                <option value="debit">Expense (Debit)</option><option value="credit">Income (Credit)</option></select></div>
            <div><label className="text-sm font-medium">Amount *</label><Input type="number" value={txForm.amount} onChange={e => setTxForm(f => ({ ...f, amount: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Input value={txForm.description} onChange={e => setTxForm(f => ({ ...f, description: e.target.value }))} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowTxForm(false)}>Cancel</Button><Button onClick={createTx}>Record</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showExpenseForm} onOpenChange={setShowExpenseForm}>
        <DialogContent><DialogHeader><DialogTitle>Expense Claim</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={expForm.title} onChange={e => setExpForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Amount *</label><Input type="number" value={expForm.amount} onChange={e => setExpForm(f => ({ ...f, amount: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Category</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={expForm.category} onChange={e => setExpForm(f => ({ ...f, category: e.target.value }))}>
                <option value="travel">Travel</option><option value="meals">Meals</option><option value="supplies">Supplies</option><option value="equipment">Equipment</option></select></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={expForm.description} onChange={e => setExpForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowExpenseForm(false)}>Cancel</Button><Button onClick={submitExpense}>Submit Claim</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
