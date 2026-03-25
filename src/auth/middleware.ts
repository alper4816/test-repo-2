  export function validateToken(token: string): { userId: string; role: string } | null {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string; role: string };
      return decoded;
    } catch {
      return null;
    }
  }

  export function requireAuth(req: Request): Response | null {
    const header = req.headers.get('Authorization');
    if (!header?.startsWith('Bearer ')) {
      return new Response('Unauthorized', { status: 401 });
    }
    const payload = validateToken(header.slice(7));
    if (!payload) {
      return new Response('Invalid token', { status: 403 });
    }
    return null;
  }
