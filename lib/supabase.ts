import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key'

if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
  console.warn('⚠️  Variáveis de ambiente do Supabase não configuradas. Verifique o arquivo .env.local')
}

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseAnonKey)

// Cliente para operações do servidor
export const createServerClient = () => {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key'
  
  return createClient<Database>(
    supabaseUrl,
    serviceRoleKey
  )
}