-- Create a dummy organization
INSERT INTO public.orgs (id, name, created_at)
VALUES 
    ('00000000-0000-0000-0000-000000000001', 'Demo Corp', now())
ON CONFLICT (id) DO NOTHING;

-- Note: You might need to link this org to your authenticated user.
-- If you are logged in, check your user ID in Supabase Auth tables.
-- You can manually update your profile or org link tables if they exist.

-- Example: If you have a profiles table
-- INSERT INTO public.profiles (id, org_id) VALUES ('YOUR_USER_ID_HERE', '00000000-0000-0000-0000-000000000001');
