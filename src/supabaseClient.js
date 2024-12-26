
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://fmoovmxxchapvfgmcblg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZtb292bXh4Y2hhcHZmZ21jYmxnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzUwMzA5MDAsImV4cCI6MjA1MDYwNjkwMH0.QDAdhGviCCni44g1Lm_cu7SPd0od2bwa-i_cTv6a1FE"

export const supabase = createClient(supabaseUrl, supabaseKey)