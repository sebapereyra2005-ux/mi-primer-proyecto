/**
 * NEXUS — Proveedor OpenAI
 * Plantilla lista para activarse cuando se conecte una API key.
 */

import type { AIResponse, Trigger } from '@/types';
import { SYSTEM_PROMPT, buildUserPrompt } from '@/utils/prompts';
import { AIProviderError, type AIProvider } from './types';

interface OpenAIOptions {
  apiKey: string;
  model: string;
}

interface OpenAIResponse {
  choices?: Array<{ message?: { content?: string } }>;
  error?: { message: string };
}

export class OpenAIProvider implements AIProvider {
  readonly name = 'openai';

  constructor(private readonly options: OpenAIOptions) {
    if (!options.apiKey) {
      throw new AIProviderError(
        'Falta VITE_OPENAI_API_KEY en el entorno.',
        'openai'
      );
    }
  }

  async synthesize(entrada: string, disparador: Trigger): Promise<AIResponse> {
    const body = {
      model: this.options.model,
      response_format: { type: 'json_object' },
      temperature: 0.4,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserPrompt(entrada, disparador) },
      ],
    };

    let response: Response;
    try {
      response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.options.apiKey}`,
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      throw new AIProviderError('Error de red contactando OpenAI', 'openai', error);
    }

    const data = (await response.json()) as OpenAIResponse;

    if (!response.ok || data.error) {
      throw new AIProviderError(
        data.error?.message ?? `OpenAI respondió ${response.status}`,
        'openai'
      );
    }

    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new AIProviderError('OpenAI no devolvió contenido', 'openai');
    }

    try {
      return JSON.parse(content) as AIResponse;
    } catch (error) {
      throw new AIProviderError(
        'OpenAI devolvió JSON inválido',
        'openai',
        error
      );
    }
  }
}
