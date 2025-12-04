'use client';

import { User, Settings, FileText, MapPin } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="bg-paper min-h-screen py-20">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-4">Painel do Profissional</h1>
            <p className="text-gray-500 text-lg">Gerencie seu perfil e informações</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                <User size={24} />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2">Meu Perfil</h3>
              <p className="text-gray-500 text-sm">Atualize suas informações pessoais</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                <MapPin size={24} />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2">Localização</h3>
              <p className="text-gray-500 text-sm">Gerencie seus endereços</p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-soft hover:shadow-xl transition-all">
              <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                <Settings size={24} />
              </div>
              <h3 className="text-xl font-serif text-slate-900 mb-2">Configurações</h3>
              <p className="text-gray-500 text-sm">Ajuste suas preferências</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
