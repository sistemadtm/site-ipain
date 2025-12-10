'use client'

import { useEffect, useState } from 'react'
import { Users, UserCheck, MapPin, FileText, Calendar, TrendingUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Stats {
  totalDentists: number
  totalPatients: number
  totalLocations: number
  totalPosts: number
  volunteersCount: number
}

export default function PainelPage() {
  const [stats, setStats] = useState<Stats>({
    totalDentists: 0,
    totalPatients: 0,
    totalLocations: 0,
    totalPosts: 0,
    volunteersCount: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [
          dentistsResult,
          patientsResult,
          locationsResult,
          postsResult,
          volunteersResult
        ] = await Promise.all([
          supabase.from('dentists').select('id', { count: 'exact' }),
          supabase.from('patients').select('id', { count: 'exact' }),
          supabase.from('service_locations').select('id', { count: 'exact' }),
          supabase.from('blog_posts').select('id', { count: 'exact' }),
          supabase.from('dentists').select('id', { count: 'exact' }).eq('is_volunteer', true)
        ])

        setStats({
          totalDentists: dentistsResult.count || 0,
          totalPatients: patientsResult.count || 0,
          totalLocations: locationsResult.count || 0,
          totalPosts: postsResult.count || 0,
          volunteersCount: volunteersResult.count || 0
        })
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      name: 'Total de Dentistas',
      value: stats.totalDentists,
      icon: UserCheck,
      color: 'bg-blue-500'
    },
    {
      name: 'Voluntários',
      value: stats.volunteersCount,
      icon: Users,
      color: 'bg-green-500'
    },
    {
      name: 'Pacientes',
      value: stats.totalPatients,
      icon: Users,
      color: 'bg-purple-500'
    },
    {
      name: 'Locais de Atendimento',
      value: stats.totalLocations,
      icon: MapPin,
      color: 'bg-orange-500'
    },
    {
      name: 'Posts do Blog',
      value: stats.totalPosts,
      icon: FileText,
      color: 'bg-indigo-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Painel de Controle</h1>
        <p className="text-gray-600">Visão geral do sistema</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h2>
          <div className="space-y-3">
            <a
              href="/painel/dentistas/novo"
              className="flex items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <UserCheck className="w-5 h-5 text-blue-600 mr-3" />
              <span className="text-blue-700 font-medium">Cadastrar Dentista</span>
            </a>
            <a
              href="/painel/locais/novo"
              className="flex items-center p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <MapPin className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-green-700 font-medium">Adicionar Local</span>
            </a>
            <a
              href="/painel/blog/novo"
              className="flex items-center p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <FileText className="w-5 h-5 text-purple-600 mr-3" />
              <span className="text-purple-700 font-medium">Novo Post</span>
            </a>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Estatísticas</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Taxa de Voluntários</span>
              <span className="font-semibold">
                {stats.totalDentists > 0 
                  ? Math.round((stats.volunteersCount / stats.totalDentists) * 100)
                  : 0}%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Locais Cadastrados</span>
              <span className="font-semibold">
                {stats.totalLocations}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}