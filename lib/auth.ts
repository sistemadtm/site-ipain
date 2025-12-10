import { supabase } from './supabase'
import { Database } from './database.types'

export type Profile = Database['public']['Tables']['profiles']['Row']
export type UserRole = Profile['role']

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  })

  if (error) throw error

  // Criar perfil do usuário
  if (data.user) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: data.user.id,
        email: data.user.email!,
        full_name: fullName,
        role: 'patient', // Padrão é paciente
      })

    if (profileError) throw profileError
  }

  return data
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  return data
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export const getCurrentUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

export const getCurrentProfile = async () => {
  const user = await getCurrentUser()
  if (!user) return null

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  if (error) throw error
  return data
}

export const updateProfile = async (updates: Partial<Profile>) => {
  const user = await getCurrentUser()
  if (!user) throw new Error('Usuário não autenticado')

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const hasRole = (profile: Profile | null, roles: UserRole[]): boolean => {
  return profile ? roles.includes(profile.role) : false
}

export const isAdmin = (profile: Profile | null): boolean => {
  return hasRole(profile, ['admin'])
}

export const isDentist = (profile: Profile | null): boolean => {
  return hasRole(profile, ['dentist'])
}

export const isPatient = (profile: Profile | null): boolean => {
  return hasRole(profile, ['patient'])
}