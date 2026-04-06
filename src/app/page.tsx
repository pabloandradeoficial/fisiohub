import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowRight, CheckCircle2, PlayCircle, BrainCircuit, ActivitySquare, 
  Award, BookOpen, GraduationCap, ShieldCheck, Lock, ChevronRight, Stethoscope, BriefcaseMedical, 
  Bone, Dna, Radio, Hand, ClipboardList 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-brown-900 font-sans selection:bg-gold-500 selection:text-white">
      
      {/* Navigation */}
      <nav className="fixed w-full top-0 bg-white/90 backdrop-blur-md border-b border-brown-100 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 text-2xl font-black tracking-tight text-brown-900">
            <ActivitySquare className="w-8 h-8 text-gold-500" />
            <span>Fisio<span className="text-gold-500">Hub</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-semibold text-brown-800 hover:text-gold-600 transition-colors">
              Entrar
            </Link>
            <Link href="/register" className="text-sm font-bold text-white bg-brown-900 px-6 py-2.5 rounded-full hover:bg-brown-800 transition-colors shadow-sm">
              Criar Conta Elite
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="pt-32 pb-20 px-6 lg:pt-40 bg-gradient-to-b from-brown-50 to-white relative overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-gold-200 text-gold-700 text-xs font-bold shadow-sm tracking-wide uppercase">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            Conforme Normas Educacionais & LGPD
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-brown-900 leading-[1.15]">
            Sua própria equipe clínica de <span className="text-gold-500">Mentores IA</span> 24 horas por dia.
          </h1>
          
          <p className="text-xl text-brown-800/80 max-w-3xl mx-auto leading-relaxed font-medium">
            Plataforma definitiva para <strong>estudantes e fisioterapeutas formados</strong>. Desenvolva um raciocínio clínico impenetrável, pare de tomar decisões isoladas e treine casos reais em ambiente seguro com Agentes avalizados pelas maiores diretrizes globais (CPGs).
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="#planos" 
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-10 py-5 bg-gold-500 hover:bg-gold-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-gold-500/30 transition-all focus:ring-4 focus:ring-gold-500/30 active:scale-95"
            >
              Iniciar Treinamento
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 pt-6 text-sm font-semibold text-brown-800/60">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-500" /> Prática Baseada em Evidências
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-500" /> Casos Clínicos Ilimitados
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-gold-500" /> Gamificação e Retenção
            </span>
          </div>
        </div>
      </main>

      {/* O Arsenal de IA (Nova Seção) */}
      <section className="bg-white py-24 border-t border-brown-100 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-3">O Arsenal Clínico</h2>
            <h3 className="text-4xl font-black text-brown-900 mb-6">Não consulte a internet. Discuta com a referência exata.</h3>
            <p className="text-lg text-brown-800/70 font-medium">
              Nossa plataforma não é apenas um assistente geral. Construímos diferentes Agentes de IA Arquitetos, cada um com um "cérebro" restrito e exaustivamente treinado para avaliar, propor e debater condutas estritamente dentro da sua área de atuação.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bone className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Traumato-Ortopedia</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Mentoria focada em conduta clínica, biomecânica, testes ortopédicos especiais e diagnóstico diferencial apurado.
              </p>
            </div>

            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ClipboardList className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Avaliação Avançada</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Aprimore o raciocínio propedêutico e agrupe clusters de testes para garantir a precisão antes da intervenção.
              </p>
            </div>

            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Radio className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Agentes Físicos</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Consultoria em dosimetria e indicação de Recursos Hídricos, Biotérmicos, Bioelétricos e Fototerápicos.
              </p>
            </div>

            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Hand className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Terapias Manuais</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Decisões guiadas para o uso correto de Recursos Terapêuticos Manuais e práticas integrativas na reabilitação.
              </p>
            </div>

            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ActivitySquare className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Reumatológica</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Abordagem rigorosa focada no controle e progressão terapêutica em doenças autoimunes e inflamatórias crônicas.
              </p>
            </div>

            <div className="bg-brown-50 p-8 rounded-3xl border border-brown-100 hover:border-gold-300 transition-colors group">
              <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Dna className="w-7 h-7 text-gold-600" />
              </div>
              <h4 className="text-xl font-bold text-brown-900 mb-3">Fundamentação Anatômica</h4>
              <p className="text-brown-800/70 font-medium text-sm leading-relaxed">
                Revisão profunda e ágil sobre anatomia palpatória, estrutural e cinesiologia aplicada à clínica diária.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security, Ethics and Compliance (Nova Seção) */}
      <section className="bg-brown-900 text-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
               <h2 className="text-3xl lg:text-4xl font-black mb-6">Ambiente Ético, Seguro e em Conformidade Legal.</h2>
               <p className="text-brown-200 text-lg leading-relaxed">
                 A prática baseada em evidências exige responsabilidade irrestrita. O FisioHub adota protocolos de segurança de nível hospitalar e respeita as delimitações educacionais.
               </p>

               <div className="space-y-6 pt-4">
                 <div className="flex gap-4 items-start">
                   <div className="bg-white/10 p-3 rounded-full mt-1">
                     <ShieldCheck className="w-6 h-6 text-gold-400" />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-white mb-2">Treinamento Ético (Sistema Crefito)</h4>
                     <p className="text-brown-300 text-sm leading-relaxed">A FisioHub é um ambiente de simulação e suporte educacional. Encorajamos e preservamos a soberania irrestrita do julgamento clínico presencial regido pelo COFFITO. As inteligências não fornecem laudos, apenas enriquecem o repertório probatório.</p>
                   </div>
                 </div>
                 
                 <div className="flex gap-4 items-start">
                   <div className="bg-white/10 p-3 rounded-full mt-1">
                     <Lock className="w-6 h-6 text-gold-400" />
                   </div>
                   <div>
                     <h4 className="text-xl font-bold text-white mb-2">Anonimização e LGPD</h4>
                     <p className="text-brown-300 text-sm leading-relaxed">Criptografia de ponta a ponta na transmissão dos dados. Treine sem expor dados reais de pacientes, atuando nas delimitações estritas das Leis Internacionais e da LGPD Brasileira no setor da saúde.</p>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gold-500/20 blur-3xl rounded-full" />
              <div className="bg-brown-800/50 backdrop-blur-xl border border-white/10 p-10 rounded-[2rem] relative shadow-2xl">
                <ShieldCheck className="w-20 h-20 text-gold-400 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Pagamento 100% Protegido</h3>
                <p className="text-brown-300 mb-6">Seus dados financeiros não circulam nos nossos servidores. Todo faturamento é blindado pela infraestrutura Stripe, certificada globalmente com o selo PCI-DSS.</p>
                <div className="flex items-center gap-2 text-sm text-gold-400 font-bold uppercase tracking-wider">
                  <Lock className="w-4 h-4" /> Certificado SSL Seguro
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Architect / Engineer Section */}
      <section className="bg-white py-24 border-t border-brown-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            <div className="lg:w-1/3 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold-400 to-transparent opacity-20 rounded-full blur-xl"></div>
              <Image 
                src="/pablo.jpg.png" 
                alt="Dr. Pablo Andrade" 
                width={600}
                height={750}
                priority
                className="relative rounded-3xl object-cover shadow-2xl border-4 border-white aspect-[4/5] object-top z-10 w-full"
              />
              <div className="absolute -right-4 top-8 bg-white p-4 rounded-2xl shadow-xl border border-brown-100 z-20">
                <div className="flex items-center gap-3">
                   <BrainCircuit className="w-8 h-8 text-gold-500" />
                   <div>
                     <p className="text-xs font-bold text-brown-800/60 uppercase">Engenharia Clínica</p>
                     <p className="font-bold text-brown-900">IA Supervisionada</p>
                   </div>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 space-y-8">
              <div>
                 <h2 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-2">Quem calibra o sistema?</h2>
                 <h3 className="text-4xl lg:text-5xl font-black text-brown-900 mb-6">Dr. Pablo Miranda Andrade</h3>
                 <p className="text-lg text-brown-800/80 leading-relaxed font-medium">
                   O "Cérebro" por trás das inteligências da plataforma. Fisioterapeuta clínico e Pesquisador Assistente na UNIS. Como Engenheiro Clínico das IAs do FisioHub, aplico as regras, crio as amarras e audito exaustivamente os robôs para que o conhecimento entregue nas mentorias jamais fuja do escopo da prática clínica baseada em evidências.
                 </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-brown-100">
                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <GraduationCap className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Pesquisador Metodológico</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Design de pesquisa metodológica aplicada à reabilitação biomecânica e inovação em ensino superior na UNIS.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <BriefcaseMedical className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Clínica & Ortopedia</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Formação de excelência em Traumatologia e Fisioterapia Desportiva com milhares de atendimentos na prática particular.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <Award className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Capacitações Avançadas</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Integração técnica com o Método McKenzie (MDT), Quiropraxia Desportiva, Dry Needling, e fundamentos de Pilates Clínico.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <BookOpen className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Publicações & Validação</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Autoria em estudos de fatores biopsicossociais, performance desportiva e análise científica publicada (Revista FT).</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Pricing Section (High Conversion Focus) */}
      <section className="bg-brown-50 py-24 relative" id="planos">
        <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-700 text-sm font-semibold shadow-sm mb-6">
            <ShieldCheck className="w-4 h-4 text-gold-500" />
            7 Dias de Garantia Incondicional
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-brown-900 mb-6 tracking-tight">Investimento em <span className="text-gold-500">Confiabilidade</span></h2>
          <p className="text-lg text-brown-800/70 max-w-2xl mx-auto font-medium mb-16">
            Ao assinar, o seu acesso a todo o Arsenal de IA é imediato. O risco é inteiramente nosso pelo Código de Defesa do Consumidor. Confie e teste suas habilidades hoje.
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
            {/* Mensal Card */}
            <div className="bg-white rounded-[2rem] p-10 border border-brown-100 shadow-xl relative flex flex-col hover:border-gold-300 transition-all duration-300 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-brown-900 mb-2">Acesso Mensal</h3>
              <p className="text-brown-800/60 font-medium mb-8">Treinamento constante e flexibilidade com cobrança recorrente automatizada.</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-brown-900">R$ 67</span>
                <span className="text-brown-800/60 font-medium text-lg">/mês</span>
              </div>

              <ul className="space-y-4 mb-10 font-semibold text-brown-800">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" /> Acesso irrestrito às 6 IAs Mentoras</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" /> Raciocínio Baseado nas Diretrizes (CPGs)</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-500 shrink-0" /> Biblioteca de Casos Práticos Gravados</li>
                <li className="flex items-start gap-3 text-brown-800/40"><CheckCircle2 className="w-5 h-5 shrink-0" /> Restrito: Acesso Direto com os Mentores</li>
              </ul>

              <Link 
                href="/register"
                className="mt-auto w-full py-4 px-6 rounded-xl bg-brown-50 hover:bg-brown-100 text-brown-900 font-bold border border-brown-200 transition-colors flex justify-center items-center gap-2 text-lg"
              >
                Garantir Assinatura Mensal
              </Link>
            </div>

            {/* Anual Card (Destaque) */}
            <div className="bg-brown-900 rounded-[2rem] p-10 border border-gold-500/30 shadow-2xl relative flex flex-col transform md:-translate-y-4">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-gold-500 text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-wider shadow-lg">
                Recomendado (Melhor Valor)
              </div>

              <h3 className="text-2xl font-bold text-white mb-2">Acesso Anual</h3>
              <p className="text-brown-200 font-medium mb-8">Imersão definitiva na excelência clínica com benefícios extras.</p>
              
              <div className="mb-8">
                <span className="text-5xl font-black text-white">R$ 497</span>
                <span className="text-brown-300 font-medium text-lg">/ano</span>
                <div className="text-gold-400 text-sm font-bold mt-2 bg-gold-500/10 inline-block px-3 py-1 rounded-md">Parcelável. Equivale a apenas R$ 41,41/mês.</div>
              </div>

              <ul className="space-y-4 mb-10 font-semibold text-brown-50">
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" /> Todos os recursos do Plano Mensal inclusos</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" /> Acesso exclusivo a Workshops Analíticos</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" /> Emissão Formal de Certificados e Horas</li>
                <li className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-gold-400 shrink-0" /> Canal de dúvidas fechado no WhatsApp</li>
              </ul>

              <Link 
                href="/register"
                className="mt-auto w-full py-4 px-6 rounded-xl bg-gold-500 hover:bg-gold-400 text-white font-black shadow-lg shadow-gold-500/20 transition-all active:scale-95 flex justify-center items-center gap-2 text-lg"
              >
                Garantir Assinatura Anual
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Legal */}
      <footer className="bg-white border-t border-brown-100 py-12">
        <div className="max-w-7xl mx-auto px-6 text-center text-brown-800/60 font-medium text-sm space-y-4">
          <div className="flex items-center justify-center gap-2 mb-6">
            <ActivitySquare className="w-6 h-6 text-gold-500 opacity-50" />
            <span className="text-lg font-black tracking-tight text-brown-900 opacity-50">FisioHub</span>
          </div>
          <p className="max-w-3xl mx-auto leading-relaxed">
            As informações apresentadas e as simulações executadas na FisioHub são exclusivas para fins de instrução acadêmica e aprimoramento contínuo de profissionais. **A plataforma não formula prescrições definitivas e requer ativamente que a gestão de pacientes ocorra exclusivamente sob a competência, regulamentação e soberania inalienável do julgamento do Profissional Fisioterapeuta**, em integral obediência às determinações do sistema COFFITO/CREFITOs.
          </p>
          <div className="flex justify-center gap-6 pt-4 border-t border-brown-100 mt-6 translate-y-2">
            <Link href="/termos" className="hover:text-brown-900 transition-colors">Termos de Uso</Link>
            <Link href="/privacidade" className="hover:text-brown-900 transition-colors">Política de Privacidade (LGPD)</Link>
          </div>
          <p className="pt-4">© {new Date().getFullYear()} FisioHub Educacional. Todos os direitos reservados.</p>
        </div>
      </footer>

    </div>
  );
}
