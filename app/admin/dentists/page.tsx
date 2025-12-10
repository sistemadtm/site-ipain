'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Filter, Edit, Trash2, Eye } from 'lucide-react'
import { getDentists, deleteDentist } from '@/lib/services/dentists'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DentistWithProfile {
  id: string
  cro_number: string
  specialties: string[] | null
  is_volunteer: boolean
  is_active: boolean
  created_at: string
  profiles: {
    full_name: string | null
    email: string
  } | null
  service_locations: {
    name: string
    type: string
    cities: {
      name: string
      states: {
        name: string
        code: string
      } | null
    } | null
  } | null
}

export default function DentistsPage() {
  const [dentists, setDentists] = useState<DentistWithProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterVolunteer, setFilterVolunteer] = useState<boolean | undefined>()

  useEffect(() => {
    fetchDentists()
  }, [filterVolunteer])

  const fetchDentists = async () => {
    try {
      setLoading(true)
      const data = await getDentists({ isVolunteer: filterVolunteer })
      setDentists(data as DentistWithProfile[])
    } catch (error) {
      console.error('Erro ao carregar dentistas:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este dentista?')) {
      try {
        await deleteDentist(id)
        fetchDentists()
      } catch (error) {
        console.error('Erro ao excluir dentista:', error)
        alert('Erro ao excluir dentista')
      }
    }
  }

  const filteredDentists = dentists.filter(dentist =>
    dentist.profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dentist.profiles?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dentist.cro_number.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dentistas</h1>
          <p className="text-gray-600">Gerencie os dentistas cadastrados</p>
        </div>
        <Link href="/admin/dentists/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Dentista
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar por nome, email ou CRO..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterVolunteer === undefined ? "default" : "outline"}
                onClick={() => setFilterVolunteer(undefined)}
                size="sm"
              >
                Todos
              </Button>
              <Button
                variant={filterVolunteer === true ? "default" : "outline"}
                onClick={() => setFilterVolunteer(true)}
                size="sm"
              >
                Voluntários
              </Button>
              <Button
                variant={filterVolunteer === false ? "default" : "outline"}
                onClick={() => setFilterVolunteer(false)}
                size="sm"
              >
                Não Voluntários
              </Button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Dentista
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CRO
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especialidades
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Local
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDentists.map((dentist) => (
                  <tr key={dentist.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {dentist.profiles?.full_name || 'Nome não informado'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {dentist.profiles?.email}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {dentist.cro_number}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {dentist.specialties?.slice(0, 2).join(', ')}
                        {dentist.specialties && dentist.specialties.length > 2 && (
                          <span className="text-gray-500">
                            {' '}+{dentist.specialties.length - 2} mais
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        dentist.is_volunteer
                          ? 'bg-green-100 text-green-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {dentist.is_volunteer ? 'Voluntário' : 'Particular'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {dentist.service_locations ? (
                        <div>
                          <div>{dentist.service_locations.name}</div>
                          <div className="text-xs text-gray-500">
                            {dentist.service_locations.cities?.name}, {dentist.service_locations.cities?.states?.code}
                          </div>
                        </div>
                      ) : (
                        'Não informado'
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        dentist.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {dentist.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/dentists/${dentist.id}`}>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Link href={`/admin/dentists/${dentist.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(dentist.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {!loading && filteredDentists.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum dentista encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}