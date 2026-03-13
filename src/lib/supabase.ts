import { createClient } from '@supabase/supabase-js'

// Variables en .env.local (dev) o GitHub Secrets (CI/CD)
// console.supabase.com → Tu proyecto → Settings → API
const supabaseUrl  = import.meta.env.VITE_SUPABASE_URL
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnon) {
  throw new Error(
    '⚠️  Faltan variables de Supabase.\n' +
    'Copia .env.example → .env.local y rellena VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnon, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

// Tip: genera tipos desde tu esquema real con:
// npx supabase gen types typescript --project-id TU_ID > src/lib/database.types.ts
export type { User, Session } from '@supabase/supabase-js'
