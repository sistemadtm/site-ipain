'use client'

import { useState, useRef } from 'react'
import { Camera, Upload, X } from 'lucide-react'
import { Button } from './button'
import { uploadAvatar, deleteAvatar } from '@/lib/services/upload'

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
  const [preview, setPreview] = useState<string | null>(currentAvatar || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // Validar tipo de arquivo
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecione apenas arquivos de imagem.')
      return
    }

    // Validar tamanho (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('A imagem deve ter no máximo 5MB.')
      return
    }

    setUploading(true)

    try {
      // Deletar avatar anterior se existir
      if (currentAvatar) {
        await deleteAvatar(currentAvatar)
      }

      // Upload do novo avatar
      const avatarUrl = await uploadAvatar(file, userId)
      setPreview(avatarUrl)
      onAvatarChange(avatarUrl)
    } catch (error) {
      console.error('Erro ao fazer upload:', error)
      alert('Erro ao fazer upload da imagem. Tente novamente.')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAvatar = async () => {
    if (!currentAvatar) return

    setUploading(true)

    try {
      await deleteAvatar(currentAvatar)
      setPreview(null)
      onAvatarChange(null)
    } catch (error) {
      console.error('Erro ao remover avatar:', error)
      alert('Erro ao remover a imagem. Tente novamente.')
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
          <Upload className="w-4 h-4" />
          {uploading ? 'Enviando...' : preview ? 'Alterar Foto' : 'Adicionar Foto'}
        </Button>
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