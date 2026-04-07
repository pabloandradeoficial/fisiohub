'use client';

import { useState, useEffect } from 'react';
import { getUserDashboardData, markMessageAsRead, submitSuggestion } from './actions';
import { MessageSquare, Bell, X, Send } from 'lucide-react';

export default function UserWidgets() {
  const [messages, setMessages] = useState<any[]>([]);
  const [suggestion, setSuggestion] = useState('');
  const [sending, setSending] = useState(false);
  const [showSuggestBox, setShowSuggestBox] = useState(false);

  useEffect(() => {
    getUserDashboardData().then(data => {
      setMessages(data.messages);
    }).catch(console.error);
  }, []);

  const handleSuggest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!suggestion.trim()) return;
    setSending(true);
    try {
      await submitSuggestion(suggestion);
      alert('Sua sugestão foi enviada. Obrigado!');
      setSuggestion('');
      setShowSuggestBox(false);
    } catch (err: any) {
      alert('Erro: ' + err.message);
    } finally {
      setSending(false);
    }
  };

  const handleDismissMessage = async (id: string) => {
    try {
      await markMessageAsRead(id);
      setMessages(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 mt-8">
      {/* Messages / Alerts */}
      {messages.length > 0 && (
        <div className="bg-gold-50 border border-gold-200 p-6 rounded-2xl shadow-sm relative space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Bell className="w-5 h-5 text-gold-600 animate-pulse" />
            <h3 className="font-bold text-brown-900 text-lg">Mensagens do Administrador</h3>
          </div>
          {messages.map(msg => (
            <div key={msg.id} className="bg-white p-4 rounded-xl border border-[#E8E3DF] flex items-start justify-between gap-4">
              <p className="text-sm font-medium text-brown-800 whitespace-pre-wrap">{msg.message}</p>
              <button 
                onClick={() => handleDismissMessage(msg.id)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Marcar como lida"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Suggestion Box */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#E8E3DF]">
        {!showSuggestBox ? (
          <button 
            onClick={() => setShowSuggestBox(true)}
            className="w-full py-4 flex flex-col items-center justify-center gap-2 text-brown-800 hover:text-gold-600 transition-colors border-2 border-dashed border-gray-200 hover:border-gold-300 rounded-xl bg-gray-50/50 hover:bg-gold-50/20"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="font-semibold text-sm">Tem alguma sugestão? Fale direto com o administrador!</span>
          </button>
        ) : (
          <form onSubmit={handleSuggest} className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-brown-900 flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-gold-500" />
                Caixa de Sugestões
              </h3>
              <button type="button" onClick={() => setShowSuggestBox(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <textarea
              value={suggestion}
              onChange={e => setSuggestion(e.target.value)}
              placeholder="Descreva o que podemos melhorar na plataforma ou novas funcionalidades que gostaria de ver..."
              className="w-full min-h-[100px] bg-gray-50 border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/50 resize-y"
              required
            />
            <div className="flex justify-end">
              <button 
                type="submit" 
                disabled={sending || !suggestion.trim()}
                className="flex items-center gap-2 px-5 py-2.5 bg-gold-500 text-white font-bold rounded-xl shadow hover:bg-gold-600 disabled:opacity-50 transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Enviando...' : 'Enviar Sugestão'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
