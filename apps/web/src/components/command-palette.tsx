'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, CornerDownLeft, Home, BookOpen, GraduationCap, Award, ShieldCheck, Users, HelpCircle, LayoutDashboard, FileText, Handshake, CalendarDays, MessageSquare, Briefcase, CreditCard, Settings, Heart, DoorOpen, Video, Building2, Banknote, BarChart3, Megaphone, ServerCog } from 'lucide-react';
import { useAuth } from '../lib/auth-context';

interface CommandItem {
  label: string;
  href: string;
  group: string;
  keywords: string;
  icon: React.ReactNode;
  adminOnly?: boolean;
}

const PUBLIC_COMMANDS: CommandItem[] = [
  { label: 'Home', href: '/', group: 'Main', keywords: 'home landing', icon: <Home className="h-4 w-4" /> },
  { label: 'Courses', href: '/courses', group: 'Learn', keywords: 'courses programs study', icon: <BookOpen className="h-4 w-4" /> },
  { label: 'Compare programs', href: '/courses/compare', group: 'Learn', keywords: 'compare programs', icon: <FileText className="h-4 w-4" /> },
  { label: 'Apply now', href: '/apply', group: 'Admissions', keywords: 'apply enroll admission application', icon: <GraduationCap className="h-4 w-4" /> },
  { label: 'Scholarships', href: '/scholarships', group: 'Admissions', keywords: 'scholarship funding bursary', icon: <Award className="h-4 w-4" /> },
  { label: 'Events', href: '/events', group: 'Community', keywords: 'events calendar workshop', icon: <CalendarDays className="h-4 w-4" /> },
  { label: 'Community forums', href: '/community', group: 'Community', keywords: 'forums discussions groups community', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Alumni network', href: '/alumni', group: 'Community', keywords: 'alumni graduates network', icon: <GraduationCap className="h-4 w-4" /> },
  { label: 'Donate', href: '/donate', group: 'Community', keywords: 'donate give support funding', icon: <Heart className="h-4 w-4" /> },
  { label: 'Employer partners', href: '/employers', group: 'Community', keywords: 'employers companies hiring partners', icon: <Building2 className="h-4 w-4" /> },
  { label: 'Virtual campus tour', href: '/tour', group: 'Main', keywords: 'tour campus 360 virtual', icon: <Video className="h-4 w-4" /> },
  { label: 'Verify certificate', href: '/verify', group: 'Support', keywords: 'certificate verify credential', icon: <ShieldCheck className="h-4 w-4" /> },
  { label: 'About', href: '/about', group: 'Main', keywords: 'about academy', icon: <Users className="h-4 w-4" /> },
  { label: 'Help & FAQ', href: '/help', group: 'Support', keywords: 'help faq support', icon: <HelpCircle className="h-4 w-4" /> },
];

const AUTH_COMMANDS: CommandItem[] = [
  { label: 'Dashboard', href: '/dashboard', group: 'Dashboard', keywords: 'dashboard hub home', icon: <LayoutDashboard className="h-4 w-4" /> },
  { label: 'My Courses', href: '/dashboard/courses', group: 'Dashboard', keywords: 'courses learning', icon: <BookOpen className="h-4 w-4" /> },
  { label: 'Assessments', href: '/dashboard/assessments', group: 'Dashboard', keywords: 'exams quizzes tests', icon: <FileText className="h-4 w-4" /> },
  { label: 'Assignments', href: '/dashboard/assignments', group: 'Dashboard', keywords: 'homework submit', icon: <FileText className="h-4 w-4" /> },
  { label: 'Grades', href: '/dashboard/grades', group: 'Dashboard', keywords: 'grades scorebook marks', icon: <Award className="h-4 w-4" /> },
  { label: 'Attendance', href: '/dashboard/attendance', group: 'Dashboard', keywords: 'attendance check in', icon: <CalendarDays className="h-4 w-4" /> },
  { label: 'Certificates', href: '/dashboard/certificates', group: 'Dashboard', keywords: 'certificates credentials', icon: <ShieldCheck className="h-4 w-4" /> },
  { label: 'Marketplace', href: '/dashboard/marketplace', group: 'Dashboard', keywords: 'jobs gigs marketplace', icon: <Briefcase className="h-4 w-4" /> },
  { label: 'Messages', href: '/dashboard/messages', group: 'Dashboard', keywords: 'messages chat', icon: <MessageSquare className="h-4 w-4" /> },
  { label: 'Calendar', href: '/dashboard/calendar', group: 'Dashboard', keywords: 'calendar schedule events', icon: <CalendarDays className="h-4 w-4" /> },
  { label: 'Live Classes', href: '/dashboard/classes', group: 'Dashboard', keywords: 'live class session video', icon: <Video className="h-4 w-4" /> },
  { label: 'Billing', href: '/dashboard/billing', group: 'Dashboard', keywords: 'billing invoices payments', icon: <CreditCard className="h-4 w-4" /> },
  { label: 'Mentorship', href: '/dashboard/mentorship', group: 'Dashboard', keywords: 'mentor mentorship guidance', icon: <Handshake className="h-4 w-4" /> },
  { label: 'CV Generator', href: '/dashboard/cv', group: 'Dashboard', keywords: 'cv resume', icon: <FileText className="h-4 w-4" /> },
  { label: 'Transcript', href: '/dashboard/transcript', group: 'Dashboard', keywords: 'transcript academic record', icon: <FileText className="h-4 w-4" /> },
  { label: 'Profile & settings', href: '/dashboard/profile', group: 'Dashboard', keywords: 'profile settings password', icon: <Settings className="h-4 w-4" /> },
  { label: 'Front Desk', href: '/dashboard/front-desk', group: 'Staff', keywords: 'visitors front desk check in', icon: <DoorOpen className="h-4 w-4" /> },
  { label: 'Facilities', href: '/dashboard/facilities', group: 'Staff', keywords: 'rooms bookings work orders maintenance', icon: <Building2 className="h-4 w-4" /> },
  { label: 'Payroll', href: '/dashboard/payroll', group: 'Staff', keywords: 'payroll payslips salary runs', icon: <Banknote className="h-4 w-4" /> },
  { label: 'Executive', href: '/dashboard/executive', group: 'Staff', keywords: 'executive command center okr kpi', icon: <BarChart3 className="h-4 w-4" /> },
  { label: 'Marketing', href: '/dashboard/marketing', group: 'Staff', keywords: 'marketing campaigns content leads', icon: <Megaphone className="h-4 w-4" /> },
  { label: 'IT Support', href: '/dashboard/it-support', group: 'Staff', keywords: 'it support knowledge base kb', icon: <ServerCog className="h-4 w-4" /> },
  { label: 'Reports', href: '/dashboard/reports', group: 'Staff', keywords: 'reports exports csv', icon: <FileText className="h-4 w-4" /> },
  { label: 'External portals', href: '/portal', group: 'Staff', keywords: 'portals supplier partner parent volunteer intern ngo government', icon: <DoorOpen className="h-4 w-4" /> },
  { label: 'Admin Console', href: '/dashboard/admin', group: 'Staff', keywords: 'admin roles users audit', icon: <ShieldCheck className="h-4 w-4" /> },
];

export function CommandPalette() {
  const router = useRouter();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(o => !o);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [open]);

  const items = useMemo(() => {
    const isAdmin = user?.roles?.includes('admin');
    const all = [...PUBLIC_COMMANDS, ...AUTH_COMMANDS.filter(c => !c.adminOnly || isAdmin)];
    const q = query.trim().toLowerCase();
    if (!q) return all;
    return all.filter(c =>
      c.label.toLowerCase().includes(q) || c.keywords.includes(q) || c.group.toLowerCase().includes(q)
    );
  }, [query, user]);

  const grouped = useMemo(() => {
    const map = new Map<string, CommandItem[]>();
    for (const item of items) {
      const list = map.get(item.group) ?? [];
      list.push(item);
      map.set(item.group, list);
    }
    return [...map.entries()];
  }, [items]);

  const go = (item: CommandItem) => {
    setOpen(false);
    router.push(item.href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="relative w-full max-w-xl rounded-2xl border bg-background shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 border-b px-4">
          <Search className="h-4 w-4 text-muted-foreground shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => { setQuery(e.target.value); setActiveIndex(0); }}
            onKeyDown={e => {
              if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIndex(i => Math.min(i + 1, items.length - 1)); }
              if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIndex(i => Math.max(i - 1, 0)); }
              if (e.key === 'Enter' && items[activeIndex]) go(items[activeIndex]!);
            }}
            placeholder="Search pages, actions, tools..."
            className="h-14 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <kbd className="hidden sm:flex items-center gap-1 rounded border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            <CornerDownLeft className="h-3 w-3" />
          </kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {items.length === 0 ? (
            <div className="p-10 text-center text-sm text-muted-foreground">No results for &quot;{query}&quot;</div>
          ) : (
            grouped.map(([group, groupItems]) => (
              <div key={group} className="mb-2">
                <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{group}</div>
                {groupItems.map(item => {
                  const idx = items.indexOf(item);
                  return (
                    <button
                      key={item.href}
                      onClick={() => go(item)}
                      onMouseEnter={() => setActiveIndex(idx)}
                      className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${idx === activeIndex ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}`}
                    >
                      <span className="text-muted-foreground">{item.icon}</span>
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="text-[10px] text-muted-foreground font-mono truncate max-w-[160px]">{item.href}</span>
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
        <div className="border-t bg-muted/50 px-4 py-2 text-[10px] text-muted-foreground flex items-center gap-4">
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↑</kbd><kbd className="rounded border bg-background px-1">↓</kbd> navigate</span>
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">↵</kbd> open</span>
          <span className="flex items-center gap-1"><kbd className="rounded border bg-background px-1">esc</kbd> close</span>
          <span className="ml-auto">Cmd+K anytime</span>
        </div>
      </div>
    </div>
  );
}
