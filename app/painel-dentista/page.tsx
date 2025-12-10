'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { getDentistByUserId } from '@/lib/services/dentists'
import { Button } from '@/components/ui/button'
import { Calendar, Users, MapPin, Settings, Edit } from 'lucide-react'
import Link from 'next/link'

interface DentistProfile {
  id: string
  cro_number: string
  specialties: string[] | null
  is_volunteer: boolean
  is_active: boolean
  bio: string | null
  available_days: string[] | null
  service_locations: {
    name: string
    type: string
  } | null
}

export default function PainelDentistaPage() {
  const { profile, loading: authLoading } = useAuth()
  const router = useRouter()
  const [dentist, setDentist] = useState<DentistProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!authLoading && (!profile || profile.role !== 'dentist')) {
      router.push('/entrar')
      return
    }

    if (profile && profile.role === 'dentist') {
      fetchDentistProfile()
    }
  }, [profile, authLoading, router])

  const fetchDentistProfile = async () => {
    if (!profile) return

    try {
      const dentistData = await getDentistByUserId(profile.id)
      setDentist(dentistData)
    } catch (error) {
      console.error('Erro ao carregar perfil do dentista:', error)
    } finally {
      setLoading(false)
    }
  }

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!profile || profile.role !== 'dentist') {
    return null
  }

  if (!dentist) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Complete seu perfil profissional
            </h1>
            <p className="text-gray-600 mb-6">
              Para começar a usar a plataforma, você precisa completar seu perfil de dentista.
            </p>
            <Link href="/perfil/completar">
              <Button>Completar Perfil</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Olá, Dr(a). {profile.full_name}
                </h1>
                <p className="text-gray-600">
                  CRO: {dentist.cro_number} • {dentist.is_volunteer ? 'Voluntário' : 'Particular'}
                </p>
              </div>
              <div className="flex gap-2">
                <Link href="/perfil/editar">
                  <Button variant="outline">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </Link>
                <Link href="/configuracoes">
                  <Button variant="outline">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Visualizações do Perfil</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Local de Atendimento</p>
                <p className="text-sm font-bold text-gray-900">
                  {dentist.service_locations?.name || 'Não definido'}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Disponibilidade</p>
                <p className="text-sm font-bold text-gray-900">
                  {dentist.available_days?.length || 0} dias
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Informações de Contato</h2>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700">Como os pacientes podem te encontrar:</h3>
                    <div className="mt-2 space-y-2">
                      <p className="text-sm text-gray-600">
                        • Seu perfil aparece na busca pública de dentistas
                      </p>
                      <p className="text-sm text-gray-600">
                        • Pacientes podem ver suas especialidades e disponibilidade
                      </p>
                      <p className="text-sm text-gray-600">
                        • Eles entrarão em contato diretamente com você
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-900">Dica:</h4>
                    <p className="text-sm text-blue-700 mt-1">
                      Mantenha seu perfil atualizado com horários disponíveis e informações de contato para receber mais solicitações de pacientes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Seu Perfil</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Status</p>
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    dentist.is_active
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {dentist.is_active ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                
                {dentist.specialties && dentist.specialties.length > 0 && (
                  <div>
                    <p className="text-sm text-gray-600">Especialidades</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {dentist.specialties.slice(0, 3).map((specialty) => (
                        <span
                          key={specialty}
                          className="inline-flex px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded"
                        >
                          {specialty}
                        </span>
                      ))}
                      {dentist.specialties.length > 3 && (
                        <span className="inline-flex px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
                          +{dentist.specialties.length - 3} mais
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {dentist.bio && (
                  <div>
                    <p className="text-sm text-gray-600">Biografia</p>
                    <p className="text-sm text-gray-900 mt-1">
                      {dentist.bio.length > 100 
                        ? `${dentist.bio.substring(0, 100)}...`
                        : dentist.bio
                      }
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Ações Rápidas</h3>
              <div className="space-y-3">
                <Link href="/perfil/editar" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="w-4 h-4 mr-2" />
                    Editar Perfil
                  </Button>
                </Link>
                <Link href="/configuracoes" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="w-4 h-4 mr-2" />
                    Configurações
                  </Button>
                </Link>
                <a href="/" className="block">
                  <Button variant="outline" className="w-full justify-start">
                    <Users className="w-4 h-4 mr-2" />
                    Ver Site Público
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}