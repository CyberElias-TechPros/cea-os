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
    </div>
  );
}
