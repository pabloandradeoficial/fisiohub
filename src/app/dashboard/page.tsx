import { CheckCircle, PlayCircle, BookOpen, BrainCircuit, Lock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const mockProgress = {
    completedClasses: 0,
    totalClasses: 0,
    percentage: 0,
  };

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A3B32] p-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#3A2E27]">Bem-vindo de volta!</h1>
            <p className="text-[#8E7D73] mt-1">Pronto para mais um dia de raciocínio clínico baseado em evidências?</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-[#F5EDD6] flex items-center justify-center text-[#B8860B] font-bold text-xl border-4 border-white shadow-sm">
            PA
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
            <p className="text-[#8E7D73] text-sm">Acesse simuladores focados em diferentes áreas de especialidade médica.</p>
          </Link>
        </section>
      </div>
    </div>
  );
}
