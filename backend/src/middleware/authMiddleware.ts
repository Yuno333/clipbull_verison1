import { Request, Response, NextFunction } from 'express';
import { createClient } from '@supabase/supabase-js';
import { db } from '../db';
import { profiles } from '../db/schema';
import { eq } from 'drizzle-orm';
import dotenv from 'dotenv';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

/**
 * Middleware to verify Supabase session and Admin session
 * This ports logic from the Next.js middleware.ts
 */
export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.cookies['sb-access-token'] || req.headers['authorization']?.split(' ')[1];
  const adminSession = req.cookies['tukka_admin_session'];

  // Check Supabase session if token exists
  let user = null;
  let profile = null;

  if (accessToken) {
    const { data: { user: supabaseUser } } = await supabase.auth.getUser(accessToken);
    user = supabaseUser;

    if (user) {
      // Fetch profile from DB using Drizzle
      const [userProfile] = await db.select().from(profiles).where(eq(profiles.id, user.id));
      profile = userProfile;
    }
  }

  // Attach user identity and profile to request
  (req as any).user = user;
  (req as any).profile = profile;
  (req as any).adminSession = adminSession;

  next();
};

/**
 * Higher-order middleware to enforce specific roles
 */
export const requireRole = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    const profile = (req as any).profile;
    const adminSession = (req as any).adminSession;

    // Admin override (either cookie or DB role)
    if (adminSession === 'verified' || profile?.role === 'admin' || user?.app_metadata?.role === 'admin') {
      return next();
    }

    if (!user || !profile) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!allowedRoles.includes(profile.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }

    next();
  };
};
