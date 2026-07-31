'use client';

import { useCallback, useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';
import { FileText, Loader2, Printer, ExternalLink, Github, Linkedin, GraduationCap, Briefcase, Award, Wrench, FolderGit2 } from 'lucide-react';

interface Portfolio { id: string; headline?: string; bio?: string; skills?: string; socialLinks?: string }
interface Project { id: string; title: string; description?: string; url?: string; repoUrl?: string; technologies?: string }
interface Certificate { id: string; certificateNumber: string; courseId: string; issuedAt: string; metadata?: { finalGrade?: number } }
interface Course { id: string; name: string }
interface AlumniProfile { id: string; currentEmployer?: string; currentPosition?: string; graduationYear?: number; industry?: string; linkedinUrl?: string; githubUrl?: string }

export default function CVPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [alumni, setAlumni] = useState<AlumniProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const [pRes, cRes, coRes, aRes] = await Promise.all([
      api<{ portfolio: Portfolio; projects: Project[] }>('/v1/portfolio/my'),
      api<Certificate[]>('/v1/certificates/my'),
      api<Course[]>('/v1/courses'),
      api<AlumniProfile>('/v1/alumni/profile'),
    ]);
    if (pRes.success && pRes.data) {
      setPortfolio(pRes.data.portfolio);
      setProjects(pRes.data.projects);
    }
    if (cRes.success && cRes.data) setCerts(cRes.data);
    if (coRes.success && coRes.data) setCourses(coRes.data);
    if (aRes.success && aRes.data) setAlumni(aRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  const skills = portfolio?.skills ? portfolio.skills.split(',').map(s => s.trim()).filter(Boolean) : [];
  const courseName = (id: string) => courses.find(c => c.id === id)?.name ?? 'Course';
  const links = portfolio?.socialLinks?.split('\n').map(l => l.trim()).filter(Boolean) ?? [];

  return (
    <div>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">CV Generator</h1>
          <p className="text-muted-foreground mt-1">Auto-generated from your portfolio, certificates and alumni profile.</p>
        </div>
        <Button onClick={() => window.print()}>
          <Printer className="mr-2 h-4 w-4" /> Print / Save as PDF
        </Button>
      </div>

      <Card className="print-card">
        <CardContent className="p-0">
          <div id="cv-sheet" className="bg-white text-slate-900 p-10 md:p-14 min-h-[800px]">
            <div className="border-b-4 border-slate-900 pb-6 mb-8">
              <h2 className="text-4xl font-extrabold tracking-tight uppercase">{user?.firstName} {user?.lastName}</h2>
              {portfolio?.headline && <p className="text-lg font-medium text-slate-600 mt-2">{portfolio.headline}</p>}
              <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-slate-500 mt-3">
                <span>{user?.email}</span>
                {user?.phone && <span>{user.phone}</span>}
                {links.slice(0, 3).map((l, i) => (
                  <a key={i} href={l} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:underline break-all">{l.replace(/^https?:\/\//, '')}</a>
                ))}
              </div>
            </div>

            {portfolio?.bio && (
              <section className="mb-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"><FileText className="h-4 w-4" /> Profile</h3>
                <p className="text-sm text-slate-700 leading-relaxed">{portfolio.bio}</p>
              </section>
            )}

            {skills.length > 0 && (
              <section className="mb-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"><Wrench className="h-4 w-4" /> Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map(s => (
                    <span key={s} className="rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700">{s}</span>
                  ))}
                </div>
              </section>
            )}

            <section className="mb-8">
              <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"><GraduationCap className="h-4 w-4" /> Education & Training</h3>
              <div className="space-y-4">
                {certs.map(cert => (
                  <div key={cert.id}>
                    <div className="flex items-baseline justify-between gap-4">
                      <div className="font-semibold text-sm">{courseName(cert.courseId)}</div>
                      <div className="text-xs text-slate-500 shrink-0">{new Date(cert.issuedAt).toLocaleDateString('en-ZA', { month: 'short', year: 'numeric' })}</div>
                    </div>
                    <div className="text-xs text-slate-500">
                      Certificate {cert.certificateNumber}
                      {cert.metadata?.finalGrade !== undefined && ` · Final grade: ${Math.round(cert.metadata.finalGrade)}%`}
                    </div>
                  </div>
                ))}
                {certs.length === 0 && <p className="text-sm text-slate-500">Courses completed through CEA-OS.</p>}
              </div>
            </section>

            {alumni?.currentPosition && (
              <section className="mb-8">
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"><Briefcase className="h-4 w-4" /> Experience</h3>
                <div className="flex items-baseline justify-between gap-4">
                  <div className="font-semibold text-sm">{alumni.currentPosition}</div>
                  {alumni.graduationYear && <div className="text-xs text-slate-500 shrink-0">Class of {alumni.graduationYear}</div>}
                </div>
                {alumni.currentEmployer && <div className="text-xs text-slate-500">{alumni.currentEmployer}{alumni.industry ? ` · ${alumni.industry}` : ''}</div>}
              </section>
            )}

            {projects.length > 0 && (
              <section>
                <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-3"><FolderGit2 className="h-4 w-4" /> Projects</h3>
                <div className="space-y-4">
                  {projects.map(p => (
                    <div key={p.id}>
                      <div className="flex items-baseline justify-between gap-4">
                        <div className="font-semibold text-sm">{p.title}</div>
                        <div className="flex gap-3 text-xs text-slate-500 shrink-0">
                          {p.url && <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><ExternalLink className="h-3 w-3" /> Live</a>}
                          {p.repoUrl && <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline"><Github className="h-3 w-3" /> Source</a>}
                        </div>
                      </div>
                      {p.description && <p className="text-xs text-slate-600 mt-1 leading-relaxed">{p.description}</p>}
                      {p.technologies && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {p.technologies.split(',').map(t => (
                            <span key={t} className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">{t.trim()}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1"><Award className="h-3.5 w-3.5" /> CEA-OS Verified Credentials</span>
              {alumni?.linkedinUrl && <a href={alumni.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-600"><Linkedin className="h-3.5 w-3.5" /> LinkedIn</a>}
              {alumni?.githubUrl && <a href={alumni.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-slate-600"><Github className="h-3.5 w-3.5" /> GitHub</a>}
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx global>{`
        @media print {
          body * { visibility: hidden; }
          #cv-sheet, #cv-sheet * { visibility: visible; }
          #cv-sheet { position: absolute; left: 0; top: 0; width: 100%; box-shadow: none !important; min-height: 0; }
          .print-card { box-shadow: none !important; border: none !important; }
          @page { margin: 12mm; }
        }
      `}</style>
    </div>
  );
}
