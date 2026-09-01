import { DashboardGuard } from './guard';
import { DashboardHeader } from './header';

export const dynamic = 'force-dynamic';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardGuard>
      <DashboardHeader />
      <div className="container mx-auto px-4 py-8">{children}</div>
    </DashboardGuard>
  );
}
