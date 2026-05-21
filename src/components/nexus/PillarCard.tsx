import type { ReactNode } from 'react';

interface PillarCardProps {
  label: string;
  /** Contenido del pilar */
  children: ReactNode;
  /** Numeración 1-4 para indicar orden */
  index?: number;
  /** Si true, resalta el pilar como acción principal */
  primary?: boolean;
}

/**
 * Tarjeta para cada uno de los 4 pilares de NEXUS.
 * El pilar `primary` se resalta porque es el call-to-action.
 */
export function PillarCard({
  label,
  children,
  index,
  primary = false,
}: PillarCardProps) {
  const borderClass = primary
    ? 'border-nexus-accent/40 bg-nexus-accent/[0.03]'
    : 'border-nexus-border bg-nexus-surface';

  return (
    <article
      className={`animate-slide-up rounded-lg border p-5 transition-colors ${borderClass}`}
    >
      <header className="mb-3 flex items-center justify-between">
        <span className="label-clinical">{label}</span>
        {index !== undefined && (
          <span className="font-mono text-xs text-nexus-fade">
            {String(index).padStart(2, '0')}
          </span>
        )}
      </header>
      <div className="text-clinical">{children}</div>
    </article>
  );
}
