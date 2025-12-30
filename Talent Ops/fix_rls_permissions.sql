-- Allow Executives and Managers to update ANY profile
-- This is required so they can set Department, Join Date, etc. for other employees

CREATE POLICY "Executives and Managers can update profiles"
ON profiles
FOR UPDATE
USING (
  (SELECT role FROM profiles WHERE id = auth.uid()) IN ('executive', 'manager')
);

-- Allow ALL authenticated users to VIEW (Select) all profiles
-- This is required for the Employee Dashboard to see Team Members and Hierarchy
CREATE POLICY "Authenticated users can view all profiles"
ON profiles
FOR SELECT
TO authenticated
USING (true);

-- Allow ALL authenticated users to VIEW (Select) project members
-- This is required to know who is in which project
CREATE POLICY "Authenticated users can view project members"
ON project_members
FOR SELECT
TO authenticated
USING (true);
