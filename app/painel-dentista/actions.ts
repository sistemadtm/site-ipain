'use server'

import { getDentistByUserId, updateDentist, createDentist, getSpecialties } from '@/lib/services/dentists'
import { updateProfile } from '@/lib/auth'
import { getStates } from '@/lib/services/locations'
import { revalidatePath } from 'next/cache'

export interface DentistProfile {
  id: string
  cro_number: string
  specialties: string[] | null
  is_volunteer: boolean
  is_active: boolean
  bio: string | null
  phone: string | null
  address: string | null
  city: string | null
  state: string | null
}

export interface State {
  id: number
  name: string
  code: string
}

export interface DentistFormData {
  full_name: string
  avatar_url: string
  cro_number: string
  specialties: string[]
  is_volunteer: boolean
  is_active: boolean
  bio: string
  selectedState: string
  city: string
  address: string
  phone: string
}

export async function fetchDentistProfileAction(userId: string) {
  try {
    console.log('[Actions] Buscando dados do dentista para userId:', userId)
    const dentistData = await getDentistByUserId(userId)
    console.log('[Actions] Dados do dentista recebidos:', dentistData)
    
    return {
      success: true,
      data: dentistData as DentistProfile | null
    }
  } catch (error) {
    console.error('[Actions] Erro ao carregar perfil do dentista:', error)
    return {
      success: false,
      error: 'Erro ao carregar perfil do dentista'
    }
  }
}

export async function loadStatesAction() {
  try {
    const statesData = await getStates()
    // Converter para formato mais simples (nome como value)
    const formattedStates = statesData.map((state: any) => ({
      id: state.name, // Usar nome como ID
      name: state.name,
      code: state.code
    }))
    return {
      success: true,
      data: formattedStates as State[]
    }
  } catch (error) {
    console.error('[Actions] Erro ao carregar estados:', error)
    return {
      success: false,
      error: 'Erro ao carregar estados'
    }
  }
}

export async function getSpecialtiesAction() {
  try {
    const specialties = getSpecialties()
    return {
      success: true,
      data: specialties
    }
  } catch (error) {
    console.error('[Actions] Erro ao carregar especialidades:', error)
    return {
      success: false,
      error: 'Erro ao carregar especialidades'
    }
  }
}

export async function saveDentistProfileAction(
  userId: string,
  formData: DentistFormData,
  dentistId?: string
) {
  try {
    const { supabase } = await import('@/lib/supabase')
    
    // Atualizar perfil do usuário diretamente no banco
    const { error: profileError } = await (supabase as any)
      .from('profiles')
      .update({
        full_name: formData.full_name,
        avatar_url: formData.avatar_url
      })
      .eq('id', userId)

    if (profileError) {
      console.error('[Actions] Erro ao atualizar perfil:', profileError)
      throw profileError
    }

    // Preparar dados do dentista (agora tudo na mesma tabela)
    const dentistData = {
      cro_number: formData.cro_number,
      specialties: formData.specialties,
      is_volunteer: formData.is_volunteer,
      is_active: formData.is_active,
      bio: formData.bio,
      phone: formData.phone || null,
      address: formData.address || null,
      city: formData.city || null,
      state: formData.selectedState || null
    }

    if (dentistId) {
      // Atualizar perfil existente
      await updateDentist(dentistId, dentistData)
    } else {
      // Criar novo perfil de dentista
      await createDentist({
        ...dentistData,
        user_id: userId
      })
    }

    // Revalidar a página para atualizar os dados
    revalidatePath('/painel-dentista')

    return {
      success: true,
      message: 'Perfil atualizado com sucesso!'
    }
  } catch (error) {
    console.error('[Actions] Erro ao salvar perfil:', error)
    return {
      success: false,
      error: 'Erro ao salvar perfil. Tente novamente.'
    }
  }
}