'use client'

import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useCallback } from 'react'
import { 
  fetchDentistProfileAction, 
  loadStatesAction, 
  getSpecialtiesAction,
  saveDentistProfileAction,
  type DentistProfile,
  type State,
  type DentistFormData
} from './actions'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { AvatarUpload } from '@/components/ui/avatar-upload'
import { MultiSelect } from '@/components/ui/multi-select'
import { Save, Loader2 } from 'lucide-react'
import { SimpleDebug } from '@/components/SimpleDebug'
import { toast } from 'sonner'


export default function PainelDentistaPage() {
  const { profile, loading: authLoading, refreshProfile } = useAuth()
  const router = useRouter()
  const [dentist, setDentist] = useState<DentistProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [states, setStates] = useState<State[]>([])
  const [specialties, setSpecialties] = useState<string[]>([])
  
  // Form data
  const [formData, setFormData] = useState<DentistFormData>({
    full_name: '',
    avatar_url: '',
    cro_number: '',
    specialties: [],
    is_volunteer: false,
    is_active: true,
    bio: '',
    selectedState: '',
    city: '',
    address: '',
    phone: ''
  })

  useEffect(() => {
    console.log('[PainelDentista] useEffect executado, authLoading:', authLoading, 'profile:', profile)
    
    if (authLoading) {
      console.log('[PainelDentista] Ainda carregando auth, retornando')
      return // Ainda carregando auth
    }

    if (!profile || profile.role !== 'dentist') {
      console.log('[PainelDentista] Sem profile ou não é dentista, redirecionando')
      router.push('/entrar')
      return
    }

    if (profile && profile.role === 'dentist') {
      console.log('[PainelDentista] Profile de dentista encontrado, carregando dados')
      fetchDentistProfile()
      loadStates()
      loadSpecialties()
    }
  }, [profile, authLoading, router])

  const loadStates = async () => {
    try {
      const result = await loadStatesAction()
      if (result.success && result.data) {
        setStates(result.data)
      } else {
        console.error('Erro ao carregar estados:', result.error)
      }
    } catch (error) {
      console.error('Erro ao carregar estados:', error)
    }
  }

  const loadSpecialties = async () => {
    try {
      const result = await getSpecialtiesAction()
      if (result.success && result.data) {
        setSpecialties(result.data)
      } else {
        console.error('Erro ao carregar especialidades:', result.error)
      }
    } catch (error) {
      console.error('Erro ao carregar especialidades:', error)
    }
  }

  const handleStateChange = (stateId: string) => {
    setFormData(prev => ({ 
      ...prev, 
      selectedState: stateId
    }))
  }



  const fetchDentistProfile = useCallback(async () => {
    console.log('[PainelDentista] fetchDentistProfile iniciado, profile:', profile)
    
    if (!profile) {
      console.log('[PainelDentista] Sem profile, definindo loading como false')
      setLoading(false)
      return
    }

    try {
      console.log('[PainelDentista] Buscando dados do dentista para userId:', profile.id)
      const result = await fetchDentistProfileAction(profile.id)
      
      if (result.success) {
        console.log('[PainelDentista] Dados do dentista recebidos:', result.data)
        setDentist(result.data || null)
        
        // Preencher formulário com dados existentes
        console.log('[PainelDentista] Preenchendo formulário com dados:', result.data)
        console.log('[PainelDentista] is_active do banco:', result.data?.is_active, typeof result.data?.is_active)
        
        setFormData({
          full_name: profile.full_name || '',
          avatar_url: profile.avatar_url || '',
          cro_number: result.data?.cro_number || '',
          specialties: result.data?.specialties || [],
          is_volunteer: result.data?.is_volunteer || false,
          is_active: result.data?.is_active !== undefined ? result.data.is_active : true,
          bio: result.data?.bio || '',
          selectedState: result.data?.state || '',
          city: result.data?.city || '',
          address: result.data?.address || '',
          phone: result.data?.phone || ''
        })
        
        console.log('[PainelDentista] Formulário preenchido com sucesso')
      } else {
        console.error('[PainelDentista] Erro ao carregar perfil:', result.error)
      }
    } catch (error) {
      console.error('[PainelDentista] Erro ao carregar perfil do dentista:', error)
    } finally {
      console.log('[PainelDentista] Definindo loading como false')
      setLoading(false)
    }
  }, [profile])

  const handleSave = async () => {
    if (!profile) return

    console.log('[handleSave] Dados do formulário antes de salvar:', formData)
    console.log('[handleSave] is_active value:', formData.is_active, typeof formData.is_active)

    setSaving(true)
    try {
      const result = await saveDentistProfileAction(
        profile.id,
        formData,
        dentist?.id
      )

      if (result.success) {
        // Recarregar dados
        await fetchDentistProfile()
        await refreshProfile()
        toast.success(result.message)
      } else {
        toast.error(result.error)
      }
    } catch (error) {
      console.error('Erro ao salvar:', error)
      toast.error('Erro ao salvar perfil. Tente novamente.')
    } finally {
      setSaving(false)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <SimpleDebug />
      
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Painel do Dentista
                </h1>
                <p className="text-gray-600">
                  Gerencie seu perfil profissional
                </p>
              </div>
              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="flex items-center gap-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                {saving ? 'Salvando...' : 'Salvar Alterações'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Foto e Informações Básicas</h3>
              
              <div className="space-y-6">
                <AvatarUpload
                  currentAvatar={formData.avatar_url}
                  userId={profile.id}
                  onAvatarChange={(url) => setFormData(prev => ({ ...prev, avatar_url: url || '' }))}
                />

                <div>
                  <Label htmlFor="full_name">Nome Completo</Label>
                  <Input
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                    placeholder="Dr(a). Seu Nome"
                  />
                </div>

                <div>
                  <Label htmlFor="cro_number">Número do CRO</Label>
                  <Input
                    id="cro_number"
                    value={formData.cro_number}
                    onChange={(e) => setFormData(prev => ({ ...prev, cro_number: e.target.value }))}
                    placeholder="Ex: CRO-SP 12345"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_volunteer"
                    checked={formData.is_volunteer}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, is_volunteer: checked }))}
                  />
                  <Label htmlFor="is_volunteer">Atendimento Voluntário</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="is_active"
                    checked={formData.is_active}
                    onCheckedChange={(checked) => {
                      console.log('[Switch] is_active alterado para:', checked, typeof checked)
                      setFormData(prev => ({ ...prev, is_active: checked }))
                    }}
                  />
                  <Label htmlFor="is_active">Perfil Ativo</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Professional Info */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Informações Profissionais</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label>Especialidades</Label>
                  <MultiSelect
                    options={specialties}
                    value={formData.specialties}
                    onChange={(specialties) => setFormData(prev => ({ ...prev, specialties }))}
                    placeholder="Selecione suas especialidades"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="bio">Biografia Profissional</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Conte um pouco sobre sua experiência e formação..."
                    rows={4}
                  />
                </div>



                <div>
                  <Label htmlFor="phone">Telefone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div>
                  <Label htmlFor="selectedState">Estado</Label>
                  <Select value={formData.selectedState} onValueChange={handleStateChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state.name} value={state.name}>
                          {state.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">Cidade</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="Digite sua cidade"
                  />
                </div>

                <div className="md:col-span-2">
                  <Label htmlFor="address">Endereço</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    placeholder="Rua, número, bairro"
                  />
                </div>
              </div>
            </div>


          </div>
        </div>

        {/* Save Button (Always Visible) */}
        <div className="mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-center">
              <Button 
                onClick={handleSave} 
                disabled={saving}
                size="lg"
                className="px-8 py-3 flex items-center gap-2"
              >
                {saving ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Save className="w-5 h-5" />
                )}
                {saving ? 'Salvando Alterações...' : 'Salvar Todas as Alterações'}
              </Button>
            </div>
            <p className="text-center text-sm text-gray-500 mt-2">
              Todas as alterações serão salvas automaticamente
            </p>
          </div>
        </div>
      </div>

      {/* Floating Save Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button 
          onClick={handleSave} 
          disabled={saving}
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow rounded-full px-6 py-3"
        >
          {saving ? (
            <Loader2 className="w-5 h-5 animate-spin mr-2" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {saving ? 'Salvando...' : 'Salvar'}
        </Button>
      </div>
    </div>
  )
}