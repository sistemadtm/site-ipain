import { Calendar, ArrowLeft, User, Share2 } from 'lucide-react';
import Link from 'next/link';
import type { Metadata } from 'next';

// Mock data - você pode substituir por dados reais depois
const getPostBySlug = (slug: string) => {
  const posts: Record<string, any> = {
    'dtm-diagnostico': {
      id: 1,
      slug: 'dtm-diagnostico',
      title: 'DTM: Diagnóstico e Tratamento Baseado em Evidências',
      summary: 'Entenda os principais métodos de diagnóstico e tratamento para DTM com base nas mais recentes evidências científicas.',
      imageUrl: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=1200',
      category: 'DTM',
      createdAt: new Date().toISOString(),
      content: `A Disfunção Temporomandibular (DTM) é uma condição que afeta milhões de pessoas em todo o mundo. Caracterizada por dor e disfunção na articulação temporomandibular e nos músculos da mastigação, a DTM pode impactar significativamente a qualidade de vida dos pacientes.

O diagnóstico preciso da DTM requer uma avaliação abrangente que inclui histórico médico detalhado, exame físico da ATM e músculos mastigatórios, avaliação da amplitude de movimento mandibular e palpação muscular e articular.

Em casos específicos, exames de imagem podem ser necessários, como radiografias panorâmicas, tomografia computadorizada e ressonância magnética. Estes exames complementares auxiliam na identificação de alterações estruturais e no planejamento terapêutico adequado.

O tratamento da DTM deve ser conservador e baseado em evidências. As principais abordagens incluem educação do paciente sobre a condição, fisioterapia orofacial especializada, uso de placas oclusais quando indicado, farmacoterapia para controle da dor e técnicas de relaxamento muscular.

A abordagem multidisciplinar é fundamental para o sucesso terapêutico. A integração entre dentistas, fisioterapeutas, psicólogos e outros profissionais de saúde proporciona um tratamento mais completo e eficaz para os pacientes com DTM.

O manejo adequado da DTM requer uma abordagem multidisciplinar e individualizada. A maioria dos pacientes responde bem ao tratamento conservador, evitando procedimentos invasivos e obtendo melhora significativa na qualidade de vida.`
    }
  };
  
  return posts[slug] || null;
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post não encontrado',
    };
  }
  
  return {
    title: `${post.title} | Blog Instituto Indicador`,
    description: post.summary,
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  
  if (!post) {
    return (
      <div className="min-h-screen bg-paper flex items-center justify-center py-20">
        <div className="text-center">
          <h1 className="text-4xl font-serif text-slate-900 mb-4">Post não encontrado</h1>
          <Link href="/blog" className="text-primary hover:text-accent transition-colors">
            Voltar para o blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="w-full h-[400px] relative">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-12 text-white">
          <Link href="/blog" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={18} /> Voltar para o Blog
          </Link>
          <div className="flex items-center gap-4 mb-4 text-sm font-medium">
            <span className="bg-accent text-white px-3 py-1 rounded-full uppercase tracking-wider text-xs font-bold">
              {post.category}
            </span>
            <div className="flex items-center gap-1 opacity-90">
              <Calendar size={16} />
              {new Date(post.createdAt).toLocaleDateString('pt-BR')}
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight max-w-4xl">
            {post.title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 grid md:grid-cols-4 gap-12">
        {/* Main Content */}
        <div className="md:col-span-3">
          <div className="prose prose-lg prose-teal max-w-none text-gray-700">
            {post.content.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
              <p key={idx} className="mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Share / Tags Footer */}
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-wrap justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-gray-500 text-sm">
              <User size={16} />
              <span>Tags: {post.category}, Odontologia, Saúde</span>
            </div>
            <button className="flex items-center gap-2 text-primary font-bold hover:bg-teal-50 px-4 py-2 rounded-lg transition">
              <Share2 size={18} /> Compartilhar
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden md:block space-y-8">
           <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 sticky top-24">
             <h3 className="font-bold text-gray-900 mb-4">Sobre o Autor</h3>
             <div className="flex items-center gap-3 mb-4">
               <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                 IP
               </div>
               <div>
                 <p className="font-bold text-sm">Equipe Editorial</p>
                 <p className="text-xs text-gray-500">Instituto Indicador</p>
               </div>
             </div>
             <p className="text-sm text-gray-600 mb-4">
               Trazendo informações baseadas em evidências sobre dor orofacial e odontologia do sono.
             </p>
             <Link href="/locator" className="block w-full text-center bg-white border border-primary text-primary font-bold py-2 rounded-lg hover:bg-primary hover:text-white transition">
               Encontrar Especialista
             </Link>
           </div>
        </div>
      </div>
    </div>
  );
}
