/**
 * NEXUS — Pantalla 5: Retorno con compromiso previo
 *
 * NUEVA. Lo que ve el usuario cuando vuelve a abrir NEXUS.
 * Le recuerda lo último que se comprometió a hacer.
 * Es el otro pilar del sistema de seguimiento.
 */

import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { EmptyState } from '@/components/ui/EmptyState';
import { useNexus } from '@/context/NexusContext';
import { formatDate, formatDuration } from '@/utils/format';
import { ROUTES } from '@/utils/constants';

export function RetornoPage() {
  const { state, lastCommitment } = useNexus();

  if (!lastCommitment) {
    return (
      <EmptyState
        title="Sin compromiso previo"
        description="Aún no cerraste ninguna sesión con un compromiso."
        action={
          <Link to={ROUTES.ENTRADA} className="btn-primary">
            Iniciar sesión
          </Link>
        }
      />
    );
  }

  const sesionesCerradas = state.historial.filter((s) => s.estado === 'cerrada');

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <header>
        <p className="label-clinical mb-1">Último compromiso</p>
        <h1 className="text-xl text-nexus-text">¿Lo cumpliste?</h1>
      </header>

      <Card className="border-nexus-accent/30 bg-nexus-accent/[0.04]">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-nexus-accent">
          {formatDate(lastCommitment.closedAt ?? lastCommitment.createdAt)}
        </p>
        <p className="text-clinical mb-4 text-base leading-relaxed">
          {lastCommitment.compromiso}
        </p>
        {lastCommitment.duracionSegundos !== null && (
          <p className="font-mono text-xs text-nexus-dim">
            sesión de {formatDuration(lastCommitment.duracionSegundos)}
          </p>
        )}
      </Card>

      <div className="grid gap-3 sm:grid-cols-2">
        <Link to={ROUTES.ENTRADA}>
          <Button variant="secondary" fullWidth>
            Lo cumplí — sesión nueva
          </Button>
        </Link>
        <Link to={ROUTES.ENTRADA}>
          <Button variant="primary" fullWidth>
            No lo cumplí — replantear
          </Button>
        </Link>
      </div>

      {sesionesCerradas.length > 1 && (
        <section className="pt-4">
          <h2 className="label-clinical mb-3">Compromisos anteriores</h2>
          <ul className="flex flex-col gap-2">
            {sesionesCerradas.slice(1, 6).map((s) => (
              <li
                key={s.id}
                className="rounded-md border border-nexus-border bg-nexus-surface p-3"
              >
                <p className="mb-1 font-mono text-xs text-nexus-dim">
                  {formatDate(s.closedAt ?? s.createdAt)}
                </p>
                <p className="text-sm text-nexus-text">{s.compromiso}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
