'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Input, Label, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { UserCircle, Loader2, Save, ShieldCheck, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
  const { user, refreshUser, logout } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [password, setPassword] = useState({ current: '', next: '', confirm: '' });

  useEffect(() => {
    if (user) setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, phone: '' });
  }, [user]);

  const saveProfile = async () => {
    if (!user) return;
    setSaving(true);
    setSaved(false);
    const res = await api(`/v1/users/${user.id}`, { method: 'PATCH', body: JSON.stringify(form) });
    setSaving(false);
    if (res.success) {
      setSaved(true);
      await refreshUser();
      setTimeout(() => setSaved(false), 2500);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile & Settings</h1>
        <p className="text-muted-foreground mt-1">Manage your personal information and account security.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card>
          <CardContent className="p-8 space-y-5">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center">
                <UserCircle className="h-9 w-9 text-white" />
              </div>
              <div>
                <div className="font-bold text-lg">{user ? `${user.firstName} ${user.lastName}` : ''}</div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
                {user?.role && <Badge variant="secondary" className="mt-1 capitalize">{user.role}</Badge>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>First name</Label>
                <Input value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Last name</Label>
                <Input value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Phone</Label>
                <Input placeholder="+234…" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              {saved && <span className="text-sm text-green-600 dark:text-green-400 flex items-center gap-1"><ShieldCheck className="h-4 w-4" /> Saved!</span>}
              <span className="flex-1" />
              <Button onClick={saveProfile} disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <><Save className="mr-2 h-4 w-4" /> Save changes</>}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-6">
        <Card>
          <CardContent className="p-8 space-y-5">
            <h2 className="font-bold">Security</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current password</Label>
                <Input type="password" value={password.current} onChange={(e) => setPassword({ ...password, current: e.target.value })} placeholder="••••••••" />
              </div>
              <div className="space-y-2">
                <Label>New password</Label>
                <Input type="password" value={password.next} onChange={(e) => setPassword({ ...password, next: e.target.value })} placeholder="Min 8 chars, letters + numbers" />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Confirm new password</Label>
              <Input type="password" value={password.confirm} onChange={(e) => setPassword({ ...password, confirm: e.target.value })} placeholder="Repeat new password" />
            </div>
            <Button variant="outline">Update password</Button>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6">
        <Card className="border-red-200 dark:border-red-900">
          <CardContent className="p-8">
            <h2 className="font-bold">Session</h2>
            <p className="text-sm text-muted-foreground mt-1">Sign out of this device.</p>
            <Button variant="destructive" className="mt-4" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" /> Sign out</Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
