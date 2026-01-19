import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: resolve(__dirname, '.env') });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('❌ Missing Supabase credentials in .env file');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkDashboardData() {
    console.log('🔍 Checking Dashboard Data by org_id...\n');

    try {
        // 1. Get current user
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            console.error('❌ Not authenticated or error:', authError);
            return;
        }

        console.log('✅ Authenticated as:', user.email);

        // 2. Get user's profile and org_id
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id, full_name, email, role, org_id')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            console.error('❌ Error fetching profile:', profileError);
            return;
        }

        console.log('✅ User Profile:', {
            name: profile.full_name,
            role: profile.role,
            org_id: profile.org_id
        });

        if (!profile.org_id) {
            console.error('❌ User has no org_id assigned!');
            return;
        }

        const orgId = profile.org_id;
        console.log(`\n📊 Checking data for org_id: ${orgId}\n`);

        // 3. Check Employees (profiles)
        const { data: employees, error: empError } = await supabase
            .from('profiles')
            .select('id, full_name, email, role')
            .eq('org_id', orgId);

        console.log(`👥 Employees (profiles with org_id=${orgId}):`, employees?.length || 0);
        if (employees && employees.length > 0) {
            employees.forEach(emp => {
                console.log(`   - ${emp.full_name} (${emp.email}) - ${emp.role}`);
            });
        }

        // 4. Check Projects
        const { data: projects, error: projError } = await supabase
            .from('projects')
            .select('id, name, status')
            .eq('org_id', orgId);

        console.log(`\n📁 Projects (org_id=${orgId}):`, projects?.length || 0);
        if (projects && projects.length > 0) {
            projects.forEach(proj => {
                console.log(`   - ${proj.name} (${proj.status})`);
            });
        }

        // 5. Check Tasks
        const { data: tasks, error: tasksError } = await supabase
            .from('tasks')
            .select('id, title, status, assigned_to')
            .eq('org_id', orgId);

        console.log(`\n✅ Tasks (org_id=${orgId}):`, tasks?.length || 0);
        if (tasks && tasks.length > 0) {
            tasks.slice(0, 5).forEach(task => {
                console.log(`   - ${task.title} (${task.status})`);
            });
            if (tasks.length > 5) {
                console.log(`   ... and ${tasks.length - 5} more`);
            }
        }

        // 6. Check Departments
        const { data: departments, error: deptError } = await supabase
            .from('departments')
            .select('id, department_name')
            .eq('org_id', orgId);

        console.log(`\n🏢 Departments (org_id=${orgId}):`, departments?.length || 0);
        if (departments && departments.length > 0) {
            departments.forEach(dept => {
                console.log(`   - ${dept.department_name}`);
            });
        }

        // 7. Check Leaves
        const { data: leaves, error: leavesError } = await supabase
            .from('leaves')
            .select('id, status, from_date, to_date')
            .eq('org_id', orgId);

        console.log(`\n🌴 Leave Requests (org_id=${orgId}):`, leaves?.length || 0);

        // 8. Check Attendance
        const today = new Date().toISOString().split('T')[0];
        const { data: attendance, error: attError } = await supabase
            .from('attendance')
            .select('id, employee_id, clock_in, clock_out')
            .eq('org_id', orgId)
            .eq('date', today);

        console.log(`\n⏰ Attendance Today (org_id=${orgId}):`, attendance?.length || 0);

        // 9. Check Project Members
        const { data: projectMembers, error: pmError } = await supabase
            .from('project_members')
            .select('user_id, project_id, role')
            .eq('org_id', orgId);

        console.log(`\n👥 Project Members (org_id=${orgId}):`, projectMembers?.length || 0);

        // Summary
        console.log('\n' + '='.repeat(60));
        console.log('📊 SUMMARY');
        console.log('='.repeat(60));
        console.log(`Organization ID: ${orgId}`);
        console.log(`Employees: ${employees?.length || 0}`);
        console.log(`Projects: ${projects?.length || 0}`);
        console.log(`Tasks: ${tasks?.length || 0}`);
        console.log(`Departments: ${departments?.length || 0}`);
        console.log(`Leave Requests: ${leaves?.length || 0}`);
        console.log(`Attendance Records (today): ${attendance?.length || 0}`);
        console.log(`Project Memberships: ${projectMembers?.length || 0}`);
        console.log('='.repeat(60));

        // Check for data without org_id
        console.log('\n⚠️  Checking for orphaned data (no org_id)...\n');

        const { data: orphanedProfiles } = await supabase
            .from('profiles')
            .select('id, full_name, email')
            .is('org_id', null);

        if (orphanedProfiles && orphanedProfiles.length > 0) {
            console.log(`❌ Found ${orphanedProfiles.length} profiles without org_id:`);
            orphanedProfiles.forEach(p => console.log(`   - ${p.full_name} (${p.email})`));
        }

        const { data: orphanedProjects } = await supabase
            .from('projects')
            .select('id, name')
            .is('org_id', null);

        if (orphanedProjects && orphanedProjects.length > 0) {
            console.log(`❌ Found ${orphanedProjects.length} projects without org_id:`);
            orphanedProjects.forEach(p => console.log(`   - ${p.name}`));
        }

    } catch (error) {
        console.error('❌ Error:', error);
    }
}

checkDashboardData();
