"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
const normalizeRole = (role) => (role === 'clipper' ? 'earner' : role);
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
router.get('/status', authMiddleware_1.authMiddleware, (req, res) => {
    const user = req.user;
    const adminSession = req.adminSession;
    if (adminSession === 'verified') {
        return res.json({ authenticated: true, role: 'admin' });
    }
    if (user) {
        const role = normalizeRole(req.profile?.role || user.app_metadata?.role || user.user_metadata?.role) || 'creator';
        return res.json({
            authenticated: true,
            role,
            user,
            profile: req.profile
        });
    }
    return res.json({ authenticated: false });
});
/**
 * Example protected route for testing
 */
router.get('/protected/creator', authMiddleware_1.authMiddleware, (0, authMiddleware_1.requireRole)(['creator']), (req, res) => {
    res.json({ message: 'Welcome Creator!' });
});
exports.default = router;
