'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button, Card, CardContent, Badge, Input } from '@cea/ui';
import { api } from '../../lib/api-client';
import { useAuth } from '../../lib/auth-context';
import { MessageSquare, Users, Loader2, Search, Pin, Eye, Clock, ArrowRight, GraduationCap } from 'lucide-react';

interface Category { id: string; name: string; slug: string; description?: string; orderIndex: number }
interface Thread { id: string; categoryId: string; title: string; userId: string; isPinned: boolean; replyCount: number; viewCount: number; lastActivityAt: string; createdAt: string }
interface Post { id: string; content: string; userId: string; createdAt: string }
interface Group { id: string; name: string; description?: string; type: string; memberCount: number }

export default function CommunityPage() {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [search, setSearch] = useState('');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    const [cRes, tRes, gRes] = await Promise.all([
      api<Category[]>('/v1/community/forums/categories'),
      api<Thread[]>('/v1/community/forums/threads'),
      api<Group[]>('/v1/community/groups'),
    ]);
    if (cRes.success && cRes.data) setCategories(cRes.data);
    if (tRes.success && tRes.data) setThreads(tRes.data);
    if (gRes.success && gRes.data) setGroups(gRes.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const openThread = async (t: Thread) => {
    setSelectedThread(t);
    const res = await api<Thread & { posts: Post[] }>(`/v1/community/forums/threads/${t.id}`);
    if (res.success && res.data) setPosts(res.data.posts ?? []);
  };

  const filtered = threads.filter(t =>
    (!categoryFilter || t.categoryId === categoryFilter) &&
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div className="relative">
      <div className="absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary/10 to-transparent -z-10" />
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">CEA Community</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Learn together, grow together</h1>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-lg">
            Discussions, study groups and events for students, alumni and mentors.
          </p>
          {!user && (
            <div className="mt-6">
              <Link href="/login"><Button>Join the conversation <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </div>
          )}
        </div>

        <div className="relative max-w-md mx-auto mb-10">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search discussions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10" />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant={!categoryFilter ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setCategoryFilter('')}>All</Badge>
              {categories.map(c => (
                <Badge key={c.id} variant={categoryFilter === c.id ? 'default' : 'outline'} className="cursor-pointer" onClick={() => setCategoryFilter(c.id)}>{c.name}</Badge>
              ))}
            </div>

            {filtered.length === 0 ? (
              <Card><CardContent className="p-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto" />
                <p className="mt-4 text-muted-foreground">No discussions found.</p>
              </CardContent></Card>
            ) : (
              filtered.map((t, i) => (
                <motion.div key={t.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                  <Card className="hover:border-primary/40 transition-colors cursor-pointer" onClick={() => openThread(t)}>
                    <CardContent className="p-5">
                      <div className="flex items-start gap-3">
                        {t.isPinned && <Pin className="h-4 w-4 text-primary shrink-0 mt-0.5" />}
                        <div className="min-w-0 flex-1">
                          <div className="font-semibold truncate">{t.title}</div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1.5">
                            <span className="flex items-center gap-1"><MessageSquare className="h-3 w-3" /> {t.replyCount} replies</span>
                            <span className="flex items-center gap-1"><Eye className="h-3 w-3" /> {t.viewCount} views</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(t.lastActivityAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          <div className="space-y-4">
            <h2 className="font-semibold flex items-center gap-2"><Users className="h-5 w-5 text-green-500" /> Study groups</h2>
            {groups.length === 0 ? (
              <Card><CardContent className="p-8 text-center text-muted-foreground text-sm">No public groups yet.</CardContent></Card>
            ) : (
              groups.slice(0, 6).map(g => (
                <Card key={g.id}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between gap-2">
                      <div className="font-semibold text-sm truncate">{g.name}</div>
                      <Badge variant="outline" className="text-xs shrink-0">{g.memberCount} members</Badge>
                    </div>
                    {g.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{g.description}</p>}
                    {g.type && <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-2">{g.type}</div>}
                  </CardContent>
                </Card>
              ))
            )}
            <Link href="/events" className="block">
              <Card className="border-primary/30 bg-gradient-to-br from-primary/10 to-transparent hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <div className="text-sm font-semibold">Upcoming events</div>
                    <div className="text-xs text-muted-foreground">Workshops, webinars and career fairs</div>
                  </div>
                  <ArrowRight className="h-4 w-4 ml-auto shrink-0" />
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </div>

      {selectedThread && (
        <div className="fixed inset-0 z-[90] flex items-start justify-center p-4 pt-[10vh]">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedThread(null)} />
          <div className="relative w-full max-w-2xl rounded-2xl border bg-background shadow-2xl">
            <div className="p-6 border-b">
              <h2 className="font-bold text-lg">{selectedThread.title}</h2>
              <div className="text-xs text-muted-foreground mt-1 flex items-center gap-1"><Clock className="h-3 w-3" /> Started {new Date(selectedThread.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="p-6 max-h-[50vh] overflow-y-auto space-y-4">
              {posts.length === 0 && <p className="text-sm text-muted-foreground text-center py-6">No replies yet.</p>}
              {posts.map(p => (
                <div key={p.id} className="rounded-xl bg-muted p-4">
                  <p className="text-sm">{p.content}</p>
                  <p className="text-xs text-muted-foreground mt-2">{new Date(p.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
            <div className="p-6 pt-0">
              {user ? (
                <Link href="/dashboard/community" className="block">
                  <Button className="w-full">Reply in your dashboard</Button>
                </Link>
              ) : (
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">Log in to join the discussion</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
