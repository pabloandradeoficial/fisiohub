'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { login } from './actions';
import { ArrowRight, ActivitySquare } from 'lucide-react';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem('fisiohub_email');
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  async function handleSubmit(formData: FormData) {
    if (rememberMe) {
      localStorage.setItem('fisiohub_email', formData.get('email') as string);
    } else {
      localStorage.removeItem('fisiohub_email');
    }
    
    setLoading(true);
    setError(null);
    const res = await login(formData);
    if (res?.error) {
      setError(res.error);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-[#FDFCFB]">
      {/* Left side Form */}
      <div className="flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8 bg-white p-8 rounded-3xl shadow-xl shadow-[#E8E3DF]/50 border border-[#E8E3DF]">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 bg-[#D4AF37] rounded-xl flex items-center justify-center text-white">
                <ActivitySquare className="w-7 h-7" />
              </div>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-[#3A2E27]">Acesse sua conta</h1>
            <p className="text-sm text-[#8E7D73] mt-2">Pronto para treinar casos reais hoje?</p>
          </div>

          <form action={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#4A3B32] mb-1" htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#E8E3DF] bg-[#FDFCFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-colors"
                placeholder="seu.email@exemplo.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#4A3B32] mb-1" htmlFor="password">Senha</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                className="w-full px-4 py-3 rounded-xl border border-[#E8E3DF] bg-[#FDFCFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#D4AF37]/20 focus:border-[#D4AF37] transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center gap-2 pt-1 pb-2">
              <input 
                type="checkbox" 
                id="remember" 
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-[#E8E3DF] text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <label htmlFor="remember" className="text-sm font-medium text-[#8E7D73] cursor-pointer hover:text-[#4A3B32] transition-colors">
                Lembrar meu email
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#3A2E27] hover:bg-[#4A3B32] text-white font-medium rounded-xl transition-colors disabled:opacity-50"
            >
              {loading ? 'Entrando...' : 'Entrar'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <p className="text-center text-sm text-[#8E7D73]">
            Ainda não tem conta?{' '}
            <Link href="/register" className="font-semibold text-[#D4AF37] hover:text-[#B8860B]">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>

      {/* Right side Image Cover */}
      <div className="hidden md:block bg-[#3A2E27] relative">
        <div className="absolute inset-0 bg-[#3A2E27]/40 mix-blend-multiply" />
        <img 
          src="/pablo.jpg1.png" 
          alt="Dr. Pablo Andrade" 
          className="w-full h-full object-cover object-top opacity-70" 
        />
        <div className="absolute bottom-16 left-16 right-16">
          <blockquote className="text-3xl font-medium text-white leading-tight">
            "A diferença entre o protocolo e a cura está no raciocínio clínico aplicado."
          </blockquote>
          <p className="text-[#D4AF37] mt-4 font-medium">— FisioHub Academy</p>
        </div>
      </div>
    </div>
  );
}
