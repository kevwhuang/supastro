import { createClient } from '@supabase/supabase-js';
import { type Database } from './types/database';

const supabase = createClient<Database>(
    Bun.env.SUPABASE_URL as string,
    Bun.env.SUPABASE_ANON_KEY as string,
);
