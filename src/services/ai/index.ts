/**
 * NEXUS — Fábrica de proveedor de IA
 * Selecciona el proveedor según VITE_AI_PROVIDER.
 * Si falla la configuración del proveedor real, cae al mock con warning.
 */

import type { AIResponse, Trigger } from '@/types';
import { GeminiAIProvider } from './gemini.provider';
import { MockAIProvider } from './mock.provider';
import { OpenAIProvider } from './openai.provider';
import type { AIProvider } from './types';

function readEnv(key: string): string | undefined {
  return import.meta.env[key] as string | undefined;
}

function buildProvider(): AIProvider {
  const provider = (readEnv('VITE_AI_PROVIDER') ?? 'mock').toLowerCase();

  try {
    if (provider === 'gemini') {
      return new GeminiAIProvider({
        apiKey: readEnv('VITE_GEMINI_API_KEY') ?? '',
        model: readEnv('VITE_GEMINI_MODEL') ?? 'gemini-1.5-flash',
      });
    }
    if (provider === 'openai') {
      return new OpenAIProvider({
        apiKey: readEnv('VITE_OPENAI_API_KEY') ?? '',
        model: readEnv('VITE_OPENAI_MODEL') ?? 'gpt-4o-mini',
      });
    }
  } catch (error) {
    console.warn(
      `[NEXUS] No se pudo inicializar proveedor "${provider}". Usando mock.`,
      error
    );
  }

  return new MockAIProvider();
}

const aiProvider: AIProvider = buildProvider();

export const aiService = {
  providerName: aiProvider.name,
  synthesize(entrada: string, disparador: Trigger): Promise<AIResponse> {
    return aiProvider.synthesize(entrada, disparador);
  },
};

export type { AIProvider } from './types';
export { AIProviderError } from './types';
