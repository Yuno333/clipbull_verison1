import { Router } from 'express';
import { authMiddleware, requireRole } from '../middleware/authMiddleware';

const router = Router();
const normalizeRole = (role?: string) => (role === 'clipper' ? 'earner' : role);

/**
 * Handle Admin Login
 * Moves logic from lib/admin-actions.ts to Express
 */
router.post('/admin/login', (req, res) => {
  const { email, password } = req.body;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (email === adminEmail && password === adminPassword) {
    res.cookie('tukka_admin_session', 'verified', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    });
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false, error: 'Invalid admin credentials' });
});

/**
 * Handle Admin Logout
 */
router.post('/admin/logout', (req, res) => {
  res.clearCookie('tukka_admin_session');
  return res.json({ success: true });
});

/**
 * Get current session status
 * Used by frontend to determine role and auth status
 */
router.get('/status', authMiddleware, (req, res) => {
  const user = (req as any).user;
  const adminSession = (req as any).adminSession;

  if (adminSession === 'verified') {
    return res.json({ authenticated: true, role: 'admin' });
  }

  if (user) {
    const role = normalizeRole((req as any).profile?.role || user.app_metadata?.role || user.user_metadata?.role) || 'creator';
    return res.json({ 
      authenticated: true, 
      role, 
      user,
      profile: (req as any).profile 
    });
  }

  return res.json({ authenticated: false });
});

/**
 * Example protected route for testing
 */
router.get('/protected/creator', authMiddleware, requireRole(['creator']), (req, res) => {
  res.json({ message: 'Welcome Creator!' });
});

export default router;
