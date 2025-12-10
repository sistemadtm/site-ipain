'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MapPin, BookOpen, LogIn, Menu, X, User as UserIcon, LogOut, GraduationCap, ChevronRight, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

interface UserType {
  name: string;
  email: string;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const router = useRouter();

  // Mock user - você pode substituir por contexto/estado global depois
  const user = null as UserType | null;

  const handleLogout = () => {
    // userService.logout();
    router.push('/');
  };


  return (
    <div className="min-h-screen flex flex-col font-sans bg-paper">
      
      {/* Floating Modern Header */}
      <header className="fixed w-full top-0 z-50 transition-all duration-300 border-b border-slate-800 h-20 flex items-center bg-slate-900/95 backdrop-blur-md shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500 bg-primary text-white shadow-lg shadow-primary/30">
                <GraduationCap size={22} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif font-bold text-xl leading-none tracking-tight transition-colors text-white">
                  Instituto<span className="text-accent">.</span>
                </span>
                <span className="text-[10px] uppercase tracking-[0.2em] mt-1 transition-colors text-gray-300">
                  Indicador Profissional
                </span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/" className="flex items-center gap-2 px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 text-gray-300 hover:text-white">
                Início
              </Link>
              <Link href="/dentistas" className="flex items-center gap-2 px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 text-gray-300 hover:text-white">
                Rede Credenciada
              </Link>
              <Link href="/blog" className="flex items-center gap-2 px-3 py-2 text-sm font-bold tracking-wide transition-all duration-300 text-gray-300 hover:text-white">
                Blog
              </Link>
              
              <div className="h-6 w-px mx-2 bg-slate-700"></div>

              {user ? (
                <div className="flex items-center gap-4 pl-2">
                  <Link href="/dashboard" className="flex items-center gap-3 group text-white">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
                      <UserIcon size={16} />
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-xs font-bold uppercase tracking-wide group-hover:text-accent transition-colors">{user.name.split(' ')[0]}</span>
                      <span className="text-[9px] opacity-70 uppercase tracking-wider">Painel</span>
                    </div>
                  </Link>
                </div>
              ) : (
                <Link 
                  href="/entrar" 
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all bg-white/10 backdrop-blur-md text-white border border-white/30 hover:bg-white hover:text-slate-900"
                >
                  <LogIn size={14} />
                  <span>Área do Aluno</span>
                </Link>
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-lg transition-colors text-white hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 z-40 bg-slate-900/95 backdrop-blur-md md:hidden animate-fade-in-up">
          <div className="flex flex-col h-full p-6 overflow-y-auto pb-20">
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="flex items-center justify-between text-gray-200 hover:text-accent hover:bg-white/5 p-4 rounded-xl border-b border-white/5 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center gap-4 font-bold"><Home size={20} /> Início</span> <ChevronRight size={16} />
              </Link>
              <Link href="/dentistas" className="flex items-center justify-between text-gray-200 hover:text-accent hover:bg-white/5 p-4 rounded-xl border-b border-white/5 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center gap-4 font-bold"><MapPin size={20} /> Rede Credenciada</span> <ChevronRight size={16} />
              </Link>
              <Link href="/blog" className="flex items-center justify-between text-gray-200 hover:text-accent hover:bg-white/5 p-4 rounded-xl border-b border-white/5 transition-all" onClick={() => setIsMobileMenuOpen(false)}>
                <span className="flex items-center gap-4 font-bold"><BookOpen size={20} /> Blog</span> <ChevronRight size={16} />
              </Link>
            </nav>
            
            <div className="mt-8 pt-8 border-t border-white/10">
              {user ? (
                <div className="bg-white/5 rounded-2xl p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-serif">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                       <p className="text-white font-bold text-lg leading-tight">{user.name}</p>
                       <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  <Link href="/dashboard" className="block w-full text-center bg-primary hover:bg-primary-light text-white py-4 rounded-xl font-bold uppercase tracking-wider mb-3 transition-colors shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                    Acessar Meu Painel
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }}
                    className="flex items-center justify-center gap-2 w-full text-center text-red-400 py-3 text-sm font-medium hover:text-red-300 transition-colors hover:bg-white/5 rounded-lg"
                  >
                    <LogOut size={16} /> Sair da conta
                  </button>
                </div>
              ) : (
                <Link href="/entrar" className="flex items-center justify-center gap-2 w-full text-center bg-white text-slate-900 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                  <LogIn size={18} /> Área do Aluno
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-0">
        {children}
      </main>

      <footer className="bg-slate-900 text-gray-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-12">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3 text-white">
                <GraduationCap size={28} className="text-accent" />
                <span className="font-serif font-bold text-2xl">Instituto Indicador</span>
              </div>
              <p className="max-w-md text-gray-500 leading-relaxed font-light">
                Rede de excelência dedicada à Dor Orofacial. Conectando ciência, profissionais e pacientes através de tecnologia e humanização.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-serif mb-6 text-lg border-l-2 border-accent pl-3">Plataforma</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href="/dentistas" className="hover:text-white transition-colors block py-1">Rede Credenciada</Link></li>
                <li><Link href="/blog" className="hover:text-white transition-colors block py-1">Blog</Link></li>
                <li><Link href="/entrar" className="hover:text-white transition-colors block py-1">Portal do Membro</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-serif mb-6 text-lg border-l-2 border-accent pl-3">Legal</h4>
              <ul className="space-y-3 text-sm font-medium">
                <li><Link href="/termos" className="hover:text-white transition-colors block py-1">Termos de Uso</Link></li>
                <li><Link href="/privacidade" className="hover:text-white transition-colors block py-1">Privacidade</Link></li>
                <li><Link href="/contato" className="hover:text-white transition-colors block py-1">Contato</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-600 font-bold uppercase tracking-wider">
            <p>&copy; {new Date().getFullYear()} Instituto Indicador Profissional.</p>
            <div className="flex gap-4 mt-4 md:mt-0 opacity-50 hover:opacity-100 transition-opacity">
               <span>Desenvolvido com excelência</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;