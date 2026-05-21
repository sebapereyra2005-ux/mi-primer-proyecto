/**
 * NEXUS — Tipos del dominio
 * Modelo conceptual de la consola clínica.
 */

/** Los 4 pilares de salida de NEXUS */
export interface FourPillars {
  /** Dónde poner la atención ahora */
  foco: string;
  /** Qué está objetivamente sucediendo */
  hechos: string;
  /** Reflejo emocional/cognitivo del estado actual */
  espejo: string;
  /** Acción concreta inmediata */
  porDondeEmpezar: string;
}

/** Destilado cognitivo del estado mental */
export interface CognitiveDistillate {
  /** Tipo de bloqueo dominante detectado */
  bloqueoDominante: string;
  /** Constante que se repite en el discurso */
  constanteRepetida: string;
  /** Nivel de saturación 0-100 */
  saturacion: number;
}

/** Sesión completa de NEXUS */
export interface NexusSession {
  id: string;
  /** Texto crudo de entrada del usuario */
  entrada: string;
  /** Disparador usado: 'orden' (necesito ordenar) | 'accion' (necesito una acción) */
  disparador: Trigger;
  /** Salida estructurada de los 4 pilares */
  pilares: FourPillars | null;
  /** Destilado cognitivo */
  destilado: CognitiveDistillate | null;
  /** Compromiso final escrito por el usuario en el cierre */
  compromiso: string | null;
  /** Estado de la sesión */
  estado: SessionState;
  /** Timestamp ISO de creación */
  createdAt: string;
  /** Timestamp ISO de cierre */
  closedAt: string | null;
  /** Duración en segundos */
  duracionSegundos: number | null;
}

export type Trigger = 'orden' | 'accion';

export type SessionState =
  | 'iniciada'
  | 'procesando'
  | 'sintetizada'
  | 'cerrada'
  | 'abandonada';

/** Nota libre del usuario */
export interface Note {
  id: string;
  contenido: string;
  createdAt: string;
}

/** Evidencia objetiva en la base de realidad */
export interface Evidence {
  id: string;
  contenido: string;
  /** Categoría libre, p.ej. "trabajo", "salud", "relaciones" */
  categoria: string;
  createdAt: string;
}

/** Estado persistido completo */
export interface NexusState {
  /** Sesión activa actual (si existe) */
  sesionActiva: NexusSession | null;
  /** Historial de sesiones cerradas (últimas 50) */
  historial: NexusSession[];
  /** Notas libres */
  notas: Note[];
  /** Base de realidad — evidencias */
  evidencias: Evidence[];
}

/** Resultado de un trigger del proveedor de IA */
export interface AIResponse {
  pilares: FourPillars;
  destilado: CognitiveDistillate;
}

/** Configuración del proveedor de IA */
export interface AIProviderConfig {
  provider: 'mock' | 'gemini' | 'openai';
  apiKey?: string;
  model?: string;
}
