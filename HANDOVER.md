# ReviewReply – Project Handover for Claude Code

## Project Overview
ReviewReply is a Next.js 16 SaaS application that automatically replies to Google Business Profile reviews using AI. It connects to Google Business Profiles via OAuth, listens for new reviews via Pub/Sub, generates contextual replies using an LLM (Ollama), and posts them back to Google.

**Project Root:** `c:\Users\SMART ZONE\OneDrive\Documents\Reviewreply`

---

## Tech Stack
| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI | Tailwind CSS v4, shadcn/ui (Base UI), Lucide React |
| Auth | Supabase Auth (email/password + Google OAuth) |
| Database | Supabase (PostgreSQL) |
| Google APIs | googleapis (Business Profile, Pub/Sub) |
| LLM | Ollama (local) |
| Notifications | Sonner (toast) |

---

## How to Run
```bash
cd "c:\Users\SMART ZONE\OneDrive\Documents\Reviewreply"
npm run dev
```
Dev server runs on `http://localhost:3000`.

---

## Critical Issues to Fix First

### 1. Duplicate Dashboard Directories (HIGHEST PRIORITY)
Both `src/app/(dashboard)/` and `src/app/dashboard/` exist. The `(dashboard)` folder is the **original active one** (route group — routes don't include `/dashboard` in URL). The `dashboard/` folder is a **copy** we made to try to fix a 404 issue.

**The core problem:** The middleware at `src/lib/supabase/middleware.ts` protects paths starting with `/dashboard`, and auth actions (`src/app/(auth)/actions.ts`) redirect to `/dashboard` after login. But since `(dashboard)` is a route group, its pages are served at `/`, `/locations`, `/reviews`, etc. — NOT at `/dashboard/...`. This creates a 404.

**Fix options (pick one):**
- **Option A (recommended):** Delete `src/app/dashboard/` (the copy). Then rename `src/app/(dashboard)/` to `src/app/dashboard/` so routes are served at `/dashboard`, `/dashboard/locations`, etc. Update ALL internal links in `layout.tsx` from `/locations` → `/dashboard/locations`, `/reviews` → `/dashboard/reviews`, etc.
- **Option B:** Keep `(dashboard)` as route group. Update middleware to protect `/locations`, `/reviews`, `/analytics`, `/settings`, `/onboarding` individually. Update auth redirects to go to `/locations` instead of `/dashboard`.

### 2. ESLint Errors (21 errors, 7 warnings)
Run `npm run lint` to see them. Main categories:
- `react/no-unescaped-entities` — unescaped `'` and `"` in JSX text (in locations, onboarding, reviews pages)
- `@typescript-eslint/no-explicit-any` — `any` types in `pubsub/route.ts`, `business-profile.ts`, `notifications.ts`, `reply.ts`, `generate-reply.ts`
- `@typescript-eslint/no-unused-vars` — unused imports/vars in `actions.ts`, `locations/page.tsx`, `google/route.ts`, `notifications.ts`, `reply.ts`, `middleware.ts`

### 3. Missing Root Middleware Location
The root `middleware.ts` is at `c:\Users\SMART ZONE\OneDrive\Documents\Reviewreply\middleware.ts` — it should be at `src/middleware.ts` for Next.js App Router. Verify this is being picked up correctly.

---

## Environment Variables
All credentials are in `.env.local`. The file contains:

| Variable | Status |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | ✅ Set |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | ✅ Set |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Set |
| `GOOGLE_CLIENT_ID` | ✅ Set |
| `GOOGLE_CLIENT_SECRET` | ✅ Set |
| `GOOGLE_REDIRECT_URI` | ✅ Set (`http://localhost:3000/api/auth/google/callback`) |
| `GOOGLE_CLOUD_PROJECT_ID` | ✅ Set |
| `TOKEN_ENCRYPTION_KEY` | ⚠️ Placeholder (needs real key for production) |
| `STRIPE_*` | ❌ Placeholder values |
| `OLLAMA_BASE_URL` | ✅ Set (`http://localhost:11434`) |

> [!CAUTION]
> Do NOT commit `.env.local` to git. It contains real Supabase and Google secrets.

---

## Directory Structure
```
src/
├── app/
│   ├── (auth)/              # Route group: /login, /signup
│   │   ├── login/page.tsx
│   │   ├── signup/page.tsx
│   │   ├── actions.ts       # login, signup, loginWithGoogle, logout
│   │   └── layout.tsx       # Light bg auth layout
│   ├── (dashboard)/         # Route group (ORIGINAL) — serves at root paths
│   │   ├── analytics/
│   │   ├── locations/
│   │   ├── onboarding/
│   │   ├── reviews/
│   │   ├── settings/
│   │   ├── layout.tsx       # Sidebar + mobile sheet nav
│   │   └── page.tsx         # Redirects to /locations
│   ├── dashboard/           # DUPLICATE — DELETE THIS
│   ├── api/
│   │   ├── auth/callback/   # Supabase OAuth callback
│   │   ├── auth/google/     # GBP OAuth flow
│   │   ├── cron/poll-reviews/
│   │   └── webhooks/pubsub/
│   ├── globals.css           # Light theme CSS vars
│   ├── layout.tsx            # Root layout (Inter font, Toaster)
│   └── page.tsx              # Landing page
├── components/ui/            # shadcn/ui components + custom TiltCard
├── lib/
│   ├── google/               # GBP API wrappers
│   ├── llm/                  # Ollama reply generation
│   ├── supabase/             # Client, server, middleware helpers
│   └── utils/                # Encryption, rate limiting, logger
└── middleware.ts (at project root)
```

---

## Key Files Reference

| File | Purpose |
|---|---|
| `src/app/page.tsx` | Landing page with glassmorphism cards, 3D tilt effects, spilled review cards |
| `src/components/ui/tilt-card.tsx` | Custom `"use client"` component for 3D mouse-tracking tilt effect |
| `src/lib/supabase/middleware.ts` | Auth session refresh + route protection logic |
| `src/app/(auth)/actions.ts` | Server actions for login/signup/Google OAuth/logout |
| `src/app/api/webhooks/pubsub/route.ts` | Main review processing pipeline |
| `src/lib/llm/generate-reply.ts` | LLM prompt engineering for review replies |

---

## Supabase Configuration
- **Project URL:** `https://monjkcaxiotcydnodajf.supabase.co`
- **Google OAuth** is enabled in the Supabase Auth Providers settings
- **Callback URL** added to Google Cloud Console: `https://monjkcaxiotcydnodajf.supabase.co/auth/v1/callback`

---

## Landing Page Design
The landing page uses a **light SaaS aesthetic** (`bg-[#FAFAFA]`) with two dark glassmorphism card sections:
1. **ROI Stats Card** — 3D tilt effect, three stat cards with white hover lines
2. **Google Reviews CTA Card** — 5 stars, persuasive copy, "Take Control Free" button
3. **Spilled Review Cards** — 3 stacked cards that fan out on hover (BrightPath Dental, CoreBase Fitness, Greenleaf Bistro)
4. **Trusted By Section** — Local chain brand names with colored styling

---

## Commands Reference
```bash
npm run dev      # Start dev server (Turbopack)
npm run build    # Production build
npm run lint     # ESLint check
```
