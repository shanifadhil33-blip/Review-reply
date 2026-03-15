-- ============================================
-- 001_initial_schema.sql
-- ============================================

-- Users (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  stripe_customer_id TEXT UNIQUE,
  subscription_status TEXT DEFAULT 'trialing' CHECK (subscription_status IN ('trialing', 'active', 'canceled', 'paused', 'past_due')),
  trial_ends_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Google connected accounts
CREATE TABLE public.google_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  google_account_id TEXT NOT NULL,           -- Google My Business account ID
  google_email TEXT,
  access_token_encrypted TEXT NOT NULL,       -- Encrypted with app-level key
  refresh_token_encrypted TEXT NOT NULL,
  token_expires_at TIMESTAMPTZ,
  pubsub_configured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, google_account_id)
);

-- Business locations
CREATE TABLE public.locations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  google_account_id UUID NOT NULL REFERENCES public.google_accounts(id) ON DELETE CASCADE,
  google_location_id TEXT NOT NULL,           -- e.g., "locations/123456"
  name TEXT NOT NULL,
  address TEXT,
  phone TEXT,
  auto_reply_enabled BOOLEAN DEFAULT TRUE,
  -- Per-location brand voice overrides (nullable = use account defaults)
  tone_override TEXT,
  offers_override TEXT,
  example_replies_override JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(google_account_id, google_location_id)
);

-- Brand voice settings (per user, account-level defaults)
CREATE TABLE public.brand_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  brand_name TEXT NOT NULL,
  tone TEXT DEFAULT 'Professional & warm',           -- Dropdown value
  tone_custom TEXT,                                   -- Custom tone instructions
  resolution_offers TEXT,                             -- e.g., "We always offer a complimentary revisit"
  example_replies JSONB DEFAULT '[]'::JSONB,          -- Array of {review, reply} examples
  negative_review_email TEXT,                         -- e.g., "support@brand.com"
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)  -- One brand setting per user for MVP
);

-- Reviews (synced from Google)
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  location_id UUID NOT NULL REFERENCES public.locations(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  google_review_id TEXT NOT NULL,
  reviewer_name TEXT,
  reviewer_photo_url TEXT,
  star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
  review_text TEXT,
  review_created_at TIMESTAMPTZ,
  -- Reply info
  reply_text TEXT,
  reply_posted_at TIMESTAMPTZ,
  reply_status TEXT DEFAULT 'pending' CHECK (reply_status IN ('pending', 'generating', 'posted', 'failed', 'deleted', 'skipped')),
  reply_error TEXT,
  llm_model TEXT,                            -- Which model generated the reply
  llm_cost_usd NUMERIC(10, 6),              -- Cost tracking
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(location_id, google_review_id)
);

-- Indexes
CREATE INDEX idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX idx_reviews_location_id ON public.reviews(location_id);
CREATE INDEX idx_reviews_status ON public.reviews(reply_status);
CREATE INDEX idx_reviews_created ON public.reviews(review_created_at DESC);
CREATE INDEX idx_locations_user_id ON public.locations(user_id);
CREATE INDEX idx_google_accounts_user_id ON public.google_accounts(user_id);
