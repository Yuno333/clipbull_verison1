"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transactions = exports.clipSubmissions = exports.acceptedOffers = exports.campaigns = exports.profiles = exports.users = exports.authSchema = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_orm_1 = require("drizzle-orm");
// Define the 'auth' schema for Supabase Auth interop
exports.authSchema = (0, pg_core_1.pgSchema)('auth');
exports.users = exports.authSchema.table('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().notNull(),
});
// 1. Profiles Table
exports.profiles = (0, pg_core_1.pgTable)('profiles', {
    id: (0, pg_core_1.uuid)('id').primaryKey().references(() => exports.users.id, { onDelete: 'cascade' }).notNull(),
    username: (0, pg_core_1.text)('username').unique().notNull(),
    role: (0, pg_core_1.text)('role', { enum: ['creator', 'earner', 'admin'] }).notNull(),
    status: (0, pg_core_1.text)('status', { enum: ['active', 'pending', 'suspended'] }).default('active').notNull(),
    avatarUrl: (0, pg_core_1.text)('avatar_url'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true, mode: 'string' }).default((0, drizzle_orm_1.sql) `timezone('utc'::text, now())`).notNull(),
});
// 2. Campaigns Table
exports.campaigns = (0, pg_core_1.pgTable)('campaigns', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    creatorId: (0, pg_core_1.uuid)('creator_id').references(() => exports.profiles.id, { onDelete: 'cascade' }).notNull(),
    title: (0, pg_core_1.text)('title').notNull(),
    niche: (0, pg_core_1.text)('niche').notNull(),
    contentLink: (0, pg_core_1.text)('content_link').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    cpm: (0, pg_core_1.numeric)('cpm').default('0').notNull(),
    budget: (0, pg_core_1.numeric)('budget').default('0').notNull(),
    spent: (0, pg_core_1.numeric)('spent').default('0').notNull(),
    status: (0, pg_core_1.text)('status', { enum: ['pending', 'active', 'paused', 'completed', 'rejected'] }).default('pending').notNull(),
    maxClippers: (0, pg_core_1.integer)('max_clippers'),
    maxPayoutPerClipper: (0, pg_core_1.numeric)('max_payout_per_clipper'),
    impressions: (0, pg_core_1.integer)('impressions').default(0).notNull(),
    durationDays: (0, pg_core_1.integer)('duration_days'),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true, mode: 'string' }).default((0, drizzle_orm_1.sql) `timezone('utc'::text, now())`).notNull(),
});
// 3. Accepted Offers
exports.acceptedOffers = (0, pg_core_1.pgTable)('accepted_offers', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    clipperId: (0, pg_core_1.uuid)('clipper_id').references(() => exports.profiles.id, { onDelete: 'cascade' }).notNull(),
    campaignId: (0, pg_core_1.uuid)('campaign_id').references(() => exports.campaigns.id, { onDelete: 'cascade' }).notNull(),
    status: (0, pg_core_1.text)('status', { enum: ['active', 'completed', 'abandoned'] }).default('active').notNull(),
    joinedAt: (0, pg_core_1.timestamp)('joined_at', { withTimezone: true, mode: 'string' }).default((0, drizzle_orm_1.sql) `timezone('utc'::text, now())`).notNull(),
}, (t) => ({
    unq: (0, drizzle_orm_1.sql) `unique(${t.clipperId}, ${t.campaignId})`
}));
// 4. Clip Submissions
exports.clipSubmissions = (0, pg_core_1.pgTable)('clip_submissions', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    clipperId: (0, pg_core_1.uuid)('clipper_id').references(() => exports.profiles.id, { onDelete: 'cascade' }).notNull(),
    campaignId: (0, pg_core_1.uuid)('campaign_id').references(() => exports.campaigns.id, { onDelete: 'cascade' }).notNull(),
    postLink: (0, pg_core_1.text)('post_link').notNull(),
    platform: (0, pg_core_1.text)('platform').notNull(),
    impressions: (0, pg_core_1.integer)('impressions').default(0).notNull(),
    earnings: (0, pg_core_1.numeric)('earnings').default('0').notNull(),
    status: (0, pg_core_1.text)('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending').notNull(),
    submittedAt: (0, pg_core_1.timestamp)('submitted_at', { withTimezone: true, mode: 'string' }).default((0, drizzle_orm_1.sql) `timezone('utc'::text, now())`).notNull(),
});
// 5. Transactions
exports.transactions = (0, pg_core_1.pgTable)('transactions', {
    id: (0, pg_core_1.uuid)('id').defaultRandom().primaryKey(),
    userId: (0, pg_core_1.uuid)('user_id').references(() => exports.profiles.id, { onDelete: 'cascade' }).notNull(),
    type: (0, pg_core_1.text)('type', { enum: ['deposit', 'withdrawal', 'escrow_release', 'refund', 'payout'] }).notNull(),
    amount: (0, pg_core_1.numeric)('amount').notNull(),
    status: (0, pg_core_1.text)('status', { enum: ['pending', 'completed', 'failed'] }).default('pending').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    createdAt: (0, pg_core_1.timestamp)('created_at', { withTimezone: true, mode: 'string' }).default((0, drizzle_orm_1.sql) `timezone('utc'::text, now())`).notNull(),
});
