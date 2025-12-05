import { Search, ShieldCheck, BookOpen, UserCheck, ChevronRight, Award, MapPin, Heart, Users, GraduationCap } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Início - Instituto Indicador",
  description: "A plataforma definitiva que conecta pacientes a especialistas certificados em Dor Orofacial. Excelência clínica validada.",
};

export default function Home() {
  // Mock data - você pode substituir por dados reais depois
  const latestPosts = [
    {
      id: 1,
      slug: 'dtm-diagnostico',
      title: 'DTM: Diagnóstico e Tratamento',
      summary: 'Entenda os principais métodos de diagnóstico e tratamento para DTM.',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800',
      category: 'DTM',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      slug: 'dor-orofacial',
      title: 'Dor Orofacial: Abordagem Multidisciplinar',
      summary: 'A importância da abordagem multidisciplinar no tratamento da dor orofacial.',
      imageUrl: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800',
      category: 'Dor Orofacial',
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      slug: 'sono-saude',
      title: 'Sono e Saúde Bucal',
      summary: 'Como a qualidade do sono impacta a saúde bucal e vice-versa.',
      imageUrl: 'https://images.unsplash.com/photo-1541480601022-2308c0f02487?w=800',
      category: 'Sono',
      createdAt: new Date().toISOString()
    }
  ];

  return (
    <div className="flex flex-col bg-paper">
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center bg-slate-900 overflow-hidden pt-20">
        {/* Abstract Modern Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-primary opacity-20 blur-[150px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-accent opacity-10 blur-[120px] rounded-full"></div>
        
        <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-accent text-xs font-bold uppercase tracking-widest mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Referência Nacional em DTM
            </div>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-8 leading-[1.1]">
              Ciência e <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500">Cuidado.</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-xl font-light leading-relaxed">
              A plataforma definitiva que conecta pacientes a especialistas certificados em Dor Orofacial. Excelência clínica validada.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/locator" 
                className="group relative px-8 py-4 bg-white text-slate-900 rounded-lg font-bold uppercase tracking-wide overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1"
              >
                <span className="relative z-10 flex items-center gap-3 justify-center">
                   Localizar Especialista <Search size={18} />
                </span>
              </Link>
              <Link 
                href="/blog" 
                className="px-8 py-4 bg-transparent border border-gray-700 text-gray-300 rounded-lg font-bold uppercase tracking-wide hover:border-white hover:text-white transition-colors text-center"
              >
                Acessar Blog
              </Link>
            </div>
          </div>

          {/* Abstract Interactive Element */}
          <div className="hidden lg:block relative animate-float">
             <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl max-w-md ml-auto">
                <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-white font-serif text-2xl">Instituto Indicador</p>
                    <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">Status da Rede</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-accent">
                        <MapPin size={24} />
                     </div>
                     <div>
                        <p className="text-white font-bold text-lg">26 Estados</p>
                        <p className="text-gray-500 text-sm">Cobertura Nacional</p>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-teal-400">
                        <UserCheck size={24} />
                     </div>
                     <div>
                        <p className="text-white font-bold text-lg">Certificação</p>
                        <p className="text-gray-500 text-sm">Profissionais Verificados</p>
                     </div>
                  </div>

                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center text-purple-400">
                        <BookOpen size={24} />
                     </div>
                     <div>
                        <p className="text-white font-bold text-lg">Educação</p>
                        <p className="text-gray-500 text-sm">Base Científica</p>
                     </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10">
                   <div className="flex -space-x-3">
                      <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://ui-avatars.com/api/?name=Dr+A&background=random" alt=""/>
                      <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://ui-avatars.com/api/?name=Dr+B&background=random" alt=""/>
                      <img className="w-10 h-10 rounded-full border-2 border-slate-800" src="https://ui-avatars.com/api/?name=Dr+C&background=random" alt=""/>
                      <div className="w-10 h-10 rounded-full border-2 border-slate-800 bg-slate-700 flex items-center justify-center text-white text-xs font-bold">+100</div>
                   </div>
                </div>
             </div>
             
             {/* Decorative Elements */}
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent rounded-full opacity-20 blur-xl"></div>
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-primary rounded-full opacity-20 blur-xl"></div>
          </div>
        </div>
      </section>

      {/* Modern Features Grid */}
      <section className="py-24 bg-paper relative z-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-primary font-bold uppercase tracking-widest text-xs mb-3 block">Excelência Integrada</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Padrão Ouro em Odontologia</h2>
            <p className="text-gray-500 font-light text-lg">Nossa metodologia une a mais alta qualificação técnica com protocolos humanizados.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Rigor Técnico</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Credenciamento exclusivo para profissionais com pós-graduação comprovada e atuação destacada em DTM.
              </p>
            </div>
            
            <div className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-amber-600 group-hover:text-white transition-colors duration-300">
                <Award size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Protocolos Validados</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Utilização de diretrizes internacionais para diagnóstico preciso e tratamentos minimamente invasivos.
              </p>
            </div>
            
            <div className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <BookOpen size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Atualização Constante</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Corpo clínico conectado às últimas pesquisas e inovações tecnológicas no campo da dor orofacial.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Voluntary Care Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-teal-600 font-bold uppercase tracking-widest text-xs mb-3 block">Atendimento Social</span>
            <h2 className="text-4xl md:text-5xl font-serif text-slate-900 mb-6">Atendimento Voluntário</h2>
            <p className="text-gray-500 font-light text-lg">
              Conectamos pacientes que precisam de atendimento odontológico com profissionais voluntários e centros de atendimento gratuito em todo o Brasil.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Link href="/voluntario/pacientes" className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                <Users size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Para Pacientes</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Cadastre-se para receber atendimento voluntário de dentistas qualificados em sua região.
              </p>
            </Link>
            
            <Link href="/voluntario/dentistas" className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                <Heart size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Para Dentistas</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Visualize pacientes cadastrados por estado e ofereça atendimento voluntário.
              </p>
            </Link>
            
            <Link href="/voluntario" className="group bg-white p-10 rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 border border-gray-100">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-8 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-2xl font-serif text-slate-900 mb-4">Centros de Atendimento</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Encontre universidades e instituições que oferecem atendimento gratuito em todo o Brasil.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* Modern CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-slate-900"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
             <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">É especialista em Dor Orofacial?</h2>
             <p className="text-gray-300 font-light text-lg mb-10 max-w-2xl mx-auto">
               Junte-se à rede de referência que valoriza sua formação. Aumente sua visibilidade para pacientes qualificados.
             </p>
             <Link 
               href="/login"
               className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-slate-900 text-sm font-bold uppercase tracking-widest py-4 px-10 rounded-full transition-all shadow-glow hover:scale-105 transform duration-300"
             >
               <UserCheck size={18} />
               Solicitar Credenciamento
             </Link>
        </div>
      </section>

      {/* Blog Teaser - Clean Cards */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-accent font-bold uppercase tracking-widest text-xs mb-2 block">Blog</span>
              <h2 className="text-4xl font-serif text-slate-900">Últimas Publicações</h2>
            </div>
            <Link href="/blog" className="hidden sm:flex items-center gap-2 text-slate-500 font-medium hover:text-primary transition-colors group">
              Ver todo o acervo <div className="bg-slate-100 p-2 rounded-full group-hover:bg-primary group-hover:text-white transition-colors"><ChevronRight size={16} /></div>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {latestPosts.map(post => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full">
                <div className="relative overflow-hidden rounded-2xl mb-6 shadow-sm">
                  <div className="aspect-w-16 aspect-h-10">
                    <img 
                      src={post.imageUrl} 
                      alt={post.title} 
                      className="w-full h-64 object-cover transform group-hover:scale-105 transition duration-700 ease-out"
                    />
                  </div>
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase px-3 py-1 rounded-full tracking-widest shadow-sm">
                      {post.category}
                   </div>
                </div>
                <div>
                   <div className="text-gray-400 text-xs font-medium mb-3 uppercase tracking-wide">
                     {new Date(post.createdAt).toLocaleDateString()}
                   </div>
                  <h3 className="text-2xl font-serif text-slate-900 mb-3 group-hover:text-primary transition-colors leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-gray-500 font-light text-sm line-clamp-2 leading-relaxed mb-4">
                    {post.summary}
                  </p>
                  <span className="inline-block text-primary text-xs font-bold uppercase tracking-widest border-b border-primary/20 pb-0.5 group-hover:border-primary transition-colors">
                    Ler Artigo
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
