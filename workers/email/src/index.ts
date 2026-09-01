interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  templateKey?: string;
  templateData?: Record<string, unknown>;
}

interface EmailEnv {
  EMAIL_QUEUE: Queue<EmailMessage>;
  EMAIL_FROM?: string;
  RESEND_API_KEY?: string;
  SENDGRID_API_KEY?: string;
}

/**
 * Sends email via Resend (preferred) or SendGrid when credentials are present.
 * Falls back to structured logging so the queue consumer is always functional.
 */
async function deliverEmail(env: EmailEnv, email: EmailMessage): Promise<void> {
  const from = email.from ?? env.EMAIL_FROM ?? 'noreply@cea.academy';

  if (env.RESEND_API_KEY) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [email.to],
        subject: email.subject,
        html: email.html,
        ...(email.replyTo ? { reply_to: email.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      throw new Error(`Resend returned ${res.status}: ${await res.text()}`);
    }
    return;
  }

  if (env.SENDGRID_API_KEY) {
    const res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: email.to }] }],
        from: { email: from },
        subject: email.subject,
        content: [{ type: 'text/html', value: email.html }],
        ...(email.replyTo ? { reply_to: { email: email.replyTo } } : {}),
      }),
    });
    if (!res.ok) {
      throw new Error(`SendGrid returned ${res.status}: ${await res.text()}`);
    }
    return;
  }

  // No provider configured — log so the message is not lost silently in dev.
  console.log(`[EMAIL] (no provider configured) to=${email.to} subject="${email.subject}"`);
  console.log(`[EMAIL] body=${email.html}`);
}

export default {
  async queue(batch: MessageBatch<EmailMessage>, env: EmailEnv): Promise<void> {
    for (const msg of batch.messages) {
      const email = msg.body;
      if (!email?.to || !email?.subject) {
        console.error('[EMAIL] Rejecting malformed message (missing to/subject)');
        msg.ack();
        continue;
      }

      try {
        await deliverEmail(env, email);
        console.log(`[EMAIL] Sent to ${email.to}`);
        msg.ack();
      } catch (err) {
        console.error(`[EMAIL] Failed to send to ${email.to}:`, err);
        msg.retry();
      }
    }
  },
};
