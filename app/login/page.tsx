'use client'

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserCheck, Mail, Lock, User, Phone, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simular login
    setTimeout(() => {
      setIsLoading(false);
      alert("Funcionalidade em desenvolvimento!");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-teal-700 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500 opacity-10 blur-3xl rounded-full"></div>

      {/* Header */}
      <header className="relative z-10 border-b border-white/10 bg-white/5 backdrop-blur-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="flex items-center gap-2 text-white">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold text-lg">IP</span>
              </div>
              <span className="font-semibold text-lg hidden sm:block">
                Indicador Profissional
              </span>
            </Link>
            
            <Link href="/" className="text-sm text-white/80 hover:text-white transition font-medium flex items-center gap-2">
              <ArrowLeft size={16} />
              Voltar
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto">
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl mb-4">
              <UserCheck className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Área do Profissional</h1>
            <p className="text-teal-100">Gerencie seu perfil e seja encontrado</p>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 backdrop-blur-sm border border-white/20">
              <TabsTrigger value="login" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="cadastro" className="data-[state=active]:bg-white data-[state=active]:text-blue-600">
                Cadastrar
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login">
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Bem-vindo de volta</CardTitle>
                  <p className="text-gray-600 text-sm">Entre com suas credenciais</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senha">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="senha" 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" className="rounded" />
                        <span className="text-gray-600">Lembrar de mim</span>
                      </label>
                      <a href="#" className="text-blue-600 hover:underline">
                        Esqueceu a senha?
                      </a>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg font-semibold shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Entrando..." : "Entrar"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Cadastro Tab */}
            <TabsContent value="cadastro">
              <Card className="border-0 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-2xl">Criar conta</CardTitle>
                  <p className="text-gray-600 text-sm">Cadastre-se como profissional</p>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="nome">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="nome" 
                          type="text" 
                          placeholder="Seu nome completo"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email-cadastro">E-mail</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="email-cadastro" 
                          type="email" 
                          placeholder="seu@email.com"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="telefone">Telefone</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="telefone" 
                          type="tel" 
                          placeholder="(00) 00000-0000"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="senha-cadastro">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input 
                          id="senha-cadastro" 
                          type="password" 
                          placeholder="••••••••"
                          className="pl-10 h-12"
                          required
                        />
                      </div>
                    </div>

                    <div className="text-xs text-gray-600">
                      Ao criar uma conta, você concorda com nossos{" "}
                      <a href="#" className="text-blue-600 hover:underline">Termos de Uso</a>
                      {" "}e{" "}
                      <a href="#" className="text-blue-600 hover:underline">Política de Privacidade</a>
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-lg font-semibold shadow-lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Criando conta..." : "Criar conta"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Info */}
          <Card className="mt-6 border-0 bg-white/10 backdrop-blur-sm text-white">
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center gap-2">
                <UserCheck className="h-5 w-5" />
                Benefícios de se cadastrar
              </h3>
              <ul className="text-sm space-y-1 text-teal-100">
                <li>• Perfil profissional completo</li>
                <li>• Seja encontrado por novos clientes</li>
                <li>• Gerencie suas informações</li>
                <li>• Aumente sua visibilidade</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
