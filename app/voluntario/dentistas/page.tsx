'use client'

import { useState } from 'react';
import { Heart, MapPin, Phone, Mail, User, Filter, Search } from 'lucide-react';
import Link from 'next/link';

const estados = [
  'Todos', 'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

// Mock data - substituir por dados reais do banco
const pacientesMock = [
  {
    id: 1,
    nome: "Maria Silva",
    telefone: "(11) 98765-4321",
    email: "maria@email.com",
    cidade: "São Paulo",
    estado: "SP",
    descricao: "Preciso de tratamento para DTM, tenho dores frequentes na mandíbula.",
    dataCadastro: "2024-12-01"
  },
  {
    id: 2,
    nome: "João Santos",
    telefone: "(21) 97654-3210",
    email: "joao@email.com",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    descricao: "Necessito de avaliação ortodôntica e possível tratamento.",
    dataCadastro: "2024-12-02"
  },
  {
    id: 3,
    nome: "Ana Costa",
    telefone: "(11) 96543-2109",
    email: "ana@email.com",
    cidade: "Campinas",
    estado: "SP",
    descricao: "Dores de cabeça constantes, suspeita de bruxismo.",
    dataCadastro: "2024-12-03"
  },
  {
    id: 4,
    nome: "Pedro Oliveira",
    telefone: "(31) 95432-1098",
    email: "pedro@email.com",
    cidade: "Belo Horizonte",
    estado: "MG",
    descricao: "Preciso de tratamento periodontal.",
    dataCadastro: "2024-12-04"
  }
];

export default function DentistasVoluntarioPage() {
  const [estadoSelecionado, setEstadoSelecionado] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const pacientesFiltrados = pacientesMock.filter(paciente => {
    const matchEstado = estadoSelecionado === 'Todos' || paciente.estado === estadoSelecionado;
    const matchSearch = paciente.cidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       paciente.nome.toLowerCase().includes(searchTerm.toLowerCase());
    return matchEstado && matchSearch;
  });

  return (
    <div className="flex flex-col bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Pacientes Buscando Atendimento</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Visualize pacientes cadastrados e ofereça atendimento voluntário em sua região.
          </p>
        </div>
      </div>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4 items-center">
              {/* Search */}
              <div className="relative flex-1 w-full">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar por cidade ou nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                />
              </div>

              {/* Estado Filter */}
              <div className="flex items-center gap-2 w-full md:w-auto">
                <Filter size={18} className="text-gray-500" />
                <select
                  value={estadoSelecionado}
                  onChange={(e) => setEstadoSelecionado(e.target.value)}
                  className="flex-1 md:w-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition"
                >
                  {estados.map(estado => (
                    <option key={estado} value={estado}>{estado}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-sm text-gray-600">
              {pacientesFiltrados.length} {pacientesFiltrados.length === 1 ? 'paciente encontrado' : 'pacientes encontrados'}
            </div>
          </div>
        </div>
      </section>

      {/* Patients List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {pacientesFiltrados.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-serif text-gray-900 mb-2">Nenhum paciente encontrado</h3>
                <p className="text-gray-600">Tente ajustar os filtros de busca.</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {pacientesFiltrados.map(paciente => (
                  <div key={paciente.id} className="bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 p-8 group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                          <User size={24} />
                        </div>
                        <div>
                          <h3 className="text-xl font-serif text-slate-900">{paciente.nome}</h3>
                          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                            <MapPin size={14} />
                            <span>{paciente.cidade}, {paciente.estado}</span>
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        {paciente.estado}
                      </span>
                    </div>

                    {/* Description */}
                    {paciente.descricao && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                        <p className="text-sm text-gray-700 leading-relaxed font-light">
                          {paciente.descricao}
                        </p>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-gray-700">
                        <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                          <Phone size={14} />
                        </div>
                        <a href={`tel:${paciente.telefone}`} className="hover:text-primary transition font-medium">
                          {paciente.telefone}
                        </a>
                      </div>
                      
                      {paciente.email && (
                        <div className="flex items-center gap-3 text-gray-700">
                          <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center shrink-0">
                            <Mail size={14} />
                          </div>
                          <a href={`mailto:${paciente.email}`} className="hover:text-primary transition truncate font-medium">
                            {paciente.email}
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-light">
                        Cadastrado em {new Date(paciente.dataCadastro).toLocaleDateString('pt-BR')}
                      </span>
                      <a
                        href={`https://wa.me/${paciente.telefone.replace(/\D/g, '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary hover:bg-primary-light text-white text-sm font-bold px-4 py-2 rounded-lg transition-all"
                      >
                        <Phone size={14} />
                        Contatar
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 bg-paper">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-serif text-slate-900 mb-6">
              Como funciona o atendimento voluntário?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Escolha um Paciente</h3>
                <p className="text-gray-600 text-sm font-light">
                  Visualize os pacientes cadastrados em sua região
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Entre em Contato</h3>
                <p className="text-gray-600 text-sm font-light">
                  Use telefone ou e-mail para agendar uma avaliação
                </p>
              </div>
              
              <div className="bg-white p-6 rounded-2xl shadow-soft border border-gray-100">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Realize o Atendimento</h3>
                <p className="text-gray-600 text-sm font-light">
                  Ofereça atendimento gratuito como forma de aprendizado
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4 text-center">
          <Link href="/voluntario" className="text-gray-600 hover:text-teal-600 transition text-sm">
            ← Voltar para Atendimento Voluntário
          </Link>
        </div>
      </section>
    </div>
  );
}
