import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

export type Doc = {
  slug: string;
  title: string;
  description: string;
  date: string;
  minutes: string;
  series?: string;
  class_slug?: string;
  next_href?: string;
  next_title?: string;
  body: string;
};

function contentRoot(): string {
  const candidates = [
    join(process.cwd(), 'content'),
    join(process.cwd(), 'apps', 'web', 'content'),
  ];
  for (const c of candidates) if (existsSync(c)) return c;
  return candidates[0];
}

function parseFile(file: string, slug: string): Doc {
  const raw = readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n\n([\s\S]*)$/);
  const meta: Record<string, string> = {};
  let body = raw;
  if (m) {
    body = m[2];
    for (const line of m[1].split('\n')) {
      const i = line.indexOf(':');
      if (i > 0) {
        const v = line.slice(i + 1).trim();
        meta[line.slice(0, i).trim()] = v.startsWith('"') && v.endsWith('"') ? v.slice(1, -1) : v;
      }
    }
  }
  return {
    slug,
    title: meta.title ?? slug,
    description: meta.description ?? '',
    date: meta.date ?? '',
    minutes: meta.minutes ?? '',
    series: meta.series,
    class_slug: meta.class_slug,
    next_href: meta.next_href,
    next_title: meta.next_title,
    body,
  };
}

export function getNotes(): Doc[] {
  const dir = join(contentRoot(), 'notes');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => parseFile(join(dir, f), f.replace(/\.md$/, '')))
    .sort((a, b) => (b.date || '').localeCompare(a.date || ''));
}

export function getNote(slug: string): Doc | null {
  const file = join(contentRoot(), 'notes', `${slug}.md`);
  if (!existsSync(file)) return null;
  return parseFile(file, slug);
}

export function getLessonSlugs(classSlug: string): string[] {
  const dir = join(contentRoot(), 'lessons', classSlug);
  if (!existsSync(dir)) return [];
  return readdirSync(dir).filter((f) => f.endsWith('.md')).map((f) => f.replace(/\.md$/, '')).sort();
}

export function getLesson(classSlug: string, lesson: string): Doc | null {
  const file = join(contentRoot(), 'lessons', classSlug, `${lesson}.md`);
  if (!existsSync(file)) return null;
  return parseFile(file, lesson);
}

export function getAllLessonPaths(): { classSlug: string; lesson: string }[] {
  const dir = join(contentRoot(), 'lessons');
  if (!existsSync(dir)) return [];
  const out: { classSlug: string; lesson: string }[] = [];
  for (const c of readdirSync(dir, { withFileTypes: true })) {
    if (!c.isDirectory()) continue;
    for (const s of getLessonSlugs(c.name)) out.push({ classSlug: c.name, lesson: s });
  }
  return out;
}
