/**
 * NEXUS — Servicio de almacenamiento local
 * Encapsula localStorage. Toda persistencia pasa por aquí.
 */

import type { NexusState } from '@/types';
import { STORAGE_KEYS } from '@/utils/constants';

const EMPTY_STATE: NexusState = {
  sesionActiva: null,
  historial: [],
  notas: [],
  evidencias: [],
};

class StorageService {
  /** Lee el estado completo del localStorage. Devuelve estado vacío si no existe. */
  load(): NexusState {
    if (typeof window === 'undefined') return EMPTY_STATE;

    try {
      const raw = localStorage.getItem(STORAGE_KEYS.STATE);
      if (!raw) return EMPTY_STATE;
      const parsed = JSON.parse(raw) as NexusState;
      // Validación básica de forma
      return {
        sesionActiva: parsed.sesionActiva ?? null,
        historial: Array.isArray(parsed.historial) ? parsed.historial : [],
        notas: Array.isArray(parsed.notas) ? parsed.notas : [],
        evidencias: Array.isArray(parsed.evidencias) ? parsed.evidencias : [],
      };
    } catch (error) {
      console.error('[NEXUS] Error leyendo estado:', error);
      return EMPTY_STATE;
    }
  }

  /** Persiste el estado completo en localStorage. */
  save(state: NexusState): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(STORAGE_KEYS.STATE, JSON.stringify(state));
    } catch (error) {
      console.error('[NEXUS] Error guardando estado:', error);
    }
  }

  /** Borra todo el estado. Operación destructiva. */
  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(STORAGE_KEYS.STATE);
  }

  /** Exporta el estado como JSON descargable */
  exportToJSON(state: NexusState): string {
    return JSON.stringify(state, null, 2);
  }
}

export const storageService = new StorageService();
