// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://ehgnkwmrtbfwzzebvvqm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZ25rd21ydGJmd3p6ZWJ2dnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODQ2MTEsImV4cCI6MjA2NzM2MDYxMX0.8vrGHGe6pX82dnzYGkAstfmKpYyeXcHcizA0dbkTwPU"

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
