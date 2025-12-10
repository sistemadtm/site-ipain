import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

export type State = Database['public']['Tables']['states']['Row']
export type City = Database['public']['Tables']['cities']['Row']

export const getStates = async () => {
  const { data, error } = await supabase
    .from('states')
    .select('*')
    .order('name')

  if (error) throw error
  return data
}

export const getCitiesByState = async (stateId: number) => {
  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('state_id', stateId)
    .order('name')

  if (error) throw error
  return data
}

export const getCityById = async (id: number) => {
  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      states (
        name,
        code
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const searchCities = async (query: string, limit = 10) => {
  const { data, error } = await supabase
    .from('cities')
    .select(`
      *,
      states (
        name,
        code
      )
    `)
    .ilike('name', `%${query}%`)
    .limit(limit)
    .order('name')

  if (error) throw error
  return data
}