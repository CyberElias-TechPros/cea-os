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
  Users, Search, Loader2, GraduationCap, Star, MapPin, Briefcase, Globe,
} from 'lucide-react';
import { api } from '../../../lib/api-client';
import { useAuth } from '../../../lib/auth-context';

interface AlumniProfile {
  id: string; userId: string; graduationYear?: string; program?: string;
  currentEmployer?: string; jobTitle?: string; industry?: string;
  bio?: string; linkedinUrl?: string; githubUrl?: string; website?: string;
  isMentor: boolean; isVisible: boolean;
  user?: { id: string; firstName: string; lastName: string; avatarUrl?: string };
}

export default function AlumniPage() {
  const { user } = useAuth();
  const [myProfile, setMyProfile] = useState<AlumniProfile | null>(null);
  const [directory, setDirectory] = useState<AlumniProfile[]>([]);
  const [mentors, setMentors] = useState<AlumniProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [profileForm, setProfileForm] = useState({
    graduationYear: '', program: '', currentEmployer: '', jobTitle: '',
    industry: '', bio: '', linkedinUrl: '', githubUrl: '', website: '', isMentor: false, isVisible: true,
  });
  const [selectedAlumni, setSelectedAlumni] = useState<AlumniProfile | null>(null);

  const load = async () => {
    setLoading(true);
    const [profileRes, dirRes, mentorRes] = await Promise.all([
      api<AlumniProfile>('/v1/alumni/profile'),
      api<AlumniProfile[]>('/v1/alumni/directory'),
      api<AlumniProfile[]>('/v1/alumni/mentors'),
    ]);
    if (profileRes.success && profileRes.data) {
      setMyProfile(profileRes.data);
      setProfileForm({
        graduationYear: profileRes.data.graduationYear || '',
        program: profileRes.data.program || '',
        currentEmployer: profileRes.data.currentEmployer || '',
        jobTitle: profileRes.data.jobTitle || '',
        industry: profileRes.data.industry || '',
        bio: profileRes.data.bio || '',
        linkedinUrl: profileRes.data.linkedinUrl || '',
        githubUrl: profileRes.data.githubUrl || '',
        website: profileRes.data.website || '',
        isMentor: profileRes.data.isMentor,
        isVisible: profileRes.data.isVisible,
      });
    }
    if (dirRes.success && dirRes.data) setDirectory(dirRes.data);
    if (mentorRes.success && mentorRes.data) setMentors(mentorRes.data);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const saveProfile = async () => {
    await api('/v1/alumni/profile', { method: 'POST', body: JSON.stringify(profileForm) });
    await load();
    setShowProfileForm(false);
  };

  const filtered = directory.filter(p =>
    (p.user?.firstName || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.user?.lastName || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.currentEmployer || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.industry || '').toLowerCase().includes(search.toLowerCase())
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Alumni Network</h1>
          <p className="text-muted-foreground mt-1">Connect with fellow graduates and mentors</p>
        </div>
        <Button onClick={() => setShowProfileForm(true)}>
          <GraduationCap className="h-4 w-4 mr-2" /> {myProfile ? 'Update Profile' : 'Create Profile'}
        </Button>
      </div>

      <Tabs defaultValue="directory">
        <TabsList>
          <TabsTrigger value="directory">Directory ({directory.length})</TabsTrigger>
          <TabsTrigger value="mentors">Mentors ({mentors.length})</TabsTrigger>
          <TabsTrigger value="my">My Profile</TabsTrigger>
        </TabsList>

        <TabsContent value="directory" className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search alumni by name, company, or industry..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4" />
              <p>No alumni found matching your search.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map(p => (
                <Card key={p.id} className="hover:border-primary/50 transition-colors cursor-pointer" onClick={() => setSelectedAlumni(p)}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {p.user?.firstName?.[0]}{p.user?.lastName?.[0]}
                      </div>
                      <div>
                        <CardTitle className="text-base">{p.user?.firstName} {p.user?.lastName}</CardTitle>
                        {p.jobTitle && <CardDescription>{p.jobTitle}{p.currentEmployer ? ` at ${p.currentEmployer}` : ''}</CardDescription>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      {p.industry && <Badge variant="secondary" className="text-xs">{p.industry}</Badge>}
                      {p.graduationYear && <Badge variant="outline" className="text-xs">Class of {p.graduationYear}</Badge>}
                      {p.isMentor && <Badge className="text-xs">Mentor</Badge>}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="mentors">
          {mentors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Star className="h-12 w-12 mx-auto mb-4" />
              <p>No mentors available yet. Check back later.</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {mentors.map(p => (
                <Card key={p.id} className="border-primary/30" onClick={() => setSelectedAlumni(p)}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                        {p.user?.firstName?.[0]}{p.user?.lastName?.[0]}
                      </div>
                      <div>
                        <CardTitle className="text-base">{p.user?.firstName} {p.user?.lastName}</CardTitle>
                        {p.jobTitle && <CardDescription>{p.jobTitle}{p.currentEmployer ? ` at ${p.currentEmployer}` : ''}</CardDescription>}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {p.bio && <p className="text-sm text-muted-foreground line-clamp-2">{p.bio}</p>}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="my">
          {myProfile ? (
            <Card>
              <CardHeader>
                <CardTitle>{user?.firstName} {user?.lastName}</CardTitle>
                <CardDescription>{myProfile.jobTitle}{myProfile.currentEmployer ? ` at ${myProfile.currentEmployer}` : ''}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {myProfile.bio && <p className="text-sm text-muted-foreground">{myProfile.bio}</p>}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {myProfile.graduationYear && <p><strong>Graduated:</strong> {myProfile.graduationYear}</p>}
                  {myProfile.program && <p><strong>Program:</strong> {myProfile.program}</p>}
                  {myProfile.industry && <p><strong>Industry:</strong> {myProfile.industry}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={myProfile.isMentor ? 'default' : 'secondary'}>{myProfile.isMentor ? 'Mentor' : 'Not a Mentor'}</Badge>
                  <Badge variant={myProfile.isVisible ? 'default' : 'secondary'}>{myProfile.isVisible ? 'Visible' : 'Hidden'}</Badge>
                </div>
                <div className="flex gap-3 pt-2">
                  {myProfile.linkedinUrl && <a href={myProfile.linkedinUrl} target="_blank" className="text-sm text-primary hover:underline">LinkedIn</a>}
                  {myProfile.githubUrl && <a href={myProfile.githubUrl} target="_blank" className="text-sm text-primary hover:underline">GitHub</a>}
                  {myProfile.website && <a href={myProfile.website} target="_blank" className="text-sm text-primary hover:underline">Website</a>}
                </div>
                <Button variant="outline" onClick={() => setShowProfileForm(true)} className="mt-2">Edit Profile</Button>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12 text-center">
                <GraduationCap className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No alumni profile yet</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-4">Create your alumni profile to connect with the network</p>
                <Button onClick={() => setShowProfileForm(true)}>Create Profile</Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Dialog open={!!selectedAlumni} onOpenChange={open => { if (!open) setSelectedAlumni(null); }}>
        <DialogContent className="max-w-lg">
          {selectedAlumni && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium">
                    {selectedAlumni.user?.firstName?.[0]}{selectedAlumni.user?.lastName?.[0]}
                  </div>
                  <div>
                    <DialogTitle>{selectedAlumni.user?.firstName} {selectedAlumni.user?.lastName}</DialogTitle>
                    <DialogDescription>{selectedAlumni.jobTitle}{selectedAlumni.currentEmployer ? ` at ${selectedAlumni.currentEmployer}` : ''}</DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-3">
                {selectedAlumni.bio && <p className="text-sm text-muted-foreground">{selectedAlumni.bio}</p>}
                <div className="grid grid-cols-2 gap-3 text-sm">
                  {selectedAlumni.graduationYear && <p><strong>Graduated:</strong> {selectedAlumni.graduationYear}</p>}
                  {selectedAlumni.program && <p><strong>Program:</strong> {selectedAlumni.program}</p>}
                  {selectedAlumni.industry && <p><strong>Industry:</strong> {selectedAlumni.industry}</p>}
                </div>
                {selectedAlumni.isMentor && <Badge>Available as Mentor</Badge>}
                <div className="flex gap-3 pt-2">
                  {selectedAlumni.linkedinUrl && <a href={selectedAlumni.linkedinUrl} target="_blank" className="text-sm text-primary hover:underline">LinkedIn</a>}
                  {selectedAlumni.githubUrl && <a href={selectedAlumni.githubUrl} target="_blank" className="text-sm text-primary hover:underline">GitHub</a>}
                  {selectedAlumni.website && <a href={selectedAlumni.website} target="_blank" className="text-sm text-primary hover:underline">Website</a>}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={showProfileForm} onOpenChange={setShowProfileForm}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{myProfile ? 'Update Alumni Profile' : 'Create Alumni Profile'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Graduation Year</label>
                <Input value={profileForm.graduationYear} onChange={e => setProfileForm(f => ({ ...f, graduationYear: e.target.value }))} placeholder="e.g. 2025" />
              </div>
              <div>
                <label className="text-sm font-medium">Program</label>
                <Input value={profileForm.program} onChange={e => setProfileForm(f => ({ ...f, program: e.target.value }))} placeholder="e.g. Software Engineering" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Job Title</label>
                <Input value={profileForm.jobTitle} onChange={e => setProfileForm(f => ({ ...f, jobTitle: e.target.value }))} />
              </div>
              <div>
                <label className="text-sm font-medium">Current Employer</label>
                <Input value={profileForm.currentEmployer} onChange={e => setProfileForm(f => ({ ...f, currentEmployer: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Industry</label>
              <Input value={profileForm.industry} onChange={e => setProfileForm(f => ({ ...f, industry: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Bio</label>
              <Textarea value={profileForm.bio} onChange={e => setProfileForm(f => ({ ...f, bio: e.target.value }))} rows={3} />
            </div>
            <div>
              <label className="text-sm font-medium">LinkedIn URL</label>
              <Input value={profileForm.linkedinUrl} onChange={e => setProfileForm(f => ({ ...f, linkedinUrl: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">GitHub URL</label>
              <Input value={profileForm.githubUrl} onChange={e => setProfileForm(f => ({ ...f, githubUrl: e.target.value }))} />
            </div>
            <div>
              <label className="text-sm font-medium">Website</label>
              <Input value={profileForm.website} onChange={e => setProfileForm(f => ({ ...f, website: e.target.value }))} />
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <input type="checkbox" id="mentorToggle" checked={profileForm.isMentor} onChange={e => setProfileForm(f => ({ ...f, isMentor: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="mentorToggle" className="text-sm font-medium">Available as Mentor</label>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="visibleToggle" checked={profileForm.isVisible} onChange={e => setProfileForm(f => ({ ...f, isVisible: e.target.checked }))} className="h-4 w-4 rounded border-gray-300" />
                <label htmlFor="visibleToggle" className="text-sm font-medium">Visible in Directory</label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowProfileForm(false)}>Cancel</Button>
            <Button onClick={saveProfile}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
