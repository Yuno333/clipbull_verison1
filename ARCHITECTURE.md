# TUKKA — Project Architecture

> The distribution engine for viral content. Connects creators with earners who repost, amplify, and drive impressions across social platforms.

---

## Table of Contents

1. [Project Structure](#project-structure)
2. [Technology Stack](#technology-stack)
3. [Data Flow & Auth](#data-flow--auth)
4. [Database Schema](#database-schema)
5. [Frontend Architecture](#frontend-architecture)
6. [Backend Architecture](#backend-architecture)
7. [UI/UX Design Principles](#uiux-design-principles)
8. [Deployment Strategy](#deployment-strategy)

---

## Project Structure

```
project/
├── frontend/                  # Next.js (App Router) — UI & client logic
│   ├── src/
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── auth/          # Login, signup, admin auth pages
│   │   │   ├── dashboard/     # Role-based dashboard pages (admin, creator, earner)
│   │   │   ├── layout.tsx     # Root layout — Inter font, dark theme, RefineProvider
│   │   │   ├── page.tsx       # Landing page (Navbar → Hero → Features → HowItWorks → Footer)
│   │   │   └── globals.css    # Global styles & Tailwind v4 tokens
│   │   ├── components/
│   │   │   ├── landing/       # Landing page sections
│   │   │   │   ├── navbar.tsx
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── features.tsx
│   │   │   │   ├── features-grid.tsx
│   │   │   │   ├── feature-evolution.tsx
│   │   │   │   ├── how-it-works.tsx
│   │   │   │   ├── social-proof.tsx
│   │   │   │   ├── trust-safety.tsx
│   │   │   │   ├── vision-stack.tsx
│   │   │   │   └── footer.tsx
│   │   │   ├── dashboard/     # Role-specific sidebars & forms
│   │   │   │   ├── admin-sidebar.tsx
│   │   │   │   ├── creator-sidebar.tsx
│   │   │   │   ├── earner-sidebar.tsx
│   │   │   │   ├── admin-login-form.tsx
│   │   │   │   └── shared/    # Shared dashboard components
│   │   │   └── ui/            # Reusable primitives (button, etc.)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── lib/
│   │   │   ├── supabase/      # Supabase client instances
│   │   │   │   ├── client.ts  # Browser client (createBrowserClient)
│   │   │   │   ├── server.ts  # Server-side client (createServerClient)
│   │   │   │   └── refine-client.ts  # Refine data provider client
│   │   │   ├── providers/     # Refine framework providers
│   │   │   │   ├── refine-provider.tsx        # Top-level Refine wrapper
│   │   │   │   ├── auth-provider.ts           # Supabase-backed auth provider
│   │   │   │   ├── access-control-provider.ts # Role-based access control
│   │   │   │   └── notification-provider.ts   # Toast/notification system
│   │   │   ├── role-context.tsx    # Active role context (creator/earner/admin)
│   │   │   ├── sidebar-context.tsx # Sidebar open/close state
│   │   │   ├── title-context.tsx   # Dynamic page title context
│   │   │   ├── admin-actions.ts    # Admin action helpers
│   │   │   └── utils.ts           # General utilities (cn, etc.)
│   │   └── middleware.ts      # Next.js middleware — route protection via /api/status
│   ├── public/                # Static assets
│   ├── next.config.ts
│   ├── postcss.config.mjs
│   └── tsconfig.json
│
├── backend/                   # Express.js — API & auth server
│   ├── src/
│   │   ├── server.ts          # Express entrypoint (port 4000)
│   │   ├── routes/
│   │   │   └── auth.ts        # Auth routes (/api/admin/login, /api/status, etc.)
│   │   ├── middleware/
│   │   │   └── authMiddleware.ts  # JWT validation & role extraction
│   │   └── db/
│   │       ├── index.ts       # Drizzle client connection
│   │       └── schema.ts      # Drizzle ORM table definitions
│   ├── drizzle/               # Generated Drizzle migration artifacts
│   ├── migrations/            # Raw SQL migrations (run in Supabase SQL Editor)
│   ├── policies/              # RLS policy SQL files
│   ├── functions/             # Supabase Edge Functions (future)
│   ├── seed/                  # Seed data (future)
│   ├── drizzle.config.ts
│   └── tsconfig.json
│
└── ARCHITECTURE.md            # ← You are here
```

---

## Technology Stack

| Layer            | Technology                          | Purpose                                      |
|------------------|-------------------------------------|----------------------------------------------|
| **Frontend**     | Next.js (App Router)                | SSR/SSG pages, file-based routing            |
| **UI Framework** | Refine + Ant Design                 | Admin panels, CRUD, data providers           |
| **Styling**      | Tailwind CSS v4                     | Utility-first CSS, design tokens             |
| **Animation**    | GSAP + Framer Motion                | Timeline animations & component transitions  |
| **Icons**        | Lucide React + Ant Design Icons     | Consistent icon system                       |
| **Backend**      | Express.js                          | REST API, auth middleware, cookie management |
| **ORM**          | Drizzle ORM                         | Type-safe database queries & schema          |
| **Database**     | Supabase (PostgreSQL)               | Hosted Postgres, RLS, Auth, Storage          |
| **Auth**         | Supabase Auth                       | JWT sessions, email/password, OAuth           |
| **Font**         | Inter (Google Fonts via next/font)  | Primary typeface                             |
| **Language**     | TypeScript                          | End-to-end type safety                       |

---

## Data Flow & Auth

```
┌─────────────────────────────────────────────────────────────────────┐
│                         USER (Browser)                              │
│                                                                     │
│  Landing Page ──► Auth Pages ──► Dashboard (role-based)             │
└────────────┬────────────────────────────┬───────────────────────────┘
             │                            │
             │  Auth (login/signup)        │  Protected routes
             ▼                            ▼
┌────────────────────────┐    ┌──────────────────────────────┐
│   Supabase Auth        │    │  Express Backend (:4000)     │
│   (JWT + Cookies)      │    │                              │
│                        │    │  POST /api/admin/login       │
│  • Email/Password      │    │  POST /api/admin/logout      │
│  • Session tokens      │    │  GET  /api/status            │
│  • User metadata       │    │  GET  /api/protected/:role   │
└────────┬───────────────┘    └──────────────┬───────────────┘
         │                                   │
         │  JWT validation                   │  Drizzle queries
         ▼                                   ▼
┌─────────────────────────────────────────────────────────────┐
│                  Supabase PostgreSQL                         │
│                                                             │
│  Tables: profiles, campaigns, accepted_offers,              │
│          clip_submissions, transactions                     │
│                                                             │
│  Security: Row Level Security (RLS) policies                │
└─────────────────────────────────────────────────────────────┘
```

### Auth Flow

1. **User signs up/logs in** → Supabase Auth issues JWT, stored as HTTP-only cookie
2. **Frontend middleware** (`middleware.ts`) calls `GET /api/status` on every protected route
3. **Express auth middleware** validates the JWT via Supabase, extracts user + profile
4. **Role-based redirects** in Next.js middleware route users to correct dashboard
5. **Admin login** uses a separate cookie-based session (`tukka_admin_session`)

### Refine Integration

- `RefineProvider` wraps the entire app, providing data/auth/access-control/notification layers
- `authProvider` connects Refine's auth hooks to Supabase Auth
- `accessControlProvider` enforces role-based UI visibility (creator/earner/admin)
- `dataProvider` uses `@refinedev/supabase` for CRUD operations against the database

---

## Database Schema

### Entity Relationship

```
auth.users (Supabase managed)
    │
    │ 1:1
    ▼
profiles
    │
    ├── 1:N ──► campaigns (creator creates campaigns)
    │               │
    │               ├── 1:N ──► accepted_offers (earners join campaigns)
    │               │
    │               └── 1:N ──► clip_submissions (earners submit clips)
    │
    └── 1:N ──► transactions (deposits, withdrawals, payouts)
```

### Tables

| Table               | Key Columns                                               | Notes                                    |
|---------------------|-----------------------------------------------------------|------------------------------------------|
| `profiles`          | id (FK → auth.users), username, role, status, avatar_url  | Roles: `creator`, `earner`, `admin`     |
| `campaigns`         | creator_id, title, niche, content_link, cpm, budget, spent, status | Statuses: pending → active → completed  |
| `accepted_offers`   | earner_id, campaign_id, status                           | Unique constraint on (earner, campaign) |
| `clip_submissions`  | earner_id, campaign_id, post_link, platform, impressions, earnings | Statuses: pending → approved/rejected   |
| `transactions`      | user_id, type, amount, status, description                | Types: deposit, withdrawal, payout, etc  |

---

## Frontend Architecture

### Routing (App Router)

```
/                      → Landing page (public)
/auth/login            → Login page
/auth/signup           → Signup page
/dashboard/admin       → Admin dashboard (admin-only)
/dashboard/creator     → Creator dashboard
/dashboard/earner      → Earner dashboard
```

### Component Hierarchy

```
RootLayout (layout.tsx)
  └── RefineProvider
        ├── Landing Page (page.tsx)
        │     ├── Navbar
        │     ├── Hero
        │     ├── Features
        │     ├── HowItWorks
        │     └── Footer
        │
        └── Dashboard (per role)
              ├── Sidebar (admin/creator/earner)
              └── Page Content (Refine CRUD)
```

### State Management

| Context              | Purpose                                     |
|----------------------|---------------------------------------------|
| `RoleContext`        | Track active user role across dashboard     |
| `SidebarContext`     | Dashboard sidebar open/collapsed state      |
| `TitleContext`       | Dynamic page title for dashboard header     |

---

## Backend Architecture

### Express Server (`server.ts`)

- Runs on port **4000** (configurable via `PORT` env var)
- CORS configured for `http://localhost:3000` (frontend dev server)
- Uses `cookie-parser` for session cookie handling

### Routes

| Method | Path                    | Auth        | Description                  |
|--------|-------------------------|-------------|------------------------------|
| POST   | `/api/admin/login`      | None        | Admin credential check + cookie |
| POST   | `/api/admin/logout`     | None        | Clear admin session cookie    |
| GET    | `/api/status`           | Middleware  | Return auth state + role      |
| GET    | `/api/protected/:role`  | Middleware  | Protected route example       |
| GET    | `/health`               | None        | Health check                  |

### Middleware Stack

1. **CORS** → Allow frontend origin with credentials
2. **JSON parser** → `express.json()`
3. **Cookie parser** → `cookie-parser`
4. **Auth middleware** → JWT validation via Supabase, profile lookup

---

## UI/UX Design Principles

> **Core philosophy**: Clean, premium, flat 2D design. No 3D elements, no glassmorphism, no gimmicky effects. Focus on **flow**, **positioning**, and **purposeful animation**.

### Layout & Positioning

- **CSS Grid + Flexbox** via Tailwind v4 for all layout — no absolute/fixed hacks for page structure
- **Mobile-first** responsive design — breakpoints flow naturally from `sm` → `md` → `lg` → `xl`
- **Consistent spacing** scale — follow Tailwind's spacing tokens (`gap-4`, `py-16`, `px-6`, etc.)
- **Section rhythm** — each landing page section has clear vertical breathing room (`py-16` to `py-24`)
- **Max-width containers** — content contained within `max-w-7xl` centered containers

### Animation Guidelines

Use animations to guide user attention and create **flow**, not spectacle.

#### GSAP (Complex Timelines)
- **Scroll-triggered reveals** — stagger section elements as they enter viewport
- **Sequence orchestration** — coordinate multiple elements entering in a deliberate order
- **Performance** — use `will-change: transform` and GPU-accelerated properties only (`transform`, `opacity`)

#### Framer Motion (Component Transitions)
- **Page transitions** — smooth fade/slide between route changes
- **Interactive feedback** — hover states, click responses, list reordering
- **Presence animations** — `AnimatePresence` for mount/unmount transitions
- **Layout animations** — `layout` prop for smooth position changes

#### Animation Rules

| ✅ Do                                      | ❌ Don't                                    |
|-------------------------------------------|---------------------------------------------|
| Fade + subtle translateY on scroll entry  | 3D rotations, perspective transforms        |
| Stagger children with 50-100ms delay      | Parallax layering or depth effects          |
| Ease curves: `easeOut`, `easeInOut`       | Bounce or elastic easing on content         |
| Duration: 300-600ms for reveals           | Long animations (>1s) that block content    |
| Hover scale: `1.02` - `1.05` max         | Heavy glow, blur, or shadow animations      |
| Opacity transitions on state change       | Continuous looping animations (except loaders) |

### Color & Theme

- **Base**: Dark theme — `#0a0a0a` background, white text
- **Font**: Inter (Google Fonts) — clean sans-serif
- **Utility**: Use Tailwind v4 CSS custom properties for design tokens
- **Contrast**: Ensure WCAG AA contrast ratios on all text

### Component Design

- **Flat, clean surfaces** — solid backgrounds, subtle borders (`border-white/10`)
- **Minimal shadows** — only for elevation cues (dropdowns, modals), not decorative
- **Consistent radius** — follow a single border-radius scale (`rounded-lg`, `rounded-xl`)
- **Icon usage** — Lucide React for landing page, Ant Design Icons for dashboard

---

## Deployment Strategy

| Service       | Platform       | Purpose                                    |
|---------------|----------------|--------------------------------------------|
| **Frontend**  | Vercel         | Next.js hosting, edge SSR, CDN             |
| **Backend**   | Railway        | Express.js API server, persistent process  |
| **Database**  | Supabase       | PostgreSQL, Auth, RLS, Storage             |

### Environment Variables

#### Frontend (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=<supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<supabase-anon-key>
```

#### Backend (Railway)
```
SUPABASE_URL=<supabase-project-url>
SUPABASE_SERVICE_ROLE_KEY=<supabase-service-role-key>
ADMIN_EMAIL=<admin-login-email>
ADMIN_PASSWORD=<admin-login-password>
DATABASE_URL=<supabase-postgres-connection-string>
PORT=4000
```

### Deployment Flow

```
Git Push → Vercel (frontend auto-deploy)
         → Railway (backend auto-deploy)

Supabase Dashboard → SQL Editor (run migrations)
                   → Auth settings (configure providers)
                   → RLS policies (security rules)
```

---

## Quick Start (Local Development)

```bash
# 1. Frontend
cd frontend
cp .env.example .env        # Fill in Supabase credentials
npm install
npm run dev                  # → http://localhost:3000

# 2. Backend
cd backend
cp .env.example .env         # Fill in Supabase + admin credentials
npm install
npm run dev                  # → http://localhost:4000

# 3. Database
# Run migrations in Supabase SQL Editor (migrations/ folder, in order)
# Apply RLS policies (policies/ folder)
```
