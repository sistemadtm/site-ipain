import { supabase } from '@/lib/supabase'

export const uploadAvatar = async (file: File, userId: string): Promise<string> => {
  console.log('[Upload] Iniciando upload de avatar para userId:', userId)
  console.log('[Upload] Arquivo:', { name: file.name, size: file.size, type: file.type })

  try {
    return await retryWithBackoff(async () => {
      // Timeout por tentativa (10 segundos)
      const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error('Upload timeout - tentativa cancelada após 10 segundos')), 10000)
      })

      const uploadPromise = async () => {
        // Verificar se o usuário está autenticado
        console.log('[Upload] Verificando autenticação...')
        const { data: { user }, error: authError } = await supabase.auth.getUser()
        if (authError || !user) {
          console.error('[Upload] Usuário não autenticado:', authError)
          throw new Error('Usuário não autenticado')
        }
        console.log('[Upload] Usuário autenticado:', user.id)

        const fileExt = file.name.split('.').pop()?.toLowerCase()
        const fileName = `${userId}-${Date.now()}.${fileExt}`
        const filePath = fileName

        console.log('[Upload] Fazendo upload para:', filePath)

        // Fazer upload
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
          })

        if (uploadError) {
          console.error('[Upload] Erro no upload:', uploadError)
          
          // Mensagens de erro mais específicas
          if (uploadError.message.includes('The resource was not found')) {
            throw new Error('Bucket "avatars" não encontrado. Execute o script de configuração do Supabase.')
          }
          
          if (uploadError.message.includes('fetch failed') || uploadError.message.includes('ECONNRESET')) {
            throw new Error(`Erro de conectividade: ${uploadError.message}`)
          }
          
          if (uploadError.message.includes('JWT')) {
            throw new Error('Sessão expirada. Faça login novamente.')
          }
          
          if (uploadError.message.includes('policy')) {
            throw new Error('Erro de permissão. Verifique as políticas RLS do Supabase.')
          }
          
          // Erro genérico
          throw new Error(`Erro no upload: ${uploadError.message}`)
        }

        console.log('[Upload] Upload realizado com sucesso:', uploadData)

        // Obter URL pública
        const { data: urlData } = supabase.storage
          .from('avatars')
          .getPublicUrl(filePath)

        console.log('[Upload] URL pública gerada:', urlData.publicUrl)
        return urlData.publicUrl
      }

      // Race entre upload e timeout
      return await Promise.race([uploadPromise(), timeoutPromise])
    }, 2, 1000) // 2 tentativas, 1s de delay base

  } catch (error: any) {
    console.error('[Upload] Falha final no upload após retries:', error)
    throw new Error(error.message || 'Erro desconhecido no upload')
  }
}

export const deleteAvatar = async (url: string) => {
  if (!url) return

  console.log('[Upload] Deletando avatar:', url)

  try {
    // Extrair o nome do arquivo da URL
    const urlParts = url.split('/')
    const fileName = urlParts[urlParts.length - 1]
    
    console.log('[Upload] Nome do arquivo a deletar:', fileName)

    // Delete simples sem timeout complexo
    const { error } = await supabase.storage
      .from('avatars')
      .remove([fileName])

    if (error) {
      console.warn('[Upload] Erro ao deletar avatar (não crítico):', error)
      // Não lançar erro para não bloquear o fluxo
      return
    }

    console.log('[Upload] Avatar deletado com sucesso')

  } catch (error: any) {
    console.warn('[Upload] Erro ao deletar avatar (ignorando):', error)
    // Não lançar erro para não bloquear o fluxo
  }
}

// Função para testar conectividade com Supabase
export const testSupabaseConnection = async () => {
  console.log('[Debug] Testando conectividade com Supabase...')
  
  try {
    // Testar auth
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    console.log('[Debug] Auth status:', { user: user?.id, error: authError?.message })
    
    // Testar storage
    const { data: buckets, error: storageError } = await supabase.storage.listBuckets()
    console.log('[Debug] Storage status:', { buckets: buckets?.length, error: storageError?.message })
    
    return {
      auth: !authError && !!user,
      storage: !storageError,
      buckets: buckets?.map(b => b.name) || []
    }
  } catch (error) {
    console.error('[Debug] Erro na conectividade:', error)
    return { auth: false, storage: false, buckets: [] }
  }
}

// Função auxiliar para retry com backoff
const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  baseDelay: number = 1000
): Promise<T> => {
  let lastError: Error

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      console.log(`[Retry] Tentativa ${attempt}/${maxRetries}`)
      return await fn()
    } catch (error: any) {
      lastError = error
      console.warn(`[Retry] Tentativa ${attempt} falhou:`, error.message)
      
      if (attempt === maxRetries) {
        throw lastError
      }
      
      // Backoff exponencial: 1s, 2s, 4s
      const delay = baseDelay * Math.pow(2, attempt - 1)
      console.log(`[Retry] Aguardando ${delay}ms antes da próxima tentativa...`)
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
  
  throw lastError!
}

// Função para verificar se o bucket existe (não bloquear upload)
export const checkBucketExists = async (): Promise<boolean> => {
  console.log('[Upload] Verificando se bucket avatars existe...')
  
  try {
    // Timeout mais curto para não atrasar a interface
    const timeoutPromise = new Promise<never>((_, reject) => {
      setTimeout(() => reject(new Error('Timeout na verificação do bucket')), 2000)
    })

    const checkPromise = async () => {
      const { data, error } = await supabase.storage.listBuckets()
      
      if (error) {
        console.warn('[Upload] Erro ao listar buckets (não bloquear):', error)
        // Sempre retornar true para não bloquear upload
        return true
      }

      const avatarsBucket = data.find(bucket => bucket.name === 'avatars')
      const exists = !!avatarsBucket
      console.log('[Upload] Bucket avatars existe:', exists)
      
      return exists
    }

    return await Promise.race([checkPromise(), timeoutPromise])

  } catch (error: any) {
    console.warn('[Upload] Erro na verificação do bucket (permitindo upload):', error)
    // Sempre permitir tentativa de upload
    return true
  }
}