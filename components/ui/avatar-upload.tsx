'use client'

import { useState, useRef, useEffect } from 'react'
import { Camera, Upload, X, AlertCircle } from 'lucide-react'
import { Button } from './button'
import { uploadAvatar, deleteAvatar, checkBucketExists, testSupabaseConnection } from '@/lib/services/upload'

interface AvatarUploadProps {
  currentAvatar?: string | null
  userId: string
  onAvatarChange: (url: string | null) => void
  className?: string
}

export function AvatarUpload({ 
  currentAvatar, 
  userId, 
  onAvatarChange, 
  className = '' 
}: AvatarUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [preview, setPreview] = useState<string | null>(currentAvatar || null)
  const [error, setError] = useState<string | null>(null)
  const [bucketExists, setBucketExists] = useState<boolean | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Verificar se o bucket existe ao montar o componente (não bloquear upload)
  useEffect(() => {
    const checkBucket = async () => {
      try {
        console.log('[AvatarUpload] Verificando configuração do storage...')
        const exists = await checkBucketExists()
        setBucketExists(exists)
        if (exists) {
          console.log('[AvatarUpload] Storage configurado corretamente')
        } else {
          console.warn('[AvatarUpload] Bucket não encontrado, mas permitindo tentativa de upload')
        }
      } catch (error) {
        console.warn('[AvatarUpload] Erro ao verificar bucket (permitindo upload):', error)
        setBucketExists(null) // null = desconhecido, não bloquear
      }
    }
    checkBucket()
  }, [])

  // Função de debug
  const handleDebug = async () => {
    console.log('[AvatarUpload] Executando debug...')
    const result = await testSupabaseConnection()
    console.log('[AvatarUpload] Resultado do debug:', result)
    
    const message = `🔍 Teste de Conectividade:
    
✅ Autenticação: ${result.auth ? 'OK' : 'FALHA'}
✅ Storage: ${result.storage ? 'OK' : 'FALHA'}  
✅ Buckets encontrados: ${result.buckets.length > 0 ? result.buckets.join(', ') : 'Nenhum'}

${!result.auth ? '❌ Faça login novamente' : ''}
${!result.storage ? '❌ Verifique configuração do Supabase' : ''}
${result.buckets.length === 0 ? '❌ Execute script de configuração do storage' : ''}`
    
    alert(message)
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Prevenir múltiplos uploads simultâneos
    if (uploading) {
      console.log('[AvatarUpload] Upload já em andamento, ignorando...')
      return
    }

    console.log('[AvatarUpload] Arquivo selecionado:', { name: file.name, size: file.size, type: file.type })
    setError(null)

    // Não bloquear upload baseado na verificação do bucket
    // O upload tentará funcionar mesmo se a verificação falhar

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      setError('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('A imagem deve ter no máximo 5MB.')
      return
    }

    setUploading(true)
    setUploadProgress('Preparando upload...')

    try {
      console.log('[AvatarUpload] Iniciando processo de upload...')
      
      // Deletar avatar anterior em background (não bloquear upload)
      if (currentAvatar) {
        setUploadProgress('Removendo foto anterior...')
        // Executar deleção em background sem aguardar
        deleteAvatar(currentAvatar).catch(deleteError => {
          console.warn('[AvatarUpload] Erro ao deletar avatar anterior (em background):', deleteError)
        })
        console.log('[AvatarUpload] Deleção do avatar anterior iniciada em background')
      }

      // Upload do novo avatar
      setUploadProgress('Enviando nova foto...')
      console.log('[AvatarUpload] Fazendo upload do novo avatar...')
      const avatarUrl = await uploadAvatar(file, userId)
      console.log('[AvatarUpload] Upload concluído com sucesso:', avatarUrl)
      
      setUploadProgress('Finalizando...')
      setPreview(avatarUrl)
      onAvatarChange(avatarUrl)
      setError(null)
      
      // Limpar o input para permitir selecionar o mesmo arquivo novamente
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
      
    } catch (error: any) {
      console.error('[AvatarUpload] Erro ao fazer upload:', error)
      setError(`Erro: ${error.message || 'Falha no upload. Tente novamente.'}`)
      
      // Limpar o input em caso de erro também
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } finally {
      setUploading(false)
      console.log('[AvatarUpload] Processo de upload finalizado')
    }
  }

  const handleRemoveAvatar = async () => {
    if (!currentAvatar || uploading) return

    console.log('[AvatarUpload] Removendo avatar...')
    setUploading(true)
    setError(null)

    try {
      await deleteAvatar(currentAvatar)
      setPreview(null)
      onAvatarChange(null)
      console.log('[AvatarUpload] Avatar removido com sucesso')
    } catch (error: any) {
      console.error('[AvatarUpload] Erro ao remover avatar:', error)
      setError(`Erro ao remover: ${error.message || 'Tente novamente.'}`)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
          {preview ? (
            <img
              src={preview}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <Camera className="w-12 h-12 text-gray-400" />
          )}
        </div>
        
        {preview && (
          <button
            onClick={handleRemoveAvatar}
            disabled={uploading}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 disabled:opacity-50"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="flex items-center gap-2"
        >
          {uploading ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              Processando...
            </>
          ) : (
            <>
              <Upload className="w-4 h-4" />
              {preview ? 'Alterar Foto' : 'Adicionar Foto'}
            </>
          )}
        </Button>
        
        {uploading && (
          <Button
            type="button"
            variant="outline"
            onClick={() => window.location.reload()}
            className="text-red-600 hover:text-red-700"
          >
            Cancelar
          </Button>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  )
}