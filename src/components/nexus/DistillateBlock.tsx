import type { CognitiveDistillate } from '@/types';

interface DistillateBlockProps {
  destilado: CognitiveDistillate;
}

/**
 * Destilado cognitivo: bloqueo dominante + constante repetida + saturación.
 * Visualmente más comprimido que los pilares — es metadato.
 */
export function DistillateBlock({ destilado }: DistillateBlockProps) {
  return (
    <section
      aria-label="Destilado cognitivo"
      className="rounded-lg border border-nexus-border bg-nexus-bg p-4"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="label-clinical">Destilado cognitivo</span>
        <span className="font-mono text-xs text-nexus-dim">
          saturación {destilado.saturacion}%
        </span>
      </div>

      <div className="mb-3 h-1 w-full overflow-hidden rounded-full bg-nexus-muted">
        <div
          className="h-full bg-nexus-accent transition-all duration-700"
          style={{ width: `${destilado.saturacion}%` }}
        />
      </div>

      <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <dt className="label-clinical mb-1">Bloqueo dominante</dt>
          <dd className="font-mono text-sm text-nexus-text">
            {destilado.bloqueoDominante}
          </dd>
        </div>
        <div>
          <dt className="label-clinical mb-1">Constante repetida</dt>
          <dd className="font-mono text-sm text-nexus-text">
            {destilado.constanteRepetida}
          </dd>
        </div>
      </dl>
    </section>
  );
}
