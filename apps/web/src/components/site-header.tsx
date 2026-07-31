'use client';

import Link from 'next/link';
import { ThemeToggle } from '@cea/ui';
import { Menu, X, GraduationCap } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@cea/ui';
import { motion, AnimatePresence } from 'motion/react';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/events', label: 'Events' },
  { href: '/blog', label: 'Blog' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'bg-background/80 backdrop-blur-xl shadow-lg shadow-primary/5 supports-[backdrop-filter]:bg-background/60'
          : 'bg-background/50 backdrop-blur supports-[backdrop-filter]:bg-background/40'
      }`}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5 font-bold text-lg md:text-xl">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 shadow-lg shadow-primary/20 transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105">
            <GraduationCap className="h-5 w-5 text-white" />
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Cyber Elias Academy
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:rounded-full after:bg-gradient-to-r after:from-blue-600 after:to-purple-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </Link>
          ))}
          <ThemeToggle />
          <Link href="/apply">
            <Button size="sm" className="shadow-md shadow-primary/20">Apply Now</Button>
          </Link>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t bg-background/95 backdrop-blur"
          >
            <div className="p-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-sm font-medium text-muted-foreground hover:text-foreground"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="flex items-center gap-2 pt-2">
                <ThemeToggle />
                <Link href="/login"><Button variant="ghost" size="sm" className="w-full">Sign In</Button></Link>
                <Link href="/apply"><Button size="sm" className="w-full">Apply Now</Button></Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
