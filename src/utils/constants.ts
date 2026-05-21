/**
 * NEXUS — Constantes globales
 */

export const APP_NAME = 'NEXUS';
export const APP_TAGLINE = 'Consola clínica de orden mental';

/** Tiempo objetivo de cierre de sesión (15 min) */
export const TARGET_SESSION_SECONDS = 15 * 60;

/** Máximo de sesiones guardadas en historial */
export const MAX_HISTORY = 50;

/** Claves de localStorage */
export const STORAGE_KEYS = {
  STATE: 'nexus.state.v1',
  SETTINGS: 'nexus.settings.v1',
} as const;

/** Rutas de la aplicación */
export const ROUTES = {
  ENTRADA: '/',
  PILARES: '/pilares',
  SINCRONIZADOR: '/sincronizador',
  CIERRE: '/cierre',
  RETORNO: '/retorno',
  NOTAS: '/notas',
} as const;

/** Etiquetas humanas de cada pilar */
export const PILLAR_LABELS = {
  foco: 'Foco',
  hechos: 'Hechos',
  espejo: 'Espejo',
  porDondeEmpezar: 'Por dónde empezar',
} as const;

/** Etiquetas de los disparadores */
export const TRIGGER_LABELS = {
  orden: 'Necesito ordenar',
  accion: 'Necesito una acción',
} as const;
