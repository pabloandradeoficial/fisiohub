'use server';

import { createClient } from '@/utils/supabase/server';
import { GoogleGenAI } from '@google/genai';
import { getAgentSystemPrompt } from '@/utils/ai-prompts';

interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

interface FeedbackResponse {
  success: boolean;
  feedback?: string;
  error?: string;
}

export async function submitClinicalReasoning(
  agentId: string,
  history: ChatMessage[]
): Promise<FeedbackResponse> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: 'Usuário não autenticado.' };
  }

  // Gera a persona do professor baseada na especialidade
  const systemPrompt = getAgentSystemPrompt(agentId);

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // Map our history to Gemini structure
    const contents = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7, // Good balance of creativity (for metaphors) and accuracy
      }
    });

    const feedbackText = response.text || "Não foi possível gerar um feedback.";

    return {
      success: true,
      feedback: feedbackText
    };

  } catch (error) {
    console.error('Erro na API do Gemini:', error);
    return { success: false, error: 'Falha ao conectar com o Agente de IA.' };
  }
}

