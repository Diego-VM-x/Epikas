import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://elenrmckbyalqgqcjbxx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVsZW5ybWNrYnlhbHFncWNqYnh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3MjI0MTMsImV4cCI6MjEwNDI5ODQxM30.UkxLxSBMdywQ83SSQ1KrIpZYJn7kk9Xsq8j7XWUR8xc";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
