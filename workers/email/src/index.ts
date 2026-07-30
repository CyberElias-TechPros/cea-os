interface EmailMessage {
  to: string;
  subject: string;
  html: string;
  from?: string;
  replyTo?: string;
  templateKey?: string;
  templateData?: Record<string, unknown>;
}

export default {
  async queue(batch: MessageBatch<EmailMessage>, env: unknown): Promise<void> {
    for (const msg of batch.messages) {
      const email = msg.body;
      console.log(`[EMAIL] Sending to: ${email.to}, Subject: ${email.subject}`);

      try {
        // Integration with SendGrid/Resend will replace this
        // await sendEmail(email);
        console.log(`[EMAIL] Sent successfully to ${email.to}`);
        msg.ack();
      } catch (err) {
        console.error(`[EMAIL] Failed to send to ${email.to}:`, err);
        msg.retry();
      }
    }
  },
};
