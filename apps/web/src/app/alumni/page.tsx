'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge, Input } from '@cea/ui';
import { api } from '../../lib/api-client';
import { GraduationCap, Search, Loader2, Briefcase, Star, MapPin, ArrowRight, Linkedin, Github, Globe } from 'lucide-react';
import Link from 'next/link';

interface Alumni {
  id: string; userId: string; currentEmployer?: string; currentPosition?: string;
  industry?: string; graduationYear?: number; bio?: string;
  linkedinUrl?: string; githubUrl?: string; isMentor: boolean;
  user?: { id: string; firstName: string; lastName: string; avatarUrl?: string };
}

export default function AlumniPage() {
  const [alumni, setAlumni] = useState<Alumni[]>([]);
  const [mentors, setMentors] = useState<Alumni[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const load = useCallback(async () => {
    setLoading(true);
    const [dRes, mRes] = await Promise.all([
      api<Alumni[]>('/v1/alumni/directory'),
      api<Alumni[]>('/v1/alumni/mentors'),
    ]);
    if (dRes.success && dRes.data) setAlumni(dRes.data);
    if (mRes.success && mRes.data) setMentors(mRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const filtered = alumni.filter(a =>
    `${a.user?.firstName} ${a.user?.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    (a.currentEmployer || '').toLowerCase().includes(search.toLowerCase()) ||
    (a.industry || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-amber-500/10 via-primary/5 to-transparent -z-10" />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Alumni Network</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">CEA Alumni in the wild</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Graduates building careers across the tech industry — and giving back as mentors.
          </p>
        </div>

        <div className="relative max-w-md mx-auto mb-12">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search alumni by name, company or industry..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        {filtered.length === 0 ? (
          <Card><CardContent className="p-14 text-center">
            <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto" />
            <p className="mt-4 text-muted-foreground">No alumni profiles found.</p>
          </CardContent></Card>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((a, i) => (
              <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-lg font-bold shrink-0">
                        {a.user?.firstName?.[0]}{a.user?.lastName?.[0]}
                      </div>
                      <div className="min-w-0">
                        <div className="font-bold truncate">{a.user?.firstName} {a.user?.lastName}</div>
                        <div className="text-sm text-muted-foreground truncate">{a.currentPosition || 'CEA Graduate'}{a.currentEmployer ? ` at ${a.currentEmployer}` : ''}</div>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {a.industry && <Badge variant="secondary" className="text-xs">{a.industry}</Badge>}
                      {a.graduationYear && <Badge variant="outline" className="text-xs">Class of {a.graduationYear}</Badge>}
                      {a.isMentor && <Badge className="text-xs flex items-center gap-1"><Star className="h-3 w-3" /> Mentor</Badge>}
                    </div>
                    {a.bio && <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{a.bio}</p>}
                    <div className="flex gap-3 mt-4 pt-4 border-t">
                      {a.linkedinUrl && <a href={a.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>}
                      {a.githubUrl && <a href={a.githubUrl} target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"><Github className="h-3.5 w-3.5" /> GitHub</a>}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-transparent p-8 md:p-10 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0"><Star className="h-6 w-6 text-primary" /></div>
            <div>
              <h2 className="text-xl font-bold">{mentors.length} alumni ready to mentor</h2>
              <p className="text-sm text-muted-foreground mt-1">Get guidance from graduates working in the industry you want to break into.</p>
            </div>
          </div>
          <Link href="/dashboard/mentorship"><Button size="lg">Find a mentor <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
        </div>
      </div>
    </div>
  );
}
