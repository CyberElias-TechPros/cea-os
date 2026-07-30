import Link from 'next/link';

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
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Cyber Elias Academy
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Empowering the next generation of tech professionals with industry-relevant skills.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Cyber Elias Academy. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
