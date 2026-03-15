-- ============================================
-- 002_rls_policies.sql
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Profiles: users can only see/edit their own
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Google accounts: users can only see their own
CREATE POLICY "Users can view own google accounts" ON public.google_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own google accounts" ON public.google_accounts FOR ALL USING (auth.uid() = user_id);

-- Locations: users can only see their own
CREATE POLICY "Users can view own locations" ON public.locations FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own locations" ON public.locations FOR ALL USING (auth.uid() = user_id);

-- Brand settings: users can only see/edit their own
CREATE POLICY "Users can view own brand settings" ON public.brand_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own brand settings" ON public.brand_settings FOR ALL USING (auth.uid() = user_id);

-- Reviews: users can only see their own
CREATE POLICY "Users can view own reviews" ON public.reviews FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can manage own reviews" ON public.reviews FOR ALL USING (auth.uid() = user_id);
