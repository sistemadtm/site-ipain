'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Clock } from 'lucide-react';
import type { Metadata } from 'next';

export default function Contato() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="bg-paper min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <MessageSquare size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Entre em Contato</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Estamos aqui para ajudar. Envie sua mensagem e retornaremos em breve.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail size={28} />
              </div>
              <h3 className="text-lg font-serif text-slate-900 mb-2">E-mail</h3>
              <p className="text-gray-600 text-sm mb-3">Envie sua mensagem</p>
              <a href="mailto:contato@institutoindicador.com.br" className="text-primary hover:text-accent transition-colors font-medium text-sm">
                contato@institutoindicador.com.br
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-14 h-14 bg-teal-50 text-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone size={28} />
              </div>
              <h3 className="text-lg font-serif text-slate-900 mb-2">Telefone</h3>
              <p className="text-gray-600 text-sm mb-3">Ligue para nós</p>
              <a href="tel:+551140028922" className="text-primary hover:text-accent transition-colors font-medium text-sm">
                (11) 4002-8922
              </a>
            </div>

            <div className="bg-white rounded-2xl shadow-soft p-8 text-center">
              <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock size={28} />
              </div>
              <h3 className="text-lg font-serif text-slate-900 mb-2">Horário</h3>
              <p className="text-gray-600 text-sm mb-3">Atendimento</p>
              <p className="text-slate-900 font-medium text-sm">
                Seg - Sex: 9h às 18h
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-10">
              <h2 className="text-3xl font-serif text-slate-900 mb-6">Envie sua Mensagem</h2>
              
              {submitted && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-green-800 font-medium text-sm">
                    ✓ Mensagem enviada com sucesso! Retornaremos em breve.
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                    placeholder="Seu nome"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                      placeholder="(11) 98765-4321"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assunto *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                  >
                    <option value="">Selecione um assunto</option>
                    <option value="credenciamento">Credenciamento de Profissional</option>
                    <option value="duvidas">Dúvidas sobre a Plataforma</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="parceria">Parcerias</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mensagem *
                  </label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition resize-none"
                    placeholder="Descreva sua mensagem..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-bold py-4 rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send size={18} />
                      Enviar Mensagem
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Additional Info */}
            <div className="space-y-8">
              <div className="bg-gradient-to-br from-primary to-primary-light rounded-2xl shadow-soft p-8 text-white">
                <h3 className="text-2xl font-serif mb-4">Precisa de Ajuda?</h3>
                <p className="mb-6 leading-relaxed opacity-90">
                  Nossa equipe está pronta para responder suas dúvidas sobre credenciamento, 
                  uso da plataforma ou qualquer outra questão.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1">E-mail Geral</p>
                      <p className="text-sm opacity-90">contato@institutoindicador.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1">Credenciamento</p>
                      <p className="text-sm opacity-90">credenciamento@institutoindicador.com.br</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail size={20} className="shrink-0 mt-1" />
                    <div>
                      <p className="font-medium mb-1">Suporte Técnico</p>
                      <p className="text-sm opacity-90">suporte@institutoindicador.com.br</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-soft p-8">
                <h3 className="text-2xl font-serif text-slate-900 mb-4">Perguntas Frequentes</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Como me credenciar?</h4>
                    <p className="text-gray-600 text-sm">
                      Acesse a área do aluno e preencha o formulário de credenciamento com suas informações profissionais.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Quanto tempo leva a análise?</h4>
                    <p className="text-gray-600 text-sm">
                      O processo de análise e verificação leva em média 5 a 7 dias úteis.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">Há custo para profissionais?</h4>
                    <p className="text-gray-600 text-sm">
                      Entre em contato para conhecer nossos planos e valores para profissionais credenciados.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
