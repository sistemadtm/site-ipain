'use client'

import { use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Facebook, Instagram, Linkedin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Dados de exemplo (em produção viriam de uma API/banco de dados)
const profissionaisData: Record<string, any> = {
  "1": {
    id: 1,
    nome: "Dr. João Silva",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Av. Paulista, 1000 - Bela Vista",
    cep: "01310-100",
    especialidades: ["Cardiologia", "Clínica Geral"],
    telefone: "(11) 98765-4321",
    email: "joao.silva@email.com",
    site: "www.drjoaosilva.com.br",
    whatsapp: "5511987654321",
    redesSociais: {
      facebook: "drjoaosilva",
      instagram: "@drjoaosilva",
      linkedin: "joao-silva"
    },
    biografia: "Médico cardiologista com mais de 15 anos de experiência. Formado pela USP, com especialização em cardiologia intervencionista. Atende pacientes com foco em prevenção e tratamento de doenças cardiovasculares, sempre priorizando o bem-estar e a qualidade de vida.",
    coordenadas: { lat: -23.561684, lng: -46.655981 }
  },
  "2": {
    id: 2,
    nome: "Dra. Maria Santos",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Rua Augusta, 500 - Consolação",
    cep: "01305-000",
    especialidades: ["Pediatria", "Neonatologia"],
    telefone: "(11) 91234-5678",
    email: "maria.santos@email.com",
    whatsapp: "5511912345678",
    redesSociais: {
      instagram: "@dra.mariasantos",
      facebook: "dramariaped"
    },
    biografia: "Pediatra dedicada ao cuidado integral de crianças e adolescentes. Formada pela UNIFESP com residência em neonatologia. Atendimento humanizado e acolhedor, com foco no desenvolvimento saudável desde os primeiros dias de vida.",
    coordenadas: { lat: -23.554820, lng: -46.662180 }
  },
  "3": {
    id: 3,
    nome: "Eng. Carlos Oliveira",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    endereco: "Av. Atlântica, 2000 - Copacabana",
    cep: "22021-001",
    especialidades: ["Engenharia Civil", "Projetos Estruturais"],
    telefone: "(21) 99876-5432",
    email: "carlos.oliveira@eng.com",
    site: "www.carlosoliveira.eng.br",
    whatsapp: "5521998765432",
    redesSociais: {
      linkedin: "carlos-oliveira-eng",
      instagram: "@eng.carlosoliveira"
    },
    biografia: "Engenheiro civil com expertise em projetos estruturais e gerenciamento de obras. Mais de 20 anos de experiência em construções residenciais e comerciais. CREA ativo, comprometido com qualidade, segurança e prazos.",
    coordenadas: { lat: -22.971177, lng: -43.182543 }
  }
};

export default function ProfissionalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const profissional = profissionaisData[id];

  if (!profissional) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-600">Profissional não encontrado.</p>
            <Link href="/localizador">
              <Button className="w-full mt-4">Voltar ao Localizador</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Perfil Principal */}
        <Card className="mb-6 border-0 shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-teal-600 h-32"></div>
          <CardContent className="pt-0 -mt-16 relative">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start">
                <Avatar className="h-32 w-32 mb-4 ring-4 ring-white shadow-xl">
                  <AvatarImage src={profissional.foto} alt={profissional.nome} />
                  <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-teal-600 text-white">
                    {profissional.nome.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {profissional.especialidades.map((esp: string) => (
                    <Badge key={esp} className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-0">
                      {esp}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex-1 mt-16 md:mt-0">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{profissional.nome}</h1>
                <p className="text-gray-600 text-lg leading-relaxed">{profissional.biografia}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Informações de Contato */}
        <Card className="mb-6 border-0 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Informações de Contato</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Endereço</p>
                  <p className="text-gray-600">{profissional.endereco}</p>
                  <p className="text-gray-600">{profissional.cidade} - {profissional.estado}</p>
                  <p className="text-gray-600">CEP: {profissional.cep}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 mb-1">Telefone</p>
                  <a href={`tel:${profissional.telefone}`} className="text-blue-600 hover:underline font-medium">
                    {profissional.telefone}
                  </a>
                </div>
              </div>

              {profissional.whatsapp && (
                <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                  <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center shrink-0">
                    <MessageCircle className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">WhatsApp</p>
                    <a 
                      href={`https://wa.me/${profissional.whatsapp}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:underline font-medium"
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </div>
              )}

              {profissional.email && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center shrink-0">
                    <Mail className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">E-mail</p>
                    <a href={`mailto:${profissional.email}`} className="text-blue-600 hover:underline font-medium">
                      {profissional.email}
                    </a>
                  </div>
                </div>
              )}

              {profissional.site && (
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center shrink-0">
                    <Globe className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 mb-1">Website</p>
                    <a 
                      href={`https://${profissional.site}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      {profissional.site}
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Botões de Ação */}
            <div className="flex flex-wrap gap-3 mt-8">
              {profissional.whatsapp && (
                <a 
                  href={`https://wa.me/${profissional.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[200px]"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-700 shadow-lg h-12 text-base">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Conversar no WhatsApp
                  </Button>
                </a>
              )}
              <a href={`tel:${profissional.telefone}`} className="flex-1 min-w-[200px]">
                <Button variant="outline" className="w-full h-12 text-base border-2 hover:bg-gray-50">
                  <Phone className="mr-2 h-5 w-5" />
                  Ligar Agora
                </Button>
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Redes Sociais */}
        {profissional.redesSociais && (
          <Card className="mb-6 border-0 shadow-lg">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Redes Sociais</h2>
              <div className="flex flex-wrap gap-3">
                {profissional.redesSociais.facebook && (
                  <a 
                    href={`https://facebook.com/${profissional.redesSociais.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-2 hover:bg-blue-50 hover:border-blue-600 hover:text-blue-600">
                      <Facebook className="mr-2 h-4 w-4" />
                      Facebook
                    </Button>
                  </a>
                )}
                {profissional.redesSociais.instagram && (
                  <a 
                    href={`https://instagram.com/${profissional.redesSociais.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-2 hover:bg-pink-50 hover:border-pink-600 hover:text-pink-600">
                      <Instagram className="mr-2 h-4 w-4" />
                      Instagram
                    </Button>
                  </a>
                )}
                {profissional.redesSociais.linkedin && (
                  <a 
                    href={`https://linkedin.com/in/${profissional.redesSociais.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="border-2 hover:bg-blue-50 hover:border-blue-700 hover:text-blue-700">
                      <Linkedin className="mr-2 h-4 w-4" />
                      LinkedIn
                    </Button>
                  </a>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Mapa de Localização */}
        <Card className="border-0 shadow-lg">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Localização</h2>
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-2xl h-72 flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-blue-200 opacity-20 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-200 opacity-20 rounded-full blur-3xl"></div>
              <div className="text-center relative z-10">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <p className="text-gray-900 font-semibold text-lg mb-1">{profissional.endereco}</p>
                <p className="text-gray-700 mb-4">{profissional.cidade} - {profissional.estado}</p>
                <a 
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(profissional.endereco + ', ' + profissional.cidade)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg">
                    <MapPin className="mr-2 h-4 w-4" />
                    Abrir no Google Maps
                  </Button>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
