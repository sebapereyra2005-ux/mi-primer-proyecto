import { useTimer } from '@/hooks/useTimer';
import { formatDuration } from '@/utils/format';
import { TARGET_SESSION_SECONDS } from '@/utils/constants';

interface SessionTimerProps {
  startISO: string | null;
}

/**
 * Cronómetro discreto que muestra el tiempo de sesión.
 * Cambia de color cuando se acerca o supera el objetivo de 15 minutos.
 */
export function SessionTimer({ startISO }: SessionTimerProps) {
  const elapsed = useTimer(startISO);

  if (!startISO) return null;

  const ratio = elapsed / TARGET_SESSION_SECONDS;
  let colorClass = 'text-nexus-dim';
  if (ratio >= 1) colorClass = 'text-nexus-warn';
  else if (ratio >= 0.8) colorClass = 'text-nexus-accent';

  return (
    <span
      className={`font-mono text-xs uppercase tracking-widest ${colorClass}`}
      aria-label="Tiempo de sesión"
    >
      {formatDuration(elapsed)}
    </span>
  );
}
