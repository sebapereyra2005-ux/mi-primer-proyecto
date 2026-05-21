/**
 * NEXUS — Proveedor mock
 * Devuelve respuestas plausibles sin red. Útil en dev y para fallback.
 */

import type { AIResponse, Trigger } from '@/types';
import type { AIProvider } from './types';

/** Simula latencia de red para no dar respuestas instantáneas que rompan UX */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Heurística mínima sobre el texto para variar la respuesta */
function detectarBloqueo(texto: string): string {
  const t = texto.toLowerCase();
  if (/no s[eé]|no entiendo|confus|perdido/.test(t)) return 'Confusión';
  if (/miedo|preocup|ansied|nervios/.test(t)) return 'Anticipación';
  if (/cans|agotad|saturad|rendid/.test(t)) return 'Saturación';
  if (/enojo|rabia|injust|frustr/.test(t)) return 'Frustración';
  if (/triste|vac[ií]o|nada|deprimi/.test(t)) return 'Apatía';
  return 'Dispersión';
}

function detectarConstante(texto: string): string {
  const palabras = texto
    .toLowerCase()
    .replace(/[^a-záéíóúñü\s]/g, ' ')
    .split(/\s+/)
    .filter((p) => p.length > 4);

  const conteo = new Map<string, number>();
  for (const p of palabras) conteo.set(p, (conteo.get(p) ?? 0) + 1);

  const ordenadas = [...conteo.entries()].sort((a, b) => b[1] - a[1]);
  const repetida = ordenadas.find(([, n]) => n >= 2)?.[0];
  return repetida ?? 'sin patrón claro';
}

export class MockAIProvider implements AIProvider {
  readonly name = 'mock';

  async synthesize(entrada: string, disparador: Trigger): Promise<AIResponse> {
    await sleep(900 + Math.random() * 600);

    const bloqueo = detectarBloqueo(entrada);
    const constante = detectarConstante(entrada);
    const longitud = entrada.length;
    const saturacion = Math.min(100, Math.round(40 + longitud / 12));

    const accionPorOrden =
      'Escribe en una sola frase qué problema estás tratando de resolver hoy.';
    const accionPorAccion =
      'Abre tu calendario y bloquea 25 minutos ahora mismo para la primera tarea.';

    return {
      pilares: {
        foco:
          disparador === 'orden'
            ? 'Lo único que importa ahora es separar lo que sabes de lo que estás imaginando.'
            : 'Una sola tarea, ejecutable en menos de 30 minutos. El resto puede esperar.',
        hechos:
          'Hay un volcado de pensamientos, sin acción concreta tomada todavía.',
        espejo: `Estás en estado de ${bloqueo.toLowerCase()}. La cabeza pesa más que la situación real.`,
        porDondeEmpezar:
          disparador === 'orden' ? accionPorOrden : accionPorAccion,
      },
      destilado: {
        bloqueoDominante: bloqueo,
        constanteRepetida: constante,
        saturacion,
      },
    };
  }
}
