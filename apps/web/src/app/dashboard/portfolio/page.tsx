'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import {
  Plus, ExternalLink, Github, Globe, Edit3, Trash2, Eye, EyeOff, Loader2, Briefcase,
} from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface Portfolio {
  id: string; userId: string; headline?: string; bio?: string; skills: string;
  socialLinks: string; isPublic: boolean; customDomain?: string;
}

interface Project {
  id: string; portfolioId: string; title: string; description?: string;
  url?: string; repoUrl?: string; technologies: string; imageUrl?: string;
  startDate?: string; endDate?: string; orderIndex: number;
}

export default function PortfolioPage() {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [form, setForm] = useState({ headline: '', bio: '', skills: '', socialLinks: '' });
  const [projForm, setProjForm] = useState({ title: '', description: '', url: '', repoUrl: '', technologies: '' });

  const load = async () => {
    setLoading(true);
    const res = await api<{ portfolio: Portfolio; projects: Project[] }>('/v1/portfolio/my');
    if (res.success && res.data) {
      setPortfolio(res.data.portfolio);
      setProjects(res.data.projects);
      setForm({
        headline: res.data.portfolio.headline || '',
        bio: res.data.portfolio.bio || '',
        skills: res.data.portfolio.skills || '',
        socialLinks: res.data.portfolio.socialLinks || '',
      });
    }
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const savePortfolio = async () => {
    setSaving(true);
    if (portfolio) {
      await api('/v1/portfolio/my', { method: 'PATCH', body: JSON.stringify(form) });
    } else {
      await api('/v1/portfolio', { method: 'POST', body: JSON.stringify(form) });
    }
    await load();
    setSaving(false);
    setShowForm(false);
  };

  const saveProject = async () => {
    setSaving(true);
    if (editProject) {
      await api(`/v1/portfolio/projects/${editProject.id}`, { method: 'PATCH', body: JSON.stringify(projForm) });
    } else {
      await api('/v1/portfolio/projects', { method: 'POST', body: JSON.stringify(projForm) });
    }
    await load();
    setSaving(false);
    setShowProjectForm(false);
    setEditProject(null);
    setProjForm({ title: '', description: '', url: '', repoUrl: '', technologies: '' });
  };

  const deleteProject = async (id: string) => {
    await api(`/v1/portfolio/projects/${id}`, { method: 'DELETE' });
    await load();
  };

  const toggleVisibility = async () => {
    await api('/v1/portfolio/my', { method: 'PATCH', body: JSON.stringify({ isPublic: !portfolio?.isPublic }) });
    await load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const skillsArray = portfolio?.skills ? portfolio.skills.split(',').map(s => s.trim()).filter(Boolean) : [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Portfolio</h1>
          <p className="text-muted-foreground mt-1">Showcase your work to employers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={toggleVisibility}>
            {portfolio?.isPublic ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
            {portfolio?.isPublic ? 'Hide' : 'Publish'}
          </Button>
          <Button onClick={() => setShowForm(true)}>
            <Edit3 className="h-4 w-4 mr-2" /> Edit Profile
          </Button>
        </div>
      </div>

      {portfolio ? (
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">{user?.firstName} {user?.lastName}</CardTitle>
            {portfolio.headline && <CardDescription className="text-base">{portfolio.headline}</CardDescription>}
          </CardHeader>
          <CardContent className="space-y-4">
            {portfolio.bio && <p className="text-sm text-muted-foreground">{portfolio.bio}</p>}
            {skillsArray.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {skillsArray.map(s => <Badge key={s} variant="secondary">{s}</Badge>)}
              </div>
            )}
            {portfolio.socialLinks && (
              <div className="flex gap-4 text-sm text-muted-foreground">
                {portfolio.socialLinks.split('\n').map((link, i) => (
                  <a key={i} href={link.trim()} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-primary">
                    <ExternalLink className="h-3 w-3" /> {new URL(link.trim()).hostname}
                  </a>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No portfolio yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Create your portfolio to start applying for jobs</p>
            <Button onClick={() => setShowForm(true)}>Create Portfolio</Button>
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <Button onClick={() => { setEditProject(null); setProjForm({ title: '', description: '', url: '', repoUrl: '', technologies: '' }); setShowProjectForm(true); }}>
          <Plus className="h-4 w-4 mr-2" /> Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No projects yet. Add your first project to showcase your work.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map(p => (
            <Card key={p.id}>
              <CardHeader>
                <CardTitle className="text-lg">{p.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {p.description && <p className="text-sm text-muted-foreground">{p.description}</p>}
                {p.technologies && (
                  <div className="flex flex-wrap gap-1">
                    {p.technologies.split(',').map(t => <Badge key={t} variant="outline" className="text-xs">{t.trim()}</Badge>)}
                  </div>
                )}
                <div className="flex gap-3 pt-2">
                  {p.url && (
                    <a href={p.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <Globe className="h-3 w-3" /> Live
                    </a>
                  )}
                  {p.repoUrl && (
                    <a href={p.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-primary hover:underline">
                      <Github className="h-3 w-3" /> Source
                    </a>
                  )}
                </div>
                <div className="flex gap-2 pt-2">
                  <Button variant="ghost" size="sm" onClick={() => { setEditProject(p); setProjForm({ title: p.title, description: p.description || '', url: p.url || '', repoUrl: p.repoUrl || '', technologies: p.technologies || '' }); setShowProjectForm(true); }}>
                    <Edit3 className="h-3 w-3 mr-1" /> Edit
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => deleteProject(p.id)}>
                    <Trash2 className="h-3 w-3 mr-1 text-destructive" /> Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{portfolio ? 'Edit Portfolio' : 'Create Portfolio'}</DialogTitle>
            <DialogDescription>Showcase your skills and experience</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Headline</label>
              <Input value={form.headline} onChange={e => setForm(f => ({ ...f, headline: e.target.value }))} placeholder="e.g. Full Stack Developer | Cybersecurity Enthusiast" />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea value={form.bio} onChange={e => setForm(f => ({ ...f, bio: e.target.value }))} placeholder="Tell employers about yourself" rows={4} />
            </div>
            <div>
              <label className="text-sm font-medium">Skills (comma-separated)</label>
              <Input value={form.skills} onChange={e => setForm(f => ({ ...f, skills: e.target.value }))} placeholder="React, TypeScript, Python, Cloud" />
            </div>
            <div>
              <label className="text-sm font-medium">Social Links (one per line)</label>
              <Textarea value={form.socialLinks} onChange={e => setForm(f => ({ ...f, socialLinks: e.target.value }))} placeholder="https://github.com/yourprofile&#10;https://linkedin.com/in/yourprofile" rows={3} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button>
            <Button onClick={savePortfolio} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showProjectForm} onOpenChange={setShowProjectForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editProject ? 'Edit Project' : 'Add Project'}</DialogTitle>
            <DialogDescription>Showcase your work to potential employers</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <Input value={projForm.title} onChange={e => setProjForm(f => ({ ...f, title: e.target.value }))} placeholder="Project name" />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea value={projForm.description} onChange={e => setProjForm(f => ({ ...f, description: e.target.value }))} placeholder="Describe the project, your role, and what you built" rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Technologies (comma-separated)</label>
              <Input value={projForm.technologies} onChange={e => setProjForm(f => ({ ...f, technologies: e.target.value }))} placeholder="React, Node.js, PostgreSQL" />
            </div>
            <div>
              <label className="text-sm font-medium">URL</label>
              <Input value={projForm.url} onChange={e => setProjForm(f => ({ ...f, url: e.target.value }))} placeholder="https://myproject.com" />
            </div>
            <div>
              <label className="text-sm font-medium">Repository URL</label>
              <Input value={projForm.repoUrl} onChange={e => setProjForm(f => ({ ...f, repoUrl: e.target.value }))} placeholder="https://github.com/me/myproject" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProjectForm(false)}>Cancel</Button>
            <Button onClick={saveProject} disabled={saving}>{saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null} Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
