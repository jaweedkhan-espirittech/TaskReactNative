import { createClient } from '@supabase/supabase-js';

// TODO: replace with your project's values
const SUPABASE_URL = 'https://saficpeckaasknygsjkp.supabase.co';
const SUPABASE_ANON_KEY =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNhZmljcGVja2Fhc2tueWdzamtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU0NjgxODMsImV4cCI6MjA4MTA0NDE4M30.T4OHh5dxfWV4vHhSPNsBE7_bnLuUFJVqgy7wUGxf1N0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
