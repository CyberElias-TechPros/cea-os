'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button, Card, CardContent, Badge, Separator } from '@cea/ui';
import { Clock, Users, BookOpen, CheckCircle, ArrowRight, GraduationCap } from 'lucide-react';

const mockCourse = {
  slug: 'full-stack-web-development',
  title: 'Full-Stack Web Development',
  category: 'Software Dev',
  duration: '12 weeks',
  students: 120,
  level: 'Beginner to Advanced',
  description: 'Master HTML, CSS, JavaScript, React, Node.js, and databases. Build production-ready applications.',
  longDescription: 'This comprehensive program takes you from absolute beginner to job-ready full-stack developer. You will build multiple real-world projects, work in teams, and graduate with a portfolio that demonstrates your skills to employers.',
  learningOutcomes: [
    'Build responsive web applications with modern frameworks',
    'Design and implement RESTful APIs',
    'Work with relational and NoSQL databases',
    'Deploy applications to cloud platforms',
    'Collaborate using Git and agile methodologies',
    'Write clean, maintainable, and tested code',
  ],
  curriculum: [
    { title: 'Fundamentals', topics: ['HTML5 & CSS3', 'JavaScript ES6+', 'Git & GitHub', 'Command Line'] },
    { title: 'Frontend', topics: ['React & Next.js', 'TypeScript', 'State Management', 'Tailwind CSS'] },
    { title: 'Backend', topics: ['Node.js & Express', 'REST APIs', 'Authentication', 'Database Design'] },
    { title: 'Capstone', topics: ['Full-Stack Project', 'Deployment', 'Portfolio Review', 'Career Prep'] },
  ],
  price: 'R15,000',
};

export default function CourseDetailPage() {
  const { slug } = useParams();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid lg:grid-cols-[1fr_380px] gap-8">
        <div>
          <div className="mb-6">
            <Badge variant="secondary" className="mb-3">{mockCourse.category}</Badge>
            <h1 className="text-4xl font-bold tracking-tight mb-4">{mockCourse.title}</h1>
            <p className="text-lg text-muted-foreground">{mockCourse.description}</p>
          </div>

          <div className="flex flex-wrap gap-6 mb-8 text-sm text-muted-foreground">
            <span className="flex items-center gap-2"><Clock className="h-4 w-4" /> {mockCourse.duration}</span>
            <span className="flex items-center gap-2"><Users className="h-4 w-4" /> {mockCourse.students} students</span>
            <span className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {mockCourse.level}</span>
          </div>

          <Separator className="mb-8" />

          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">What You Will Learn</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {mockCourse.learningOutcomes.map((outcome) => (
                <div key={outcome} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm">{outcome}</span>
                </div>
              ))}
            </div>
          </div>

          <Separator className="mb-8" />

          <div>
            <h2 className="text-2xl font-bold mb-6">Curriculum</h2>
            <div className="space-y-4">
              {mockCourse.curriculum.map((module, i) => (
                <Card key={module.title}>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-semibold">{module.title}</h3>
                        <p className="text-sm text-muted-foreground">{module.topics.join(' · ')}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <Card>
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-6">{mockCourse.price}</div>
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-muted-foreground" /> {mockCourse.duration}</div>
                <div className="flex items-center gap-2"><GraduationCap className="h-4 w-4 text-muted-foreground" /> Certificate upon completion</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4 text-muted-foreground" /> Mentor support</div>
              </div>
              <Link href="/register">
                <Button className="w-full mb-3" size="lg">Enroll Now <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
              <Link href="/visit">
                <Button variant="outline" className="w-full">Request a Visit</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
