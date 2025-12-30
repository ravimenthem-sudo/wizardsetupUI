-- Complete migration script to remove team_id column
-- This handles all dependencies including RLS policies

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

-- Step 4: Recreate RLS policies using project_members instead
-- These policies will now check if the user is a member of the project

-- Policy for attendance: Team leads can view attendance of their project members
CREATE POLICY teamlead_view_attendance ON attendance
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm1
        INNER JOIN project_members pm2 ON pm1.project_id = pm2.project_id
        WHERE pm1.user_id = auth.uid()
        AND pm1.role = 'team_lead'
        AND pm2.user_id = attendance.user_id
    )
);

-- Policy for expenses: Team leads can view expenses of their project members
CREATE POLICY teamlead_view_expenses ON expenses
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm1
        INNER JOIN project_members pm2 ON pm1.project_id = pm2.project_id
        WHERE pm1.user_id = auth.uid()
        AND pm1.role = 'team_lead'
        AND pm2.user_id = expenses.employee_id
    )
);

-- Policy for leaves: Team leads can view leaves of their project members
CREATE POLICY teamlead_view_leaves ON leaves
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm1
        INNER JOIN project_members pm2 ON pm1.project_id = pm2.project_id
        WHERE pm1.user_id = auth.uid()
        AND pm1.role = 'team_lead'
        AND pm2.user_id = leaves.user_id
    )
);

-- Policy for tasks: Team leads can view tasks of their project members
CREATE POLICY teamlead_view_tasks ON tasks
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm1
        INNER JOIN project_members pm2 ON pm1.project_id = pm2.project_id
        WHERE pm1.user_id = auth.uid()
        AND pm1.role = 'team_lead'
        AND pm2.user_id = tasks.assigned_to
    )
);

-- Policy for teams: Team leads can view their projects (teams table might be deprecated)
CREATE POLICY teamlead_select_teams ON teams
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm
        WHERE pm.user_id = auth.uid()
        AND pm.role = 'team_lead'
        AND pm.project_id = teams.id
    )
);

-- Policy for timesheets: Team leads can view timesheets of their project members
CREATE POLICY teamlead_view_timesheets ON timesheets
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM project_members pm1
        INNER JOIN project_members pm2 ON pm1.project_id = pm2.project_id
        WHERE pm1.user_id = auth.uid()
        AND pm1.role = 'team_lead'
        AND pm2.user_id = timesheets.user_id
    )
);

-- Done! The team_id column has been removed and all policies updated to use project_members
