import Link from 'next/link';
import { Card, CardContent, Badge } from '@cea/ui';
import { Calendar, Clock, User } from 'lucide-react';

const posts = [
  { slug: 'getting-started-with-python', title: 'Getting Started with Python in 2026', excerpt: 'A comprehensive guide to starting your Python journey with the latest tools and best practices.', author: 'Sarah M.', date: '2026-07-25', readTime: '5 min read', category: 'Programming' },
  { slug: 'cybersecurity-career-guide', title: 'Cyber Security Career Guide: 2026 Edition', excerpt: 'Everything you need to know about starting and advancing in cyber security.', author: 'James K.', date: '2026-07-20', readTime: '8 min read', category: 'Career' },
  { slug: 'data-science-trends', title: 'Top Data Science Trends to Watch', excerpt: 'Stay ahead of the curve with these emerging trends in data science and AI.', author: 'Dr. A. Patel', date: '2026-07-15', readTime: '6 min read', category: 'Data Science' },
  { slug: 'remote-learning-tips', title: '10 Tips for Succeeding in Remote Learning', excerpt: 'Maximize your online learning experience with these proven strategies.', author: 'Lisa N.', date: '2026-07-10', readTime: '4 min read', category: 'Student Life' },
  { slug: 'building-your-portfolio', title: 'How to Build a Standout Tech Portfolio', excerpt: 'Showcase your skills effectively with a portfolio that lands you opportunities.', author: 'Mark T.', date: '2026-07-05', readTime: '7 min read', category: 'Career' },
  { slug: 'introduction-to-kubernetes', title: 'Introduction to Kubernetes for Beginners', excerpt: 'Demystifying container orchestration with practical examples and hands-on labs.', author: 'Rachel W.', date: '2026-06-28', readTime: '10 min read', category: 'DevOps' },
];

export default function BlogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Blog</h1>
        <p className="mt-2 text-muted-foreground">Insights, tutorials, and career advice from our team and industry experts.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Card key={post.slug} className="group hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <Badge variant="secondary" className="mb-3">{post.category}</Badge>
              <Link href={`/blog/${post.slug}`}>
                <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
