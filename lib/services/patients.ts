import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

export type Patient = Database['public']['Tables']['patients']['Row']
export type PatientInsert = Database['public']['Tables']['patients']['Insert']
export type PatientUpdate = Database['public']['Tables']['patients']['Update']

export const getPatients = async () => {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        avatar_url
      ),
      cities (
        name,
        states (
          name,
          code
        )
      )
    `)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getPatientById = async (id: string) => {
  const { data, error } = await supabase
    .from('patients')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        avatar_url
      ),
      cities (
        name,
        states (
          name,
          code
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createPatient = async (patient: PatientInsert) => {
  const { data, error } = await supabase
    .from('patients')
    .insert(patient)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updatePatient = async (id: string, updates: PatientUpdate) => {
  const { data, error } = await supabase
    .from('patients')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deletePatient = async (id: string) => {
  const { error } = await supabase
    .from('patients')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getPatientByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('patients')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}