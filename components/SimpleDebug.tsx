'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getDentistByUserId } from '@/lib/services/dentists'

export function SimpleDebug() {
  const { user, profile, loading } = useAuth()
  const [dentistData, setDentistData] = useState<any>(null)
  const [dentistLoading, setDentistLoading] = useState(false)
  const [dentistError, setDentistError] = useState<any>(null)

  useEffect(() => {
    if (profile && profile.role === 'dentist') {
      setDentistLoading(true)
      setDentistError(null)
      
      getDentistByUserId(profile.id)
        .then(data => {
          setDentistData(data)
        })
        .catch(error => {
          setDentistError(error)
        })
        .finally(() => {
          setDentistLoading(false)
        })
    }
  }, [profile])

  if (process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed top-4 right-4 bg-white border-2 border-red-500 p-4 rounded-lg shadow-lg z-50 max-w-sm">
      <h3 className="font-bold text-red-600 mb-2">🐛 DEBUG AUTH</h3>
      
      <div className="space-y-2 text-sm">
        <div>
          <strong>Loading:</strong> {loading ? '⏳ Sim' : '✅ Não'}
        </div>
        
        <div>
          <strong>User:</strong> {user ? `✅ ${user.email}` : '❌ Não logado'}
        </div>
        
        <div>
          <strong>Profile:</strong> {profile ? `✅ ${profile.role}` : '❌ Sem perfil'}
        </div>
        
        {profile && profile.role === 'dentist' && (
          <div>
            <strong>Dentist Data:</strong>
            {dentistLoading ? (
              ' ⏳ Carregando...'
            ) : dentistError ? (
              <div className="text-red-600">
                ❌ Erro: {dentistError.message || 'Erro desconhecido'}
              </div>
            ) : dentistData ? (
              <div className="text-green-600">
                ✅ CRO: {dentistData.cro_number}
              </div>
            ) : (
              <div className="text-orange-600">
                ⚠️ Não encontrado
              </div>
            )}
          </div>
        )}

        {profile && (
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs">
            <strong>Profile ID:</strong> {profile.id}<br/>
            <strong>Email:</strong> {profile.email}<br/>
            <strong>Role:</strong> {profile.role}
          </div>
        )}
      </div>
    </div>
  )
}