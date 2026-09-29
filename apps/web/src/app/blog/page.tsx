import Link from 'next/link';
import { Card, CardContent, Badge } from '@cea/ui';
import { Calendar, Clock } from 'lucide-react';
import { getNotes } from '../../lib/content';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes',
  description: 'Free class notes — computer skills from scratch, written as if someone is sitting beside you.',
};

export default function BlogPage() {
  const posts = getNotes();
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold tracking-tight">Notes: computer skills from scratch</h1>
      <p className="mt-2 text-muted-foreground max-w-2xl">
        Free class notes anyone can read — sitting down at a computer, files, email, Word, spreadsheets, the phone, and staying safe online. {posts.length} lessons.
      </p>
      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6 flex flex-col h-full">
              {post.series && <Badge variant="secondary" className="w-fit mb-3">{post.series.split('·')[0]?.trim() || 'Notes'}</Badge>}
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
              <div className="mt-auto flex items-center gap-4 text-xs text-muted-foreground">
                {post.date && <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>}
                {post.minutes && <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.minutes} min</span>}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
