/**
 * NEXUS — Proveedor Google Gemini
 * Plantilla lista para activarse cuando se conecte una API key.
 */

import type { AIResponse, Trigger } from '@/types';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/utils/prompts';
import { AIProviderError, type AIProvider } from './types';

interface GeminiOptions {
  apiKey: string;
  model: string;
}

interface GeminiContentPart {
  text: string;
}

interface GeminiResponse {
  candidates?: Array<{
    content?: { parts?: GeminiContentPart[] };
  }>;
  error?: { message: string };
}

export class GeminiAIProvider implements AIProvider {
  readonly name = 'gemini';

  constructor(private readonly options: GeminiOptions) {
    if (!options.apiKey) {
      throw new AIProviderError(
        'Falta VITE_GEMINI_API_KEY en el entorno.',
        'gemini'
      );
    }
  }

  async synthesize(entrada: string, disparador: Trigger): Promise<AIResponse> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${this.options.model}:generateContent?key=${this.options.apiKey}`;

    const body = {
      systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [
        { role: 'user', parts: [{ text: buildUserPrompt(entrada, disparador) }] },
      ],
      generationConfig: {
        responseMimeType: 'application/json',
        temperature: 0.4,
      },
    };

    let response: Response;
    try {
      response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw new AIProviderError('Error de red contactando Gemini', 'gemini', error);
    }

    const data = (await response.json()) as GeminiResponse;

    if (!response.ok || data.error) {
      throw new AIProviderError(
        data.error?.message ?? `Gemini respondió ${response.status}`,
        'gemini'
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new AIProviderError('Gemini no devolvió texto', 'gemini');
    }

    try {
      return JSON.parse(text) as AIResponse;
    } catch (error) {
      throw new AIProviderError(
        'Gemini devolvió JSON inválido',
        'gemini',
        error
      );
    }
  }
}
