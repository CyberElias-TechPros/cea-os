import { AuthProvider } from '../../lib/auth-context';
import { DashboardHeader } from './header';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </AuthProvider>
  );
}
