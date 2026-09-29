import { redirect } from 'next/navigation';

// Canonical class catalogue lives at /classes (matches the public sitemap).
export default function CompareRedirect() {
  redirect('/classes');
}
