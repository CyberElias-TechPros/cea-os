import Link from 'next/link';
import { GraduationCap, Mail, MapPin, Phone, Heart } from 'lucide-react';

const footerLinks = {
  Academy: [
    { href: '/about', label: 'About Us' },
    { href: '/courses', label: 'Courses' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ],
  Programs: [
    { href: '/courses/software-development', label: 'Software Development' },
    { href: '/courses/data-science', label: 'Data Science' },
    { href: '/courses/cybersecurity', label: 'Cyber Security' },
    { href: '/courses/digital-marketing', label: 'Digital Marketing' },
  ],
  Support: [
    { href: '/faq', label: 'FAQ' },
    { href: '/terms', label: 'Terms of Service' },
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/help', label: 'Help Center' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/50 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -bottom-32 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute -bottom-32 right-1/4 h-[300px] w-[300px] rounded-full bg-purple-500/10 blur-3xl" />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 font-bold text-lg">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-primary/20">
                <GraduationCap className="h-5 w-5 text-white" />
              </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cyber Elias Academy
              </span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              Empowering the next generation of tech professionals with industry-relevant skills.
            </p>
            <div className="mt-5 space-y-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a href="mailto:hello@cea.academy" className="hover:text-foreground transition-colors">hello@cea.academy</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <span>+234 800 000 0000</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4">{title}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 border-t pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            &copy; {new Date().getFullYear()} Cyber Elias Academy. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5">
            Made with <Heart className="h-4 w-4 fill-red-500 text-red-500" /> for the future of learning
          </div>
        </div>
      </div>
    </footer>
  );
}
