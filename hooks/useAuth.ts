'use client'

import { useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { Profile, getCurrentProfile } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Obter usuário atual
    const getUser = async () => {
      console.log('[useAuth] Iniciando getUser...')
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      console.log('[useAuth] getUser result:', { user: user ? { id: user.id, email: user.email } : null, error: userError })
      setUser(user)

      if (user) {
        try {
          console.log('[useAuth] Buscando perfil para user:', user.id)
          const profile = await getCurrentProfile()
          console.log('[useAuth] Perfil encontrado:', profile)
          setProfile(profile)
        } catch (error) {
          console.error('[useAuth] Erro ao carregar perfil:', error)
          setProfile(null)
        }
      }

      console.log('[useAuth] Finalizando getUser, loading = false')
      setLoading(false)
    }

    getUser()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('[useAuth] Auth state change:', { event, session: session ? { user: { id: session.user.id, email: session.user.email } } : null })
        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            console.log('[useAuth] Buscando perfil após auth change para user:', session.user.id)
            const profile = await getCurrentProfile()
            console.log('[useAuth] Perfil encontrado após auth change:', profile)
            setProfile(profile)
          } catch (error) {
            console.error('[useAuth] Erro ao carregar perfil após auth change:', error)
            setProfile(null)
          }
        } else {
          console.log('[useAuth] Sem sessão, limpando perfil')
          setProfile(null)
        }

        console.log('[useAuth] Auth change processado, loading = false')
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const refreshProfile = async () => {
    if (user) {
      try {
        console.log('[useAuth] Refreshing profile for user:', user.id)
        const profile = await getCurrentProfile()
        console.log('[useAuth] Profile refreshed:', profile)
        setProfile(profile)
      } catch (error) {
        console.error('[useAuth] Error refreshing profile:', error)
        setProfile(null)
      }
    }
  }

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isDentist: profile?.role === 'dentist',
    isPatient: profile?.role === 'patient',
    refreshProfile,
  }
}