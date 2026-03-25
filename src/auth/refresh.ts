export async function refreshAccessToken(refreshToken: string): Promise<string | null> {
    const stored = await redis.get(`refresh:${refreshToken}`);
    if (!stored) return null;

    const newToken = jwt.sign({ userId: stored.userId, role: stored.role }, process.env.JWT_SECRET!, {
      expiresIn: '15m',
    });
    return newToken;
  }
