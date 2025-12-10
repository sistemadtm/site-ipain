'use client'

import { useAuth } from '@/hooks/useAuth'
import { useEffect, useState } from 'react'
import { getDentistByUserId } from '@/lib/services/dentists'
import { supabase } from '@/lib/supabase'

interface DebugInfo {
  timestamp: string
  step: string
  data: any
  error?: any
}

export function AuthDebug() {
  const { user, profile, loading: authLoading } = useAuth()
  const [debugLog, setDebugLog] = useState<DebugInfo[]>([])
  const [dentistData, setDentistData] = useState<any>(null)

  const addLog = (step: string, data: any, error?: any) => {
    const logEntry: DebugInfo = {
      timestamp: new Date().toISOString(),
      step,
      data,
      error
    }
    setDebugLog(prev => [...prev, logEntry])
    console.log(`[AUTH DEBUG] ${step}:`, data, error ? `Error: ${error}` : '')
  }

  useEffect(() => {
    addLog('useAuth Hook', {
      user: user ? { id: user.id, email: user.email } : null,
      profile,
      authLoading
    })
  }, [user, profile, authLoading])

  useEffect(() => {
    const checkDentistProfile = async () => {
      if (profile && profile.role === 'dentist') {
        try {
          addLog('Buscando dados do dentista', { userId: profile.id })
          const dentist = await getDentistByUserId(profile.id)
          setDentistData(dentist)
          addLog('Dados do dentista encontrados', dentist)
        } catch (error) {
          addLog('Erro ao buscar dentista', null, error)
        }
      }
    }

    if (!authLoading && profile) {
      checkDentistProfile()
    }
  }, [profile, authLoading])

  useEffect(() => {
    // Debug da sessão do Supabase
    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()
      addLog('Sessão Supabase', {
        session: session ? {
          user: { id: session.user.id, email: session.user.email },
          expires_at: session.expires_at
        } : null
      }, error)
    }

    checkSession()

    // Listener para mudanças de auth
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      addLog('Auth State Change', {
        event,
        session: session ? {
          user: { id: session.user.id, email: session.user.email },
          expires_at: session.expires_at
        } : null
      })
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 w-96 max-h-96 overflow-y-auto bg-black text-green-400 text-xs p-4 rounded-lg font-mono z-50">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-white font-bold">AUTH DEBUG</h3>
        <button 
          onClick={() => setDebugLog([])}
          className="text-red-400 hover:text-red-300"
        >
          Clear
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="border-b border-gray-600 pb-2">
          <div className="text-yellow-400">Estado Atual:</div>
          <div>User: {user ? '✅ Logado' : '❌ Não logado'}</div>
          <div>Profile: {profile ? `✅ ${profile.role}` : '❌ Sem perfil'}</div>
          <div>Dentist: {dentistData ? '✅ Encontrado' : '❌ Não encontrado'}</div>
          <div>Loading: {authLoading ? '⏳ Carregando' : '✅ Completo'}</div>
        </div>

        {debugLog.slice(-10).map((log, index) => (
          <div key={index} className="border-b border-gray-700 pb-1">
            <div className="text-blue-400">{log.step}</div>
            <div className="text-gray-300 text-xs">
              {new Date(log.timestamp).toLocaleTimeString()}
            </div>
            <div className="text-white">
              {JSON.stringify(log.data, null, 2)}
            </div>
            {log.error && (
              <div className="text-red-400">
                Error: {JSON.stringify(log.error, null, 2)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}