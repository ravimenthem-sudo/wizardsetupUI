import { supabase } from '../lib/supabaseClient';
import { WizardConfig } from '../hooks/useWizardState';

/**
 * Saves the wizard configuration to the user's organization.
 * Assumes the user is logged in and belongs to an organization.
 * 
 * @param config The current wizard configuration state
 * @returns Object indicating success or error
 */
export const saveWizardConfig = async (config: WizardConfig) => {
    try {
        // 1. Get the current user
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            console.error('Error getting user:', userError);
            if (import.meta.env.DEV) {
                console.warn('DEV MODE: Using dummy Org ID for testing.');
            } else {
                throw new Error('User not authenticated');
            }
        }

        // 2. We need to find the organization associated with this user.
        // Priority: 1. Verified ID from Wizard State, 2. User Metadata, 3. Dev Mode Dummy
        let orgId = config.companyInfo.id || user?.user_metadata?.org_id;

        if (import.meta.env.DEV && !orgId) {
            orgId = '00000000-0000-0000-0000-000000000001';
        }

        // If not, let's try to query the org table if the user is the owner or member
        // This query might need adjustment based on exact schema relations (e.g. if there is a users_orgs table)
        // For this "Talent Ops" setup, we'll assume the org might be linked via profile or just update based on auth.uid() if RLS allows.

        // If we still don't have orgId, we might fail or try to find it via a query
        // Assuming we are updating the row where the user matches (or creating one if needed?)
        // The prompt implies updating columns in 'orgs'.

        // Let's try to fetch the profile to see if it has org_id
        if (!orgId) {
            const { data: profile } = await supabase
                .from('profiles')
                .select('org_id')
                .eq('id', user.id)
                .single();

            if (profile) orgId = profile.org_id;
        }

        if (!orgId) {
            // Fallback: This might be the first time setup, maybe we update the organization row that the user created?
            // Or maybe we search for an org where this user is the creator?
            // For now, let's throw if we can't find it to be safe, or logic needs to be verified.

            // However, for the purpose of the demo wizard flow, if the 'orgs' table exists
            // and we just added columns to it...
            // Let's assume we can update the org connected to this user.
            // If we can't find specific ID, maybe we query orgs by some other factor?
            // Actually, usually app setup happens right after signup/org creation.

            throw new Error('Organization ID not found for current user.');
        }

        // 3. Update the organization record
        const { error: updateError } = await supabase
            .from('orgs')
            .update({
                industry: config.companyInfo.industry,
                website: config.companyInfo.website,
                modules: config.modules,
                features: config.features,
                permissions: config.permissions,
                // We might also want to update company name if it changed in wizard vs initial signup
                name: config.companyInfo.name
            })
            .eq('id', orgId);

        if (updateError) {
            console.error('Error updating organization:', updateError);
            throw updateError;
        }

        return { success: true };

    } catch (error: any) {
        console.error('Failed to save wizard config:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Verifies if an organization exists by ID.
 * @param orgId The Organization UUID
 * @returns The organization details if found
 */
export const verifyOrganization = async (orgId: string) => {
    try {
        const { data, error } = await supabase
            .from('orgs')
            .select('id, name')
            .eq('id', orgId)
            .single();

        if (error) throw error;

        return { success: true, data };
    } catch (error: any) {
        console.error('Error verifying organization:', error);
        return { success: false, error: error.message || 'Organization not found' };
    }
};
