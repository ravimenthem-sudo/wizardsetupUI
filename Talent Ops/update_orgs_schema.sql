-- Safely update 'orgs' table with new columns for Wizard Setup
-- This script is idempotent: it will not duplicate columns if they already exist
-- It does NOT drop or delete any existing data

-- Add 'industry' column
ALTER TABLE public.orgs 
ADD COLUMN IF NOT EXISTS industry TEXT;

-- Add 'website' column
ALTER TABLE public.orgs 
ADD COLUMN IF NOT EXISTS website TEXT;

-- Add 'modules' column for storing selected modules list
ALTER TABLE public.orgs 
ADD COLUMN IF NOT EXISTS modules JSONB DEFAULT '[]'::jsonb;

-- Add 'features' column for storing selected features list
ALTER TABLE public.orgs 
ADD COLUMN IF NOT EXISTS features JSONB DEFAULT '[]'::jsonb;

-- Add 'permissions' column for storing role-permission matrix
ALTER TABLE public.orgs 
ADD COLUMN IF NOT EXISTS permissions JSONB DEFAULT '{}'::jsonb;
