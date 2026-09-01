'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@cea/ui';
import {
  BookOpen, Users, GraduationCap, UserCircle, Briefcase, Building2, Contact,
  FolderKanban, TicketCheck, FileText, Wallet, UserCog, Package, ShoppingCart,
  MessageSquare, BarChart3, Bell, ClipboardList, NotebookPen, Award,
  CalendarDays, Send, Handshake, FileDown, ShieldCheck, DoorOpen, MonitorPlay,
  Banknote, Wrench, Megaphone, Loader2, Clock,
} from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { api } from '../../lib/api-client';
import { OnboardingTour } from '../../components/onboarding-tour';

interface Course {
  id: string;
  title: string;
  slug?: string;
  code?: string;
  status?: string;
  description?: string;
  durationWeeks?: number;
  price?: number;
}

function NavCard({ href, icon: Icon, title, desc, color }: {
  href: string; icon: typeof BookOpen; title: string; desc: string; color: string;
}) {
  return (
    <Link href={href}>
      <Card className="h-full cursor-pointer transition-colors hover:border-primary/50">
        <CardContent className="flex h-full flex-col items-center gap-2 p-6 text-center">
          <Icon className={`h-8 w-8 ${color}`} />
          <div className="font-medium">{title}</div>
          <div className="text-xs text-muted-foreground">{desc}</div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [coursesLoading, setCoursesLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setCoursesLoading(true);
      const res = await api<Course[]>('/v1/courses');
      if (res.success && res.data) setCourses(res.data);
      setCoursesLoading(false);
    })();
  }, []);

  return (
    <div>
      <OnboardingTour />

      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back{user?.firstName ? `, ${user.firstName}` : ''}
          </h1>
          <p className="text-muted-foreground">Your learning and operations hub.</p>
        </div>
        <Link href="/courses">
          <Button variant="outline"><BookOpen className="mr-2 h-4 w-4" /> Browse Courses</Button>
        </Link>
      </div>

      {/* Courses */}
      <h2 className="mb-4 text-xl font-semibold">Courses</h2>
      {coursesLoading ? (
        <div className="mb-8 flex justify-center py-10">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </div>
      ) : courses.length === 0 ? (
        <Card className="mb-8">
          <CardContent className="flex flex-col items-center gap-3 p-10 text-center">
            <BookOpen className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">No courses have been published yet. Check back soon.</p>
            <Link href="/courses"><Button size="sm" variant="outline">View public catalog</Button></Link>
          </CardContent>
        </Card>
      ) : (
        <div className="mb-8 grid gap-4 md:grid-cols-3">
          {courses.map((course) => (
            <Card key={course.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="font-medium">{course.title}</div>
                  {course.status && <Badge variant="secondary">{course.status}</Badge>}
                </div>
                {course.description && (
                  <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{course.description}</p>
                )}
                <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                  {course.durationWeeks ? <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {course.durationWeeks} weeks</span> : null}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <h2 className="mb-4 text-xl font-semibold">Learning & Career</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <NavCard href="/dashboard/portfolio" icon={UserCircle} title="My Portfolio" desc="Showcase your work" color="text-blue-500" />
        <NavCard href="/dashboard/assessments" icon={ClipboardList} title="Assessments" desc="Exams & quizzes" color="text-blue-500" />
        <NavCard href="/dashboard/assignments" icon={NotebookPen} title="Assignments" desc="Submit your work" color="text-purple-500" />
        <NavCard href="/dashboard/grades" icon={Award} title="Grades" desc="Scorebook" color="text-green-500" />
        <NavCard href="/dashboard/attendance" icon={Clock} title="Attendance" desc="Check in & history" color="text-amber-500" />
        <NavCard href="/dashboard/certificates" icon={Award} title="Certificates" desc="Earned credentials" color="text-orange-500" />
        <NavCard href="/dashboard/marketplace" icon={Briefcase} title="Marketplace" desc="Jobs & gigs" color="text-cyan-500" />
        <NavCard href="/dashboard/messages" icon={Send} title="Messages" desc="Chat with mentors" color="text-pink-500" />
        <NavCard href="/dashboard/calendar" icon={CalendarDays} title="Calendar" desc="Schedule & events" color="text-indigo-500" />
        <NavCard href="/dashboard/classes" icon={MonitorPlay} title="Live Classes" desc="Interactive sessions" color="text-sky-500" />
        <NavCard href="/dashboard/mentorship" icon={Handshake} title="Mentorship" desc="Find a mentor" color="text-teal-500" />
        <NavCard href="/dashboard/cv" icon={FileDown} title="CV Generator" desc="Print-ready resume" color="text-violet-500" />
        <NavCard href="/dashboard/transcript" icon={FileText} title="Transcript" desc="Academic record" color="text-fuchsia-500" />
        <NavCard href="/dashboard/profile" icon={UserCircle} title="Profile" desc="Settings & security" color="text-rose-500" />
      </div>

      <h2 className="mb-4 text-xl font-semibold">Business Operations</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <NavCard href="/dashboard/clients" icon={Contact} title="CRM" desc="Contacts & pipeline" color="text-cyan-500" />
        <NavCard href="/dashboard/projects" icon={FolderKanban} title="Projects" desc="Tasks & milestones" color="text-indigo-500" />
        <NavCard href="/dashboard/tickets" icon={TicketCheck} title="Support" desc="Ticket system" color="text-rose-500" />
        <NavCard href="/dashboard/invoices" icon={FileText} title="Invoices" desc="Billing & payments" color="text-amber-500" />
        <NavCard href="/dashboard/accounts" icon={Wallet} title="Finance" desc="Accounts & expenses" color="text-emerald-500" />
        <NavCard href="/dashboard/payroll" icon={Banknote} title="Payroll" desc="Runs & payslips" color="text-emerald-600" />
        <NavCard href="/dashboard/hr" icon={UserCog} title="HR" desc="Employees & leave" color="text-pink-500" />
        <NavCard href="/dashboard/inventory" icon={Package} title="Inventory" desc="Stock & assets" color="text-orange-500" />
        <NavCard href="/dashboard/procurement" icon={ShoppingCart} title="Procurement" desc="POs & suppliers" color="text-teal-500" />
        <NavCard href="/dashboard/admissions" icon={GraduationCap} title="Admissions" desc="Application pipeline" color="text-sky-500" />
        <NavCard href="/dashboard/front-desk" icon={DoorOpen} title="Front Desk" desc="Visitor management" color="text-lime-500" />
        <NavCard href="/dashboard/facilities" icon={Building2} title="Facilities" desc="Rooms & work orders" color="text-stone-500" />
      </div>

      <h2 className="mb-4 text-xl font-semibold">Analytics, Marketing & Admin</h2>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <NavCard href="/dashboard/analytics" icon={BarChart3} title="Analytics" desc="Reports & insights" color="text-blue-500" />
        <NavCard href="/dashboard/reports" icon={FileDown} title="Reports" desc="Exports & CSV" color="text-cyan-500" />
        <NavCard href="/dashboard/notifications" icon={Bell} title="Notifications" desc="View your alerts" color="text-amber-500" />
        <NavCard href="/dashboard/community" icon={MessageSquare} title="Community Hub" desc="Forums, events, groups" color="text-pink-500" />
        <NavCard href="/dashboard/marketing" icon={Megaphone} title="Marketing" desc="Campaigns & leads" color="text-fuchsia-500" />
        <NavCard href="/dashboard/it-support" icon={Wrench} title="IT Support" desc="KB & monitoring" color="text-slate-500" />
        <NavCard href="/dashboard/executive" icon={BarChart3} title="Executive" desc="KPIs & OKRs" color="text-slate-700" />
        <NavCard href="/dashboard/jobs" icon={Briefcase} title="Job Board" desc="Find opportunities" color="text-green-500" />
        <NavCard href="/dashboard/employer" icon={Building2} title="Employer" desc="Post jobs, find talent" color="text-purple-500" />
        <NavCard href="/dashboard/alumni" icon={GraduationCap} title="Alumni Network" desc="Connect & mentor" color="text-orange-500" />
        {user?.roles?.includes('admin') && (
          <NavCard href="/dashboard/admin" icon={ShieldCheck} title="Admin Console" desc="Roles & audit" color="text-slate-500" />
        )}
        <NavCard href="/portal" icon={DoorOpen} title="Portals" desc="Supplier, parent & more" color="text-indigo-500" />
      </div>
    </div>
  );
}
