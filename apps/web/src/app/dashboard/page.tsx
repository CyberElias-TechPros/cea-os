'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, Button, Badge } from '@cea/ui';
import { Plus, BookOpen, Users, Clock, Briefcase, Building2, GraduationCap, UserCircle, Contact, FolderKanban, TicketCheck, FileText, PanelTop, Wallet, UserCog, Package, ShoppingCart, MessageSquare, BarChart3, Bell, ClipboardList, NotebookPen, Award, CreditCard, CalendarDays, Send, Handshake, FileDown, ShieldCheck, DoorOpen, MonitorPlay } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';
import { OnboardingTour } from '../../components/onboarding-tour';

const mockCourses = [
  { id: '1', name: 'Full-Stack Web Development', status: 'active', students: 45, modules: 8, duration: '12 weeks' },
  { id: '2', name: 'Python for Data Science', status: 'published', students: 32, modules: 6, duration: '10 weeks' },
  { id: '3', name: 'Cyber Security Essentials', status: 'draft', students: 0, modules: 4, duration: '14 weeks' },
];

export default function DashboardPage() {
  const { user } = useAuth();
  return (
    <div>
      <OnboardingTour />
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Manage your courses and teaching</p>
        </div>
        <Link href="/dashboard/courses/new">
          <Button><Plus className="mr-2 h-4 w-4" /> New Course</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <BookOpen className="h-8 w-8 text-blue-500" />
            <div>
              <div className="text-2xl font-bold">{mockCourses.length}</div>
              <div className="text-sm text-muted-foreground">Total Courses</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <Users className="h-8 w-8 text-green-500" />
            <div>
              <div className="text-2xl font-bold">77</div>
              <div className="text-sm text-muted-foreground">Total Students</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <Clock className="h-8 w-8 text-purple-500" />
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-sm text-muted-foreground">Active Courses</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Link href="/dashboard/portfolio">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <UserCircle className="h-8 w-8 text-blue-500" />
              <div className="font-medium">My Portfolio</div>
              <div className="text-xs text-muted-foreground">Showcase your work</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/jobs">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Briefcase className="h-8 w-8 text-green-500" />
              <div className="font-medium">Job Board</div>
              <div className="text-xs text-muted-foreground">Find opportunities</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/employer">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Building2 className="h-8 w-8 text-purple-500" />
              <div className="font-medium">Employer</div>
              <div className="text-xs text-muted-foreground">Post jobs, find talent</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/alumni">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <GraduationCap className="h-8 w-8 text-orange-500" />
              <div className="font-medium">Alumni Network</div>
              <div className="text-xs text-muted-foreground">Connect & mentor</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Business Operations</h2>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Link href="/dashboard/clients">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Contact className="h-8 w-8 text-cyan-500" />
              <div className="font-medium">CRM</div>
              <div className="text-xs text-muted-foreground">Contacts & pipeline</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/projects">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FolderKanban className="h-8 w-8 text-indigo-500" />
              <div className="font-medium">Projects</div>
              <div className="text-xs text-muted-foreground">Tasks & milestones</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/tickets">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <TicketCheck className="h-8 w-8 text-rose-500" />
              <div className="font-medium">Support</div>
              <div className="text-xs text-muted-foreground">Ticket system</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/invoices">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FileText className="h-8 w-8 text-amber-500" />
              <div className="font-medium">Invoices</div>
              <div className="text-xs text-muted-foreground">Billing & payments</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">AI & Analytics</h2>
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Link href="/dashboard/analytics">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <BarChart3 className="h-8 w-8 text-blue-500" />
              <div className="font-medium">Analytics</div>
              <div className="text-xs text-muted-foreground">Reports & insights</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/notifications">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Bell className="h-8 w-8 text-amber-500" />
              <div className="font-medium">Notifications</div>
              <div className="text-xs text-muted-foreground">View your alerts</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/community">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <MessageSquare className="h-8 w-8 text-pink-500" />
              <div className="font-medium">Community Hub</div>
              <div className="text-xs text-muted-foreground">Forums, events, groups & scholarships</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">ERP & Operations</h2>
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Link href="/dashboard/admissions">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <PanelTop className="h-8 w-8 text-sky-500" />
              <div className="font-medium">Admissions</div>
              <div className="text-xs text-muted-foreground">Application pipeline</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/accounts">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Wallet className="h-8 w-8 text-emerald-500" />
              <div className="font-medium">Finance</div>
              <div className="text-xs text-muted-foreground">Accounts & expenses</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/hr">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <UserCog className="h-8 w-8 text-pink-500" />
              <div className="font-medium">HR</div>
              <div className="text-xs text-muted-foreground">Employees & leave</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/inventory">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Package className="h-8 w-8 text-orange-500" />
              <div className="font-medium">Inventory</div>
              <div className="text-xs text-muted-foreground">Stock & assets</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/procurement">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <ShoppingCart className="h-8 w-8 text-teal-500" />
              <div className="font-medium">Procurement</div>
              <div className="text-xs text-muted-foreground">POs & suppliers</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Education & Career</h2>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Link href="/dashboard/clients">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Contact className="h-8 w-8 text-cyan-500" />
              <div className="font-medium">CRM</div>
              <div className="text-xs text-muted-foreground">Contacts & pipeline</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/projects">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FolderKanban className="h-8 w-8 text-indigo-500" />
              <div className="font-medium">Projects</div>
              <div className="text-xs text-muted-foreground">Tasks & milestones</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/tickets">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <TicketCheck className="h-8 w-8 text-rose-500" />
              <div className="font-medium">Support</div>
              <div className="text-xs text-muted-foreground">Ticket system</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/invoices">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FileText className="h-8 w-8 text-amber-500" />
              <div className="font-medium">Invoices</div>
              <div className="text-xs text-muted-foreground">Billing & payments</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <h2 className="text-xl font-semibold mb-4">Student Tools</h2>
      <div className="grid gap-4 md:grid-cols-5 mb-8">
        <Link href="/dashboard/assessments">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <ClipboardList className="h-8 w-8 text-blue-500" />
              <div className="font-medium">Assessments</div>
              <div className="text-xs text-muted-foreground">Exams & quizzes</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/assignments">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <NotebookPen className="h-8 w-8 text-purple-500" />
              <div className="font-medium">Assignments</div>
              <div className="text-xs text-muted-foreground">Submit your work</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/grades">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <BarChart3 className="h-8 w-8 text-green-500" />
              <div className="font-medium">Grades</div>
              <div className="text-xs text-muted-foreground">Scorebook</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/attendance">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Clock className="h-8 w-8 text-amber-500" />
              <div className="font-medium">Attendance</div>
              <div className="text-xs text-muted-foreground">Check in & history</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/certificates">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Award className="h-8 w-8 text-orange-500" />
              <div className="font-medium">Certificates</div>
              <div className="text-xs text-muted-foreground">Earned credentials</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/marketplace">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Briefcase className="h-8 w-8 text-cyan-500" />
              <div className="font-medium">Marketplace</div>
              <div className="text-xs text-muted-foreground">Jobs & gigs</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/messages">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Send className="h-8 w-8 text-pink-500" />
              <div className="font-medium">Messages</div>
              <div className="text-xs text-muted-foreground">Chat with mentors</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/calendar">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <CalendarDays className="h-8 w-8 text-indigo-500" />
              <div className="font-medium">Calendar</div>
              <div className="text-xs text-muted-foreground">Schedule & events</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/classes">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <MonitorPlay className="h-8 w-8 text-sky-500" />
              <div className="font-medium">Live Classes</div>
              <div className="text-xs text-muted-foreground">Interactive sessions</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/billing">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <CreditCard className="h-8 w-8 text-emerald-500" />
              <div className="font-medium">Billing</div>
              <div className="text-xs text-muted-foreground">Invoices & payments</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/profile">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <UserCircle className="h-8 w-8 text-rose-500" />
              <div className="font-medium">Profile</div>
              <div className="text-xs text-muted-foreground">Settings & security</div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Courses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockCourses.map((course) => (
              <Link key={course.id} href={`/dashboard/courses/${course.id}`}>
                <div className="flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                  <div className="flex-1">
                    <div className="font-medium">{course.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">
                      {course.modules} modules · {course.students} students · {course.duration}
        <Link href="/dashboard/cv">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <FileDown className="h-8 w-8 text-violet-500" />
              <div className="font-medium">CV Generator</div>
              <div className="text-xs text-muted-foreground">Print-ready resume</div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/mentorship">
          <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
            <CardContent className="p-6 flex flex-col items-center text-center gap-2">
              <Handshake className="h-8 w-8 text-teal-500" />
              <div className="font-medium">Mentorship</div>
              <div className="text-xs text-muted-foreground">Find a mentor</div>
            </CardContent>
          </Card>
        </Link>
        {user?.roles?.includes('admin') && (
          <Link href="/dashboard/admin">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <ShieldCheck className="h-8 w-8 text-slate-500" />
                <div className="font-medium">Admin Console</div>
                <div className="text-xs text-muted-foreground">Roles & audit</div>
              </CardContent>
            </Card>
          </Link>
        )}
        {(user?.roles?.includes('admin') || user?.roles?.includes('staff')) && (
          <Link href="/dashboard/front-desk">
            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-2">
                <DoorOpen className="h-8 w-8 text-lime-500" />
                <div className="font-medium">Front Desk</div>
                <div className="text-xs text-muted-foreground">Visitor management</div>
              </CardContent>
            </Card>
          </Link>
        )}
      </div>
                  </div>
                  <Badge variant={course.status === 'active' ? 'success' : course.status === 'published' ? 'info' : 'secondary'}>
                    {course.status}
                  </Badge>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
