import { CheckCircle, PlayCircle, BrainCircuit, Lock, ShieldCheck, Sparkles, Check } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  // Fetch the user's profile to check their plan
  const { data: profile } = await supabase
    .from('profiles')
    .select('plan_type')
    .eq('id', user.id)
    .single();

  const isElite = profile?.plan_type === 'elite_mensal' || profile?.plan_type === 'elite_anual';

  // Stripe Links from User parameters
  // Stripe Links from User parameters
  const linkMensal = `https://buy.stripe.com/test_6oU28s5Bs5oOfLEgvp33W00?client_reference_id=${user.id}`;
  const linkAnual = `https://buy.stripe.com/test_3cIcN6gg68B0czs92X33W01?client_reference_id=${user.id}`;

  const mockProgress = {
    completedClasses: 0,
    totalClasses: 0,
    percentage: 0,
  };

  // Trial Logic
  const createdAtDate = new Date(user.created_at);
  const trialExpiresAt = new Date(createdAtDate.getTime() + 7 * 24 * 60 * 60 * 1000);
  const now = new Date();
  const isTrialActive = now < trialExpiresAt;
  const trialDaysLeft = Math.ceil((trialExpiresAt.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

  // Se o usuário não for elite, trava na tela de assinatura!
  if (!isElite) {
    return (
      <div className="min-h-screen bg-[#FDFCFB] flex flex-col items-center justify-center p-6 relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-gradient-to-b from-gold-100/50 to-transparent blur-3xl -z-10" />
        
        <div className="max-w-4xl w-full space-y-10 z-10 text-center mt-12 mb-20">
          
          {!isElite && isTrialActive && (
            <div className="bg-gold-50 border border-gold-200 text-brown-800 rounded-2xl p-6 text-left shadow-sm max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <div className="bg-gold-100 p-3 rounded-full shrink-0">
                <Sparkles className="w-6 h-6 text-gold-600"/>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1 text-brown-900">Seu Teste Grátis está em andamento! ({trialDaysLeft} dias restantes)</h3>
                <p className="text-sm font-medium mb-4">Você já tem acesso VIP a alguns dos nossos melhores Agentes (como Iscas gratuitas). Volte para utilizá-los, ou aproveite para assinar e liberar TODOS de uma vez!</p>
                <Link href="/agents" className="inline-block bg-brown-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-gold-600 transition-colors">Voltar para os Agentes Gratuitos</Link>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-gold-50 text-gold-700 px-4 py-2 rounded-full font-bold text-sm border border-gold-200 shadow-sm animate-pulse">
              <Lock className="w-4 h-4" />
              Acesso Restrito
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brown-900 tracking-tight">
              Desbloqueie seu <span className="text-gold-500">Raciocínio Clínico</span>
            </h1>
            <p className="text-lg text-brown-800/70 max-w-2xl mx-auto font-medium">
              Sua conta gratuita foi criada com sucesso! Para acessar os Simuladores de IA, Mentoria CPG e Videoaulas, ative a sua assinatura Elite.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Mensal Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-brown-100 shadow-lg relative flex flex-col hover:border-gold-300 transition-all duration-300">
              <h3 className="text-xl font-bold text-brown-900 mb-2">Fisio Elite Mensal</h3>
              <p className="text-brown-800/60 font-medium text-sm mb-6">Flexibilidade para estudar no seu ritmo.</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-brown-900">R$ 67</span>
                <span className="text-brown-800/60 font-medium">/mês</span>
              </div>

              <ul className="space-y-4 mb-8 text-left text-sm font-semibold text-brown-800">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-500 shrink-0" /> Acesso a todos os agentes IA</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-500 shrink-0" /> Casos clínicos ilimitados</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-500 shrink-0" /> Raciocínio Baseado em CPGs</li>
                <li className="flex items-start gap-3 text-brown-800/50"><Lock className="w-5 h-5 shrink-0" /> Suporte VIP no WhatsApp</li>
              </ul>

              <a 
                href={linkMensal}
                className="mt-auto w-full py-4 px-6 rounded-xl bg-brown-50 hover:bg-brown-100 text-brown-900 font-bold border border-brown-200 transition-colors flex justify-center items-center gap-2"
              >
                Assinar Mensal
              </a>
            </div>

            {/* Anual Card (Destaque) */}
            <div className="bg-brown-900 rounded-[2rem] p-8 border border-gold-500/30 shadow-2xl relative flex flex-col transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold-500 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                <Sparkles className="w-3 h-3" /> Mais Vantajoso
              </div>

              <h3 className="text-xl font-bold text-white mb-2">Fisio Elite Anual</h3>
              <p className="text-brown-200 font-medium text-sm mb-6">Comprometimento total com sua carreira.</p>
              
              <div className="mb-6">
                <span className="text-4xl font-black text-white">R$ 497</span>
                <span className="text-brown-300 font-medium">/ano</span>
                <div className="text-gold-400 text-sm font-bold mt-1">Economize R$ 307 (38% OFF)</div>
              </div>

              <ul className="space-y-4 mb-8 text-left text-sm font-semibold text-brown-100">
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-400 shrink-0" /> TUDO do plano mensal</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-400 shrink-0" /> Lives e Workshops Exclusivos</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-400 shrink-0" /> Certificado de Horas (em breve)</li>
                <li className="flex items-start gap-3"><Check className="w-5 h-5 text-gold-400 shrink-0" /> Suporte VIP no WhatsApp</li>
              </ul>

              <a 
                href={linkAnual}
                className="mt-auto w-full py-4 px-6 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-black shadow-lg shadow-gold-500/20 transition-all active:scale-95 flex justify-center items-center gap-2"
              >
                Assinar Anual 
              </a>
              <p className="text-center text-brown-400 text-xs mt-4 flex items-center justify-center gap-1">
                <ShieldCheck className="w-3 h-3" /> Pagamento 100% Seguro
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard Tradicional para Assinantes Elite
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A3B32] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#3A2E27]">Bem-vindo de volta!</h1>
            <p className="text-[#8E7D73] mt-1">Sua Conta Elite está ativa. Vamos treinar raciocínio clínico?</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-gold-100 flex items-center justify-center text-gold-600 font-black text-xl border-4 border-white shadow-md">
            PRO
          </div>
        </header>

        {/* Progress Widget */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-[#E8E3DF] flex items-center gap-8">
          <div className="relative w-32 h-32 shrink-0">
            {/* Simple CSS Donut */}
            <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
              <path
                className="text-[#F5F2EF]"
                strokeWidth="4"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#D4AF37] transition-all duration-1000 ease-out"
                strokeDasharray={`${mockProgress.percentage}, 100`}
                strokeWidth="4"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-2xl font-bold text-[#3A2E27]">{mockProgress.percentage}%</span>
            </div>
          </div>
          <div className="flex-1 space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-[#3A2E27]">Progresso do Módulo Atual</h2>
              <p className="text-[#8E7D73]">Ortopedia Clínica & Traumatologia</p>
            </div>
            <div className="flex items-center gap-4 text-sm text-[#8E7D73] font-medium">
              <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4 text-[#D4AF37]" /> {mockProgress.completedClasses} aulas concluídas</span>
              <span className="flex items-center gap-1"><PlayCircle className="w-4 h-4 text-[#C4B7B0]" /> {mockProgress.totalClasses} no total</span>
            </div>
          </div>
          <div className="shrink-0">
            <div 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-200 text-gray-500 font-bold rounded-xl shadow-inner cursor-not-allowed"
            >
              <Lock className="w-4 h-4" />
              EM BREVE !
            </div>
          </div>
        </section>

        {/* Action Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="group bg-gray-50/50 p-6 rounded-2xl border border-[#E8E3DF] cursor-not-allowed relative overflow-hidden">
            <div className="absolute top-4 right-4 bg-gray-200 text-gray-600 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 uppercase tracking-wider">
               <Lock className="w-3 h-3" /> Em Breve
            </div>
            <div className="w-12 h-12 rounded-lg bg-gray-100 text-gray-400 border border-gray-200 flex items-center justify-center mb-4">
              <PlayCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-gray-500 mb-2">Vídeos</h3>
            <p className="text-gray-400 text-sm">Acesse o acervo completo de masterclasses e práticas gravadas.</p>
          </div>

          <Link href="/agents" className="group bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF] hover:border-[#D4AF37] transition-colors">
            <div className="w-12 h-12 rounded-lg bg-[#FDFCFB] text-[#B8860B] border border-[#E8E3DF] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-[#3A2E27] mb-2">Agentes de IA</h3>
            <p className="text-[#8E7D73] text-sm">Acesso Liberado! Simuladores focados em diferentes áreas de especialidade médica.</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
