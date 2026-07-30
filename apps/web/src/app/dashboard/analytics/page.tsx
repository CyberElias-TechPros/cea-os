'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Loader2, TrendingUp, Users, BookOpen, GraduationCap, AlertTriangle } from 'lucide-react';
import { api } from '../../../lib/api-client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Summary {
  totalStudents: number; activeEnrollments: number; avgGrade: number | null; passRate: number | null;
  attendanceRate: number | null; courseCompletions: number; newEnrollmentsThisMonth: number;
}
interface AtRisk { userId: string; riskScore: number; factors: string[]; }
interface GradeDist { range: string; count: number; }
interface Trend { month: string; count: number; }
interface TopCourse { courseId: string; enrollmentCount: number; avgGrade: number | null; }

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [atRisk, setAtRisk] = useState<AtRisk[]>([]);
  const [gradeDist, setGradeDist] = useState<GradeDist[]>([]);
  const [trends, setTrends] = useState<Trend[]>([]);
  const [topCourses, setTopCourses] = useState<TopCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [sRes, aRes, gRes, tRes, cRes] = await Promise.all([
        api<Summary>('/v1/analytics/summary'),
        api<AtRisk[]>('/v1/analytics/at-risk'),
        api<GradeDist[]>('/v1/analytics/grades/distribution'),
        api<Trend[]>('/v1/analytics/enrollments/trends'),
        api<TopCourse[]>('/v1/analytics/courses/top'),
      ]);
      if (sRes.success && sRes.data) setSummary(sRes.data);
      if (aRes.success && aRes.data) setAtRisk(aRes.data);
      if (gRes.success && gRes.data) setGradeDist(gRes.data);
      if (tRes.success && tRes.data) setTrends(tRes.data);
      if (cRes.success && cRes.data) setTopCourses(cRes.data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
        <p className="text-muted-foreground">Institutional insights and at-risk student detection</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Total Students</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary?.totalStudents || 0}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Active Enrollments</CardTitle><BookOpen className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary?.activeEnrollments || 0}</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Pass Rate</CardTitle><GraduationCap className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary?.passRate ?? 'N/A'}%</div></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between pb-2"><CardTitle className="text-sm font-medium">Attendance Rate</CardTitle><TrendingUp className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{summary?.attendanceRate ?? 'N/A'}%</div></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle>Grade Distribution</CardTitle><CardDescription>Spread of student grades</CardDescription></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><BarChart data={gradeDist}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="range" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#3b82f6" /></BarChart></ResponsiveContainer></CardContent></Card>
        <Card><CardHeader><CardTitle>Enrollment Trends</CardTitle><CardDescription>Monthly enrollment count</CardDescription></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><LineChart data={trends}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="month" /><YAxis /><Tooltip /><Line type="monotone" dataKey="count" stroke="#22c55e" strokeWidth={2} /></LineChart></ResponsiveContainer></CardContent></Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card><CardHeader><CardTitle className="flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-red-500" />At-Risk Students</CardTitle><CardDescription>Students needing intervention</CardDescription></CardHeader><CardContent>{atRisk.length === 0 ? <p className="text-sm text-muted-foreground">No at-risk students detected</p> : <div className="space-y-3">{atRisk.map(s => <div key={s.userId} className="border rounded-lg p-3"><div className="flex justify-between items-center"><span className="font-medium text-sm">{s.userId.slice(0, 8)}...</span><span className="text-red-500 font-bold">{s.riskScore}%</span></div><p className="text-xs text-muted-foreground mt-1">{s.factors.join(', ')}</p></div>)}</div>}</CardContent></Card>
        <Card><CardHeader><CardTitle>Top Courses</CardTitle><CardDescription>By enrollment count</CardDescription></CardHeader><CardContent className="h-72"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={topCourses.map(c => ({ name: c.courseId.slice(0, 8), value: c.enrollmentCount }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{topCourses.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></CardContent></Card>
      </div>
    </div>
  );
}
