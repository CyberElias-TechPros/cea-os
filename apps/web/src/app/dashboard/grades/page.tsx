'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { GraduationCap, Loader2, TrendingUp, FileQuestion, MessageSquareText } from 'lucide-react';

interface Grade { id: string; gradedItemType: string; score: number; pointsPossible: number; percentage: number; isPassing: boolean; feedback?: string }
interface Course { id: string; name: string }
interface Row { enrollment: { id: string; status: string }; course: Course | null; grades: Grade[] }

export default function GradesPage() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await api<Row[]>('/v1/gradebook/my');
    if (res.success && res.data) setRows(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const overall = (() => {
    const all = rows.flatMap((r) => r.grades);
    if (all.length === 0) return null;
    const avg = all.reduce((s, g) => s + g.percentage, 0) / all.length;
    return avg;
  })();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Gradebook</h1>
        <p className="text-muted-foreground mt-1">Your scores across all enrolled courses.</p>
      </div>

      {overall !== null && (
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground flex items-center gap-2"><TrendingUp className="h-4 w-4" /> Overall average</div>
              <div className="text-3xl font-bold mt-1">{Math.round(overall)}%</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground flex items-center gap-2"><GraduationCap className="h-4 w-4" /> Courses</div>
              <div className="text-3xl font-bold mt-1">{rows.filter((r) => r.grades.length > 0).length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-sm text-muted-foreground flex items-center gap-2"><FileQuestion className="h-4 w-4" /> Graded items</div>
              <div className="text-3xl font-bold mt-1">{rows.flatMap((r) => r.grades).length}</div>
            </CardContent>
          </Card>
        </div>
      )}

      {rows.length === 0 ? (
        <Card><CardContent className="p-14 text-center">
          <FileQuestion className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">You are not enrolled in any courses yet.</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-6">
          {rows.map((row, ri) => {
            const avg = row.grades.length ? row.grades.reduce((s, g) => s + g.percentage, 0) / row.grades.length : null;
            return (
              <motion.div key={row.enrollment.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: ri * 0.05 }}>
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                      <h2 className="font-semibold text-lg">{row.course?.name ?? 'Course'}</h2>
                      {avg !== null && (
                        <div className="flex items-center gap-3">
                          <div className="h-2 w-40 rounded-full bg-muted overflow-hidden">
                            <motion.div animate={{ width: `${avg}%` }} transition={{ duration: 0.8 }} className={`h-full ${avg >= 60 ? 'bg-green-500' : 'bg-red-500'}`} />
                          </div>
                          <Badge variant={avg >= 60 ? 'success' : 'destructive'}>{Math.round(avg)}%</Badge>
                        </div>
                      )}
                    </div>
                    {row.grades.length === 0 ? (
                      <p className="text-sm text-muted-foreground">No grades published yet.</p>
                    ) : (
                      <div className="divide-y">
                        {row.grades.map((g) => (
                          <div key={g.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-3">
                              <Badge variant="secondary" className="capitalize">{g.gradedItemType}</Badge>
                              <span className="text-sm">{g.score}/{g.pointsPossible} pts</span>
                              {g.feedback && (
                                <span className="text-xs text-muted-foreground flex items-center gap-1 truncate max-w-[300px]">
                                  <MessageSquareText className="h-3 w-3 shrink-0" /> {g.feedback}
                                </span>
                              )}
                            </div>
                            <span className={`text-sm font-bold ${g.percentage >= 60 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                              {Math.round(g.percentage)}%
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
