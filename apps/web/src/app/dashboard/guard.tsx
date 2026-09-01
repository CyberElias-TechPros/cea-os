'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@cea/ui';
import { useAuth } from '../../lib/auth-context';

/**
 * Client-side guard for all dashboard routes. The real authorization boundary
 * is the API; this only prevents rendering private chrome for signed-out users.
 */
export function DashboardGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login?next=/dashboard');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <GraduationCap className="h-12 w-12 text-muted-foreground" />
        <p className="text-muted-foreground">Please sign in to access the dashboard.</p>
        <Link href="/login"><Button>Sign in</Button></Link>
      </div>
    );
  }

  return <>{children}</>;
}
