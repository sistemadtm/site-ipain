import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

export type ServiceLocation = Database['public']['Tables']['service_locations']['Row']
export type ServiceLocationInsert = Database['public']['Tables']['service_locations']['Insert']
export type ServiceLocationUpdate = Database['public']['Tables']['service_locations']['Update']

export const getServiceLocations = async (filters?: {
  type?: string
  isActive?: boolean
  cityId?: number
}) => {
  let query = supabase
    .from('service_locations')
    .select(`
      *,
      cities (
        name,
        states (
          name,
          code
        )
      )
    `)

  if (filters?.type) {
    query = query.eq('type', filters.type)
  }

  if (filters?.isActive !== undefined) {
    query = query.eq('is_active', filters.isActive)
  }

  if (filters?.cityId) {
    query = query.eq('city_id', filters.cityId)
  }

  const { data, error } = await query.order('name')

  if (error) throw error
  return data
}

export const getServiceLocationById = async (id: string) => {
  const { data, error } = await supabase
    .from('service_locations')
    .select(`
      *,
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

export const createServiceLocation = async (location: ServiceLocationInsert) => {
  const { data, error } = await supabase
    .from('service_locations')
    .insert(location)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateServiceLocation = async (id: string, updates: ServiceLocationUpdate) => {
  const { data, error } = await supabase
    .from('service_locations')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteServiceLocation = async (id: string) => {
  const { error } = await supabase
    .from('service_locations')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getLocationTypes = () => [
  { value: 'university', label: 'Universidade' },
  { value: 'clinic', label: 'Clínica' },
  { value: 'hospital', label: 'Hospital' },
  { value: 'private_practice', label: 'Consultório Particular' }
]