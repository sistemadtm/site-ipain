import { MapPin, Phone, Mail, Globe, Award, CheckCircle, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

// Mock data - você pode substituir por dados reais depois
interface Dentist {
  id: string;
  name: string;
  cro: string;
  avatarUrl: string;
  specialties: string[];
  bio: string;
  education: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  phone: string;
  email: string;
  website: string;
  isRemoteCapable: boolean;
  rating: number;
  reviewCount: number;
}

const getDentistById = (id: string): Dentist | null => {
  const dentists: Record<string, Dentist> = {
    '1': {
      id: '1',
      name: 'Dra. Ana Silva',
      cro: 'SP-12345',
      avatarUrl: 'https://ui-avatars.com/api/?name=Ana+Silva&size=200&background=0d9488&color=fff',
      specialties: ['DTM', 'Dor Orofacial', 'Odontologia do Sono'],
      bio: 'Especialista em Dor Orofacial com mais de 15 anos de experiência. Mestre em DTM pela USP e membro ativo da Sociedade Brasileira de Dor Orofacial.',
      education: [
        'Doutorado em Dor Orofacial - USP',
        'Mestrado em DTM - USP',
        'Especialização em Dor Orofacial - UNIFESP'
      ],
      address: {
        street: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100'
      },
      phone: '(11) 98765-4321',
      email: 'ana.silva@clinica.com.br',
      website: 'www.draanasilva.com.br',
      isRemoteCapable: true,
      rating: 4.9,
      reviewCount: 127
    }
  };
  
  return dentists[id] || null;
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const dentist = getDentistById(params.id);
  
  if (!dentist) {
    return {
      title: 'Profissional não encontrado',
    };
  }
  
  return {
    title: `${dentist.name} - ${dentist.cro} | Instituto Indicador`,
    description: dentist.bio,
  };
}

export default function DentistProfile({ params }: { params: { id: string } }) {
  const dentist = getDentistById(params.id);
  
  if (!dentist) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Profissional não encontrado</h1>
          <Link href="/locator" className="text-primary hover:text-accent transition-colors">
            Voltar para o localizador
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-800"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-noise.png')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <Link 
            href="/locator"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            Voltar para o localizador
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-16 relative z-20 pb-20">
        <div className="max-w-5xl mx-auto">
          {/* Profile Card */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row gap-8 items-start">
                {/* Avatar */}
                <div className="shrink-0">
                  <img 
                    src={dentist.avatarUrl} 
                    alt={dentist.name}
                    className="w-32 h-32 rounded-2xl shadow-lg ring-4 ring-white"
                  />
                </div>
                
                {/* Info */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl md:text-4xl font-serif text-slate-900 mb-2">{dentist.name}</h1>
                      <div className="flex items-center gap-3 text-gray-500">
                        <span className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-bold">
                          CRO {dentist.cro}
                        </span>
                        {dentist.isRemoteCapable && (
                          <span className="bg-teal-50 text-teal-700 px-3 py-1 rounded-full text-sm font-bold">
                            Atendimento Online
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-xl">
                      <Star size={20} className="text-amber-500 fill-amber-500" />
                      <span className="font-bold text-slate-900">{dentist.rating}</span>
                      <span className="text-gray-500 text-sm">({dentist.reviewCount})</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 leading-relaxed mb-6">{dentist.bio}</p>
                  
                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {dentist.specialties.map((specialty: string) => (
                      <span 
                        key={specialty}
                        className="bg-primary/10 text-primary px-4 py-2 rounded-lg text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                  
                  {/* Contact Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <a 
                      href={`tel:${dentist.phone}`}
                      className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-light text-white rounded-lg font-bold transition-colors"
                    >
                      <Phone size={18} />
                      Ligar
                    </a>
                    <a 
                      href={`mailto:${dentist.email}`}
                      className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-bold transition-colors"
                    >
                      <Mail size={18} />
                      E-mail
                    </a>
                    {dentist.website && (
                      <a 
                        href={`https://${dentist.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 rounded-lg font-bold transition-colors"
                      >
                        <Globe size={18} />
                        Website
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-8">
            {/* Education */}
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Award size={24} />
                </div>
                <h2 className="text-2xl font-serif text-slate-900">Formação</h2>
              </div>
              
              <ul className="space-y-4">
                {dentist.education.map((edu: string, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary shrink-0 mt-0.5" />
                    <span className="text-gray-600">{edu}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl shadow-soft p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center">
                  <MapPin size={24} />
                </div>
                <h2 className="text-2xl font-serif text-slate-900">Localização</h2>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600">{dentist.address.street}</p>
                  <p className="text-gray-600">
                    {dentist.address.city}, {dentist.address.state}
                  </p>
                  <p className="text-gray-600">CEP: {dentist.address.zipCode}</p>
                </div>
                
                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-gray-600 mb-2">
                    <Phone size={16} />
                    <span>{dentist.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={16} />
                    <span className="break-all">{dentist.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="mt-8 bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl p-8 border border-primary/20">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <CheckCircle size={32} className="text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-serif text-slate-900 mb-1">Profissional Verificado</h3>
                <p className="text-gray-600">
                  Este profissional foi verificado e credenciado pelo Instituto Indicador, 
                  atendendo aos mais altos padrões de qualificação em Dor Orofacial.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
