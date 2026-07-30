'use client';

import { useParams } from 'next/navigation';
import { Card, CardContent, Button, Progress, Separator } from '@cea/ui';
import { Play, FileText, ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const mockModule = {
  id: '1',
  title: 'Introduction to Web Development',
  lessons: [
    { id: '1', title: 'How the Web Works', type: 'video', duration: '12:30', completed: true },
    { id: '2', title: 'Setting Up Your Environment', type: 'article', duration: '15 min', completed: true },
    { id: '3', title: 'Your First HTML Page', type: 'video', duration: '18:45', completed: false },
    { id: '4', title: 'HTML Elements & Structure', type: 'article', duration: '20 min', completed: false },
    { id: '5', title: 'Module Quiz', type: 'quiz', duration: '10 min', completed: false },
  ],
};

export default function LessonViewerPage() {
  const { id } = useParams();

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/learn" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to My Learning
      </Link>

      <div className="grid lg:grid-cols-[1fr_320px] gap-8">
        <div>
          <Card>
            <CardContent className="p-8">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-6">
                <Play className="h-16 w-16 text-muted-foreground" />
              </div>
              <h1 className="text-2xl font-bold mb-2">Your First HTML Page</h1>
              <p className="text-muted-foreground mb-6">
                Learn how to create your first HTML document, understand the basic structure, and add content to your webpage.
              </p>
              <Separator className="mb-6" />
              <div className="space-y-4">
                <h3 className="font-semibold">Key Concepts</h3>
                <ul className="space-y-2">
                  {['HTML document structure', 'Head and body tags', 'Headings and paragraphs', 'Text formatting'].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex justify-between mt-8">
                <Button variant="outline"><ChevronLeft className="mr-2 h-4 w-4" /> Previous</Button>
                <Button>Next Lesson <ChevronRight className="ml-2 h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Course Progress</span>
                <span className="text-sm text-muted-foreground">40%</span>
              </div>
              <Progress value={40} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-semibold mb-4">{mockModule.title}</h3>
              <div className="space-y-1">
                {mockModule.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    className={`w-full flex items-center gap-3 p-2 rounded-md text-left text-sm hover:bg-accent transition-colors ${
                      lesson.completed ? 'text-muted-foreground' : ''
                    }`}
                  >
                    {lesson.type === 'video' ? <Play className="h-3.5 w-3.5 shrink-0" /> :
                     lesson.type === 'quiz' ? <FileText className="h-3.5 w-3.5 shrink-0" /> :
                     <FileText className="h-3.5 w-3.5 shrink-0" />}
                    <span className="flex-1 truncate">{lesson.title}</span>
                    <span className="text-xs text-muted-foreground">{lesson.duration}</span>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
