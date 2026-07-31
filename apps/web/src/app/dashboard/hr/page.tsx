'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, Button, Input, Textarea, Badge, Separator, Tabs, TabsContent, TabsList, TabsTrigger, Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@cea/ui';
import { Plus, Loader2, Users, Building2, CalendarDays, Clock, UserCheck } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Employee { id: string; userId: string; employeeCode: string; position?: string; departmentId?: string; branchId?: string; status: string; employmentType: string; }
interface LeaveRequest { id: string; type: string; startDate: string; endDate: string; days: number; status: string; reason?: string; }
interface StaffAttendanceRecord { id: string; employeeId: string; date: string; clockIn?: string; clockOut?: string; status: string; }

export default function HRPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [leaves, setLeaves] = useState<LeaveRequest[]>([]);
  const [attendance, setAttendance] = useState<StaffAttendanceRecord[]>([]);
  const [departments, setDepartments] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLeaveForm, setShowLeaveForm] = useState(false);
  const [showEmpForm, setShowEmpForm] = useState(false);
  const [leaveForm, setLeaveForm] = useState({ type: 'annual', startDate: '', endDate: '', reason: '' });
  const [empForm, setEmpForm] = useState({ userId: '', employeeCode: '', position: '', employmentType: 'full_time' });

  const load = async () => {
    setLoading(true);
    const [empRes, leaveRes, attRes, deptRes] = await Promise.all([
      api<Employee[]>('/v1/hr/employees'),
      api<LeaveRequest[]>('/v1/hr/leave'),
      api<StaffAttendanceRecord[]>('/v1/hr/attendance'),
      api<{ id: string; name: string }[]>('/v1/hr/departments'),
    ]);
    if (empRes.success && empRes.data) setEmployees(empRes.data);
    if (leaveRes.success && leaveRes.data) setLeaves(leaveRes.data);
    if (attRes.success && attRes.data) setAttendance(attRes.data);
    if (deptRes.success && deptRes.data) setDepartments(deptRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const submitLeave = async () => {
    const start = new Date(leaveForm.startDate);
    const end = new Date(leaveForm.endDate);
    const days = Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    await api('/v1/hr/leave', { method: 'POST', body: JSON.stringify({ ...leaveForm, days }) });
    setShowLeaveForm(false);
    setLeaveForm({ type: 'annual', startDate: '', endDate: '', reason: '' });
    await load();
  };

  const createEmployee = async () => {
    await api('/v1/hr/employees', { method: 'POST', body: JSON.stringify(empForm) });
    setShowEmpForm(false);
    setEmpForm({ userId: '', employeeCode: '', position: '', employmentType: 'full_time' });
    await load();
  };

  const decideLeave = async (id: string, accept: boolean) => {
    await api(`/v1/hr/leave/${id}/decide`, { method: 'POST', body: JSON.stringify({ approved: accept }) });
    await load();
  };

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const statusCounts = { active: employees.filter(e => e.status === 'active').length, on_leave: employees.filter(e => e.status === 'on_leave').length };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div><h1 className="text-3xl font-bold">HR & People</h1><p className="text-muted-foreground mt-1">Employees, leave, and attendance</p></div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setShowLeaveForm(true)}><CalendarDays className="h-4 w-4 mr-2" /> Request Leave</Button>
          <Button onClick={() => setShowEmpForm(true)}><Plus className="h-4 w-4 mr-2" /> Add Employee</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Users className="h-5 w-5 text-blue-500" /><span className="text-sm text-muted-foreground">Total Staff</span></div><p className="text-2xl font-bold">{employees.length}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><UserCheck className="h-5 w-5 text-green-500" /><span className="text-sm text-muted-foreground">Active</span></div><p className="text-2xl font-bold text-green-600">{statusCounts.active}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Clock className="h-5 w-5 text-orange-500" /><span className="text-sm text-muted-foreground">On Leave</span></div><p className="text-2xl font-bold text-orange-600">{statusCounts.on_leave}</p></CardContent></Card>
        <Card><CardContent className="p-6"><div className="flex items-center gap-2"><Building2 className="h-5 w-5 text-purple-500" /><span className="text-sm text-muted-foreground">Departments</span></div><p className="text-2xl font-bold">{departments.length}</p></CardContent></Card>
      </div>

      <Tabs defaultValue="employees">
        <TabsList>
          <TabsTrigger value="employees">Employees ({employees.length})</TabsTrigger>
          <TabsTrigger value="leave">Leave ({leaves.length})</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>
        <TabsContent value="employees">
          {employees.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Users className="h-12 w-12 mx-auto mb-4" /><p>No employees registered.</p></div> : (
            <div className="grid gap-3">{employees.map(e => (
              <Card key={e.id}><CardContent className="flex items-center justify-between py-4">
                <div><p className="font-medium">{e.employeeCode}</p><p className="text-sm text-muted-foreground">{e.position || 'No position'} · {e.employmentType}</p></div>
                <Badge variant={e.status === 'active' ? 'default' : e.status === 'on_leave' ? 'secondary' : 'destructive'}>{e.status}</Badge>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="leave">
          {leaves.length === 0 ? <div className="text-center py-12 text-muted-foreground"><CalendarDays className="h-12 w-12 mx-auto mb-4" /><p>No leave requests yet.</p></div> : (
            <div className="space-y-2">{leaves.map(l => (
              <Card key={l.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium capitalize">{l.type} Leave</p><p className="text-xs text-muted-foreground">{new Date(l.startDate).toLocaleDateString()} - {new Date(l.endDate).toLocaleDateString()} ({l.days} days)</p></div>
                <div className="flex items-center gap-2">
                  <Badge variant={l.status === 'approved' ? 'default' : l.status === 'rejected' ? 'destructive' : 'secondary'}>{l.status}</Badge>
                  {l.status === 'pending' && (
                    <>
                      <Button size="sm" variant="outline" onClick={() => decideLeave(l.id, true)}>Approve</Button>
                      <Button size="sm" variant="ghost" className="text-destructive" onClick={() => decideLeave(l.id, false)}>Reject</Button>
                    </>
                  )}
                </div>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
        <TabsContent value="attendance">
          {attendance.length === 0 ? <div className="text-center py-12 text-muted-foreground"><Clock className="h-12 w-12 mx-auto mb-4" /><p>No attendance records yet.</p></div> : (
            <div className="space-y-2">{attendance.map(a => (
              <Card key={a.id}><CardContent className="flex items-center justify-between py-3">
                <div><p className="text-sm font-medium">{new Date(a.date).toLocaleDateString()}</p><p className="text-xs text-muted-foreground">{a.clockIn || '--'} to {a.clockOut || '--'}</p></div>
                <Badge variant={a.status === 'present' ? 'default' : a.status === 'late' ? 'destructive' : 'secondary'}>{a.status}</Badge>
              </CardContent></Card>
            ))}</div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={showLeaveForm} onOpenChange={setShowLeaveForm}>
        <DialogContent><DialogHeader><DialogTitle>Request Leave</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={leaveForm.type} onChange={e => setLeaveForm(f => ({ ...f, type: e.target.value }))}>
                <option value="annual">Annual</option><option value="sick">Sick</option><option value="personal">Personal</option><option value="study">Study</option></select></div>
            <div className="grid grid-cols-2 gap-4"><div><label className="text-sm font-medium">Start Date</label><Input type="date" value={leaveForm.startDate} onChange={e => setLeaveForm(f => ({ ...f, startDate: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">End Date</label><Input type="date" value={leaveForm.endDate} onChange={e => setLeaveForm(f => ({ ...f, endDate: e.target.value }))} /></div></div>
            <div><label className="text-sm font-medium">Reason</label><Textarea value={leaveForm.reason} onChange={e => setLeaveForm(f => ({ ...f, reason: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowLeaveForm(false)}>Cancel</Button><Button onClick={submitLeave}>Submit Request</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showEmpForm} onOpenChange={setShowEmpForm}>
        <DialogContent><DialogHeader><DialogTitle>Add Employee</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Employee Code *</label><Input value={empForm.employeeCode} onChange={e => setEmpForm(f => ({ ...f, employeeCode: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Position</label><Input value={empForm.position} onChange={e => setEmpForm(f => ({ ...f, position: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={empForm.employmentType} onChange={e => setEmpForm(f => ({ ...f, employmentType: e.target.value }))}>
                <option value="full_time">Full Time</option><option value="part_time">Part Time</option><option value="contract">Contract</option><option value="intern">Intern</option></select></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowEmpForm(false)}>Cancel</Button><Button onClick={createEmployee}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
