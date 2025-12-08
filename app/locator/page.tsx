'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, User as UserIcon, ArrowRight, Filter, LayoutList, Map as MapIcon, Plus, Minus, Maximize, LocateFixed, Navigation, Stethoscope } from 'lucide-react';
import { BrazilianMap } from '@/components/BrazilianMap';

// Todos os estados brasileiros
const BRAZIL_STATES = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
];

// Dados fictícios de dentistas especialistas em Dor Orofacial
const MOCK_DENTISTS = [
  {
    id: 1,
    name: 'Dra. Ana Paula Silva',
    specialty: 'Dor Orofacial e DTM',
    cro: 'CRO-SP 45678',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Jardins',
    address: 'Rua Augusta, 1500 - Sala 302',
    phone: '(11) 3456-7890',
    email: 'ana.silva@exemplo.com',
    experience: '15 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Bruxismo', 'Cefaleia', 'Acupuntura'],
    acceptsVolunteer: true,
  },
  {
    id: 2,
    name: 'Dr. Carlos Eduardo Santos',
    specialty: 'Dor Orofacial',
    cro: 'CRO-RJ 23456',
    state: 'RJ',
    city: 'Rio de Janeiro',
    neighborhood: 'Copacabana',
    address: 'Av. Atlântica, 2500 - Sala 801',
    phone: '(21) 2345-6789',
    email: 'carlos.santos@exemplo.com',
    experience: '12 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Dor Neuropática', 'Laser Terapia'],
    acceptsVolunteer: true,
  },
  {
    id: 3,
    name: 'Dra. Mariana Costa',
    specialty: 'DTM e Dor Orofacial',
    cro: 'CRO-MG 34567',
    state: 'MG',
    city: 'Belo Horizonte',
    neighborhood: 'Savassi',
    address: 'Rua Pernambuco, 750 - Sala 501',
    phone: '(31) 3234-5678',
    email: 'mariana.costa@exemplo.com',
    experience: '10 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Bruxismo', 'Placas Oclusais', 'Toxina Botulínica'],
    acceptsVolunteer: false,
  },
  {
    id: 4,
    name: 'Dr. Roberto Oliveira',
    specialty: 'Dor Orofacial e Ortodontia',
    cro: 'CRO-SP 56789',
    state: 'SP',
    city: 'Campinas',
    neighborhood: 'Cambuí',
    address: 'Av. Norte-Sul, 1200 - Sala 203',
    phone: '(19) 3345-6789',
    email: 'roberto.oliveira@exemplo.com',
    experience: '18 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Ortodontia', 'Dor Miofascial'],
    acceptsVolunteer: true,
  },
  {
    id: 5,
    name: 'Dra. Juliana Ferreira',
    specialty: 'Dor Orofacial',
    cro: 'CRO-RS 45678',
    state: 'RS',
    city: 'Porto Alegre',
    neighborhood: 'Moinhos de Vento',
    address: 'Rua Ramiro Barcelos, 800 - Sala 402',
    phone: '(51) 3456-7890',
    email: 'juliana.ferreira@exemplo.com',
    experience: '8 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Cefaleia', 'Fisioterapia Orofacial'],
    acceptsVolunteer: true,
  },
  {
    id: 6,
    name: 'Dr. Fernando Lima',
    specialty: 'DTM e Implantodontia',
    cro: 'CRO-BA 67890',
    state: 'BA',
    city: 'Salvador',
    neighborhood: 'Barra',
    address: 'Av. Oceânica, 3500 - Sala 601',
    phone: '(71) 3567-8901',
    email: 'fernando.lima@exemplo.com',
    experience: '20 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Implantes', 'Reabilitação Oral'],
    acceptsVolunteer: false,
  },
  {
    id: 7,
    name: 'Dra. Patricia Almeida',
    specialty: 'Dor Orofacial e DTM',
    cro: 'CRO-PR 78901',
    state: 'PR',
    city: 'Curitiba',
    neighborhood: 'Batel',
    address: 'Rua Comendador Araújo, 300 - Sala 1001',
    phone: '(41) 3678-9012',
    email: 'patricia.almeida@exemplo.com',
    experience: '14 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Bruxismo', 'Dor Crônica', 'Acupuntura'],
    acceptsVolunteer: true,
  },
  {
    id: 8,
    name: 'Dr. Lucas Rodrigues',
    specialty: 'Dor Orofacial',
    cro: 'CRO-SC 89012',
    state: 'SC',
    city: 'Florianópolis',
    neighborhood: 'Centro',
    address: 'Rua Felipe Schmidt, 500 - Sala 302',
    phone: '(48) 3789-0123',
    email: 'lucas.rodrigues@exemplo.com',
    experience: '9 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Laser Terapia', 'Placas Oclusais'],
    acceptsVolunteer: true,
  },
  {
    id: 9,
    name: 'Dra. Camila Souza',
    specialty: 'DTM e Dor Orofacial',
    cro: 'CRO-PE 90123',
    state: 'PE',
    city: 'Recife',
    neighborhood: 'Boa Viagem',
    address: 'Av. Conselheiro Aguiar, 2500 - Sala 701',
    phone: '(81) 3890-1234',
    email: 'camila.souza@exemplo.com',
    experience: '11 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Dor Neuropática', 'Toxina Botulínica', 'Cefaleia'],
    acceptsVolunteer: false,
  },
  {
    id: 10,
    name: 'Dr. Rafael Martins',
    specialty: 'Dor Orofacial e Prótese',
    cro: 'CRO-SP 12345',
    state: 'SP',
    city: 'São Paulo',
    neighborhood: 'Moema',
    address: 'Av. Ibirapuera, 2000 - Sala 1502',
    phone: '(11) 3901-2345',
    email: 'rafael.martins@exemplo.com',
    experience: '16 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Prótese Dentária', 'Reabilitação Oral', 'Bruxismo'],
    acceptsVolunteer: true,
  },
  {
    id: 11,
    name: 'Dra. Beatriz Mendes',
    specialty: 'Dor Orofacial',
    cro: 'CRO-RJ 34567',
    state: 'RJ',
    city: 'Niterói',
    neighborhood: 'Icaraí',
    address: 'Rua Moreira César, 150 - Sala 401',
    phone: '(21) 4012-3456',
    email: 'beatriz.mendes@exemplo.com',
    experience: '7 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Cefaleia', 'Acupuntura'],
    acceptsVolunteer: true,
  },
  {
    id: 12,
    name: 'Dr. Thiago Barbosa',
    specialty: 'DTM e Dor Orofacial',
    cro: 'CRO-MG 45678',
    state: 'MG',
    city: 'Uberlândia',
    neighborhood: 'Centro',
    address: 'Av. João Naves de Ávila, 1800 - Sala 603',
    phone: '(34) 4123-4567',
    email: 'thiago.barbosa@exemplo.com',
    experience: '13 anos',
    photo: '/images/dentist-placeholder.jpg',
    services: ['DTM', 'Dor Miofascial', 'Laser Terapia', 'Placas Oclusais'],
    acceptsVolunteer: true,
  },
];

export default function Locator() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [citySearch, setCitySearch] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  // Filtrar perfis baseado nos filtros selecionados
  const allProfiles = MOCK_DENTISTS;
  
  const filteredProfiles = allProfiles.filter(profile => {
    if (selectedState && profile.state !== selectedState) return false;
    if (citySearch && !profile.city.toLowerCase().includes(citySearch.toLowerCase())) return false;
    return true;
  });

  // Contagem de perfis por estado
  const stateCounts: Record<string, number> = {};
  allProfiles.forEach(profile => {
    stateCounts[profile.state] = (stateCounts[profile.state] || 0) + 1;
  });

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  const handleResetMap = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
    setSelectedState('');
    setCitySearch('');
  };

  return (
    <div className="bg-paper min-h-screen">
      {/* Sleek Header */}
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
         <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-10"></div>
         
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Rede Credenciada</h1>
          <p className="text-gray-400 font-light text-xl max-w-2xl mx-auto">
            Conectando você aos melhores especialistas em Dor Orofacial do Brasil.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        {/* Modern Filter Card */}
        <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/50 max-w-5xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                 <Filter size={18} />
               </div>
               <div>
                  <h2 className="text-slate-900 font-bold text-lg">Filtrar Especialistas</h2>
                  <p className="text-gray-500 text-xs">Selecione uma região no mapa ou use os filtros</p>
               </div>
            </div>
            
            <div className="flex bg-gray-100 p-1.5 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white text-primary shadow-md' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
              >
                <LayoutList size={14} /> Lista
              </button>
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
                  viewMode === 'map' 
                    ? 'bg-white text-primary shadow-md' 
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200'
                }`}
              >
                <MapIcon size={14} /> Mapa
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-2 text-[10px] font-bold text-primary uppercase tracking-widest z-10">Unidade Federativa</label>
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium appearance-none shadow-sm hover:border-gray-300"
              >
                <option value="">Selecione o Estado...</option>
                {BRAZIL_STATES.map(state => (
                  <option key={state.value} value={state.value}>{state.label}</option>
                ))}
              </select>
            </div>
            
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10">Município</label>
              <input
                type="text"
                value={citySearch}
                onChange={(e) => setCitySearch(e.target.value)}
                placeholder="Digite o nome da cidade..."
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium shadow-sm hover:border-gray-300 placeholder:text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'map' ? (
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Mapa */}
            <div className="bg-slate-50 rounded-2xl border border-gray-200 relative h-[700px] overflow-hidden shadow-inner">
              <div className="absolute top-6 left-6 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur border border-gray-200 p-2 shadow-soft rounded-xl">
                <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"><Plus size={20} /></button>
                <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"><Minus size={20} /></button>
                <div className="h-px bg-gray-200 w-full my-1"></div>
                <button onClick={handleResetMap} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors"><Maximize size={20} /></button>
              </div>

              <div className="w-full h-full relative overflow-hidden bg-slate-100 flex items-center justify-center">
                <div 
                  className="w-full h-full transition-transform duration-500 ease-out origin-center flex items-center justify-center p-8"
                  style={{ transform: `scale(${zoom}) translate(${center.x}px, ${center.y}px)` }}
                >
                  <BrazilianMap 
                    selectedState={selectedState} 
                    onStateClick={setSelectedState} 
                    counts={stateCounts}
                  />
                </div>
              </div>
            </div>

            {/* Listagem abaixo do mapa */}
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-2">
                  {selectedState ? 'Nenhum especialista encontrado' : 'Selecione uma região no mapa'}
                </h3>
                <p className="text-gray-500">
                  {selectedState 
                    ? 'Tente ajustar os filtros para encontrar especialistas.' 
                    : 'Clique em um estado no mapa acima para ver os especialistas disponíveis.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-slate-900">
                    {filteredProfiles.length} {filteredProfiles.length === 1 ? 'Especialista Encontrado' : 'Especialistas Encontrados'}
                  </h3>
                </div>

                <div className="grid gap-6">
                  {filteredProfiles.map((dentist) => (
                    <div key={dentist.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Photo */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <Stethoscope size={40} className="text-primary" />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                              <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">{dentist.name}</h4>
                                <p className="text-primary font-medium mb-2">{dentist.specialty}</p>
                                <p className="text-sm text-gray-600">{dentist.cro} • {dentist.experience} de experiência</p>
                              </div>
                              {dentist.acceptsVolunteer && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                  Atendimento Voluntário
                                </span>
                              )}
                            </div>

                            {/* Services */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {dentist.services.map((service: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                                  {service}
                                </span>
                              ))}
                            </div>

                            {/* Contact Info */}
                            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{dentist.address}<br />{dentist.neighborhood} - {dentist.city}/{dentist.state}</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">📞</span>
                                  <span>{dentist.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">✉️</span>
                                  <span className="text-primary hover:underline">{dentist.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <Link 
                            href={`/dentist/${dentist.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                          >
                            Ver Perfil Completo
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-5xl mx-auto">
            {filteredProfiles.length === 0 ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <MapPin size={32} />
                </div>
                <h3 className="text-xl font-serif text-slate-900 mb-2">
                  {selectedState ? 'Nenhum especialista encontrado' : 'Selecione uma região'}
                </h3>
                <p className="text-gray-500">
                  {selectedState 
                    ? 'Tente ajustar os filtros para encontrar especialistas.' 
                    : 'Utilize os filtros acima ou a visão de mapa para encontrar especialistas.'}
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-serif text-slate-900">
                    {filteredProfiles.length} {filteredProfiles.length === 1 ? 'Especialista Encontrado' : 'Especialistas Encontrados'}
                  </h3>
                </div>

                <div className="grid gap-6">
                  {filteredProfiles.map((dentist) => (
                    <div key={dentist.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          {/* Photo */}
                          <div className="flex-shrink-0">
                            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <Stethoscope size={40} className="text-primary" />
                            </div>
                          </div>

                          {/* Info */}
                          <div className="flex-grow">
                            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                              <div>
                                <h4 className="text-xl font-bold text-slate-900 mb-1">{dentist.name}</h4>
                                <p className="text-primary font-medium mb-2">{dentist.specialty}</p>
                                <p className="text-sm text-gray-600">{dentist.cro} • {dentist.experience} de experiência</p>
                              </div>
                              {dentist.acceptsVolunteer && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border border-green-200">
                                  Atendimento Voluntário
                                </span>
                              )}
                            </div>

                            {/* Services */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {dentist.services.map((service: string, idx: number) => (
                                <span key={idx} className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-xs font-medium">
                                  {service}
                                </span>
                              ))}
                            </div>

                            {/* Contact Info */}
                            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-600">
                              <div className="flex items-start gap-2">
                                <MapPin size={16} className="text-primary mt-0.5 flex-shrink-0" />
                                <span>{dentist.address}<br />{dentist.neighborhood} - {dentist.city}/{dentist.state}</span>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">📞</span>
                                  <span>{dentist.phone}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="font-medium">✉️</span>
                                  <span className="text-primary hover:underline">{dentist.email}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Action Button */}
                        <div className="mt-6 pt-6 border-t border-gray-100">
                          <Link 
                            href={`/dentist/${dentist.id}`}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary/90 transition-colors"
                          >
                            Ver Perfil Completo
                            <ArrowRight size={18} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
