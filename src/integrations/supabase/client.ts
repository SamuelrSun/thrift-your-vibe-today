// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://urekhqvsqplbjlfsdmuz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyZWtocXZzcXBsYmpsZnNkbXV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM2Njc5NTMsImV4cCI6MjA1OTI0Mzk1M30.XA0Ay-BOuKckTWMPDhLvLIzeY0H2eEwL9aHjwlQy73M";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);