'use client'

import { useState } from 'react';
import { Heart, MapPin, Phone, Mail, User, AlertCircle, CheckCircle } from 'lucide-react';
import Link from 'next/link';

const estados = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function PacientesVoluntarioPage() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    cidade: '',
    estado: '',
    descricao: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio - substituir por API real
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Reset form
      setFormData({
        nome: '',
        telefone: '',
        email: '',
        cidade: '',
        estado: '',
        descricao: ''
      });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Solicite Atendimento Voluntário</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Preencha o formulário abaixo e dentistas voluntários da sua região poderão entrar em contato.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {/* Success Message */}
            {submitted && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-8 flex items-start gap-4">
                <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-green-900 font-bold mb-2">Cadastro realizado com sucesso!</h3>
                  <p className="text-green-700 text-sm">
                    Seu cadastro foi registrado. Dentistas voluntários da sua região poderão visualizar suas informações e entrar em contato.
                  </p>
                </div>
              </div>
            )}

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8 flex items-start gap-4">
              <AlertCircle size={24} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-blue-900 font-bold mb-2">Como funciona?</h3>
                <ul className="text-blue-700 text-sm space-y-1">
                  <li>• Preencha seus dados de contato e localização</li>
                  <li>• Dentistas voluntários visualizam pacientes por estado</li>
                  <li>• Profissionais interessados entram em contato diretamente</li>
                  <li>• O atendimento é gratuito e voluntário</li>
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-soft border border-gray-100 p-8 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      value={formData.nome}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                {/* Telefone */}
                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone/WhatsApp *
                  </label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      value={formData.telefone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                {/* Localização */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-2">
                      Cidade *
                    </label>
                    <div className="relative">
                      <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="cidade"
                        name="cidade"
                        required
                        value={formData.cidade}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        placeholder="Sua cidade"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      id="estado"
                      name="estado"
                      required
                      value={formData.estado}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    >
                      <option value="">Selecione</option>
                      {estados.map(estado => (
                        <option key={estado} value={estado}>{estado}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Descrição */}
                <div>
                  <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-2">
                    Descreva sua necessidade (opcional)
                  </label>
                  <textarea
                    id="descricao"
                    name="descricao"
                    rows={4}
                    value={formData.descricao}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                    placeholder="Descreva brevemente qual tipo de atendimento você precisa..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Heart size={18} />
                      Cadastrar Solicitação
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Back Link */}
            <div className="text-center mt-8">
              <Link href="/voluntario" className="text-gray-600 hover:text-blue-600 transition text-sm">
                ← Voltar para Atendimento Voluntário
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
