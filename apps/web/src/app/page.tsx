import Link from 'next/link';
import { Button, Card, CardContent } from '@cea/ui';
import { ArrowRight, BookOpen, Users, Award, BarChart3, Code, Shield, Database, TrendingUp } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Students Trained' },
  { value: '50+', label: 'Courses' },
  { value: '95%', label: 'Employment Rate' },
  { value: '4.8/5', label: 'Student Rating' },
];

const features = [
  { icon: Code, title: 'Software Development', description: 'Full-stack, mobile, and systems programming from fundamentals to advanced.' },
  { icon: Shield, title: 'Cyber Security', description: 'Ethical hacking, network defense, and security operations.' },
  { icon: Database, title: 'Data Science & AI', description: 'Machine learning, deep learning, and data analytics.' },
  { icon: TrendingUp, title: 'Digital Marketing', description: 'SEO, paid ads, content strategy, and social media.' },
  { icon: BarChart3, title: 'Business & Tech', description: 'Project management, product ownership, and tech leadership.' },
  { icon: BookOpen, title: 'Career-Ready Skills', description: 'Portfolio building, interview prep, and job placement support.' },
];

const programs = [
  { title: 'Full-Time Bootcamp', duration: '12 weeks', description: 'Intensive immersive program with mentorship, projects, and job placement.' },
  { title: 'Part-Time Evening', duration: '24 weeks', description: 'Flexible schedule for working professionals. Same curriculum, extended timeline.' },
  { title: 'Self-Paced Online', duration: 'Flexible', description: 'Learn at your own pace with recorded content, labs, and weekly mentor sessions.' },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-purple-50 dark:from-blue-950 dark:via-background dark:to-purple-950">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Master Digital Skills. Build Your Future.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Cyber Elias Academy provides industry-relevant training in software development, data science, cyber security, and digital marketing — from beginner to job-ready.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="w-full sm:w-auto">Start Learning Today</Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">Browse Courses <ArrowRight className="ml-2 h-4 w-4" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{stat.value}</div>
                <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">What You Can Learn</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Our curriculum is designed with industry input to ensure you graduate with skills employers demand.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="h-12 w-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">Choose Your Path</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Flexible learning formats designed to fit your schedule and learning style.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {programs.map((program) => (
              <Card key={program.title} className="text-center">
                <CardContent className="p-8">
                  <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">{program.duration}</div>
                  <h3 className="text-xl font-semibold mb-3">{program.title}</h3>
                  <p className="text-sm text-muted-foreground">{program.description}</p>
                  <Link href="/register">
                    <Button className="mt-6 w-full">Enroll Now</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight">Ready to Start Your Journey?</h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Join hundreds of successful graduates who have transformed their careers through our programs.
          </p>
          <div className="mt-8">
            <Link href="/register">
              <Button size="lg">Apply Now — Free Assessment</Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
