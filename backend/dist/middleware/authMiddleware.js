"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireRole = exports.authMiddleware = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const db_1 = require("../db");
const schema_1 = require("../db/schema");
const drizzle_orm_1 = require("drizzle-orm");
const supabase = (0, supabase_js_1.createClient)(process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY);
/**
 * Middleware to verify Supabase session and Admin session
 * This ports logic from the Next.js middleware.ts
 */
const authMiddleware = async (req, res, next) => {
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
            const [userProfile] = await db_1.db.select().from(schema_1.profiles).where((0, drizzle_orm_1.eq)(schema_1.profiles.id, user.id));
            profile = userProfile;
        }
    }
    // Attach user identity and profile to request
    req.user = user;
    req.profile = profile;
    req.adminSession = adminSession;
    next();
};
exports.authMiddleware = authMiddleware;
/**
 * Higher-order middleware to enforce specific roles
 */
const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        const user = req.user;
        const profile = req.profile;
        const adminSession = req.adminSession;
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
exports.requireRole = requireRole;
