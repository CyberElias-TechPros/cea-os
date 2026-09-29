import { redirect } from 'next/navigation';

// Certificate verification lives at /verify.
export default function CertificatesVerifyRedirect() {
  redirect('/verify');
}
