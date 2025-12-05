import { Heart, MapPin, GraduationCap, Users, Phone, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Atendimento Voluntário - Instituto Indicador",
  description: "Conecte-se com dentistas voluntários ou encontre centros de atendimento odontológico gratuito em todo o Brasil.",
};

// Mock data - substituir por dados reais do banco
const centrosAtendimento = [
  {
    id: 1,
    nome: "Faculdade de Odontologia USP",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Av. Prof. Lineu Prestes, 2227 - Cidade Universitária",
    telefone: "(11) 3091-7800",
    email: "atendimento@fo.usp.br",
    especialidades: ["DTM", "Dor Orofacial", "Ortodontia", "Periodontia"],
    horario: "Segunda a Sexta, 8h às 17h"
  },
  {
    id: 2,
    nome: "UFRJ - Faculdade de Odontologia",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    endereco: "Av. Carlos Chagas Filho, 373 - Cidade Universitária",
    telefone: "(21) 3938-2000",
    email: "clinica@odonto.ufrj.br",
    especialidades: ["DTM", "Cirurgia", "Endodontia"],
    horario: "Segunda a Sexta, 7h às 18h"
  },
  {
    id: 3,
    nome: "UFMG - Faculdade de Odontologia",
    cidade: "Belo Horizonte",
    estado: "MG",
    endereco: "Av. Antônio Carlos, 6627 - Pampulha",
    telefone: "(31) 3409-2430",
    email: "clinica@odonto.ufmg.br",
    especialidades: ["DTM", "Prótese", "Implantodontia"],
    horario: "Segunda a Sexta, 8h às 17h"
  }
];

export default function VoluntarioPage() {
  return (
    <div className="flex flex-col bg-paper min-h-screen">
      {/* Hero Section */}
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-widest mb-6">
            <Heart size={14} className="inline mr-2" />
            Atendimento Social
          </div>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Atendimento Voluntário</h1>
          <p className="text-gray-400 font-light text-xl max-w-2xl mx-auto">
            Conectando pacientes que precisam de atendimento odontológico com profissionais voluntários e centros de atendimento gratuito.
          </p>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card Pacientes */}
          <Link href="/voluntario/pacientes" className="group">
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Users size={32} />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Sou Paciente</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-light">
                Cadastre-se para receber atendimento voluntário de dentistas qualificados em sua região.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Cadastrar-se <ArrowRight size={14} />
              </span>
            </div>
          </Link>

          {/* Card Dentistas */}
          <Link href="/voluntario/dentistas" className="group">
            <div className="bg-white p-10 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 h-full">
              <div className="w-16 h-16 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-teal-600 group-hover:text-white transition-colors">
                <Heart size={32} />
              </div>
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Sou Dentista</h2>
              <p className="text-gray-600 leading-relaxed mb-6 font-light">
                Visualize pacientes cadastrados por estado e ofereça atendimento voluntário.
              </p>
              <span className="inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-widest group-hover:gap-3 transition-all">
                Ver Pacientes <ArrowRight size={14} />
              </span>
            </div>
          </Link>
        </div>
      </div>

      {/* Centros de Atendimento */}
      <section className="py-20 bg-paper">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <GraduationCap size={14} className="inline mr-2" />
              Instituições Parceiras
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">
              Centros de Atendimento Gratuito
            </h2>
            <p className="text-gray-500 font-light text-lg max-w-2xl mx-auto">
              Universidades e instituições que oferecem atendimento odontológico gratuito em todo o Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {centrosAtendimento.map(centro => (
              <div key={centro.id} className="bg-white p-8 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center group-hover:bg-teal-600 group-hover:text-white transition-colors">
                    <GraduationCap size={24} />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                    {centro.estado}
                  </span>
                </div>
                
                <h3 className="text-xl font-serif text-slate-900 mb-2 leading-tight">
                  {centro.nome}
                </h3>
                
                <div className="flex items-start gap-2 text-gray-600 text-sm mb-4">
                  <MapPin size={16} className="mt-0.5 shrink-0" />
                  <span>{centro.cidade}, {centro.estado}</span>
                </div>
                
                <p className="text-gray-600 text-sm mb-4 leading-relaxed font-light">
                  {centro.endereco}
                </p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Phone size={14} className="shrink-0" />
                    <span>{centro.telefone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <Mail size={14} className="shrink-0" />
                    <span className="truncate">{centro.email}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <p className="text-xs text-gray-500 font-medium mb-2 uppercase tracking-widest">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {centro.especialidades.map((esp, idx) => (
                      <span key={idx} className="text-xs bg-teal-50 text-teal-700 px-2 py-1 rounded-full font-medium">
                        {esp}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs text-gray-500 font-light">
                    <span className="font-medium">Horário:</span> {centro.horario}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-900"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Quer adicionar sua instituição?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-lg font-light">
            Se sua universidade ou instituição oferece atendimento gratuito, entre em contato para ser listado.
          </p>
          <Link 
            href="/contato"
            className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-slate-900 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-sm transition-all shadow-glow hover:scale-105 transform duration-300"
          >
            <Mail size={18} />
            Entrar em Contato
          </Link>
        </div>
      </section>
    </div>
  );
}
