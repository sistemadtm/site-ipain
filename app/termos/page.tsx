import { FileText, AlertCircle } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Termos de Uso | Instituto Indicador",
  description: "Termos e condições de uso da plataforma Instituto Indicador.",
};

export default function TermosDeUso() {
  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FileText size={32} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Termos de Uso</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">1. Aceitação dos Termos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Ao acessar e usar a plataforma Instituto Indicador, você concorda em cumprir e estar vinculado aos seguintes termos e condições de uso. Se você não concordar com qualquer parte destes termos, não deverá usar nossos serviços.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">2. Descrição do Serviço</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O Instituto Indicador é uma plataforma digital que conecta pacientes a profissionais especializados em Dor Orofacial, DTM e Odontologia do Sono. Nosso objetivo é facilitar o acesso a profissionais qualificados e certificados.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              A plataforma oferece:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Localizador de profissionais credenciados</li>
              <li>Informações sobre especialistas verificados</li>
              <li>Conteúdo educacional sobre saúde orofacial</li>
              <li>Portal para profissionais gerenciarem seus perfis</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">3. Cadastro e Conta de Usuário</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para acessar determinadas funcionalidades, profissionais devem criar uma conta fornecendo informações precisas e completas. Você é responsável por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Manter a confidencialidade de suas credenciais de acesso</li>
              <li>Todas as atividades realizadas em sua conta</li>
              <li>Notificar imediatamente sobre qualquer uso não autorizado</li>
              <li>Garantir que suas informações estejam sempre atualizadas</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">4. Credenciamento de Profissionais</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Profissionais que desejam ser listados na plataforma devem:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Possuir registro profissional válido (CRO)</li>
              <li>Comprovar especialização em Dor Orofacial ou áreas relacionadas</li>
              <li>Fornecer documentação verídica e atualizada</li>
              <li>Manter conduta ética e profissional</li>
            </ul>
            <p className="text-gray-600 leading-relaxed mb-4">
              O Instituto Indicador reserva-se o direito de recusar ou remover profissionais que não atendam aos critérios estabelecidos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">5. Uso Aceitável</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Você concorda em NÃO:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Usar a plataforma para fins ilegais ou não autorizados</li>
              <li>Publicar conteúdo falso, enganoso ou difamatório</li>
              <li>Violar direitos de propriedade intelectual</li>
              <li>Tentar acessar áreas restritas do sistema</li>
              <li>Interferir no funcionamento da plataforma</li>
              <li>Coletar dados de outros usuários sem autorização</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">6. Propriedade Intelectual</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Todo o conteúdo da plataforma, incluindo textos, gráficos, logos, ícones, imagens e software, é propriedade do Instituto Indicador ou de seus licenciadores e está protegido por leis de direitos autorais.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">7. Limitação de Responsabilidade</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              O Instituto Indicador atua como intermediário entre pacientes e profissionais. Não somos responsáveis por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-4">
              <li>Qualidade dos serviços prestados pelos profissionais listados</li>
              <li>Resultados de tratamentos ou procedimentos</li>
              <li>Disputas entre usuários e profissionais</li>
              <li>Danos indiretos ou consequenciais</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">8. Modificações dos Termos</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações significativas serão comunicadas através da plataforma. O uso continuado após as modificações constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">9. Rescisão</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Podemos suspender ou encerrar seu acesso à plataforma imediatamente, sem aviso prévio, por violação destes termos ou por qualquer outro motivo que consideremos apropriado.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">10. Lei Aplicável</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Estes termos são regidos pelas leis da República Federativa do Brasil. Qualquer disputa será resolvida nos tribunais competentes do Brasil.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-serif text-slate-900 mb-4">11. Contato</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Para questões sobre estes termos, entre em contato através da nossa página de contato ou pelo e-mail: contato@institutoindicador.com.br
            </p>
          </section>
        </div>

        {/* Alert Box */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex gap-4">
            <AlertCircle size={24} className="text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-slate-900 mb-2">Importante</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Ao utilizar nossa plataforma, você confirma que leu, compreendeu e concordou com estes Termos de Uso. 
                Recomendamos que você revise periodicamente esta página para estar ciente de quaisquer alterações.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
