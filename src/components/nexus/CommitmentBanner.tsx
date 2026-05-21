import { Link } from 'react-router-dom';
import { ROUTES } from '@/utils/constants';
import { timeAgo } from '@/utils/format';
import type { NexusSession } from '@/types';

interface CommitmentBannerProps {
  session: NexusSession;
}

/**
 * Banner que aparece en la pantalla de Entrada cuando hay un compromiso previo.
 * Convierte NEXUS de herramienta de consulta a sistema de seguimiento.
 */
export function CommitmentBanner({ session }: CommitmentBannerProps) {
  if (!session.compromiso) return null;

  return (
    <Link
      to={ROUTES.RETORNO}
      className="block rounded-lg border border-nexus-accent/30 bg-nexus-accent/[0.04]
                 p-4 transition-colors hover:border-nexus-accent/60"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="label-clinical text-nexus-accent">
          Compromiso pendiente
        </span>
        <span className="font-mono text-xs text-nexus-dim">
          {timeAgo(session.closedAt ?? session.createdAt)}
        </span>
      </div>
      <p className="text-clinical line-clamp-2">{session.compromiso}</p>
      <p className="mt-2 font-mono text-xs uppercase tracking-wider text-nexus-dim">
        Tocar para revisar →
      </p>
    </Link>
  );
}
