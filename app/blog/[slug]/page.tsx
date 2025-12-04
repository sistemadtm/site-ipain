'use client'

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, User, Clock, Share2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Dados de exemplo
const artigos: Record<string, any> = {
  "como-escolher-profissional-ideal": {
    slug: "como-escolher-profissional-ideal",
    titulo: "Como escolher o profissional ideal para suas necessidades",
    resumo: "Dicas essenciais para encontrar e avaliar profissionais qualificados na sua região.",
    data: "15 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Guias",
    tempoLeitura: "5 min",
    imagem: "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&h=600&fit=crop",
    conteudo: `
      <p>Encontrar o profissional ideal pode ser um desafio, mas com as estratégias certas, você pode tomar uma decisão informada e confiante.</p>
      
      <h2>1. Verifique as Credenciais</h2>
      <p>Sempre confirme se o profissional possui as certificações e licenças necessárias para exercer sua atividade. No Indicador Profissional, todos os cadastrados passam por um processo de verificação.</p>
      
      <h2>2. Avalie a Experiência</h2>
      <p>Considere o tempo de atuação e as especialidades do profissional. Profissionais com mais experiência em áreas específicas tendem a oferecer soluções mais eficazes.</p>
      
      <h2>3. Considere a Localização</h2>
      <p>A proximidade pode ser um fator importante, especialmente se você precisar de atendimentos frequentes. Use nosso localizador para encontrar profissionais na sua região.</p>
      
      <h2>4. Leia Avaliações e Recomendações</h2>
      <p>Busque feedback de outros clientes. Recomendações de pessoas confiáveis podem ser muito valiosas na sua decisão.</p>
      
      <h2>5. Agende uma Consulta Inicial</h2>
      <p>Muitos profissionais oferecem uma primeira consulta para conhecer suas necessidades. Aproveite essa oportunidade para avaliar se há boa comunicação e empatia.</p>
    `
  },
  "importancia-verificacao-profissional": {
    slug: "importancia-verificacao-profissional",
    titulo: "A importância da verificação profissional",
    resumo: "Entenda por que é fundamental trabalhar com profissionais verificados e certificados.",
    data: "10 de Novembro, 2024",
    autor: "Equipe Indicador",
    categoria: "Segurança",
    tempoLeitura: "4 min",
    imagem: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1200&h=600&fit=crop",
    conteudo: `
      <p>A verificação profissional é um passo crucial para garantir que você está contratando alguém qualificado e confiável.</p>
      
      <h2>Por que a Verificação é Importante?</h2>
      <p>Trabalhar com profissionais verificados oferece segurança e tranquilidade. Você tem a garantia de que está lidando com alguém que possui as qualificações necessárias.</p>
      
      <h2>O que Verificamos</h2>
      <p>No Indicador Profissional, verificamos documentos, certificações, histórico profissional e referências. Nosso processo rigoroso garante que apenas profissionais qualificados façam parte da nossa rede.</p>
      
      <h2>Benefícios da Verificação</h2>
      <ul>
        <li>Maior segurança nas contratações</li>
        <li>Redução de riscos</li>
        <li>Profissionais comprometidos com a qualidade</li>
        <li>Transparência nas informações</li>
      </ul>
    `
  }
};

const artigosRelacionados = [
  {
    slug: "tendencias-mercado-profissional-2024",
    titulo: "Tendências do mercado profissional em 2024",
    categoria: "Mercado"
  },
  {
    slug: "como-preparar-primeira-consulta",
    titulo: "Como se preparar para a primeira consulta",
    categoria: "Guias"
  }
];

export default function ArtigoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const artigo = artigos[slug];

  if (!artigo) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="pt-6 text-center">
            <p className="text-gray-600 mb-4">Artigo não encontrado.</p>
            <Link href="/blog">
              <Button>Voltar ao Blog</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero Image */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={artigo.imagem} 
          alt={artigo.titulo}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-bold rounded-full mb-4">
              {artigo.categoria}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {artigo.titulo}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{artigo.data}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{artigo.autor}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{artigo.tempoLeitura} de leitura</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-lg">
              <CardContent className="pt-8 pb-8">
                <div 
                  className="prose prose-lg max-w-none
                    prose-headings:font-bold prose-headings:text-gray-900 prose-headings:mt-8 prose-headings:mb-4
                    prose-h2:text-2xl prose-h3:text-xl
                    prose-p:text-gray-600 prose-p:leading-relaxed prose-p:mb-4
                    prose-ul:text-gray-600 prose-ul:my-4
                    prose-li:my-2
                    prose-strong:text-gray-900 prose-strong:font-semibold"
                  dangerouslySetInnerHTML={{ __html: artigo.conteudo }}
                />

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Compartilhar artigo:</span>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                      Compartilhar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* CTA Card */}
              <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-600 to-teal-600 text-white overflow-hidden">
                <CardContent className="pt-6 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full blur-2xl"></div>
                  <h3 className="text-xl font-bold mb-3 relative z-10">Precisa de um profissional?</h3>
                  <p className="text-blue-100 mb-4 text-sm relative z-10">
                    Encontre especialistas qualificados na sua região
                  </p>
                  <Link href="/localizador">
                    <Button className="w-full bg-white text-blue-600 hover:bg-gray-100 font-bold relative z-10">
                      Buscar Agora
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Related Articles */}
              <Card className="border-0 shadow-lg">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Artigos Relacionados</h3>
                  <div className="space-y-4">
                    {artigosRelacionados.map(relacionado => (
                      <Link 
                        key={relacionado.slug} 
                        href={`/blog/${relacionado.slug}`}
                        className="block group"
                      >
                        <div className="p-3 rounded-lg hover:bg-gray-50 transition">
                          <span className="text-xs font-semibold text-blue-600 mb-1 block">
                            {relacionado.categoria}
                          </span>
                          <h4 className="text-sm font-semibold text-gray-900 group-hover:text-blue-600 transition leading-snug">
                            {relacionado.titulo}
                          </h4>
                        </div>
                      </Link>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex justify-center">
          <Link href="/blog">
            <Button variant="outline" size="lg" className="gap-2">
              Ver todos os artigos
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}
