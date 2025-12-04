import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artigos, dicas e novidades sobre o mercado profissional. Aprenda a escolher os melhores especialistas e fique por dentro das tendências.",
};

const posts = [
  {
    id: 1,
    slug: "como-escolher-profissional-ideal",
    titulo: "Como escolher o profissional ideal para suas necessidades",
    resumo: "Dicas essenciais para encontrar e avaliar profissionais qualificados na sua região. Aprenda a identificar credenciais, verificar experiência e fazer as perguntas certas.",
    data: "15 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Guias",
    imagem: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=600&fit=crop"
  },
  {
    id: 2,
    slug: "importancia-verificacao-profissional",
    titulo: "A importância da verificação profissional",
    resumo: "Entenda por que é fundamental trabalhar com profissionais verificados e certificados. Conheça os critérios de validação e como isso garante sua segurança.",
    data: "10 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Segurança",
    imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop"
  },
  {
    id: 3,
    slug: "tendencias-mercado-profissional-2024",
    titulo: "Tendências do mercado profissional em 2024",
    resumo: "Conheça as principais tendências e especialidades em alta no mercado atual. Descubra quais áreas estão crescendo e o que esperar para o futuro.",
    data: "5 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Mercado",
    imagem: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop"
  },
  {
    id: 4,
    slug: "como-preparar-primeira-consulta",
    titulo: "Como se preparar para a primeira consulta",
    resumo: "Maximize o valor da sua primeira consulta com estas dicas práticas. Saiba o que levar, quais perguntas fazer e como aproveitar melhor o tempo.",
    data: "1 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Guias",
    imagem: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="py-16 lg:py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Blog
            </h1>
            <p className="text-lg text-gray-600">
              Artigos, dicas e novidades sobre o mercado profissional
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}`} className="group flex flex-col h-full">
              <Card className="h-full flex flex-col border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="h-56 overflow-hidden relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-slate-900 text-white text-xs font-semibold rounded-full">
                      {post.categoria}
                    </span>
                  </div>
                  <img 
                    src={post.imagem} 
                    alt={post.titulo} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-out"
                  />
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="text-gray-400 text-xs font-medium mb-3 flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    <span>{post.data}</span>
                    <span>•</span>
                    <span>{post.autor}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-slate-900 mb-3 group-hover:text-slate-700 transition-colors leading-tight">
                    {post.titulo}
                  </h3>
                  
                  <p className="text-gray-600 text-sm line-clamp-3 mb-6 grow leading-relaxed">
                    {post.resumo}
                  </p>
                  
                  <div className="flex items-center text-slate-900 font-medium text-sm mt-auto">
                    Ler artigo
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16">
          <Card className="border border-gray-200 bg-slate-900 text-white overflow-hidden">
            <CardContent className="py-12 px-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Precisa de um profissional?</h2>
              <p className="text-slate-300 text-lg mb-6 max-w-2xl mx-auto">
                Use nosso localizador para encontrar especialistas qualificados na sua região
              </p>
              <Link href="/localizador">
                <Button size="lg" className="bg-white hover:bg-gray-100 text-slate-900 font-semibold rounded-full">
                  Encontrar Profissional
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
