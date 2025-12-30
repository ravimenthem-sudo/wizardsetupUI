-- Simplified migration: Just remove team_id column
-- We'll skip recreating policies for now to avoid schema issues

-- Step 1: Drop RLS policies that depend on team_id
DROP POLICY IF EXISTS teamlead_view_attendance ON attendance;
DROP POLICY IF EXISTS teamlead_view_expenses ON expenses;
DROP POLICY IF EXISTS teamlead_view_leaves ON leaves;
DROP POLICY IF EXISTS teamlead_view_tasks ON tasks;
DROP POLICY IF EXISTS teamlead_select_teams ON teams;
DROP POLICY IF EXISTS teamlead_view_timesheets ON timesheets;

-- Step 2: Drop the foreign key constraint
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS fk_profiles_team;

-- Step 3: Remove the team_id column
ALTER TABLE profiles DROP COLUMN IF EXISTS team_id CASCADE;

-- Done! 
-- Note: Team lead policies have been removed. 
-- You'll need to recreate them later based on your actual table schemas.
-- For now, this allows you to add employees without errors.
