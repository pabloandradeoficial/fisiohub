'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signup } from '@/app/login/actions';
import { ArrowRight, ActivitySquare, ShieldCheck, Lock } from 'lucide-react';

export default function RegisterPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const res = await signup(formData);
    if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-[#FDFCFB]">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-[#E8E3DF]/50 border border-[#E8E3DF]">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center text-white">
              <ActivitySquare className="w-7 h-7" />
            </div>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#3A2E27]">Acesso Antecipado</h1>
          <p className="text-sm text-[#8E7D73] mt-2">Garanta os benefícios do Plano Anual: <strong className="text-[#D4AF37]">Mentoria com Pablo + Certificados</strong>.</p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-[#D4AF37] bg-[#D4AF37]/10 py-2 px-3 rounded-xl border border-[#D4AF37]/20">
            <ShieldCheck className="w-4 h-4" /> 7 Dias de Garantia Incondicional
          </div>
        </div>

        <form action={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
              {error}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-medium text-[#4A3B32] mb-1" htmlFor="name">Nome Completo</label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#E8E3DF] bg-[#FDFCFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-colors"
              placeholder="Dr. Pablo Andrade"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#4A3B32] mb-1" htmlFor="email">Email Acadêmico ou Profissional</label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#E8E3DF] bg-[#FDFCFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-colors"
              placeholder="seu.email@exemplo.com"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#4A3B32] mb-1" htmlFor="password">Crie uma Senha</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="w-full px-4 py-3 rounded-xl border border-[#E8E3DF] bg-[#FDFCFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 flex items-center justify-center gap-2 py-3.5 px-4 bg-[#D4AF37] hover:bg-[#C5A030] text-white text-lg font-bold rounded-xl transition-all shadow-xl shadow-[#D4AF37]/20 focus:ring-4 focus:ring-[#D4AF37]/20 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Criando conta...' : 'Liberar Meu Acesso Agora'}
            {!loading && <ArrowRight className="w-5 h-5" />}
          </button>

          <div className="flex flex-col items-center gap-3 pt-6 mt-6 border-t border-[#E8E3DF]">
            <div className="flex items-center gap-1.5 text-xs text-[#8E7D73] font-bold uppercase tracking-widest bg-[#FDFCFB] px-3 py-1 rounded">
              <Lock className="w-3.5 h-3.5" /> Checkout Seguro (SSL 256-bit)
            </div>
            <p className="text-[10px] text-center text-[#8E7D73] leading-relaxed max-w-[90%]">
              A cobrança e escolha do plano serão realizadas na próxima etapa através da infraestrutura financeira <strong>Stripe</strong>. A liberação aos Mentores IA é instantânea após ativação.
            </p>
          </div>
        </form>

        <p className="text-center text-sm text-[#8E7D73] pt-4 border-t border-[#E8E3DF]">
          Já faz parte do FisioHub?{' '}
          <Link href="/login" className="font-semibold text-[#3A2E27] hover:text-[#D4AF37]">
            Fazer login
          </Link>
        </p>
      </div>
    </div>
  );
}
