# TUKKA — Backend

This directory contains all server-side assets for the TUKKA platform.

## Structure

```
backend/
├── migrations/          # Supabase database migrations (run in order)
│   └── 001_initial_schema.sql
├── policies/            # Row Level Security (RLS) policies
│   └── admin_rls.sql
├── functions/           # Supabase Edge Functions (future)
└── seed/                # Seed data for development (future)
```

## Running Migrations

1. Go to your Supabase Dashboard → SQL Editor
2. Run migration files in numerical order (001, 002, etc.)
3. Verify tables were created under the `public` schema

## RLS Policies

Admin RLS policies are in `policies/admin_rls.sql`. Run these after the initial schema migration.

## Environment Variables

Required for the frontend:
- `NEXT_PUBLIC_SUPABASE_URL` — Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Your Supabase anon/public key
- `ADMIN_EMAIL` — Admin login email
- `ADMIN_PASSWORD` — Admin login password
