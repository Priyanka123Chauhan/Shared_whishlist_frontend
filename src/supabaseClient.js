// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://qjjancckzcwhqjddfzys.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqamFuY2NremN3aHFqZGRmenlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODEzMjUsImV4cCI6MjA2NjM1NzMyNX0.YdXu6ErZ0PfCpjvQkAy2Q0kJ2Y-00IBn0agMDzPp3gw";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
