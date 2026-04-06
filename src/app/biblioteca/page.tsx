'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { ArrowLeft, BookOpen, Clock, ChevronRight, Filter, Search, Loader2 } from 'lucide-react';
import { User } from '@supabase/supabase-js';

type ChatSession = {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  agent_id: string;
  is_favorite: boolean;
};

export default function BibliotecaPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const supabase = createClient();

  useEffect(() => {
    async function loadLibrary() {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        window.location.href = '/login';
        return;
      }
      setUser(session.user);

      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('user_id', session.user.id)
        .order('updated_at', { ascending: false });

      if (data) {
        setSessions(data);
      }
      setLoading(false);
    }
    loadLibrary();
  }, [supabase]);

  const filteredSessions = sessions.filter(s => 
    (s.title || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#FDFCFB] font-sans">
      
      {/* Header */}
      <header className="bg-white border-b border-[#E8E3DF] sticky top-0 z-20 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/agents" className="inline-flex items-center justify-center w-10 h-10 rounded-xl hover:bg-[#FDFCFB] text-[#8E7D73] hover:text-[#3A2E27] transition-colors border border-transparent hover:border-[#E8E3DF]">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-[#3A2E27] tracking-tight flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#D4AF37]" /> Minha Biblioteca
              </h1>
            </div>
          </div>
          <div className="text-xs text-[#8E7D73] font-medium hidden sm:block">
            {sessions.length} Casos Clínicos Salvos
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        
        {/* Filtros Livres e Buscar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-between">
           <div className="relative w-full max-w-md">
             <Search className="w-5 h-5 text-[#8E7D73] absolute left-3 top-1/2 -translate-y-1/2" />
             <input 
               type="text"
               placeholder="Buscar em seus casos clínicos..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-3 bg-white border border-[#E8E3DF] rounded-xl text-sm focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] outline-none text-[#3A2E27]"
             />
           </div>
           
           <button className="flex items-center gap-2 bg-white border border-[#E8E3DF] px-4 py-3 rounded-xl text-[#8E7D73] text-sm font-medium hover:bg-[#FDFCFB] transition-colors">
              <Filter className="w-4 h-4" /> Mais Recentes
           </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
             <Loader2 className="w-8 h-8 text-[#D4AF37] animate-spin" />
          </div>
        ) : filteredSessions.length === 0 ? (
          <div className="text-center py-20 bg-white border border-[#E8E3DF] rounded-2xl shadow-sm">
             <BookOpen className="w-12 h-12 text-[#8E7D73]/30 mx-auto mb-4" />
             <h3 className="text-lg font-bold text-[#3A2E27] mb-1">Nenhum caso clínico encontrado</h3>
             <p className="text-sm text-[#8E7D73]">Inicie conexões com seus Mentores para preencher sua biblioteca de retentiva.</p>
             <Link href="/agents" className="inline-block mt-6 px-6 py-2 bg-[#D4AF37] text-white font-bold rounded-lg shadow hover:bg-[#C5A030] transition-colors">
               Ir para Mentores
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSessions.map((session) => (
              <Link 
                href={`/chat/${session.agent_id}?session=${session.id}`}  
                key={session.id}
                className="group bg-white border border-[#E8E3DF] rounded-2xl p-5 hover:border-[#D4AF37] hover:shadow-lg transition-all hover:-translate-y-1 cursor-pointer flex flex-col justify-between min-h-[160px]"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/10 px-2 py-0.5 rounded">
                      <Clock className="w-3 h-3" />
                      {new Date(session.updated_at).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <h3 className="font-bold text-[#3A2E27] text-lg leading-tight group-hover:text-[#D4AF37] transition-colors line-clamp-3">
                    {session.title || 'Sessão sem Título'}
                  </h3>
                </div>
                
                <div className="flex items-center text-[#8E7D73] text-sm font-medium mt-4 pt-4 border-t border-[#E8E3DF]">
                   Continuar Estudo <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
