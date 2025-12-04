'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MapPin, User as UserIcon, ArrowRight, Filter, LayoutList, Map as MapIcon, Plus, Minus, Maximize, LocateFixed, Navigation, Stethoscope } from 'lucide-react';
import { BrazilianMap } from '@/components/BrazilianMap';

// Mock data - você pode substituir por dados reais depois
const BRAZIL_STATES = [
  { value: 'SP', label: 'São Paulo', geo: { lat: -23.5505, lng: -46.6333 } },
  { value: 'RJ', label: 'Rio de Janeiro', geo: { lat: -22.9068, lng: -43.1729 } },
  { value: 'MG', label: 'Minas Gerais', geo: { lat: -19.9167, lng: -43.9345 } },
  // Adicione mais estados conforme necessário
];

export default function Locator() {
  const [selectedState, setSelectedState] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [zoom, setZoom] = useState(1);
  const [center, setCenter] = useState({ x: 0, y: 0 });

  // Mock data
  const allProfiles: any[] = [];
  const filteredProfiles: any[] = [];
  const availableCities: string[] = [];
  const stateCounts: Record<string, number> = {};

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 5));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  const handleResetMap = () => {
    setZoom(1);
    setCenter({ x: 0, y: 0 });
    setSelectedState('');
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
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full p-4 bg-white border border-gray-200 rounded-xl text-gray-700 focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium appearance-none shadow-sm disabled:bg-gray-50 disabled:text-gray-400"
              >
                <option value="">Selecione a Cidade...</option>
              </select>
            </div>
          </div>
        </div>

        {/* View Content */}
        {viewMode === 'map' ? (
          <div className="max-w-5xl mx-auto bg-slate-50 rounded-2xl border border-gray-200 relative h-[700px] overflow-hidden shadow-inner">
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
        ) : (
          <div className="max-w-5xl mx-auto">
            <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
               <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
                  <MapPin size={32} />
               </div>
               <h3 className="text-xl font-serif text-slate-900 mb-2">Selecione uma região</h3>
               <p className="text-gray-500">Utilize os filtros acima ou a visão de mapa para encontrar especialistas.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
