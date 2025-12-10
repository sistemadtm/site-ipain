import { supabase } from '@/lib/supabase'

export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${userId}-${Date.now()}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from('avatars')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: true
    })

  if (uploadError) {
    throw uploadError
  }

  const { data } = supabase.storage
    .from('avatars')
    .getPublicUrl(filePath)

  return data.publicUrl
}

export const deleteAvatar = async (url: string) => {
  if (!url) return

  // Extrair o caminho do arquivo da URL
  const urlParts = url.split('/')
  const fileName = urlParts[urlParts.length - 1]
  const filePath = `avatars/${fileName}`

  const { error } = await supabase.storage
    .from('avatars')
    .remove([filePath])

  if (error) {
    console.error('Erro ao deletar avatar:', error)
  }
}