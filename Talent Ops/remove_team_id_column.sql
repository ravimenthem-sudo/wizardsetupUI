-- Complete removal of team_id from profiles table
-- This commits fully to the project_members architecture

-- Step 1: Drop the foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS fk_profiles_team;

-- Step 2: Remove the team_id column entirely
ALTER TABLE profiles DROP COLUMN IF EXISTS team_id;

-- Done! Now all project assignments are managed via project_members table
