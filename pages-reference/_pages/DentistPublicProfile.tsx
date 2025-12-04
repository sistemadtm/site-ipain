import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { profileService } from '../services/storage';
import { DentistProfile, User } from '../types';
import { MapPin, Phone, MessageCircle, Globe, Linkedin, ArrowLeft, GraduationCap, Award, FileText } from 'lucide-react';

const DentistPublicProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profile, setProfile] = useState<(DentistProfile & { user: User }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const data = profileService.getFullProfile(id);
      setProfile(data);
      setLoading(false);
    }
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-serif text-primary">Carregando dados do especialista...</div>;

  if (!profile || !profile.user.isActive) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <h2 className="font-serif text-2xl text-slate-900 mb-2">Profissional não localizado</h2>
        <Link to="/locator" className="text-primary hover:underline uppercase text-xs font-bold tracking-widest">Retornar à busca</Link>
      </div>
    );
  }

  return (
    <div className="bg-paper min-h-screen pb-20">
      {/* Header Profile - Formal */}
      <div className="bg-white border-b border-gray-200 pt-16 pb-12">
        <div className="container mx-auto px-4">
          <Link to="/locator" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary mb-8 transition-colors text-[10px] uppercase tracking-widest font-bold">
            <ArrowLeft size={12} /> Voltar para o diretório
          </Link>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-40 h-40 md:w-56 md:h-56 bg-gray-200 border-4 border-white shadow-lg flex-shrink-0 overflow-hidden relative">
              <img 
                src={profile.user.avatarUrl || `https://ui-avatars.com/api/?name=${profile.user.name}&background=0f5156&color=fff`} 
                alt={profile.user.name} 
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-500"
              />
            </div>

            <div className="flex-grow pt-2">
              <div className="flex items-center gap-3 mb-2">
                 <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">Membro Credenciado</span>
                 {profile.isRemoteCapable && <span className="text-primary border border-primary text-[10px] font-bold px-2 py-0.5 uppercase tracking-widest">Atendimento Online</span>}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif text-slate-900 mb-2">{profile.user.name}</h1>
              <p className="text-gray-500 font-light text-lg mb-6">Cirurgião-Dentista | CRO: {profile.cro}</p>
              
              <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-100 max-w-2xl">
                {profile.whatsapp && (
                  <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 hover:bg-slate-800 transition text-sm font-bold uppercase tracking-wider">
                    <MessageCircle size={16} /> Agendar Consulta
                  </a>
                )}
                <div className="flex items-center gap-2 border border-gray-300 px-6 py-3 text-gray-700 text-sm font-medium">
                  <Phone size={16} /> {profile.phone}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 grid md:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="md:col-span-8 space-y-12">
          <section>
            <h2 className="text-2xl font-serif text-slate-900 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
              <GraduationCap className="text-primary" size={24} />
              Biografia Profissional
            </h2>
            <div className="prose prose-slate max-w-none text-gray-600 font-light text-justify leading-relaxed">
               {profile.bio.split('\n').map((line, i) => (
                 <p key={i} className="mb-4">{line}</p>
               ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-slate-900 mb-6 flex items-center gap-2 border-b border-gray-200 pb-2">
              <Award className="text-primary" size={24} />
              Especialidades Clínicas
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {profile.specialties.map(spec => (
                <div key={spec} className="flex items-start gap-3 p-4 border border-gray-200 bg-white">
                  <div className="mt-1 w-2 h-2 bg-primary rounded-full"></div>
                  <span className="font-medium text-slate-800">{spec}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Info */}
        <div className="md:col-span-4 space-y-8">
          <div className="bg-white p-6 border border-gray-200 shadow-sm">
            <h3 className="font-serif text-lg text-slate-900 mb-4">Localização</h3>
            <div className="space-y-4 text-sm text-gray-600">
               <div className="flex gap-3">
                 <MapPin size={18} className="text-primary flex-shrink-0" />
                 <div>
                   <p className="font-bold text-slate-900">{profile.address.street}</p>
                   <p>{profile.address.city}, {profile.address.state}</p>
                   <p>{profile.address.zipCode}</p>
                 </div>
               </div>
               <div className="bg-slate-100 h-40 w-full flex items-center justify-center border border-gray-300">
                  <span className="text-xs text-gray-500 uppercase">Mapa Indisponível</span>
               </div>
            </div>
          </div>

          <div className="bg-white p-6 border border-gray-200 shadow-sm">
             <h3 className="font-serif text-lg text-slate-900 mb-4">Presença Digital</h3>
             <div className="space-y-3">
                {profile.socials?.linkedin && (
                  <a href={`https://${profile.socials.linkedin}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition border-b border-gray-100 pb-2">
                    <Linkedin size={16} /> <span className="text-sm">Perfil Profissional</span>
                  </a>
                )}
                 {profile.socials?.website && (
                  <a href={profile.socials.website} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition border-b border-gray-100 pb-2">
                    <Globe size={16} /> <span className="text-sm">Website</span>
                  </a>
                )}
                 {profile.socials?.instagram && (
                  <a href={`https://instagram.com/${profile.socials.instagram}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-gray-600 hover:text-primary transition">
                    <span className="font-bold">Ig.</span> <span className="text-sm">{profile.socials.instagram}</span>
                  </a>
                )}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DentistPublicProfile;