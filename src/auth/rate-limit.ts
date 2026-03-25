const attempts = new Map<string, { count: number; resetAt: number }>();

  export function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const entry = attempts.get(ip);
    if (!entry || now > entry.resetAt) {
      attempts.set(ip, { count: 1, resetAt: now + 60_000 });
      return true;
    }
    entry.count++;
    return entry.count <= 10;
  }
