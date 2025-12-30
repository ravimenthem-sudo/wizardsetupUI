-- Fix the profiles table foreign key constraint issue
-- This allows profiles to have NULL team_id or reference projects instead of teams

-- Drop the foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS fk_profiles_team;

-- Make team_id nullable (if it isn't already)
ALTER TABLE profiles ALTER COLUMN team_id DROP NOT NULL;

-- Optionally, you can add a new foreign key to projects table instead
-- Uncomment the line below if you want team_id to reference projects
-- ALTER TABLE profiles ADD CONSTRAINT fk_profiles_project FOREIGN KEY (team_id) REFERENCES projects(id) ON DELETE SET NULL;
