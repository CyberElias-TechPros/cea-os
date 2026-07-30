'use client';

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { NotificationBell } from '../../components/notification-bell';

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
          <LayoutDashboard className="h-5 w-5" />
          <span>CEA Dashboard</span>
        </Link>
        <div className="flex items-center gap-2">
          <NotificationBell />
        </div>
      </div>
    </header>
  );
}
