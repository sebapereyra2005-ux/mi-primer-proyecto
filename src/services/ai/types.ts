/**
 * NEXUS — Contrato del proveedor de IA
 */

import type { AIResponse, Trigger } from '@/types';

/** Interfaz que cualquier proveedor de IA debe implementar */
export interface AIProvider {
  readonly name: string;
  synthesize(entrada: string, disparador: Trigger): Promise<AIResponse>;
}

export class AIProviderError extends Error {
  constructor(
    message: string,
    public readonly provider: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.name = 'AIProviderError';
  }
}
