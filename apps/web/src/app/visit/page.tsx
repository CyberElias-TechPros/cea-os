'use client';

import { useState } from 'react';
import { Button, Input, Textarea, Label, Card, CardContent, CardHeader, CardTitle, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@cea/ui';
import { CheckCircle } from 'lucide-react';

const purposes = [
  { value: 'enrollment_inquiry', label: 'Enrollment Inquiry' },
  { value: 'visit', label: 'General Visit' },
  { value: 'meeting', label: 'Meeting with Staff' },
  { value: 'interview', label: 'Interview' },
  { value: 'delivery', label: 'Delivery' },
  { value: 'event', label: 'Event' },
  { value: 'other', label: 'Other' },
];

export default function VisitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = new FormData(e.currentTarget);
    const data = Object.fromEntries(form.entries());
    try {
      // Same-origin via the Vercel /api rewrite (see root vercel.json);
      // never hardcode a backend host so session cookies stay first-party.
      const res = await fetch(`/api/v1/visitors/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      alert('Failed to submit. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-md text-center">
        <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Visit Request Submitted</h1>
        <p className="text-muted-foreground">Your visit has been registered. Please show your ID at reception when you arrive.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-lg">
      <Card>
        <CardHeader>
          <CardTitle>Schedule a Visit</CardTitle>
          <p className="text-sm text-muted-foreground">Let us know you&apos;re coming so we can prepare for your visit.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" name="firstName" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" name="lastName" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" type="tel" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purpose">Purpose of Visit</Label>
              <Select name="purpose" required>
                <SelectTrigger><SelectValue placeholder="Select purpose" /></SelectTrigger>
                <SelectContent>
                  {purposes.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hostName">Who are you visiting? (optional)</Label>
              <Input id="hostName" name="hostName" placeholder="e.g. John Smith" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (optional)</Label>
              <Textarea id="notes" name="notes" rows={3} />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Visit Request'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
