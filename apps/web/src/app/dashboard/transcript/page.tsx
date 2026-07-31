'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { Loader2, Printer, FileText, GraduationCap } from 'lucide-react';

interface Grade { id: string; gradedItemType: string; score: number; pointsPossible: number; percentage: number; isPassing: boolean }
interface Course { id: string; name: string; code?: string }
interface Row { enrollment: { id: string; status: string }; course: Course | null; grades: Grade[] }

export default function TranscriptPage() {
  const { user } = useAuth();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await api<Row[]>('/v1/gradebook/my');
    if (res.success && res.data) setRows(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const completed = rows.filter(r => r.enrollment.status === 'completed' && r.grades.length > 0);
  const allPercentages = rows.flatMap(r => r.grades.map(g => g.percentage));
  const overall = allPercentages.length > 0
    ? Math.round(allPercentages.reduce((s, p) => s + p, 0) / allPercentages.length)
    : 0;
  const averagePerCourse = completed.map(r => ({
    course: r.course,
    avg: Math.round(r.grades.reduce((s, g) => s + g.percentage, 0) / r.grades.length),
  }));

  const gradeBand = (p: number) => p >= 75 ? 'A' : p >= 70 ? 'B' : p >= 60 ? 'C' : p >= 50 ? 'D' : 'F';

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Academic Transcript</h1>
          <p className="text-muted-foreground mt-1">Official record of course results.</p>
        </div>
        <Button onClick={() => window.print()}><Printer className="mr-2 h-4 w-4" /> Print / Save as PDF</Button>
      </div>

      <Card className="print-card">
        <CardContent className="p-0">
          <div id="transcript-sheet" className="bg-white text-slate-900 p-10 md:p-14 min-h-[700px]">
            <div className="flex items-center gap-4 border-b-4 border-slate-900 pb-6 mb-8">
              <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white shrink-0">
                <GraduationCap className="h-8 w-8" />
              </div>
              <div>
                <div className="text-lg font-extrabold uppercase tracking-tight">Cyber Elias Academy</div>
                <div className="text-sm text-slate-500">Academic Transcript — Verified by CEA-OS</div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8 text-sm">
              <div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Student</div>
                <div className="font-bold">{user?.firstName} {user?.lastName}</div>
                <div className="text-slate-500">{user?.email}</div>
              </div>
              <div className="sm:text-right">
                <div className="text-xs uppercase tracking-wider text-slate-400 mb-1">Overall average</div>
                <div className="text-3xl font-extrabold">{overall}%</div>
                <div className="text-slate-500 text-xs">{allPercentages.length} graded assessments</div>
              </div>
            </div>

            {averagePerCourse.length === 0 ? (
              <div className="rounded-xl border border-dashed border-slate-300 p-10 text-center text-sm text-slate-500">
                No completed courses yet. Transcript updates automatically as you finish assessments.
              </div>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-slate-900 text-left">
                    <th className="py-2 pr-4 text-xs uppercase tracking-wider text-slate-400">Course</th>
                    <th className="py-2 pr-4 text-xs uppercase tracking-wider text-slate-400">Assessments</th>
                    <th className="py-2 pr-4 text-xs uppercase tracking-wider text-slate-400">Average</th>
                    <th className="py-2 text-xs uppercase tracking-wider text-slate-400">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {averagePerCourse.map(({ course, avg }) => (
                    <tr key={course?.id ?? Math.random()} className="border-b border-slate-100">
                      <td className="py-3 pr-4 font-semibold">{course?.name ?? 'Course'}</td>
                      <td className="py-3 pr-4 text-slate-500">{completed.find(r => r.course?.id === course?.id)?.grades.length ?? 0}</td>
                      <td className="py-3 pr-4 font-bold">{avg}%</td>
                      <td className="py-3">
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white font-bold">{gradeBand(avg)}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><FileText className="h-3.5 w-3.5" /> Generated {new Date().toLocaleDateString('en-ZA')} · CEA-OS Academic Records</span>
              <span className="font-mono">TXN-{Date.now().toString(36).toUpperCase()}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #transcript-sheet, #transcript-sheet * { visibility: visible; }
          #transcript-sheet { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; min-height: 0; }
          .print-card { box-shadow: none !important; border: none !important; }
          @page { margin: 12mm; }
        }
      `}</style>
    </div>
  );
}
