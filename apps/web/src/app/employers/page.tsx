'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, Badge } from '@cea/ui';
import { Building2, MapPin, Globe, Users, Briefcase, Loader2, CheckCircle2, ArrowRight } from 'lucide-react';
import { api } from '../../lib/api-client';
import Link from 'next/link';

interface Employer { id: string; companyName: string; companySlug: string; companyWebsite?: string; companySize?: string; industry?: string; location?: string; description?: string; isVerified: boolean; }
interface EmployerJobs { employer: Employer; jobs: { id: string; title: string; location?: string; employmentType?: string; salaryMin?: number; salaryMax?: number; salaryCurrency?: string }[]; }

export default function EmployersPage() {
  const [data, setData] = useState<EmployerJobs[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api<EmployerJobs[]>('/v1/marketplace/employers/directory');
      if (res.success && res.data) setData(res.data);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;

  const verified = data.filter(d => d.employer.isVerified);

  return (
    <div className="min-h-[70vh] py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4">CEA Employer Network</Badge>
        <h1 className="text-4xl font-bold tracking-tight">Companies hiring our graduates</h1>
        <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">
          Our employer partners post roles, host internships, and mentor students. Every profile below is a verified hiring partner of Cyber Elias Academy.
        </p>
      </div>

      {data.length === 0 ? (
        <Card><CardContent className="p-14 text-center text-muted-foreground">
          <Building2 className="h-12 w-12 mx-auto mb-4" />
          <p>Employer profiles appear here once partners join the network.</p>
        </CardContent></Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.map(({ employer, jobs }) => (
            <Card key={employer.id} className="h-full flex flex-col hover:border-primary/50 transition-colors">
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                    {employer.companyName.slice(0, 2).toUpperCase()}
                  </div>
                  {employer.isVerified && <Badge className="text-[10px]"><CheckCircle2 className="h-3 w-3 mr-1" /> Verified</Badge>}
                </div>
                <h3 className="font-semibold mt-4">{employer.companyName}</h3>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-2">
                  {employer.industry && <span className="flex items-center gap-1"><Briefcase className="h-3 w-3" />{employer.industry}</span>}
                  {employer.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{employer.location}</span>}
                  {employer.companySize && <span className="flex items-center gap-1"><Users className="h-3 w-3" />{employer.companySize}</span>}
                </div>
                {employer.description && <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{employer.description}</p>}
                <div className="mt-4 pt-4 border-t flex items-center justify-between flex-1 items-end">
                  <div>
                    <p className="text-xs text-muted-foreground">Open roles</p>
                    <p className="font-bold">{jobs.length}</p>
                  </div>
                  {employer.companyWebsite && (
                    <a href={employer.companyWebsite} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs text-primary hover:underline">
                      <Globe className="h-3 w-3" /> Visit site
                    </a>
                  )}
                </div>
                {jobs.length > 0 && (
                  <div className="mt-3 space-y-1.5">
                    {jobs.slice(0, 3).map(j => (
                      <div key={j.id} className="rounded-lg bg-muted/50 px-3 py-2 text-xs">
                        <span className="font-medium">{j.title}</span>
                        <span className="text-muted-foreground"> · {j.location || (j.employmentType ?? 'role')}{j.salaryMin ? ` · ${j.salaryCurrency ?? 'ZAR'} ${j.salaryMin.toLocaleString()}+` : ''}</span>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <div className="mt-12 text-center">
        <Link href="/jobs" className="inline-flex items-center gap-2 text-primary hover:underline text-sm">
          Browse open roles for students <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
