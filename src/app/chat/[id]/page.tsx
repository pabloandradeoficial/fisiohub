'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, BrainCircuit, Loader2, Sparkles, User, PlusCircle, MessageSquare, Menu, X, Trash2, Star, FolderPlus, Folder, ChevronDown, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { submitClinicalReasoning } from '@/app/actions/ai-feedback';
import { useParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  createdAt: number;
  messages: ChatMessage[];
  isFavorite?: boolean;
  folderId?: string | null;
}

interface ChatFolder {
  id: string;
  name: string;
  isExpanded?: boolean;
}

const agentTitles: Record<string, string> = {
  'anatomia': 'Agente de F. Anatômica',
  'avaliacao-avancada': 'Agente de Avaliação',
  'traumato-ortopedia': 'Agente de Traumato',
  'agentes-fisicos': 'Agente de Agentes Físicos',
  'terapia-manual': 'Agente de Terapias Manuais',
  'reumatologica': 'Agente de Fisio Reumato',
  'cardiovascular': 'Agente de Fisio Cardio',
  respiratoria: 'Fisioterapia Respiratória',
  'saude-mulher': 'Saúde da Mulher & Sexualidade',
  geriatrica: 'Fisioterapia Geriátrica',
  intensiva: 'Fisio Intensiva & Neonatologia',
  esporte: 'Fisioterapia do Esporte',
  preventiva: 'Fisioterapia Preventiva',
  dermatofuncional: 'Fisio Dermatofuncional',
  'pesquisa-tcc': 'Mentoria em TCC',
  'pesquisa-cep': 'Aprovação no CEP',
  'pesquisa-estatistica': 'Análise Estatística',
  'pablo-mentor': 'Mentor Pablo Andrade',
  'direito-civil-penal': 'Responsabilidade Civil e Penal',
  'direito-consumidor': 'Direito do Consumidor',
  'direito-paciente': 'Direitos do Paciente',
  'direito-trabalho': 'Direito do Trabalho',
  'direito-administrativo': 'Direito Administrativo',
  'contabil-tributario': 'Planejamento Tributário',
  'contabil-custos': 'Custos e Precificação',
  'contabil-fluxo': 'Fluxo de Caixa (DRE)',
  'contabil-faturamento': 'Convênios e Glosas',
  'contabil-roi': 'Investimento (ROI) e Depreciação',
};

export default function ChatPage() {
  const params = useParams();
  const agentId = params?.id as string;
  const agentTitle = agentTitles[agentId] || 'Mestre Clínico IA';

  const [user, setUser] = useState<any>(null);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [folders, setFolders] = useState<ChatFolder[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    const initData = async () => {
      setIsInitializing(true);
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;
      setUser(session.user);
      const currentUserId = session.user.id;

      // Fetch Folders
      const { data: dbFolders } = await supabase
        .from('chat_folders')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: true });

      if (dbFolders) {
        setFolders(dbFolders.map(f => ({ id: f.id, name: f.name, isExpanded: f.is_expanded })));
      }

      // Fetch Sessions
      const { data: dbSessions } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('agent_id', agentId)
        .order('created_at', { ascending: false });

      let loadedSessions = [];
      if (dbSessions && dbSessions.length > 0) {
        const sessionIds = dbSessions.map(s => s.id);
        const { data: dbMessages } = await supabase
          .from('chat_messages')
          .select('*')
          .in('session_id', sessionIds)
          .order('created_at', { ascending: true });

        loadedSessions = dbSessions.map(s => {
           const sMessages = dbMessages?.filter(m => m.session_id === s.id) || [];
           return {
             id: s.id,
             title: s.title,
             createdAt: new Date(s.created_at).getTime(),
             isFavorite: s.is_favorite,
             folderId: s.folder_id,
             messages: sMessages.map(m => ({ role: m.role as 'user' | 'model', content: m.content }))
           }
        });
        setSessions(loadedSessions);
        setActiveSessionId(loadedSessions[0].id);
      } else {
        await createNewSession('Novo Caso Clínico', currentUserId);
      }
      setIsInitializing(false);
    };
    initData();
  }, [agentId]);

  useEffect(() => {
    scrollToBottom();
  }, [sessions, activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId) || null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const createNewSession = async (initialTitle: string, passedUserId?: string) => {
    const currentUserId = passedUserId || user?.id;
    if (!currentUserId) return;

    const { data: sessionData } = await supabase
      .from('chat_sessions')
      .insert({
        user_id: currentUserId,
        agent_id: agentId,
        title: initialTitle,
        is_favorite: false
      })
      .select()
      .single();

    if (sessionData) {
       const initialMsgContent = `Olá! Eu sou o ${agentTitle}. Apresente seu caso clínico ou sua linha de raciocínio para iniciarmos a simulação.`;
       
       await supabase.from('chat_messages').insert({
         session_id: sessionData.id,
         role: 'model',
         content: initialMsgContent
       });

       const newSession: ChatSession = {
         id: sessionData.id,
         title: sessionData.title,
         createdAt: new Date(sessionData.created_at).getTime(),
         messages: [{ role: 'model', content: initialMsgContent }]
       };
       setSessions(prev => [newSession, ...prev]);
       setActiveSessionId(newSession.id);
       if (window.innerWidth < 1024) setIsSidebarOpen(false);
    }
  };

  const updateSessionMessages = (sessionId: string, newMessages: ChatMessage[], dynamicTitle?: string) => {
    setSessions(prev => prev.map(session => {
      if (session.id === sessionId) {
        return { 
          ...session, 
          messages: newMessages,
          title: dynamicTitle && session.title === 'Novo Caso Clínico' ? dynamicTitle : session.title
        };
      }
      return session;
    }));
  };

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Tem certeza que deseja apagar este caso?')) {
      await supabase.from('chat_sessions').delete().eq('id', id);
      setSessions(prev => prev.filter(s => s.id !== id));
      if (activeSessionId === id) setActiveSessionId(null);
    }
  };

  const toggleFavorite = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const sessionToToggle = sessions.find(s => s.id === id);
    if (sessionToToggle) {
      const newStatus = !sessionToToggle.isFavorite;
      await supabase.from('chat_sessions').update({ is_favorite: newStatus }).eq('id', id);
      setSessions(prev => prev.map(s => s.id === id ? { ...s, isFavorite: newStatus } : s));
    }
  };

  const createFolder = async () => {
    const name = prompt('Nome da nova pasta:');
    if (name && name.trim() && user?.id) {
       const { data } = await supabase.from('chat_folders').insert({
          user_id: user.id,
          agent_id: agentId,
          name: name.trim()
       }).select().single();
       if (data) setFolders(prev => [...prev, { id: data.id, name: data.name, isExpanded: true }]);
    }
  };

  const toggleFolder = async (folderId: string) => {
    const folder = folders.find(f => f.id === folderId);
    if(folder) {
        const newStatus = !folder.isExpanded;
        await supabase.from('chat_folders').update({ is_expanded: newStatus }).eq('id', folderId);
        setFolders(prev => prev.map(f => f.id === folderId ? { ...f, isExpanded: newStatus } : f));
    }
  };

  const assignToFolder = async (e: React.MouseEvent, sessionId: string) => {
    e.stopPropagation();
    if (folders.length === 0) {
      alert("Crie uma pasta primeiro no botão '+ Pasta' acima!");
      return;
    }
    const folderNames = folders.map((f, i) => `${i + 1}. ${f.name}`).join('\n');
    const choice = prompt(`Para qual pasta mover?\n\n0. Nenhuma pasta (Mover para Geral)\n${folderNames}\n\nDigite o número correspondente:`);
    
    if (choice !== null) {
      const idx = parseInt(choice) - 1;
      let targetFolderId: string | null = null;
      if (idx >= 0 && idx < folders.length) {
        targetFolderId = folders[idx].id;
      }
      await supabase.from('chat_sessions').update({ folder_id: targetFolderId }).eq('id', sessionId);
      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, folderId: targetFolderId } : s));
    }
  };

  const renderSession = (session: ChatSession, isInsideFolder: boolean = false) => (
    <div
      key={session.id}
      className={`w-full text-left p-3 rounded-xl flex items-center gap-3 transition-colors cursor-pointer group ${
        activeSessionId === session.id 
          ? 'bg-white/10 border border-white/5 shadow-inner' 
          : 'hover:bg-white/5 text-white/70'
      } ${isInsideFolder ? 'ml-2 w-[calc(100%-0.5rem)]' : ''}`}
      onClick={() => {
        setActiveSessionId(session.id);
        if (window.innerWidth < 1024) setIsSidebarOpen(false);
      }}
    >
      <MessageSquare className={`w-5 h-5 shrink-0 ${activeSessionId === session.id ? 'text-gold-400' : 'text-white/30'}`} />
      
      <div className="truncate flex-1 pr-2">
        <div className={`font-medium truncate flex items-center gap-1 ${activeSessionId === session.id ? 'text-white' : 'text-white/80'} ${session.isFavorite ? 'text-gold-300' : ''}`}>
          {session.title}
        </div>
        <div className="text-[10px] text-white/40 mt-1">
          {new Date(session.createdAt).toLocaleDateString('pt-BR')}
        </div>
      </div>

      {/* Ações */}
      <div className="flex opacity-60 group-hover:opacity-100 items-center gap-1.5 shrink-0 transition-opacity">
        <button onClick={(e) => toggleFavorite(e, session.id)} className="p-1.5 rounded-md text-white/50 hover:bg-white/10 hover:text-gold-400 transition-colors" title="Favoritar">
          <Star className={`w-4 h-4 ${session.isFavorite ? 'fill-gold-400 text-gold-400' : ''}`} />
        </button>
        <button onClick={(e) => assignToFolder(e, session.id)} className="p-1.5 rounded-md text-white/50 hover:bg-white/10 hover:text-blue-400 transition-colors" title="Mover para Pasta">
          <Folder className="w-4 h-4" />
        </button>
        <button onClick={(e) => deleteSession(e, session.id)} className="p-1.5 rounded-md text-white/50 hover:bg-white/10 hover:text-red-400 transition-colors" title="Excluir">
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || !activeSessionId || !activeSession) return;

    const userMsg = input.trim();
    setInput('');
    setIsLoading(true);
    
    // Auto-gerar mini-titulo para a sessão caso seja a primeira vez que usuário envia algo
    let dynamicTitle = undefined;
    if (activeSession.messages.length <= 1) {
      dynamicTitle = userMsg.substring(0, 30) + "...";
      await supabase.from('chat_sessions').update({ title: dynamicTitle }).eq('id', activeSessionId);
    }

    // Save user msg to DB
    await supabase.from('chat_messages').insert({
      session_id: activeSessionId,
      role: 'user',
      content: userMsg
    });

    const updatedHistory: ChatMessage[] = [
      ...activeSession.messages,
      { role: 'user', content: userMsg }
    ];
    updateSessionMessages(activeSessionId, updatedHistory, dynamicTitle);

    try {
      const response = await submitClinicalReasoning(agentId, updatedHistory);
      
      const newAssistantMsgContent = response.success && response.feedback ? response.feedback : (response.error || 'Erro no processo.');
      
      await supabase.from('chat_messages').insert({
        session_id: activeSessionId,
        role: 'model',
        content: newAssistantMsgContent
      });

      updateSessionMessages(activeSessionId, [...updatedHistory, { role: 'model', content: newAssistantMsgContent }]);
    } catch (error) {
      updateSessionMessages(activeSessionId, [...updatedHistory, { role: 'model', content: 'Erro de conexão com o Agente IA.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-brown-50 overflow-hidden font-sans">
      
      {/* SIDEBAR */}
      <div className={`fixed inset-y-0 left-0 z-40 w-72 bg-brown-900 text-white transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:flex-shrink-0 transition-transform duration-300 ease-in-out flex flex-col shadow-2xl`}>
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/agents" className="flex items-center gap-2 text-gold-400 hover:text-gold-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold tracking-tight text-sm uppercase">Sair</span>
          </Link>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden p-2 text-white/50 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4">
          <button 
            onClick={() => createNewSession('Novo Caso Clínico')}
            className="w-full bg-gold-500 hover:bg-gold-600 text-white p-3 rounded-xl flex items-center justify-center gap-2 font-bold transition-colors shadow-lg"
          >
            <PlusCircle className="w-5 h-5" />
            Iniciar Novo Caso
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3 pb-4 custom-scrollbar">
          <div className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-2 mt-4 flex items-center justify-between">
            <span>Casos Anteriores</span>
            <button onClick={createFolder} className="text-gold-400 hover:text-gold-300 p-1 flex items-center gap-1 bg-white/5 rounded-md px-2" title="Nova Pasta">
              <FolderPlus className="w-3.5 h-3.5" />
              <span className="text-[10px]">Pasta</span>
            </button>
          </div>
          
          <div className="space-y-1">
            
            {/* Show Folders */}
            {folders.map(folder => {
              const folderSessions = sessions.filter(s => s.folderId === folder.id);
              return (
                <div key={folder.id} className="mb-2">
                  <button 
                    onClick={() => toggleFolder(folder.id)}
                    className="w-full text-left px-3 py-2 flex items-center justify-between text-white/50 hover:bg-white/5 rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2 font-medium text-sm">
                      {folder.isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                      <Folder className="w-4 h-4 text-gold-500/50" />
                      <span className="truncate max-w-[120px]">{folder.name}</span>
                    </div>
                    <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full">{folderSessions.length}</span>
                  </button>
                  {folder.isExpanded && (
                    <div className="space-y-1 mt-1 pl-2 border-l border-white/10 ml-4">
                      {folderSessions.length === 0 ? (
                        <div className="text-[10px] text-white/20 pl-2 py-1 italic">Vazia</div>
                      ) : (
                        folderSessions.map(s => renderSession(s, true))
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Favoritos (raiz) */}
            {sessions.filter(s => s.isFavorite && !s.folderId).length > 0 && (
              <div className="mt-4 mb-2">
                <div className="text-[10px] font-bold text-gold-400/80 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                  <Star className="w-3 h-3 fill-gold-400/50" /> Favoritos
                </div>
                {sessions.filter(s => s.isFavorite && !s.folderId).map(s => renderSession(s))}
              </div>
            )}

            {/* Outros Casos (raiz) */}
            {(() => {
              const rootSessions = sessions.filter(s => !s.isFavorite && !s.folderId);
              return rootSessions.length > 0 ? (
                <div className="mt-4 border-t border-white/5 pt-2">
                  {sessions.filter(s => s.isFavorite && !s.folderId).length > 0 && (
                    <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest px-3 mb-2 flex items-center gap-1.5">
                      Geral
                    </div>
                  )}
                  {rootSessions.map(s => renderSession(s))}
                </div>
              ) : null;
            })()}

            {sessions.length === 0 && (
              <div className="text-center text-white/30 text-sm py-8 px-4 border border-dashed border-white/10 rounded-xl mt-4 mx-2">
                Nenhum caso salvo ainda. <br/><span className="text-xs mt-1 block">Tudo que você conversar ficará aqui.</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* OVERLAY PARA MOBILE */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col min-w-0 bg-white relative">
        
        {/* Header Responsivo */}
        <header className="h-16 flex items-center justify-between px-4 sm:px-6 border-b border-brown-100 bg-white shadow-sm shrink-0">
          <div className="flex items-center gap-3">
             <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 -ml-2 text-brown-500 hover:text-brown-900 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gold-50 border border-gold-100 flex items-center justify-center hidden sm:flex">
                <BrainCircuit className="w-5 h-5 text-gold-600" />
            </div>
            <div>
                <h1 className="font-bold text-brown-900 tracking-tight leading-tight">{agentTitle}</h1>
                <div className="flex items-center gap-1.5 text-[10px] font-semibold text-gold-600 uppercase">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-500"></span>
                  </span>
                  IA Conectada
                </div>
            </div>
          </div>
        </header>

        {/* Chat Scroll Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-64">
          <div className="max-w-4xl mx-auto space-y-8">
            
            {activeSession?.messages.map((msg, idx) => (
              <div key={idx} className={`flex gap-3 sm:gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                
                {/* Avatar */}
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm border ${
                  msg.role === 'model' 
                    ? 'bg-gradient-to-br from-gold-100 to-gold-50 border-gold-200 text-gold-600' 
                    : 'bg-white border-brown-200 text-brown-600'
                }`}>
                  {msg.role === 'model' ? <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" /> : <User className="w-4 h-4 sm:w-5 sm:h-5" />}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-6 shadow-sm border ${
                  msg.role === 'model'
                    ? 'bg-brown-50/50 border-brown-100 rounded-tl-none'
                    : 'bg-brown-900 border-brown-800 text-white rounded-tr-none'
                }`}>
                  {msg.role === 'model' ? (
                  <div className="prose prose-sm sm:prose-base prose-brown text-brown-800 marker:text-gold-500 max-w-none prose-p:leading-relaxed prose-strong:font-bold prose-strong:text-brown-900 prose-ul:list-disc prose-ol:list-decimal">
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                ) : (
                    <p className="whitespace-pre-wrap font-medium">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}

            {/* Dicas de Extração (Aparece apenas no início de um Novo Caso) */}
            {activeSession?.messages.length === 1 && (
              <div className="w-full max-w-2xl bg-white border border-brown-200/50 p-6 rounded-2xl shadow-[0_4px_20px_-4px_rgba(212,175,55,0.05)] text-left mt-8 mb-4 ml-14">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-gold-600" />
                  <h3 className="font-semibold text-brown-900">Como extrair o máximo do seu Mentor:</h3>
                </div>
                <ul className="space-y-4 text-sm text-brown-700">
                  <li className="flex gap-3">
                    <div className="mt-0.5 bg-gold-100 text-gold-800 rounded w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">1</div>
                    <div>
                      <strong className="text-brown-900 block mb-0.5">Nutra com Contexto Clínico</strong>
                      Evite perguntas abertas. Ao invés disso, use detalhes: <span className="italic text-brown-500">"Paciente mulher, 40 anos, dor patelofemoral ao descer escadas. Monte uma evolução de carga para 4 semanas."</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 bg-gold-100 text-gold-800 rounded w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">2</div>
                    <div>
                      <strong className="text-brown-900 block mb-0.5">Comande o Formato Visual</strong>
                      Para evitar textos colossais, adicione ao seu pedido comandos estruturantes: <span className="italic text-brown-500">"Me dê a resposta em tópicos sucintos"</span>, <span className="italic text-brown-500">"Resuma em tabela"</span> ou <span className="italic text-brown-500">"Seja muito objetivo"</span>.
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="mt-0.5 bg-gold-100 text-gold-800 rounded w-5 h-5 flex items-center justify-center text-xs font-bold shrink-0">3</div>
                    <div>
                      <strong className="text-brown-900 block mb-0.5">Entre no Jogo Socrático</strong>
                      O agente foi treinado para fazer você pensar profundamente. Se ele devolver a bola pra você com uma pergunta, arrisque o raciocínio! Ele irá corrigir você usando a literatura.
                    </div>
                  </li>
                </ul>
              </div>
            )}

            {isLoading && (
              <div className="flex gap-4 flex-row animate-pulse">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gold-50 border border-gold-200 flex items-center justify-center shrink-0">
                  <BrainCircuit className="w-4 h-4 sm:w-5 sm:h-5 text-gold-600" />
                </div>
                <div className="bg-brown-50/50 border border-brown-100 rounded-3xl rounded-tl-none px-6 py-5 flex items-center gap-2 shadow-sm">
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gold-400 rounded-full animate-bounce"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-40 shrink-0" />
          </div>
        </main>

        {/* Input Area Fixo na Base */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-[max(1.5rem,env(safe-area-inset-bottom))] px-4 sm:px-6">
          <div className="max-w-4xl mx-auto relative">
            <form 
              onSubmit={handleSubmit}
              className="relative bg-white border border-brown-200 rounded-2xl shadow-xl overflow-hidden focus-within:ring-4 focus-within:ring-gold-500/20 focus-within:border-gold-400 transition-all"
            >
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Detalhe os sintomas, testes especiais utilizados e seu raciocínio..."
                className="w-full max-h-40 min-h-[60px] sm:min-h-[70px] py-4 pl-4 sm:pl-6 pr-16 bg-transparent border-none focus:ring-0 resize-none text-brown-900 placeholder:text-brown-400/60 font-medium z-10 relative layout-stable custom-scrollbar"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <div className="absolute right-2 sm:right-3 bottom-0 top-0 flex items-center z-20">
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 sm:w-12 sm:h-12 bg-brown-900 hover:bg-gold-600 disabled:bg-brown-100 disabled:text-brown-300 text-white rounded-xl flex items-center justify-center transition-all shadow-md active:scale-95 disabled:shadow-none"
                >
                  {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5 ml-1" />}
                </button>
              </div>
            </form>
            <div className="text-center mt-3 text-[11px] text-brown-400/80 font-medium font-sans">
               Este Agente FisioHub funciona como um Mentor. Sempre cruze as orientações com CPGs oficiais antes do raciocínio final.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
