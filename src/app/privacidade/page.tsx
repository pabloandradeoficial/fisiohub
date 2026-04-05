import Link from 'next/link';
import { ActivitySquare, ArrowLeft } from 'lucide-react';

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white text-brown-900 font-sans">
      <nav className="fixed w-full top-0 bg-white/90 backdrop-blur-md border-b border-brown-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-tight text-brown-900">
            <ActivitySquare className="w-8 h-8 text-gold-500" />
            <span>Fisio<span className="text-gold-500">Hub</span></span>
          </Link>
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-brown-800 hover:text-gold-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-black text-brown-900 mb-8">Política de Privacidade</h1>
        <div className="prose prose-brown max-w-none text-brown-800/80 font-medium space-y-6">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">1. Nosso Compromisso com a LGPD</h2>
          <p>
            A FisioHub preza pela privacidade dos seus usuários e pelo tratamento transparente de dados pessoais, em estrita conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018).
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">2. Coleta de Dados Profissionais</h2>
          <p>
            Para efetuar seu cadastro e viabilizar o acesso, coletamos apenas os dados essenciais (Nome, E-mail, Senha Criptografada e Status de Pagamento via parceiros). Os pagamentos são integralmente gerenciados via infraestrutura Stripe, certificada em nível global (PCI-DSS), de modo que a FisioHub <strong>não armazena nem tem acesso a dados de cartão de crédito</strong>.
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">3. Os Dados dos Seus Casos (Importante)</h2>
          <p>
            A plataforma exige expressamente que os usuários <strong>não insiram dados identificadores reais de pacientes</strong> nas simulações com as Inteligências Artificiais. A FisioHub é um ambiente de ensaio. Nomes, documentos, endereços ou cruzamentos de dados reais não devem ser transitados nos prompts. Ao submeter um caso, exija a anonimização prévia dos mesmos. 
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">4. Anonimização e Criptografia</h2>
          <p>
            Os fluxos de comunicação durante o treinamento clínico e o histórico com a IA são criptografados de ponta a ponta (SSL/TLS). Utilizamos as métricas anônimas de uso das IAs apenas para calibrar algoritmos de desempenho e fornecer relatórios de evolução para a sua própria conta (Gamificação e Retenção de Conhecimento).
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">5. Seus Direitos Formais</h2>
          <p>
            De acordo com o Art. 18 da LGPD, você pode, a qualquer momento, solicitar a confirmação de existência de tratamento, o acesso irrestrito aos seus dados, a correção de eventuais erros cadastrais, a revogação do consentimento, e a eliminação de todos os registros da nossa base (Direito ao Esquecimento).
          </p>
        </div>
      </main>
    </div>
  );
}
