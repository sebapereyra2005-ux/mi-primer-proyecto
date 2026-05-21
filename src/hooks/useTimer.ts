/**
 * NEXUS — Hook de cronómetro
 * Útil para medir el tiempo de sesión y mostrar progreso hacia los 15 min objetivo.
 */

import { useEffect, useRef, useState } from 'react';

export function useTimer(startISO: string | null): number {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!startISO) {
      setElapsed(0);
      return;
    }

    const start = new Date(startISO).getTime();
    const update = () => setElapsed(Math.floor((Date.now() - start) / 1000));

    update();
    intervalRef.current = window.setInterval(update, 1000);

    return () => {
      if (intervalRef.current !== null) {
        window.clearInterval(intervalRef.current);
      }
    };
  }, [startISO]);

  return elapsed;
}
