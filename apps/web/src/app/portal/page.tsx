'use client';

import Link from 'next/link';
import { Card, CardContent, Badge } from '@cea/ui';
import { Truck, Handshake, Users2, HeartHandshake, LaptopMinimal, Building2, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../lib/auth-context';

const PORTALS = [
  { slug: 'supplier', name: 'Supplier Portal', desc: 'Purchase orders, deliveries and invoices', icon: Truck, role: 'supplier', color: 'text-orange-500' },
  { slug: 'partner', name: 'Partner Portal', desc: 'Agreements, referrals and collaboration', icon: Handshake, role: 'partner', color: 'text-violet-500' },
  { slug: 'parent', name: 'Parent Portal', desc: 'Ward progress, fees and reports', icon: Users2, role: 'parent', color: 'text-sky-500' },
  { slug: 'volunteer', name: 'Volunteer Portal', desc: 'Opportunities, signups and hours', icon: HeartHandshake, role: 'volunteer', color: 'text-pink-500' },
  { slug: 'intern', name: 'Intern Portal', desc: 'Tasks, timesheets and evaluations', icon: LaptopMinimal, role: 'intern', color: 'text-emerald-500' },
  { slug: 'ngo', name: 'NGO Portal', desc: 'Scholarship funds, donations and impact', icon: Building2, role: 'ngo', color: 'text-amber-500' },
  { slug: 'government', name: 'Government Compliance', desc: 'Read-only compliance and reporting', icon: Landmark, role: 'government', color: 'text-blue-600' },
];

export default function PortalHubPage() {
  const { user } = useAuth();
  const roles = (user?.roles ?? []).map(r => r.toLowerCase());
  const hasRole = (slug: string) => roles.includes(slug) || roles.includes('admin');

  return (
    <div className="min-h-[70vh] py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">CEA-OS External Portals</Badge>
        <h1 className="text-4xl font-bold tracking-tight">One platform. Every partner connected.</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Suppliers, partners, parents, volunteers, interns, NGOs and government bodies each get a focused portal
          into the academy — secured by role-based access. Ask an administrator to assign your role.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {PORTALS.map(p => {
          const Icon = p.icon;
          const access = hasRole(p.slug);
          return (
            <Link key={p.slug} href={`/portal/${p.slug}`}>
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className={`h-11 w-11 rounded-xl bg-muted flex items-center justify-center ${p.color}`}><Icon className="h-5 w-5" /></div>
                    <Badge variant={access ? 'default' : 'secondary'}>{access ? 'Access granted' : `Role: ${p.role}`}</Badge>
                  </div>
                  <h3 className="font-semibold mt-4 flex items-center gap-1">{p.name} <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /></h3>
                  <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4" /> Portals are role-gated. Registration is managed by the academy admin console.
      </div>
    </div>
  );
}
