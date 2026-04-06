'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, BrainCircuit, User, Zap, Activity, Heart, Wind, Users, Shield, Sparkles, Stethoscope, Target, Combine, Search, Bone, BookOpen, ClipboardCheck, BarChart3, Scale, ShieldAlert, HeartHandshake, Briefcase, FileText, Calculator, Landmark, LineChart, Receipt, TrendingUp, Star, LogOut, MessageSquare } from 'lucide-react';
import { Lock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

interface AgentsClientProps {
  isElite: boolean;
  isTrialActive: boolean;
  trialDaysLeft: number;
  userEmail?: string;
}

export default function AgentsClient({ isElite, isTrialActive, trialDaysLeft, userEmail }: AgentsClientProps) {
  const [activeCategory, setActiveCategory] = useState('pratica');

  const categories = [
    { id: 'pratica', name: 'Prática Clínica' },
    { id: 'pesquisa', name: 'Pesquisa' },
    { id: 'pablo', name: 'Mentoria Pablo' },
    { id: 'juridico', name: 'Jurídico' },
    { id: 'contabil', name: 'Contábil' },
  ];

  const supabase = createClient();

  const agents = [
    // --- PRÁTICA CLÍNICA ---
    { id: 'anatomia', category: 'pratica', name: 'Fundamentação Anatômica', description: 'Mestre em anatomia palpatória, estrutural e cinesiologia clínica.', icon: User, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'avaliacao-avancada', category: 'pratica', name: 'Avaliação Avançada', description: 'Focado em raciocínio propedêutico e cluster de testes para garantir precisão diagnóstica.', icon: Search, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'traumato-ortopedia', category: 'pratica', name: 'Traumato-ortopedia', description: 'Especialista em conduta clínica, biomecânica e diagnóstico diferencial.', icon: Bone, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'agentes-fisicos', category: 'pratica', name: 'Agentes Físicos e Biotérmicos', description: 'Agentes Hídricos, Biotérmicos, Bioelétricos e Fitoterápicos.', icon: Zap, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'terapia-manual', category: 'pratica', name: 'Terapias Manuais', description: 'Recursos Terapêuticos Manuais e Práticas Integrativas.', icon: Combine, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'reumatologica', category: 'pratica', name: 'Fisioterapia Reumatológica', description: 'Abordagem focada em doenças autoimunes e inflamatórias crônicas.', icon: Activity, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'cardiovascular', category: 'pratica', name: 'Fisio Cardiovascular', description: 'Fisioterapia Cardiovascular Ambulatorial e Hospitalar.', icon: Heart, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'respiratoria', category: 'pratica', name: 'Fisioterapia Respiratória', description: 'Fisioterapia Ambulatorial e Hospitalar focada em mecânica ventilatória.', icon: Wind, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'saude-mulher', category: 'pratica', name: 'Saúde da Mulher', description: 'Baseada na Saúde da Mulher e Sexualidade, abordando assoalho pélvico.', icon: Users, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'geriatrica', category: 'pratica', name: 'Fisioterapia Geriátrica', description: 'Fisioterapia Gerontológica focada em prevenção de quedas e sarcopenia.', icon: Activity, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'intensiva', category: 'pratica', name: 'Fisio Intensiva & Neonatologia', description: 'Manuseio em UTI adulto e Neonatologia com raciocínio ventilatório.', icon: Stethoscope, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'esporte', category: 'pratica', name: 'Fisioterapia do Esporte', description: 'Recuperação atlética, return-to-play e alta performance esportiva.', icon: Target, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'preventiva', category: 'pratica', name: 'Fisioterapia Preventiva', description: 'Abordagem focada em profilaxia funcional a longo prazo.', icon: Shield, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'dermatofuncional', category: 'pratica', name: 'Fisio Dermatofuncional', description: 'Tratamentos reparadores com evidência para tecidos tegumentares.', icon: Sparkles, color: 'bg-brown-50', iconColor: 'text-gold-600' },

    // --- PESQUISA ---
    { id: 'pesquisa-tcc', category: 'pesquisa', name: 'Mentoria em TCC', description: 'Apoio na formulação da pergunta (PICO), metodologia e revisão bibliográfica.', icon: BookOpen, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'pesquisa-cep', category: 'pesquisa', name: 'Aprovação no CEP', description: 'Guia definitivo para preencher Plataforma Brasil e evitar pendências éticas.', icon: ClipboardCheck, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'pesquisa-estatistica', category: 'pesquisa', name: 'Análise Estatística', description: 'Ajuda para interpretar SPSS, p-valor e escolher o teste exato para a sua amostra.', icon: BarChart3, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },

    // --- MENTOR PABLO ---
    { id: 'pablo-mentor', category: 'pablo', name: 'Mentor Pablo Andrade', description: 'Visão de carreira, negócios, networking e transição para alto impacto clínico.', icon: Star, color: 'bg-gold-50', iconColor: 'text-gold-600', isFree: true },

    // --- JURÍDICO ---
    { id: 'direito-civil-penal', category: 'juridico', name: 'Responsabilidade Civil e Penal', description: 'Blindagem legal para clínicas, prevenção de glosas por danos e litígios.', icon: Scale, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'direito-consumidor', category: 'juridico', name: 'Direito do Consumidor', description: 'Tratamento das obrigações do fisioterapeuta perante o serviço e contratos.', icon: HeartHandshake, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'direito-paciente', category: 'juridico', name: 'Direitos do Paciente', description: 'Lidando com autonomia, consentimento livre e esclarecido (TCLE) com segurança.', icon: ShieldAlert, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'direito-trabalho', category: 'juridico', name: 'Direito do Trabalho', description: 'Tipos de associação comercial na clínica, sócios e direitos trabalhistas.', icon: Briefcase, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'direito-administrativo', category: 'juridico', name: 'Direito Administrativo', description: 'Regimes com planos de saúde, ANS e autarquias públicas.', icon: FileText, color: 'bg-brown-50', iconColor: 'text-gold-600' },

    // --- CONTÁBIL ---
    { id: 'contabil-tributario', category: 'contabil', name: 'Planejamento Tributário', description: 'Regimes tributários: Vale a pena ser Simples Nacional? CPF vs CNPJ.', icon: Landmark, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'contabil-custos', category: 'contabil', name: 'Custos e Precificação', description: 'Como calcular seu custo Fixo/Variável e definir o valor ideal do atendimento.', icon: Calculator, color: 'bg-brown-50', iconColor: 'text-gold-600', isFree: true },
    { id: 'contabil-fluxo', category: 'contabil', name: 'Fluxo de Caixa (DRE)', description: 'Gestão visual do seu caixa e leitura real de Demonstração de Resultado.', icon: LineChart, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'contabil-faturamento', category: 'contabil', name: 'Convênios e Glosas', description: 'Táticas financeiras contra glosa, recurso de pagamento e gestão de convênios.', icon: Receipt, color: 'bg-brown-50', iconColor: 'text-gold-600' },
    { id: 'contabil-roi', category: 'contabil', name: 'Investimento (ROI) e Depreciação', description: 'Antes de comprar um equipamento caro, calcule o Retorno e o desgaste anual.', icon: TrendingUp, color: 'bg-brown-50', iconColor: 'text-gold-600' },
  ];

  const filteredAgents = agents.filter(agent => agent.category === activeCategory);

  return (
    <div className="min-h-screen bg-white text-brown-900">
      <nav className="border-b border-brown-100 bg-white/50 backdrop-blur-xl sticky top-0 z-20 w-full">
        {/* Banner Freemium Trial */}
        {!isElite && isTrialActive && (
          <div className="bg-gradient-to-r from-gold-500 to-gold-600 text-white py-2 px-4 text-center font-bold text-sm tracking-tight border-b border-gold-600/30">
            ⏳ Você está usando seu Teste Grátis <span className="opacity-80 font-normal">({trialDaysLeft} dias restantes)</span>. Aproveite 2 Agentes de cada categoria.
            <Link href="/dashboard" className="ml-3 underline hover:text-gold-100">Ver Assinatura Completa</Link>
          </div>
        )}

        <div className="max-w-6xl mx-auto px-6 h-20 flex flex-col sm:flex-row items-center gap-4 justify-between">
          <div className="flex items-center gap-4 w-full sm:w-auto h-full pt-4 sm:pt-0">
             <Link href="/dashboard" className="p-2 -ml-2 sm:-ml-0 hover:bg-brown-50 rounded-full transition-colors text-brown-500 hover:text-brown-800">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <BrainCircuit className="w-6 h-6 text-gold-500" />
              <span className="font-bold text-xl tracking-tight text-brown-900 hidden sm:block">FisioHub Inteligência</span>
            </div>
          </div>
          
          <button onClick={async () => { await supabase.auth.signOut(); window.location.href = '/login'; }} className="flex items-center gap-2 text-brown-500 hover:text-red-500 transition-colors bg-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm border border-brown-100">
            Sair <LogOut className="w-4 h-4" />
          </button>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-12 lg:py-16">
        <header className="mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-black text-brown-900 tracking-tight mb-4">Comitê Executivo e Clínico</h1>
          <p className="text-lg text-brown-600 font-medium leading-relaxed max-w-2xl">
            Sua universidade de mentoria pessoal. Acesse especialistas em raciocínio propedêutico, assessoria contábil, jurídica, inteligência de pesquisa e negócios.
          </p>
        </header>

        {/* DESAFIO SEMANAL (ISCA FREE) */}
        <div className="mb-12 w-full bg-gradient-to-r from-brown-900 to-brown-800 rounded-3xl p-8 sm:p-10 text-white relative overflow-hidden shadow-xl border border-brown-700 group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 group-hover:bg-gold-500/20 transition-colors duration-700"></div>
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-gold-500/20 text-gold-300 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-gold-500/30">
                <Sparkles className="w-3 h-3" /> Caso Clínico da Semana (Aberto)
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-2">D. Maria, 68 anos - Dor Lombar e Risco de Queda</h2>
              <p className="text-brown-200 font-medium max-w-xl text-sm sm:text-base">
                Ajude a rastrear a fraqueza muscular e defina a conduta assertiva. Descubra como a IA pode guiar seu Raciocínio Clínico passo a passo.
              </p>
            </div>
            <Link 
              href="/chat/geriatrica" 
              className="shrink-0 w-full sm:w-auto bg-gold-500 hover:bg-gold-400 text-brown-900 px-8 py-4 rounded-2xl font-bold transition-all shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] flex items-center justify-center gap-2 hover:-translate-y-1"
            >
              Testar Agora <ArrowLeft className="w-5 h-5 rotate-180" />
            </Link>
          </div>
        </div>

        {/* TABS DE NAVEGAÇÃO HORIZONTAL */}
        <div className="mb-12 overflow-x-auto custom-scrollbar pb-3 -mx-6 px-6 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-3 w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-6 py-3 rounded-full font-bold text-sm sm:text-base tracking-tight transition-all duration-300 ${
                  activeCategory === cat.id 
                    ? 'bg-brown-900 text-white shadow-lg' 
                    : 'bg-brown-50 text-brown-600 hover:bg-brown-100 hover:text-brown-900'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-500">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            const isLocked = !isElite && !agent.isFree;

            return (
              <Link
                key={agent.id}
                href={isLocked ? "/dashboard" : `/chat/${agent.id}`}
                className={`group relative bg-white border border-brown-100 rounded-3xl p-8 transition-all duration-300 flex flex-col ${isLocked ? 'opacity-70 hover:opacity-100' : 'hover:border-gold-300 hover:shadow-xl hover:-translate-y-1'}`}
              >
                {!isLocked && <div className="absolute inset-0 bg-gradient-to-br from-gold-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />}
                
                {isLocked && (
                  <div className="absolute top-4 right-4 bg-brown-50 text-brown-400 p-2 rounded-full border border-brown-100 shadow-sm z-10 group-hover:bg-gold-50 group-hover:text-gold-600 transition-colors">
                    <Lock className="w-5 h-5" />
                  </div>
                )}
                
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 border border-brown-100 ${agent.color} ${!isLocked && 'group-hover:scale-110'} transition-transform duration-300`}>
                   <Icon className={`w-7 h-7 ${agent.iconColor} ${isLocked && 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100'}`} />
                </div>
                
                <h3 className="text-2xl font-bold text-brown-900 mb-3 tracking-tight">
                  {agent.name}
                </h3>
                
                <p className="text-brown-800/80 font-medium leading-relaxed flex-1">
                  {agent.description}
                </p>
                
                <div className="mt-8 flex items-center font-bold text-sm tracking-wide uppercase">
                  {isLocked ? (
                    <span className="text-brown-400 group-hover:text-gold-600 flex items-center gap-2">
                       <Lock className="w-4 h-4" /> Destravar no Plano Elite
                    </span>
                  ) : (
                    <span className="text-gold-600 flex items-center">
                       <span>Iniciar Sessão</span>
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      {/* FLOAT WHATSAPP SUPORTE */}
      <a 
        href="https://wa.me/5535998732804?text=Ol%C3%A1%2C%20preciso%20de%20ajuda%20no%20meu%20acesso%20do%20FisioHub!" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-[0_5px_15px_rgba(37,211,102,0.4)] hover:scale-105 hover:shadow-[0_8px_25px_rgba(37,211,102,0.5)] transition-all z-50 flex items-center gap-3 group"
        title="Suporte Técnico"
      >
        <MessageSquare className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap font-bold text-sm">
          Falar com Suporte
        </span>
      </a>

    </div>
  );
}
