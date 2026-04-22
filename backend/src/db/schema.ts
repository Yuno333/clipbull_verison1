import { pgTable, uuid, text, timestamp, numeric, integer, pgSchema, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

// Define the 'auth' schema for Supabase Auth interop
export const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
  id: uuid('id').primaryKey().notNull(),
});

// 1. Profiles Table
export const profiles = pgTable('profiles', {
  id: uuid('id').primaryKey().references(() => users.id, { onDelete: 'cascade' }).notNull(),
  username: text('username').unique().notNull(),
  role: text('role', { enum: ['creator', 'earner', 'admin'] }).notNull(),
  status: text('status', { enum: ['active', 'pending', 'suspended'] }).default('active').notNull(),
  avatarUrl: text('avatar_url'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
});

// 2. Campaigns Table
export const campaigns = pgTable('campaigns', {
  id: uuid('id').defaultRandom().primaryKey(),
  creatorId: uuid('creator_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  title: text('title').notNull(),
  niche: text('niche').notNull(),
  contentLink: text('content_link').notNull(),
  description: text('description').notNull(),
  cpm: numeric('cpm').default('0').notNull(),
  budget: numeric('budget').default('0').notNull(),
  spent: numeric('spent').default('0').notNull(),
  status: text('status', { enum: ['pending', 'active', 'paused', 'completed', 'rejected'] }).default('pending').notNull(),
  maxClippers: integer('max_clippers'),
  maxPayoutPerClipper: numeric('max_payout_per_clipper'),
  impressions: integer('impressions').default(0).notNull(),
  durationDays: integer('duration_days'),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
});

// 3. Accepted Offers
export const acceptedOffers = pgTable('accepted_offers', {
  id: uuid('id').defaultRandom().primaryKey(),
  clipperId: uuid('clipper_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  campaignId: uuid('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }).notNull(),
  status: text('status', { enum: ['active', 'completed', 'abandoned'] }).default('active').notNull(),
  joinedAt: timestamp('joined_at', { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
}, (t) => ({
  unq: sql`unique(${t.clipperId}, ${t.campaignId})`
}));

// 4. Clip Submissions
export const clipSubmissions = pgTable('clip_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  clipperId: uuid('clipper_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  campaignId: uuid('campaign_id').references(() => campaigns.id, { onDelete: 'cascade' }).notNull(),
  postLink: text('post_link').notNull(),
  platform: text('platform').notNull(),
  impressions: integer('impressions').default(0).notNull(),
  earnings: numeric('earnings').default('0').notNull(),
  status: text('status', { enum: ['pending', 'approved', 'rejected'] }).default('pending').notNull(),
  submittedAt: timestamp('submitted_at', { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
});

// 5. Transactions
export const transactions = pgTable('transactions', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').references(() => profiles.id, { onDelete: 'cascade' }).notNull(),
  type: text('type', { enum: ['deposit', 'withdrawal', 'escrow_release', 'refund', 'payout'] }).notNull(),
  amount: numeric('amount').notNull(),
  status: text('status', { enum: ['pending', 'completed', 'failed'] }).default('pending').notNull(),
  description: text('description').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
});
