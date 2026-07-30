'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, Button } from '@cea/ui';
import { Loader2, CheckCheck, Bell, ArrowLeft } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';

interface NotificationItem {
  id: string;
  title: string;
  body: string;
  category: string;
  actionUrl?: string;
  status: string;
  createdAt: string;
  icon?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'unread' | 'all'>('unread');

  const load = async () => {
    setLoading(true);
    const res = await api<NotificationItem[]>(`/v1/notifications?status=${tab}&limit=50`);
    if (res.success && res.data) setNotifications(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, [tab]);

  const markRead = async (id: string) => {
    await api(`/v1/notifications/${id}/read`, { method: 'PATCH' });
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, status: 'read' } : n));
  };

  const markAllRead = async () => {
    await api('/v1/notifications/mark-all-read', { method: 'POST' });
    setNotifications(prev => prev.map(n => ({ ...n, status: 'read' })));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard"><Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button></Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
            <p className="text-muted-foreground">Stay updated on your activity</p>
          </div>
        </div>
        {notifications.some(n => n.status === 'unread') && (
          <Button variant="outline" size="sm" onClick={markAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Mark All Read
          </Button>
        )}
      </div>

      <div className="flex gap-2">
        <Button variant={tab === 'unread' ? 'default' : 'outline'} size="sm" onClick={() => setTab('unread')}>Unread</Button>
        <Button variant={tab === 'all' ? 'default' : 'outline'} size="sm" onClick={() => setTab('all')}>All</Button>
      </div>

      <Card>
        <CardHeader><CardTitle className="flex items-center gap-2"><Bell className="h-5 w-5" /> {tab === 'unread' ? 'Unread' : 'All'} Notifications</CardTitle></CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="h-8 w-8 animate-spin" /></div>
          ) : notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No notifications</p>
          ) : (
            <div className="space-y-1">
              {notifications.map((n) => (
                <div key={n.id} className={`flex items-start gap-3 p-4 rounded-lg border ${n.status === 'unread' ? 'bg-accent/50' : ''}`}>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm">{n.title}</div>
                    <div className="text-sm text-muted-foreground mt-0.5">{n.body}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground capitalize">{n.category}</span>
                      <span className="text-xs text-muted-foreground">{new Date(n.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    {n.actionUrl && (
                      <Link href={n.actionUrl}><Button variant="outline" size="sm">View</Button></Link>
                    )}
                    {n.status === 'unread' && (
                      <Button variant="ghost" size="sm" onClick={() => markRead(n.id)}>Dismiss</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
