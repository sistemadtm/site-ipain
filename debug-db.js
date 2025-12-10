// Script para debug do banco de dados
// Execute com: node debug-db.js

const { createClient } = require('@supabase/supabase-js')
require('dotenv').config()

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

async function debugDatabase() {
  console.log('🔍 Iniciando debug do banco de dados...\n')

  try {
    // 1. Verificar profiles
    console.log('1. Verificando tabela profiles:')
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (profilesError) {
      console.error('❌ Erro ao buscar profiles:', profilesError)
    } else {
      console.log(`✅ Encontrados ${profiles.length} profiles:`)
      profiles.forEach(profile => {
        console.log(`   - ${profile.email} (${profile.role}) - ID: ${profile.id}`)
      })
    }

    // 2. Verificar dentists
    console.log('\n2. Verificando tabela dentists:')
    const { data: dentists, error: dentistsError } = await supabase
      .from('dentists')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(5)

    if (dentistsError) {
      console.error('❌ Erro ao buscar dentists:', dentistsError)
    } else {
      console.log(`✅ Encontrados ${dentists.length} dentists:`)
      dentists.forEach(dentist => {
        console.log(`   - CRO: ${dentist.cro_number} - User ID: ${dentist.user_id} - Ativo: ${dentist.is_active}`)
      })
    }

    // 3. Verificar relação entre profiles e dentists
    console.log('\n3. Verificando relação profiles <-> dentists:')
    const { data: profilesWithRole, error: roleError } = await supabase
      .from('profiles')
      .select('*')
      .eq('role', 'dentist')

    if (roleError) {
      console.error('❌ Erro ao buscar profiles com role dentist:', roleError)
    } else {
      console.log(`✅ Encontrados ${profilesWithRole.length} profiles com role 'dentist':`)
      
      for (const profile of profilesWithRole) {
        const { data: dentist, error: dentistError } = await supabase
          .from('dentists')
          .select('*')
          .eq('user_id', profile.id)
          .single()

        if (dentistError && dentistError.code !== 'PGRST116') {
          console.log(`   ❌ ${profile.email} - Erro ao buscar dentist: ${dentistError.message}`)
        } else if (!dentist) {
          console.log(`   ⚠️  ${profile.email} - Profile é dentist mas não tem registro na tabela dentists`)
        } else {
          console.log(`   ✅ ${profile.email} - CRO: ${dentist.cro_number}`)
        }
      }
    }

    // 4. Verificar sessões ativas
    console.log('\n4. Verificando configuração de auth:')
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError) {
      console.log('❌ Erro ao verificar usuário atual:', userError.message)
    } else if (user) {
      console.log('✅ Usuário logado:', user.email)
    } else {
      console.log('ℹ️  Nenhum usuário logado no momento')
    }

  } catch (error) {
    console.error('❌ Erro geral:', error)
  }

  console.log('\n🏁 Debug concluído!')
}

debugDatabase()