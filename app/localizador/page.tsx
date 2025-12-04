'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Search } from "lucide-react";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

// Dados de exemplo
const estados = [
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "BA", nome: "Bahia" },
];

const cidadesPorEstado: Record<string, string[]> = {
  "SP": ["São Paulo", "Campinas", "Santos", "Ribeirão Preto"],
  "RJ": ["Rio de Janeiro", "Niterói", "Petrópolis", "Cabo Frio"],
  "MG": ["Belo Horizonte", "Uberlândia", "Contagem", "Juiz de Fora"],
  "RS": ["Porto Alegre", "Caxias do Sul", "Pelotas", "Canoas"],
  "BA": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari"],
};

const profissionais = [
  {
    id: 1,
    nome: "Dr. João Silva",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Av. Paulista, 1000",
    especialidades: ["Cardiologia", "Clínica Geral"],
    telefone: "(11) 98765-4321"
  },
  {
    id: 2,
    nome: "Dra. Maria Santos",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    cidade: "São Paulo",
    estado: "SP",
    endereco: "Rua Augusta, 500",
    especialidades: ["Pediatria", "Neonatologia"],
    telefone: "(11) 91234-5678"
  },
  {
    id: 3,
    nome: "Eng. Carlos Oliveira",
    foto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Carlos",
    cidade: "Rio de Janeiro",
    estado: "RJ",
    endereco: "Av. Atlântica, 2000",
    especialidades: ["Engenharia Civil", "Projetos"],
    telefone: "(21) 99876-5432"
  },
];

export default function LocalizadorPage() {
  const [estadoSelecionado, setEstadoSelecionado] = useState<string>("");
  const [cidadeSelecionada, setCidadeSelecionada] = useState<string>("");

  const cidadesDisponiveis = estadoSelecionado ? cidadesPorEstado[estadoSelecionado] || [] : [];
  
  const profissionaisFiltrados = profissionais.filter(prof => {
    if (!estadoSelecionado) return false;
    if (prof.estado !== estadoSelecionado) return false;
    if (cidadeSelecionada && cidadeSelecionada !== "todas" && prof.cidade !== cidadeSelecionada) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="py-16 lg:py-20 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
              Localizador de Profissionais
            </h1>
            <p className="text-lg text-gray-600">
              Encontre especialistas qualificados na sua região
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 py-12 lg:py-16">
        {/* Filtros */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-900">Estado</label>
                  <Select value={estadoSelecionado} onValueChange={(value) => {
                    setEstadoSelecionado(value);
                    setCidadeSelecionada("");
                  }}>
                    <SelectTrigger className="h-12 border-gray-200">
                      <SelectValue placeholder="Selecione um estado" />
                    </SelectTrigger>
                    <SelectContent>
                      {estados.map(estado => (
                        <SelectItem key={estado.sigla} value={estado.sigla}>
                          {estado.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block text-slate-900">Cidade</label>
                  <Select 
                    value={cidadeSelecionada} 
                    onValueChange={setCidadeSelecionada}
                    disabled={!estadoSelecionado}
                  >
                    <SelectTrigger className="h-12 border-gray-200">
                      <SelectValue placeholder="Selecione uma cidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todas">Todas as cidades</SelectItem>
                      {cidadesDisponiveis.map(cidade => (
                        <SelectItem key={cidade} value={cidade}>
                          {cidade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Estado Vazio */}
        {!estadoSelecionado && (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Selecione uma localização</h3>
            <p className="text-gray-600">
              Use os filtros acima para encontrar profissionais na sua região
            </p>
          </div>
        )}

        {/* Resultados */}
        {estadoSelecionado && (
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                {profissionaisFiltrados.length} {profissionaisFiltrados.length === 1 ? 'profissional encontrado' : 'profissionais encontrados'}
              </h2>
              <p className="text-gray-600">
                em {cidadeSelecionada && cidadeSelecionada !== "todas" ? cidadeSelecionada : estados.find(e => e.sigla === estadoSelecionado)?.nome}
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {profissionaisFiltrados.map(prof => (
                <Card key={prof.id} className="border border-gray-200 hover:shadow-lg transition-all duration-300 group">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center mb-6">
                      <Avatar className="h-20 w-20 mb-4 ring-2 ring-gray-100 group-hover:ring-slate-900 transition-all">
                        <AvatarImage src={prof.foto} alt={prof.nome} />
                        <AvatarFallback className="text-lg bg-slate-100 text-slate-900">
                          {prof.nome.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="text-lg font-semibold text-slate-900">{prof.nome}</h3>
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-2 text-sm text-gray-600">
                        <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
                        <span>{prof.endereco}, {prof.cidade} - {prof.estado}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="h-4 w-4 shrink-0" />
                        <span>{prof.telefone}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-6">
                      {prof.especialidades.map(esp => (
                        <Badge key={esp} variant="secondary" className="bg-slate-100 text-slate-700 hover:bg-slate-200 border-0">
                          {esp}
                        </Badge>
                      ))}
                    </div>

                    <Link href={`/profissional/${prof.id}`}>
                      <Button className="w-full bg-slate-900 hover:bg-slate-800 rounded-full">
                        Ver Perfil Completo
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {profissionaisFiltrados.length === 0 && (
              <div className="text-center py-20">
                <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Search className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">Nenhum profissional encontrado</h3>
                <p className="text-gray-600">
                  Tente selecionar outra localização
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
