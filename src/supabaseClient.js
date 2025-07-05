// src/supabaseClient.js

import { createClient } from "@supabase/supabase-js";

<<<<<<< HEAD
const SUPABASE_URL = "https://ehgnkwmrtbfwzzebvvqm.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVoZ25rd21ydGJmd3p6ZWJ2dnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE3ODQ2MTEsImV4cCI6MjA2NzM2MDYxMX0.8vrGHGe6pX82dnzYGkAstfmKpYyeXcHcizA0dbkTwPU"
=======
const SUPABASE_URL = "https://qjjancckzcwhqjddfzys.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFqamFuY2NremN3aHFqZGRmenlzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODEzMjUsImV4cCI6MjA2NjM1NzMyNX0.YdXu6ErZ0PfCpjvQkAy2Q0kJ2Y-00IBn0agMDzPp3gw";
>>>>>>> 9b3f2f1 (Initial commit)

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
