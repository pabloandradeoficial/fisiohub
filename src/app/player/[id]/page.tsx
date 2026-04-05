'use client';

import { useState } from 'react';
import { ArrowLeft, BookOpen, BrainCircuit, PlayCircle, MessageSquare, Send } from 'lucide-react';
import Link from 'next/link';
import { submitClinicalReasoning } from '@/app/actions/ai-feedback';

export default function PlayerPage() {
  const [activeTab, setActiveTab] = useState<'protocol' | 'ai'>('protocol');
  const [reasoning, setReasoning] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function handleAIFormSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!reasoning.trim()) return;
    
    setLoading(true);
    setFeedback(null);
    
    // In a real scenario, we'd pass the actual lessonId from params
    const res = await submitClinicalReasoning('lesson_1', [{ role: 'user', content: reasoning }]);
    
    if (res.success && res.feedback) {
      setFeedback(res.feedback);
    } else {
      setFeedback('Erro: ' + (res.error || 'Não foi possível contatar o professor.'));
    }
    setLoading(false);
  }

  return (
    <div className="flex h-screen bg-[#3A2E27] text-[#FDFCFB] font-sans overflow-hidden">
      
      {/* Left Pane - Video / Media Player */}
      <div className="flex-1 flex flex-col relative bg-black">
        <div className="absolute top-0 w-full p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent z-10">
          <Link href="/dashboard" className="flex items-center gap-2 text-[#C4B7B0] hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium text-sm">Voltar ao Painel</span>
          </Link>
          <div className="text-sm font-semibold text-white bg-[#4A3B32]/80 px-3 py-1 rounded-full backdrop-blur-md">
            Módulo 2: Ortopedia Clínica
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center relative group">
          <div className="absolute w-20 h-20 bg-[#D4AF37]/90 hover:bg-[#D4AF37] rounded-full flex items-center justify-center cursor-pointer transition-transform group-hover:scale-105 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <PlayCircle className="w-10 h-10 text-white translate-x-0.5" />
          </div>
          <p className="text-[#8E7D73] mt-32">Video Player (Mux/Vimeo iframe goes here)</p>
        </div>

        <div className="p-6 bg-[#3A2E27] border-t border-[#4A3B32]">
          <h2 className="text-2xl font-bold text-white mb-2">Aula 04 - Patologias do Ombro (Caso Real 1)</h2>
          <p className="text-[#C4B7B0] text-sm">Discutindo avaliação detalhada e diagnóstico diferencial.</p>
        </div>
      </div>

      {/* Right Pane - Content & Interactivity */}
      <div className="w-[450px] border-l border-[#4A3B32] bg-[#FDFCFB] flex flex-col shadow-2xl z-20">
        
        {/* Tabs */}
        <div className="flex border-b border-[#E8E3DF] bg-white">
          <button 
            onClick={() => setActiveTab('protocol')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'protocol' ? 'text-[#B8860B] border-b-2 border-[#B8860B]' : 'text-[#8E7D73] hover:text-[#4A3B32]'}`}
          >
            <BookOpen className="w-4 h-4" />
            Protocolo
          </button>
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors ${activeTab === 'ai' ? 'text-[#B8860B] border-b-2 border-[#B8860B]' : 'text-[#8E7D73] hover:text-[#4A3B32]'}`}
          >
            <BrainCircuit className="w-4 h-4" />
            Simulado IA
          </button>
        </div>

        {/* Tab Content: Protocol */}
        {activeTab === 'protocol' && (
          <div className="flex-1 overflow-y-auto p-6 bg-white text-[#3A2E27]">
            <div className="prose prose-slate prose-sm max-w-none">
              <h3 className="text-lg font-bold text-[#3A2E27] mb-4 border-b border-[#E8E3DF] pb-2">Material de Apoio</h3>
              <div className="bg-[#FDFCFB] p-4 rounded-xl border border-[#D4AF37] mb-6">
                <p className="text-sm text-[#B8860B] font-medium mb-2">💡 Evidência Atualizada (PubMed 2026)</p>
                <p className="text-sm text-[#8E7D73]">Testes ortopédicos especiais isolados têm baixa acurácia. O diagnóstico baseia-se num cluster de sinais.</p>
              </div>
              
              <h4 className="font-semibold text-[#3A2E27]">Cluster para Impacto Subacromial</h4>
              <ul className="list-disc pl-4 space-y-2 text-[#8E7D73] mb-6">
                <li>Sinal de Hawkins-Kennedy</li>
                <li>Sinal de Neer</li>
                <li>Sinal do Arco Doloroso</li>
                <li>Força de Rotação Externa (Infraespinal)</li>
                <li>Drop Arm Test</li>
              </ul>
              <button className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#3A2E27] hover:bg-[#4A3B32] text-white rounded-lg text-sm font-medium transition-colors">
                <BookOpen className="w-4 h-4" />
                Baixar Protocolo em PDF
              </button>
            </div>
          </div>
        )}

        {/* Tab Content: AI Simulado */}
        {activeTab === 'ai' && (
          <div className="flex-1 flex flex-col bg-[#FDFCFB] overflow-hidden">
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8E3DF]">
                <h3 className="font-bold text-[#3A2E27] flex items-center gap-2 mb-2">
                  <BrainCircuit className="w-5 h-5 text-[#D4AF37]" />
                  Mestre Supremo IA
                </h3>
                <p className="text-sm text-[#8E7D73]">Baseado no vídeo ao lado, descreva seu raciocínio clínico para a avaliação deste paciente. Qual seria o cluster de testes ideal e por quê?</p>
              </div>

              {/* Feedbacks Exibidos */}
              {feedback && (
                <div className="bg-[#F5EDD6] p-4 rounded-xl border border-[#D4AF37]">
                  <p className="text-sm text-[#4A3B32] leading-relaxed font-medium">
                    {feedback}
                  </p>
                </div>
              )}
            </div>

            {/* Input Formulario */}
            <div className="p-4 bg-white border-t border-[#E8E3DF]">
              <form onSubmit={handleAIFormSubmit} className="relative">
                <textarea
                  value={reasoning}
                  onChange={(e) => setReasoning(e.target.value)}
                  placeholder="Seu raciocínio clínico..."
                  disabled={loading}
                  className="w-full pl-4 pr-12 py-3 bg-[#FDFCFB] border border-[#E8E3DF] rounded-xl text-sm text-[#3A2E27] focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] resize-none h-24"
                />
                <button 
                  type="submit" 
                  disabled={loading || !reasoning.trim()}
                  className="absolute bottom-3 right-3 p-2 bg-[#D4AF37] text-white rounded-lg hover:bg-[#C5A030] disabled:opacity-50 transition-colors"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Floating AI Feedback Teaser - shown only on Protocol tab */}
        {activeTab === 'protocol' && (
          <div className="p-4 bg-[#FDFCFB] border-t border-[#E8E3DF]">
             <button 
                onClick={() => setActiveTab('ai')}
                className="w-full flex items-center justify-between p-4 bg-white border border-[#D4AF37] rounded-xl shadow-sm hover:shadow-md transition-all group"
             >
               <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-[#F5EDD6] flex items-center justify-center text-[#B8860B]">
                   <MessageSquare className="w-5 h-5" />
                 </div>
                 <div className="text-left">
                   <p className="text-sm font-bold text-[#3A2E27] line-clamp-1">Quizz Clínico Disponível</p>
                   <p className="text-xs text-[#8E7D73]">Avaliação do Mestre por IA</p>
                 </div>
               </div>
               <span className="text-[#D4AF37] font-bold group-hover:translate-x-1 transition-transform">→</span>
             </button>
          </div>
        )}

      </div>
    </div>
  );
}
