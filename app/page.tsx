import { Search, ShieldCheck, BookOpen, Map, ArrowRight, UserCheck, Star } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Início - Indicador DTM",
  description: "Encontre dentistas especializados em
  description: "Encontre profissionais qualificados e verificados em todo o Brasil. Plataforma confiável para conectar você aos melhores especialistas.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Minimalista */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">IP</span>
              </div>
              <span className="font-semibold text-slate-900 text-lg hidden sm:block">
                Indicador Profissional
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/localizador" className="text-sm text-gray-600 hover:text-slate-900 transition font-medium">
                Localizador
              </Link>
              <Link href="/blog" className="text-sm text-gray-600 hover:text-slate-900 transition font-medium">
                Blog
              </Link>
              <Link href="/login">
                <Button variant="outline" size="sm" className="rounded-full">
                  Área do Profissional
                </Button>
              </Link>
            </nav>

            <button className="md:hidden p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section - Minimalista */}
      <section className="pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-full text-sm text-slate-600 mb-8 border border-slate-100">
              <CheckCircle2 size={16} className="text-slate-900" />
              <span>Profissionais verificados e qualificados</span>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight leading-tight">
              Encontre o profissional
              <span className="block text-slate-600">certo para você</span>
            </h1>

            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Conectamos você aos melhores especialistas qualificados em todo o Brasil.
              Simples, rápido e confiável.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/localizador">
                <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white rounded-full px-8 h-14 text-base font-medium shadow-lg shadow-slate-900/10">
                  <Search size={20} className="mr-2" />
                  Buscar Profissionais
                </Button>
              </Link>
              <Link href="/blog">
                <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-base font-medium border-2">
                  Saiba Mais
                  <ArrowRight size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-gray-100 bg-slate-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">500+</div>
              <div className="text-sm text-gray-600">Profissionais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">27</div>
              <div className="text-sm text-gray-600">Estados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">100%</div>
              <div className="text-sm text-gray-600">Verificados</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-slate-900 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Disponível</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Minimalista */}
      <section className="py-24 lg:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight">
              Por que escolher o Indicador?
            </h2>
            <p className="text-lg text-gray-600">
              Uma plataforma confiável que conecta pessoas aos profissionais certos
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Verificação Rigorosa
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Todos os profissionais passam por um processo de verificação completo de credenciais e qualificações.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Busca Inteligente
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Encontre profissionais próximos a você com nosso sistema de busca por localização.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                Perfis Completos
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Acesse informações detalhadas sobre especialidades, experiência e formas de contato.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
              Você é um profissional?
            </h2>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
              Cadastre-se gratuitamente e seja encontrado por milhares de pessoas que procuram seus serviços.
            </p>
            <Link href="/login">
              <Button size="lg" className="bg-white hover:bg-gray-100 text-slate-900 rounded-full px-8 h-14 text-base font-medium">
                Cadastrar Meu Perfil
                <ArrowRight size={20} className="ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Minimalista */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">IP</span>
                </div>
                <span className="font-semibold text-slate-900 text-lg">
                  Indicador Profissional
                </span>
              </div>
              <p className="text-gray-600 text-sm max-w-sm">
                Conectando pessoas aos melhores profissionais qualificados em todo o Brasil.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Navegação</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/localizador" className="text-gray-600 hover:text-slate-900 transition">Localizador</Link></li>
                <li><Link href="/blog" className="text-gray-600 hover:text-slate-900 transition">Blog</Link></li>
                <li><Link href="/login" className="text-gray-600 hover:text-slate-900 transition">Login</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-900 mb-4 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-600 hover:text-slate-900 transition">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-600 hover:text-slate-900 transition">Privacidade</a></li>
                <li><a href="#" className="text-gray-600 hover:text-slate-900 transition">Contato</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © 2024 Indicador Profissional. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-slate-900 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-slate-900 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-slate-900 transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
