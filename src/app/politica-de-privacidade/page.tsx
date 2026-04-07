import React from "react";

export const metadata = {
  title: "Política de Privacidade | FisioHub",
};

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold text-slate-900 mb-6">Política de Privacidade</h1>
        <p className="text-sm text-gray-500 mb-8">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>

        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">1. Coleta e Uso de Dados</h2>
            <p className="text-gray-600 leading-relaxed">
              O FisioHub coleta apenas os dados extremamente necessários para o funcionamento da plataforma (nome, e-mail e métricas de estudo) para garantir a melhor experiência de mentoria. Seus dados não são vendidos para terceiros.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">2. Proteção e Segurança</h2>
            <p className="text-gray-600 leading-relaxed">
              Utilizamos tecnologias robustas de criptografia (através do nosso provedor) para garantir a segurança da sua conta, das suas senhas e do seu histórico de análises clínicas com a IA.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">3. Exclusão de Conta</h2>
            <p className="text-gray-600 leading-relaxed">
              Você pode solicitar a exclusão definitiva da sua conta e remoção dos seus dados dos nossos servidores a qualquer momento pelo suporte do FisioHub.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-slate-800 mb-2">4. Contato</h2>
            <p className="text-gray-600 leading-relaxed">
              Caso tenha dúvidas sobre como seus dados são tratados, entre em contato conosco através dos nossos canais oficiais de atendimento no site.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
