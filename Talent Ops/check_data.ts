import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ppptzmmecvjuvbulvddh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBwcHR6bW1lY3ZqdXZidWx2ZGRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2NDQ1OTksImV4cCI6MjA3OTIyMDU5OX0._58LAFFr7BnxbJ2c12YYJEYTEsKoYolwOXh7-aX4paQ'
const supabase = createClient(supabaseUrl, supabaseKey)

async function checkData() {
    console.log('--- Checking Profiles ---')
    const { data: profiles, error: pError } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', 'testexe@gmail.com')

    if (pError) console.error('Profile Error:', pError)
    else console.log('Profiles for testexe@gmail.com:', profiles)

    const orgId = profiles && profiles.length > 0 ? profiles[0].org_id : '1493936c-20d2-4738-82ff-93c4ed519104'

    console.log('--- Checking Projects for Org:', orgId, '---')
    const { data: projects, error: projError } = await supabase
        .from('projects')
        .select('*')
        .eq('org_id', orgId)

    if (projError) console.error('Projects Error:', projError)
    else console.log('Projects for Org:', projects)

    console.log('--- Checking ALL Projects ---')
    const { data: allProjects, error: allProjError } = await supabase
        .from('projects')
        .select('*')
        .limit(10)

    if (allProjError) console.error('All Projects Error:', allProjError)
    else console.log('All Projects (first 10):', allProjects)
}

checkData()
