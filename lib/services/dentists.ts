import { supabase } from '@/lib/supabase'
import { Database } from '@/lib/database.types'

export type Dentist = Database['public']['Tables']['dentists']['Row']
export type DentistInsert = Database['public']['Tables']['dentists']['Insert']
export type DentistUpdate = Database['public']['Tables']['dentists']['Update']

export const getDentists = async (filters?: {
  isVolunteer?: boolean
  isActive?: boolean
  city?: string
  specialty?: string
}) => {
  let query = supabase
    .from('dentists')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        avatar_url
      ),
      service_locations (
        name,
        type,
        address,
        cities (
          name,
          states (
            name,
            code
          )
        )
      )
    `)

  if (filters?.isVolunteer !== undefined) {
    query = query.eq('is_volunteer', filters.isVolunteer)
  }

  if (filters?.isActive !== undefined) {
    query = query.eq('is_active', filters.isActive)
  }

  if (filters?.specialty) {
    query = query.contains('specialties', [filters.specialty])
  }

  const { data, error } = await query.order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getDentistById = async (id: string) => {
  const { data, error } = await supabase
    .from('dentists')
    .select(`
      *,
      profiles:user_id (
        full_name,
        email,
        avatar_url
      ),
      service_locations (
        name,
        type,
        address,
        phone,
        email,
        website,
        cities (
          name,
          states (
            name,
            code
          )
        )
      )
    `)
    .eq('id', id)
    .single()

  if (error) throw error
  return data
}

export const createDentist = async (dentist: DentistInsert) => {
  const { data, error } = await (supabase as any)
    .from('dentists')
    .insert(dentist)
    .select()
    .single()

  if (error) throw error
  return data
}

export const updateDentist = async (id: string, updates: DentistUpdate) => {
  const { data, error } = await (supabase as any)
    .from('dentists')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export const deleteDentist = async (id: string) => {
  const { error } = await supabase
    .from('dentists')
    .delete()
    .eq('id', id)

  if (error) throw error
}

export const getDentistByUserId = async (userId: string) => {
  const { data, error } = await supabase
    .from('dentists')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const getSpecialties = () => [
  'Clínica Geral',
  'Ortodontia',
  'Endodontia',
  'Periodontia',
  'Implantodontia',
  'Cirurgia Oral',
  'Odontopediatria',
  'Prótese Dentária',
  'Dentística',
  'Radiologia Odontológica',
  'Patologia Oral',
  'Estomatologia',
  'Odontogeriatria',
  'Odontologia do Trabalho',
  'Odontologia Legal',
  'Acupuntura',
  'Homeopatia',
  'Odontologia do Esporte',
  'Harmonização Orofacial',
  'DTM e Dor Orofacial'
]