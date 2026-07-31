'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Input } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { ShieldCheck, Users as UsersIcon, KeyRound, Loader2, Search, History, Sparkles, CheckCircle2, Ban } from 'lucide-react';

interface Role { id: string; name: string; slug: string; description?: string; hierarchy: number; permissions: string[] }
interface AdminUser {
  id: string; email: string; firstName: string; lastName: string; status: string;
  createdAt: number; lastLoginAt: number | null;
  roles: { id: string; name: string; slug: string }[];
}
interface AuditEntry {
  id: string; action: string; resource: string; resourceId?: string; severity: string;
  ipAddress?: string; createdAt: number;
  actor?: { firstName: string; lastName: string; email: string } | null;
}

export default function AdminPage() {
  const { user } = useAuth();
  const [roles, setRoles] = useState<Role[]>([]);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [audit, setAudit] = useState<AuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [booting, setBooting] = useState(false);
  const [bootstrapMsg, setBootstrapMsg] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedRoles, setSelectedRoles] = useState<Record<string, string[]>>({});
  const [savingId, setSavingId] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setForbidden(false);
    const [rRes, uRes, aRes] = await Promise.all([
      api<Role[]>('/v1/admin/roles'),
      api<AdminUser[]>('/v1/admin/users'),
      api<AuditEntry[]>('/v1/admin/audit'),
    ]);
    if (!rRes.success && (rRes.error?.code === 'FORBIDDEN' || rRes.error?.code === 'UNAUTHORIZED')) {
      setForbidden(true);
      setLoading(false);
      return;
    }
    if (rRes.success && rRes.data) setRoles(rRes.data);
    if (uRes.success && uRes.data) {
      setUsers(uRes.data);
      const map: Record<string, string[]> = {};
      for (const u of uRes.data) map[u.id] = u.roles.map(r => r.id);
      setSelectedRoles(map);
    }
    if (aRes.success && aRes.data) setAudit(aRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const bootstrap = async () => {
    setBooting(true);
    setBootstrapMsg(null);
    const res = await api<{ created: string[]; totalRoles: number; totalPermissions: number }>('/v1/admin/bootstrap', {
      method: 'POST',
      body: JSON.stringify({}),
    });
    setBooting(false);
    if (res.success && res.data) {
      setBootstrapMsg(`Bootstrap complete — ${res.data.totalRoles} roles, ${res.data.totalPermissions} permissions (${res.data.created.length} newly created).`);
      await load();
    } else {
      setBootstrapMsg(`Bootstrap failed: ${res.error?.message || 'unknown error'}`);
    }
  };

  const saveRoles = async (userId: string) => {
    setSavingId(userId);
    const res = await api(`/v1/admin/users/${userId}/roles`, {
      method: 'PATCH',
      body: JSON.stringify({ roleIds: selectedRoles[userId] ?? [] }),
    });
    setSavingId(null);
    if (res.success) await load();
  };

  const toggleRole = (userId: string, roleId: string) => {
    setSelectedRoles(prev => {
      const current = prev[userId] ?? [];
      return { ...prev, [userId]: current.includes(roleId) ? current.filter(r => r !== roleId) : [...current, roleId] };
    });
  };

  const setStatus = async (userId: string, status: string) => {
    await api(`/v1/users/${userId}`, { method: 'PATCH', body: JSON.stringify({ status }) });
    await load();
  };

  const filtered = useMemo(() => users.filter(u =>
    `${u.firstName} ${u.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  ), [users, search]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  if (forbidden) {
    return (
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-8">Admin Console</h1>
        <Card><CardContent className="p-14 text-center">
          <ShieldCheck className="h-12 w-12 text-muted-foreground mx-auto" />
          <h3 className="text-lg font-medium mt-4">Admin access required</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-md mx-auto">
            This area is restricted to administrators. If you are an admin, run the platform bootstrap from a privileged session or ask an administrator to grant you the admin role.
          </p>
        </CardContent></Card>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground mt-1">Roles, permissions, users and audit trail.</p>
      </div>

      <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent">
        <CardContent className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center"><Sparkles className="h-5 w-5 text-primary" /></div>
            <div>
              <div className="font-semibold">Platform bootstrap</div>
              <div className="text-sm text-muted-foreground">
                {roles.length > 0
                  ? `${roles.length} roles and ${roles.reduce((n, r) => n + r.permissions.length, 0)} permission grants configured.`
                  : 'No roles configured yet — run bootstrap to create the role & permission structure.'}
              </div>
              {bootstrapMsg && <div className={`text-sm mt-1 ${bootstrapMsg.startsWith('Bootstrap failed') ? 'text-red-500' : 'text-green-600'}`}>{bootstrapMsg}</div>}
            </div>
          </div>
          <Button onClick={bootstrap} disabled={booting}>
            {booting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ShieldCheck className="h-4 w-4 mr-2" />}
            {roles.length > 0 ? 'Re-run bootstrap' : 'Run bootstrap'}
          </Button>
        </CardContent>
      </Card>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="roles">Roles ({roles.length})</TabsTrigger>
          <TabsTrigger value="audit">Audit log</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search users by name or email..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
          </div>
          {filtered.length === 0 ? (
            <Card><CardContent className="p-14 text-center">
              <UsersIcon className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="mt-4 text-muted-foreground">No users found.</p>
            </CardContent></Card>
          ) : (
            <div className="space-y-3">
              {filtered.map(u => (
                <motion.div key={u.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card>
                    <CardContent className="p-5">
                      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
                        <div className="min-w-0">
                          <div className="font-semibold truncate">{u.firstName} {u.lastName}</div>
                          <div className="text-sm text-muted-foreground truncate">{u.email}</div>
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {u.roles.map(r => <Badge key={r.id} variant={r.slug === 'admin' ? 'default' : 'secondary'} className="text-xs">{r.name}</Badge>)}
                            <Badge variant={u.status === 'active' ? 'success' : 'destructive'} className="text-xs capitalize">{u.status}</Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {roles.map(r => (
                            <Button
                              key={r.id}
                              size="sm"
                              variant={(selectedRoles[u.id] ?? []).includes(r.id) ? 'default' : 'outline'}
                              onClick={() => toggleRole(u.id, r.id)}
                              className="text-xs"
                            >
                              {r.name}
                            </Button>
                          ))}
                          <Button size="sm" onClick={() => saveRoles(u.id)} disabled={savingId === u.id}>
                            {savingId === u.id ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : 'Save roles'}
                          </Button>
                          {u.status === 'active' ? (
                            <Button size="sm" variant="ghost" className="text-destructive" onClick={() => setStatus(u.id, 'inactive')}>
                              <Ban className="h-3.5 w-3.5 mr-1" /> Deactivate
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost" className="text-green-600" onClick={() => setStatus(u.id, 'active')}>
                              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Activate
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="roles" className="space-y-3">
          {roles.length === 0 ? (
            <Card><CardContent className="p-14 text-center">
              <KeyRound className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="mt-4 text-muted-foreground">No roles yet — run the bootstrap above.</p>
            </CardContent></Card>
          ) : (
            roles.map((r, i) => (
              <motion.div key={r.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                <Card>
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <span className="font-semibold">{r.name}</span>
                        <span className="ml-2 text-xs font-mono text-muted-foreground">slug: {r.slug}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">{r.permissions.length} permissions</Badge>
                    </div>
                    {r.description && <p className="text-sm text-muted-foreground mb-2">{r.description}</p>}
                    <div className="flex flex-wrap gap-1.5">
                      {r.permissions.slice(0, 12).map(p => <Badge key={p} variant="secondary" className="text-[10px] font-mono">{p}</Badge>)}
                      {r.permissions.length > 12 && <Badge variant="outline" className="text-[10px]">+{r.permissions.length - 12} more</Badge>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>

        <TabsContent value="audit" className="space-y-3">
          {audit.length === 0 ? (
            <Card><CardContent className="p-14 text-center">
              <History className="h-12 w-12 text-muted-foreground mx-auto" />
              <p className="mt-4 text-muted-foreground">No audit events recorded yet.</p>
            </CardContent></Card>
          ) : (
            audit.map((entry, i) => (
              <motion.div key={entry.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
                <Card>
                  <CardContent className="p-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm">
                    <Badge variant={entry.severity === 'critical' || entry.severity === 'error' ? 'destructive' : 'outline'} className="text-xs capitalize shrink-0">{entry.severity}</Badge>
                    <span className="font-mono text-xs text-primary shrink-0">{entry.action} · {entry.resource}</span>
                    <span className="text-muted-foreground shrink-0">{entry.actor ? `${entry.actor.firstName} ${entry.actor.lastName}` : 'System'}</span>
                    <span className="text-xs text-muted-foreground ml-auto shrink-0">{new Date(entry.createdAt).toLocaleString()}</span>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
