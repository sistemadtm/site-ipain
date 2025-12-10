'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Checkbox } from '@/components/ui/checkbox'
import { createDentist, getSpecialties } from '@/lib/services/dentists'
import { getServiceLocations } from '@/lib/services/service-locations'
import { signUp } from '@/lib/auth'

interface ServiceLocation {
  id: string
  name: string
  type: string
  cities: {
    name: string
    states: {
      name: string
      code: string
    } | null
  } | null
}

export default function NovoDentistaPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [serviceLocations, setServiceLocations] = useState<ServiceLocation[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  
  const [formData, setFormData] = useState({
    // Dados do usuário
    email: '',
    password: '',
    full_name: '',
    
    // Dados do dentista
    cro_number: '',
    is_volunteer: false,
    service_location_id: '',
    bio: '',
    experience_years: '',
    consultation_fee: '',
    accepts_insurance: false,
    available_hours_start: '',
    available_hours_end: '',
    is_active: true,
  })

  const specialties = getSpecialties()
  const weekDays = [
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
    'Domingo'
  ]

  useEffect(() => {
    fetchServiceLocations()
  }, [])

  const fetchServiceLocations = async () => {
    try {
      const data = await getServiceLocations({ isActive: true })
      setServiceLocations(data as ServiceLocation[])
    } catch (error) {
      console.error('Erro ao carregar locais:', error)
    }
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties(prev => [...prev, specialty])
    } else {
      setSelectedSpecialties(prev => prev.filter(s => s !== specialty))
    }
  }

  const handleDayChange = (day: string, checked: boolean) => {
    if (checked) {
      setSelectedDays(prev => [...prev, day])
    } else {
      setSelectedDays(prev => prev.filter(d => d !== day))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Criar usuário
      const { user } = await signUp(formData.email, formData.password, formData.full_name)
      
      if (!user) throw new Error('Erro ao criar usuário')

      // Criar perfil de dentista
      await createDentist({
        user_id: user.id,
        cro_number: formData.cro_number,
        specialties: selectedSpecialties.length > 0 ? selectedSpecialties : null,
        is_volunteer: formData.is_volunteer,
        service_location_id: formData.service_location_id || null,
        bio: formData.bio || null,
        experience_years: formData.experience_years ? parseInt(formData.experience_years) : null,
        consultation_fee: formData.consultation_fee ? parseFloat(formData.consultation_fee) : null,
        accepts_insurance: formData.accepts_insurance,
        available_days: selectedDays.length > 0 ? selectedDays : null,
        available_hours_start: formData.available_hours_start || null,
        available_hours_end: formData.available_hours_end || null,
        is_active: formData.is_active,
      })

      router.push('/painel/dentistas')
    } catch (error) {
      console.error('Erro ao criar dentista:', error)
      alert('Erro ao criar dentista')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Novo Dentista</h1>
        <p className="text-gray-600">Cadastrar um novo dentista no sistema</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Dados de Acesso</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="full_name">Nome Completo *</Label>
              <Input
                id="full_name"
                value={formData.full_name}
                onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Senha *</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                minLength={6}
              />
            </div>
            <div>
              <Label htmlFor="cro_number">Número do CRO *</Label>
              <Input
                id="cro_number"
                value={formData.cro_number}
                onChange={(e) => setFormData(prev => ({ ...prev, cro_number: e.target.value }))}
                required
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Informações Profissionais</h2>
          
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="is_volunteer"
                checked={formData.is_volunteer}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_volunteer: checked }))}
              />
              <Label htmlFor="is_volunteer">É voluntário</Label>
            </div>

            <div>
              <Label htmlFor="service_location">Local de Atendimento</Label>
              <Select
                value={formData.service_location_id}
                onValueChange={(value) => setFormData(prev => ({ ...prev, service_location_id: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione um local" />
                </SelectTrigger>
                <SelectContent>
                  {serviceLocations.map((location) => (
                    <SelectItem key={location.id} value={location.id}>
                      {location.name} - {location.cities?.name}, {location.cities?.states?.code}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Especialidades</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                {specialties.map((specialty) => (
                  <div key={specialty} className="flex items-center space-x-2">
                    <Checkbox
                      id={specialty}
                      checked={selectedSpecialties.includes(specialty)}
                      onCheckedChange={(checked) => handleSpecialtyChange(specialty, checked as boolean)}
                    />
                    <Label htmlFor={specialty} className="text-sm">
                      {specialty}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="experience_years">Anos de Experiência</Label>
                <Input
                  id="experience_years"
                  type="number"
                  min="0"
                  value={formData.experience_years}
                  onChange={(e) => setFormData(prev => ({ ...prev, experience_years: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="consultation_fee">Valor da Consulta (R$)</Label>
                <Input
                  id="consultation_fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.consultation_fee}
                  onChange={(e) => setFormData(prev => ({ ...prev, consultation_fee: e.target.value }))}
                  disabled={formData.is_volunteer}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="accepts_insurance"
                checked={formData.accepts_insurance}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, accepts_insurance: checked }))}
              />
              <Label htmlFor="accepts_insurance">Aceita convênio</Label>
            </div>

            <div>
              <Label htmlFor="bio">Biografia</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                rows={4}
                placeholder="Conte um pouco sobre sua experiência e especialidades..."
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Disponibilidade</h2>
          
          <div className="space-y-6">
            <div>
              <Label>Dias Disponíveis</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {weekDays.map((day) => (
                  <div key={day} className="flex items-center space-x-2">
                    <Checkbox
                      id={day}
                      checked={selectedDays.includes(day)}
                      onCheckedChange={(checked) => handleDayChange(day, checked as boolean)}
                    />
                    <Label htmlFor={day} className="text-sm">
                      {day}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="available_hours_start">Horário de Início</Label>
                <Input
                  id="available_hours_start"
                  type="time"
                  value={formData.available_hours_start}
                  onChange={(e) => setFormData(prev => ({ ...prev, available_hours_start: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="available_hours_end">Horário de Fim</Label>
                <Input
                  id="available_hours_end"
                  type="time"
                  value={formData.available_hours_end}
                  onChange={(e) => setFormData(prev => ({ ...prev, available_hours_end: e.target.value }))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="is_active"
                checked={formData.is_active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_active: checked }))}
              />
              <Label htmlFor="is_active">Perfil ativo</Label>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Salvando...' : 'Salvar Dentista'}
          </Button>
        </div>
      </form>
    </div>
  )
}