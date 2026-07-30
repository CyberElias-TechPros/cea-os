export interface SendNotificationInput {
  userId: string;
  title: string;
  body: string;
  category?: string;
  actionUrl?: string;
  icon?: string;
  priority?: string;
  templateKey?: string;
  templateData?: Record<string, unknown>;
}

export async function sendNotification(env: { NOTIF_QUEUE: Queue<unknown> }, input: SendNotificationInput): Promise<void> {
  await env.NOTIF_QUEUE.send(input);
}

export async function sendNotificationBatch(env: { NOTIF_QUEUE: Queue<unknown> }, inputs: SendNotificationInput[]): Promise<void> {
  if (inputs.length === 0) return;
  const batch = inputs.map(input => ({ body: input }));
  await env.NOTIF_QUEUE.sendBatch(batch);
}
