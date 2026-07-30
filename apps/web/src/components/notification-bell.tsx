'use client';

import { useState, useEffect, useRef } from 'react';
import { Bell, Loader2, CheckCheck } from 'lucide-react';
import { Button } from '@cea/ui';
import { api } from '../lib/api-client';

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

export function NotificationBell() {
  const [unread, setUnread] = useState(0);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const load = async () => {
      const res = await api<{ count: number }>('/v1/notifications/unread-count');
      if (res.success && res.data) setUnread(res.data.count);
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!open) return;
    (async () => {
      setLoading(true);
      const res = await api<NotificationItem[]>('/v1/notifications?status=unread&limit=10');
      if (res.success && res.data) setNotifications(res.data);
      setLoading(false);
    })();
  }, [open]);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const markAllRead = async () => {
    await api('/v1/notifications/mark-all-read', { method: 'POST' });
    setUnread(0);
    setNotifications([]);
  };

  return (
    <div ref={ref} className="relative">
      <Button variant="ghost" size="icon" className="relative" onClick={() => setOpen(!open)}>
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-red-500 text-[10px] font-bold text-white flex items-center justify-center">
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 rounded-lg border bg-card shadow-lg z-50">
          <div className="flex items-center justify-between p-3 border-b">
            <span className="font-semibold text-sm">Notifications</span>
            {unread > 0 && (
              <button onClick={markAllRead} className="text-xs text-primary hover:underline flex items-center gap-1">
                <CheckCheck className="h-3 w-3" /> Mark all read
              </button>
            )}
          </div>
          <div className="max-h-80 overflow-y-auto">
            {loading ? (
              <div className="flex justify-center py-6"><Loader2 className="h-5 w-5 animate-spin" /></div>
            ) : notifications.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">No new notifications</p>
            ) : (
              notifications.map((n) => (
                <a
                  key={n.id}
                  href={n.actionUrl || '#'}
                  className="block p-3 hover:bg-accent transition-colors border-b last:border-0"
                  onClick={() => { api(`/v1/notifications/${n.id}/read`, { method: 'PATCH' }); setUnread(u => Math.max(0, u - 1)); }}
                >
                  <div className="font-medium text-sm">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{n.body}</div>
                </a>
              ))
            )}
          </div>
          <a href="/dashboard/notifications" className="block p-2 text-center text-xs text-primary hover:underline border-t">
            View all notifications
          </a>
        </div>
      )}
    </div>
  );
}
