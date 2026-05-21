interface LoaderProps {
  /** Texto opcional bajo el indicador */
  label?: string;
}

/**
 * Indicador de procesamiento sobrio.
 * Tres puntos pulsantes — sin spinner agresivo.
 */
export function Loader({ label = 'Procesando' }: LoaderProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-center justify-center gap-3 py-8"
    >
      <div className="flex gap-1.5" aria-hidden="true">
        <span className="h-2 w-2 animate-pulse rounded-full bg-nexus-accent" />
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-nexus-accent"
          style={{ animationDelay: '150ms' }}
        />
        <span
          className="h-2 w-2 animate-pulse rounded-full bg-nexus-accent"
          style={{ animationDelay: '300ms' }}
        />
      </div>
      <span className="font-mono text-xs uppercase tracking-widest text-nexus-dim">
        {label}
      </span>
    </div>
  );
}
