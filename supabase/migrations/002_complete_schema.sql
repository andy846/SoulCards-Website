-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.users (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    display_name TEXT,
    avatar_url TEXT,
    subscription_status TEXT DEFAULT 'free' CHECK (subscription_status IN ('free', 'premium', 'trial')),
    stripe_customer_id TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'trialing')),
    current_period_start TIMESTAMP WITH TIME ZONE,
    current_period_end TIMESTAMP WITH TIME ZONE,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Reading history table
CREATE TABLE IF NOT EXISTS public.reading_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
    reading_type TEXT NOT NULL CHECK (reading_type IN ('daily', 'love', 'career', 'custom')),
    question TEXT,
    cards_drawn JSONB NOT NULL,
    interpretation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User preferences table
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    daily_reminder_enabled BOOLEAN DEFAULT TRUE,
    special_event_notifications BOOLEAN DEFAULT TRUE,
    dark_mode BOOLEAN DEFAULT FALSE,
    animations_enabled BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Daily reading limits table
CREATE TABLE IF NOT EXISTS public.daily_reading_limits (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    date DATE DEFAULT CURRENT_DATE,
    readings_used INTEGER DEFAULT 0,
    daily_limit INTEGER DEFAULT 3,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, date)
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reading_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_reading_limits ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can view own profile" ON public.users;
CREATE POLICY "Users can view own profile" ON public.users FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.users;
CREATE POLICY "Users can update own profile" ON public.users FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.users;
CREATE POLICY "Users can insert own profile" ON public.users FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for subscriptions table
DROP POLICY IF EXISTS "Users can view own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can view own subscriptions" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can insert own subscriptions" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own subscriptions" ON public.subscriptions;
CREATE POLICY "Users can update own subscriptions" ON public.subscriptions FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for reading_history table
DROP POLICY IF EXISTS "Users can view own reading history" ON public.reading_history;
CREATE POLICY "Users can view own reading history" ON public.reading_history FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reading history" ON public.reading_history;
CREATE POLICY "Users can insert own reading history" ON public.reading_history FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reading history" ON public.reading_history;
CREATE POLICY "Users can update own reading history" ON public.reading_history FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own reading history" ON public.reading_history;
CREATE POLICY "Users can delete own reading history" ON public.reading_history FOR DELETE USING (auth.uid() = user_id);

-- RLS Policies for user_preferences table
DROP POLICY IF EXISTS "Users can view own preferences" ON public.user_preferences;
CREATE POLICY "Users can view own preferences" ON public.user_preferences FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own preferences" ON public.user_preferences;
CREATE POLICY "Users can insert own preferences" ON public.user_preferences FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own preferences" ON public.user_preferences;
CREATE POLICY "Users can update own preferences" ON public.user_preferences FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for daily_reading_limits table
DROP POLICY IF EXISTS "Users can view own reading limits" ON public.daily_reading_limits;
CREATE POLICY "Users can view own reading limits" ON public.daily_reading_limits FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own reading limits" ON public.daily_reading_limits;
CREATE POLICY "Users can insert own reading limits" ON public.daily_reading_limits FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own reading limits" ON public.daily_reading_limits;
CREATE POLICY "Users can update own reading limits" ON public.daily_reading_limits FOR UPDATE USING (auth.uid() = user_id);

-- Grant permissions to authenticated users
GRANT ALL PRIVILEGES ON public.users TO authenticated;
GRANT ALL PRIVILEGES ON public.subscriptions TO authenticated;
GRANT ALL PRIVILEGES ON public.reading_history TO authenticated;
GRANT ALL PRIVILEGES ON public.user_preferences TO authenticated;
GRANT ALL PRIVILEGES ON public.daily_reading_limits TO authenticated;

-- Grant read permissions to anonymous users
GRANT SELECT ON public.users TO anon;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON public.subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_user_id ON public.reading_history(user_id);
CREATE INDEX IF NOT EXISTS idx_reading_history_created_at ON public.reading_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON public.user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_reading_limits_user_date ON public.daily_reading_limits(user_id, date);

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.users (id, email, display_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name')
    ON CONFLICT (id) DO NOTHING;
    
    -- Create default user preferences
    INSERT INTO public.user_preferences (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id) DO NOTHING;
    
    -- Create initial daily reading limit
    INSERT INTO public.daily_reading_limits (user_id)
    VALUES (NEW.id)
    ON CONFLICT (user_id, date) DO NOTHING;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Trigger to call the function when a new user signs up
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop existing triggers if they exist
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
DROP TRIGGER IF EXISTS update_subscriptions_updated_at ON public.subscriptions;
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON public.user_preferences;
DROP TRIGGER IF EXISTS update_daily_reading_limits_updated_at ON public.daily_reading_limits;

-- Triggers for updated_at columns
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at
    BEFORE UPDATE ON public.subscriptions
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_user_preferences_updated_at
    BEFORE UPDATE ON public.user_preferences
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_daily_reading_limits_updated_at
    BEFORE UPDATE ON public.daily_reading_limits
    FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
