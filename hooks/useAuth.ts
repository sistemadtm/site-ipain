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
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        try {
          const profile = await getCurrentProfile()
          setProfile(profile)
        } catch (error) {
          console.error('Erro ao carregar perfil:', error)
        }
      }

      setLoading(false)
    }

    getUser()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)

        if (session?.user) {
          try {
            const profile = await getCurrentProfile()
            setProfile(profile)
          } catch (error) {
            console.error('Erro ao carregar perfil:', error)
            setProfile(null)
          }
        } else {
          setProfile(null)
        }

        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  return {
    user,
    profile,
    loading,
    isAuthenticated: !!user,
    isAdmin: profile?.role === 'admin',
    isDentist: profile?.role === 'dentist',
    isPatient: profile?.role === 'patient',
  }
}