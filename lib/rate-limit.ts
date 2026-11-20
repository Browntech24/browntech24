/**
 * Contact form rate limiting. Uses Upstash Redis over its REST API when the
 * environment is configured (durable across instances) and falls back to a
 * per-instance window otherwise. The fallback is imperfect on serverless, but
 * it still stops a single client hammering one instance.
 */
const WINDOW_SECONDS = 60 * 60;
const LIMIT = 5;

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetAt: number;
};

function upstashConfig() {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/+$/, ""), token } : null;
}

async function checkUpstash(key: string): Promise<RateLimitResult | null> {
  const config = upstashConfig();
  if (!config) return null;

  try {
    const response = await fetch(`${config.url}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["EXPIRE", key, WINDOW_SECONDS, "NX"],
        ["TTL", key],
      ]),
      cache: "no-store",
    });

    if (!response.ok) return null;

    const payload = (await response.json()) as Array<{ result?: number; error?: string }>;
    const count = payload[0]?.result;
    const ttl = payload[2]?.result;

    if (typeof count !== "number") return null;

    return {
      ok: count <= LIMIT,
      remaining: Math.max(0, LIMIT - count),
      resetAt: Date.now() + (typeof ttl === "number" && ttl > 0 ? ttl : WINDOW_SECONDS) * 1000,
    };
  } catch {
    // Never block a real message because the limiter is unreachable.
    return null;
  }
}

function checkMemory(key: string): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + WINDOW_SECONDS * 1000;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: LIMIT - 1, resetAt };
  }

  existing.count += 1;
  return {
    ok: existing.count <= LIMIT,
    remaining: Math.max(0, LIMIT - existing.count),
    resetAt: existing.resetAt,
  };
}

export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const viaRedis = await checkUpstash(key);
  if (viaRedis) return viaRedis;

  // Prune expired buckets so the map cannot grow without bound.
  if (buckets.size > 500) {
    const now = Date.now();
    for (const [bucketKey, bucket] of buckets) {
      if (bucket.resetAt <= now) buckets.delete(bucketKey);
    }
  }

  return checkMemory(key);
}

export const rateLimitPolicy = { limit: LIMIT, windowSeconds: WINDOW_SECONDS };
