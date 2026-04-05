import Link from 'next/link';
import { ActivitySquare, ArrowLeft } from 'lucide-react';

export default function TermosPage() {
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
        <h1 className="text-4xl font-black text-brown-900 mb-8">Termos de Uso</h1>
        <div className="prose prose-brown max-w-none text-brown-800/80 font-medium space-y-6">
          <p>Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e usar a plataforma FisioHub, você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis. A FisioHub é um ambiente estritamente educacional e de simulação clínica voltado para o treinamento e capacitação de profissionais e estudantes de Fisioterapia.
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">2. Natureza Educacional e Soberania Profissional</h2>
          <p>
            As ferramentas de inteligência artificial (IA) presentes na FisioHub são simuladores de raciocínio lógico baseados em diretrizes clínicas (CPGs) e evidências científicas. <strong>Eles não elaboram diagnósticos determinísticos, não prescrevem condutas definitivas e rejeitam expressamente qualquer substituição ao julgamento clínico humano presencial.</strong>
          </p>
          <p>
            É estritamente obrigatório que os usuários respeitem o código de ética de sua profissão e as resoluções do COFFITO/CREFITO. A validação, interpretação e aplicação de qualquer conceito discutido na plataforma durante o atendimento real a pacientes é de responsabilidade única e exclusiva do profissional associado.
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">3. Contas e Assinaturas</h2>
          <p>
            O acesso às simulações avançadas e conteúdos restritos exige a criação de conta e o pagamento da assinatura correspondente (Plano Mensal ou Anual). O processamento de pagamentos é gerenciado por plataformas seguras (Stripe). O cancelamento pode ser efetuado a qualquer momento, sem taxas ocultas, impedindo renovações futuras e encerrando o acesso ao final do ciclo faturado.
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">4. Política de Reembolso (Garantia de 7 dias)</h2>
          <p>
            Em conformidade com o Código de Defesa do Consumidor (Art. 49), oferecemos garantia incondicional de 7 (sete) dias a partir do momento da primeira compra da assinatura. Caso a plataforma não atenda às suas expectativas, o valor integral será reembolsado mediante solicitação prévia via canais de suporte.
          </p>

          <h2 className="text-2xl font-bold text-brown-900 mt-8 mb-4">5. Propriedade Intelectual</h2>
          <p>
            A estrutura, os algoritmos de prompting, os designs e o conceito de simulação da FisioHub são de propriedade exclusiva da plataforma. A reprodução não autorizada do material intelectual, a comercialização do uso das IAs em nome de terceiros, ou qualquer prática de engenharia reversa resultarão no banimento imediato da conta e responderão civilmente.
          </p>
        </div>
      </main>
    </div>
  );
}
