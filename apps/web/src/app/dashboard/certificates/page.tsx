'use client';

import { useCallback, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Button, Card, CardContent, Badge } from '@cea/ui';
import { api } from '../../../lib/api-client';
import { Award, Loader2, Download, Share2, ShieldCheck, FileText } from 'lucide-react';
import Link from 'next/link';

interface Certificate {
  id: string;
  certificateNumber: string;
  verificationCode: string;
  courseId: string;
  issuedAt: string;
  metadata?: { finalGrade?: number };
}

export default function CertificatesPage() {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    const res = await api<Certificate[]>('/v1/certificates/my');
    if (res.success && res.data) setCerts(res.data);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  if (loading) return <div className="flex justify-center py-32"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Certificates</h1>
        <p className="text-muted-foreground mt-1">Certificates you&apos;ve earned. Share them with employers and verify online.</p>
      </div>

      {certs.length === 0 ? (
        <Card><CardContent className="p-14 text-center">
          <Award className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-4 text-muted-foreground">No certificates yet. Complete a course to earn your first one.</p>
          <Link href="/courses"><Button className="mt-6">Browse courses</Button></Link>
        </CardContent></Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {certs.map((cert, i) => (
            <motion.div key={cert.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <div className="relative rounded-3xl border bg-gradient-to-br from-amber-50 via-white to-blue-50 dark:from-amber-950/30 dark:via-background dark:to-blue-950/30 p-8 overflow-hidden group">
                <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-2xl" />
                <div className="flex items-start justify-between">
                  <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <Award className="h-6 w-6 text-white" />
                  </div>
                  <Badge variant="success" className="flex items-center gap-1"><ShieldCheck className="h-3 w-3" /> Verified</Badge>
                </div>
                <h3 className="font-bold text-xl mt-6">Certificate of Completion</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Issued {new Date(cert.issuedAt).toLocaleDateString()}
                  {cert.metadata?.finalGrade !== undefined && ` · Final grade: ${Math.round(cert.metadata.finalGrade)}%`}
                </p>
                <div className="mt-4 rounded-xl bg-background/70 backdrop-blur border p-4">
                  <div className="text-xs text-muted-foreground">Certificate number</div>
                  <div className="font-mono text-sm font-semibold mt-0.5 break-all">{cert.certificateNumber}</div>
                </div>
                <div className="mt-6 flex gap-2">
                  <Button size="sm" variant="outline" className="flex-1" onClick={() => window.print()}>
                    <Download className="mr-2 h-4 w-4" /> Download
                  </Button>
                  <Link href={`/verify?code=${cert.verificationCode}`} className="flex-1">
                    <Button size="sm" variant="outline" className="w-full">
                      <Share2 className="mr-2 h-4 w-4" /> Verify link
                    </Button>
                  </Link>
                </div>
                <div className="mt-3 text-center">
                  <Link href={`/verify?code=${cert.verificationCode}`} className="text-xs font-mono text-primary hover:underline break-all">
                    {cert.verificationCode}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <Card className="mt-8">
        <CardContent className="p-6 flex items-start gap-4">
          <FileText className="h-6 w-6 text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Need a transcript?</span> Request a verified transcript from the registrar — a PDF with your complete academic record, signed and verifiable.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
