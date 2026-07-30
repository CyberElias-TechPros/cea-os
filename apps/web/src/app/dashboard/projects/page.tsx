'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import { Select } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import { Plus, Loader2, FolderKanban, ListTodo, Flag } from 'lucide-react';
import { api } from '../../../lib/api-client';

interface Project {
  id: string; name: string; description?: string; status: string; priority: string;
  startDate?: string; endDate?: string; createdAt: string;
}

interface ProjectTask {
  id: string; projectId: string; title: string; description?: string;
  status: string; priority: string; assigneeId?: string; dueDate?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [form, setForm] = useState({ name: '', description: '', status: 'planning', priority: 'medium', startDate: '', endDate: '' });
  const [taskForm, setTaskForm] = useState({ title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' });

  const load = async () => {
    setLoading(true);
    const res = await api<Project[]>('/v1/projects');
    if (res.success && res.data) setProjects(res.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveProject = async () => {
    await api('/v1/projects', { method: 'POST', body: JSON.stringify(form) });
    setShowForm(false);
    setForm({ name: '', description: '', status: 'planning', priority: 'medium', startDate: '', endDate: '' });
    await load();
  };

  const loadTasks = async (project: Project) => {
    setSelectedProject(project);
    const res = await api<{ tasks: ProjectTask[] }>(`/v1/projects/${project.id}`);
    if (res.success && res.data) setTasks(res.data.tasks || []);
  };

  const saveTask = async () => {
    if (!selectedProject) return;
    await api(`/v1/projects/${selectedProject.id}/tasks`, { method: 'POST', body: JSON.stringify(taskForm) });
    setShowTaskForm(false);
    setTaskForm({ title: '', description: '', status: 'todo', priority: 'medium', dueDate: '' });
    if (selectedProject) await loadTasks(selectedProject);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><Loader2 className="h-8 w-8 animate-spin text-muted-foreground" /></div>;
  }

  const statusColors: Record<string, string> = { planning: 'secondary', active: 'default', on_hold: 'outline', completed: 'default', cancelled: 'destructive' };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage client projects and tasks</p>
        </div>
        <Button onClick={() => setShowForm(true)}><Plus className="h-4 w-4 mr-2" /> New Project</Button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <FolderKanban className="h-12 w-12 mx-auto mb-4" />
          <p>No projects yet. Create your first project to get started.</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {projects.map(p => (
            <Card key={p.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => loadTasks(p)}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg">{p.name}</CardTitle>
                  <Badge variant={(statusColors[p.status] || 'secondary') as any}>{p.status}</Badge>
                </div>
                <CardDescription>{p.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2">
                  <Badge variant={p.priority === 'urgent' ? 'destructive' : p.priority === 'high' ? 'default' : 'secondary'}>{p.priority}</Badge>
                  {p.startDate && <span className="text-xs text-muted-foreground">{new Date(p.startDate).toLocaleDateString()}</span>}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedProject} onOpenChange={open => { if (!open) setSelectedProject(null); }}>
        <DialogContent className="max-w-2xl">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedProject.name}</DialogTitle>
                <DialogDescription>{selectedProject.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium flex items-center gap-2"><ListTodo className="h-4 w-4" /> Tasks ({tasks.length})</h4>
                  <Button size="sm" onClick={() => setShowTaskForm(true)}><Plus className="h-3 w-3 mr-1" /> Add Task</Button>
                </div>
                {tasks.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No tasks yet.</p>
                ) : (
                  <div className="space-y-2">
                    {tasks.map(t => (
                      <Card key={t.id}>
                        <CardContent className="flex items-center justify-between py-3">
                          <div>
                            <p className="font-medium text-sm">{t.title}</p>
                            {t.description && <p className="text-xs text-muted-foreground">{t.description}</p>}
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={t.priority === 'urgent' ? 'destructive' : 'secondary'} className="text-xs">{t.priority}</Badge>
                            <Badge variant="outline" className="text-xs">{t.status}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Project</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Name *</label><Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Status</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                  <option value="planning">Planning</option><option value="active">Active</option><option value="on_hold">On Hold</option><option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={form.priority} onChange={e => setForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
                </select>
              </div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowForm(false)}>Cancel</Button><Button onClick={saveProject}>Create</Button></DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showTaskForm} onOpenChange={setShowTaskForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add Task</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Title *</label><Input value={taskForm.title} onChange={e => setTaskForm(f => ({ ...f, title: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Description</label><Textarea value={taskForm.description} onChange={e => setTaskForm(f => ({ ...f, description: e.target.value }))} rows={2} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={taskForm.priority} onChange={e => setTaskForm(f => ({ ...f, priority: e.target.value }))}>
                  <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Due Date</label>
                <Input type="date" value={taskForm.dueDate} onChange={e => setTaskForm(f => ({ ...f, dueDate: e.target.value }))} />
              </div>
            </div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setShowTaskForm(false)}>Cancel</Button><Button onClick={saveTask}>Add</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
