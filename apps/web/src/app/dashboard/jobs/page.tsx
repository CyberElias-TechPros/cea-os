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
import {
  Briefcase, MapPin, Clock, Search, Loader2, Send, ExternalLink, Filter,
} from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface JobListing {
  id: string; employerId: string; title: string; slug: string; description: string;
  location?: string; type: string; remote: boolean; salaryMin?: number; salaryMax?: number;
  salaryCurrency?: string; requirements?: string; status: string; postedAt: string;
  applicationsCount: number;
}

export default function JobsPage() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [myApps, setMyApps] = useState<{ id: string; jobListingId: string; status: string; appliedAt: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedJob, setSelectedJob] = useState<JobListing | null>(null);
  const [showApply, setShowApply] = useState(false);
  const [applyForm, setApplyForm] = useState({ coverLetter: '', expectedSalary: '' });
  const [myOffers, setMyOffers] = useState<{ id: string; applicationId: string; salary?: number; salaryCurrency?: string; employmentType?: string; startDate?: string; status: string }[]>([]);

  const load = async () => {
    setLoading(true);
    const [jobsRes, appsRes, offersRes] = await Promise.all([
      api<JobListing[]>('/v1/marketplace/jobs'),
      api<{ id: string; jobListingId: string; status: string; appliedAt: string }[]>('/v1/marketplace/applications/my'),
      api<{ id: string; applicationId: string; salary?: number; salaryCurrency?: string; employmentType?: string; startDate?: string; status: string }[]>('/v1/marketplace/offers/my'),
    ]);
    if (jobsRes.success && jobsRes.data) setJobs(jobsRes.data);
    if (appsRes.success && appsRes.data) setMyApps(appsRes.data);
    if (offersRes.success && offersRes.data) setMyOffers(offersRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const respondOffer = async (id: string, accept: boolean) => {
    await api(`/v1/marketplace/offers/${id}/respond`, { method: 'POST', body: JSON.stringify({ accept }) });
    await load();
  };

  const apply = async () => {
    if (!selectedJob) return;
    await api(`/v1/marketplace/jobs/${selectedJob.id}/apply`, {
      method: 'POST',
      body: JSON.stringify(applyForm),
    });
    setShowApply(false);
    setApplyForm({ coverLetter: '', expectedSalary: '' });
    await load();
  };

  const appliedIds = new Set(myApps.map(a => a.jobListingId));

  const filtered = jobs.filter(j =>
    j.title.toLowerCase().includes(search.toLowerCase()) ||
    j.description.toLowerCase().includes(search.toLowerCase()) ||
    (j.location || '').toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Job Board</h1>
        <p className="text-muted-foreground mt-1">Find your next opportunity</p>
      </div>

      <Tabs defaultValue="browse">
        <TabsList>
          <TabsTrigger value="browse">Browse Jobs</TabsTrigger>
          <TabsTrigger value="applications">My Applications ({myApps.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="browse" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs by title, description, or location..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4" />
              <p>No jobs found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {filtered.map(job => (
                <Card key={job.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedJob(job)}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{job.title}</CardTitle>
                        <CardDescription className="flex items-center gap-2 mt-1">
                          {job.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{job.location}</span>}
                          {job.type && <Badge variant="secondary">{job.type}</Badge>}
                          {job.remote && <Badge variant="outline">Remote</Badge>}
                        </CardDescription>
                      </div>
                      {appliedIds.has(job.id) && <Badge>Applied</Badge>}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-2">{job.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      {job.salaryMin && <span>{job.salaryCurrency || 'R'}{job.salaryMin.toLocaleString()}{job.salaryMax ? ` - R${job.salaryMax.toLocaleString()}` : ''}</span>}
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{new Date(job.postedAt).toLocaleDateString()}</span>
                      <span>{job.applicationsCount} applicants</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="applications">
          {myApps.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Send className="h-12 w-12 mx-auto mb-4" />
              <p>You haven't applied to any jobs yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {myApps.map(app => {
                const job = jobs.find(j => j.id === app.jobListingId);
                const offer = myOffers.find(o => o.applicationId === app.id);
                return (
                  <Card key={app.id}>
                    <CardContent className="flex items-center justify-between py-4">
                      <div>
                        <p className="font-medium">{job?.title || 'Unknown Job'}</p>
                        <p className="text-sm text-muted-foreground">Applied {new Date(app.appliedAt).toLocaleDateString()}</p>
                        {offer && <p className="text-sm mt-1">Offer: {offer.salary ? `${Number(offer.salary).toLocaleString()} ${offer.salaryCurrency}` : ''} {offer.employmentType} {offer.startDate ? `· starts ${offer.startDate}` : ''}</p>}
                      </div>
                      <div className="flex items-center gap-2">
                        {offer && offer.status === 'pending' && (
                          <>
                            <Button size="sm" onClick={() => respondOffer(offer.id, true)}>Accept</Button>
                            <Button size="sm" variant="outline" onClick={() => respondOffer(offer.id, false)}>Decline</Button>
                          </>
                        )}
                        <Badge variant={app.status === 'submitted' ? 'secondary' : app.status === 'hired' ? 'default' : app.status === 'rejected' || app.status === 'withdrawn' ? 'destructive' : 'default'}>
                          {app.status}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedJob && !showApply} onOpenChange={open => { if (!open) setSelectedJob(null); }}>
        <DialogContent className="max-w-2xl">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle className="text-xl">{selectedJob.title}</DialogTitle>
                <DialogDescription className="flex items-center gap-2">
                  {selectedJob.location && <><MapPin className="h-3 w-3" />{selectedJob.location}</>}
                  {selectedJob.type && <Badge variant="secondary">{selectedJob.type}</Badge>}
                  {selectedJob.remote && <Badge variant="outline">Remote</Badge>}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedJob.description}</p>
                </div>
                {selectedJob.requirements && (
                  <div>
                    <h4 className="font-medium mb-1">Requirements</h4>
                    <p className="text-sm text-muted-foreground whitespace-pre-wrap">{selectedJob.requirements}</p>
                  </div>
                )}
                {selectedJob.salaryMin && (
                  <p className="text-sm">
                    <strong>Salary:</strong> {selectedJob.salaryCurrency || 'R'}{selectedJob.salaryMin.toLocaleString()}
                    {selectedJob.salaryMax ? ` - R${selectedJob.salaryMax.toLocaleString()}` : ''}
                  </p>
                )}
              </div>
              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => setSelectedJob(null)}>Close</Button>
                {!appliedIds.has(selectedJob.id) && (
                  <Button onClick={() => { setShowApply(true); }}>Apply Now</Button>
                )}
                {appliedIds.has(selectedJob.id) && <Badge variant="secondary" className="py-2 px-4">Already Applied</Badge>}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showApply} onOpenChange={setShowApply}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply for {selectedJob?.title}</DialogTitle>
            <DialogDescription>Send your application to the employer</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Cover Letter</label>
              <Textarea
                value={applyForm.coverLetter}
                onChange={e => setApplyForm(f => ({ ...f, coverLetter: e.target.value }))}
                placeholder="Tell the employer why you're a great fit..."
                rows={6}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Expected Salary (optional)</label>
              <Input
                value={applyForm.expectedSalary}
                onChange={e => setApplyForm(f => ({ ...f, expectedSalary: e.target.value }))}
                placeholder="e.g. 50000"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApply(false)}>Cancel</Button>
            <Button onClick={apply}>Submit Application</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
