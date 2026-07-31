import Link from 'next/link';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { Clock, Users, BookOpen, GitCompareArrows } from 'lucide-react';

const courses = [
  { slug: 'full-stack-web-development', title: 'Full-Stack Web Development', category: 'Software Dev', duration: '12 weeks', students: 120, level: 'Beginner to Advanced', description: 'Master HTML, CSS, JavaScript, React, Node.js, and databases. Build production-ready applications.' },
  { slug: 'python-data-science', title: 'Python for Data Science', category: 'Data Science', duration: '10 weeks', students: 85, level: 'Beginner', description: 'Learn Python, pandas, NumPy, Matplotlib, and machine learning fundamentals.' },
  { slug: 'cybersecurity-essentials', title: 'Cyber Security Essentials', category: 'Cyber Security', duration: '14 weeks', students: 95, level: 'Intermediate', description: 'Network security, ethical hacking, incident response, and compliance.' },
  { slug: 'digital-marketing-strategy', title: 'Digital Marketing Strategy', category: 'Marketing', duration: '8 weeks', students: 110, level: 'Beginner', description: 'SEO, SEM, social media marketing, content strategy, and analytics.' },
  { slug: 'cloud-devops', title: 'Cloud & DevOps Engineering', category: 'Cloud', duration: '12 weeks', students: 60, level: 'Intermediate', description: 'AWS, Docker, Kubernetes, CI/CD pipelines, and infrastructure as code.' },
  { slug: 'ai-machine-learning', title: 'AI & Machine Learning', category: 'AI', duration: '16 weeks', students: 70, level: 'Advanced', description: 'Deep learning, NLP, computer vision, and deployment with TensorFlow and PyTorch.' },
  { slug: 'ui-ux-design', title: 'UI/UX Design', category: 'Design', duration: '8 weeks', students: 90, level: 'Beginner', description: 'User research, wireframing, prototyping, and design systems with Figma.' },
  { slug: 'mobile-app-development', title: 'Mobile App Development', category: 'Software Dev', duration: '12 weeks', students: 55, level: 'Intermediate', description: 'React Native and Flutter for cross-platform mobile applications.' },
];

const categories = [...new Set(courses.map(c => c.category))];

export default function CoursesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Our Courses</h1>
          <p className="mt-2 text-muted-foreground">Industry-relevant curriculum designed to get you job-ready.</p>
        </div>
        <Link href="/courses/compare">
          <Button variant="outline"><GitCompareArrows className="mr-2 h-4 w-4" /> Compare Programs</Button>
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <Badge variant="secondary" className="cursor-pointer">All</Badge>
        {categories.map(cat => (
          <Badge key={cat} variant="outline" className="cursor-pointer">{cat}</Badge>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {courses.map((course) => (
          <Card key={course.slug} className="group hover:shadow-lg transition-shadow flex flex-col">
            <CardContent className="p-6 flex flex-col flex-1">
              <Badge variant="secondary" className="w-fit mb-3">{course.category}</Badge>
              <h3 className="font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {course.title}
              </h3>
              <p className="text-sm text-muted-foreground flex-1 mb-4">{course.description}</p>
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2"><Clock className="h-4 w-4" /> {course.duration}</div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /> {course.students} students</div>
                <div className="flex items-center gap-2"><BookOpen className="h-4 w-4" /> {course.level}</div>
              </div>
              <Link href={`/courses/${course.slug}`}>
                <Button variant="outline" size="sm" className="w-full">View Course</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
