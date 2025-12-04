import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { profileService } from '../services/storage';
import { DentistProfile, User } from '../types';
import { BRAZIL_STATES } from '../constants';
import { MapPin, User as UserIcon, ArrowRight, Filter, LayoutList, Map as MapIcon, Plus, Minus, Maximize, LocateFixed, Navigation, Stethoscope } from 'lucide-react';
import { BrazilianMap } from '../components/BrazilianMap';

type ExtendedProfile = DentistProfile & { user: User };

const Locator: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [allProfiles, setAllProfiles] = useState<ExtendedProfile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<ExtendedProfile[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [isLocating, setIsLocating] = useState(false);
  
  const [availableCities, setAvailableCities] = useState<string[]>([]);
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 }); // Relative offset

  useEffect(() => {
    const profiles = profileService.getAllActive();
    setAllProfiles(profiles);
  }, []);

  useEffect(() => {
    if (selectedState) {
      const citiesInState = Array.from(new Set(
        allProfiles
          .filter(p => p.address.state === selectedState)
          .map(p => p.address.city)
      )).sort();
      setAvailableCities(citiesInState);
      setSelectedCity(''); 
      setFilteredProfiles(allProfiles.filter(p => p.address.state === selectedState));

      // Auto-zoom logic simplified for the SVG component
      setZoom(2.5);
      // Rough centering logic based on constants could be added here, 
      // but for now we reset center or keep it neutral to show the highlighted state.
      setCenter({ x: 0, y: 0 });
    } else {
      setAvailableCities([]);
      setFilteredProfiles([]);
      setZoom(1);
      setCenter({ x: 0, y: 0 });
    }
  }, [selectedState, allProfiles]);

  useEffect(() => {
    if (selectedState && selectedCity) {
      setFilteredProfiles(allProfiles.filter(p => 
        p.address.state === selectedState && p.address.city === selectedCity
      ));
    } else if (selectedState) {
       setFilteredProfiles(allProfiles.filter(p => p.address.state === selectedState));
    }
  }, [selectedCity, selectedState, allProfiles]);

  // Calculate counts for map coloring
  const stateCounts = BRAZIL_STATES.reduce((acc, state) => {
    acc[state.value] = allProfiles.filter(p => p.address.state === state.value).length;
    return acc;
  }, {} as Record<string, number>);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.5, 1));
  };
  const handleResetMap = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
    setSelectedState('');
  };

  const handleGeolocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada.");
      return;
    }
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        let closestState = '';
        let minDistance = Infinity;

        BRAZIL_STATES.forEach(state => {
          if (state.geo) {
            const dist = Math.sqrt(
              Math.pow(state.geo.lat - latitude, 2) + 
              Math.pow(state.geo.lng - longitude, 2)
            );
            if (dist < minDistance) {
              minDistance = dist;
              closestState = state.value;
            }
          }
        });

        if (closestState) {
          setSelectedState(closestState);
          setViewMode('map');
        }
        setIsLocating(false);
      },
      (error) => {
        alert("Erro ao obter localização.");
        setIsLocating(false);
      }
    );
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
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <Navigation size={14} className="rotate-90" />
              </div>
            </div>
            
            <div className="relative group">
              <label className="absolute -top-2.5 left-3 bg-white px-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-10 group-focus-within:text-primary">Município</label>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium appearance-none shadow-sm disabled:bg-gray-50 disabled:text-gray-400 hover:border-gray-300"
              >
                <option value="">
                  {availableCities.length > 0 ? 'Selecione a Cidade...' : '---'}
                </option>
                {availableCities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
               <div className="absolute right-4 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-400">
                <MapPin size={14} />
              </div>
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'map' ? (
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-2xl border border-gray-200 relative h-[700px] overflow-hidden shadow-inner">
             {/* Modern Controls */}
             <div className="absolute top-6 left-6 z-30 flex flex-col gap-2 bg-white/90 backdrop-blur border border-gray-200 p-2 shadow-soft rounded-xl">
                <button onClick={handleZoomIn} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors" title="Aproximar"><Plus size={20} /></button>
                <button onClick={handleZoomOut} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors" title="Afastar"><Minus size={20} /></button>
                <div className="h-px bg-gray-200 w-full my-1"></div>
                <button onClick={handleResetMap} className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-700 transition-colors" title="Resetar"><Maximize size={20} /></button>
                <button onClick={handleGeolocation} disabled={isLocating} className={`w-10 h-10 flex items-center justify-center rounded-lg hover:bg-blue-50 text-blue-600 transition-colors ${isLocating ? 'animate-pulse' : ''}`}><LocateFixed size={20} /></button>
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

               {/* Results Overlay */}
               {selectedState && (
                 <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md border border-gray-200 p-6 max-h-[400px] overflow-y-auto shadow-2xl rounded-2xl animate-fade-in-up z-40">
                    <div className="max-w-4xl mx-auto">
                      <div className="flex justify-between items-center mb-6">
                         <div>
                            <h3 className="font-serif text-2xl text-slate-900">{BRAZIL_STATES.find(s => s.value === selectedState)?.label}</h3>
                            <p className="text-gray-500 text-sm">Profissionais nesta região</p>
                         </div>
                         <span className="bg-slate-100 text-slate-800 px-3 py-1 rounded-full text-xs font-bold">{filteredProfiles.length} Encontrados</span>
                      </div>
                      
                      {filteredProfiles.length > 0 ? (
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {filteredProfiles.map(profile => (
                            <Link key={profile.userId} to={`/dentist/${profile.userId}`} className="block p-4 border border-gray-100 rounded-xl hover:border-primary/50 hover:bg-slate-50 transition-all group bg-white shadow-sm">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-slate-200 flex-shrink-0 flex items-center justify-center text-slate-500 overflow-hidden ring-2 ring-white">
                                  {profile.user.avatarUrl ? <img src={profile.user.avatarUrl} className="w-full h-full object-cover" /> : <UserIcon size={20} />}
                                </div>
                                <div className="min-w-0">
                                  <p className="font-serif font-bold text-slate-900 truncate group-hover:text-primary transition-colors">{profile.user.name}</p>
                                  <p className="text-[10px] text-gray-500 uppercase tracking-wider font-medium">CRO: {profile.cro}</p>
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                          <p className="text-gray-500 text-sm">Nenhum profissional cadastrado nesta região ainda.</p>
                        </div>
                      )}
                    </div>
                 </div>
               )}
             </div>
          </div>
        ) : (
          /* List View */
          <div className="max-w-5xl mx-auto">
            {!selectedState ? (
              <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                 <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <MapPin size={32} />
                 </div>
                 <h3 className="text-xl font-serif text-slate-900 mb-2">Selecione uma região</h3>
                 <p className="text-gray-500">Utilize os filtros acima ou a visão de mapa para encontrar especialistas.</p>
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
                 <p className="text-gray-500">Nenhum registro encontrado para os filtros aplicados.</p>
              </div>
            ) : (
              <>
                <div className="mb-8 flex items-end justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h3 className="font-serif text-3xl text-slate-900">
                      {BRAZIL_STATES.find(s => s.value === selectedState)?.label}
                    </h3>
                  </div>
                  <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">{filteredProfiles.length} Especialistas</span>
                </div>
                
                <div className="grid lg:grid-cols-2 gap-8">
                  {filteredProfiles.map((profile) => (
                    <div key={profile.userId} className="bg-white rounded-2xl border border-gray-100 hover:border-primary/30 shadow-soft hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden">
                      <div className="p-8 flex gap-6">
                        <div className="w-24 h-24 rounded-2xl bg-gray-200 flex-shrink-0 overflow-hidden shadow-inner ring-4 ring-white">
                          {profile.user.avatarUrl ? (
                             <img src={profile.user.avatarUrl} alt={profile.user.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center text-gray-400"><UserIcon size={32} /></div>
                          )}
                        </div>
                        
                        <div className="flex-grow min-w-0">
                           <Link to={`/dentist/${profile.userId}`}>
                            <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-primary transition-colors truncate">{profile.user.name}</h3>
                           </Link>
                           
                           <div className="flex flex-wrap gap-2 mt-2 mb-4">
                             <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest">CRO {profile.cro}</span>
                             {profile.isRemoteCapable && (
                               <span className="flex items-center gap-1 text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase tracking-wide">
                                 <Stethoscope size={10} /> Online
                               </span>
                             )}
                           </div>
                           
                           <div className="text-sm text-gray-500 font-medium flex items-center gap-2">
                              <MapPin size={14} className="text-primary" />
                              {profile.address.city}, {profile.address.state}
                           </div>
                        </div>
                      </div>
                      
                      <div className="mt-auto px-8 py-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center">
                         <div className="flex gap-2 overflow-x-auto no-scrollbar">
                            {profile.specialties.slice(0,2).map(s => (
                              <span key={s} className="text-[10px] text-gray-500 bg-white px-2 py-1 rounded border border-gray-200 whitespace-nowrap">{s}</span>
                            ))}
                         </div>
                         <Link to={`/dentist/${profile.userId}`} className="text-primary text-xs font-bold uppercase tracking-widest hover:text-accent transition-colors flex items-center gap-1 whitespace-nowrap ml-4">
                           Ver Perfil <ArrowRight size={12} />
                         </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Locator;
