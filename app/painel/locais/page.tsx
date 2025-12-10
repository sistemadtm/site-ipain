'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Plus, Search, Edit, Trash2, MapPin } from 'lucide-react'
import { getServiceLocations, deleteServiceLocation, getLocationTypes } from '@/lib/services/service-locations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface ServiceLocationWithCity {
  id: string
  name: string
  type: 'university' | 'clinic' | 'hospital' | 'private_practice'
  address: string
  phone: string | null
  email: string | null
  website: string | null
  is_active: boolean
  created_at: string
  cities: {
    name: string
    states: {
      name: string
      code: string
    } | null
  } | null
}

export default function LocaisPage() {
  const [locations, setLocations] = useState<ServiceLocationWithCity[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('')

  const locationTypes = getLocationTypes()

  useEffect(() => {
    fetchLocations()
  }, [filterType])

  const fetchLocations = async () => {
    try {
      setLoading(true)
      const data = await getServiceLocations({ 
        type: filterType || undefined 
      })
      setLocations(data as ServiceLocationWithCity[])
    } catch (error) {
      console.error('Erro ao carregar locais:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este local?')) {
      try {
        await deleteServiceLocation(id)
        fetchLocations()
      } catch (error) {
        console.error('Erro ao excluir local:', error)
        alert('Erro ao excluir local')
      }
    }
  }

  const filteredLocations = locations.filter(location =>
    location.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    location.address.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getTypeLabel = (type: string) => {
    const typeObj = locationTypes.find(t => t.value === type)
    return typeObj?.label || type
  }

  const getTypeColor = (type: string) => {
    const colors = {
      university: 'bg-blue-100 text-blue-800',
      clinic: 'bg-green-100 text-green-800',
      hospital: 'bg-red-100 text-red-800',
      private_practice: 'bg-purple-100 text-purple-800'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800'
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Locais de Atendimento</h1>
          <p className="text-gray-600">Gerencie universidades, clínicas e outros locais</p>
        </div>
        <Link href="/painel/locais/novo">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Novo Local
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
                  placeholder="Buscar por nome ou endereço..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="w-full sm:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Todos os tipos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todos os tipos</SelectItem>
                  {locationTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                    Local
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Localização
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contato
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
                {filteredLocations.map((location) => (
                  <tr key={location.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {location.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {location.address}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getTypeColor(location.type)}`}>
                        {getTypeLabel(location.type)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {location.cities ? (
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                          {location.cities.name}, {location.cities.states?.code}
                        </div>
                      ) : (
                        'Não informado'
                      )}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      <div>
                        {location.phone && (
                          <div>{location.phone}</div>
                        )}
                        {location.email && (
                          <div className="text-blue-600">{location.email}</div>
                        )}
                        {location.website && (
                          <div>
                            <a 
                              href={location.website} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              Website
                            </a>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        location.is_active
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {location.is_active ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <Link href={`/painel/locais/${location.id}/editar`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(location.id)}
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

        {!loading && filteredLocations.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Nenhum local encontrado</p>
          </div>
        )}
      </div>
    </div>
  )
}