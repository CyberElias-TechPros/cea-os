import { DurableObject } from "cloudflare:workers";

/**
 * Continuity stub for the pre-existing REALTIME_ROOMS Durable Object
 * namespace. Live instances exist under this class name (deployed from
 * code outside this repo's history), and Cloudflare refuses to deploy a
 * version that drops the class. Nothing in this codebase routes to it,
 * so it intentionally does nothing.
 */
export class RealtimeRoom extends DurableObject {
  override async fetch(_request: Request): Promise<Response> {
    return new Response("Realtime rooms are unavailable", { status: 410 });
  }
}
