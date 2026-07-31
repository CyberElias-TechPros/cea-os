'use client';

import { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { CreditCard, Loader2, ReceiptText, CheckCircle2, ChevronLeft, ChevronRight, CalendarDays } from 'lucide-react';
import { useAuth } from '../../../lib/auth-context';

interface Invoice { id: string; invoiceNumber: string; clientId?: string; status: string; amount?: number; currency?: string; dueDate?: string; createdAt: string; paymentMethod?: string }

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

interface CalendarEvent { id: string; title: string; startDate: string; endDate?: string; type: string; format: string }

export default function CalendarPage() {
  const [month, setMonth] = useState(() => new Date().getMonth());
  const [year, setYear] = useState(() => new Date().getFullYear());
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await api<CalendarEvent[]>('/v1/community/events');
    if (res.success && res.data) setEvents(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [...Array(firstDay).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)];

  const eventForDay = (day: number) => {
    const date = new Date(year, month, day);
    return events.filter((e) => {
      const s = new Date(e.startDate);
      const e2 = e.endDate ? new Date(e.endDate) : s;
      return date >= new Date(s.getFullYear(), s.getMonth(), s.getDate()) && date <= new Date(e2.getFullYear(), e2.getMonth(), e2.getDate());
    });
  };

  const prev = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const upcoming = events
    .filter((e) => new Date(e.startDate) >= new Date())
    .sort((a, b) => Number(new Date(a.startDate)) - Number(new Date(b.startDate)))
    .slice(0, 5);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Calendar</h1>
        <p className="text-muted-foreground mt-1">Class schedules, events, and deadlines at a glance.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="rounded-3xl border bg-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">{MONTHS[month]} {year}</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={prev}><ChevronLeft className="h-4 w-4" /></Button>
                <Button variant="outline" size="sm" onClick={() => { setMonth(new Date().getMonth()); setYear(new Date().getFullYear()); }}>Today</Button>
                <Button variant="outline" size="sm" onClick={next}><ChevronRight className="h-4 w-4" /></Button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-muted-foreground mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => <div key={d} className="py-1 font-medium">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {cells.map((day, i) => {
                if (day === null) return <div key={i} />;
                const dayEvents = eventForDay(day);
                const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();
                return (
                  <div key={i} className={`min-h-16 rounded-xl border p-1.5 ${isToday ? 'border-primary bg-primary/5' : 'hover:border-primary/30 transition-colors'}`}>
                    <div className={`text-xs font-semibold ${isToday ? 'text-primary' : ''}`}>{day}</div>
                    <div className="mt-1 space-y-1">
                      {dayEvents.slice(0, 2).map((e) => (
                        <div key={e.id} title={e.title} className="truncate rounded bg-blue-100 dark:bg-blue-900/40 px-1 py-0.5 text-[10px] font-medium text-blue-700 dark:text-blue-300">
                          {e.title}
                        </div>
                      ))}
                      {dayEvents.length > 2 && <div className="text-[10px] text-muted-foreground">+{dayEvents.length - 2} more</div>}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="font-semibold text-lg flex items-center gap-2"><CalendarDays className="h-5 w-5 text-primary" /> Upcoming events</h2>
          {upcoming.length === 0 ? (
            <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">No upcoming events.</CardContent></Card>
          ) : (
            upcoming.map((e, i) => (
              <motion.div key={e.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <div className="font-semibold text-sm">{e.title}</div>
                        <div className="text-xs text-muted-foreground mt-1">
                          {new Date(e.startDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}
                          {new Date(e.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <Badge variant={e.format === 'in_person' ? 'info' : 'secondary'}>{e.format}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
          <Link href="/dashboard/community" className="block">
            <Button variant="outline" className="w-full">Browse all events</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
