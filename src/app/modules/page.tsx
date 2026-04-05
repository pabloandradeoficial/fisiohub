import { BookOpen, Clock, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/server';

export default async function ModulesCatalogPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Mocks for now until we have database rows setup
  const modules = [
    {
      id: "1",
      title: "Ortopedia Clínica & Traumatologia",
      description: "Avaliação estruturada, testes especiais e raciocínio clínico para MMSS e MMII.",
      progress: 30,
      totalLessons: 24,
      locked: false,
    },
    {
      id: "2",
      title: "Neurologia Funcional Adulto",
      description: "Diagnóstico topográfico e intervenção na neuroplasticidade.",
      progress: 0,
      totalLessons: 18,
      locked: false,
    },
    {
      id: "3",
      title: "Fisioterapia Esportiva Avançada",
      description: "Return to play, biomecânica do salto e lesões de LCA.",
      progress: 0,
      totalLessons: 30,
      locked: true,
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A3B32] p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF]">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-[#3A2E27]">Catálogo de Especializações</h1>
            <p className="text-[#8E7D73] mt-1">Escolha seu próximo desafio clínico.</p>
          </div>
          {user ? (
            <div className="w-12 h-12 rounded-full bg-[#F5EDD6] flex items-center justify-center text-[#B8860B] font-bold text-lg border-2 border-white shadow-sm">
              {user.user_metadata?.full_name?.charAt(0) || 'U'}
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2.5 bg-[#D4AF37] hover:bg-[#C5A030] text-white font-medium rounded-xl transition-colors">
              Fazer Login
            </Link>
          )}
        </header>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((mod) => (
            <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-[#E8E3DF] overflow-hidden hover:shadow-md transition-shadow group flex flex-col">
              {/* Cover Image Placeholder */}
              <div className="h-40 bg-[#E8E3DF] relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {mod.locked && (
                  <div className="absolute inset-0 backdrop-blur-md bg-white/30 flex items-center justify-center">
                    <div className="bg-[#3A2E27]/80 p-3 rounded-full text-white backdrop-blur-sm">
                      <Lock className="w-6 h-6" />
                    </div>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 text-white font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Módulo {mod.id}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h2 className="text-xl font-bold text-[#3A2E27] leading-tight mb-2">{mod.title}</h2>
                <p className="text-[#8E7D73] text-sm mb-6 flex-1">{mod.description}</p>
                
                {/* Footer metadata */}
                <div className="space-y-4">
                  {/* Progress Bar */}
                  {!mod.locked && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold text-[#8E7D73]">
                        <span>Progresso</span>
                        <span>{mod.progress}%</span>
                      </div>
                      <div className="w-full bg-[#F5F2EF] rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-[#D4AF37] h-2 rounded-full transition-all duration-1000 ease-out" 
                          style={{ width: `${mod.progress}%` }} 
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-[#F5F2EF]">
                    <span className="flex items-center gap-1 text-sm text-[#8E7D73] font-medium">
                      <Clock className="w-4 h-4" />
                      {mod.totalLessons} aulas
                    </span>
                    
                    {mod.locked ? (
                      <button disabled className="text-sm font-bold text-[#C4B7B0]">
                        Bloqueado
                      </button>
                    ) : (
                      <Link 
                        href={`/dashboard`} 
                        className="flex items-center gap-1 text-sm font-bold text-[#B8860B] hover:text-[#D4AF37] group-hover:translate-x-1 transition-transform"
                      >
                        Acessar
                        <PlayCircle className="w-4 h-4" />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
