'use client';

import { useCallback, useEffect, useState } from 'react';
import { Card, CardContent, Badge } from '@cea/ui';
import { Loader2, Landmark, Users, BookOpenCheck, GraduationCap, TrendingUp, ClipboardCheck } from 'lucide-react';
import { api } from '../../../lib/api-client';
import Link from 'next/link';
import { Button } from '@cea/ui';

interface GovData {
  generatedAt: string; totalStudents: number; activeEnrollments: number; passRate: number | null;
  attendanceRate: number | null; courseCompletions: number; newEnrollmentsThisMonth: number;
  enrolled: number; applications: number; acceptedApplications: number; avgGrade: number | null;
}

export default function GovernmentPortal() {
  const [data, setData] = useState<GovData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<GovData>('/v1/platform/portals/government');
    if (res.success && res.data) setData(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  return (
    <div className="min-h-[70vh] py-12 px-4 max-w-5xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <Badge variant="outline" className="mb-2">Government Compliance Portal</Badge>
          <h1 className="text-3xl font-bold">Compliance Reporting</h1>
          <p className="text-muted-foreground mt-1">Read-only institutional metrics for regulatory oversight. Data refreshed {data ? new Date(data.generatedAt).toLocaleString('en-ZA') : '—'}.</p>
        </div>
        <Link href="/portal"><Button variant="outline" size="sm">All portals</Button></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Registered students</span></div><p className="text-2xl font-bold">{data?.totalStudents ?? 0}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><BookOpenCheck className="h-5 w-5 text-sky-500" /><span className="text-sm text-muted-foreground">Active enrollments</span></div><p className="text-2xl font-bold">{data?.activeEnrollments ?? 0}</p><p className="text-xs text-muted-foreground">+{data?.newEnrollmentsThisMonth ?? 0} this month</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><GraduationCap className="h-5 w-5 text-violet-500" /><span className="text-sm text-muted-foreground">Pass rate</span></div><p className="text-2xl font-bold">{data?.passRate != null ? `${data.passRate}%` : '—'}</p><p className="text-xs text-muted-foreground">avg grade {data?.avgGrade != null ? `${Math.round(data.avgGrade)}%` : '—'}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5 text-emerald-500" /><span className="text-sm text-muted-foreground">Attendance</span></div><p className="text-2xl font-bold">{data?.attendanceRate != null ? `${data.attendanceRate}%` : '—'}</p></CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-8">
          <h2 className="text-lg font-semibold flex items-center gap-2 mb-4"><TrendingUp className="h-5 w-5 text-blue-600" /> Regulatory summary</h2>
          <div className="grid gap-6 sm:grid-cols-3 text-sm">
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground">Course completions</p>
              <p className="text-2xl font-bold mt-1">{data?.courseCompletions ?? 0}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground">Admissions applications</p>
              <p className="text-2xl font-bold mt-1">{data?.applications ?? 0}</p>
            </div>
            <div className="rounded-lg border p-4">
              <p className="text-muted-foreground">Accepted applicants</p>
              <p className="text-2xl font-bold mt-1">{data?.acceptedApplications ?? 0}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Landmark className="h-4 w-4" /> This portal is read-only. All figures are computed live from the CEA-OS institutional database.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
