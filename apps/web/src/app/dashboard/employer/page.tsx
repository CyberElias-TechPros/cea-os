'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@cea/ui';
import { Button } from '@cea/ui';
import { Input } from '@cea/ui';
import { Textarea } from '@cea/ui';
import { Badge } from '@cea/ui';
import { Separator } from '@cea/ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@cea/ui';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter,
} from '@cea/ui';
import { Select } from '@cea/ui';
import {
  Building2, Plus, Loader2, Users, Eye, Clock, MapPin,
} from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface Employer {
  id: string; userId: string; companyName: string; companyDescription?: string;
  website?: string; logoUrl?: string; industry?: string; size?: string;
  location?: string; contactEmail?: string; contactPhone?: string;
}

interface JobListing {
  id: string; title: string; slug: string; description: string; location?: string;
  type: string; remote: boolean; salaryMin?: number; salaryMax?: number;
  requirements?: string; status: string; postedAt: string; applicationsCount: number;
}

interface Application {
  id: string; jobListingId: string; userId: string; coverLetter?: string;
  expectedSalary?: string; status: string; appliedAt: string; notes?: string;
}

interface Interview { id: string; applicationId: string; type: string; scheduledAt: string; duration?: number; meetingLink?: string; location?: string; status: string; feedback?: string; rating?: number; }
interface Offer { id: string; applicationId: string; salary?: number; salaryCurrency?: string; employmentType?: string; startDate?: string; notes?: string; status: string; }
interface PipelineRow { id: string; jobListingId: string; jobTitle: string; jobSlug: string; firstName: string; lastName: string; email: string; status: string; matchScore?: number; notes?: string; appliedAt: string; interviews: Interview[]; offers: Offer[]; }

const PIPELINE_STAGES = ['submitted', 'reviewing', 'shortlisted', 'interviewed', 'offered', 'hired', 'rejected'] as const;

export default function EmployerPage() {
  const { user } = useAuth();
  const [employer, setEmployer] = useState<Employer | null>(null);
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [applications, setApplications] = useState<Record<string, Application[]>>({});
  const [loading, setLoading] = useState(true);
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showJobForm, setShowJobForm] = useState(false);
  const [profileForm, setProfileForm] = useState({ companyName: '', companyDescription: '', website: '', industry: '', size: '', location: '', contactEmail: '', contactPhone: '' });
  const [jobForm, setJobForm] = useState({ title: '', description: '', location: '', type: 'full-time', remote: false, salaryMin: '', salaryMax: '', requirements: '', status: 'draft' });
  const [selectedJobApps, setSelectedJobApps] = useState<{ job: JobListing; apps: Application[] } | null>(null);
  const [pipeline, setPipeline] = useState<PipelineRow[]>([]);
  const [activeApp, setActiveApp] = useState<PipelineRow | null>(null);
  const [showInterviewForm, setShowInterviewForm] = useState(false);
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [interviewForm, setInterviewForm] = useState({ type: 'video', scheduledAt: '', duration: 60, meetingLink: '' });
  const [offerForm, setOfferForm] = useState({ salary: '', employmentType: 'full_time', startDate: '', notes: '' });
  const [feedbackForm, setFeedbackForm] = useState({ feedback: '', rating: 3, status: 'completed' });

  const load = async () => {
    setLoading(true);
    const empRes = await api<Employer>('/v1/marketplace/employers/me');
    if (empRes.success && empRes.data) {
      setEmployer(empRes.data);
      setProfileForm({
        companyName: empRes.data.companyName,
        companyDescription: empRes.data.companyDescription || '',
        website: empRes.data.website || '',
        industry: empRes.data.industry || '',
        size: empRes.data.size || '',
        location: empRes.data.location || '',
        contactEmail: empRes.data.contactEmail || '',
        contactPhone: empRes.data.contactPhone || '',
      });
    }
    const jobsRes = await api<JobListing[]>('/v1/marketplace/jobs/my');
    if (jobsRes.success && jobsRes.data) {
      setJobs(jobsRes.data);
      const appMap: Record<string, Application[]> = {};
      for (const job of jobsRes.data) {
        const appsRes = await api<Application[]>(`/v1/marketplace/jobs/${job.id}/applications`);
        if (appsRes.success && appsRes.data) appMap[job.id] = appsRes.data;
      }
      setApplications(appMap);
    }
    const pipeRes = await api<PipelineRow[]>('/v1/marketplace/applications/pipeline');
    if (pipeRes.success && pipeRes.data) setPipeline(pipeRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveProfile = async () => {
    if (employer) {
      await api('/v1/marketplace/employers/me', { method: 'PATCH', body: JSON.stringify(profileForm) });
    } else {
      await api('/v1/marketplace/employers', { method: 'POST', body: JSON.stringify(profileForm) });
    }
    await load();
    setShowProfileForm(false);
  };

  const postJob = async () => {
    await api('/v1/marketplace/jobs', {
      method: 'POST',
      body: JSON.stringify({ ...jobForm, salaryMin: jobForm.salaryMin ? Number(jobForm.salaryMin) : undefined, salaryMax: jobForm.salaryMax ? Number(jobForm.salaryMax) : undefined }),
    });
    await load();
    setShowJobForm(false);
    setJobForm({ title: '', description: '', location: '', type: 'full-time', remote: false, salaryMin: '', salaryMax: '', requirements: '', status: 'draft' });
  };

  const updateStatus = async (appId: string, status: string) => {
    await api(`/v1/marketplace/applications/${appId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    await load();
  };

  const scheduleInterview = async () => {
    if (!activeApp) return;
    await api('/v1/marketplace/interviews', {
      method: 'POST',
      body: JSON.stringify({ applicationId: activeApp.id, ...interviewForm, schedule: true }),
    });
    setShowInterviewForm(false);
    setInterviewForm({ type: 'video', scheduledAt: '', duration: 60, meetingLink: '' });
    await load();
  };

  const completeInterview = async (interviewId: string) => {
    await api(`/v1/marketplace/interviews/${interviewId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status: feedbackForm.status, feedback: feedbackForm.feedback, rating: Number(feedbackForm.rating) }),
    });
    setActiveApp(null);
    setFeedbackForm({ feedback: '', rating: 3, status: 'completed' });
    await load();
  };

  const makeOffer = async () => {
    if (!activeApp) return;
    await api(`/v1/marketplace/applications/${activeApp.id}/offer`, {
      method: 'POST',
      body: JSON.stringify({ ...offerForm, salary: offerForm.salary ? Number(offerForm.salary) : undefined }),
    });
    setShowOfferForm(false);
    setOfferForm({ salary: '', employmentType: 'full_time', startDate: '', notes: '' });
    await load();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Employer Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your company profile and job listings</p>
        </div>
        <Button onClick={() => setShowProfileForm(true)}>
          <Building2 className="h-4 w-4 mr-2" /> {employer ? 'Edit Profile' : 'Create Profile'}
        </Button>
      </div>

      {employer ? (
        <Card>
          <CardHeader>
            <CardTitle>{employer.companyName}</CardTitle>
            {employer.industry && <CardDescription>{employer.industry}{employer.size ? ` · ${employer.size}` : ''}</CardDescription>}
          </CardHeader>
          <CardContent>
            <div className="grid gap-2 text-sm text-muted-foreground">
              {employer.location && <p className="flex items-center gap-2"><MapPin className="h-3 w-3" />{employer.location}</p>}
              {employer.website && <p>Website: <a href={employer.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{employer.website}</a></p>}
              {employer.companyDescription && <p className="mt-2">{employer.companyDescription}</p>}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <Building2 className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium">No employer profile yet</h3>
            <p className="text-sm text-muted-foreground mt-1 mb-4">Create an employer profile to post jobs and find talent</p>
            <Button onClick={() => setShowProfileForm(true)}>Create Employer Profile</Button>
          </CardContent>
        </Card>
      )}

      <Separator />

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Recruiting Pipeline</h2>
          <p className="text-sm text-muted-foreground">Drag-free kanban — move candidates through stages, schedule interviews, and make offers.</p>
        </div>
        <Badge variant="outline">{pipeline.length} candidates</Badge>
      </div>

      <div className="grid gap-4 lg:grid-cols-4 overflow-x-auto pb-2 min-w-[900px]">
        {PIPELINE_STAGES.filter(s => s !== 'rejected').map(stage => {
          const items = pipeline.filter(p => p.status === stage);
          return (
            <div key={stage} className="rounded-xl border bg-muted/30 p-3 min-h-[200px]">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{stage}</span>
                <Badge variant="secondary">{items.length}</Badge>
              </div>
              <div className="space-y-2">
                {items.length === 0 && <p className="text-xs text-muted-foreground text-center py-6">No candidates</p>}
                {items.map(p => (
                  <button key={p.id} onClick={() => setActiveApp(p)} className="w-full text-left rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors">
                    <p className="font-medium text-sm">{p.firstName} {p.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{p.jobTitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      {p.matchScore != null && <Badge variant="outline" className="text-[10px]">match {Math.round(p.matchScore * 100)}%</Badge>}
                      {p.interviews.length > 0 && <Badge variant="secondary" className="text-[10px]">{p.interviews.length} interview{p.interviews.length > 1 ? 's' : ''}</Badge>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          );
        })}
        <div className="rounded-xl border border-dashed p-3 min-h-[200px]">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Rejected</span>
            <Badge variant="secondary">{pipeline.filter(p => p.status === 'rejected').length}</Badge>
          </div>
          <div className="space-y-2">
            {pipeline.filter(p => p.status === 'rejected').map(p => (
              <button key={p.id} onClick={() => setActiveApp(p)} className="w-full text-left rounded-lg border bg-background p-3 hover:border-primary/50 transition-colors opacity-70">
                <p className="font-medium text-sm">{p.firstName} {p.lastName}</p>
                <p className="text-xs text-muted-foreground truncate">{p.jobTitle}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Job Listings</h2>
        <Button onClick={() => setShowJobForm(true)} disabled={!employer}>
          <Plus className="h-4 w-4 mr-2" /> Post a Job
        </Button>
      </div>

      {jobs.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <p>No job listings yet. Post your first job to start receiving applications.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {jobs.map(job => (
            <Card key={job.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      {job.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>}
                      <Badge variant={job.status === 'published' ? 'default' : 'secondary'}>{job.status}</Badge>
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setSelectedJobApps({ job, apps: applications[job.id] || [] })}>
                    <Users className="h-4 w-4 mr-1" /> {job.applicationsCount} Applicants
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{employer ? 'Edit Company Profile' : 'Create Company Profile'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Company Name *</label>
              <Input value={profileForm.companyName} onChange={e => setProfileForm(f => ({ ...f, companyName: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Description</label>
              <Textarea value={profileForm.companyDescription} onChange={e => setProfileForm(f => ({ ...f, companyDescription: e.target.value }))} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input value={profileForm.website} onChange={e => setProfileForm(f => ({ ...f, website: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input value={profileForm.industry} onChange={e => setProfileForm(f => ({ ...f, industry: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Company Size</label>
              <Input value={profileForm.size} onChange={e => setProfileForm(f => ({ ...f, size: e.target.value }))} placeholder="e.g. 1-10, 11-50, 51-200" />
            </div>
            <div>
              <label className="text-sm font-medium">Location</label>
              <Input value={profileForm.location} onChange={e => setProfileForm(f => ({ ...f, location: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Email</label>
              <Input value={profileForm.contactEmail} onChange={e => setProfileForm(f => ({ ...f, contactEmail: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Contact Phone</label>
              <Input value={profileForm.contactPhone} onChange={e => setProfileForm(f => ({ ...f, contactPhone: e.target.value }))} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileForm(false)}>Cancel</Button>
            <Button onClick={saveProfile}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showJobForm} onOpenChange={setShowJobForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Post a Job</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div>
              <label className="text-sm font-medium">Title *</label>
              <Input value={jobForm.title} onChange={e => setJobForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. Junior React Developer" />
            </div>
            <div>
              <label className="text-sm font-medium">Description *</label>
              <Textarea value={jobForm.description} onChange={e => setJobForm(f => ({ ...f, description: e.target.value }))} rows={4} placeholder="Describe the role, responsibilities, and ideal candidate" />
            </div>
            <div>
              <label className="text-sm font-medium">Requirements</label>
              <Textarea value={jobForm.requirements} onChange={e => setJobForm(f => ({ ...f, requirements: e.target.value }))} rows={3} placeholder="List key requirements and qualifications" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Location</label>
                <Input value={jobForm.location} onChange={e => setJobForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={jobForm.type} onChange={e => setJobForm(f => ({ ...f, type: e.target.value }))}>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Salary Min</label>
                <Input value={jobForm.salaryMin} onChange={e => setJobForm(f => ({ ...f, salaryMin: e.target.value }))} type="number" />
              </div>
              <div>
                <label className="text-sm font-medium">Salary Max</label>
                <Input value={jobForm.salaryMax} onChange={e => setJobForm(f => ({ ...f, salaryMax: e.target.value }))} type="number" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id="remote" checked={jobForm.remote} onChange={e => setJobForm(f => ({ ...f, remote: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
              <label htmlFor="remote" className="text-sm font-medium">Remote position</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJobForm(false)}>Cancel</Button>
            <Button onClick={postJob}>Post Job</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!selectedJobApps} onOpenChange={open => { if (!open) setSelectedJobApps(null); }}>
        <DialogContent className="max-w-2xl">
          {selectedJobApps && (
            <>
              <DialogHeader>
                <DialogTitle>Applications for {selectedJobApps.job.title}</DialogTitle>
                <DialogDescription>{selectedJobApps.apps.length} total applications</DialogDescription>
              </DialogHeader>
              {selectedJobApps.apps.length === 0 ? (
                <p className="text-center py-8 text-muted-foreground">No applications yet.</p>
              ) : (
                <div className="space-y-4 max-h-[50vh] overflow-y-auto">
                  {selectedJobApps.apps.map(app => (
                    <Card key={app.id}>
                      <CardContent className="py-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Applicant</p>
                            {app.coverLetter && <p className="text-sm text-muted-foreground mt-1">{app.coverLetter}</p>}
                            {app.expectedSalary && <p className="text-sm text-muted-foreground mt-1">Expected: R{app.expectedSalary}</p>}
                            <p className="text-xs text-muted-foreground mt-1">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                          </div>
                          <Badge variant={app.status === 'pending' ? 'secondary' : app.status === 'shortlisted' ? 'default' : app.status === 'accepted' ? 'default' : 'destructive'}>
                            {app.status}
                          </Badge>
                        </div>
                        <div className="flex gap-2 mt-3">
                          {app.status === 'pending' && (
                            <>
                              <Button size="sm" variant="default" onClick={() => updateStatus(app.id, 'shortlisted')}>Shortlist</Button>
                              <Button size="sm" variant="outline" onClick={() => updateStatus(app.id, 'rejected')}>Reject</Button>
                            </>
                          )}
                          {app.status === 'shortlisted' && (
                            <>
                              <Button size="sm" variant="default" onClick={() => updateStatus(app.id, 'accepted')}>Accept</Button>
                              <Button size="sm" variant="outline" onClick={() => updateStatus(app.id, 'rejected')}>Reject</Button>
                            </>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={!!activeApp && !showInterviewForm && !showOfferForm} onOpenChange={open => { if (!open) setActiveApp(null); }}>
        <DialogContent className="max-w-2xl">
          {activeApp && (
            <>
              <DialogHeader>
                <DialogTitle>{activeApp.firstName} {activeApp.lastName}</DialogTitle>
                <DialogDescription>{activeApp.jobTitle} · {activeApp.email} · Applied {new Date(activeApp.appliedAt).toLocaleDateString()}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge>{activeApp.status}</Badge>
                  {activeApp.matchScore != null && <Badge variant="outline">Match {Math.round(activeApp.matchScore * 100)}%</Badge>}
                </div>
                <div>
                  <label className="text-sm font-medium">Move stage</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm mt-1" value={activeApp.status} onChange={e => updateStatus(activeApp.id, e.target.value)}>
                    {PIPELINE_STAGES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                {activeApp.notes && <p className="text-sm text-muted-foreground"><span className="font-medium text-foreground">Notes:</span> {activeApp.notes}</p>}
                <div className="rounded-lg border p-4">
                  <p className="font-medium text-sm mb-2">Interviews</p>
                  {activeApp.interviews.length === 0 ? <p className="text-xs text-muted-foreground">None scheduled.</p> : activeApp.interviews.map(iv => (
                    <div key={iv.id} className="flex items-center justify-between py-1 text-sm">
                      <div>
                        <span className="capitalize">{iv.type}</span> · {new Date(iv.scheduledAt).toLocaleString()}
                        {iv.meetingLink && <a href={iv.meetingLink} target="_blank" rel="noopener noreferrer" className="text-primary ml-2 hover:underline">join</a>}
                        {iv.feedback && <div className="text-xs text-muted-foreground mt-0.5">{iv.feedback}{iv.rating ? ` · ${iv.rating}/5` : ''}</div>}
                      </div>
                      <Badge variant={iv.status === 'completed' ? 'default' : 'secondary'}>{iv.status}</Badge>
                    </div>
                  ))}
                </div>
                {activeApp.offers.length > 0 && (
                  <div className="rounded-lg border p-4">
                    <p className="font-medium text-sm mb-2">Offer</p>
                    {activeApp.offers.map(o => (
                      <div key={o.id} className="text-sm">
                        {o.salary ? `${Number(o.salary).toLocaleString()} ${o.salaryCurrency} / ${o.employmentType}` : o.employmentType}
                        {o.startDate ? ` · start ${o.startDate}` : ''} <Badge variant={o.status === 'accepted' ? 'default' : o.status === 'declined' ? 'destructive' : 'secondary'}>{o.status}</Badge>
                        {o.notes && <p className="text-xs text-muted-foreground mt-1">{o.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <DialogFooter className="flex-wrap gap-2">
                <Button variant="outline" onClick={() => setShowInterviewForm(true)}>Schedule Interview</Button>
                <Button variant="outline" onClick={() => setShowOfferForm(true)}>Make Offer</Button>
                <Button onClick={() => setActiveApp(null)}>Close</Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showInterviewForm} onOpenChange={setShowInterviewForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Schedule Interview — {activeApp ? `${activeApp.firstName} ${activeApp.lastName}` : ''}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div><label className="text-sm font-medium">Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={interviewForm.type} onChange={e => setInterviewForm(f => ({ ...f, type: e.target.value }))}>
                <option value="phone">Phone</option><option value="video">Video</option><option value="in_person">In person</option><option value="technical">Technical</option><option value="panel">Panel</option></select></div>
            <div><label className="text-sm font-medium">Date & time</label><Input type="datetime-local" value={interviewForm.scheduledAt} onChange={e => setInterviewForm(f => ({ ...f, scheduledAt: e.target.value }))} /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Duration (min)</label><Input type="number" value={interviewForm.duration} onChange={e => setInterviewForm(f => ({ ...f, duration: Number(e.target.value) }))} /></div>
              <div><label className="text-sm font-medium">Meeting link</label><Input value={interviewForm.meetingLink} onChange={e => setInterviewForm(f => ({ ...f, meetingLink: e.target.value }))} placeholder="https://meet..." /></div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowInterviewForm(false)}>Cancel</Button>
            <Button onClick={scheduleInterview}>Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showOfferForm} onOpenChange={setShowOfferForm}>
        <DialogContent>
          <DialogHeader><DialogTitle>Make Offer — {activeApp ? `${activeApp.firstName} ${activeApp.lastName}` : ''}</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="text-sm font-medium">Salary</label><Input type="number" value={offerForm.salary} onChange={e => setOfferForm(f => ({ ...f, salary: e.target.value }))} /></div>
              <div><label className="text-sm font-medium">Type</label>
                <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value={offerForm.employmentType} onChange={e => setOfferForm(f => ({ ...f, employmentType: e.target.value }))}>
                  <option value="full_time">Full time</option><option value="part_time">Part time</option><option value="contract">Contract</option><option value="internship">Internship</option></select></div>
            </div>
            <div><label className="text-sm font-medium">Start date</label><Input type="date" value={offerForm.startDate} onChange={e => setOfferForm(f => ({ ...f, startDate: e.target.value }))} /></div>
            <div><label className="text-sm font-medium">Notes</label><Textarea value={offerForm.notes} onChange={e => setOfferForm(f => ({ ...f, notes: e.target.value }))} rows={2} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOfferForm(false)}>Cancel</Button>
            <Button onClick={makeOffer}>Send Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
