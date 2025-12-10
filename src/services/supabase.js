import { createClient } from '@supabase/supabase-js'

// INSTRUCTIONS FOR USER:
// 2. Copy "Project URL" (It should look like: https://xyzxyzxyz.supabase.co)
//    NOTE: Do NOT use the dashboard URL (supabase.com/dashboard/...) - that will not work!
// 3. Copy "anon public key" and paste it below

const supabaseUrl = 'https://lpyffxffwsdgefdzgfov.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxweWZmeGZmd3NkZ2VmZHpnZm92Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzOTQxNTAsImV4cCI6MjA4MDk3MDE1MH0.ShlpgQ7FEtV-BVoyo_bVWEzC80EUi1f8cCx8jppSf9I'

export const supabase = createClient(supabaseUrl, supabaseKey)
