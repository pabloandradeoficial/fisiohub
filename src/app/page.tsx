import Link from 'next/link';
import { ArrowRight, CheckCircle2, PlayCircle, BrainCircuit, ActivitySquare, Award, BookOpen, GraduationCap } from 'lucide-react';

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
      <main className="pt-32 pb-20 px-6 lg:pt-48 bg-brown-50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gold-200 text-gold-600 text-sm font-semibold shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
              </span>
              Metodologia Validada & Evidência Atual
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-black tracking-tight text-brown-900 leading-[1.15]">
              A ponte entre o <span className="text-gold-500">Protocolo</span> e a <span className="text-brown-800">Cura</span>.
            </h1>
            
            <p className="text-xl text-brown-800/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-medium">
              Desenvolva um **raciocínio clínico impenetrável**. Treine diagnósticos com casos reais e receba mentoria ao vivo da nossa IA treinada com os maiores consensos da fisioterapia mundial.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link 
                href="/register" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gold-500 hover:bg-gold-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-gold-500/30 transition-all focus:ring-4 focus:ring-gold-500/30 active:scale-95"
              >
                Inicie Sua Jornada
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                href="/modules" 
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-brown-100 text-brown-900 text-lg font-bold rounded-2xl border border-brown-200 transition-colors shadow-sm"
              >
                <PlayCircle className="w-5 h-5 text-gold-500" />
                Explorar Módulos
              </Link>
            </div>

            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4 text-sm font-semibold text-brown-800/60">
              <span className="flex items-center gap-1.5 border-r border-brown-200 pr-8">
                <CheckCircle2 className="w-4 h-4 text-gold-500" /> Gamificação
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-gold-500" /> Prática Baseada em Evidências
              </span>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-gold-400 to-brown-500 rounded-[2.5rem] blur-2xl opacity-20" />
            <div className="relative bg-white border border-brown-100 p-2 rounded-[2rem] shadow-2xl">
              <img 
                src="/pablo.jpg1.png" 
                alt="Dr. Pablo Andrade - Metodologia" 
                className="rounded-[1.5rem] w-full object-cover object-[center_15%] aspect-square lg:aspect-[4/3]"
              />
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-xl border border-brown-100 flex items-center gap-3 animate-bounce">
                <div className="bg-gold-50 p-2 rounded-lg text-gold-600">
                  <BrainCircuit className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-brown-800/60 uppercase tracking-wider">Feedback IA</p>
                  <p className="font-bold text-brown-900 text-sm">Raciocínio clínico aprovado!</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* About the Instructor Section */}
      <section className="bg-white py-24 border-t border-brown-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            
            {/* Foto e Badge do Instrutor */}
            <div className="lg:w-1/3 relative">
              <div className="absolute -inset-4 bg-gradient-to-tr from-gold-400 to-transparent opacity-20 rounded-full blur-xl"></div>
              {/* NOTE: You need to drag and drop your photo into the 'public' folder and rename it to 'pablo.jpg' */}
              <img 
                src="/pablo.jpg.png" 
                alt="Dr. Pablo Andrade" 
                className="relative rounded-3xl object-cover shadow-2xl border-4 border-white aspect-[4/5] object-top z-10 w-full"
              />
              <div className="absolute -right-4 top-8 bg-white p-4 rounded-2xl shadow-xl border border-brown-100 z-20">
                <div className="flex items-center gap-3">
                   <Award className="w-8 h-8 text-gold-500" />
                   <div>
                     <p className="text-xs font-bold text-brown-800/60 uppercase">Especialista</p>
                     <p className="font-bold text-brown-900">Ortopedia & Esporte</p>
                   </div>
                </div>
              </div>
            </div>

            {/* Currículo e Expertise */}
            <div className="lg:w-2/3 space-y-8">
              <div>
                <h2 className="text-gold-500 font-bold uppercase tracking-widest text-sm mb-2">Seu Mentor Clínico</h2>
                <h3 className="text-4xl lg:text-5xl font-black text-brown-900 mb-6">Dr. Pablo Miranda Andrade</h3>
                <p className="text-lg text-brown-800/80 leading-relaxed font-medium">
                  Fisioterapeuta clínico, Pesquisador Assistente na UNIS, e entusiasta das melhores práticas baseadas em evidências. Trago anos de pesquisa prática focada em envelhecimento, performance funcional e recuperação musculoesquelética para dentro da inteligência do FisioHub.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-brown-100">
                
                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <GraduationCap className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Pesquisador & Docente</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Design de pesquisa metodológica em geriatria, reabilitação biomecânica e inovação no ensino superior (UNIS).</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <ActivitySquare className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Clínica & Ortopedia</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Especialista em Traumatologia e Fisioterapia Desportiva Avançada com milhares de atendimentos na prática privada.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <Award className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Certificações Avançadas</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Integração multimodal: McKenzie (MDT), Quiropraxia Desportiva, Dry Needling, e Pilates Clínico.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-brown-50 p-3 rounded-xl h-fit">
                    <BookOpen className="text-gold-600 w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brown-900">Publicações Científicas</h4>
                    <p className="text-sm text-brown-800/70 mt-1 font-medium">Análise de fatores biopsicossociais, performance em corredores e qualidade do sono (Revista FT).</p>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="bg-brown-50 border-t border-brown-100 py-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black text-brown-900 mb-12">Como a FisioHub eleva a sua performance?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white border border-brown-100 shadow-sm hover:border-gold-300 transition-colors">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">Clínica Acima de Tudo</h3>
              <p className="text-brown-800/70 font-medium">Deixe a "coreografia" de lado. Te guiamos pela verdadeira propedêutica ortopédica baseada em cluster de sinais.</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-brown-100 shadow-sm hover:border-gold-300 transition-colors">
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">Mentoria 1 a 1 com IA</h3>
              <p className="text-brown-800/70 font-medium">Chega de errar diagnósticos sozinho. O nosso mentor IA refina suas decisões passo-a-passo baseando-se em diretrizes clínicas (CPGs).</p>
            </div>
            <div className="p-8 rounded-2xl bg-white border border-brown-100 shadow-sm hover:border-gold-300 transition-colors">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-bold text-brown-900 mb-2">Evolução Gamificada</h3>
              <p className="text-brown-800/70 font-medium">Sua retenção importa. Destrave conquistas, e veja sua acurácia de raciocínio subir enquanto escala os rankings internos.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
