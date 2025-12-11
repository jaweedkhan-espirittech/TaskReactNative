import { createClient } from '@supabase/supabase-js';

// TODO: replace with your project's values
const SUPABASE_URL =
	process.env.SUPABASE_URL || 'https://demo-integrationsmash-project.com';
const SUPABASE_ANON_KEY =
	process.env.SUPABASE_ANON_KEY || 'public-integrationsmash-key';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
	// adding the global option to use the Expo fetch implementation
	global: {
		fetch: fetch,
	},
});
