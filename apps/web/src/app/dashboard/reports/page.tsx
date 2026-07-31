'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Badge, Tabs, TabsContent, TabsList, TabsTrigger, Select } from '@cea/ui';
import { Loader2, FileDown, FileText, CalendarDays, ShieldCheck } from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface Report { title: string; generatedAt: string; data: any; }

const REPORTS: { key: string; label: string; desc: string }[] = [
  { key: 'institutional', label: 'Institutional Health', desc: 'Enrollment, grades, attendance, revenue snapshot' },
  { key: 'student-performance', label: 'Student Performance', desc: 'Grade distribution across all assessments' },
  { key: 'enrollment', label: 'Enrollment Trends', desc: 'Monthly enrollment growth' },
];

const csv = (rows: (string | number | null)[][]) => rows.map(r => r.map(c => {
  if (c === null || c === undefined) return '';
  const s = String(c);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}).join(',')).join('\n');

const download = (filename: string, content: string) => {
  const blob = new Blob([content], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export default function ReportsPage() {
  const { user } = useAuth();
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);

  const generate = async (key: string) => {
    setLoading(true);
    const res = await api<Report>(`/v1/analytics/reports/${key}`);
    if (res.success && res.data) setReport(res.data);
    setLoading(false);
  };

  const exportCsv = () => {
    if (!report) return;
    setExporting(true);
    const s = report.data?.summary ?? {};
    const rows: (string | number | null)[][] = [
      ['Metric', 'Value'],
      ['Total students', s.totalStudents ?? 0],
      ['Active enrollments', s.activeEnrollments ?? 0],
      ['Average grade', s.avgGrade != null ? `${Math.round(s.avgGrade)}%` : 'n/a'],
      ['Pass rate', s.passRate != null ? `${s.passRate}%` : 'n/a'],
      ['Attendance rate', s.attendanceRate != null ? `${s.attendanceRate}%` : 'n/a'],
      ['Course completions', s.courseCompletions ?? 0],
      ['New enrollments this month', s.newEnrollmentsThisMonth ?? 0],
      ['Revenue', s.revenue ?? 0],
    ];
    const dist = (report.data?.gradeDistribution ?? []).map((d: any) => [`Grades ${d.range}`, d.count]);
    const trends = (report.data?.enrollmentTrends ?? []).map((t: any) => [`Enrollments ${t.month}`, t.count]);
    const all = [...rows, [], ['Grade distribution'], ...dist, [], ['Enrollment trends'], ...trends];
    download(`${report.title.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().slice(0, 10)}.csv`, csv(all));
    setExporting(false);
  };

  const isAdmin = (user?.roles ?? []).some((r: string) => ['admin', 'staff'].includes(r.toLowerCase()));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports & Exports</h1>
        <p className="text-muted-foreground mt-1">Generate institutional reports and export CSV downloads.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {REPORTS.map(r => (
          <Card key={r.key} className="hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base"><FileText className="h-4 w-4 text-blue-500" /> {r.label}</CardTitle>
              <CardDescription>{r.desc}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" onClick={() => generate(r.key)} disabled={loading}>
                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {report && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{report.title}</CardTitle>
                <CardDescription>Generated {new Date(report.generatedAt).toLocaleString('en-ZA')} · {isAdmin ? 'Full access' : 'Self-service export'}</CardDescription>
              </div>
              <Button onClick={exportCsv} disabled={exporting}><FileDown className="h-4 w-4 mr-2" /> Export CSV</Button>
            </div>
          </CardHeader>
          <CardContent>
            {report.data?.summary && (
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {Object.entries(report.data.summary).map(([k, v]) => (
                  <div key={k} className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground capitalize">{k.replace(/([A-Z])/g, ' $1')}</p>
                    <p className="text-xl font-bold mt-1">{v == null ? '—' : typeof v === 'number' ? (k.includes('rate') || k.includes('grade') && !k.includes('avg') ? `${Math.round(v)}%` : Math.round(v)) : String(v)}</p>
                  </div>
                ))}
              </div>
            )}
            {report.data?.enrollmentTrends && report.data.enrollmentTrends.length > 0 && (
              <div className="mt-6">
                <p className="text-sm font-medium mb-2">Enrollment trends</p>
                <div className="flex items-end gap-2 h-32">
                  {report.data.enrollmentTrends.map((t: any) => (
                    <div key={t.month} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full rounded-t bg-primary/70" style={{ height: `${Math.max(8, (t.count / Math.max(...report.data.enrollmentTrends.map((x: any) => x.count))) * 100)}px` }} title={`${t.month}: ${t.count}`} />
                      <span className="text-[10px] text-muted-foreground">{t.month.slice(5)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" /> Exports are generated from live data at request time. No data is stored server-side.
      </div>
    </div>
  );
}
