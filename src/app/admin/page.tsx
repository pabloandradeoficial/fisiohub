'use client';

import { useEffect, useState } from 'react';
import { getAdminDashboardData, sendDirectMessage } from './actions';
import { Users, TrendingUp, AlertCircle, MessageSquare, Plus, Mail } from 'lucide-react';

export default function AdminDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Send message state
  const [messageText, setMessageText] = useState('');
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    getAdminDashboardData()
      .then(setData)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const handleSendMessage = async () => {
    if (!selectedUser || !messageText.trim()) return;
    setSending(true);
    try {
      await sendDirectMessage(selectedUser.id, messageText);
      setMessageText('');
      setSelectedUser(null);
      alert('Mensagem enviada com sucesso!');
    } catch (e: any) {
      alert('Erro ao enviar mensagem: ' + e.message);
    } finally {
      setSending(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center p-8 bg-[#FDFCFB]">Carregando Dashboard Administrativo...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center p-8 bg-[#FDFCFB] text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#4A3B32] p-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        <header className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF]">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-brown-900">Portal do Administrador</h1>
            <p className="text-brown-800/70 mt-1">Visão geral do sistema FisioHub</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-brown-900 text-gold-400 flex items-center justify-center shadow-md">
            <ShieldIcon className="w-6 h-6" />
          </div>
        </header>

        {/* KPIs */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard icon={<Users />} title="Total de Registros" value={data.metrics.totalRegistered} />
          <KpiCard icon={<TrendingUp />} title="Pagantes Ativos" value={data.metrics.totalPaying} />
          <KpiCard icon={<Plus />} title="Dependentes (Turma)" value={data.metrics.totalTurma} />
          <KpiCard icon={<AlertCircle />} title="Vencendo em < 7 dias" value={data.metrics.expiringSoon} alert />
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Users Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-[#E8E3DF] p-6 overflow-hidden">
            <h2 className="text-xl font-bold mb-4 text-brown-900">Usuários Registrados</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead>
                  <tr className="text-brown-800/60 border-b border-[#E8E3DF]">
                    <th className="pb-3 font-semibold">Nome</th>
                    <th className="pb-3 font-semibold">E-mail</th>
                    <th className="pb-3 font-semibold">Plano</th>
                    <th className="pb-3 font-semibold">Status</th>
                    <th className="pb-3 font-semibold text-right">Ação</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E8E3DF]">
                  {data.users.map((u: any) => (
                    <tr key={u.id} className="hover:bg-brown-50/50 transition-colors">
                      <td className="py-3 font-medium text-brown-900">{u.name}</td>
                      <td className="py-3 text-brown-800/80">{u.email}</td>
                      <td className="py-3">
                        <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-gray-100 text-gray-700">
                          {u.plan}
                        </span>
                      </td>
                      <td className="py-3">
                         {u.status === 'active' ? (
                           <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700">Ativo</span>
                         ) : (
                           <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-500">Inativo</span>
                         )}
                      </td>
                      <td className="py-3 text-right">
                        <button 
                          onClick={() => setSelectedUser(u)}
                          className="p-2 bg-gold-50 text-gold-700 hover:bg-gold-100 rounded-lg transition-colors inline-block"
                          title="Enviar Mensagem"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Modal de envio de msg (Renderizado inline para simplicidade) */}
            {selectedUser && (
              <div className="bg-white rounded-2xl shadow-sm border border-[#E8E3DF] p-6 border-l-4 border-l-gold-500">
                <h3 className="font-bold text-brown-900 mb-2">Mensagem p/ {selectedUser.name}</h3>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm min-h-[100px] mb-3 focus:outline-none focus:ring-2 focus:ring-gold-500/50"
                  placeholder="Escreva algo para aparecer no dashboard deste usuário..."
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                />
                <div className="flex justify-end gap-2">
                  <button onClick={() => setSelectedUser(null)} className="px-4 py-2 text-sm text-gray-500 font-bold hover:bg-gray-100 rounded-xl">Cancelar</button>
                  <button 
                    onClick={handleSendMessage} 
                    disabled={sending}
                    className="px-4 py-2 text-sm bg-gold-500 text-white font-bold rounded-xl shadow hover:bg-gold-600 disabled:opacity-50"
                  >
                    {sending ? 'Enviando...' : 'Enviar'}
                  </button>
                </div>
              </div>
            )}

            {/* Suggestions Box */}
            <div className="bg-white rounded-2xl shadow-sm border border-[#E8E3DF] p-6 h-[400px] flex flex-col">
              <h2 className="text-xl font-bold mb-4 text-brown-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold-500" /> 
                Sugestões
              </h2>
              <div className="flex-1 overflow-y-auto space-y-4">
                {data.suggestions.length === 0 ? (
                  <p className="text-gray-400 text-sm text-center mt-10">Nenhuma sugestão ainda.</p>
                ) : (
                  data.suggestions.map((s: any) => (
                    <div key={s.id} className="bg-gray-50 border border-gray-100 p-4 rounded-xl">
                      <p className="text-sm font-medium mb-2 text-brown-900">"{s.suggestion}"</p>
                      <p className="text-xs text-gray-500">- {s.user_name} <span className="opacity-70">({s.user_email})</span></p>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function KpiCard({ icon, title, value, alert = false }: { icon: React.ReactNode, title: string, value: number, alert?: boolean }) {
  return (
    <div className={`bg-white p-6 rounded-2xl shadow-sm border ${alert ? 'border-red-200 bg-red-50/20' : 'border-[#E8E3DF]'}`}>
      <div className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center ${alert ? 'bg-red-100 text-red-600' : 'bg-brown-50 text-gold-600'}`}>
        {icon}
      </div>
      <h3 className="text-gray-500 text-sm font-semibold mb-1">{title}</h3>
      <div className="text-3xl font-black text-brown-900">{value}</div>
    </div>
  );
}

function ShieldIcon(props: any) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </svg>
  );
}
