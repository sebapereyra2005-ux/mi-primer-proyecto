/**
 * NEXUS — Contexto global
 * Estado y acciones compartidas entre todas las pantallas.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type {
  AIResponse,
  Evidence,
  NexusSession,
  NexusState,
  Note,
  Trigger,
} from '@/types';
import { storageService } from '@/services/storage.service';
import { aiService } from '@/services/ai';
import { generateId } from '@/utils/format';
import { MAX_HISTORY } from '@/utils/constants';

// ---------------------------------------------------------------------------
// Reducer
// ---------------------------------------------------------------------------

type Action =
  | { type: 'HYDRATE'; payload: NexusState }
  | { type: 'START_SESSION'; payload: { entrada: string; disparador: Trigger } }
  | { type: 'SET_PROCESSING' }
  | { type: 'APPLY_AI_RESPONSE'; payload: AIResponse }
  | { type: 'UPDATE_PILLAR_ESPEJO'; payload: string }
  | { type: 'CLOSE_SESSION'; payload: { compromiso: string } }
  | { type: 'ABANDON_SESSION' }
  | { type: 'ADD_NOTE'; payload: string }
  | { type: 'REMOVE_NOTE'; payload: string }
  | { type: 'ADD_EVIDENCE'; payload: { contenido: string; categoria: string } }
  | { type: 'REMOVE_EVIDENCE'; payload: string }
  | { type: 'CLEAR_ALL' };

const INITIAL_STATE: NexusState = {
  sesionActiva: null,
  historial: [],
  notas: [],
  evidencias: [],
};

function reducer(state: NexusState, action: Action): NexusState {
  switch (action.type) {
    case 'HYDRATE':
      return action.payload;

    case 'START_SESSION': {
      const session: NexusSession = {
        id: generateId(),
        entrada: action.payload.entrada,
        disparador: action.payload.disparador,
        pilares: null,
        destilado: null,
        compromiso: null,
        estado: 'iniciada',
        createdAt: new Date().toISOString(),
        closedAt: null,
        duracionSegundos: null,
      };
      return { ...state, sesionActiva: session };
    }

    case 'SET_PROCESSING':
      if (!state.sesionActiva) return state;
      return {
        ...state,
        sesionActiva: { ...state.sesionActiva, estado: 'procesando' },
      };

    case 'APPLY_AI_RESPONSE':
      if (!state.sesionActiva) return state;
      return {
        ...state,
        sesionActiva: {
          ...state.sesionActiva,
          pilares: action.payload.pilares,
          destilado: action.payload.destilado,
          estado: 'sintetizada',
        },
      };

    case 'UPDATE_PILLAR_ESPEJO':
      if (!state.sesionActiva || !state.sesionActiva.pilares) return state;
      return {
        ...state,
        sesionActiva: {
          ...state.sesionActiva,
          pilares: {
            ...state.sesionActiva.pilares,
            espejo: action.payload,
          },
        },
      };

    case 'CLOSE_SESSION': {
      if (!state.sesionActiva) return state;
      const closedAt = new Date().toISOString();
      const duracionSegundos = Math.floor(
        (new Date(closedAt).getTime() -
          new Date(state.sesionActiva.createdAt).getTime()) /
          1000
      );
      const closed: NexusSession = {
        ...state.sesionActiva,
        compromiso: action.payload.compromiso,
        estado: 'cerrada',
        closedAt,
        duracionSegundos,
      };
      return {
        ...state,
        sesionActiva: null,
        historial: [closed, ...state.historial].slice(0, MAX_HISTORY),
      };
    }

    case 'ABANDON_SESSION':
      if (!state.sesionActiva) return state;
      return {
        ...state,
        sesionActiva: null,
        historial: [
          { ...state.sesionActiva, estado: 'abandonada' },
          ...state.historial,
        ].slice(0, MAX_HISTORY),
      };

    case 'ADD_NOTE': {
      const note: Note = {
        id: generateId(),
        contenido: action.payload,
        createdAt: new Date().toISOString(),
      };
      return { ...state, notas: [note, ...state.notas] };
    }

    case 'REMOVE_NOTE':
      return {
        ...state,
        notas: state.notas.filter((n) => n.id !== action.payload),
      };

    case 'ADD_EVIDENCE': {
      const evidence: Evidence = {
        id: generateId(),
        contenido: action.payload.contenido,
        categoria: action.payload.categoria,
        createdAt: new Date().toISOString(),
      };
      return { ...state, evidencias: [evidence, ...state.evidencias] };
    }

    case 'REMOVE_EVIDENCE':
      return {
        ...state,
        evidencias: state.evidencias.filter((e) => e.id !== action.payload),
      };

    case 'CLEAR_ALL':
      return INITIAL_STATE;

    default:
      return state;
  }
}

// ---------------------------------------------------------------------------
// Contexto
// ---------------------------------------------------------------------------

interface NexusContextValue {
  state: NexusState;
  isProcessing: boolean;
  hasActiveSession: boolean;
  hasPreviousCommitment: boolean;
  lastCommitment: NexusSession | null;
  // Acciones
  startSession: (entrada: string, disparador: Trigger) => Promise<void>;
  updateEspejo: (texto: string) => void;
  closeSession: (compromiso: string) => void;
  abandonSession: () => void;
  addNote: (contenido: string) => void;
  removeNote: (id: string) => void;
  addEvidence: (contenido: string, categoria: string) => void;
  removeEvidence: (id: string) => void;
  clearAll: () => void;
}

const NexusContext = createContext<NexusContextValue | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export function NexusProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  // Hidratar desde localStorage al montar
  useEffect(() => {
    const loaded = storageService.load();
    dispatch({ type: 'HYDRATE', payload: loaded });
  }, []);

  // Persistir cada cambio
  useEffect(() => {
    storageService.save(state);
  }, [state]);

  const startSession = useCallback(
    async (entrada: string, disparador: Trigger) => {
      dispatch({ type: 'START_SESSION', payload: { entrada, disparador } });
      dispatch({ type: 'SET_PROCESSING' });
      try {
        const response = await aiService.synthesize(entrada, disparador);
        dispatch({ type: 'APPLY_AI_RESPONSE', payload: response });
      } catch (error) {
        console.error('[NEXUS] Error sintetizando:', error);
        // Fallback mínimo para que el usuario no quede atascado
        dispatch({
          type: 'APPLY_AI_RESPONSE',
          payload: {
            pilares: {
              foco: 'No se pudo sintetizar. Reintenta o continúa manualmente.',
              hechos: 'Hubo un error de comunicación con el proveedor de IA.',
              espejo: 'Estás en pausa técnica, no en bloqueo real.',
              porDondeEmpezar: 'Vuelve a pulsar el disparador o cierra ahora.',
            },
            destilado: {
              bloqueoDominante: 'Error',
              constanteRepetida: '—',
              saturacion: 0,
            },
          },
        });
      }
    },
    []
  );

  const value = useMemo<NexusContextValue>(() => {
    const lastCommitment =
      state.historial.find((s) => s.estado === 'cerrada' && s.compromiso) ??
      null;

    return {
      state,
      isProcessing: state.sesionActiva?.estado === 'procesando',
      hasActiveSession: state.sesionActiva !== null,
      hasPreviousCommitment: lastCommitment !== null,
      lastCommitment,
      startSession,
      updateEspejo: (texto) =>
        dispatch({ type: 'UPDATE_PILLAR_ESPEJO', payload: texto }),
      closeSession: (compromiso) =>
        dispatch({ type: 'CLOSE_SESSION', payload: { compromiso } }),
      abandonSession: () => dispatch({ type: 'ABANDON_SESSION' }),
      addNote: (contenido) => dispatch({ type: 'ADD_NOTE', payload: contenido }),
      removeNote: (id) => dispatch({ type: 'REMOVE_NOTE', payload: id }),
      addEvidence: (contenido, categoria) =>
        dispatch({ type: 'ADD_EVIDENCE', payload: { contenido, categoria } }),
      removeEvidence: (id) =>
        dispatch({ type: 'REMOVE_EVIDENCE', payload: id }),
      clearAll: () => dispatch({ type: 'CLEAR_ALL' }),
    };
  }, [state, startSession]);

  return (
    <NexusContext.Provider value={value}>{children}</NexusContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Hook de consumo
// ---------------------------------------------------------------------------

export function useNexus(): NexusContextValue {
  const ctx = useContext(NexusContext);
  if (!ctx) {
    throw new Error('useNexus debe usarse dentro de <NexusProvider>');
  }
  return ctx;
}
