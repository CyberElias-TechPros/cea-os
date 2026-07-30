'use client';

import Link from 'next/link';
import { Card, CardContent, Progress, Badge } from '@cea/ui';
import { BookOpen, ChevronRight } from 'lucide-react';

const mockEnrollments = [
  { id: '1', courseName: 'Full-Stack Web Development', progress: 65, status: 'active', nextLesson: 'React Hooks Deep Dive' },
  { id: '2', courseName: 'Python for Data Science', progress: 30, status: 'active', nextLesson: 'Pandas DataFrames' },
];

export default function LearnPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2">My Learning</h1>
      <p className="text-muted-foreground mb-8">Continue where you left off</p>

      <div className="grid gap-6">
        {mockEnrollments.map((enrollment) => (
          <Link key={enrollment.id} href={`/learn/${enrollment.id}`}>
            <Card className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-5 w-5 text-blue-500" />
                      <h3 className="font-semibold">{enrollment.courseName}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">Next: {enrollment.nextLesson}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </div>
                <div className="flex items-center gap-4">
                  <Progress value={enrollment.progress} className="flex-1" />
                  <span className="text-sm font-medium">{enrollment.progress}%</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
