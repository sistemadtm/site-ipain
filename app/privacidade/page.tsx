import { Shield, Lock, Eye, Database } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Política de Privacidade | Instituto Indicador",
  description: "Política de privacidade e proteção de dados do Instituto Indicador.",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Política de Privacidade</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">1. Introdução</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O Instituto Indicador está comprometido com a proteção da privacidade e dos dados pessoais de seus usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais em conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">2. Dados Coletados</h2>
            
            <h3 className="text-xl font-serif text-slate-900 mb-3 mt-6">2.1 Dados Fornecidos por Você</h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Coletamos informações que você nos fornece diretamente:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Nome completo</li>
              <li>E-mail</li>
              <li>Telefone</li>
              <li>Endereço profissional (para profissionais credenciados)</li>
              <li>Número de registro profissional (CRO)</li>
              <li>Informações de formação acadêmica</li>
              <li>Foto de perfil (opcional)</li>
            </ul>

            <h3 className="text-xl font-serif text-slate-900 mb-3 mt-6">2.2 Dados Coletados Automaticamente</h3>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Endereço IP</li>
              <li>Tipo de navegador e dispositivo</li>
              <li>Páginas visitadas e tempo de navegação</li>
              <li>Localização geográfica aproximada</li>
              <li>Cookies e tecnologias similares</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">3. Finalidade do Uso dos Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Utilizamos seus dados pessoais para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Criar e gerenciar sua conta na plataforma</li>
              <li>Facilitar a conexão entre pacientes e profissionais</li>
              <li>Verificar credenciais de profissionais</li>
              <li>Enviar comunicações importantes sobre o serviço</li>
              <li>Melhorar a experiência do usuário</li>
              <li>Realizar análises estatísticas e pesquisas</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Prevenir fraudes e garantir a segurança da plataforma</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">4. Compartilhamento de Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Seus dados pessoais podem ser compartilhados nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Profissionais Listados:</strong> Informações de contato são exibidas publicamente para facilitar o agendamento</li>
              <li><strong>Prestadores de Serviço:</strong> Empresas que nos auxiliam na operação da plataforma (hospedagem, análise de dados)</li>
              <li><strong>Autoridades:</strong> Quando exigido por lei ou para proteger direitos legais</li>
              <li><strong>Consentimento:</strong> Com sua autorização expressa para outras finalidades</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              <strong>Não vendemos</strong> seus dados pessoais a terceiros.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">5. Segurança dos Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Implementamos medidas técnicas e organizacionais para proteger seus dados:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Criptografia de dados em trânsito e em repouso</li>
              <li>Controles de acesso rigorosos</li>
              <li>Monitoramento contínuo de segurança</li>
              <li>Backups regulares</li>
              <li>Treinamento de equipe em proteção de dados</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">6. Seus Direitos (LGPD)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              De acordo com a LGPD, você tem direito a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li><strong>Confirmação e Acesso:</strong> Saber se tratamos seus dados e acessá-los</li>
              <li><strong>Correção:</strong> Solicitar correção de dados incompletos ou desatualizados</li>
              <li><strong>Anonimização ou Exclusão:</strong> Solicitar anonimização ou exclusão de dados desnecessários</li>
              <li><strong>Portabilidade:</strong> Solicitar transferência de dados a outro fornecedor</li>
              <li><strong>Revogação:</strong> Revogar consentimento a qualquer momento</li>
              <li><strong>Oposição:</strong> Opor-se ao tratamento de dados</li>
              <li><strong>Informação:</strong> Saber com quem compartilhamos seus dados</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para exercer seus direitos, entre em contato através do e-mail: privacidade@institutoindicador.com.br
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">7. Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Utilizamos cookies e tecnologias similares para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Manter você conectado à plataforma</li>
              <li>Lembrar suas preferências</li>
              <li>Analisar o uso da plataforma</li>
              <li>Personalizar conteúdo</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você pode gerenciar cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">8. Retenção de Dados</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, 
              ou conforme exigido por lei. Após esse período, os dados serão excluídos ou anonimizados de forma segura.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">9. Menores de Idade</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Nossa plataforma não é direcionada a menores de 18 anos. Não coletamos intencionalmente dados de menores. 
              Se tomarmos conhecimento de que coletamos dados de um menor, tomaremos medidas para excluí-los.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">10. Alterações nesta Política</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos sobre alterações significativas 
              através da plataforma ou por e-mail. Recomendamos que você revise esta página regularmente.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">11. Encarregado de Dados (DPO)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para questões relacionadas à proteção de dados, entre em contato com nosso Encarregado de Dados:
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              E-mail: dpo@institutoindicador.com.br<br />
              Endereço: [Endereço completo]
            </p>
          </section>
        </div>

        {/* Info Boxes */}
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <Lock size={32} className="text-blue-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Segurança</h3>
            <p className="text-gray-600 text-sm">
              Seus dados são protegidos com criptografia de ponta
            </p>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
            <Eye size={32} className="text-green-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Transparência</h3>
            <p className="text-gray-600 text-sm">
              Você sempre sabe como usamos seus dados
            </p>
          </div>
          
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center">
            <Database size={32} className="text-purple-600 mx-auto mb-3" />
            <h3 className="font-bold text-slate-900 mb-2">Controle</h3>
            <p className="text-gray-600 text-sm">
              Você tem total controle sobre suas informações
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
