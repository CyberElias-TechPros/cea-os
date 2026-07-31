'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { CalendarCheck2, Loader2, QrCode, CheckCircle2, AlertCircle } from 'lucide-react';

interface Enrollment { id: string; courseId: string }
interface Course { id: string; name: string }
interface AttendanceRecord { id: string; enrollmentId: string; status: string; sessionDate: string; checkInMethod?: string }

export default function AttendancePage() {
  const [enrollments, setEnrollments] = useState<{ id: string; courseName: string }[]>([]);
  const [records, setRecords] = useState<AttendanceRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [checkingIn, setCheckingIn] = useState<string | null>(null);
  const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const enr = await api<Enrollment[]>('/v1/enrollments');
    const list: { id: string; courseName: string }[] = [];
    const allRecords: AttendanceRecord[] = [];
    if (enr.success && enr.data) {
      for (const e of enr.data) {
        const courseRes = await api<Course>(`/v1/courses/${e.courseId}`);
        if (courseRes.success && courseRes.data) list.push({ id: e.id, courseName: courseRes.data.name });
        const attRes = await api<AttendanceRecord[]>(`/v1/attendance/course/${e.courseId}`);
        if (attRes.success && attRes.data) allRecords.push(...attRes.data);
      }
    }
    setEnrollments(list);
    setRecords(allRecords);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const checkIn = async (enrollmentId: string) => {
    setCheckingIn(enrollmentId);
    setMessage(null);
    const res = await api('/v1/attendance/check-in', { method: 'POST', body: JSON.stringify({ enrollmentId }) });
    setCheckingIn(null);
    if (res.success) {
      setMessage({ ok: true, text: 'Checked in successfully!' });
      await load();
    } else {
      setMessage({ ok: false, text: res.error?.message || 'Check-in failed' });
    }
  };

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const myRecords = records.sort((a, b) => Number(new Date(b.sessionDate)) - Number(new Date(a.sessionDate)));
  const presentCount = records.filter((r) => r.status === 'present').length;
  const rate = records.length ? Math.round((presentCount / records.length) * 100) : null;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Attendance</h1>
        <p className="text-muted-foreground mt-1">Check in to class and view your attendance history.</p>
      </div>

      {rate !== null && (
        <Card className="mb-6">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CalendarCheck2 className="h-8 w-8 text-blue-500" />
              <div>
                <div className="text-2xl font-bold">{rate}%</div>
                <div className="text-sm text-muted-foreground">Attendance rate ({presentCount}/{records.length} sessions)</div>
              </div>
            </div>
            <Badge variant={rate >= 85 ? 'success' : rate >= 60 ? 'warning' : 'destructive'}>
              {rate >= 85 ? 'Excellent' : rate >= 60 ? 'At risk' : 'Low'}
            </Badge>
          </CardContent>
        </Card>
      )}

      {message && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`mb-6 flex items-center gap-3 rounded-2xl border p-4 ${message.ok ? 'border-green-500/30 bg-green-50 dark:bg-green-900/20' : 'border-red-500/30 bg-red-50 dark:bg-red-900/20'}`}>
          {message.ok ? <CheckCircle2 className="h-5 w-5 text-green-500" /> : <AlertCircle className="h-5 w-5 text-red-500" />}
          <span className="text-sm font-medium">{message.text}</span>
        </motion.div>
      )}

      <h2 className="text-lg font-semibold mb-4">Check in</h2>
      <div className="grid md:grid-cols-2 gap-4 mb-10">
        {enrollments.map((e, i) => (
          <motion.div key={e.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
            <Card className="h-full">
              <CardContent className="p-6 flex items-center justify-between gap-4">
                <div>
                  <div className="font-semibold">{e.courseName}</div>
                  <div className="text-xs text-muted-foreground mt-1">One check-in per day</div>
                </div>
                <Button onClick={() => checkIn(e.id)} disabled={checkingIn === e.id} className="shrink-0">
                  {checkingIn === e.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <><QrCode className="mr-2 h-4 w-4" /> Check in</>}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <h2 className="text-lg font-semibold mb-4">History</h2>
      {myRecords.length === 0 ? (
        <Card><CardContent className="p-10 text-center text-muted-foreground">No attendance records yet.</CardContent></Card>
      ) : (
        <div className="rounded-2xl border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-4 text-left font-medium">Date</th>
                <th className="p-4 text-left font-medium">Status</th>
                <th className="p-4 text-left font-medium">Method</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {myRecords.slice(0, 30).map((r) => (
                <tr key={r.id}>
                  <td className="p-4">{new Date(r.sessionDate).toLocaleString()}</td>
                  <td className="p-4">
                    <Badge variant={r.status === 'present' ? 'success' : 'destructive'} className="capitalize">{r.status}</Badge>
                  </td>
                  <td className="p-4 capitalize text-muted-foreground">{r.checkInMethod ?? '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
